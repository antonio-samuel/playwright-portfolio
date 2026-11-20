import { test, expect } from '@playwright/test';
import { users, PASSWORD } from '../support/credentials';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // vira https://www.saucedemo.com/ por causa do baseURL
  });

  test('entra com usuario e senha', async ({ page }) => {
    await page.getByTestId('username').fill(users.standard);
    await page.getByTestId('password').fill(PASSWORD);
    await page.getByTestId('login-button').click();

    // expect(...) espera sozinho (auto-waiting) até a condição ficar verdadeira
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
  });

  test('teste com o usuario lento', async ({ page }) => {
    await page.getByTestId('username').fill(users.glitch);
    await page.getByTestId('password').fill(PASSWORD);
    await page.getByTestId('login-button').click();

    // Este usuário demora para logar, então aumentamos o tempo de espera só aqui
    await expect(page.getByTestId('title')).toBeVisible({ timeout: 10_000 });
  });

  test('mostra mensagem para usuario bloqueado', async ({ page }) => {
    await page.getByTestId('username').fill(users.locked);
    await page.getByTestId('password').fill(PASSWORD);
    await page.getByTestId('login-button').click();

    // Atenção: sempre usar "await" antes do expect, senão a verificação não é esperada
    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('locked out');
  });

  // Mesmo teste repetido para vários dados de entrada (um test() para cada item da lista)
  const casosDeErro = [
    { nome: 'senha errada', usuario: users.standard, senha: 'secret', erro: 'do not match any user' },
    { nome: 'usuario inexistente', usuario: 'standart_user', senha: PASSWORD, erro: 'do not match any user' },
    { nome: 'campos vazios', usuario: '', senha: '', erro: 'Username is required' },
    { nome: 'sem senha', usuario: users.standard, senha: '', erro: 'Password is required' },
    { nome: 'sem usuario', usuario: '', senha: PASSWORD, erro: 'Username is required' },
  ];

  for (const caso of casosDeErro) {
    test(`mostra erro de validacao: ${caso.nome}`, async ({ page }) => {
      // Diferente do Cypress, fill('') aceita string vazia
      await page.getByTestId('username').fill(caso.usuario);
      await page.getByTestId('password').fill(caso.senha);
      await page.getByTestId('login-button').click();

      await expect(page.getByTestId('error')).toContainText(caso.erro);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }
});
