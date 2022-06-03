import React from 'react';
import { Switch } from 'react-router-dom';

// Components
import Game from '../pages/Game';
import Regulamento from '../pages/Regulamento';
import Fake from '../pages/Fake';
import EndGame from '../pages/EndGame';
import Subscribe from '../pages/Subscribe';
import Payment from '../pages/Payment';
import Main from '../pages/Main';
import PaymentBol from '../components/PaymentBol';
import invite from '../pages/invite';
import Accept from '../pages/Accepted';
import Questionary from '../pages/Questionary';

import Route from './Route';



const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Game} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/main" component={Main}/>
      <Route path="/gamestart" component={Game} />
      <Route path="/regulamento" component={Regulamento} />
      <Route path="/fake/:user/:pass" component={Fake} />
      <Route path="/endgame" component={EndGame} isPrivate />
      <Route path="/payment" component={Payment} />
      <Route path="/paymentbol" component={PaymentBol} />
      <Route path="/invite" component={invite} />
      <Route path="/accept/:inviteid" component={Accept} />
      <Route path="/accept" component={Accept} />
      <Route path="/questionary" component={Questionary} />
    </Switch>
  );
};

export default routes;
