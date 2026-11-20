// Usuários do SauceDemo vindos das variáveis de ambiente (.env),
// com valores padrão públicos caso o .env não exista.
export const users = {
  standard: process.env.STANDARD_USER ?? 'standard_user',
  locked: process.env.LOCKED_USER ?? 'locked_out_user',
  glitch: process.env.GLITCH_USER ?? 'performance_glitch_user',
};

export const PASSWORD = process.env.PASSWORD ?? 'secret_sauce';
