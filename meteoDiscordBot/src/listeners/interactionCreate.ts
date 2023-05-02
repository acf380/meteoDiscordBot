import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Commands";
import { MeteoRequests } from "src/MeteoRequests";

export default (client: Client, meteoRequests: MeteoRequests): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isUserContextMenuCommand()) {
            await handleSlashCommand(client, interaction, meteoRequests);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, meteoRequests: MeteoRequests): Promise<void> => {
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand) {
      interaction.followUp({ content: "An error has occurred" });
      return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction, meteoRequests);
};