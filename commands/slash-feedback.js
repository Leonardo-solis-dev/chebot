const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setDMPermission(false)
		.setName('feedback')
		.setDescription('Give Feedback On Cheese (This Is Optional)'),
	async execute(interaction) {

            let feedback = new Discord.EmbedBuilder()
            .setDescription(`${interaction.client.user.username} Bot Feedback Form Click Button To Start`)
            .setColor("#2F3136")
            const appbutton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('fdbk1')
					.setLabel(`Feedback Form For ${interaction.client.user.username}`)
                    .setEmoji('🧾')
					.setStyle(ButtonStyle.Secondary),
			);

             interaction.reply({ embeds: [feedback], components: [appbutton], ephemeral: true }).catch((e) => console.log(e));

             const filter = interaction => interaction.customId === 'fdbk1';

             const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });

             collector.on('collect', async interaction => {
                 if (interaction.customId === 'fdbk1') {
                    const modal = new ModalBuilder()
                    .setCustomId('feedback')
                    .setTitle(`Feedback Form For ${interaction.client.user.username}`)
            
                const discordname = new TextInputBuilder()
                    .setCustomId('discordname')
                    .setLabel("Your Name")
                    .setPlaceholder(`${interaction.user.username}`)
                    .setValue(`${interaction.user.username} (${interaction.user.tag} )`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
            
                const fdbk2 = new TextInputBuilder()
                    .setCustomId('fdbk2')
                    .setLabel("Please Enter Your Feedback")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(100)
                    .setMaxLength(800);
            
                const name = new ActionRowBuilder().addComponents(discordname);
                const fdbk = new ActionRowBuilder().addComponents(fdbk2);
            
                modal.addComponents(name, fdbk);
                
                interaction.showModal(modal).catch((e) =>console.log(e));
                 }
             });
             
             collector.on('end', collected => console.log(`Opened: ${collected.size} Feedback Forms`));         
            
            

	},

};