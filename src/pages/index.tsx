import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import completeSession from '../api/completeSession';
import startSession from '../api/startSession';
import ClockRenderer from '../components/clockRenderer';
import TabSlider from '../components/tabSlider';
import WalletContext from '../utils/context/WalletContext';
import getSessionsToday from '../api/getSessionsToday';
import { AxiosError } from 'axios';
import Table from '../components/table';

const HomePage: NextPage = () => {
  // default value has to be at least 1 - otherwise the component bugs out probably due to SSR
  const [time, setTime] = useState(1);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [autostart, setAutostart] = useState(false);
  const [sessionRewards, setSessionRewards] = useState(0);
  const { wallet } = useContext(WalletContext);

  // set the time using useEffect to sync the timer client side
  useEffect(() => {
    const isEven = sessionIndex % 2 === 0;
    // there is a bug, gotta offset it with 1000ms
    setPomoTimer(isEven, false);
  }, []);

  useEffect(() => {
    if (wallet) {
      getSessionsToday(wallet).then((data) => {
        setSessionRewards(data.rewards);
      });
    }
  }, [sessionIndex, wallet]);

  const setPomoTimer = (isEven: boolean, triggerToast: boolean) => {
    if (triggerToast) {
      toast(isEven ? 'Pomo Time!' : 'Break Time!', { icon: isEven ? '🐝' : '💪' });
    }
    setTime(Date.now() + 1000 + (isEven ? 25 : 5) * 60 * 1000);
  };

  const handleOnStart = async () => {
    if (!wallet) {
      return toast("You're using Hive without wallet connection!", { icon: '❌' });
    }
    try {
      const isEven = sessionIndex % 2 === 0;
      if (isEven) {
        startSession(wallet);
      }
    } catch (e: any) {
      if ((e as AxiosError).code === 'ERR_BAD_REQUEST') {
        return;
      }
      toast(e.message);
    }
  };

  const handleOnComplete = async () => {
    if (!wallet) {
      return toast('Please connect your wallet!');
    }
    const incrementedSessionIndex = sessionIndex + 1 > 3 ? 0 : sessionIndex + 1;
    const isEven = incrementedSessionIndex % 2 === 0;
    if (!isEven) {
      completeSession(wallet).then((isSuccessful) =>
        toast(isSuccessful ? 'Rewards sent!' : 'No reward sent!', { icon: isSuccessful ? '⚡️' : '❌' })
      );
    }
    setPomoTimer(isEven, true);
    if (!autostart) {
      setAutostart(true);
    }
    setSessionIndex(incrementedSessionIndex);
  };

  return (
    <div className="flex flex-col max-w-300 md:max-w-500 w-full">
      <Countdown
        key={sessionIndex}
        date={time}
        precision={3}
        autoStart={autostart}
        zeroPadDays={2}
        zeroPadTime={2}
        renderer={(props) => ClockRenderer(props)}
        onStart={handleOnStart}
        onComplete={handleOnComplete}
      />
      <TabSlider index={sessionIndex} />
      <div className="flex justify-center items-center pt-4rem text-18">
        {sessionRewards} / 4 <span className="font-bold text-amber-500 px-5">$BEE</span>
        rewards earned today!
      </div>
      <Table sessionIndex={sessionIndex} />
    </div>
  );
};

export default HomePage;
