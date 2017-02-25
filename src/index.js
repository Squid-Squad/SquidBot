const Discord = require('discord.js');
const fs = require('fs');

const nounlist = fs.readFileSync('./nounlist.txt').toString().split('\n');

function randomWord() {
  return nounlist[Math.floor(Math.random() * nounlist.length)];
}

var config;

try {
  config = require('../config.json');
} catch (e) {
  config = {};
}

const client = new Discord.Client();

const token = process.env.DISCORD_TOKEN || config.discord.token;
const channelID = process.env.CHANNEL || config.discord.channel;

client.on('ready', function() {
  client.user.setGame('SquidBot | By Jamelele');
});

client.on('message', function(message) {
  if (message.content.startsWith('!word')) {
    message.reply(`Cute or scary? \`${randomWord()}\``); // eslint-disable-line quotes
  }
});

client.on('guildMemberAdd', member => {
  const channel = client.channels.get(channelID);

  channel.sendMessage(`Welcome, ${member}!`);
});

client.login(token);
