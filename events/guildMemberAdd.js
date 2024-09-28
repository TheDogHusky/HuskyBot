const HuskyBot = require('../Utils/HuskyBot');
const { GuildMember, TextChannel } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {GuildMember} member 
     * @returns 
     */
    run: async (Bot, member) => {
        const data = Bot.getGuild(member.guild.id);
        if(!data) return;
        if(data.isWelcomeEnabled === false) return;
        if(!data.welcomeChannel) return;
        const wChannel = await member.guild.channels.fetch(data.welcomeChannel);
        if(!wChannel || !wChannel instanceof TextChannel) return;
        let wMessage = data.welcomeMsg;
        // Replacements
        wMessage = wMessage.replaceAll("%member%", member);
        wMessage = wMessage.replaceAll("%server.name%", member.guild.name);
        wMessage = wMessage.replaceAll("%server.memberCount%", member.guild.memberCount);
        wMessage = wMessage.replaceAll("%member.tag%", member.user.tag);
        // Envoi
        try {
            await wChannel.send(wMessage);
        } catch(e) {
            return Bot.logger.error(`Une erreur est survenue lors de l'envoi du message de bienvenue sur le serveur ${member.guild.name}: \n${e.stack}`, "guildMemberAdd");
        };
    },
}