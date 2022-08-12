import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction ? 'https://heroku.com' : 'http://localhost:3000/api/v1/rewards/claim';

const completeSession = async (wallet: string) => {
  const res = await axios.post(url, {
    participant: wallet,
  });

  return res.data;
};

export default completeSession;
