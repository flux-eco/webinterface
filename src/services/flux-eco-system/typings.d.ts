declare namespace API {
  type form = {
    formTitle: string;
    columns: formColumn[];
  };

  type listData = {
    mappings?: { title?: dataPointer; subtitle?: dataPointer; description?: dataPointer };
    actions?: action[];
  };

  type action = {
    title: string;
    actionType: 'backendAction' | 'frontendAction';
    rules: rule[];
    operation: string;
  };

  type rule = {
    propertyKey: string;
    condition: 'isEqual' | 'isNot' | 'isUndefined';
    value: 'string' | 'integer';
  };

  type table = {
    search: boolean;
    columns: tableColumn[];
    showForm?: form;
    createForm?: form;
    editForm?: form;
    itemActions?: any;
  };

  type tableColumn = {
    title: string | multiLanguageString;
    dataIndex: string;
    sorter: boolean;
    render?: Record<string, any>;
  };

  type multiLanguageString = {
    type: 'lngKey';
    /** e.g. pageTitle.myCoursesAsAdmin */
    key: string;
  };

  type sort = {
    key?: string;
    sortOrder?: string;
  };

  type formColumn = {
    title: string;
    dataIndex: string;
    valueType: string;
    width: string;
    formItemProps: { rules?: { required?: boolean; message?: string }[] };
  };

  type pageList = {
    data: pageMetadata[];
    /** total Pages */
    total: number;
    success: boolean;
  };

  type dataPointer = {
    dataIndex?: string;
  };

  type link = {
    title: string;
    url: string;
  };

  type tablePage = {
    pageMetadata: pageMetadata;
    table: table;
  };

  type listPage = {
    pageMetadata: pageMetadata;
    listData: listData;
  };

  type pageMetadata = {
    title: string | multiLanguageString;
    url: string;
    avatar: string;
    pageType: 'tablePage' | 'listPage' | 'stepsFormPage';
    projectionName: string;
  };

  type item = {
    data: any[];
    /** total Modules */
    total: number;
    success: boolean;
  };

  type itemList = {
    data: item[];
    /** total Modules */
    total: number;
    success: boolean;
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
