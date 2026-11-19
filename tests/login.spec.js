import{test, expect} from '@playwright/test'
import { exec } from 'node:child_process';
import { TIMEOUT } from 'node:dns';
import { describe } from 'node:test';

test.describe('Login',() =>{
    test.beforeEach(async({page}) =>{
        await page.goto('/')// vira https://www.saucedemo.com/
    })


    test('entra com usuario e senha', async({page}) => {
    // await = esperar este passo terminar e ir para o proximo, page = pagina   
 
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toContainText('Backpack');
    await expect(page.getByRole('button', {name:'Add to cart'})).toHaveCount(6);
    });

    test('teste com o usuario lento ', async({page}) =>{
    
    await page.getByTestId('username').fill('performance_glitch_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page.getByText('Products')).toBeVisible({timeout: 10000});
    })

    test('mostra mensagem para usuario bloqueado', async({page}) =>{
    
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    expect(page.getByTestId('error')).toBeVisible();

    })
});