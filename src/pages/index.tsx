import React from 'react';
import * as styles from './index.less';
import { InputItem } from 'antd-mobile'

export default class AppIndexUI extends React.PureComponent {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <section className={styles.mainWrapper}>
        <header>
          <div className={styles.headerWrapper}>
            <input type="text" placeholder={'搜索App'}/>
          </div>
        </header>
      </section>
    )
  }
}
