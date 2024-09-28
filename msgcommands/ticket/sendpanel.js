const { PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Utils = require("../../Utils/Utils");

module.exports = {
    run: async (message, args, Bot, data) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) return message.channel.send(`${Bot.emotes.non} **- Vous devez avoir la permission \`ManageGuild\` pour exécuter cette commande.**`)
        if(data.isTicketEnabled === false) return message.channel.send(`${Bot.emotes.non} **- Le système de tickets n'est pas activé.**`)
        if(!data.ticketEmoji) return message.channel.send(`${Bot.emotes.non} **- Le système de tickets n'est pas correctement configuré (manque de l'émoji).**`)
        const valid = Utils.isValidEmoji(Bot, data.ticketEmoji);
        if(!valid) return message.channel.send(`${Bot.emotes.non} **- Le système de tickets n'est pas correctement configuré (l'émoji n'existe pas).**`)
        if(!data.ticketRole) return message.channel.send(`${Bot.emotes.non} **- Le système de tickets n'est pas correctement configuré (manque du rôle staff).**`)
        const embed = new EmbedBuilder()
            .setTitle('🎫 - Ticket')
            .setDescription(`Pour contacter le support, ouvrez un ticket avec le bouton ci dessous.`)
            .setColor("Random")
        const actionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket_button").setEmoji(data.ticketEmoji).setStyle(ButtonStyle.Primary))
        message.delete()
        message.channel.send({ embeds: [embed], components: [actionRow] })
    },
    name: 'sendpanel',
    category: 'ticket',
    cooldown: '15s',
    aliases: ['sp', "sendticketpanel", "sendp"],
    help: {
        description: 'Permet d\'envoyer le panel pour ouvrir un ticket !',
        syntax: ''
    }
}