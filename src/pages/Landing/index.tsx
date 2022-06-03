import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';

import Countdown from '../../components/PageCountdown';
import {useTeam} from '../../hooks/team'
import {useAuth} from '../../hooks/auth'


import {
  PageLanding,
  HeaderA,
  Container,
  Content,
  ChallengeText,
  TopText,
  ButtonSubscribe,
  ButtonsContainer,
} from './styles';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';


interface ResponseLoginFake {
  email: string;
  senha: string;
}

const Landing: React.FC = () => {
  const countDownDate = new Date('October 8, 2021').getTime();

  const [tab, setTab] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const {teamOut} = useTeam();
  const {user} = useAuth();

  useEffect(() => {
    setTab('home');

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTest = useCallback(async () => {
    setIsLogging(true);
    const response = await Axios.get<ResponseLoginFake>(
      'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/loginfake',
    );

    window.location.href = `https://suspicious-lichterman-3943dc.netlify.app/fake/${response.data.email}/${response.data.senha}`;
  }, []);

  return (
    <PageLanding>
      <HeaderA selectedTab={tab} setTab={() => setTab} />
      <Container>
        <Content>
          <ChallengeText>
            Challenge do Colégio <strong>Objetivo</strong>
          </ChallengeText>
          <TopText>As inscrições terminam em:</TopText>

          <Countdown background={false} to={countDownDate} />
            
          <ButtonsContainer>
            <Link to="/subscribe">
              <ButtonSubscribe enabled onClick={teamOut}> <FiUserPlus /> Inscrever-se</ButtonSubscribe>
            </Link>
            <Link to="/gamestart">
              <ButtonSubscribe enabled onClick={teamOut}> <FiUserCheck /> Entrar</ButtonSubscribe>
            </Link>
          </ButtonsContainer>
        </Content>
      </Container>
    </PageLanding>
  );
};

export default Landing;
