import { createContext } from 'react';
import { StateLoginUser } from '../config/interface';

export const LoginUserContext = createContext<{
  loginUser: StateLoginUser;
  setLoginUser: React.Dispatch<React.SetStateAction<StateLoginUser>>;
}>({
  loginUser: { username: '' },
  setLoginUser: () => {},
});
