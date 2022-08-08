import React from 'react';

type TabSliderProps = {
  index: number;
};

const TabSlider: React.FC<TabSliderProps> = ({ index }) => {
  const components = ['Pomo', 'Break', 'Pomo', 'Break'];
  const activeComponent = (session: string, index: number) => (
    <div key={index} className="underline decoration-wavy text-amber-500">
      {session}
    </div>
  );

  return (
    <div className="flex justify-center items-center pt-1rem space-x-1rem font-bold">
      {components.map((c, i) => (i === index ? activeComponent(c, i) : <div key={i}>{c}</div>))}
    </div>
  );
};

export default TabSlider;
