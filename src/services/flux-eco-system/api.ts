// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** list pages GET /api/v1/definition/getPages */
export async function getPages(options?: { [key: string]: any }) {
  return request<API.PageList>('/api/v1/definition/getPages', {
    method: 'GET',
    ...(options || {}),
  });
}

/** list GET /api/v1/data/${param0}/getList */
export async function getProjectionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectionListParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.ProjectionList>(`/api/v1/data/${param0}/getList`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** show GET /api/v1/data/${param0}/item/${param1}/getItem */
export async function getItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<API.Item>(`/api/v1/data/${param0}/item/${param1}/getItem`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** update all corresponding aggregateRoots POST /api/v1/data/${param0}/item/${param1}/updateItem */
export async function update(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateParams,
  body: API.Item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<any>(`/api/v1/data/${param0}/item/${param1}/updateItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** add PUT /api/v1/data/${param0}/createItem */
export async function create(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createParams,
  body: API.Item,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<any>(`/api/v1/data/${param0}/createItem`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** remove DELETE /api/v1/data/${param0}/item/${param1}/deleteItem${undefined} */
export async function deleteItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteItemParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, id: param1, ...queryParams } = params;
  return request<any>(`/api/v1/data/${param0}/item/${param1}/deleteItem${undefined}`, {
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

/** table page GET /api/v1/definition/${param0}/getTablePageDefinition */
export async function getTablePageDefinition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTablePageDefinitionParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.TablePageDefinition>(`/api/v1/definition/${param0}/getTablePageDefinition`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** overview page GET /api/v1/definition/${param0}/getEditFormDefinition */
export async function getEditFormPageDefinition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEditFormPageDefinitionParams,
  options?: { [key: string]: any },
) {
  const { projectionName: param0, ...queryParams } = params;
  return request<API.EditFormPageDefinition>(`/api/v1/definition/${param0}/getEditFormDefinition`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
