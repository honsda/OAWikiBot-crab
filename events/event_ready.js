const Discord = require('discord.js');
const chalk = require('chalk');
const proj = require('../package.json');

module.exports = async (client) => {
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
};