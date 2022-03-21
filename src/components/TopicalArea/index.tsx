import type { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import styles from './index.less';
import classNames from 'classnames';

interface IProps {
  ingredients?: string[];
  title?: string;
  color?: string;
  img?: string;
  instructions?: string;
}

interface IState {
}

export class TopicalArea extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  render() {
    console.log('props', this.props);
    return (
      <div className={classNames(styles.container, styles.rippleParent)}>
        <div className={classNames(styles.shadowWrap)}>

          <div className={classNames(styles.flap)} style={{backgroundColor: this.props.color}}></div>
          <img className={classNames(styles.info)} src="/icons/info.svg"/>
          <div className={classNames(styles.content)}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png"/>
            <h1>{this.props.title}</h1>
          </div>
        </div>
      </div>
    );
  }
}