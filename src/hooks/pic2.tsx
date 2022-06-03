import React, { createContext, useCallback, useState, useContext } from 'react';

interface Pic2 {
  pic2: string;
}


interface Pic2ContextData {
  pic2: Pic2;
  senha?: string;
  signPic2(loginInfo: void): Promise<void>;
  Pic2Out(): void;
}

interface Login {
  pic2id: string;
}

interface Pic2LoginData {
  pic2: Pic2;
}

const Pic2Context = createContext<Pic2ContextData>({} as Pic2ContextData);

export const Pic2Provider: React.FC = ({ children }) => {
  const [data, setData] = useState<Pic2LoginData>(() => {


    return {} as Pic2LoginData;
  })
  const signPic2 = useCallback(async (pic2) => {
    setData({
      pic2,
    });
  }, []);

  const Pic2Out = useCallback(() => {
    setData({} as Pic2LoginData);
  }, []);

  return (
    <Pic2Context.Provider
      value={{ pic2: data.pic2, signPic2, Pic2Out }}
    >
      {children}
    </Pic2Context.Provider>
  );
};

export function usePic2(): Pic2ContextData {
  const context = useContext(Pic2Context);

  return context;
}