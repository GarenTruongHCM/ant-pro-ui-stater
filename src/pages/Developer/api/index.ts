// @ts-ignore
/* eslint-disable */
import { postApi, getApi, deleteApi } from '@/utils/request';

export async function loadListApiKey(id: number) {
  const dataApi = await getApi(`/users/${id}/api-keys`);
  return dataApi;
}
export async function addListApiKey(id: number, body: any) {
  const dataApi = await postApi(`/users/${id}/api-keys`, body);
  return dataApi;
}
export async function deleteListApiKey(userId: number, id: number) {
  const dataApi = await deleteApi(`/users/${userId}/api-keys/${id}`);
  return dataApi;
}
