const commands = [];
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const {clientID, token} = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const rest = new REST({ version: '10' }).setToken(token);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());}

rest.put(
	Routes.applicationCommands(clientID),
	{ body: commands },
    console.log('Successfully registered application commands.')
);