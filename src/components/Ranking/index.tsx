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
  Icon,
  Row,
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
          <Icon/>
          <Title>Ranking</Title>
        </Header>
        <Body>
          {list.map((item, index) => (
            <Item
              myTeam={user.teamid === item.teamid && true}
              key={item.teamid}
            >
              <QuestionPoints>
                {user.teamid !== item.teamid && (
                <h4>{`${index + 1}° ${item.name}`}</h4>)}
                <Row>{user.teamid === item.teamid && (<><h3>{`${index + 1}° `}</h3><h4>{`${item.name}`}</h4></>)}</Row>
                {item.currentquestionid === '111' && (
                  <strong>Finalizado</strong>
                )}
                {item.currentquestionid !== '111' && (
                  <strong>{`Questão ${item.currentquestionid}`}</strong>
                )}
              </QuestionPoints>
              {/*user.teamid === item.teamid && (
                <p>{`${item.points} pts`}</p>
              )*/}
            </Item>
              ))}
        </Body>
      </Content>
    </Container>
  );
};

export default Ranking;
