const moment = require('moment'),
    { EmbedBuilder } = require('discord.js');

module.exports = {
    run: (message, args, Bot, data) => {       
        let member = message.member;
        if (args[0]) member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : null;
        let user = member.user;
        const embed = new EmbedBuilder()
            .setTitle(`ℹ️・Informations sur l'utilisateur ${user.tag}`, message.author.avatarURL())
            .setColor('B4E0E0')
            .setThumbnail(user.displayAvatarURL())
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ size: 2048, format: "webp", dynamic: true }) })
            .setFooter({ text: `Demandé par ${message.author.tag}`, iconURL: message.guild.iconURL({ size: 2048, format: "webp", dynamic: true }) })
            .addFields(
                {name: `${Bot.emotes.textzone} | **Tag**`, value: `> ${user.tag}`, inline: true},
                {name: `${Bot.emotes.text} | **Surnom**`, value: `> ${!member.nickname ? 'Aucun surnom' : `${member.nickname}`}`, inline: true},
                {name: `${Bot.emotes.createur} | **Bot**`, value: `> ${user.bot ? 'Cet utilisateur est un Bot' : 'Cet utilisateur n\'est pas un Bot'}`, inline: true},
                {name: `${Bot.emotes.id} | **ID**`, value: `> ${member.id}`, inline: true},
                {name: `${Bot.emotes.calendar} | **Compte créé le**`, value: `> ${moment(user.createdAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
                {name: `${Bot.emotes.calendar} | **A rejoins le**`, value: `> ${moment(member.joinedAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
                {name: `${Bot.emotes.utils.main} | **Boost Serveur**`, value: `> ${member.premiumSince ? `Depuis le ${member.premiumSinceTimestamp}` : `N'a pas boost le serveur`}`, inline: true},
                {name: `${Bot.emotes.usergear} | **Rôles**`, value: `> ${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}`, inline: false},
            );
        message.channel.send({embeds: [embed]})
    },
    name: 'userinfo',
    category: "utilitaire",
    cooldown: '3s',
    aliases: ["ui"],
    help: {
        description: 'Permet d\'avoir les informations concernant un  utilisateur',
        syntax: '[@mention]'
    }
}