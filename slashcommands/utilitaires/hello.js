const Discord = require('discord.js');
const HuskyBot = require('../../Utils/HuskyBot')

module.exports = {
    /**
     * 
     * @param {Discord.CommandInteraction} interaction 
     * @param {HuskyBot} Client 
     * @param {guildSchema} data 
     */
    run: (interaction, Client, data) => {
        interaction.reply(`Hey ${interaction.member}.`);
    },
    name: "hello",
    description: "UWu",
    options: null,
    utils: {
        category: 'utilitaires',
        syntax: "",
        examples: ["hello"],
    }
};