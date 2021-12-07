// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** list GET /api/v1/${param0}/list */
export async function getProjectionList(
  params: {
    // path
    projectionName: string;
    query?: string
  },
  options?: { [key: string]: any },
) {
  let { projectionName: param0, query: query, ...queryParams } = params;

  if (query == undefined)
    query = "";

  console.log(`/api/v1/${param0}/list${query}`)

  return request<API.ProjectionList>(`/api/v1/${param0}/list${query}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** show GET /api/v1/${param0}/item/${param1} */
export async function getItem(
  params: {
    // path
    projectionName: string;
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<API.Item>(`/api/v1/${param0}/item/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update all corresponding aggregateRoots POST /api/v1/${param0}/item/${param1}/update */
export async function updateItem(
  params: {
    // path
    projectionName: string;
    id: string;
  },
  body: API.Item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<any>(`/api/v1/${param0}/item/${param1}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** add POST /api/v1/${param0}/item/create */
export async function create(
  params: {
    // path
    projectionName: string;
  },
  body: API.Item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<any>(`/api/v1/${param0}/item/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove DELETE /api/v1/${param0}/item/${param1}/delete */
export async function deleteItem(
  params: {
    // path
    projectionName: string;
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<any>(`/api/v1/${param0}/item/${param1}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** list of Modules GET /api/v1/modulelist */
export async function getModuleList(options?: { [key: string]: any }) {
  return request<API.Modules>('/api/v1/modulelist', {
    method: 'GET',
    ...(options || {}),
  });
}

/** table page GET /api/v1/tablePageDefinition/${param0} */
export async function getTablePageDefinition(
  params: {
    // path
    projectionName: string;
  },
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.TablePageDefinition>(`/api/v1/tablePageDefinition/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** overview page GET /api/v1/editFormPageDefinition/${param0} */
export async function getEditFormPageDefinition(
  params: {
    // path
    projectionName: string;
  },
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.EditFormPageDefinition>(`/api/v1/editFormPageDefinition/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
