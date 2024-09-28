const mongoose = require('mongoose');
const config = require("../config");

const schema = new mongoose.Schema({
  GuildID: String,
  Prefix: { type: String, default: config.defaultprefix },
  welcomeMsg: { type: String, default: `:tada: - Bienvenue à %member% qui nous rejoins !` },
  goodbyeMsg: { type: String, default: `:sob: - %member.tag% nous a quitté...` },
  isWelcomeEnabled: { type: Boolean, default: false },
  isGoodbyeEnabled: { type: Boolean, default: false },
  welcomeChannel: String,
  goodbyeChannel: String,
  isTicketEnabled: { type: Boolean, default: false },
  ticketCategory: String,
  ticketEmoji: Object,
  ticketRole: String,
  openedTickets: Array,
  warns: Array,
  bannedMembers: Array,
  isSuggestionEnabled: { type: Boolean, default: false },
  suggestionViewChannel: String,
});

module.exports = mongoose.model('Guilds', schema);