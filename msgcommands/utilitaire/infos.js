const Discord = require('discord.js'),
    { defaultprefix } = require('../../config'),
    moment = require('moment'),
    os = require('os'),
    emotes = require('../../emotes.json'),
    { version } = require('../../package.json')

module.exports = {
    run: async (message, args, Bot, data) => {
        
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const createur = await Bot.users.fetch("662227196814819349");
        const kurama = await Bot.users.fetch("639992024606441473");
        const aiko = await Bot.users.fetch("985986599995187270");

        const embed = new Discord.EmbedBuilder()
            .setTitle(`📖Infos - **HuskyBot**📖`)
            .setDescription(`Informations:`)
            .addFields(
                { name: `**${emotes.prefixe}・Préfixe**`, value: `> Serveur: \`${data.Prefix}\`\n> Par défaut: \`${defaultprefix}\``, inline: true },
                { name: `**${emotes.createur}・Créateur**`, value: `> \`${createur.tag}\``, inline: true },
                { name: `**${emotes.serveurs}・Serveurs**`, value: `> \`${Bot.guilds.cache.size}\`\n> \`${Bot.guilds.cache.size} / 75 (manque ${75 - Bot.guilds.cache.size})\``, inline: true },
                { name: `**${emotes.people}・Utilisateurs**`, value: `> \`${Bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: true },
                { name: `**${emotes.uptime}・Uptime**`, value: `> En ligne depuis \`${(Math.round(Bot.uptime / (1000 * 60 * 60 * 24)) % 30) + " Jours, " + (Math.round(Bot.uptime / (1000 * 60 * 60)) % 24) + " Heures, " + (Math.round(Bot.uptime / (1000 * 60)) % 60) + " Minutes, " + (Math.round(Bot.uptime / 1000) % 60) + " Secondes"}\``, inline: true },
                { name: `**${emotes.power}・Latence**`, value: `> \`${Bot.ws.ping}ms\``, inline: true },
                { name: `**${emotes.version}・Version**`, value: `> \`${version}\``, inline: true },
                { name: `**${emotes.commandes}・Nombre de Commandes**`, value: `> \`${Bot.msgcommands.size}\``, iinline: true },
                { name: `**${emotes.cpu}・Architecture**`, value: `> **Discord.js:** \`${Discord.version}\`\n> **Node.js:** \`${process.versions.node}\`\n> **Type:** \`${os.arch()}\`\n> **OS:** \`${os.platform()}\``, inline: true },
                { name: `**${emotes.ram}・Mémoire**`, value: `> \`${Math.round(used * 100) / 100}MB / 7980MB\``, inline: true },
                { name: `**${emotes.credits}・Crédits**`, value: `> Commande ServerInfo et UserInfo: \`FrankoPaulo\`\n> Emojis: \`Flaticon\``, inline: true },
                { name: `**${emotes.aideurs}・Aideurs**`, value: `> \`${aiko.tag}\` -> Aide au développement (catégories, bugs et aliases)\n> \`${kurama.tag}\` -> Aide au développement important (base de données, bugs)`, inline: true },
            )
            .setColor(Bot.colors.main)
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
            .setThumbnail('https://cdn.discordapp.com/attachments/774342985303326780/810533698985394216/husky_logo.jpg')
            .setFooter({ text: `Infos - ${message.author.username}`, iconURL: 'https://cdn.discordapp.com/attachments/774342985303326780/810533698985394216/husky_logo.jpg' })
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
    },
    name: 'infos',
    category: "utilitaire",
    cooldown: '3s',
    aliases: ["i", "informations", "botinfos", "botinfo", "info"],
    help: {
        description: 'Permet de voir les informations du bot.',
        syntax: ''
    }
}