import {ProFormColumnsType} from "@ant-design/pro-form";


export function fromApiFormColumns(formColumns: API.formColumn[]): ProFormColumnsType[] {
  const columns: ProFormColumnsType[] = formColumns?.map?.((formColumn: API.formColumn) => {
      const column: ProFormColumnsType = {
        title: formColumn.title,
        dataIndex: formColumn.dataIndex,
        valueType:  formColumn.valueType,
        formItemProps: formColumn.formItemProps
      }
      return column
    }
  )
  return columns
}

