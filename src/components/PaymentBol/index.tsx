/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import pagarme from 'pagarme'
import ReactLoading from 'react-loading';
import {useAuth} from '../../hooks/auth'
import QRCode from "react-qr-code";

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import {
  StyledButton,
  FormContainer,
  TContainer,
  CircleContent,
} from './styles';
import Axios from 'axios';

interface DataPay {
    cpf: string;
    name: string;
  }
  
  const PaymentBol: React.FC = () => {
    const [isLogging, setIsLogging] = useState(false);
    const [pixQrCode, setPixQrCode] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [isEnabled, setIsEnabled] = useState(true);
    const {user} = useAuth();
  
    const formRef = useRef<FormHandles>(null);
    const qrStyle = {marginTop: "60px", marginLeft: "18px", width: "256px"} as React.CSSProperties
  
    const handleSubmit = useCallback(async (data: DataPay) => {
      setIsLogging(true);
      setIsEnabled(false);

      if(transactionId === ""){
        try {
          await pagarme.client.connect({ api_key: 'ak_live_zH7x5SHyreYpaA1yAn3UiIFCh7Ig1t' })
            .then((client: { transactions: { create: (arg0: { amount: number; payment_method: string; pix_expiration_date: string; postback_url: string; }) => any; }; }) => client.transactions.create({
              amount: 8000,
              payment_method: 'pix',
              postback_url: 'http://requestb.in/pkt7pgpk',
              pix_expiration_date: '2021-10-01'
          }))
            .then(async (transaction: { id: string; e: any; pix_qr_code: string}) => {
              setTransactionId(transaction.id);
              setPixQrCode(transaction.pix_qr_code);
            })
            .catch((e: any) => alert("Pix não gerado, verifique seus dados."));
        } catch (err) {
          console.log(err);
        }
      } else {
        await Axios.get(
          `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/payment/refreshstatus/bytid?tid=` + transactionId,
        ).then(res => console.log(res))
        window.location.href = '/main';
      }
      setIsLogging(false);
      setIsEnabled(true);
      
    }, [transactionId]);
  
    useEffect(() => {
      const script = document.createElement('script');
  
      script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
      script.async = true;
  
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    useEffect(function () {
        if (transactionId !== '') {
          Axios.post(
            `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/payment`,
            {
              "paymentmethod": "pix",
              "status": "WAITING_PAYMENT",
              "paymentid": transactionId.toString(),
              "userid": user.userid,
              "teamid": user.teamid
            });
        }
      }, [transactionId, user]);
  
    return (
      <TContainer>
        <CircleContent>
          <FormContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <StyledButton
                style={{ width: '100%' }}
                enabled={isEnabled}
                type="submit"
              >
                {isLogging && <ReactLoading />}
                {!isLogging && pixQrCode === "" && 'Gerar QR Code'}
                {!isLogging && pixQrCode !== "" && 'Já paguei!'}
              </StyledButton>

            </Form>
          </FormContainer>
        </CircleContent>
        <div style={qrStyle}>
        {pixQrCode !== "" ? (
          <div>
            <QRCode value={pixQrCode} size={256}/>
            <p className="QRText">Faça o pagamento do QRCode através de um pix e depois clique em "Já Paguei"!</p>
          </div>
        ) : (
          <p></p>
        )}
        </div>
      </TContainer>
    );
  };
  
export default PaymentBol