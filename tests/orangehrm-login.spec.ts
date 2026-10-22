import { test, expect } from '@playwright/test';

test('logs in to OrangeHRM and opens the dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('rejects invalid OrangeHRM credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123456');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
  await expect(page).not.toHaveURL(/dashboard/);
});
