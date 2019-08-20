import React from 'react';
import { connect } from 'dva';
import { Action, Dispatch } from "redux";

import RecommendView from './components/Recommend';
import AppListView from './components/AppList';
import Scroll from '@/components/Scroll'
import { ListData } from '@/interface/app';
import styles from './index.less';

// @ts-ignore
@connect(({ app }) => ({
  appData: app.appData,
  loadingStatus: app.loadingStatus
}))
export default class AppIndexUI extends React.PureComponent<AppIndexProps, AppIndexState> {
  private timer: any;
  public constructor(props: AppIndexProps) {
    super(props);
    this.state = {
      searchContent: '',
      query: {
        page: 1,
        page_size: 10,
        search: ''
      },
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [],
      fn: function () {},
      listScroll: null
    }
  }

  componentDidMount(): void {
    this.getAppListData();
  }

  public componentWillReceiveProps(nextProps: Readonly<AppIndexProps>, nextContext: any): void {
    // this.state.fn();
  }

  private getAppListData = (search?: string) => {
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'app/getAppListData',
        payload: Object.assign({}, this.state.query, {
          search: search || this.state.query.search || ''
        })
      });
    }
  }

  private handleSearch = (e) => {
    const val = e.currentTarget.value;
    this.setState({
      searchContent: val,
      query: Object.assign({}, this.state.query, {
        search: val
      })
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getAppListData(val);
    }, 500)
  }

  private pullingUp = () => {
    if (this.props.appData && this.props.appData.entry.length >= this.props.appData.attributes.total) return;
    if (this.props.loadingStatus === 0) return;
    this.setState({
      query: Object.assign({}, this.state.query, {
        page: this.state.query.page + 1
      })
    }, () => {
      this.getAppListData();
    })
  }

  public render() {
    return (
      <div className={styles.appWrapper}>
        <header className={styles.headerTop}>
          <input type="text" defaultValue={this.state.searchContent} onChange={this.handleSearch} placeholder={'搜搜App'}/>
        </header>
        <Scroll className={styles.listView} options={{
          scrollY: true,
          pullUpLoad: true,
          click: true,
          stopPropagation: true,
          observeDom: true
        }} pullingUp={this.pullingUp} id={"listView"}>
          <RecommendView />
          <AppListView appData={this.props.appData} />
          <footer className={styles.pullFooter}>
            {
              this.props.loadingStatus === 0 && this.props.appData ? <div className={styles.loading}>
                加载中...
              </div> : null
            }
          </footer>
        </Scroll>
      </div>
    )
  }
}

interface AppIndexProps {
  dispatch?: Dispatch<Action>,
  appData?: ListData,
  loadingStatus?: number
}

interface AppIndexState {
  searchContent: string,
  query: {
    page: number,
    page_size: number,
    search: string
  },
  refreshing: boolean,
  down: boolean,
  height: number,
  data: any[],
  fn: () => void,
  listScroll: any,
}
