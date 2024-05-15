const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	    .setDMPermission(false)
		.setName('avatar')
		.setDescription('Displays Your\s Or Your Friends Avatar')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		let mentionted = new Discord.EmbedBuilder().setColor("#2F3136").setTitle(`${user.username}'s avatar:`).setImage(`${user.displayAvatarURL({ dynamic: true })}`)
		if (user) return interaction.reply({embeds:[mentionted]});
		return;
	},
};
