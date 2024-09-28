const { Message, PermissionFlagsBits, MessageType, EmbedBuilder } = require('discord.js');
const HuskyBot = require('../Utils/HuskyBot');
const Utils = require('../Utils/Utils');
const pjson = require('../package.json');

module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {Message} message 
     */
    run: async (Bot, message) => {
        try {
            if (message.type !== MessageType.Default || message.author.bot) return;
            const data = await Bot.getGuild(message.guild.id);
            const args = message.content.trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();
            if (message.content === Bot.user.toString()) return await message.channel.send(`Oh oh ! Je voit qu'on me mentionne... Mon préfixe actuel sur ce serveur est **${data.Prefix}**. Tapez **${data.Prefix}help** pour voir la liste des commandes !`);
            if (!commandName.startsWith(data.Prefix)) return;
            const command = Bot.msgcommands.get(commandName.slice(data.Prefix.length)) || Bot.msgcommands.get(Bot.aliases.get(commandName.slice(data.Prefix.length)));
            if (!command) return
            if (command.guildOnly && !message.guild) return await message.channel.send(`${Bot.emotes.non} **- Cette commande ne peut pas être utilisée hors d'un serveur !**`)
            if (!message.channel.permissionsFor(Bot.user.id).has(PermissionFlagsBits.SendMessages)) return await message.author.send(`${Bot.emotes.non} **- HuskyBot ne possède pas les permissions nécéssaires pour envoyer des messages. Merci de lui accorder cette permission.**`).catch(err => {});
            
            const cooldownAnswer = Utils.handleCooldowns(Bot, message, command);
            if (cooldownAnswer) return;

            Bot.logger.info(`${message.author.tag} a utilisé ${command.name} dans ${message.guild.name}`);
            await command.run(message, args, Bot, data);
            
        } catch(e) {
            const embed = new EmbedBuilder()
                .setTitle(`${Bot.emotes.bug} **- Oups !**`)
                .setDescription(`> Une erreur est survenue lors de l'exécution de la commande.\n> Mais les développeurs sont déjà sous le pont !\n\n> *Merci de reporter le bug avec la commande bug, ou venir nous contacter sur le support.*`)
                .setColor(Bot.colors.error)
                .setTimestamp()
                .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ extension: 'webp', size: 2048 }) })
                .setFooter({ text: `HuskyBot v${pjson.version}`, iconURL: Bot.user.avatarURL({ extension: 'webp', size: 2048 }) });
            message.channel.send({ embeds: [embed] }).catch(err => {});

            const error = await Bot.generateError(e, message.guild, "unknown");
            Bot.logger.error(`Une erreur sur le serveur ${message.guild.name} est survenue : ${error.ErrorID}`);

            const channel = await Bot.channels.fetch(Bot.config.errorLogChannel);
            channel.send(`<@852957530711261234>\n**${Bot.emotes.bug}・Nouvelle erreur**\n> Serveur: ${message.guild.name}\n> ErrorID: ${error.ErrorID}`);
        };
    },
};