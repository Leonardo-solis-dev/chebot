const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('server-inviter')
        .setDescription('Generate A Server New Server Invite For Your Server (ADM COM)'),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: 'You Are Not Allowed To Execute This Command, I Know Inviting Is Cool But Bud Admin Only Command', ephemeral: true })
        }
        let invite = await interaction.channel.createInvite({
            maxAge: 0,
            maxUses: 0
        }).catch(console.error);
        let embed = new Discord.EmbedBuilder()
            .setDescription(`Hello: ${interaction.user.username} (Administrator Of ${interaction.guild.name}),\nHere Is The Requested Permanent Invite For This Channel (${interaction.channel.name}),\nYou Can Find The Link Here: ${invite}`)
            .setColor("#2F3136")
        await interaction.deferReply()
        await interaction.editReply({ embeds: [embed] }).catch((e) => console.log(e));
    },
};