import fetch from 'node-fetch';
import fs from 'fs';
import { CanvasRenderService } from 'chartjs-node-canvas';
import { configuration, configRequest } from './configs/chartjsConfig';
import images from 'images';
import { format } from 'date-fns';


export class MeteoRequests {
  private base_url = "https://api.meteo.pl:443/api/v1";
  private width: number = 1920 / 3;
  private height: number = 1080 / 2;
  private TOKEN: String = "";

  constructor(token: String) {
    this.TOKEN = token;
  }

  public async getWeather(lat: any, lon: any) {
    let model: string = "coamps", grid: string = "2a", coordinates: string, field: string, level: string;

    let url = `${this.base_url}/model/${model}/grid/${grid}/latlon2rowcol/${lat},${lon}/`;
    const colRow = await this.sendRequest(url, 'GET');

    try {
      const col = colRow.points[0].col;
      const row = colRow.points[0].row;

      coordinates = `${col},${row}`;
    }
    catch {
      return "ERROR";
    }

    await (async () => {
      const canvasRenderService = new CanvasRenderService(this.width * 3, this.height * 2);
      const imageBuffer = await canvasRenderService.renderToBuffer({});
      fs.writeFileSync('src/plots/merge.png', imageBuffer);
    })();

    let name1 = 'merge', name2 = 'plot';
    for (let i = 0; i < configRequest.data.length; i++) {
      let ele = configRequest.data[i];

      const yesterday = new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);
      yesterday.setHours(0, 0, 0, 0);
      const date = format(yesterday, "yyyy-MM-dd'T'HH");

      url = `${this.base_url}/model/${ele.model}/grid/${ele.grid}/coordinates/${coordinates}/field/${ele.field}/level/${ele.level}/date/${date}/forecast/`;
      const recvData = await this.sendRequest(url, 'POST');
      if (recvData == "ERROR") return "ERROR";

      await (async () => {
        const canvasRenderService = new CanvasRenderService(this.width, this.height);
        const imageBuffer = await canvasRenderService.renderToBuffer(configuration(recvData.times, recvData.data, ele.name));
        fs.writeFileSync(ele.path, imageBuffer);

      })();

      images(`src/plots/${name1}.png`).draw(images(ele.path), ele.x, ele.y).save(`src/plots/${name2}.png`);
      fs.unlinkSync(`src/plots/${name1}.png`);
      [name1, name2] = [name2, name1];
    }

    return `src/plots/${name1}.png`;
  }


  private async sendRequest(url: string, method: string) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Token ${this.TOKEN}`,
          Accept: 'application/json',
        }
      });
      if (!response.ok) return "ERROR";

      //console.log(response);
      const result = await response.json();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return "ERROR";
      } else {
        console.log('unexpected error: ', error);
        return "ERROR";
      }
    }
  }
}