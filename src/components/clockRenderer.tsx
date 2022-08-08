import React from 'react';
import { zeroPad, CountdownRenderProps } from 'react-countdown';
import PlayIcon from '../assets/icons/play.svg';
import PauseIcon from '../assets/icons/pause.svg';

type ClockRendererProps = CountdownRenderProps;

const ClockRenderer: React.FC<ClockRendererProps> = ({ minutes, seconds, api }) => {
  const handleTimer = () => {
    if (api.isStopped()) {
      return api.start();
    }
    api.isPaused() ? api.start() : api.pause();
  };

  const isPausedOrStopped = () => {
    if (api.isStopped()) {
      return true;
    }
    return api.isPaused();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="flex text-32 font-bold">
        <div>{zeroPad(minutes)}</div>
        <div>:</div>
        <div>{zeroPad(seconds)}</div>
      </div>

      <button className="text-red-600 transform scale-200 pt-2rem" onClick={handleTimer}>
        {isPausedOrStopped() ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
};

export default ClockRenderer;
