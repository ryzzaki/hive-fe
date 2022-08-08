import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import ClockRenderer from '../components/clockRenderer';

const HomePage: NextPage = () => {
  // default value has to be at least 1 - otherwise the component bugs out probably due to SSR
  const [time, setTime] = useState(1);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [autostart, setAutostart] = useState(false);
  const [hasBeenPaused, setHasBeenPaused] = useState(false);

  // set the time using useEffect to sync the timer client side
  useEffect(() => {
    // there is a bug, gotta offset it with 1000ms
    setTime(Date.now() + 1000 + 25 * 60 * 1000);
  }, []);

  const handleOnStart = () => {
    if (hasBeenPaused) {
      return;
    }
    // send http request
  };

  const handleOnComplete = () => {
    // send http request
    setTime(Date.now() + 1000 + 9000);
    setAutostart(!autostart);
    setSessionIndex(sessionIndex + 1);
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
      <div className="flex justify-center items-center pt-4rem space-x-1rem">
        <div>Pomo</div>
        <div>Break</div>
        <div>Pomo</div>
        <div>Break</div>
      </div>
      <div className="flex justify-center items-center pt-4rem">0 / 4 $BEE rewards earned today!</div>
    </div>
  );
};

export default HomePage;
