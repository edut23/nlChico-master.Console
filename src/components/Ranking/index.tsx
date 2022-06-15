import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';

import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Item,
  QuestionPoints,
} from './styles';

interface RankingProps {
  content?: any;
}

interface Ranking {
  category: string;
  currentquestionid?: string;
  founder: string;
  imageurl: string;
  name: string;
  points: number;
  teamid?: string;
}

const Ranking: React.FC<RankingProps> = ({ children, content }) => {
  const { user } = useAuth();
  const { team } = useTeam();

  const [list, setList] = useState<Ranking[]>([]);

  useEffect(() => {
    if (content !== false) {
      setList(content);
    }
  }, [content, user]);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Ranking</Title>
        </Header>
        <Body>
          {list.slice(0, 4).map((item, index) => (
            <Item
              myTeam={user.teamid === item.teamid && true}
              key={item.teamid}
            >
              <QuestionPoints>
                <h3>{`${index + 1}° - ${item.name}`}</h3>
                {item.currentquestionid === '111' && (
                  <strong>Finalizado</strong>
                )}
                {item.currentquestionid !== '111' && (
                  <strong>{`Questão ${item.currentquestionid}`}</strong>
                )}
              </QuestionPoints>
              {user.teamid === item.teamid && (
                <p>{`${item.points} pts`}</p>
              )}
            </Item>
              ))}
            {//*<Item myTeam={/*user.teamid === item.TeamName && true*///true}
              //key={/*item.TeamName*/ "foi"}>
              //<QuestionPoints>
                //<h3>1º - Equipe Teste</h3>
               // <strong>Finalizado</strong>
             // </QuestionPoints>
             //</Body> <p>{`180 pts`}</p>
            //</Content></Item>
          }
        </Body>
      </Content>
    </Container>
  );
};

export default Ranking;
