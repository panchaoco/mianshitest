import React from 'react';
import { connect } from 'dva';
import {Action, Dispatch} from "redux";

import RecommendView from './components/Recommend';
import AppListView from './components/AppList';
import Scroll from '@/components/Scroll'
import { ListData } from '@/interface/app';
import styles from './index.less';


// @ts-ignore
@connect(({ app }) => ({
  appList: app.appList
}))
export default class AppIndexUI extends React.PureComponent<AppIndexProps, AppIndexState> {
  private ptr;
  public constructor(props: AppIndexProps) {
    super(props);
    this.state = {
      searchContent: '',
      query: {
        page: 1,
        page_size: 10,
      },
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [],
    }
    this.ptr = null;
  }

  componentDidMount(): void {
    this.getAppListData();
  }

  private getAppListData = () => {
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'app/getAppListData',
        payload: this.state.query
      });
    }
  }

  private handleSearch = () => {
    this.getAppListData();
  }

  private pullingUp = () => {
    return new Promise((resolve, reject) => {
      this.setState({
        query: Object.assign({}, this.state.query, {
          page: this.state.query.page + 1
        })
      }, () => {
        this.getAppListData();
      })
    })
  }

  public render() {
    return (
      <div className={styles.appWrapper}>
        <header className={styles.headerTop}>
          <input type="text" value={this.state.searchContent} onChange={this.handleSearch} placeholder={'搜搜App'}/>
        </header>
        <Scroll id={"listView"} pullingUp={this.pullingUp} options={{
          scrollY: true,
          pullUpLoad: true,
          observeDom: true
        }}>
          <section className={styles.bodyContent}>
            <RecommendView />
            <AppListView appList={this.props.appList}/>
          </section>
        </Scroll>
      </div>
    )
  }
}

interface AppIndexProps {
  dispatch?: Dispatch<Action>,
  appList?: ListData
}

interface AppIndexState {
  searchContent: string,
  query: {
    page: number,
    page_size: number
  },
  refreshing: boolean,
  down: boolean,
  height: number,
  data: any[],
}
