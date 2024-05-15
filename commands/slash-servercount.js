const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('server-count')
        .setDescription('Check My Total Servers'),
    async execute(interaction) {
        let embed = new Discord.EmbedBuilder()
            .setDescription(`I Am In ${interaction.client.guilds.cache.size} Servers, Giving Free Cheese To Thy Worthy Ones`)
            .setColor("#2F3136")
            await interaction.deferReply()
            await interaction.editReply({ embeds: [embed] }).catch((e) => console.log(e));
    },
};