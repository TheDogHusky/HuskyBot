const HuskyBot = require('../Utils/HuskyBot');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {HuskyBot} Bot 
     */
    run: async (Bot) => {
        Bot.logger.info(`Bot connecté en tant que ${Bot.user.tag}. -- Running`, 'Loader');
        Bot.user.setActivity(`Chargement...`, { type: ActivityType.Playing });
        await Bot.postSlashCommands();
        const statuses = [
            () => `${Bot.config.defaultprefix}help`,
            () => `Sur ${Bot.guilds.cache.size} serveurs`,
            () => `Site web en bêta !`,
            () => `${Bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`,
            () => `Image de Husky ? ${Bot.config.defaultprefix}husky`
        ];
        let i = 0;
        setInterval(() => {
            Bot.user.setActivity(statuses[i](), { type: ActivityType.Streaming, url: 'https://www.twitch.tv/classyoff' });
            i = ++i % statuses.length;
        }, 1e4);
        setInterval(async () => {
            const guilds = await Bot.guilds.fetch();
            for (const guild of guilds.values()) {
                const data = await Bot.getGuild(guild.id, false);
                if(!data) continue;
                if (data.bannedMembers) {
                    const guildFetched = await Bot.guilds.fetch(guild.id);
                    for(const object of data.bannedMembers) {
                        if((object.At + object.Duration) < Date.now()) {
                            await guildFetched.members.unban(object.UserID);
                            await data.updateOne({ $pull: { bannedMembers: object } });
                        };
                    };
                };
            };
        }, 60000);
    },
};