import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team'
import ReactLoading from 'react-loading';

import { Link } from 'react-router-dom';
import {
  A,
  PageGame,
  TContainer,
  PageWrapper,
  CircleContent,
  FormContainer,
  P,
  StyledButton,
  Users,
  UserContainer,
  Buttons,
  ImageContainer,
  MainImg,
} from './styles';
import Axios from 'axios';
import { FiCheck, FiDollarSign, FiUserPlus, FiX } from 'react-icons/fi';
import Header from '../../components/Header';
import { Form } from '@unform/web';
import { ChallengeText } from '../Landing/styles';

const Main: React.FC = () => {

  const { user } = useAuth();
  const { team } = useTeam();
  const [membros, setMembros] = useState<any[]>([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [isLogging, setIsLogging] = useState(true);

  const iconStyle = {marginLeft: "-10px", marginRight: "10px"} as React.CSSProperties;

  const defaultUserProfileImage = useMemo<string>(
    () =>
      'https://cdn.raceroster.com/assets/images/team-placeholder.png',
    [],
  );
  
  const carrega = useCallback(async () => {
    setIsLogging(true);

    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.paymentStatus, {depth: null}); setPaymentStatus(response.data.paymentStatus)});

    console.log(paymentStatus)
    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.users, {depth: null}); setMembros(response.data.users)});
    
    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.users, {depth: null}); setPendentes(response.data.pendingusers)});
    
    setIsLogging(false);
  }, [team, paymentStatus]);

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
      {user &&<TContainer>
        <PageWrapper>
        <FormContainer>
          <CircleContent>
            <Form onSubmit={() => {console.log("Teste")}} className="form">
              <P>Gerencie o seu time</P>
              <div className="teamInfo">
                <ImageContainer>
                  <div className="main-profile-img">
                    <MainImg
                      src={team.imageurl && team.imageurl !== ' ' ? team.imageurl : defaultUserProfileImage}
                      alt="user"
                    />
                  </div>
                </ImageContainer>
                <ChallengeText>
                  {team.name}
                </ChallengeText>
              </div>
              <Buttons> 
                <Link to="/invite">
                  <StyledButton type="submit"> <FiUserPlus/> Adicionar Membros</StyledButton>
                </Link>
                {isLogging && (
                  <StyledButton enabled={false}> 
                    <ReactLoading />
                  </StyledButton>
                )}
                {!isLogging && paymentStatus !== 'PAID' && (
                  <Link to="/payment">
                    <StyledButton enabled> <FiDollarSign style={iconStyle} /> Pagar inscrição</StyledButton>
                  </Link>
                )}
                {!isLogging && paymentStatus === 'PAID' && (
                  <div>
                <Link to="/questionary">
                  <StyledButton enabled> Responder Quiz Oficial </StyledButton>
                </Link>
                  <StyledButton enabled={false}> <FiCheck style={iconStyle}/>Inscrição Paga</StyledButton>
                  </div>
                )}
              </Buttons>
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
    </PageGame>
    
    // <PageLanding> 
    //   <HeaderA selectedTab={tab} setTab={() => setTab} />
    //   <Container>
    //     <Content>
    //       <CountButton>
    //         <ButtonsContainer>
    //           <ChallengeText>
    //             {team.name}
    //           </ChallengeText>
    //           <Buttons>
    //             <Link to="/invite">
    //               <ButtonSubscribe type="submit"> <FiUserPlus/> Adicionar Membros</ButtonSubscribe>
    //             </Link>
    //             {isLogging && (
    //               <ButtonSubscribe enabled={false}> 
    //                 <ReactLoading />
    //               </ButtonSubscribe>
    //             )}
    //             {!isLogging && paymentStatus !== 'PAID' && (
    //               <Link to="/payment">
    //                 <ButtonSubscribe enabled> <FiDollarSign style={iconStyle} /> Pagar inscrição</ButtonSubscribe>
    //               </Link>
    //             )}  
    //             {!isLogging && paymentStatus === 'PAID' && (
    //               <ButtonSubscribe enabled={false}> <FiCheck style={iconStyle}/>Inscrição Paga</ButtonSubscribe>
    //             )}
    //           </Buttons>
    //         </ButtonsContainer>

    //         <UsersContainer>
    //           {membros.map((users, index) => 
    //           <li key={index} list-style-type="none" >
    //             <A>
    //               <p>{JSON.stringify(users.fullname).replace(/"/g, '')}</p>
    //               aceito <FiCheck />
    //             </A>
    //             <br/>
    //           </li>)}
    //           {pendentes.map((users, index) => 
    //           <li key={index} list-style-type= "none">
    //             <A>
    //               <p>{JSON.stringify(users).replace(/"/g, '')}</p>
    //               pendente <FiX />
    //             </A>
    //             <br/>
    //           </li>)}
    //         </UsersContainer>
    //       </CountButton>
    //     </Content>
    //   </Container>
    //   {!user && <div>{window.location.href = '/'}</div>}
    // </PageLanding>
  );
};

export default Main;




