
import {getPage} from "@/services/flux-eco-system/api";
import {FluxProFormProps} from "@/components/FluxProForm";


export const fetchListPage = async (projectionName: string): Promise<API.listPage> => {
  return await getPage({projectionName: projectionName}) as API.listPage
}
export const fetchTablePage = async (projectionName: string): Promise<API.tablePage> => {
  return await getPage({projectionName: projectionName}) as API.tablePage
}




export const fetchFormPage = async (projectionName: string): Promise<FluxProFormProps> => {
  return {pageMetadata: {
      title: "demo",
      pageType: "stepsFormPage",
      projectionName: projectionName,
      url: "/formPage/demo",
      avatar: "/formPage/demo.png"
    }, columns: [
        {
          title: "Name",
          width: "m",
          dataIndex: "name",
          formItemProps: {},
          valueType: "text"
        },
      {
        title: "Vorname",
        width: "m",
        dataIndex: "firstName",
        formItemProps: {rules: [{required: true}]},
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
          title: "Wähle",
          width: "m",
          dataIndex: "choose",
          formItemProps: {},
          valueType: "checkbox"
        },
      ]
  }
}
