import React, {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
} from 'react';

import {
  Container,
  NumberSection,
  TimerSection,
  Number,
} from './styles';

interface CountDownProps {
  to: number;
  from?: number;
  background?: boolean;
}

const PageCountdown: React.FC<CountDownProps> = ({
  to,
  from = 0 as number,
  background = true,
}) => {
  const [timerDays, setDays] = useState('00');
  const [timerHours, setHours] = useState('00');
  const [timerMinutes, setMinutes] = useState('00');
  const [timerSeconds, setSeconds] = useState('00');
  const [expired, setExpired] = useState(false);
  const [localStorageDate, setLocalStorageDate] = useState(0);

  interface UserefProps {
    interval: Array<{
      current: number;
    }>;
  }

  const interval: UserefProps | MutableRefObject<number | undefined> = useRef();

  const handleRemoveCountDown = useCallback(() => {
    setExpired(true);
  }, []);

  useEffect(() => {
    setLocalStorageDate(to);

    interval.current = window.setInterval(() => {
      const now = from || new Date().getTime();
      const distance = localStorageDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        handleRemoveCountDown();
      }
      if (distance > 0) {
        setDays(`${days}`);
        setHours(`${hours}`);
        setMinutes(`${minutes}`);
        setSeconds(`${seconds}`);
      } else {
        clearInterval(interval.current);
      }
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [from, handleRemoveCountDown, localStorageDate, to]);

  return (
    <Container expired={expired}>
      <TimerSection from={from ? true : undefined} background={background}>
        {timerDays !== '00' && (
          <>
            <NumberSection count={'day'}>
              <Number>{timerDays}</Number>
            </NumberSection>

            <NumberSection count={'hour'}>
              <Number>{timerHours}</Number>
            </NumberSection>

            <NumberSection count={'minute'}>
              <Number>{timerMinutes}</Number>
            </NumberSection>

            <NumberSection count={'second'}>
              <Number>{timerSeconds}</Number>
            </NumberSection>
          </>
        )}
      </TimerSection>
    </Container>
  );
};

export default PageCountdown;
