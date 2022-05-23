import {Card, List} from "antd";

export type FluxCardsProps = {
  cards: API.card[]|undefined;
}

const FluxCards = (props: FluxCardsProps) => {

  const {Meta} = Card;

  const data = props.cards
  const actions = "";
  /*if(data.actions) {
    const actions = <FluxActions projectionId={card.title} actions={card.actions} />
  }*/

  /*if(cards) {
    cardItems = cards.map((card, index) => {
      let actions = undefined;

      return (
        <List.Item>
        <a href={card.link} >
        <Card
          style={{width: 150}}
          cover={<img src={card.image} alt=""/>}
        >
          <Meta
            title={card.title}
            description={card.description}
          />
          {actions}
        </Card>
        </a>
        </List.Item>
      )
    })
  }*/

  return (
    <>
      <List grid={{
        gutter: 32,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 6,
        xl: 6,
        xxl: 6,
      }}
             dataSource={data}
            size="small"
             renderItem={item => (

               <List.Item>
                 <a href={item.link}>
                   <Card cover={<img src={item.image} alt="" />} hoverable >

                     <Meta
                       title={item.title}
                       description={item.description}
                     />
                     {actions}
                   </Card>
                 </a>
               </List.Item>
             )}
      />
    </>
  );
};

export default FluxCards;
