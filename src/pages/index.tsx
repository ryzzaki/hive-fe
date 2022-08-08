import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import ClockRenderer from '../components/clockRenderer';
import TabSlider from '../components/tabSlider';

const HomePage: NextPage = () => {
  // default value has to be at least 1 - otherwise the component bugs out probably due to SSR
  const [time, setTime] = useState(1);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [autostart, setAutostart] = useState(false);
  const [hasBeenPaused, setHasBeenPaused] = useState(false);

  const setPomoTimer = (isEven: boolean, triggerToast: boolean) => {
    if (triggerToast) {
      toast(isEven ? 'Pomo Time!' : 'Break Time!', { icon: isEven ? '🐝' : '💪' });
    }
    setTime(Date.now() + 1000 + (isEven ? 0.2 : 0.1) * 60 * 1000);
  };

  // set the time using useEffect to sync the timer client side
  useEffect(() => {
    const isEven = sessionIndex % 2 === 0;
    // there is a bug, gotta offset it with 1000ms
    setPomoTimer(isEven, false);
  }, []);

  const handleOnStart = () => {
    if (hasBeenPaused) {
      return;
    }
    // send http request
  };

  const handleOnComplete = () => {
    const incrementedSessionIndex = sessionIndex + 1 > 3 ? 0 : sessionIndex + 1;
    const isEven = incrementedSessionIndex % 2 === 0;
    // send http request if isEven
    setPomoTimer(isEven, true);
    if (!autostart) {
      setAutostart(true);
    }
    setSessionIndex(incrementedSessionIndex);
  };

  return (
    <div className="flex flex-col">
      <div>
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
          onPause={() => setHasBeenPaused(true)}
        />
      </div>
      <TabSlider index={sessionIndex} />
      <div className="flex justify-center items-center pt-4rem text-18">
        0 / 4 <span className="font-bold text-amber-500 px-5">$BEE</span>
        rewards earned today!
      </div>
    </div>
  );
};

export default HomePage;
