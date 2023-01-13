import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const playerName = 'input-player-name';
const playerEmail = 'input-gravatar-email';
describe('Verifica se os inputs email, nome e botão play estão renderizados', () => {
  test('Verifica o input nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {
      name: /nome/i,
    });
    expect(inputName).toBeInTheDocument();
  });
  test('Verifica o input email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica o botão play', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });
    expect(playBtn).toBeInTheDocument();
  });
});
describe('Testa a página de login e verifica se:', () => {
  test('O botão play está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });
    expect(playBtn).toBeDisabled();
  });
  test('O botão play está habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {
      name: /nome/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
  });
});
describe('Verifica se:', () => {
  test('A rota muda com o acionamento do botão', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toEqual('/');
    const inputName = screen.getByTestId(playerName);
    const inputEmail = screen.getByTestId(playerEmail);
    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });
    expect(playBtn).toBeInTheDocument();
    userEvent.click(playBtn);
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/game');
    });
  });
});
describe('Verificação do botão settings', () => {
  test('Verifica se o usuário foi direcionado para "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByRole('button', {
      name: /settings/i,
    });
    userEvent.click(buttonSettings);
    expect(history.location.pathname).toBe('/settings');
  });
});
