const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json')

client.once('ready', () => {
    console.log(`${ client.user.tag } is ready for action.`)
});

client.on('message', (msg) => {
    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.split(/ +/);
    const command = args.shift()

    switch(command) {
        case '!warn':
            if (!args.length) {
                return msg.reply('An argument is required.')
            }
            const warnMentions = args[0].match(/^<@!?(\d+)>$/);
            if (warnMentions === null) {
                return msg.reply('The first argument has to be a user mention.')
            }
            msg.channel.send(`${ warnMentions[0] }, ${ msg.author.tag } warned you.`)
            break;
        case '!kick':
            if (!args.length) {
                return msg.reply('An argument is required.')
            }
            const kickMentions = args[0].match(/^<@!?(\d+)>$/);
            if (kickMentions === null) {
                return msg.reply('The first argument has to be a user mention.')
            }
            const member = msg.guild.members.get(kickMentions[1]);
            if (!member.kickable) {
                return msg.reply(`${ kickMentions[0] } is not kickable.`)
            }
            member.kick()
            .then(() => {
                msg.channel.send(`${ kickMentions[0] } has been kicked.  Let this be a lesson to you all.`)
            })
            .catch(console.error)
    }
});

client.login(token);
