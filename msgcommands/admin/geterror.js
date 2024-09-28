const { Message } = require("discord.js");
const HuskyBot = require("../../Utils/HuskyBot");
const moment = require("moment");

moment.updateLocale("fr");

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {HuskyBot} Bot 
     * @param {*} data 
     */
    run: async (message, args, Bot, data) => {
        const auth = ["662227196814819349", "539223126119022603"];
        if(!auth.includes(message.author.id)) return await message.channel.send(`${Bot.emotes.non} **- Vous n'êtes pas autorisé à utiliser cette commande.**`);
        const ID = args[0];
        if(!ID) return await message.channel.send(`${Bot.emotes.non} **- Vous devez spécifier un ID d'erreur !**`);
        const error = await Bot.getError(ID);
        if(!error) return await message.channel.send(`${Bot.emotes.non} **- Aucun message d'erreur ne correspond à cet ID !**`);
        const guild = await Bot.guilds.fetch(error.from.guildId);
        const embed = new MessageEmbed()
            .setColor(Bot.colors.error)
            .setTitle(`${Bot.emotes.bug}・Erreur \`${ID}\``)
            .setDescription(error.ErrorMessage)
            .setTimestamp()
            .addFields({
                name: `${Bot.emotes.cpu}・Stack Trace`,
                value: `\`\`\`js\n${error.ErrorStack}\`\`\``,
                inline: true
            }, {
                name: `${Bot.emotes.infos}・From`,
                value: `> Serveur: ${guild.name} (${guild.id})`,
                inline: true
            }, {
                name: `${Bot.emotes.calendar}・Date`,
                value: `> ${moment(error.ErrorDate).format('DD/MM/YYYY')} à ${moment(error.date).format('HH:MM')}`,
                inline: true
            }, {
                name: `${Bot.emotes.power}・Type`,
                value: `> \`${error.ErrorType}\``,
                inline: true
            })
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            .setFooter({ text: `HuskyBot v${Bot.version}`, iconURL: Bot.user.avatarURL() });
        await message.channel.send({ embeds: [embed] });
    },
    name: 'geterror',
    category: 'admin',
    cooldown: '10s',
    aliases: ["ge"],
    help: {
        description: 'Permet de récupérer une erreur du bot',
        syntax: '<ErrorID>'
    }
};