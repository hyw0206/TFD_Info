// pages/api/userId.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ouid } = req.query;

  if (typeof ouid !== 'string') {
    return res.status(400).json({ error: 'Invalid ouid parameter' });
  }
  try {
    const response = await axios.get('https://open.api.nexon.com/tfd/v1/user/basic', {
      params: { ouid },
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key':process.env.NEXT_PUBLIC_NEXON_API_KEY 
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
