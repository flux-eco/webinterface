// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** list GET /api/v1/query/${param0}/getItemList/${param1} */
export async function getItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemListParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, parentId: param1, ...queryParams } = params;
  return request<API.itemList>(`/api/v1/query/${param0}/getItemList/${param1}`, {
    method: 'GET',
    params: {
      ...queryParams,
      fluxsort: undefined,
      ...queryParams['fluxsort'],
    },
    ...(options || {}),
  });
}

/** show GET /api/v1/query/${param0}/item/${param1}/getItem */
export async function getItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, projectionId: param1, ...queryParams } = params;
  return request<API.item>(`/api/v1/query/${param0}/item/${param1}/getItem`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update all corresponding aggregateRoots POST /api/v1/command/${param0}/item/${param1}/updateItem */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParams,
  body: API.postItem,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, projectionId: param1, ...queryParams } = params;
  return request<any>(`/api/v1/command/${param0}/item/${param1}/updateItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** update all corresponding aggregateRoots POST /api/v1/command/${param0}/registrationId/${param1}/storeForm */
export async function update_2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParams,
  body: API.item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, registrationId: param1, ...queryParams } = params;
  return request<any>(`/api/v1/command/${param0}/registrationId/${param1}/storeForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** add PUT /api/v1/command/${param0}/createItem */
export async function create(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createParams,
  body: API.item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<any>(`/api/v1/command/${param0}/createItem`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove DELETE /api/v1/command/${param0}/item/${param1}/deleteItem */
export async function deleteItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteItemParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, projectionId: param1, ...queryParams } = params;
  return request<any>(`/api/v1/command/${param0}/item/${param1}/deleteItem`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** list pages GET /api/v1/query/getPageList */
export async function getPageList(options?: { [key: string]: any }) {
  return request<API.pageList>('/api/v1/query/getPageList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/query/${param0}/getPage */
export async function getPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.tablePage | API.listPage | API.cardPage | API.htmlPage>(
    `/api/v1/query/${param0}/getPage`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/query/${param0}/getNextPage */
export async function getNextPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNextPageParams,
  options?: { [key: string]: any },
) {
  const { registrationId: param0, ...queryParams } = params;
  return request<API.processPage>(`/api/v1/query/${param0}/getNextPage`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
