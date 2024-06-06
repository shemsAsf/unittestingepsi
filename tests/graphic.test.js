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
    if (page) {
        await page.close();
    }
    done();
});

test('Calculator add test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_2');
    await page.click('#calculator_btn_plus');
    await page.click('#calculator_btn_5');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    expect(display).toBe('7');
    done();
});

test('Calculator substract test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_9');
    await page.click('#calculator_btn_minus');
    await page.click('#calculator_btn_3');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    expect(display).toBe('6');
    done();
});

test('Calculator multiply test', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#calculator_btn_8');
    await page.click('#calculator_btn_multiply');
    await page.click('#calculator_btn_5');
    await page.click('#calculator_btn_equal');
    const display = await page.$eval('#display', dsp => dsp.value);
    expect(display).toBe('40');
    done();
});

test('Searchbar test success', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#searchInput');
    await page.type('#searchInput', 'eggs');
    await page.click('#searchSubmit');
    const display = await page.$eval('#result', dsp => dsp.textContent);
    expect(display).toBe('And bakey');
    done();
});

test('Searchbar test missing', async () => {
    await page.goto('http://localhost:3000/');
    await page.click('#searchInput');
    await page.type('#searchInput', 'missingInput');
    await page.click('#searchSubmit');
    const display = await page.$eval('#result', dsp => dsp.textContent);
    expect(display).toBe('Aucun résultat trouvé');
    done();
});

