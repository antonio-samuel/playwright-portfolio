import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('pagina inicial carrega com o formulario de login', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeEnabled();
  });
});
