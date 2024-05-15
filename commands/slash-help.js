const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	    .setDMPermission(false)
		.setName('help')
		.setDescription('Get Help 🛠'),
	async execute(interaction) {
		let helper = new Discord.EmbedBuilder()
		.setColor("2F3136").setAuthor({ name: "Command Outcome! ", iconURL: interaction.member.displayAvatarURL({dynamic: true }) })
		.setTitle(`Help For ${interaction.member.user.username}`).setDescription("How To Use Cheese:\nStep One Enter `/` Then Click On Cheeses Avatar To Be Directed To All Of Cheeses Slash Commands\nStep Two Click On The Command Of Choice And Hit Enter\nStep Three Enjoy The Content!")
		.setFooter({text:`Command Requested By ${interaction.member.user.username}`}).setTimestamp()
		return interaction.reply({ embeds:[helper]}).catch((e) => console.log(e));
	},
};