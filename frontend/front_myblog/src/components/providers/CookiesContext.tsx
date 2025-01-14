import { createContext } from 'react';

export const CookiesContext = createContext<{
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  cookies: { [key: string]: string };
}>({
  login: async () => {},
  logout: () => {},
  cookies: {},
});