declare namespace API {
  type createForm = {
    rootObjectAggregateName?: string;
    options?: { dragable?: boolean; showDragHandler?: any };
    properties?: any[];
  };

  type editForm = {
    rootObjectAggregateName?: string;
    options?: { dragable?: boolean; showDragHandler?: any };
    properties?: any[];
  };

  type PageList = {
    data?: Page[];
    /** total Pages */
    total?: number;
    success?: boolean;
  };

  type Link = {
    title?: string;
    url?: string;
  };

  type PageDefinition = {
    title?: string;
    avatar?: string;
    pageType?: string;
    createForm?: createForm;
    editForm?: editForm;
    tableFilter?: any[];
    tableColums?: any[];
    itemActions?: any[];
  };

  type Item = {
    projectionId?: string;
  };

  type itemList = {
    data?: Item[];
    /** total Modules */
    total?: number;
    success?: boolean;
  };

  type schemaObjectApi = {
    apiDefinition?: string;
    channel?: string;
    operationType?: string;
    apiLink?: string;
  };

  type ListSource = {
    url?: string;
    offset?: number;
    limit?: number;
  };

  type ErrorResponse = {
    /** 42 */
    errorCode: string;
    /** Error */
    errorMessage?: string;
    /** Success */
    success?: boolean;
  };

  type getItemListParams = {
    projectionName: string;
    /** Query items by its parent */
    parentId?: string;
  };

  type getItemParams = {
    projectionName: string;
    projectionId: string;
  };

  type updateParams = {
    projectionName: string;
    projectionId: string;
  };

  type createParams = {
    projectionName: string;
  };

  type deleteItemParams = {
    projectionName: string;
    projectionId: string;
  };

  type getPageParams = {
    projectionName: string;
  };
}
