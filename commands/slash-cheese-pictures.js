const { SlashCommandBuilder } = require('discord.js');
const request = require('node-superfetch');
const Discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	    .setDMPermission(false)
		.setName('cheesep')
		.setDescription('Cheesy Images 🤤 🧀'),
	async execute(interaction) {

        const data = await request.get('http://tomtomvader298.uk/api/JSON/cheesep.json');
    const text = JSON.parse(data.text);
      
       let answer = text[Math.floor(Math.random()*text.length)];
       let cheesei = new Discord.EmbedBuilder().setColor("#2F3136")
       .setImage(`${answer}`)


		return interaction.reply({embeds:[cheesei]})
	},
};
