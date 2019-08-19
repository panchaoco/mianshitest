import React from 'react';
import { connect } from 'dva';
import { Action, Dispatch } from "redux";
import { ListView } from "antd-mobile";

import RecommendView from './components/Recommend';
import AppListView from './components/AppList';
import Scroll from '@/components/Scroll'
import { ListData } from '@/interface/app';
import styles from './index.less';


// @ts-ignore
@connect(({ app }) => ({
  appData: app.appData
}))
export default class AppIndexUI extends React.PureComponent<AppIndexProps, AppIndexState> {
  private ptr;
  private lv;
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
      fn: function () {}
    }
    this.ptr = null;
    this.lv = null;
  }

  componentDidMount(): void {
    this.getAppListData();
  }

  public componentWillReceiveProps(nextProps: Readonly<AppIndexProps>, nextContext: any): void {
    // this.state.fn();
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
    const appData = this.props.appData;
    if (!appData || !appData.entry) return <div></div>;
    let index = appData ? appData.entry.length - 1 : 0;
    const row = (rowData, sectionID, rowID) => {
      const image = rowData["im:image"][2].label;
      const name = rowData["im:name"].label;
      const category = rowData.category.attributes.label;

      return (
        <li key={index.toString()}>
          <strong>{index + 1}</strong>
          <img src={image} alt=""/>
          <div className={styles.info}>
            <span>{name}</span>
            <span>{category}</span>
          </div>
        </li>
      );
    };

    return (
      <div className={styles.appWrapper}>
        <header className={styles.headerTop}>
          <input type="text" value={this.state.searchContent} onChange={this.handleSearch} placeholder={'搜搜App'}/>
        </header>
        {/*<Scroll className={styles.listView} key={Math.random()} options={{*/}
        {/*  scrollY: true,*/}
        {/*  pullUpLoad: {*/}
        {/*    threshold: 30*/}
        {/*  },*/}
        {/*  stopPropagation: true,*/}
        {/*  observeDom: true*/}
        {/*}} pullingUp={this.pullingUp} stop={this.props.appData && this.props.appData.entry.length >= this.props.appData.attributes.total} id={"listView"}>*/}
        {/*  <section className={styles.bodyContent}>*/}
        {/*    <RecommendView />*/}
        {/*    <AppListView appData={this.props.appData} />*/}
        {/*  </section>*/}
        {/*</Scroll>*/}
        {
          this.props.appData ? <ListView
            ref={el => this.lv = el}
            dataSource={this.props.appData.entry}
            renderHeader={() => <RecommendView></RecommendView>}
            renderRow={row}
            style={{
              height: 600,
              overflow: 'auto',
            }}
            pageSize={4}
            onScroll={() => { console.log('scroll'); }}
            scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
          /> : null
        }
      </div>
    )
  }
}

interface AppIndexProps {
  dispatch?: Dispatch<Action>,
  appData?: ListData
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
  fn: () => void
}
