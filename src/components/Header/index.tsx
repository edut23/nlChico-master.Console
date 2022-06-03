import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Logo,
  LogoContent,
  LogoOptions,
  HomeOption,
  RegulationOption,
  ImageContainer,
  MainImg,
} from './styles';

import {UserContainer} from './styles'

import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';

import chicoLogo from '../../assets/img/containerLogo.png';

interface HeaderProps {
  selectedTab?: string;
  setTab?(tab: string): React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  selectedTab = 'home',
  setTab,
  children,
}) => {
  const { user, signOut } = useAuth();
  const { team } = useTeam();

  const defaultUserProfileImage = useMemo<string>(
    () =>
      'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png',
    [],
  );

  const logoClick = () => {
    if (user && team)
      window.location.href = '/main'
    else
      window.location.href = '/'
  }

  return (
    <Container>
      <LogoContent>
        <LogoOptions>
          {user && team && <div> 
          <UserContainer>
           <ImageContainer>
              <div className="main-profile-img">
                <MainImg
                  src={user.imageurl && user.imageurl !== ' '? user.imageurl : defaultUserProfileImage}
                  alt="user"
                />
              </div>
            </ImageContainer>
            <div className="user-data-container">
              <h3>{user.nickname}</h3>
            </div>
          <Link to = "/"><HomeOption tab={selectedTab} onClick = {signOut}>Sair</HomeOption></Link>
          </UserContainer>
          </div>}
          {!user && (
            <>
              <Link
                onClick={() => {
                  setTab && setTab('regulamento');
                }}
                to="/"
              >
                <RegulationOption tab={selectedTab}>
                  Home
                </RegulationOption>
              </Link>
              <Link
                onClick={() => {
                  setTab && setTab('regulamento');
                }}
                to="/regulamento"
              >
                <RegulationOption tab={selectedTab}>
                  Regulamento
                </RegulationOption>
              </Link>
            </>
          )}
          {children}
        </LogoOptions>
      </LogoContent>
      <Logo src={chicoLogo} alt="chicologo" onClick={logoClick} style={{zIndex: 100}}></Logo>
    </Container>
  );
};

export default Header;
