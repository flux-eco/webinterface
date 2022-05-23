import {List} from "antd";
import ProList from "@ant-design/pro-list";
import {getItemList} from "@/services/flux-eco-system/api";

export type FluxListProps = {
  projectionName: string,
  projectionId: string|undefined,
  listProps: API.fluxListProps,
}

const FluxList = (
  props: FluxListProps
) => {

  const fetchItemList = async (): Promise<API.itemList> => {

    let filter = {};
    if(props.projectionId) {
      filter = {"projectionId": props.projectionId}
    }


    return await getItemList({
      projectionName: props.projectionName,
      fluxfilter: filter
    })
  }
       return <ProList<any>
          toolBarRender={() => {
            return [/*
        <Button key="add" type="primary">
          新建
        </Button>,*/
            ];
          }}
          rowKey="projectionId"

          tooltip=""
          request={(params, sort, filter) => {
            return Promise.resolve(
              fetchItemList()
            )
          }}
          showActions="hover"
          showExtra="hover"

          renderItem= {item => (
            <>
              <a href={item[props.listProps.mappings.link.dataIndex]} >
                <img src={item[props.listProps.mappings.image.dataIndex]} height={"200"} width={"600"}/>
                <List.Item.Meta
                  title={item[props.listProps.mappings.title.dataIndex]}
                  description={item[props.listProps.mappings.description.dataIndex]}
                />
              </a>
            </>
          )}
        />
};

export default FluxList;
