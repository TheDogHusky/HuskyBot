const { Message } = require('discord.js');
const HuskyBot = require('../../Utils/HuskyBot');

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {HuskyBot} Bot 
     * @param {*} data 
     * @returns 
     */
    run: (message, args, Bot, data) => {
            const member = message.mentions.members.first()
            if(!member) return message.channel.send(`${message.author.avatarURL({ extension: 'webp', size: 2048 })}`)
            message.channel.send(`${member.user.avatarURL({ extension: 'webp', size: 2048 })}`)
    },
    name: 'avatar',
    category: "utilitaire",
    cooldown: '5s',
    aliases: ["pdp"],
    help: {
        description: 'Permet de voir votre avatar',
        syntax: '[@mention]'
    }
}