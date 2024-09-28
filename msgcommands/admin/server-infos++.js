const { MessageEmbed, EmbedBuilder } = require('discord.js'),
      moment = require('moment')

module.exports = {
    run: (message, args, Bot, data) => {
        if(message.author.id !== "662227196814819349") return message.channel.send(`${Bot.emotes.non} **- L\'accès vous y est interdit !**`)
        const guild = Bot.guilds.cache.get(args[0])
        Bot.users.fetch(String(guild.ownerId)).then(userOwner => {
            const embed = new EmbedBuilder()
        	.setTitle(`Server Info`)
    		.setColor('B4E0E0')
    		.setThumbnail(guild.iconURL())
    		.addFields(
              {name: "✨ **Nom**", value: `${guild.name}`, inline: true},
              {name: "🆔 **ID Du Serveur**", value: `${guild.id}`, inline: true},
              {name: "👑 **Propriétaire**", value: `${userOwner.tag} (${guild.ownerId})`, inline: true},
              {name: "🕛 **Serveur Créé le**", value: `${moment(guild.createdAt).format('DD/MM/YYYY')} à ${moment(guild.createdAt).format('HH:MM')}`, inline: true},
              {name: "🌍 **Région**", value: `Europe`, inline: true},
              {name: "🚻 **Membres**", value: `${guild.memberCount -1} Membres`, online: true},
              {name: "🎭 **Rôles**", value: `${guild.roles.cache.size} rôles`, inline: true},
              {name: "📰 **Salons**", value: `🖊️ ${guild.channels.cache.filter(ch => ch.type === "text").size} Salons Textuels\n🎤 ${guild.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux`, inline: true},
              {name: "🌠 **Boost Level**", value: `Niveau ${guild.premiumTier}`, inline: true},
              {name: "🌟 **Boost**", value: `${guild.premiumSubscriptionCount} Boost`, inline: true},
              {name: "🌀 **Partenaire**", value: `${guild.partnered ?  'Oui' : 'Non'}`, inline: true}
  
    		);
            
            message.channel.send({embeds: [embed]})
        })
        
    },
    name: 'serverinfo++',
    category: "admin",
    aliases: ["si++"],
    help: {
        description: 'Permet d\'avoir les informations d\'un serveur spécifique (créateur only)',
        syntax: '<ID>'
    }
}