import { host } from '../config';
import { adminLogin } from '../helpers/login';

const testSerialNumber = 'test35353';
const testInvoiceNumber = '453434';
const testReturnReason = 'Unused part';
const testReturnReasonComment = 'my return reason test comment';
const testCreatedAt = new Date().toISOString().slice(0, 10);
const testComment = 'my test comment';

describe('Return-request', () => {
  beforeAll(async () => {
    await adminLogin();
  });

  it('should create new return request', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', testSerialNumber);

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');

    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() =>
      [...document.querySelectorAll('div.all-return-requests > div:last-child p')]
        .map((e) => e.innerText));

    expect(actualResult).toEqual([
      `Serial number: ${testSerialNumber}`,
      `Invoice number: ${testInvoiceNumber}`,
      `Return reason: ${testReturnReason}`,
      `Created at: ${testCreatedAt}`,
      testComment
    ]);
  });

  it('should not submit form when serialNumber > 10 characters', async () => {
    await page.goto(`${host}/return-request`);
    // serialNumber should be at least six characters and at most ten characters
    await expect(page).toFill('input[id=serialNumber]', '123456789999999');

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');
    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});
  });

  it('should not submit form when serialNumber contains special characters', async () => {
    await page.goto(`${host}/return-request`);
    // serialNumber should be alpha numeric
    await expect(page).toFill('input[id=serialNumber]', 'test$$$$$');

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');
    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});
  });

  it('should not submit form when serialNumber < 6 characters', async () => {
    await page.goto(`${host}/return-request`);
    // serialNumber should be at least six characters and at most ten characters
    await expect(page).toFill('input[id=serialNumber]', '12345');

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');
    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});
  });

  it('should not submit form when invoiceNumber > 6 characters', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', testSerialNumber);

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    // invoiceNumber should be at most six characters
    await expect(page).toFill('input[id=invoiceNumber]', '123456789');
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});

    await page.waitForTimeout(2000);
  });

  it('should not submit form when invoiceNumber is not numeric', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', testSerialNumber);

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    // invoiceNumber should be numeric
    await expect(page).toFill('input[id=invoiceNumber]', 'test');
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});

    await page.waitForTimeout(2000);
  });

  it('should create new return request when returnReason=Other and returnReasonComment is set', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', testSerialNumber);

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('textarea[name=returnReasonComment]', testReturnReasonComment);
    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');

    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() =>
      [...document.querySelectorAll('div.all-return-requests > div:last-child p')]
        .map((e) => e.innerText));

    expect(actualResult).toEqual([
      `Serial number: ${testSerialNumber}`,
      `Invoice number: ${testInvoiceNumber}`,
      `Return reason: Other`,
      `Created at: ${testCreatedAt}`,
      testComment,
      "Return reason comment:",
      testReturnReasonComment,
    ]);
  });

  it('should not submit form when comment > 240 characters', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', testSerialNumber);

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', [...Array(245)].map(() => Math.random().toString(36)[2]).join(''));
    await expect(page).toClick('button[type=submit]');
    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});
  });

  it('should not submit form when serialNumber is empty', async () => {
    await page.goto(`${host}/return-request`);
    await expect(page).toFill('input[id=serialNumber]', '');

    await expect(page).toClick('div.return-request-select');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page).toFill('input[id=invoiceNumber]', testInvoiceNumber);
    await expect(page).toFill('textarea[name=comment]', testComment);
    await expect(page).toClick('button[type=submit]');
    await page.waitForTimeout(2000);

    let actualResult = await page.evaluate(() => document.querySelectorAll('div.all-return-requests'));

    expect(actualResult).toEqual({});
  });
});

