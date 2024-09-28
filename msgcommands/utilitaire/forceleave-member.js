const { PermissionFlagsBits } = require('discord.js'),
    emotes = require('../../emotes.json')

module.exports = {
  run: (message, args, Bot, data) => {
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.channel.send(`${emotes.non} **- Waouf ! Tu dois posséder la permission ADMINISTRATEUR pour me faire partir.**`)
    message.guild.leave()
  },
  name: 'forceleave',
  category: "utilitaire",
  cooldown: '3s',
  guildOnly: true,
  aliases: ["leave"],
  help: {
    description: 'Permet de faire quitter le bot du serveur.',
    syntax: ''
  }
}