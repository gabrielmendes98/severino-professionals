import { useContext } from 'react';

import { UserContext } from '.';

const useUser = () => {
  const data = useContext(UserContext);
  if (!data) {
    throw new Error(
      'Verifique se seu componente está envolvido em um UserProvider',
    );
  }
  return data;
};

export default useUser;
