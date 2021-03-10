/*global page*/

import { host } from '../config';

export async function adminLogin() {
  await page.goto(host);
  await expect(page).toFill('input[id=email]', 'xxx@gmail.com');
  await expect(page).toFill('input[id=password]', 'Zasada');
  await expect(page).toClick('button[type=submit]');
  await page.waitForNavigation();
}

export async function logout() {
}
