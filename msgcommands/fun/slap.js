const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre que tu veux gifler !!!**`)
        let { image } = await api.sfw.slap();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setTitle('💢Gifle💢')
            .setDescription(`**${message.author.username} gifle ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "slap",
    aliases: ["gifle", "gifler"],
    cooldown: '10s',
    category: "fun",
    help: {
        description: "Permet de gifler quelqu'un !!!",
        syntax: '<@mention (l\'utilisateur à gifler)>'
    }
}