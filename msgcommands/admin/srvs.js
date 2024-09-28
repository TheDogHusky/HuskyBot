const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, Collection, ComponentType, Message } = require('discord.js');
const HuskyBot = require('../../Utils/HuskyBot');

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {*} args 
     * @param {HuskyBot} client 
     * @param {*} data 
     * @returns 
     */
    run: async (message, args, client, data) => {
        if(message.member.id !== "662227196814819349") return message.channel.send({ content: ":x:・L’accès vous y est interdit !", ephemeral: true });
        let totalArray;
        let totalMap;
        await client.guilds.fetch().then(i => {
            totalArray = Array.from(i);
            totalMap = i;
        });

        const b1 = new ButtonBuilder()
            .setCustomId("page_precedente")
            .setEmoji("⬅️")
            .setStyle(ButtonStyle.Primary);
        const b2 = new ButtonBuilder()
            .setCustomId("delete_msg")
            .setEmoji("❌")
            .setStyle(ButtonStyle.Danger);
        const b3 = new ButtonBuilder()
            .setCustomId("page_suivante")
            .setEmoji("➡️")
            .setStyle(ButtonStyle.Primary);
        const messageRow = new ActionRowBuilder()
            .addComponents(b1, b2, b3);
        const tempMapOriginal = new Collection(totalArray.slice(0, 20));
        const list = tempMapOriginal.map(a => `\`${a.name}\` **[** ID: \`${a.id}\` **]**`).join('\n> ');
        const embed = new EmbedBuilder()
            .setTitle('Liste des serveurs')
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ extension: 'webp', size: 2048 }) })
            .setDescription(`> ${list}`)
            .setFooter({ text: "⚠️ - Ce message se supprimera dans 60s" })
            .setTimestamp()
            .setColor('Random');
        const msg = await message.channel.send({ embeds: [embed], components: [messageRow] });
        let page = 0;
        let minServs = 0;
        let maxServs = 20;
        const collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000, filter: null });
        collector.on("collect", i => {
            if(i.member.id !== message.member.id) return i.reply({ content: `:x:・Cette interaction ne vous appartient pas !`, ephemeral: true });

            if(i.customId === "page_precedente") {
                page--;
                if(page < 0) return i.reply({ content: ':x:・Il n\'y pas de page -1 :/', ephemeral: true }) && page++;
                minServs -= 20;
                maxServs -= 20;
                const tempMap = new Collection(totalArray.slice(minServs, maxServs));
                const list = tempMap.map(a => `\`${a.name}\` **[** ID: ${a.id} **]**`).join('\n> ');
                embed.setTitle('Liste des serveurs - Page ' + page);
                embed.setDescription(`> ${list.length < 1 ? "Aucun serveur :/" : list}`);
                i.message.edit({ embeds: [embed], components: [messageRow] });
            } else if(i.customId === "delete_msg") {
                collector.stop("Delete par bouton")
                embed.setDescription(`> :warning: - **__Ce message sera supprimé à la fin des 60 secondes, l'intéraction à été rendue impossible.__**`);
                const b1 = new ButtonBuilder()
                    .setCustomId("page_precedente")
                    .setEmoji("⬅️")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary);
                const b2 = new ButtonBuilder()
                    .setCustomId("delete_msg")
                    .setEmoji("❌")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger);
                const b3 = new ButtonBuilder()
                    .setCustomId("page_suivante")
                    .setEmoji("➡️")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary);
                const messageRow = new ActionRowBuilder()
                    .addComponents(b1, b2, b3);
                    i.message.edit({ embeds: [embed], components: [messageRow] });
            } else if(i.customId === "page_suivante") {
                page++;
                minServs += 20;
                maxServs += 20;
                const tempMap = new Collection(totalArray.slice(minServs, maxServs));
                const list = tempMap.map(a => `\`${a.name}\` **[** ID: ${a.id} **]**`).join('\n> ');
                embed.setTitle('Liste des serveurs - Page ' + page)
                embed.setDescription(`> ${list.length < 1 ? "Aucun serveur :/" : list}`);
                i.message.edit({ embeds: [embed], components: [messageRow] });
            }

            // Rendre l'interaction réussie
            i.deferUpdate();
        });

        function cancelAll() {
            if(collector.ended === false) collector.endReason("60 secondes terminées");
            msg.delete();
        };
        setTimeout(() => cancelAll, 60000);
    },
    name: 'serveurs',
    category: "admin",
    aliases: ["srvs"],
    help: {
    description: 'Permet de voir la liste de tout les serveurs ou le bot est (créateur only)',
    syntax: ''
	}
}