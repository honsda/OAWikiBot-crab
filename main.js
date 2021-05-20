const Discord = require('discord.js')
const client = new Discord.Client();
const classify = require("./gzor.json")
const chalk = require('chalk');
const ms = require('ms')
const moment = require('moment')
const long = require('long');
const RandExp = require('randexp')

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

//Minecraft Bot
/////////////////////////////###///#//#//###///////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////####//#//#//####//////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////#//#//#//#//#//#//////////////////////////////////////
/////////////////////////////###////##///###///////////////////////////////////////
const mineflayer = require('mineflayer');
const prisview = require('prismarine-viewer');
const b = require('./gzor.json');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const mcp = require('minecraft-protocol');
const p = b.sdgg.slice(0, 12);

const mcb = mineflayer.createBot({
    host: 'openanarchy.org', // minecraft server ip
    username: 'OAWikiB0t', // minecraft username
    port: 25565,
    version: false
})

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ /);
    const command = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(command === 'login_mcb') {}
})
//LOG KICK REASON
mcb.on('kicked', (reason) => {
    console.log(reason)
   setTimeout(() => {
        mcb.connect({
            host: 'openanarchy.org',
            username: 'OAWikiB0t',
            port: 25565,
            version: false
        })
    }, 10000);
})

//LOGIN AND GO THRU PORTAL
mcb.on('login', () => {
    mcb.chat(`/login ${p} ${p}`)
    mcb.setControlState('forward', true)
    setTimeout(() => {
        mcb.setControlState('forward', false)
    }, 20000)
})



function randIndex(arr) {
    return (Math.floor(Math.random() * arr.length));
}
    //ANTI AFKs

