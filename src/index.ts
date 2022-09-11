import openServer from './server/index.js';
import bot from './telegram-bot/index.js';
import getWeekLunch from './crawler/index.js';

openServer();

bot.on('message', (message) => {
    const chatId = message.chat.id;

    switch (message.text) {
        case '/start':
            bot.sendMessage(chatId, 'Seja bem-vindo(a)! Digite /lunch para saber o almoço da semana.')   
    }
})

bot.onText(/\/lunch/, (message) => {
    const chatId = message.chat.id;

    bot.sendMessage(chatId, `Buscando o cardápio da semana! Aguarde, por favor...`);
    getImageUrl().then(url => {
        bot.sendMessage(chatId, `Aqui está o cardápio da semana!`);
        bot.sendPhoto(chatId, url);
    });
})

async function getImageUrl() {
    const urlImage = await getWeekLunch();
    return urlImage;
}