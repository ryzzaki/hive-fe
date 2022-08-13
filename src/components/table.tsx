import React, { useContext, useEffect, useState } from 'react';
import getSessions from '../api/getSessions';
import WalletContext from '../utils/context/WalletContext';
import CalendarIcon from '../assets/icons/calendar.svg';
import TrendingIcon from '../assets/icons/trending.svg';

type TableProps = {
  sessionIndex: number;
};

const Table: React.FC<TableProps> = ({ sessionIndex }) => {
  const [sessions, setSessions] = useState<{ id: string; createdAt: string; updatedAt: string; amount: number }[]>([]);
  const { wallet } = useContext(WalletContext);

  useEffect(() => {
    if (wallet) {
      getSessions(wallet).then((data) => {
        setSessions(data);
      });
    }
  }, [sessionIndex, wallet]);

  return (
    <div className="mt-3rem py-2rem md:max-w-500">
      <div className="py-20 md:py-10 font-bold">Rewards Earned Already</div>
      <div className="flex justify-between pb-10">
        <div className="flex space-x-10">
          <CalendarIcon className="text-amber-500" />
          <span>Date</span>
        </div>
        <div className="flex space-x-10">
          <TrendingIcon className="text-amber-500" />
          <span>Rewards</span>
        </div>
      </div>
      <div className="text-gray-400">
        {sessions.length > 0 ? (
          sessions.map((s, i) => (
            <div key={i} className="flex space-x-1rem justify-between">
              <div>{new Date(s.createdAt).toISOString().split('T')[0]}</div>
              <div>{s.amount ?? 0} $BEE</div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-2rem">No rewards were earned yet!</div>
        )}
      </div>
    </div>
  );
};

export default Table;
