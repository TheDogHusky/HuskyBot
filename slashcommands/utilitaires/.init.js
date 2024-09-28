const Discord = require('discord.js');
const fs = require('fs');

const subs = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
    const command = require(`./${file}`);
    if(!file === ".init.js" && command.name) {
        subs.set(command.name, command);
    };
};

module.exports = {
    name: "utilitaires",
    description: "Utils commandes",
    options: [],
    subs,
    global: true,
    utils: {
        emote: "<:utils:882612070338666506>"
    }
};

subs.forEach(sub => {
    module.exports.options.push({
        name: sub.name,
        description: sub.description,
        type: 1,
        options: sub.options
    });
});