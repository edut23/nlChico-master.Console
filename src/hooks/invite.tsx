import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface DataInvite {
  teamid: string;
  teamname: string;
  teamfoundername: string;
  invitemail: string;
}

interface InviteContextData {
  DataInvite: DataInvite;
  senha?: string;
  Invite(loginInfo: Login): Promise<void>;
  signOut(): void;
  updateDataInvite(DataInvite: DataInvite): void;
}

interface Login {
  teamid: string;
  teamname: string;
  teamfoundername: string;
  invitemail: string;
}

interface DataInviteLoginData {
  DataInvite: DataInvite;
}

const InviteContext = createContext<InviteContextData>({} as InviteContextData);

export const InviteProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataInviteLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const DataInvite = localStorage.getItem('@Challenge:DataInvite');
    
    if (DataInvite) {
      //Axios.defaults.headers.Inviteorization = `Bearer ${token}`;
      return {
        token,
        DataInvite: JSON.parse(DataInvite),
      };
    }

    return {} as DataInviteLoginData;
  });

  const Invite = useCallback(async ({ teamid, teamname, teamfoundername, invitemail }) => {
    const response = await Axios.post(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/invite`,
      {
          "teamid": teamid,
          "teamname": teamname,
          "teamfoundername": teamfoundername,
          "invitemail": invitemail
      },
    );

    const {DataInvite}  = response.data;
    
    Object.assign(DataInvite)
    
    if (DataInvite !== undefined) {
      localStorage.setItem('@Challenge:DataInvite', JSON.stringify(DataInvite));
    }

    setData({
      DataInvite,
    });
    return DataInvite.teamid
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:DataInvite');
      

    setData({} as DataInviteLoginData);
  }, []);

  const updateDataInvite = useCallback(
    (DataInvite: DataInvite) => {
      localStorage.setItem('@Challenge:DataInvite', JSON.stringify(DataInvite));

      setData({
        DataInvite,
      });
    },
    [setData],
  );

  return (
    <InviteContext.Provider
      value={{ DataInvite: data.DataInvite, Invite, signOut, updateDataInvite }}
    >
      {children}
    </InviteContext.Provider>
  );
};

export function useInvite(): InviteContextData {
  const context = useContext(InviteContext);

  return context;
}
