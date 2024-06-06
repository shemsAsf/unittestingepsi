const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 10
    });
    page = await browser.newPage();
});

afterEach(async (done) => {
    await browser.close()
});

test('Calculator add test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_2');
    await page.click('#calculator_btn_plus');
    await page.click('#calculator_btn_5');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    await page.close();
    expect(display).toBe('7');
});

test('Calculator substract test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_9');
    await page.click('#calculator_btn_minus');
    await page.click('#calculator_btn_3');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    await page.close();
    expect(display).toBe('6');
});

test('Calculator multiply test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_8');
    await page.click('#calculator_btn_multiply');
    await page.click('#calculator_btn_5');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    await page.close();
    expect(display).toBe('40');
});

test('Searchbar test success', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#searchInput');
    await page.type('#searchInput', 'eggs');
    await page.click('#searchSubmit');
    const display = await page.$eval('#result', dsp => dsp.textContent);
    await page.close();
    expect(display).toBe('And bakey');
});

test('Searchbar test missing', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#searchInput');
    await page.type('#searchInput', 'missingInput');
    await page.click('#searchSubmit');
    const display = await page.$eval('#result', dsp => dsp.textContent);
    await page.close();
    expect(display).toBe('Aucun résultat trouvé');
});

