const HuskyBot = require('../Utils/HuskyBot');
const { GuildMember, TextChannel } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {GuildMember} member 
     */
    run: async (Bot, member) => {
        const data = Bot.getGuild(member.guild.id);
        if(!data) return;
        if(data.isGoodbyeEnabled === false) return;
        if(!data.goodbyeChannel) return;
        const gChannel = await member.guild.channels.fetch(data.goodbyeChannel);
        if(!gChannel || !gChannel instanceof TextChannel) return;
        let wMessage = data.goodbyeMsg;
        // Replacements
        wMessage = wMessage.replaceAll("%member%", member);
        wMessage = wMessage.replaceAll("%server.name%", member.guild.name);
        wMessage = wMessage.replaceAll("%server.memberCount%", member.guild.memberCount);
        wMessage = wMessage.replaceAll("%member.tag%", member.user.tag);
        // Envoi
        try {
            await gChannel.send(wMessage);
        } catch(e) {
            return Bot.logger.error(`Une erreur est survenue lors de l'envoi du message d'au revoir sur le serveur ${member.guild.name}: \n${e.stack}`, "guildMemberRemove");
        };
    },
};