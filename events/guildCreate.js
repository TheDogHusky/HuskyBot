const HuskyBot = require('../Utils/HuskyBot');
const { Guild, EmbedBuilder } = require('discord.js');
 
module.exports = {
    name: 'guildCreate',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {Guild} guild 
     */
    run: async (Bot, guild) => {
        const data = Bot.getGuild(guild.id);
        
        const userOwner = await guild.fetchOwner();
        const embed4 = new EmbedBuilder()
            .setTitle('➕・Nouveau serveur')
            .setDescription(`**HuskyBot** viens de rejoindre un nouveau serveur!\n\n**Détails**:\n- ID: ${guild.id}\n- Nom: ${guild.name}\n- Membres: ${guild.memberCount} (à l'arrivée)\n- Propriétaire: ${userOwner.tag} (${userOwner})`)
            .setColor('#00f7ff')
            .setTimestamp()
            .setThumbnail(guild.iconURL())
            .setFooter(`HuskyBot est maintenant sur ${Bot.guilds.cache.size} serveurs !`);
        const channel = await Bot.channels.fetch('852957568129040434');
        channel.send({embeds: [embed4]});
    },
};