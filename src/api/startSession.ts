import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction
  ? 'https://hive-protocol.herokuapp.com/api/v1/rewards/start'
  : 'http://localhost:3000/api/v1/rewards/start';

const startSession = async (wallet: string) => {
  const res = await axios.post(url, {
    participant: wallet,
  });

  return res.data;
};

export default startSession;
