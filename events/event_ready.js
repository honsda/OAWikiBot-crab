const Discord = require('discord.js');
const chalk = require('chalk');
const proj = require('../package.json');
//fart
module.exports = async (client, botWiki) => {
    const serverssize = await client.guilds.cache.size;
	var usersserver = client.users.cache.size;
	const channelssize = await client.channels.cache.size;
    // log
    console.log(chalk `
    {blueBright.bold OAWikiBot is Online.}
    {greenBright.bold.underline -honsda}
    `)
	console.log(chalk`
	{magentaBright Serving ${usersserver} users, ${serverssize} servers, ${channelssize} channels.}
	`);
// funnybot activity
	const larplist = [
		'quan',
		'bub',
        'oplk is relevant',
        'qbastard',
		`OAWiki - ${usersserver} Users`,
        'monky',
        `OAWiki - ${usersserver} Users`,
        'OpenAnarchy strong',
        `OAWiki - ${usersserver} Users`,
		'bub apple',
		'daaaalarp',
		'tfw realm angels thrive',
		'team pingu on top',
		'myself',
		'me swp fan big'
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (larplist.length - 1) + 1);
		client.user.setActivity(larplist[index], {
			type: 'WATCHING',
		}).catch(console.error);
	}, 10000);
	botWiki.login()
	const sgld = await client.guilds.cache.find(g => g.id === '810484087008919573')
	const sch = sgld.channels.cache.find(ch => ch.id === '830815632055730236');
	/*sch.send({embed: new Discord.MessageEmbed()
    	.setTitle('Logging in...')
    	.setColor(0xD8D8D8)
	})*/
	sch.send(`
	Logging in...
	`)
};