setTimeout(() => {
    //const farted = botWiki.read(`${fart[index]}`).then(pg => {pg.revisions[0].content})
    setInterval(() => {
        mcb.setControlState('back', false)
        mcb.setControlState('forward', true)
        mcb.setControlState('jump', true)
        setTimeout(() => {
            mcb.setControlState('forward', false)
            mcb.setControlState('back', true)
            mcb.setControlState('jump', false)
        }, 2500)
    }, 5000)
    setInterval(() => {
        mcb.setControlState('left', true)
        mcb.setControlState('right', false)
        setTimeout(() => {
            mcb.setControlState('left', false)
            mcb.setControlState('right', true)
        }, 5000)
    }, 7500)
    //SPAMMER
    setInterval(() => {    
        const fart = [
            'SWP360',
            'Honsda',
            'TheUnknown20',
            'LJKMagic',
            'N2N5',
            'Kazpia',
            'April_Fools_Map_2021',
            'Java',
            'Owl',
            'OpenAnarchy'
        ]   
        var id = 0;
        //;
        //let trol = await botWiki.read(`${fart[index]}`).then(pg => {return `${pg.revisions[0].content.slice(30, 60)}`})
        const i = Math.floor(Math.random() * (fart.length - 1) + 1);
        mcb.chat(`${Math.floor(Math.random() * 100) + 1}-Check out ${fart[randIndex(fart)]}'s Wiki Page! on OAWiki. [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
        setTimeout(() => {
            const fart2 = [
                'Type oa.cmds to get a list of commands!结晶度qq',
                '结晶度qqTry oa.cmds to get commands.',
                'To get interactives, do oa.cmds칗␩䫴␩⶛㳸長fart',
                '칗␩䫴␩⶛㳸長fartTo get commands, type oa.cmds'
            ]
            const id = Math.floor(Math.random() * (fart2.length - 1) + 1);
            //const index = Math.floor(Math.random() * (fart2.length - 1) + 1);
            mcb.chat(`${Math.floor(Math.random() * 100) + 1}-${fart2[randIndex(fart2)]} [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
            
        }, 40000);
       /* setTimeout(() => {
            const i = Math.floor(Math.random() * (fart.length - 1) + 1);
            mcb.chat(`(${Math.floor(Math.random() * 100) + 1}) https://openanarchywiki.miraheze.org/wiki/${fart[randIndex(fart)]}`)
        }, 20000);*/
        setTimeout(() => {
            const farted = [
                '䫴␩⶛㳸長�',
                '칗␩䫴␩⶛㳸長fart',
                'quang䫴�quan',
                '结晶度qq',
                '⶛farthaha칗␩',
                'funny䫴␩⶛',
                't剈궦佔칗rr'
            ]
            const i = Math.floor(Math.random() * (farted.length - 1) + 1);
            mcb.chat(`(${Math.floor(Math.random() * 100) + 1}) ${farted[randIndex(farted)]} [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
        }, 10000);
    }, 60000);
}, 20000);

mcb.on('death', () => {
    const emb = [
        `Imagine killing  a bot lmao`,
        `*cutely dies*`,
        `"alr let me waste  my time killing a bot"`,
        `Imagine killing  a bot lmfao`,
        `*cutely dies*`,
        `"alr let me waste  my time killing a bot"`,
        `Imagine killing  a bot lmao`
    ]
/*    var i;
    if (i > emb.length) {
        var i = 0;
    }
    else if(isNaN(i)) {
        var i = 0;
    }
     else {
        var i = i + 1
    }*/
    const i = Math.floor(Math.random() * (emb.length - 1) + 1);
    mcb.chat(`> ${Math.floor(Math.random() * 100) + 1}-${emb[i]} [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
    /*randIndex(emb) + Math.floor(Math.random() * 2)
    //console.log(i)*/
})

const chatMcb = require('./events/mcb/chat.js')(mcb)
mcb.on('chat', (username, message) => {
    const sgld = client.guilds.cache.find(g => g.id === '810484087008919573')
    const sch = sgld.channels.cache.find(ch => ch.id === '830815632055730236');
    if (message.includes(`https://`) || message.includes(`http://`)) sch.send(`**<${username}>** [Message contains a link]`)
    else sch.send(`**<${username}>** ${message}`)
})
//MCB CHAT LOG

//INTERACTIVE
mcb.on('chat', (username, message) => {
    const args = message.slice(prefix.length).split(/ /)
    const command = args.shift().toLowerCase();

    if(!message.startsWith(prefix)) return;

    if(command.startsWith('cmds')) {
        var i = 0;
        const antiSpam = [
            'oa.gay, oa.dong, oa.8ball, oa.coords',
            'oa.8ball, oa.coords, oa.dong, oa.gay',
            'oa.dong, oa.coords, oa.gay, oa.8ball'
        ]
        
        mcb.chat(`/msg ${username} (${Math.floor(Math.random() * 100) + 1}) ${antiSpam[randIndex(antiSpam)]} [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
    }
    else if(command.startsWith('gay')) {
        mcb.chat(`> ${Math.floor(Math.random() * 100) + 1}-${username} is ${Math.floor(Math.random() * 100) + 1}% gay. [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
    }
    else if(command.startsWith('8ball')) {
        
        const fart3 = [
            'Much Doubt.',
            'No doubt.',
            'Yes.',
            'No.',
            'Perhaps.',
            'Maybe not.'
        ]
        const index = Math.floor(Math.random() * (fart3.length - 1) + 1);
        if (!args[0]) {
            mcb.chat(`> ${username}, you did not give any question. [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
        } else {
            mcb.chat(`> ${username}, my answer is "${fart3[index]}" [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
        }
    }
    else if(command.startsWith('coords')) {
        mcb.chat(`> My coords is ${mcb.entity.position.toString()}  [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
    }
    else if(command.startsWith('dong')) {
        const dong = Math.floor(Math.random() * 33) + 1
        mcb.chat(`> ${Math.floor(Math.random() * 100) + 1}-${username}'s dong : 8${('=-').repeat(dong / 2)}D [${new RandExp(/([a-f0-9]{12})/).gen()}]`)
    }
})

//BOT VIEWER
mcb.once('spawn', () => {
    mineflayerViewer(mcb, { port: 3007, firstPerson: false }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
    mcb.chat(`/skin url https://cdn.discordapp.com/attachments/749976047298281602/831442231297703956/fe5d195f3712094ea55b93776221730c096029da.png`)
    mcb.addChatPattern('unk_cmd', /unknown command./, { parse: true, repeat: false })
    mcb.chat(`/login ${p}`)
    mcb.setControlState('forward', true)
    setTimeout(() => {
        mcb.setControlState('forward', false)
    }, 20000)
})

//DISCORD-MC
client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ /);
    const command = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if (command === 'mcb_chat') {
        mcb.chat(`${args.slice(0).join(" ")} || From Discord, ${message.author.tag}`)
    }
    else if (command === 'mcb_rawchat') {
        if (message.author.id === '206296798724227082') {
            mcb.chat(`${args.slice(0).join(" ")}`)
        }
    }
    else if(command === 'mcb_kill') {
        if (message.author.id === '206296798724227082') {
            mcb.chat('/kill')
        }
    }
    else if(command === 'mcb_cmd') {
        if (message.author.id === '206296798724227082') {
            if(!args[0]) {
                message.channel.send({ embed: new Discord.MessageEmbed()
                    .setTitle('No command')
                    .setColor(0xD8D8D8)
                })
            }
            mcb.chat(`/${args[0]} ${args[1]} ${args[2]}`)
        }

    }
})

mcb.on('message', (m) => { 
    if(m.toString().startsWith("You cannot talk until you have moved!")) {
        const sgld = client.guilds.cache.find(g => g.id === '810484087008919573')
        const sch = sgld.channels.cache.find(ch => ch.id === '830815632055730236');
        sch.send({ embed: new Discord.MessageEmbed()
            .setDescription("**Bot haven't moved yet, can't talk.**")
            .setColor(0xffdb00)
        })
    }
})


/*{
    "json": { "extra": [ [Object] ], "text": '' },
    "text": '',
    "extra": [
      "ChatMessage" {
        "json": [Object],
        "text": 'Unknown command. Type "/help" for help.',
        "bold": undefined,
        "italic": undefined,
        underlined: undefined,
        strikethrough: undefined,
        obfuscated: undefined,
        color: undefined
      }
    ],
    bold: undefined,
    italic: undefined,
    underlined: undefined,
    strikethrough: undefined,
    obfuscated: undefined,
    color: undefined
}*/
