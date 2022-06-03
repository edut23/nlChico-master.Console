import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { FiLock, FiUser, FiUserCheck, FiUserPlus } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

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
  LContainer,
  ButtonsContainer,
  FormHeader
} from './styles';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useTeam } from '../../hooks/team';
import { useHistory } from 'react-router-dom';

import Countdown from '../../components/PageCountdown';
interface DataFormInfo {
  teamName: string;
  password: string;
  teamid: string;
}

const Game: React.FC = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const { addToast } = useToast();
  const { user, signIn, signOut } = useAuth();
  const { team, signTeam } = useTeam();
  const [loading, setLoading] = useState(false);
  

  const formRef = useRef<FormHandles>(null);
  const {teamOut} = useTeam();
  const history = useHistory();

  const countDownDate = new Date('October 8, 2021').getTime();
  const iconStyle = {marginLeft: "-10px", marginRight: "10px"} as React.CSSProperties;

  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
      setIsLogging(true);
      setIsEnabled(false);
      
      
      try {
        await signOut();
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          teamName: Yup.string().required('Nome do usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        
        setLoading(true);


        await signTeam(
        await signIn({
          email: data.teamName,
          password: data.password,
        }));

        setIsLogging(false);
        setIsEnabled(true);

        //window.location.href = '/main';
      } catch (err) {
        setIsLogging(false);
        setIsEnabled(true);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as crendeciais.',
        });
      }
    },
    [addToast, signIn, signOut, signTeam],
  );

  const handleSignInClick = () => {
    teamOut();
    history.push('/subscribe')
  }

  const logo = () => {
    window.location.href = '/main'
  }

  useEffect(() => {
    signOut();
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [signOut]);

  return (
    <PageGame>
      <Header/>
      {loading && <LContainer><ReactLoading type= "spin" color= "orange" height={100} width={190} className="loading"/></LContainer>}
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      {!loading &&
        <TContainer>
          {!user &&<PageWrapper>
              <CircleContent>
                <FormContainer>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormHeader>Divirta-se junto com sua equipe solucionando o desafio do colégio objetivo</FormHeader>
                    <StyledInput
                      name="teamName"
                      icon={FiUser}
                      placeholder="Usuário"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="password"
                      icon={FiLock}
                      type="password"
                      placeholder="Senha"
                    />
                    <ButtonsContainer>
                      <StyledButton enabled isGreen={true} onClick={() =>{handleSignInClick()}}> 
                        <FiUserPlus style={iconStyle} /> 
                        Novo Cadastro
                      </StyledButton>
                      <StyledButton enabled={isEnabled} type="submit">
                        {isLogging ? <ReactLoading /> : ( 
                          <>
                            <FiUserCheck style={iconStyle} /> Entrar
                          </>
                        )}
                      </StyledButton>
                    </ButtonsContainer>
                  </Form>
                </FormContainer>
                <Countdown background={false} to={countDownDate} />
              </CircleContent>
        </PageWrapper>}
      </TContainer>
    }
    {user && team && logo()}
    </PageGame>
  );
};

export default Game;
