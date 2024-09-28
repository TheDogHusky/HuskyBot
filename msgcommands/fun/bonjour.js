const Discord = require('discord.js')

module.exports = {
    run: message => message.channel.send(`Hey ${message.author.username} !`),
    name: 'bjr',
    category: "fun",
    cooldown: '1s',
    aliases: ["yo", "salut", "bonjour"],
    help: {
        description: "Il vous réponds",
        syntax: ""
    }
}