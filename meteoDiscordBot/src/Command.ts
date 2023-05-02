import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { MeteoRequests } from "./MeteoRequests"

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction, meteoRequests: MeteoRequests) => void;
}