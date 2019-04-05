const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = new Discord.Client();

const config = require("./config.json");

let queue = {};

bot.on("ready", () => {
  console.log("online");
});

bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Welcome ${member.user} to this server.`);
});

bot.on("guildCreate", guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("message", message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

   let args = message.content.split(" ").slice(1);

   if (command === "help") {
                        var help = [
                        "Botu kendi sunucunuza çağırabilirsiniz!",
                        "http://tiny.cc/1tet4y \n",
                        "```Genel/Eğlence Komutları:",
                        "!help - Yardım listesini dm'den atar.",
                        "!botinfo - Bot hakkında bilgiler verir.",
                        "!serverinfo - Sunucu hakkında bilgiler verir.",
                        "!ping - Botun pingini hesaplar.",
                        "!yazitura - Yazı, tura atar.",
                        "!sik - Eğlence amaçlı laf sokar. :) \n",
                        "Mod Komutları:",
                        "!kick [@] - Etiketlenen kişiyi kickler.",
                        "!warn [@] - Etiketlenen kişiyi uyarır.",
                        "!ban [@] - Etiketlenen kişiyi banlar.",
                        "!say [text] - Bot istediğini söyler.",
                        "!mute [@] [reason] - Etiketlenen kişiyi susturur.",
                        "!unban [@] [reason] - Etiketlenen kişinin banını kaldırır. \n",
                        "Misc Komutları: ",
                        "!+ [x] [y] - 2 sayıyı toplar.",
                        "!- [x] [y] - 2 sayıyı çıkartır.",
                        "!* [x] [y] - 2 sayıyı çarpar.",
                        "!/ [x] [y] - 2 sayıyı böler.",
                        "!setusername [@] - Etiketlenen kişinin ismi değişir. \n",
                         ];
                         message.author.sendMessage(help).catch(console.error);
                         message.channel.send("Yardım listesini dm'den gönderdim!")
  }

  if (command === "botinfo") {

    const embed = new Discord.RichEmbed()
    .setTitle("EKO-bot V1.0")
    .addField("@DrunkPug#1509", "tarafından yapıldı.")
    message.channel.send({embed})
  }
  
   if (command === "eval") {
    if(message.author.id !== "130515926117253122") return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("x1", clean(evaled));
    } catch (err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } 

 if (command === "ban") {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  //let modlog = bot.channels.find('name', 'mod-log');
  //if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:**` + user.tag + `\n**Moderator:** message.author.tag\n ` + reason);
  return bot.channels.get.send({embed});
};


  if (command === "+") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);

    message.channel.send(total);
  } else

  if (command === "-") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);

    message.channel.send(total);
  } else

   if (command === "*") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);

    message.channel.send(total);
  } else

   if (command === "/") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);

    message.channel.send(total);
  } else

  if (command === "say") {
    if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS'))
    if (message.author.id !== "130515926117253122") return;
    message.channel.send(args.join(" "));
  } else

      if (command === "yazitura") {
      var coinflip = [
                "Yazı",
                "Tura"
];
var coinflips = coinflip[Math.floor(Math.random() *coinflip.length)];
    message.channel.send(coinflips);
  } else

 if (command === "setusername") {
      let username = args.join(' ');
      if (username.length < 1) return message.reply('Lütfen geçerli birini etiketle.').catch(console.error);
      if (!message.guild.member(bot.user).hasPermission('CHANGE_NICKNAME')) return message.channel.sendMessage('you do not have the correct permissions.').catch(console.error);
      message.guild.members.get('315603409203888138').setNickname(username);
				message.reply('Kullanıcı adı değiştirildi!').catch(console.error);
	} else

   if (command === "sik") {
     let user = message.mentions.users.first();
      if (message.mentions.users.size < 1) return message.reply('Lütfen geçerli birini etiketle.').catch(console.error);
      var roast = [
                "götlere katlanmak sandalyelerin işi.",
                "her şeyi bilmene gerek yok haddini bil yeter.",
                "akıllı telefonmuş... Karşı taraf aptal olunca, telefon akıllı olsa bile işe yaramıyor.",
                "marul olduğuna şükret hıyar olsan cacığa doğranmazsın.",
                "iki dakika insan ol diyorum da gözün hep saatte oluyor.",

];
var roasts = roast[Math.floor(Math.random() * roast.length)];
    message.channel.send(user.username + " " + roasts);
  } else

if (command === "warn") {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Yeterli yetkin yok.').catch(console.error);
 // let modlog = bot.channels.find('mod-log');
  //if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('Lütfen bir sebep belirtin.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Lütfen uyarmak için birini etiketle.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
    .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  //return bot.channels.get(modlog.id).send({embed});
  message.channel.send(user.tag + `,` + reason + `sebebiyle` + message.author.tag + `tarfından, uyarıldınız`);
};

 if (command === "mute") {
 let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!muteRole) return message.reply('Mute rolü bulunamadı').catch(console.error);
  if (reason.length < 1) return message.reply('Lütfen bir sebep belirt.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Lütfen geçerli birini etiketle.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Yeterli yetkin yok.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() =>  {
    });
  }
}; 

if (command === "unban") {
  bot.unbanReason = reason;
  bot.unbanAuth = message.author;
  let user = args[0];
  if (reason.length < 1) return message.reply('Lütfen bir sebep belirt.');
  if (!user) return message.reply('Lütfen geçerli birini etiketle (User ID).').catch(console.error);
  message.guild.unban(user);
};

if (command === "ping") {
  message.channel.send('Zaman hesaplanıyor....')
   .then(message => {
      message.channel.send(`Pong! (took: ${message.createdTimestamp - message.createdTimestamp}ms)`);
   });
};

});

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
};

bot.login(config.token);
