const { EmbedBuilder } = require("discord.js")

module.exports = {
    run: async (message, args, Bot, data) => {
        if(data.isSuggestionEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le module de suggestion n'est pas activé !**`)
        if(!data.suggestionViewChannel) return message.channel.send(`${Bot.emotes.non} **- Le système n'a pas correctement été configuré. Manque de: suggestionViewChannel.**`)
        const sugg = args.slice(0);
        if(!args[0]) return message.channel.send(`${Bot.emotes.non} **- Veuillez indiquer une suggestion à transmettre !**`);
        const suggEmbed = new EmbedBuilder()
            .setTitle("Nouvelle Suggestion")
            .setAuthor({ name: message.author.tag, iconURL: String(message.author.avatarURL())})
            .setDescription(`> ${sugg.join(" ")}`)
            .setColor("Random")
            .setTimestamp()
        
        const channelToSend = await message.guild.channels.fetch(data.suggestionViewChannel)
        const msg = await channelToSend.send({ content: "Nouvelle suggestion !", embeds: [suggEmbed] })
        msg.react('✅')
        msg.react('➖')
        msg.react('❌')
        message.channel.send(`${Bot.emotes.yep} **- Suggestion transmise !**`)
    },
    name: 'suggestion',
    category: 'suggestions',
    cooldown: '15s',
    aliases: ["newserversugg", "newsugg", "sugg", "suggest"],
    help: {
        description: 'Permet de poster une suggestion sur le serveur ! (si le système est activé)',
        syntax: '<suggestion>'
    }
}