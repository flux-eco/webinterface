import React from 'react';
import {getItemList} from "@/services/flux-eco-system/api";


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
