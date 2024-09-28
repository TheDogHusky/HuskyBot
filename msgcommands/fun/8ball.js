

module.exports = {
    run: (message, args, Bot, data) => {
            if(!args[0]) return message.channel.send(`${Bot.emotes.non} **- Waouf ! Dis moi ta question.**`)
            const replies = ["Probablement Oui", "Probablement Non", "Je ne pense pas", "Cela se pourrait bien", "Non !", "Oui !", "C'est sûr !", "Hélas non", "Il faudrais s'arrêter un moment !", "Non et Arrête !", "Je sais pas", "Je m'en fou en fait", "...", "Peut-être"];
            const response = Math.floor(Math.random() * replies.length)

            message.channel.send(`:8ball:\nQuestion?: \`"${args.slice(0).join(' ')}"\`\n **${message.author.tag}**\nRéponse: ${replies[response]}`);
	},
    name: '8ball',
    category: "fun",
    cooldown: '3s',
    aliases: ["boule-magique", "8"],
    help: {
        description: 'Permet de poser une question à la boule magique',
        syntax: '<question>'
    }
}