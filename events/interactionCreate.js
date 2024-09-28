const HuskyBot = require('../Utils/HuskyBot');
const { Interaction } = require('discord.js');
const Utils = require('../Utils/Utils');

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {Interaction} interaction 
     */
    run: async (Bot, interaction) => {
        const data = await Bot.getGuild(interaction.guild.id);
        if(interaction.isButton()) return await Utils.handleButtons(Bot, interaction, data);
        if(interaction.isCommand()) {
            const commands = Bot.application.commands;
            const cat = Bot.slashcommands.get(interaction.commandName);
            if(!cat) {
                interaction.reply({ content: `${Bot.emotes.bug} **- Cette commande est inconnue :/. Elle a été supprimée de vos commandes.**`, ephemeral: true }).catch(err => {});
                commands?.delete(interaction.commandId).catch(err => {
                    Bot.logger.error(`Une erreur est survenue sur le serveur ${interaction.guild.name} lors de la supression de la commande: ${err.stack}`, "Interactions");
                });
                return;
            };
            if (!cat) return;
            const command = cat.subs.get(interaction.options.getSubcommand());
            if(!command) return interaction.reply({ content: ":x: **- Cette commande est inconnue.**", ephemeral: true });

            Bot.logger.info(`${interaction.member.user.tag} a utilisé ${command.name} dans ${interaction.guild.name}`, "Interactions");
            command.run(interaction, Bot, data);
        };
    },
};