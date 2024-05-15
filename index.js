//Do Not Change Anything Here, Unless You Know What You Are Doing This Is How We Connect To Discord And Read Commands!!
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
//
client.on("ready", () =>{
    console.log(`Logged Into The Discord Client In ${client.ws.ping}ms!`);
    console.log(`Ready! Logged Into Discord Under The Name Of ${client.user.tag}, In ${client.guilds.cache.size} Servers`);
    setInterval(() => {
      const statuses = [
        `CHEESE 🧀🧀🧀`,
        `Eating Cheese 🧀`,
        `🧀🧀🧀`,
        `Help: [/help]`,
        'loving llc ❤️'
            ];
      const Activity = [
        0,
        1,
        2,
        3,
		5,
      ];
      const s = statuses[Math.floor(Math.random() * statuses.length)];
      const a = Activity[Math.floor(Math.random() * Activity.length)];
	  client.user.setPresence({ activities:  [{ name: `${s}` }], status: 'online' });
    }, 20000);
 })
//const channel = client.channels.cache.get("ID"); this can be used to call a discord channel kept in index as a ref
client.commands = new Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);}
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) { client.once(event.name, (...args) => event.execute(...args));
    } else {client.on(event.name, (...args) => event.execute(...args));}
}
//
client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} from ${interaction.guild.name} triggered an interaction (Slash Command: ${interaction.commandName}) .`);
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return; try { await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: '```diff\n- OH NO! \n-A Error Has Occurred, If This Continues Please Contact Support (https://discord.gg/763gUAQDHq)! \n+Have A Nice Day 🙂 \nTomtomvader298 Was Here! \n```', ephemeral: true });
	}
});
//
//------LOGIN------\\
client.login(token);
