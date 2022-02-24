declare namespace API {
  type FormCreate = {
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

  type Page = {
    title?: string;
    url?: string;
    avatar?: string;
  };

  type Link = {
    title?: string;
    url?: string;
  };

  type PageDefinition = {
    title?: string;
    avatar?: string;
    formCreate?: FormCreate;
    formEdit?: any;
  };

  type TablePageDefinition = {
    title?: string;
    formCreate?: FormCreate;
    formEdit?: any;
    tableFilter?: any[];
    table?: any[];
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

  type EditFormPageDefinition = array;

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

  type getTableParams = {
    projectionName: string;
  };

  type getEditFormPageDefinitionParams = {
    projectionName: string;
  };
}
