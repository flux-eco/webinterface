import React from 'react';
import {getPage} from "@/services/flux-eco-system/api";


export const fetchListPage = async (projectionName: string): Promise<API.listPage> => {
  return await getPage({projectionName: projectionName})
}
