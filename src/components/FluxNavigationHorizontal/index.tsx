import {Menu} from 'antd';

export type FluxNavigationHorizontalProps = {
  navigationNodes: [
    {
      title: string,
      key: string
      href: string
    }
  ]
}

const FluxNavigationHorizontal = (props: FluxNavigationHorizontalProps) => {
  const menuItems = props.navigationNodes.map((navigationNode) => {
      return (<Menu.Item key={navigationNode.key} onClick={() => {
        location.href = navigationNode.href
      }} >
        {navigationNode.title}
      </Menu.Item>)
    }
  )
  return (<Menu mode="horizontal">
    {menuItems}
  </Menu>)
};

export default FluxNavigationHorizontal;
