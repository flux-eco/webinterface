/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
/*
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
*/

// src/access.ts
import { InitialState } from 'umi';

export default function accessFactory(initialState: InitialState) {
  return {
    canRead: true,
  };
}
