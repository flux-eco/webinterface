import FluxProForm from "@/components/FluxProForm";
import {useParams} from "react-router";
import {fetchFormPage, formPage} from "@/adapters/Page";
import {useEffect, useState} from "react";
import FluxProFormText from "@/components/FluxProFormText";

export default () => {
  const params: any = useParams();

  const [formInputItems, setFormInputItems] = useState<any>();

  const fetchPage = async () => {
    const page = await fetchFormPage(params.page)
    const columns = page.form.columns;

    console.log(columns)

      columns.forEach(
        (column) => {
          /*if (column.valueType === "rate") {
            let inputItems = [<FluxProFormRate formColumn={column}/>]
            setFormInputItems(inputItems)
          }*/

          if (column.valueType === "text") {
            let inputItems = [<FluxProFormText formColumn={column}/>]
            setFormInputItems(inputItems)
          }
        }
      )
    }

  useEffect(() => {
    fetchPage();
  }, [])

  const formkey = "dd"


  return (
    <>
      <FluxProForm formKey={formkey} formItems={formInputItems}/>
    </>
  )
}
