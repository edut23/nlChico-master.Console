/*{ eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  FiLogOut,
  FiPlay,
  FiCornerUpRight,
  FiAlertTriangle,
} from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useChat, Message } from '../../hooks/chat';
import { useToast } from '../../hooks/toast';
import { useTeam } from '../../hooks/team';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  FirstRowContainer,
  LogoutButton,
  PageContent,
  Answer,
  FormContent,
  ReportErrorButton,
  AnswerButton,
  AnswerInput,
  Hint,
  Question,
  QuestionHeader,
  LoadingQuestion,
  HintButton,
  PassButton,
  QuestionContentContainer,
  QuestionContainer,
  QuestionOverlay,
  RankContainer,
  StyledTooltip,
  SideContainer,
  ButtonsDiv,
  TipButton,
  SkipButton,
  NumberQuestion
} from './styles';

import Header from '../../components/Header';
import Alert from '../../components/Alert';
import Confirm from '../../components/Confirm';
import QuestionContent from '../../components/QuestionContent';
import Ranking from '../../components/Ranking';
import FinalComponent from '../../components/FinalComponent';

interface Question {
  answer: string;
  answercharactercounter: string;
  hint: string;
  points: string;
  questionid: string;
  title: string;
  type: string;
  url: string;
}

interface nextquestion {
  nextQuestion: Question;
}

interface hint {
  hint: string;
}

interface AnswerQuestion {
  iscorrect: boolean;
  nextquestion: Question;
}

interface DataFormInfo {
  answer: string;
}

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();
  const { team } = useTeam();
  const { addMessage, clearMessages } = useChat();
  const { push } = useHistory();

  const [caracterCounter, setCaracterCounter] = useState(999);
  const [rememberAnswer, setRememberAnswer] = useState('');
  const [verifyPing, setVerifyPing] = useState('pong');

  const [passing, setIsPassing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmTip, setConfirmTip] = useState(false);
  const [answering, setIsAnswering] = useState(false);
  const [reportError, setReportError] = useState(false);
  const [qId, setQId] = useState('');
  const [passToast, setPassToast] = useState('');

  const [wsResponse, setWsResponse] = useState('');


  /*const ENDPOINT_WS =
    team.category === 'Fundamental'
      ? (process.env.REACT_APP_FUND_WS as string)
      : (process.env.REACT_APP_PROD_WS as string);*/

  const ENDPOINT = `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod`;
  const ENDPOINT_WS = `wss://admv564mu8.execute-api.sa-east-1.amazonaws.com/prod`;

  /*const ENDPOINT =
    team.category === 'Fundamental'
      ? (process.env.REACT_APP_FUND_API as string)
      : (process.env.REACT_APP_PROD_API as string);*/

  const { addToast } = useToast();
  const [question, setQuestion] = useState<Question>({
    answer: '',
    answercharactercounter: '',
    hint: '',
    points: '',
    questionid: '',
    title: '',
    type: '',
    url: ''
  });

  const formRef = useRef<FormHandles>(null);
  const sWs = useRef<WebSocket>();

  const ping = useCallback(async () => {
    await sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        teamcategory: team.category,
        type: 'ping',
        userid: user.userid,
        teamid: user.teamid,
      }),
    );
  }, []);

  const getRanking = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        teamcategory: team.category,
        type: 'ranking',
        userid: user.userid,
        teamid: user.teamid,
      }),
    );
    console.log(sWs);
  }, [sWs]);

  const sendId = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        teamcategory: team.category,
        type: 'updateconnectionid',
        userid: user.userid,
        teamid: user.teamid,
      }),
    );
  }, [user.userid, user.teamid, question.hint]);

  const reOpenConnection = useCallback(() => {
    console.log('reabriu a conexao');
    sWs.current = new WebSocket(ENDPOINT_WS);
    sWs.current.onopen = (event) => {
      sendId();
    };
  }, [ENDPOINT_WS, sendId]);

  const validatePong = useCallback(() => {
    console.log('terminou a função ping');
  }, []);



  // const sendMessage = useCallback(
  //   (userName: string, teamId: string, message: string) => {
  //     if (userName !== '' && teamId !== '' && message !== '') {
  //       sWs.current?.send(
  //         JSON.stringify({
  //           action: 'onMessage',
  //           type: 'chat',
  //           teamId,
  //           userName,
  //           message,
  //         }),
  //       );
  //     }
  //   },
  //   [sWs],
  // );

  const getCurrentQuestionByTeamId = useCallback(async () => {
    Axios.get<Question>(
      `${ENDPOINT}/team/official/currentquestion?teamid=${user.teamid}&userid=${user.userid}`,
    ).then((response) => {
      if (response.data.type === 'end') {
        push('/endgame');
      }

      console.log("puxo");

      setQuestion(response.data);
      console.log(response.data);
      setQId(response.data.questionid);


      console.log("puxo2");

      setCaracterCounter(
        parseInt(response.data.answercharactercounter, 10),
      );
      console.log("puxo3");
      /*if(response.data.hint !== " " && refreshTip) {
        addToast({
          title: 'Dica',
          description: response.data.hint,
          type: 'success',
        });
        setRefreshTip(!refreshTip);
        console.log(refreshTip);
      }
      /*if(response.data.hint !== " ") {
        addToast({
          title: 'Dica',
          description: response.data.hint,
          type: 'success',
        })
      };*/
      
    });
  }, [ENDPOINT, push, user.userid, user.teamid, question.hint, addToast, setQId]);

  useEffect(() => {
    sWs.current = new WebSocket(ENDPOINT_WS);
    sWs.current.onopen = (event) => {
      sendId();
      console.log("puxo4");
      if(question.hint !== " " && question.hint !== "") {
        addToast({
          title: 'Dica',
          description: question.hint,
          type: 'success',
        })
      };
      setInterval(() => {
        if (sWs !== undefined) {
          ping();
        }
      }, 30000);

      if (sWs.current !== undefined) {
        getRanking();
        console.log("puxo5");
        if (sWs !== undefined) {
          sWs.current.onerror = (err) => {
            // sWs.current?.close();
            // reOpenConnection();
            console.log('deu merda');
            window.location.reload();
          };
        }
        sWs.current.onmessage = (e) => {
          try {
            if (e.data.includes('pong')) {
              setVerifyPing(e.data);
            }

            if (e.data.includes('points')) {
              setWsResponse(e.data);
            }
            if (e.data === 'updatecurrentquestion') {
              getRanking();
              getCurrentQuestionByTeamId();
              /*if(question.hint !== " " && refreshTip) {
                addToast({
                  title: 'Dica',
                  description: question.hint,
                  type: 'success',
                });
                setRefreshTip(false);
              }*/
              addToast({
                title: 'Boa!',
                description: 'Sua equipe acertou a resposta',
                type: 'success',
              });
            }
            if (e.data === 'updatecurrentquestionhint') {
              getCurrentQuestionByTeamId();
                addToast({
                  title: 'Dica',
                  description: question.hint,
                  type: 'success',
                });
            }
            if (e.data.includes('message')) {
              const recievedMessage: Message = JSON.parse(e.data);
              addMessage(recievedMessage.message, recievedMessage.userName);
              console.log(e.data);
            }
            if (e.data.includes('refreshranking')) {
              console.log('refresh foi chamado');
            }
            if (e.data === 'updatecurrentquestionpassed') {
              getRanking();
              getCurrentQuestionByTeamId();
              console.log("ta pulano memo");
              addToast({
                title: 'Alerta',
                description: 'Sua equipe pulou a questão',
                type: 'info',
              });
            }
            
          } catch {
            window.location.reload();
            console.log('err');
          }
        };
      }
    };
    getCurrentQuestionByTeamId();


    
    console.log("puxo6");

    return () => {
      sWs.current?.close();
    };
  }, [
    ENDPOINT_WS,
    addMessage,
    addToast,
    clearMessages,
    getCurrentQuestionByTeamId,
    getRanking,
    ping,
    reOpenConnection,
    sWs,
    sendId,
    user,
    team.currentquestionid,
    user.userid,
    user.teamid,
    question.hint,
    validatePong,
    verifyPing,
  ]);

  const handleShowConfirmTip = useCallback(() => {
    if(question.hint !== " "){
      setConfirmTip(false);
       handleShowHint();
       }
       else if (question.hint === " "){
        setConfirmTip(true);
       }
  }, [confirmTip, question.hint, setConfirmTip]);

  const handleShowHint = useCallback(() => {
    setConfirmTip(false);
    console.log(qId);
    console.log(question.hint);

    Axios.get<hint>(
      `${ENDPOINT}/question/official/hint?questionid=${question.questionid}&teamid=${user.teamid}&userid=${user.userid}`,
    ).then((response) => {
      if(question.hint == ''){
        addToast({
          title: 'Alerta',
          description: 'Essa questão não possui nenhuma dica disponível.',
          type: 'info',
        });
      };
      console.log(response.data);
      sWs.current?.send(
        JSON.stringify({
          action: 'onMessage',
          type: 'updatecurrentquestionhint',
          userid: user.userid,
          teamid: user.teamid,
          teamcategory: team.category
        }),
      );
      sWs.current?.send(
        JSON.stringify({
          action: 'onMessage',
          type: 'refreshranking',
        }),
      );
      ;})
      //getCurrentQuestionByTeamId();
  }, [addToast, question.hint, confirmTip, qId]);

  const handleShowConfirm = useCallback(() => {
    setConfirm(true);
  }, [confirm]);

  const handlePassQuestion = useCallback(() => {
    setConfirm(!confirm);
    Axios.get<nextquestion>(
      `${ENDPOINT}/question/official/pass?questionid=${question.questionid}&teamid=${user.teamid}&userid=${user.userid}`,
    ).then((response) => {
      try {
        setCaracterCounter(999);
        setRememberAnswer('');
        if (response.data.nextQuestion.questionid) {
          setIsPassing(false);
          setConfirm(!confirm);
          setQuestion(response.data.nextQuestion);
          console.log("vai pula");
          sWs.current?.send(
            JSON.stringify({
              action: 'onMessage',
              type: 'updatecurrentquestionpassed',
              userid: user.userid,
              teamid: user.teamid,
              teamcategory: team.category
            }),
          );
          sWs.current?.send(
            JSON.stringify({
              action: 'onMessage',
              type: 'refreshranking',
            }),
          );
        }
        console.log(response.data);
        console.log(response.data.nextQuestion);
        console.log(response.data.nextQuestion.questionid);
        /*if (response.data.nextQuestion.questionid == undefined) {
          setIsPassing(false);
          addToast({
            title: 'Calma',
            description: 'Aguarde o tempo limite para pular a questao. (30s)',
            type: 'info',
          });
        }*/
      } catch {
        /*window.location.reload();*/
        console.log("oia o pulo");
        setIsPassing(false);
          addToast({
            title: 'Calma',
            description: 'Aguarde o tempo limite para pular a questao. (30s)',
            type: 'info',
          });
      }
    });
  }, [ENDPOINT, confirm, question.questionid, user.userid, user.teamid]);

  const handleAnswer = useCallback(
    async (data: DataFormInfo) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          answer: Yup.string().required(
            'Escreva algo na resposta ou pule a pergunta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsAnswering(true);

        Axios.post<AnswerQuestion>(`${ENDPOINT}/question/official/answer`, {
          userid: user.userid,
          teamid: user.teamid,
          questionid: question.questionid,
          questionanswer: data.answer,
        }).then((response) => {
          if (response.data.iscorrect) {
            setCaracterCounter(999);
            setRememberAnswer('');
            console.log(response.data);
            addToast({
              title: 'Boa!',
              description: 'Sua equipe acertou a resposta',
              type: 'success',
            });

            formRef.current?.clearField('answer');
            setQuestion(response.data.nextquestion);
            

            sWs.current?.send(
              JSON.stringify({
                action: 'onMessage',
                type: 'updatecurrentquestion',
                userid: user.userid,
                teamid: user.teamid,
                teamcategory: team.category
              }),
            );
            sWs.current?.send(
              JSON.stringify({
                action: 'onMessage',
                type: 'refreshranking',
              }),
            );
          } else {
            addToast({
              title: 'Erro',
              description: 'Resposta incorreta',
              type: 'error',
            });
          }
          setIsAnswering(false);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [ENDPOINT, addToast, question.questionid, user.userid, user.teamid],
  );

  const handleReportError = useCallback(() => {
    setReportError(!reportError);
  }, [reportError]);

  const handleConfirm = useCallback(() => {
    setConfirm(!confirm);
  }, [confirm]);

    const handleConfirmTip = useCallback(() => {
     setConfirmTip(!confirmTip);
  }, [confirmTip]);

  const handleYesButton = useCallback(() => {
    setIsPassing(!passing);
    handlePassQuestion();
  }, [handlePassQuestion, passing]);

  const handleYesButtonTip = useCallback(() => {
    handleShowHint();
  }, [handleShowHint]);

  const handleCaracterChange = useCallback(
    (e) => {
      setRememberAnswer(e.target.value);
      const counter: String = e.target.value;
      const questionCounter = parseInt(
        question.answercharactercounter,
        10,
      );
      setCaracterCounter(questionCounter - counter.length);
    },
    [question.answercharactercounter],
  );

  return (
    <PageContent>
      {reportError && (
        <Alert
          QuestionId={question.questionid}
          title="Reportar erro"
          buttonTitle="Enviar"
          placeholder="Digite o que está acontecendo aqui"
          show={reportError}
          errFunc={handleReportError}
        />
      )}
      {confirm && (
        <Confirm
          title="Deseja mesmo pular a questão?"
          closeFunc={handleConfirm}
          show={confirm}
          pass={handleYesButton}
        />
      )}
      {confirmTip && (
        <Confirm
          title="Deseja mesmo pedir uma dica? A pontuação da questão cairá pela metade"
          closeFunc={handleConfirmTip}
          show={confirmTip}
          pass={handleYesButtonTip}
        />
      )}
      <Header>
        <LogoutButton onClick={signOut}>
          <FiLogOut size={20} />
          Sair
        </LogoutButton>
      </Header>
      <Container>
        {question.type !== 'final' && (
          <FirstRowContainer>
            <SideContainer>
            <RankContainer>
              <Ranking
                content={
                  wsResponse !== '' &&
                  wsResponse !== 'pong' &&
                  JSON.parse(wsResponse)
                }
              >
                <br />
              </Ranking>
            </RankContainer>
            <ReportErrorButton onClick={handleReportError}/>
            </SideContainer>
            <QuestionContainer>
              <QuestionOverlay>
                <Question>
                  <QuestionHeader normal={question.type === 'normal'}>
                    <NumberQuestion>
                    <h1 style={{ color: '#FFFFFF' }}>{`${question.questionid}`}</h1>
                    </NumberQuestion>
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {`${question.title.replaceAll('<br/>', '\n')}`}
                    </p>
                    {/*question.title !== '' && !passing ? ( ; align-items: 'center'; justify-content: 'center'
                      <>
                        <PassButton onClick={handleConfirm}>
                          <StyledTooltip title="Atenção: Ao pular a questão não tem mais como voltar !">
                            <FiCornerUpRight size={40} />
                            <h5>Pular</h5>
                          </StyledTooltip>
                        </PassButton>
                      </>
                    ) : (
                        <PassButton>
                          <LoadingQuestion
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '2%',
                            }}
                          >
                            <ReactLoading
                              type="spin"
                              color="#d1d1d1"
                              width={40}
                            />
                          </LoadingQuestion>
                        </PassButton>
                      )*/}
                  </QuestionHeader>
                  {question.type !== 'normal' && (
                    <QuestionContentContainer>
                      <QuestionContent
                        type={question.type}
                        url={question.url}
                      />
                    </QuestionContentContainer>
                  )}
                </Question>
                {!answering && !passing ? (
                  <>
                    <Answer>
                      <Form
                        style={{ width: '100%' }}
                        ref={formRef}
                        onSubmit={handleAnswer}
                      >
                        <FormContent>
                          <AnswerInput
                            onChange={(e) => handleCaracterChange(e)}
                            name="answer"
                            placeholder="Digite a resposta aqui"
                            defaultValue={rememberAnswer}
                          />
                          <AnswerButton type="submit">
                            <FiPlay size={20} />
                          </AnswerButton>
                        </FormContent>
                      </Form>
                    </Answer>
                    <Hint>
                        {caracterCounter > 1 &&
                          question.title !== '' &&
                          caracterCounter < 999 && (
                            <>
                              Faltam <strong>{caracterCounter}</strong>{' '}
                              caracteres em sua resposta
                            </>
                          )}

                        {caracterCounter === 1 && caracterCounter < 999 && (
                          <>
                            Falta <strong>{caracterCounter}</strong> caractere
                            em sua resposta
                          </>
                        )}

                        {caracterCounter === 0 && caracterCounter < 999 && (
                          <>
                            Falta <strong>{caracterCounter}</strong> caractere
                            em sua resposta
                          </>
                        )}

                        {caracterCounter < 0 && caracterCounter < 999 && (
                          <strong>Sua resposta excedeu os caracteres</strong>
                        )}
                      </Hint>
                  </>
                ) : (
                    <ReactLoading color="#000" type="balls" />
                  )}
              </QuestionOverlay>
              <ButtonsDiv>
              <SkipButton onClick={handleShowConfirm}/>
              {/*question.hint !== ' ' && !passing && (
                      
                    )*/}
              <HintButton onClick={handleShowConfirmTip}>
                          <TipButton/>
                      </HintButton>
            </ButtonsDiv>
            </QuestionContainer>
          </FirstRowContainer>
        )}
        {question.type === 'final' && (
          <>
            <FinalComponent text={question.title}>
              <Ranking
                content={
                  wsResponse !== '' &&
                  wsResponse !== 'pong' &&
                  JSON.parse(wsResponse)
                }
              >
                <br />
              </Ranking>
            </FinalComponent>
          </>
        )}

        {/* <SecondRowContainer enabled={false}>
          <VideoCards>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
          </VideoCards>
          <ChatContainer>
            <Chat sendMessage={sendMessage} wsConnection={sWs.current} />
          </ChatContainer>
              </SecondRowContainer> */}

      </Container>
    </PageContent>
  );
};

export default Questionary;
