export const configuration = (x: any, y: any, lbl: string) => {
    return {
        type: 'line',
        data: {
            labels: x,
            datasets: [
                {
                    label: lbl,
                    data: y,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'MMM D, HH:mm',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: lbl,
                    },
                },
            },
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'White',
                }
            }
        },
        plugins: [
            {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart: { width?: any; height?: any; ctx?: any; }, args: any, options: { color: string; }) => {
                    const { ctx } = chart;
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = options.color || '#ffffff';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }
        ],
    };
};


export const configRequest = {
    data: [
        {
            name: "Rain",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "AFWA_RAIN",
            level: "0",
            path: "src/plots/rain.png",
            x: 0,
            y: 0,
        },
        {
            name: "Pressure",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "AFWA_MSLP",
            level: "0",
            path: "src/plots/pressure.png",
            x: 640,
            y: 0,
        },
        {
            name: "Temperature",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "T2",
            level: "0",
            path: "src/plots/temperature.png",
            x: 1280,
            y: 0,
        },
        {
            name: "Wind X",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "U10",
            level: "0",
            path: "src/plots/windx.png",
            x: 0,
            y: 540,
        },
        {
            name: "Wind Y",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "V10",
            level: "0",
            path: "src/plots/windy.png",
            x: 640,
            y: 540,
        },
        {
            name: "Wind Z",
            model: "wrf",
            grid: "d02_XLONG_XLAT",
            field: "W",
            level: "10",
            path: "src/plots/windz.png",
            x: 1280,
            y: 540,
        }]
};