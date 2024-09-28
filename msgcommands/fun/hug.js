const gifAPI = require('anime-images-api')
const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot) => {
        const api = new gifAPI();
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Merci de mentionner le membre avec qui tu veux faire un câlin !!!**`)
        let { image } = await api.sfw.hug();
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setTitle('💝Câlin💝')
            .setDescription(`**${message.author.username} fait un câlin à ${member.user.tag}**`)
            .setImage(image)
            .setColor('Fuchsia')
        message.channel.send({embeds: [embed]})
    },
    name: "hug",
    aliases: ["calin", "jte-caline"],
    cooldown: '3s',
    category: "fun",
    help: {
        description: "Permet de câliner quelqu'un !!!",
        syntax: '<@mention (l\'utilisateur à câliner)>'
    }
}