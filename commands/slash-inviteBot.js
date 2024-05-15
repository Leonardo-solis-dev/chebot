const { SlashCommandBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `bold ${fontSize -= 10}px Impact`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot_invite')
        .setDescription('Invite Cheese To Your Server!')
,

    async execute(interaction) {


        const canvas = createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await readFile('./bg/bg.png');
        const backgroundImage = new Image();
        backgroundImage.src = background;
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 1.5;

        context.font = '28px Impact';
        context.fillStyle = '#000000';
        context.fillText('INVITE:', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, `${interaction.client.user.username}!`);
        context.fillStyle = '#000000';
        context.fillText(`${interaction.client.user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const av = interaction.client.user.displayAvatarURL({ dynamic: true, size: 1024 });

        const { body } = await request(av);
        const avatar = new Image();
        avatar.src = Buffer.from(await body.arrayBuffer());
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'Cheese.png' });
        const inviter = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Invite ${interaction.client.user.username}!`)
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`)
                    .setStyle(5),
            );

        interaction.reply({ files: [attachment], components:[inviter] }).catch((e) => console.log(e));
    },
};