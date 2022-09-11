import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import puppeteerStealth from "puppeteer-extra-plugin-stealth";
import cheerio from 'cheerio';

puppeteer.use(puppeteerStealth());

async function getWeekLunch() {
    const browser = await createBrowser();

    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });

    console.log("=============== Acessando site da universidade ===============")

    await page.goto('https://portal.ufgd.edu.br/secao/restaurante-universitario-proae/cardapio');
    const planePageHtml = await getFlatHtmlPage(page);

    const $ = cheerio.load(planePageHtml.html);
    const urlImage = $('#legenda-foto > a').attr('href');

    console.log('=============== Imagem recuperada ===============')

    await browser.close();
    return urlImage;
}

async function createBrowser() {
    return puppeteer.launch();
}

async function getFlatHtmlPage(page: Page) {
    return page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })
}

export default getWeekLunch;