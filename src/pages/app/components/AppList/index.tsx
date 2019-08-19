import React from 'react';
import { ListData, EntryData } from "@/interface/app";
import ReactLoading from 'react-loading';

import styles from './index.less';

export default class AppListView extends React.PureComponent<AppListViewProps, AppListViewState> {

  public constructor(props) {
    super(props);
  }

  public componentWillReceiveProps(nextProps: Readonly<AppListViewProps>, nextContext: any): void {

  }

  public render() {
    const appData = this.props.appData;
    return (
      <div className={styles.appList}>
        <ul>
          {
            appData ? appData.entry.map((item, index) => {
              const image = item["im:image"][2].label;
              const name = item["im:name"].label;
              const category = item.category.attributes.label;
              return (
                <li key={index.toString()}>
                  <strong>{index + 1}</strong>
                  <img src={image} alt=""/>
                  <div className={styles.info}>
                    <span>{name}</span>
                    <span>{category}</span>
                  </div>
                </li>
              )
            }) : <ReactLoading className={styles.loading} type={'bubbles'} color={'#4FBFFE'} height={400} width={200} />
          }
        </ul>
      </div>
    );
  }
}

interface AppListViewProps {
  appData?: ListData
}

interface AppListViewState extends ListData{
}
