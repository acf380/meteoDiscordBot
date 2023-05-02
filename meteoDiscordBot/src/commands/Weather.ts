import { CommandInteraction, Client, Options } from "discord.js";
import { Command } from "../Command";
import { MeteoRequests } from "../MeteoRequests";

export const Weather: Command = {
    name: "weather",
    options: [
        {
            type: 10,
            name: 'lat',
            description: 'latitude',
            required: true,
        },
        {
            type: 10,
            name: 'lon',
            description: 'longitude',
            required: true,
        }
    ],
    description: "Returns weather, ;-)",
    run: async (client: Client, interaction: CommandInteraction, meteoRequests: MeteoRequests) => {
        const latOption = interaction.options.get("lat")?.value;
        const lonOption = interaction.options.get("lon")?.value;
        
        let path = "src/plots/error.png";
        if (latOption != null && lonOption != null) {
            path = await meteoRequests.getWeather(latOption, lonOption);
            if (path == "ERROR") path = "src/plots/error.png";
        }

        await interaction.followUp({
            files: [path]
        });
    }
};
