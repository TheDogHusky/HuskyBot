const { Message, MessageActionRow, MessageButton, EmbedBuilder } = require("discord.js");

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {*} Bot 
     * @param {*} data 
     */
    run: (message, args, Bot, data) => {
        const linkMsg = `> [➕・Invitation](https://discord.com/oauth2/authorize?client_id=769527725802913816&scope=bot&permissions=8)
        > [🖥️・Site Web](https://huskybot.worldwild.studio)
        > [ℹ️・Documentation](https://classycrafter.gitbook.io/huskybot)
        > [📞・Serveur de Support](https://discord.gg/kyaZqApvE8)
        > [🆙・Vote ConstEagle](https://consteagle.com/bots/769527725802913816/)
        > [🆙・Vote Top.gg](https://top.gg/bot/769527725802913816)`;
        const embed = new EmbedBuilder()
            .setTitle(`🔗・Liens`)
            .setDescription(linkMsg)
            .setColor(Bot.colors.main)
            .setTimestamp()
            .setImage(Bot.config.images.banner);
        message.channel.send({ embeds: [embed] });
    },
    name: 'liens',
    category: "utilitaire",
    cooldown: '2s',
    aliases: ["links"],
    help: {
        description: 'Permet d\'avoir tout les liens du bot',
        syntax: ''
    }
};