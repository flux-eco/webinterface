declare namespace API {
  type createForm = {
    title?: string;
    rootObjectAggregateName?: string;
    options?: any;
    columns?: formColumn[];
  };

  type editForm = {
    title?: string;
    rootObjectAggregateName?: string;
    options?: any;
    columns?: formColumn[];
  };

  type listData = {
    mappings?: { title?: dataPointer; subtitle?: dataPointer; description?: dataPointer };
    actions?: action[];
  };

  type action = {
    title?: string;
    type?: 'backendAction' | 'frontendAction';
    operation?: string;
  };

  type table = {
    columns?: column[];
    createForm?: createForm;
    editForm?: editForm;
    itemActions?: any[];
  };

  type sort = {
    key?: string;
    sortOrder?: string;
  };

  type column = {
    title?: string;
    dataIndex?: string;
    sorter?: boolean;
    render?: Record<string, any>;
  };

  type formColumn = {
    title?: string;
    key?: string;
    dataIndex?: string;
    valueType?: string;
    width?: string;
    formItemProps?: { rules?: { required?: boolean; message?: string }[] };
  };

  type pageList = {
    data?: pageMetadata[];
    /** total Pages */
    total?: number;
    success?: boolean;
  };

  type dataPointer = {
    dataIndex?: string;
  };

  type link = {
    title?: string;
    url?: string;
  };

  type tablePage = {
    pageMetadata?: pageMetadata;
    table?: table;
  };

  type listPage = {
    pageMetadata?: pageMetadata;
    listData?: listData;
  };

  type pageMetadata = {
    title?: string;
    avatar?: string;
    pageType?: string;
    projectionName?: string;
  };

  type item = {
    projectionId?: string;
  };

  type itemList = {
    data?: item[];
    /** total Modules */
    total?: number;
    success?: boolean;
  };

  type errorResponse = {
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
    /** The number of items to skip before starting to collect the result set */
    offset?: number;
    /** The numbers of items to return */
    limit?: number;
    /** Sort key and direction */
    sort?: sort;
    /** A search string */
    search?: string;
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
