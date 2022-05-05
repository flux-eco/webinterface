import FluxProForm, {FluxProFormProps} from "@/components/FluxProForm";
import {useParams} from "react-router";
import {fetchFormPage, formPage} from "@/adapters/Page";
import {useEffect, useState} from "react";
import FluxProFormText from "@/components/FluxProFormText";
import FluxProFormRate from "@/components/FluxProFormRate";


export default () => {
  const params: any = useParams();
  const [pageMetadata, setPageMetadata] = useState<API.pageMetadata>();
  const [formInputItems, setFormInputItems] = useState<any[]>();

  const fetchPage = async () => {
    const page = await fetchFormPage(params.page)
    const columns = page.columns;
    let inputItems = [];
    columns.map(
      (column) => {
        if (column.valueType === "rate") {
          inputItems = inputItems.concat([<FluxProFormRate title={column.title} dataIndex={column.dataIndex}/>])
        }
        if (column.valueType === "text") {
          inputItems = inputItems.concat([<FluxProFormText title={column.title} dataIndex={column.dataIndex}/>])
        }
      },inputItems
    );
      setPageMetadata(pageMetadata)
      setFormInputItems(inputItems)
    }

  useEffect(() => {
    fetchPage();
  }, [])

  return (
    <>
      <FluxProForm pageMetadata={pageMetadata} columns={formInputItems}/>
    </>
  )
}
