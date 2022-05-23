declare namespace API {
  type form = {
    formTitle: { dataIndex?: string };
    sections?: { title?: string; formType?: 'schemaForm'; columns?: formColumn[] };
  };

  type cardList = {
    /** total Modules */
    total?: number;
    success?: boolean;
    data?: card[];
  };

  type card = {
    title: string;
    description?: string;
    link?: string;
    image?: string;
    color?: string;
    actions?: action[];
  };

  type fluxListProps = {
    mappings: {
      title?: dataPointer;
      subtitle?: dataPointer;
      description?: dataPointer;
      image?: dataPointer;
      link?: dataPointer;
    };
    actions: action[];
  };

  type action = {
    title: string;
    key: string;
    actionType: 'backendAction' | 'openForm' | 'createIliasCourse' | 'deleteItem' | 'link';
    icon?: 'open' | 'edit' | 'setting';
    rules?: rule[];
    operation: string;
    form?: form;
  };

  type rule = {
    propertyKey: string;
    condition: 'isEqual' | 'isNot' | 'isUndefined';
    value: 'string' | 'integer';
  };

  type table = {
    search: boolean;
    columns: tableColumn[];
    toolbarActions?: action[];
    itemActions?: action[];
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
    valueType:
      | 'text'
      | 'password'
      | 'money'
      | 'textarea'
      | 'option'
      | 'date'
      | 'dateWeek'
      | 'dateMonth'
      | 'dateQuarter'
      | 'dateYear'
      | 'dateRange'
      | 'dateTimeRange'
      | 'dateTime'
      | 'time'
      | 'timeRange'
      | 'select'
      | 'checkbox'
      | 'rate'
      | 'radio'
      | 'radioButton'
      | 'index'
      | 'indexBorder'
      | 'progress'
      | 'percent'
      | 'digit'
      | 'digitRange'
      | 'second'
      | 'code'
      | 'jsonCode'
      | 'avatar'
      | 'switch'
      | 'fromNow'
      | 'image'
      | 'cascader'
      | 'treeSelect'
      | 'color';
    width: 'sm' | 'md' | 'xl' | 'xs' | 'lg';
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

  type formPage = {
    pageMetadata: pageMetadata;
    form: form;
  };

  type tablePage = {
    pageMetadata: pageMetadata;
    table: table;
  };

  type listPage = {
    pageMetadata: pageMetadata;
    fluxListProps: fluxListProps;
  };

  type processPage = {
    pageMetadata: pageMetadata;
    processState: Record<string, any>;
  };

  type htmlPage = {
    pageMetadata: pageMetadata;
    html: string;
    steps?: step[];
  };

  type cardPage = {
    pageMetadata: pageMetadata;
    cardList: cardList;
  };

  type step = {
    title?: string;
    description?: string;
    key?: number;
  };

  type pageMetadata = {
    title: string;
    url: string;
    avatar: string;
    pageType: 'tablePage' | 'listPage' | 'htmlPage' | 'cardPage' | 'stepsFormPage';
    projectionName: string;
  };

  type postItem = true;

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

  type getCardListParams = {
    projectionName: string;
  };

  type getItemListParams = {
    projectionName: string;
    /** The number of items to skip before starting to collect the result set */
    fluxoffset?: number;
    /** The numbers of items to return */
    fluxlimit?: number;
    /** Sort key and direction */
    fluxsort?: sort;
    /** A search string */
    fluxsearch?: string;
    /** a filter object */
    fluxfilter?: Record<string, any>;
  };

  type getItemParams = {
    projectionName: string;
    projectionId: string;
  };

  type updateParams = {
    projectionName: string;
    projectionId: string;
    transactionId: string;
  };

  type updateParams = {
    projectionName: string;
    registrationId: number;
  };

  type createParams = {
    projectionName: string;
  };

  type deleteItemParams = {
    projectionName: string;
    projectionId: string;
  };

  type getPageParams = {
    pageName: string;
    transactionId?: string;
    parentId?: string;
    projectionId?: string;
    contentId?: string;
  };

  type getNextPageParams = {
    registrationId: number;
  };
}
