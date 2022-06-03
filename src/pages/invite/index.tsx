import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiCheck, FiUser, FiUserPlus, FiX } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  PageGame,
  TContainer,
  CircleContent,
  StyledButton,
  PageWrapper,
  FormContainer,
  StyledInput,
  UserContainer,
  P,
  A,
  Users,
} from './styles';

import Header from '../../components/Header';
import Axios from 'axios';
import { LogoOptions, Logo, LogoContent } from './styles';
import seta from '../../assets/img/seta.png';

interface DataFormInfo {
  useremail: string;
}

const Invite: React.FC = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { user } = useAuth();
  const { team } = useTeam();
  const [membros, setMembros] = useState<any[]>([]);
  const [pendentes, setPendentes] = useState<any[]>([]);

  const formRef = useRef<FormHandles>(null);
  const iconStyle = {marginLeft: "-10px", marginRight: "10px"} as React.CSSProperties;
  const emailStyle = {marginBottom: "20px"} as React.CSSProperties;
  
  const carrega = useCallback(async () => {
    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.users, {depth: null}); setMembros(response.data.users)});
    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.users, {depth: null}); setPendentes(response.data.pendingusers)});

  }, [team]);


  const handleSubmit = useCallback(async (data: DataFormInfo) => {
    setIsLogging(true);
    setIsEnabled(false);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        useremail: Yup.string().email('Insira um email válido').required('Email obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await Axios.post(
        `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/invite`,
        {
            "teamid": team.teamid,
            "teamname": team.name,
            "teamfoundername": user.fullname,
            "invitemail": data.useremail
        },
      )
      carrega();
      formRef.current?.reset();
      setIsLogging(false);
      setIsEnabled(true);

    } catch (err) {
      setIsLogging(false);
      setIsEnabled(true);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, [user, team, carrega]);

  const goBack = () => {
    window.history.back()
  }

  useEffect(() => {
    carrega();
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [carrega]);

  return (
    <PageGame>
      <Header />
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      <LogoContent><LogoOptions><Logo onClick={goBack} src={seta} alt="seta"/>
      {user &&<TContainer>
        <PageWrapper>
        <FormContainer>
          <CircleContent>
            <Form ref={formRef} onSubmit={handleSubmit} className="form">
              <P style={emailStyle}>Digite o e-mail de quem quer convidar</P>
              <StyledInput
                name="useremail"
                icon={FiUser}
                placeholder="Email"
                style={{ width: 300 }}
              />
              <StyledButton
                enabled={isEnabled}
                type="submit"
              >
                {isLogging ? <ReactLoading /> : (
                  <>
                    <FiUserPlus style={iconStyle}/>
                    Convidar
                  </>
                )}
              </StyledButton>
            </Form>
            <Users>
              <P>Membros do time:</P>
              <UserContainer>
               {membros.map((users, index) => 
               <li key={index} list-style-type="none" >
                 <A>
                   <p>{JSON.stringify(users.fullname).replace(/"/g, '')}</p>
                   <div className="accepted"><FiCheck /> aceito</div>
                 </A>
                 <br/>
               </li>)}
               {pendentes.map((users, index) => 
               <li key={index} list-style-type= "none">
                 <A>
                   <p>{JSON.stringify(users).replace(/"/g, '')}</p>
                   <div className="pending"><FiX /> pendente</div>
                 </A>
                 <br/>
               </li>)}
             </UserContainer>
              <br/>
            </Users>
          </CircleContent>
          </FormContainer>
        </PageWrapper>
      </TContainer>}
      {!user && team && <TContainer>{window.location.href = '/'}</TContainer>}
      </LogoOptions></LogoContent>
    </PageGame>
  );
};

export default Invite;
