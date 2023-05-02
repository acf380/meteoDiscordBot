import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { MeteoRequests } from "./MeteoRequests";
import * as dotenv from 'dotenv'

dotenv.config()
const token = process.env.TOKEN
const meteoToken = process.env.METEO_TOKEN

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


let meteoRequests = new MeteoRequests(meteoToken as String);

ready(client);
interactionCreate(client, meteoRequests);

client.login(token);