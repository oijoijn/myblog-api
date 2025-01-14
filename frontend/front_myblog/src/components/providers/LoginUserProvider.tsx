import { useState } from 'react';
import { LoginUserContext } from './LoginUserContext';
import { StateLoginUser } from '../config/interface';

export const LoginUserProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [loginUser, setLoginUser] = useState<StateLoginUser>({
    username: '',
  });

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
