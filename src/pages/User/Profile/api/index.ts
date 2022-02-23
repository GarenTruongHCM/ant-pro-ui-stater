// @ts-ignore
/* eslint-disable */
import { getApi } from '@/utils/request';

export async function userProfile() {
  return await getApi<API_USER.CurrentUser>('/users/me/profile', '');
}
