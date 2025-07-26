import { mockUsers } from "../data/users";
// Simula la verificación de credenciales de usuario.
// Retorna true si las credenciales coinciden con un usuario válido.
export async function loginService(
  username: string,
  password: string
): Promise<boolean> {
  // Simulamos retardo breve
  await new Promise((res) => setTimeout(res, 300));
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  return user ? true : false;
}
