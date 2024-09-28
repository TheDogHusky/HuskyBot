const Discord = require('discord.js')

module.exports = {
	run: async (message, args, Bot, data) => {
            const msg = await message.channel.send("Pong !");
            const apiPing = msg.createdTimestamp - message.createdTimestamp;
            const embed = new Discord.EmbedBuilder();
            embed.setTitle('**🏓Pong !🏓**');
            embed.setColor(apiPing > 300 || Bot.ws.ping > 300 ? '#EAC84C' : apiPing > 1200 || Bot.ws.ping > 1200 ? '#ED1B1B' : '#4AE268');
            embed.setDescription(`**Latence de l'API:** \`${Bot.ws.ping}ms \|\| ${Bot.ws.ping > 1200 ? 'Très Mauvais' : Bot.ws.ping > 600 ? 'Mauvais' : 'Stable'}\`\n**Latence du Bot:** \`${apiPing}ms \|\| ${apiPing > 1200 ? 'Très mauvais' : apiPing > 600 ? 'Mauvais' : 'Stable'}\``);
            msg.edit({embeds: [embed]});
    },
    name: 'ping',
    category: "utilitaire",
    aliases: ["latence"],
    cooldown: '5s',
    help : {
        description: 'Avoir le ping du bot',
        syntax: ''
    }
}