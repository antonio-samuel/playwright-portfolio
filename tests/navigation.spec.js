import { test, expect } from '@playwright/test';
import { fazerLogin } from '../support/auth';

test.describe('Navegacao (usuario logado)', () => {
  test.beforeEach(async ({ page }) => {
    await fazerLogin(page);
  });

  test('abre os detalhes de um produto e volta para a lista', async ({ page }) => {
    const primeiroProduto = page.getByTestId('inventory-item-name').first();
    const nome = (await primeiroProduto.textContent()) ?? '';

    await primeiroProduto.click();
    await expect(page).toHaveURL(/inventory-item\.html/);

    // A URL muda antes de a tela nova terminar de carregar, e o data-test
    // "inventory-item-name" existe na lista (6 itens) e nos detalhes (1 item).
    // Por isso esperamos primeiro por algo que só existe na página de detalhes.
    await expect(page.getByTestId('back-to-products')).toBeVisible();
    await expect(page.getByTestId('inventory-item-name')).toHaveText(nome);

    await page.getByTestId('back-to-products').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('vai ate o carrinho e volta para continuar comprando', async ({ page }) => {
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByTestId('title')).toHaveText('Your Cart');

    await page.getByTestId('continue-shopping').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('menu lateral mostra os links esperados', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();

    await expect(page.getByTestId('inventory-sidebar-link')).toBeVisible();
    await expect(page.getByTestId('logout-sidebar-link')).toBeVisible();
    // Só confere o destino do link, sem sair do site
    await expect(page.getByTestId('about-sidebar-link')).toHaveAttribute('href', 'https://saucelabs.com/');
  });

  test('faz logout pelo menu e volta para a tela de login', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByTestId('logout-sidebar-link').click();

    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});

test.describe('Navegacao (sem login)', () => {
  test('acessar a lista de produtos direto redireciona para o login', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('logged in');
  });
});