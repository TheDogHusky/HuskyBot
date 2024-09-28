const Discord           = require('discord.js');
const fs                = require('fs');
const sl                = require('@classycrafter/super-logger');
const mongoose          = require('mongoose');
const AutoPoster        = require('topgg-autoposter');
const Utils             = require('./Utils');
const pjson             = require('../package.json');


class HuskyBot extends Discord.Client {
    constructor() {
        super({
            intents: [
                Discord.GatewayIntentBits.Guilds,
                Discord.GatewayIntentBits.GuildMembers,
                Discord.GatewayIntentBits.GuildMessages,
                Discord.GatewayIntentBits.MessageContent
            ],
        });

        this.msgcommands        = new Discord.Collection();
        this.slashcommands      = new Discord.Collection();
        this.events             = new Discord.Collection();
        this.aliases            = new Discord.Collection();
        this.cooldowns          = new Discord.Collection();
        this.schemas            = require('../models/index');
        this.guildCooldowns     = new Discord.Collection();
        this.emotes             = require('../emotes.json');
        this.colors             = require('../colors.json');
        this.config             = require('../config');
        this.logger             = new sl.Logger({
                                    name: 'HuskyBot',
                                    timezone: 'Europe/Paris',
                                    tzformat: 24,
                                    dirpath: './logs',
                                    writelogs: true,
                                });
        this.packages           = {
                                    mongoose: require('mongoose'),
                                    discord: require('discord.js'),
                                };

        mongoose.connection.on('connected', () => {
            this.logger.info('Connexion à la base de données réussie !', "Loader");
        });
    };

    get version() {
        return pjson.version
    };

    loadMsgCommands() {
        fs.readdirSync('./msgcommands/').forEach((dir) => {
            if (dir === '.disable') return
            const commandsFiles = fs.readdirSync(`./msgcommands/${dir}/`).filter((file) => file.endsWith('.js'));
            for (const file of commandsFiles) {
              const command = require(`../msgcommands/${dir}/${file}`);
              if (command.name) {
                this.msgcommands.set(command.name, command);
                if (command.category === 'category') {return console.error(command.name + 'command\'s category is incorrect !');}
              }
              else {
                continue;
              }
              if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => this.aliases.set(alias, command.name));
              //console.log(command.aliases)
            }
        });
    };

    loadSlashCommands() {
        return fs.readdirSync('./slashcommands/').forEach((dir) => {
            if (dir === '.disable') return;
            this.logger.info(`Chargement de la catégorie ${dir}`, "Loader");
            const commandsFiles = fs.readdirSync(`./slashcommands/${dir}/`).filter((file) => file.endsWith('.js'));
            for (const file of commandsFiles) {
                if(file === ".init.js") {
                    const cat = require(`../slashcommands/${dir}/${file}`);
                    this.slashcommands.set(cat.name, cat);
                    this.logger.info(`la catégorie ${cat.name} a été enregistrée.`, "Loader");
                } else return;
            };
        });
    };

    async postSlashCommands() {
        this.slashcommands.forEach(async (cat) => {
            const betaGuild = await this.guilds.fetch(this.config.supportid);
            let commands = this.application.commands;
            if(cat.global) {
                await commands?.create({
                    name: cat.name,
                    description: cat.description,
                    options: cat.options
                });
                this.logger.info(`Commande ${cat.name} postée de façon globale.`, "Loader");
            } else {
                commands = betaGuild.commands;
                await commands?.create({
                    name: cat.name,
                    description: cat.description,
                    options: cat.options
                });
                this.logger.info(`Commande ${cat.name} postée dans le support.`, "Loader");
            };
        });
    };

    loadEvents() {
        const eventFiles = fs.readdirSync('./events/');
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            this.events.set(event.name, event);
            if(event.once) {
                this.once(event.name, (...args) => event.run(this, ...args));
            } else {
                this.on(event.name, (...args) => event.run(this, ...args));
            };
        };
    };

    async dbConnect() {
        await mongoose.connect(this.config.mongourl, this.config.mongoptions).catch(err => {
            this.logger.error(`Une erreur est survenue lors de la connexion à la base de données : ${err.stack}`, "Loader");
        });
    };

    async startTopgg() {
        const poster = AutoPoster(this.config.topggtoken, this);

        poster.on('posted', stats => {
            this.logger.info(`Stats posted on top.gg: ${stats.serverCount} servers.`, "Top.gg");
        });
        poster.on('error', err => {
            this.logger.error(`An error occured while posting stats on top.gg: ${err.stack}`, "Top.gg");
        });
    };

    async init() {
        await this.loadMsgCommands();
        await this.loadSlashCommands();
        await this.loadEvents();
        await this.dbConnect();
        await this.login(this.config.token);
        await this.startTopgg();
    };

    async getGuild(id, createOneIfNotFound = true) {
        let guild = await this.schemas.guild.findOne({ GuildID: id });
        if (!guild && createOneIfNotFound) guild = await new this.schemas.guild({ GuildID: id }).save();

        return guild;
    };

    async generateError(error, guild, type) {
        const fromObject = {
            guildId: guild.id,
            guildOwnerId: guild.ownerId,
            guildName: guild.name,
        };
        const schem = await new this.schemas.error({
            ErrorID: Utils.generateID(16),
            ErrorMessage: error.message,
            ErrorStack: error.stack,
            ErrorDate: Date.now(),
            ErrorType: type,
            ErrorFrom: fromObject,
        }).save();

        return schem;
    };

    async getError(id) {
        const guild = await this.schemas.error.findOne({ ErrorID: id });

        return guild;
    };
};

module.exports = HuskyBot;