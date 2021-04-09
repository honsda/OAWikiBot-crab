const Discord = require('discord.js')
const mwn = require('mwn')

module.exports = async (message, client, botWiki, prefix) => {
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
}