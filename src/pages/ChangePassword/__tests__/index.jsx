import { renderWithRouter, userEvent, screen, waitFor } from 'test-utils';
import UserProvider from 'commons/contexts/User';
import PAGE_URL from 'commons/constants/routes';
import { setToken } from 'commons/utils/storage';
import ChangePassword from '..';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWE0N2U1OGUtMjdlOS00NzllLWIwY2MtMWEyOWQyYjZmMWNiIiwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wNVQxODowOToyNS4wMzdaIiwidXBkYXRlZEF0IjoiMjAyMS0wOC0wNVQxODowOToyNS4wMzdaIiwiZW1haWwiOiJnYWJyaWVsbXNzYW50aWFnb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiRjcmZGb2g1d1NRQS5MVzdDQVYzQzd1a2M1VkE4ZUlKNVh2VGllZHlqUGpJWk5sckhQNVJ4ZSIsIm5hbWUiOiJHYWJyaWVsIFNhbnRpYWdvIiwiZGVzY3JpcHRpb24iOiJTb3UgdW0gdHJhYmFsaGFkb3IgbXVpdG8gZXNmb3LDp2FkbyEiLCJhdmF0YXJVcmwiOiJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NSakdtN2Z0Xy1EMGxZdGJDT0taa2hwUEwwT3NkdThmV29FdWdZUk1UWDJvbjFVTzZJcnY2T1BheGZsc2JvdGFXZDlvenFSWVZoVnpBeExmZyZ1c3FwPUNBVSIsInBob25lIjoiMzQ5OTY4NjM2NjIiLCJzdGF0ZSI6Ik1HIiwiY2l0eSI6IlViZXJsw6JuZGlhIiwiaGFzV2hhdHNhcHAiOnRydWV9LCJpYXQiOjE2Mjk2MTM5ODMsImV4cCI6MTYzMjIwNTk4M30.b66yb-AV4cMpkq_8RK_REIpLKbGGJSwDLAKn0D4tRFo';

it('should change password and redirect to profile', async () => {
  setToken(TOKEN);

  renderWithRouter(
    <UserProvider>
      <ChangePassword />
    </UserProvider>,
  );

  userEvent.type(screen.getByLabelText(/senha atual/i), '123213');
  userEvent.type(
    screen.getByLabelText('Nova senha', { exact: true }),
    '123456',
  );
  userEvent.type(screen.getByLabelText(/confirmar nova senha/i), '123456');
  userEvent.click(screen.getByRole('button', { name: /confirmar/i }));

  expect(
    await screen.findByText(/Senha trocada com sucesso!/i),
  ).toBeInTheDocument();
  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
});
