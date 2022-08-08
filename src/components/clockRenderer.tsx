import React from 'react';
import { zeroPad, CountdownRenderProps } from 'react-countdown';
import PlayIcon from '../assets/icons/play.svg';
import PauseIcon from '../assets/icons/pause.svg';
import toast from 'react-hot-toast';

type ClockRendererProps = CountdownRenderProps;

const ClockRenderer: React.FC<ClockRendererProps> = ({ minutes, seconds, api }) => {
  const isPausedOrStopped = () => {
    if (api.isStopped()) {
      return true;
    }
    return api.isPaused();
  };

  const handleTimer = () => {
    const isPaused = isPausedOrStopped();
    isPaused ? api.start() : api.pause();
    toast(isPaused ? 'Pomo session has started!' : 'Session paused!', {
      icon: isPaused ? '🐝' : '💪',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto pt-4rem pb-2rem">
      <div className="flex text-70 font-bold">
        <div>{zeroPad(minutes)}</div>
        <div>:</div>
        <div>{zeroPad(seconds)}</div>
      </div>

      <button className="text-amber-500 transform scale-200 mt-2rem" onClick={handleTimer}>
        {isPausedOrStopped() ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
};

export default ClockRenderer;
