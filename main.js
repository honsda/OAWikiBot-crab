const Discord = require('discord.js')
const client = new Discord.Client();
const classify = require("./gzor.json")
const chalk = require('chalk');
const ms = require('ms')
const moment = require('moment')
const long = require('long');

const fs = require('fs');

const prefix = 'oa.'

client.on('guildMemberAdd', member => {
    try {
        const role = member.guild.roles.cache.find(role => role.id === '810484463237857280');
        member.roles.add(role)
    } catch (error) {
        console.log(error)
    }
    const channeljoin = member.guild.channels.cache.find(ch => ch.id === '825915304021721109');
    const channellog = member.guild.channels.cache.find(ch => ch.id === '826072448994770985');
    channeljoin.send(`${member} **has joined the server.**`)
    channellog.send({embed: new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} joined the server.`)
        .setDescription(`${member} has joined the server, ID: ${member.id}`)
        .setColor(0x00C303)
        .setImage(`${member.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 128 })}`)
        .setTimestamp()
    })
})

client.on('guildMemberRemove', member => {
    const channellog = member.guild.channels.cache.find(ch => ch.id === '826072448994770985');
    channellog.send({embed: new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} left the server.`)
        .setDescription(`${member} has left the server, ID: ${member.id}`)
        .setColor(0x00C303)
        .setImage(`${member.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 128 })}`)
        .setTimestamp()
    })
})
// MediaWiki API side bub
/////////////////////////////###///#//#//###///////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////####//#//#//####//////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////###////##///###///////////////////////////////////////
const {mwn} = require('mwn');

const botWiki = new mwn({
    //OAWiki apiUrl
	apiUrl: 'https://openanarchywiki.miraheze.org/w/api.php',
    //login
	username: `${classify.userwiki}`,
	password: `${classify.sdgg}`,

	// Set your user agent (required for WMF wikis, see https://meta.wikimedia.org/wiki/User-Agent_policy):
	userAgent: 'OAWiki Bot 1.0.3 mwn/0.10.3',

	// Set default parameters to be sent to be included in every API request
	defaultParams: {
		assert: 'user'
	}
});

botWiki.setOptions({
	silent: false, // suppress messages (except error messages)
	retryPause: 5000, // pause for 5000 milliseconds (5 seconds) on maxlag error.
	maxRetries: 3, // attempt to retry a failing requests upto 3 times
    formatversion: 2 // bot not legacy
});
//improper non-dynamical command handler trol
client.on('message', async message => {
    require('./events/cmd_staff.js')(message, client, botWiki, prefix);
    require('./events/cmd_for_all.js')(message, client, botWiki, prefix);
})
//  EVENT READY
client.on('ready', async () =>{
	require('./events/event_ready.js')(client, botWiki);
});

client.login(classify.yplrm)

//fart