// lib/session.ts

import { parse } from 'cookie';

export const getSession = (req: any) => {
  const cookies = parse(req.headers.cookie || '');
  return cookies['user_id'] || null; // Return session cookie value
};
