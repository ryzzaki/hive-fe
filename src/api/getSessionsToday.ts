import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction
  ? 'https://hive-protocol.herokuapp.com/api/v1/rewards'
  : 'http://localhost:3000/api/v1/rewards';

const getSessionsToday = async (wallet: string) => {
  const res = await axios.get(`${url}/${wallet}/today`);

  return res.data;
};

export default getSessionsToday;
