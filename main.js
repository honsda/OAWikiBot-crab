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
    formatversion: 2
});
//improper non-dynamical command handler
client.on('message', async message => {
    require('./events/cmd_message.js')(message, client, botWiki, prefix);
})

client.on('message', async message => {
    //DISPLAYS TEMPORARY IMAGE IN LOCAL SYSTEM
const args = message.content.slice(prefix.length).split(/ /);
const command = args.shift().toLowerCase();

if(!message.content.startsWith(prefix) || message.author.bot) return;
//GET IMAGES IN 'A' WIKI PAGE (WITH CODE BLOCK)
if(command === 'getimg_block' || command === 'getimg') {
    botWiki.request({
        "action": "query",
        "prop": "images",
        "titles": args[0]
    }).then(data => {
         message.channel.send(`\`\`\`Output :\`\`\`\n\`\`\`${data.query.pages[0].images.map(img => `https://openanarchywiki.miraheze.org/wiki/${img.title}\n`).join(" ")}\`\`\``)
    });
}
//GET IMAGES IN 'A' WIKI PAGE (WITHOUT CODE BLOCK)
else if(command === 'getimg_free') {
    botWiki.request({
        "action": "query",
        "prop": "images",
        "titles": args[0]
    }).then(data => {
         message.channel.send(`\`\`\`Output :\`\`\`\n${data.query.pages[0].images.map(img => `https://openanarchywiki.miraheze.org/wiki/${img.title}\n`).join(" ")}`)
    });
}
else if(command === 'display_img') {
    const endExt = args.slice(0).join(' ').length
    const dotExt = args.slice(0).join(' ').lastIndexOf('.')
    const extFile = args.slice(0).join(' ').slice(dotExt, endExt)
    const tempImg = await botWiki.download(`File:${args.slice(0).join(' ')}`, `./images/tempImage${extFile}`)
    //console.log(extFile)
    //console.log(endExt)
    //console.log(dotExt)
    message.channel.send({  embed: {
        image: {
             url: `attachment://tempImage${extFile}`
          },
        title: "Here is the file you requested for.",
        color: 15658734
       },
       files: [{
          attachment: `./images/tempImage${extFile}`,
          name: `tempImage${extFile}`
       }]
    })
}
//UPLOADS ATTACHED IMAGE TO WIKI
else if(command === 'upload_img') {
    const imageURL = message.attachments.map(img => img.url).join(' ')
    const imageNAME = message.attachments.map(img => img.name).join(' ')
    if (!message.attachments) {
        message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Bad command')
            .setDescription(`No attached file was going to be uploaded.`)
            .setColor(0xD8D8D8)
            })
    }
    else{
    botWiki.request(
        {
            "action": "upload",
            "format": "json",
            "filename": `${imageNAME}`,
            "url": `${imageURL}`,
            "comment": `Uploaded by ${message.author.tag}, From Discord.`,
            "token": `${botWiki.csrfToken}`,
            "formatversion": "2",
        }
    ).then(
        message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Successfully uploaded file')
            .setDescription('The file you requested is successfully uploaded to the Wiki.')
            .setColor(0xEEEEEE)
            })
    )
        }
}
else if(command === 'login') {
    botWiki.login().then(message.channel.send({ embed: new Discord.MessageEmbed()
    .setTitle('Success')
    .setDescription('Logged in successfully to the wiki.')
    .setColor(0xEEEEEE)
    }))
    }
else if(command === 'cmd') {
    message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Commands')
        .setDescription('\`login\`, \`display_img\`, \`upload_img\`, \`getimg\`, \`getimg_free\`')
        .setColor(0xEEEEEE)
        })
}
})

client.login(classify.yplrm)