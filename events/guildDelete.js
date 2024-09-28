const HuskyBot = require('../Utils/HuskyBot');
const { Guild, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildDelete',
    once: false,
    /**
     * 
     * @param {HuskyBot} Bot 
     * @param {Guild} guild 
     * @returns 
     */
    run: async (Bot, guild) => {
        if (Bot.isReady() === true && guild.available === true) {
            await (await Bot.schemas.guild.findOne({ GuildID: guild.id })).deleteOne();
            const userOwner = await guild.fetchOwner();
            const embed1 = new EmbedBuilder()
                .setTitle('➖・Serveur Quitté')
                .setDescription(`**HuskyBot** viens de quitter un serveur!\n\n**Détails**:\n- ID: ${guild.id}\n- Nom: ${guild.name}\n- Membres: ${guild.memberCount} (à la sortie)\n- Propriétaire: ${userOwner.tag} (${userOwner})`)
                .setColor('#00f7ff')
                .setTimestamp()
                .setThumbnail(guild.iconURL())
                .setFooter(`HuskyBot est maintenant sur ${Bot.guilds.cache.size} serveurs !`);
            const channel = await Bot.channels.fetch('852957568129040434');
            channel.send({embeds: [embed1]});
        } else {
            return;
        }
    },
}