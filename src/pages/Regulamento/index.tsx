/* eslint-disable react/jsx-indent */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  PageRegulamento,
  RulesContainer,
  Card,
  Content,
  Title,
  SubContent,
  SubContentItem,
  StyledButton,
  Rules,
  CardContent,
  ButtonsContainer,
} from './styles';
import Header from '../../components/Header';
import Json from './regulamento.json';
import {useAuth} from '../../hooks/auth'

interface SubItem {
  text: string;
  id: number;
}

const Regulamento: React.FC = () => {
  const {user} = useAuth();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageRegulamento  style={{bottom: 300}}>
      <Header/>
        <RulesContainer>
          <Content>
            <p>Regulamento</p>
            <Rules>
              {Json.regulamento.map((item) => {
                return (
                  <Card key={item.title}>
                    <Title>{item.title}</Title>
                    <CardContent>{item.content}</CardContent>
                    <SubContent>
                      {item.subcontents.map(({ id, text }: SubItem) => {
                        return <SubContentItem key={id}>{text}</SubContentItem>;
                      })}
                    </SubContent>
                  </Card>
                );
              })}
              <ButtonsContainer>
              {user &&
                <Link to="/main" style={{textDecoration:" none"}}>
                <StyledButton>Concordo</StyledButton>
                </Link>
              }
              {!user &&
                <Link to="/" style={{textDecoration:" none"}}>
                <StyledButton>Participe já</StyledButton>
                </Link>
              }
            </ButtonsContainer>
            </Rules>
          </Content>
        </RulesContainer>
    </PageRegulamento>
  );
};

export default Regulamento;
