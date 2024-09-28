const { PermissionFlagsBits, Interaction, ButtonInteraction, ChannelType, ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder, parseEmoji } = require('discord.js');
const ms        = require('ms');
const msf       = require('format-ms');
const HuskyBot  = require('./HuskyBot');

class Utils {
    static handleCooldowns(Bot, command, message) {
        if(command.cooldown && !command.name === "bump") {
            const diff = (Bot.cooldowns.get(`${message.guild.name}${command.name}${message.author.id}`) - Date.now());
            const formatedDate = msf.formatMilliseconds(diff, { ignore: [ 'millisecond' ] });
            if (Bot.cooldowns.has(`${message.guild.name}${command.name}${message.author.id}`)) return message.channel.send(`${Bot.emotes.non} **- Attend ! Tu vas trop vite ! Tu pourras réutiliser cette commande dans ${formatedDate}**`);
            Bot.cooldowns.set(`${message.guild.name}${command.name}${message.author.id}`, Date.now() + ms(command.cooldown));
            setTimeout(() => {
                Bot.cooldowns.delete(`${message.guild.name}${command.name}${message.author.id}`)
            }, ms(command.cooldown));

        } else if(command.cooldown && command.name === "bump") {
            const diff = Bot.guildCooldowns.get(`${message.guild.id}${command.name}`) - Date.now();
            const formatedDate = msf.formatMilliseconds(diff, { ignore: [ 'millisecond' ] });
            if (Bot.guildCooldowns.has(`${message.guild.id}${command.name}`)) return message.channel.send(`${Bot.emotes.non} **- Attend ! Tu vas trop vite ! Tu pourras bumper le serveur dans ${formatedDate}**`);
            Bot.guildCooldowns.set(`${message.guild.id}${command.name}`, Date.now() + ms(command.cooldown));
            setTimeout(() => {
                Bot.guildCooldowns.delete(`${message.guild.id}${command.name}`);
            }, ms(command.cooldown));
        };
    };

    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {Interaction} interaction 
     * @param {*} data 
     * @returns 
     */
    static async handleButtons(Bot, interaction, data) {
        if(!interaction.isButton()) return;
        switch(interaction.customId) {
            case "ticket_button":
                await this.handleTickets(Bot, interaction, data);
                break;
            case "close_ticket": 
                await this.handleCloseTicket(Bot, interaction, data);
                break;
            default:
                return;
        };
    };


    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {ButtonInteraction} interaction 
     * @param {*} data 
     */
    static async handleTickets(Bot, interaction, data) {
        if(data.isTicketEnabled === false) return interaction.reply({ content: `${Bot.emotes.non} **- Le système de tickets à été désactivé.**`, ephemeral: true })
        if(!data.ticketRole) return interaction.reply({ content: `${Bot.emotes.non} **- Le système de ticket n'a pas été correctement configuré. Manque de: Rôle**`, ephemeral: true })
        if(!data.ticketEmoji) return interaction.reply({ content: `${Bot.emotes.non} **- Le système de ticket n'a pas été correctement configuré. Manque de: Emoji**`, ephemeral: true })
        let parent = data.ticketCategory;
        if(!parent) {
            const cat = await interaction.guild.channels.create(`Tickets`, {
                type: ChannelType.GuildCategory
            });
            parent = cat.id;
        };
        const role = data.ticketRole;
                
        const oldTicket = await data.openedTickets.find(object => object.authorID === interaction.member.id);
        if(oldTicket) return interaction.reply({ content: `${Bot.emotes.non} **- Tu as déjà un ticket d'ouvert !**`, ephemeral: true });
        
        const channel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: parent,
            permissionOverwrites: [{
                id: interaction.guild.id,
                deny: PermissionFlagsBits.ViewChannel
            }, {
                id: interaction.member.id,
                allow: PermissionFlagsBits.ViewChannel
            }, {
                id: role,
                allow: PermissionFlagsBits.ViewChannel
            }]
        });
        const ticket = {
            authorID: interaction.member.id,
            channelID: channel.id
        };
        await data.openedTickets.push(ticket);
        await data.updateOne(data);
        const msgActionRow = new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji("❌").setCustomId("close_ticket").setLabel("Fermer"));
        channel.send({
            content: `<@&${role}>`,
            embeds: [
                new EmbedBuilder()
                    .setTitle("Ticket")
                    .setDescription(`Bienvenue sur ton ticket ${interaction.member} ! \nLes staffs ne vont pas tarder à venir t'aider ! NE LES MENTIONNES PAS !!!`)
                    .setColor("Random")
                    .setTimestamp()
            ],
            components: [msgActionRow]
        })
        interaction.reply({ content: `${Bot.emotes.yep} **- Votre ticket à été ouvert: ${channel}**`, ephemeral: true });
    };

    static async handleCloseTicket(Bot, interaction, data) {
        const channel = interaction.channel;
        const ticket = await data.openedTickets.find(object => object.channelID === channel.id);
        if(!ticket) return interaction.reply(`${Bot.emotes.non} **- C'est moi ou ce salon n'est pas un ticket ? Il n'est pas référencé dans ma base de donnée...**`, {ephemeral: true})
        await interaction.reply(`${Bot.emotes.yep} **- le ticket ${channel.name} sera fermé dans 3s.**`);
        await this.wait(3000);
        await data.updateOne({ $pull: { openedTickets: ticket} });
        channel.delete();
    };

    static wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    static generateID(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        return result;
    };

    /**
     * 
     * @param {HuskyBot} client 
     * @param {*} emoji 
     * @returns 
     */
    static isValidEmoji(client, emoji) {
        let emojiparsed
        if(typeof emoji === "string") emojiparsed = parseEmoji(emoji);
        else emojiparsed = emoji;
        if(!emojiparsed) return false;
        if(emojiparsed.id || emojiparsed.animated) {
            const finded = client.emojis.cache.find(emoji => emoji.id === emojiparsed.id) || client.emojis.cache.find(emoji => emoji.name === emojiparsed.name) || client.emojis.resolveId(emojiparsed.id);
            if(!finded) return false;
            return true;
        };

        return true;
    };
};


module.exports = Utils;