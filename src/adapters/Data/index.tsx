import {getItem, getItemList, update, create} from "@/services/flux-eco-system/api";
import {message} from "antd";


export const fetchItemList = async (
  projectionName: string,
  parentId: string | undefined,
  offset: number | undefined,
  limit: number | undefined,
  sort: API.sort | undefined,
  search: string | undefined
): Promise<API.itemList> => {
  try {
    switch (parentId) {
      case undefined:
        return await getItemList({
          projectionName: projectionName,
          parentId: undefined,
          offset: offset,
          limit: limit,
          sort: sort,
          search: search
        })
      default:
        return await getItemList({
          projectionName: projectionName,
          parentId: parentId,
          offset: offset,
          limit: limit,
          sort: sort,
          search: search
        })
    }
  } catch (error) {
    console.error('Fetch Data failed ', error)
  }

  return {} as API.itemList
};


export const fetchItem = async (
  projectionName: string,
  projectionId: string
): Promise<API.item> => {
  try {
      return   await getItem({
        projectionName: projectionName,
        projectionId: projectionId
      })
  } catch (error) {
    console.error('Fetch Data failed ', error)
  }

  return {} as API.item
};

export const handleUpdate = async (
  projectionName: string,
  projectionId: string,
  properties: any
) => {
  try {
    const updateParameter = {projectionName, projectionId};
    await update(
      updateParameter, properties
    );
    return true;
  } catch (error) {
    message.error('Configuration failed, please try again!');
    return false;
  }
};

export const handleCreate = async (
  projectionName: string,
  properties: any
) => {
  try {
    const createParams = {projectionName};
    await create(
      createParams, properties
    );
    return true;
  } catch (error) {
    message.error('Configuration failed, please try again!');
    return false;
  }
};

