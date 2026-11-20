import { expect } from '@playwright/test';
import { users, PASSWORD } from './credentials';

// Faz login com o usuário padrão e confirma que chegou na lista de produtos.
export async function fazerLogin(page, usuario = users.standard) {
  await page.goto('/');
  await page.getByTestId('username').fill(usuario);
  await page.getByTestId('password').fill(PASSWORD);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
}
