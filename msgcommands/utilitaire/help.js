const Discord = require('discord.js');
const emotes = require('../../emotes.json');
const { PermissionFlagsBits, ButtonStyle } = require('discord.js');
module.exports = {
    run: (message, args, Bot, data) => {
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.EmbedLinks)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission EMBED_LINKS au bot.**`)
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.SendMessages)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission SEND_MESSAGES au bot.**`)
        if(!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.UseExternalEmojis)) return message.author.send(`${Bot.emotes.non} **- Afin de ne pas renontrer de bugs succeptibles de faire crasher le bot, veuillez accorder la permission USE_EXTERNAL_EMOJIS au bot.**`)
        
        if (args[0]) {
            const command = Bot.msgcommands.get(args[0].toLowerCase()) || Bot.msgcommands.get(Bot.aliases.get(args[0].toLowerCase()));
            if (!command || !command.help) return message.channel.send(`${emotes.non} **- Commande inconnue**`);
            message.channel.send({embeds: [new Discord.EmbedBuilder()
                .setDescription(`**❔・Commande ${command.name}**\n\n> Les arguments entre <> sont des arguments obligatoires. Les arguments entre [] sont des arguments optionnels.\n\n> ${command.help.description}\n\n> Syntaxe: \`${data.Prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\`\n> Aliases: \`${command.aliases.join(", ")}\`\n> Catégorie: \`${command.category}\`\n> Cooldown: \`${command.cooldown}\``)
                .setColor('#00f7ff')
                .setFooter({ text: `Aide détaillée - ${message.author.username}`, value: 'https://cdn.discordapp.com/attachments/774343135198707792/815174792960409631/husky_logo.jpg' })
                .setTimestamp()
                .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })]});
        } else {
            const commandUtilitaires = Bot.msgcommands.filter(command => command.category === 'utilitaire');
            const commandModération = Bot.msgcommands.filter(command => command.category === 'moderation');
            const commandFun = Bot.msgcommands.filter(command => command.category === 'fun');
            const commandAdmin = Bot.msgcommands.filter(command => command.category === "admin");
            const commandConfig = Bot.msgcommands.filter(command => command.category === "configuration");
            const commandTicket = Bot.msgcommands.filter(command => command.category === "ticket");
            const commandSuggs = Bot.msgcommands.filter(command => command.category === "suggestions");

            const buttons = [
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support Serveur').setURL('https://discord.gg/kyaZqApvE8'),
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite').setURL('https://discord.com/oauth2/authorize?client_id=769527725802913816&scope=bot&permissions=8'),
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Vote Top.gg').setURL('https://top.gg/bot/769527725802913816/vote'),
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Site web').setURL('https://huskybot.worldwild.studio'),
            ];

            const button1 = new Discord.ActionRowBuilder()
                .addComponents(...buttons);
            message.channel.send({ embeds: [new Discord.EmbedBuilder()
                .setTitle(`❔Page d'aide - **${Bot.user.username}**❔`)
                .setDescription(`Pour exécuter une commande, tapez \`${data.Prefix}<commande>\`\nPour plus d'informations sur une commande, tapez \`${data.Prefix}help [commande]\``)
                .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
                .setThumbnail('https://cdn.discordapp.com/attachments/774343135198707792/815174792960409631/husky_logo.jpg')
                .setFooter({ text: `Page d'aide - ${message.author.username}`, iconURL: 'https://cdn.discordapp.com/attachments/774343135198707792/815174792960409631/husky_logo.jpg' })
                .setTimestamp()
                .addFields(
                    { name: `${emotes.mod.main}・Modération`, value: `> ${commandModération.map(command => `\`${command.name}\``).join(', ')}` },
                    { name: `${emotes.fun.main}・Fun`, value: `> ${commandFun.map(command => `\`${command.name}\``).join(', ')}` },
                    { name: `${emotes.utils.main}・Utilitaires`, value: `> ${commandUtilitaires.map(command => `\`${command.name}\``).join(', ')}` },
                    { name: `${emotes.version}・Configuration`,  value: `> ${commandConfig.map(command => `\`${command.name}\``).join(", ")}` },
                    { name: `${emotes.ticket.main}・Ticket`, value: `> ${commandTicket.map(command => `\`${command.name}\``).join(", ")}` },
                    { name: `${emotes.uptime}・Système de suggestions`, value: `> ${commandSuggs.map(command => `\`${command.name}\``).join(", ")}` },
                    { name: `${emotes.admin.main}・Administration`, value: `> ${commandAdmin.map(command => `\`${command.name}\``).join(", ")}` },
                    { name: `${emotes.infos}・Additions`, value: `\n> Pour reporter un bug, faites \`${data.Prefix}bug <votre bug>\` !\n> Vous avez une suggestion ? Nous sommes preneurs ! Faites \`${data.Prefix}sugg <votre suggestion>\` pour nous en faire part !` }
                )
                .setColor(Bot.colors.main)], components: [button1] });
    }},
    name: 'help',
    aliases: ["h", "aide"],
    cooldown: '3s',
    category: "utilitaire",
    help: {
        description: 'Cette commande permet d\'afficher la page d\'aide',
        syntax: '[nom de la commande]'
    }
};