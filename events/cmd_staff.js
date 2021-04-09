const Discord = require('discord.js');
const {mwn} = require('mwn');

function wikiLogin() {
    try {
        botWiki.login()
    } catch (error) {
        return
    }
}


//Im so sorry you can't see me using a proper command handler
module.exports = async (message, client, botWiki, prefix) => {

const args = message.content.slice(prefix.length).split(/ /);
const command = args.shift().toLowerCase();

if(!message.content.startsWith(prefix) || message.author.bot) return;

if(message.author.id === '206296798724227082'){
//GET IMAGES IN 'A' WIKI PAGE (WITH CODE BLOCK)
/*if(command === 'getimg_block' || command === 'getimg') {
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
//DELETE PAGE
else*/ if(command === 'delete_page') {
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
            "formatversion": "2",
        }
    ).then(message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Successfully deleted Page')
        .setDescription(`\`${args[0]}\` was succesfully deleted.`)
        .setColor(0xD8D8D8)
        }))
    }
    //
}
//CREATE PAGE
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
    await botWiki.create(`${args[0]}`, `
    ${args.slice(2).join(' ')}
    `, `${args[1]}`).then(message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Successfully created Page')
        .setDescription(`\`${args[0]}\` was succesfully created.`)
        .setColor(0xD8D8D8)
        }))
    }
}
//CONSOLE LOG CSRF TOKEN
else if(command === 'log_token') {
    console.log(botWiki.csrfToken)
    message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Logged CSRF Token in console')
        .setDescription('CSRF Token successfully logged.')
        .setColor(0xEEEEEE)
        })
}
//LOGIN
/*else if(command === 'login') {
    botWiki.login().then(message.channel.send({ embed: new Discord.MessageEmbed()
    .setTitle('Success')
    .setDescription('Logged in successfully to the wiki.')
    .setColor(0xEEEEEE)
    }))
    }*/
//DOWNLOAD FILE INTO LOCAL SYSTEM
else if(command === 'syslocal_dwl') {
    botWiki.download(`File:${args[0]}`, `./images/${args[0]}`).then(
        message.channel.send({ embed: new Discord.MessageEmbed()
        .setTitle('Successfully downloaded file')
        .setDescription('The file you requested is successfully downloaded.')
        .setColor(0xEEEEEE)
        }))
}
//GET FILE FROM LOCAL FOLDER
else if(command === 'syslocal_img') {
    message.channel.send({  embed: {
        image: {
             url: `attachment://${args[0]}`
          },
        title: "Here is the file you requested for.",
        color: 15658734
       },
       files: [{
          attachment: `./images/${args[0]}`,
          name: `${args[0]}`
       }]
    })
}
//DISPLAYS TEMPORARY IMAGE IN LOCAL SYSTEM
/*else if(command === 'display_img') {
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
}*/
//MARK PAGES AS STUBS
else if (command === 'once_stub') {
    botWiki.read(`${args[0]}`).then(pg => {
    if (pg.revisions[0].content.includes('{{ArticleStub}}') && pg.revisions[0].content.length < 1500) {
            message.channel.send({ embed: new Discord.MessageEmbed()
                .setTitle('Bad command')
                .setDescription('The page you requested is already marked as an article stub.')
                .setColor(0xEEEEEE)
                })
    }
    else if (!pg.revisions[0].content.includes('{{ArticleStub}}') && pg.revisions[0].content.length < 1500) {
        botWiki.request(
            {
                "action": "edit",
                "format": "json",
                "title": `${args[0]}`,
                "section": "0",
                "summary": "Marked as an Article Stub, Automated.",
                "minor": 1,
                "bot": 1,
                "prependtext": "{{ArticleStub}}<br>",
                "appendtext": "",
                "token": `${botWiki.csrfToken}`,
                "formatversion": "2"
            }
        ).then(
            message.channel.send({ embed: new Discord.MessageEmbed()
                .setTitle('Successfully marked page')
                .setDescription('The page you requested is successfully marked as an article stub.')
                .setColor(0xEEEEEE)
                })
        )
    }
    else if (!pg.revisions[0].content.includes('{{ArticleStub}}') && pg.revisions[0].content.length > 1500) {
        message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Bad command')
            .setDescription('The page you requested is not an article stub.')
            .setColor(0xEEEEEE)
            })
        //console.log(`${pg.revisions[0].content}`)
        //console.log(`${pg.revisions[0].content.includes('{{ArticleStub}}')}`)
    }
    else if (pg.revisions[0].content.includes('{{ArticleStub}}') && pg.revisions[0].content.length > 1500) {
        message.channel.send({ embed: new Discord.MessageEmbed()
            .setTitle('Notice')
            .setDescription("The page you requested is not an article stub, but it's marked as a stub.")
            .setColor(0xEEEEEE)
            })
    }
})
}
/*else if(command === 'raw_embed') {
    const embed = new Discord.MessageEmbed()
    .setTitle('test')
    .setDescription('test')
    .setColor(0xEEEEEE)
    .setTimestamp()
    message.channel.send(`\`\`\`
    ${embed.toJSON()}
    \`\`\``)
    console.log(embed.toJSON())
}*/
  }
  else {
      
  }
/*if(!message.author.id === '206296798724227082') {
    else if(c)
}*/
////// AUTOMATION
/*
{
    {
	"action": "query",
	"format": "json",
	"prop": "revisions",
	"generator": "allpages",
	"rvprop": "content",
	"gapprefix": "A",
	"gaplimit": "5000",
	"gapdir": "descending"
    }
}
{
	"action": "edit",
	"format": "json",
	"title": "[page here]",
	"section": "0",
	"summary": "Marked as an Article Stub, Automated.",
	"minor": 1,
	"bot": 1,
	"prependtext": "{{ArticleStub}}<br>",
	"appendtext": "",
	"token": `${botWiki.csrfToken}`,
	"formatversion": "2"
}
*/
}