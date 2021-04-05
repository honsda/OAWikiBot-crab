const Discord = require('discord.js')
const client = new Discord.Client();
const classify = require("./gzor.json")
const chalk = require('chalk');
const ms = require('ms')
const moment = require('moment')
const long = require('long');

const fs = require('fs');

const prefix = 'oa.'

client.on('ready', async () =>{
	require('./events/event_ready.js')(client);
});

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
	apiUrl: 'https://openanarchywiki.miraheze.org/w/api.php',

	// Can be skipped if the bot doesn't need to sign in
	username: `${classify.userwiki}`,
	password: `${classify.sdgg}`,

	// Instead of username and password, you can use OAuth 1.0a to authenticate,
	// if the wiki has Extension:OAuth enabled
	/*OAuthCredentials: {
		consumerToken: "16_DIGIT_ALPHANUMERIC_KEY",
		consumerSecret: "20_DIGIT_ALPHANUMERIC_KEY",
		accessToken: "16_DIGIT_ALPHANUMERIC_KEY",
		accessSecret: "20_DIGIT_ALPHANUMERIC_KEY"
	},*/

	// Set your user agent (required for WMF wikis, see https://meta.wikimedia.org/wiki/User-Agent_policy):
	userAgent: 'OAWiki Bot 1.0.0 mwn/0.10.3',

	// Set default parameters to be sent to be included in every API request
	defaultParams: {
		assert: 'user' // ensure we're logged in
	}
});

botWiki.setOptions({
	silent: false, // suppress messages (except error messages)
	retryPause: 5000, // pause for 5000 milliseconds (5 seconds) on maxlag error.
	maxRetries: 3, // attempt to retry a failing requests upto 3 times
    formatversion: 2
});

client.on('message', async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.author.id === '206296798724227082'){

    if(command === 'getimg_block' || command === 'getimg') {
        botWiki.request({
            "action": "query",
            "prop": "images",
            "titles": args[0]
        }).then(data => {
             message.channel.send(`\`\`\`Output :\`\`\`\n\`\`\`${data.query.pages[0].images.map(img => `https://openanarchywiki.miraheze.org/wiki/${img.title}\n`).join(" ")}\`\`\``)
        });
    }
    else if(command === 'getimg_free') {
        botWiki.request({
            "action": "query",
            "prop": "images",
            "titles": args[0]
        }).then(data => {
             message.channel.send(`\`\`\`Output :\`\`\`\n${data.query.pages[0].images.map(img => `https://openanarchywiki.miraheze.org/wiki/${img.title}\n`).join(" ")}`)
        });
    }
    else if(command === 'delete_page') {
        if (!args[0]) {
            message.channel.send({ embed: new Discord.MessageEmbed()
                .setTitle('Bad command')
                .setDescription(`No page was to be deleted.`)
                .setColor(0xD8D8D8)
                })
        }
        //////
        else {
        botWiki.request(
            {
                "action": "delete",
                "format": "json",
                "title": `${args[0]}`,
                "reason": `${args.slice(1).join(' ')}`,
                "token": `${botWiki.csrfToken}`,
                "formatversion": "2"
            }
        ).then(message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Successfully deleted Page')
            .setDescription(`\`${args[0]}\` was succesfully deleted.`)
            .setColor(0xD8D8D8)
            }))
        }
        //
    }
    else if(command === 'create_page') {
        if (!args[0]) {
            message.channel.send({ embed: new Discord.MessageEmbed()
                .setTitle('Bad command')
                .setDescription(`No page name was to be created.`)
                .setColor(0xD8D8D8)
                })
        }
        //////
        else {
        await botWiki.create(`${args[0]}`, '-', `${args.slice(1).join(' ')}`).then(message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Successfully created Page')
            .setDescription(`\`${args[0]}\` was succesfully created.`)
            .setColor(0xD8D8D8)
            }))
        }
    }
    //
    else if(command === 'log_token') {
        console.log(botWiki.csrfToken)
        message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Logged CSRF Token in console')
            .setDescription('CSRF Token successfully logged.')
            .setColor(0xEEEEEE)
            })
    }
    else if(command === 'login') {
        botWiki.login().then(message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Logged in successfully to the wiki.')
        .setColor(0xEEEEEE)
        }))
    }
}
})

client.login(classify.yplrm)