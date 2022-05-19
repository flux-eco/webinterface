import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Card} from "antd";
import FluxActions from "@/components/FluxActions";

export type FluxCardsProps = {
  projectionName: string;
  cardList: API.cardList|undefined;
}

const FluxCards = (props: FluxCardsProps) => {

  const {Meta} = Card;




  let cards = []
  if(props.cardList) {
    cards = props.cardList.cards?.map((card, index) => {

      let actions = undefined;
      if(card.actions) {
        const actions = <FluxActions projectionId={card.title} actions={card.actions} />
      }

      return <>
        <a href={card.link} >
        <Card
          style={{width: 300}}
          cover={<img src={card.image} alt=""/>}
        >
          <Meta
            title={card.title}
            description={card.description}
          />

          {actions}
        </Card>
        </a>
      </>
    })
  }


  return (
    <>
      {cards}
    </>
  );
};

export default FluxCards;
