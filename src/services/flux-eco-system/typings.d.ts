declare namespace API {
  type FormCreate = {
    rootObjectAggregateName?: string;
    fields?: any[];
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
    formEdit?: any[];
  };

  type TablePageDefinition = {
    title?: string;
    formCreate?: FormCreate;
    formEdit?: any[];
    tableFilter?: any[];
    table?: any[];
  };

  type Item = {
    sequence?: number;
    rootObjectAggregateId?: string;
    rootObjectAggregateName?: string;
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
    subject: string;
  };

  type getItemParams = {
    subject: string;
    id: number;
  };

  type updateParams = {
    subject: string;
    id: number;
  };

  type createParams = {
    subject: string;
  };

  type deleteItemParams = {
    subject: string;
    id: number;
  };

  type getPageDefinitionParams = {
    subject: string;
  };

  type getTablePageDefinitionParams = {
    subject: string;
  };

  type getEditFormPageDefinitionParams = {
    subject: string;
  };
}
