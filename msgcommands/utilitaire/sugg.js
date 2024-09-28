const Discord = require('discord.js'),
      config = require('../../config')

module.exports = {
    run: (message, args, Bot, data) => {
        if (!args[0]) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Veuillez indiquer une suggestion à transmettre !**`)
        message.delete()
        message.channel.send(`**${Bot.emotes.yep} - Votre suggestion à bien été transmise !**`)
        const embed = new Discord.EmbedBuilder()
            .setTitle(`${Bot.emotes.createur} - Suggestion`)
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.avatarURL() })
            .setTimestamp()
            .setColor('Random')
            .setDescription(`${args.slice(0).join(' ')}`);
        Bot.channels.cache.get(config.suggchannel).send({embeds: [embed]})
            .then(function (message) {
                message.react("✅");
                message.react("➖");
                message.react("❌");
            }).catch(function() {
                //Something
            });
    },
    name: 'botsugg',
    category: "utilitaire",
    cooldown: '30s',
    aliases: ["botsuggestion", "botsuggest"],
    help : {
        description: 'Permet de faire une suggestion sur le bot !',
        syntax: '<Suggestion>'
    }
}