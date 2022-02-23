// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function login(body: API_USER.LoginParams, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API_USER.LoginResult>(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    errorHandler: (error) => console.log(`login`, error),
    data: body,
    ...(options || {}),
  });
}
