import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiLock, FiUser, FiUserPlus } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team'


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
} from './styles';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

interface DataFormInfo {
  useremail: string;
  userfullname: string;
  usernickname: string;
  userpassword: string;
  teamid: string;
}

interface Params {
  inviteid: string;
}

const Accept: React.FC = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [inviteId, setInviteId] = useState('');
  const [teamId, setTeamId] = useState('');
  const { signIn } = useAuth();
  const { team, signTeam } = useTeam();
  const params = useParams() as Params;

  const formRef = useRef<FormHandles>(null);
  const iconStyle = {marginLeft: "-10px", marginRight: "10px"} as React.CSSProperties;

  const handleSubmit = useCallback(async (data: DataFormInfo) => {
    setIsLogging(true);
    setIsEnabled(false);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        useremail: Yup.string().email('Insira um email válido').required('Email obrigatório'),
        userfullname: Yup.string().required('Nome completo obrigatório'),
        usernickname: Yup.string().required('Nome do usuário obrigatório'),
        userpassword: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await Axios.post(
        `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/invite/accepted`,
        {
          userfullname: data.userfullname,
          useremail: data.useremail,
          userpassword: data.userpassword,
          usernickname: data.usernickname,
          inviteid: inviteId,
          teamid: teamId
        }
      ).then(res => console.log(res))

      await signTeam(
        await signIn({
        email: data.useremail,
        password: data.userpassword,
      }));

      setIsLogging(false);
      setIsEnabled(true);

      window.location.href = '/regulamento';

    } catch (err) {
      setIsLogging(false);
      setIsEnabled(true);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, [signIn, signTeam, inviteId, teamId]);

  useEffect(() => {
    setInviteId(params.inviteid.split('&')[0].replace('inviteid=',''));
    setTeamId(params.inviteid.split('&')[1].replace('teamid=',''));

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [team, params, inviteId, teamId]);

  return (
    <PageGame>
      <Header />
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      <TContainer>
        <PageWrapper>
        <FormContainer>
          <CircleContent>
            <br/>
              <Form ref={formRef} onSubmit={handleSubmit} className="form">
                <StyledInput
                  name="useremail"
                  icon={FiUser}
                  placeholder="Email"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="userfullname"
                  icon={FiUser}
                  placeholder="Nome completo"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="usernickname"
                  icon={FiUser}
                  placeholder="Nome de usuário"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="userpassword"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
                <StyledButton
                  enabled={isEnabled}
                  type="submit"
                >
                  {isLogging ? <ReactLoading /> : (
                    <>
                      <FiUserPlus style={iconStyle}/>
                      Cadastar
                    </>
                  )}
                </StyledButton>
              </Form>
            
          </CircleContent>
          </FormContainer>
        </PageWrapper>
      </TContainer>
    </PageGame>
  );
};

export default Accept;
