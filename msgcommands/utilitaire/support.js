module.exports = {
	run: (message, args, Bot, data) => {
        message.channel.send('**Voici le lien du support: https://discord.gg/kyaZqApvE8 !**');
    },
    name: 'support',
    category: "utilitaire",
    cooldown: '3s',
    aliases: ["serveur-support"],
    help: {
    	description: 'Permet d\'avoir le lien Discord de support',
    	syntax: ''
	}
}