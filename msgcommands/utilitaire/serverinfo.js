const { Message, EmbedBuilder, ChannelType, GuildPremiumTier } = require('discord.js')
const moment = require("moment")

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {*} Bot 
     * @param {*} data 
     */
    run: (message, args, Bot, data) => {
            const guild = message.guild;
            Bot.users.fetch(String(guild.ownerId)).then(userOwner => {
                const embed = new EmbedBuilder()
                .setTitle(`ℹ️・Informations sur le serveur ${message.guild.name}`)
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 2048, format: "webp", dynamic: true }) })
                .setFooter({ text: `Demandé par ${message.author.tag}`, iconURL: message.guild.iconURL({ size: 2048, format: "webp", dynamic: true }) })
                .setColor('B4E0E0')
                .setThumbnail(guild.iconURL())
                .addFields(
                    {name: `${Bot.emotes.textzone} | **Nom**`, value: `> ${guild.name}`, inline: true},
                    {name: `${Bot.emotes.id} | **ID Du Serveur**`, value: `> ${guild.id}`, inline: true},
                    {name: `${Bot.emotes.crown} | **Propriétaire**`, value: `> ${userOwner.tag} (${guild.ownerId})`, inline: true},
                    {name: `${Bot.emotes.calendar} | **Serveur Créé le**`, value: `> ${moment(guild.createdAt).format('DD/MM/YYYY')} à ${moment(guild.createdAt).format('HH:MM')}`, inline: true},
                    {name: `${Bot.emotes.people} | **Membres**`, value: `> ${guild.memberCount -1} Membres`, online: true},
                    {name: `${Bot.emotes.usergear} | **Rôles**`, value: `> ${guild.roles.cache.size} rôles`, inline: true},
                    {name: `${Bot.emotes.discuss} | **Salons**`, value: `> ${Bot.emotes.text}・${guild.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size} Salon(s) Textuel(s)\n> ${Bot.emotes.voice}・${guild.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size} Salon(s) Vocaux`, inline: true},
                    {name: `${Bot.emotes.utils.main} | **Niveau de boost**`, value: `> Niveau ${guild.premiumTier === GuildPremiumTier.None ? '0' : guild.premiumTier === GuildPremiumTier.Tier1 ? "1" : guild.premiumTier === GuildPremiumTier.Tier2 ? '2' : guild.premiumTier === GuildPremiumTier.Tier3 ? "3" : "Une erreur est survenue lors de la récupération du niveau."}`, inline: true},
                    {name: `${Bot.emotes.uptime} | **Boost**`, value: `> ${guild.premiumSubscriptionCount} Boost(s)`, inline: true},
                    {name: `${Bot.emotes.partner} | **Partenaire Discord**`, value: `> ${guild.partnered ?  'Oui' : 'Non'}`, inline: true}
                );
            message.channel.send({embeds: [embed]});
        })
    	},
        name: 'serverinfo',
        category: "utilitaire",
        cooldown: '3s',
        guildOnly: true,
        aliases: ["si"],
        help: {
            description: 'Permet de connaître les informations du serveur où est exécuté la commande.',
            syntax: ''
	}
}