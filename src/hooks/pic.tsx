import React, { createContext, useCallback, useState, useContext } from 'react';

interface Pic {
  pic: string;
}


interface PicContextData {
  pic: Pic;
  signPic(loginInfo: Login): Promise<void>;
  PicOut(): void;
}

interface Login {
  picid: string;
}

interface PicLoginData {
  pic: Pic;
}

const PicContext = createContext<PicContextData>({} as PicContextData);

export const PicProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PicLoginData>(() => {
    const pic = localStorage.getItem('@Challenge:team');
    

    if (pic) {
      //Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        pic: JSON.parse(pic),
      };
    }


    return {} as PicLoginData;
  });
  const signPic = useCallback(async (Pic) => {
    const {pic} = Pic
    Object.assign(pic)
    setData({
      pic
    }
    );
  }, []);

  const PicOut = useCallback(() => {
    setData({} as PicLoginData);
  }, []);

  return (
    <PicContext.Provider
      value={{ pic: data.pic, signPic, PicOut }}
    >
      {children}
    </PicContext.Provider>
  );
};

export function usePic(): PicContextData {
  const context = useContext(PicContext);

  return context;
}