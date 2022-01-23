declare namespace API {
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

  type TablePageDefinition = {
    title?: string;
    formCreate?: any[];
    formEdit?: any[];
    tableFilter?: any[];
    table?: any[];
  };

  type Item = {};

  type ProjectionList = {
    data?: any[];
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

  type Modules = {
    data?: Module[];
    /** total Modules */
    total?: number;
    success?: boolean;
  };

  type Module = {
    title?: string;
    description?: string;
    link?: string;
    imageUrl?: string;
  };

  type ErrorResponse = {
    /** 42 */
    errorCode: string;
    /** Error */
    errorMessage?: string;
    /** Success */
    success?: boolean;
  };

  type getProjectionListParams = {
    projectionName: string;
  };

  type getItemParams = {
    projectionName: string;
    id: number;
  };
}
