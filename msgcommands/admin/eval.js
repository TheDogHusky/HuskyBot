const Discord = require('discord.js')

module.exports = {
    run: async (message, args, Bot, data) => {

      function clean(text) {
        if (typeof text === "string") 
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
      };
   
      if (message.author.id !== "662227196814819349") return message.channel.send(`${Bot.emotes.non} **- L\'accès vous y est interdit !**`);
      const code = args.join(" ");
      let evaled;
      try {
        evaled = await eval(code);
      } catch(err) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${err.stack}\`\`\``);
      };
      const cleanCode = await clean(evaled);
      if(!cleanCode || cleanCode.length < 1) return;
      message.channel.send(cleanCode, { code: "js" });
  },
  name: 'eval',
  category: "admin",
  aliases: ["evaluer"],
  help: {
    description: 'Permet d\'evaluer du code',
    syntax: '<code>'
  }
}