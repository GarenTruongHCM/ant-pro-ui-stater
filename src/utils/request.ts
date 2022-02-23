// @ts-ignore
/* eslint-disable */
import { request, history } from 'umi';
import { message } from 'antd';

const { query } = history.location;
const { redirect } = query as { redirect: string };

const getHeaders = () => {
  const token: any = localStorage.getItem('token');
  const headers: any = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  return headers;
};
const errorHandler = (error: any, url: string, stringRedirect: string) => {
  console.log(`${url}`, error);
  history.push(`user/login${stringRedirect}`);
};
export async function getApi<T>(url: string, options: any | undefined = null) {
  const headers = getHeaders();
  const stringRedirect: string = redirect ? `?redirect=${redirect}` : '';

  // @ts-ignore
  return request<T>(`${API_URL}${url}`, {
    method: 'GET',
    headers: headers,
    ...(options || {}),
    errorHandler: (error) => {
      errorHandler(error, url, stringRedirect);
    },
  });
}

export async function postApi<T>(url: string, body: any | undefined = null) {
  const headers = getHeaders();
  const stringRedirect: string = redirect ? `?redirect=${redirect}` : '';

  // @ts-ignore
  const res = await request<T>(`${API_URL}${url}`, {
    method: 'POST',
    headers: headers,
    data: body,
    errorHandler: (error) => {
      errorHandler(error, url, stringRedirect);
    },
  });
  const cloneRes = res as any;
  if (!cloneRes?.errorCode) {
    message.success('Add successfully !!!');
  } else {
    message.error('Add error !!!');
  }
  return res;
}

export async function putApi<T>(url: string, body: any | undefined = null) {
  const headers = getHeaders();
  const stringRedirect: string = redirect ? `?redirect=${redirect}` : '';

  // @ts-ignore
  return request<T>(`${API_URL}${url}`, {
    method: 'PUT',
    headers: headers,
    data: body,
    errorHandler: (error) => {
      errorHandler(error, url, stringRedirect);
    },
  });
}

export async function deleteApi<T>(url: string, options: any | undefined = null) {
  const headers = getHeaders();
  const stringRedirect: string = redirect ? `?redirect=${redirect}` : '';

  // @ts-ignore
  const res = await request<T>(`${API_URL}${url}`, {
    method: 'DELETE',
    headers: headers,
    ...(options || {}),
    errorHandler: (error) => {
      errorHandler(error, url, stringRedirect);
    },
  });
  const cloneRes = res as any;
  if (!cloneRes?.errorCode) {
    message.success('Deleted successfully !!!');
  } else {
    message.error('Deleted error !!!');
  }
  return res;
}
