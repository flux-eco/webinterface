// @ts-ignore
/* eslint-disable */

declare namespace API {
  type TablePageDefinition = Record<string, any>;

  type TopicalArea = {
    id?: number;
    name?: string;
    image?: string;
    description?: string;
    color?: string;
    published?: boolean;
  };

  type TrainingSession = {
    id?: number;
    areaId?: number;
    name?: string;
    image?: string;
    description?: string;
    color?: string;
    published?: boolean;
  };

  type Item = Record<string, any>;

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
}
