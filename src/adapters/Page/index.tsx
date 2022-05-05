
import {getPage} from "@/services/flux-eco-system/api";


export const fetchListPage = async (projectionName: string): Promise<API.listPage> => {
  return await getPage({projectionName: projectionName}) as API.listPage
}
export const fetchTablePage = async (projectionName: string): Promise<API.tablePage> => {
  return await getPage({projectionName: projectionName}) as API.tablePage
}


export type formPage = {
  pageMetadata: API.pageMetadata;
  form: API.form;
}

export const fetchFormPage = async (projectionName: string): Promise<formPage> => {
  return {pageMetadata: {
      title: "demo",
      pageType: "stepsFormPage",
      projectionName: projectionName,
      url: "/formPage/demo",
      avatar: "/formPage/demo.png"
    }, form: {
      formTitle: "demo",
      columns: [
        {
          title: "Name",
          width: "m",
          dataIndex: "name",
          formItemProps: {},
          valueType: "text"
        },
        {
          title: "Bewerte",
          width: "m",
          dataIndex: "rate",
          formItemProps: {},
          valueType: "rate"
        },
        {
          title: "Name",
          width: "m",
          dataIndex: "name",
          formItemProps: {},
          options: [
            {"key": 0, "label": "ddd"}
          ],
          valueType: "checkbox"
        },
      ]
    }
  }
}
