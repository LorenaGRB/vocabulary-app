import { create } from "zustand";
import { loginService } from "../mock/services/auth";

interface User {
  username: string;
}
interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username, password) => {
    const success = await loginService(username, password);
    if (success) {
      set({ user: { username } });
      return true;
    } else {
      return false;
    }
  },
  logout: () => {
    set({ user: null });
  },
}));
