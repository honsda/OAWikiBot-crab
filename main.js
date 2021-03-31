const Discord = require('discord.js')
const client = new Discord.Client();

/*client.on('ready', async () =>{
	require('./events/event_ready.js')(client);
});*/

client.on('ready', async () =>{
    const serverssize = await client.guilds.cache.size;
	var usersserver = await client.users.cache.size;
	const channelssize = await client.channels.cache.size;
    // log
    console.log(`
    OAWikiBot is Online
    `)
	console.log(`Serving ${usersserver} users, ${serverssize} servers, ${channelssize} channels.`);
// funnybot activity
	const activities_list = [
		'quan',
		'bub',
        'oplk is relevant',
        'qbastard',
		`OAWiki - ${usersserver} Users`,
        'monky',
        `OAWiki - ${usersserver} Users`,
        'OpenAnarchy strong',
        `OAWiki - ${usersserver} Users`
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
		client.user.setActivity(activities_list[index], {
			type: 'WATCHING',
		}).catch(console.error);
	}, 10000);
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

client.login(process.env.YPLRM)