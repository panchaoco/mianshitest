import React from 'react';
import { connect } from 'dva';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import ObserveDom from '@better-scroll/observe-dom'
import styles from './index.less';

BScroll.use(Pullup);
BScroll.use(ObserveDom);

// @ts-ignore
@connect(({ app }) => ({
  isPullUpLoad: app.isPullUpLoad
}))
export default class ScrollView extends React.PureComponent<ScrollViewProps, ScrollViewState> {
  private scroll;
  private isPullUpLoad: boolean = false;
  constructor(props: ScrollViewProps) {
    super(props);
    this.state = {
      el: null
    };
    this.scroll = null;
    this.isPullUpLoad = false;
  }

  public componentDidMount(): void {
    this.initScroll();
  }

  public componentWillReceiveProps(nextProps: Readonly<ScrollViewProps>, nextContext: any): void {
    if (this.scroll && this.scroll.finishPullUp && !nextProps.isPullUpLoad) {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }
  }

  public componentDidUpdate(prevProps: Readonly<ScrollViewProps>, prevState: Readonly<ScrollViewState>, snapshot?: any): void {

  }


  private initScroll = () => {
    setTimeout(() => {
      this.scroll = new BScroll(this.props.id ? `#${this.props.id}` : '#wrapper', this.props.options);
      if (this.props.options.pullUpLoad) {
        this.isPullUpLoad = true;
        this.scroll.on('pullingUp', () => {
          if (this.props.pullingUp) {
            this.props.pullingUp();
            this.isPullUpLoad = false;
          }
        })
      }
    }, 20)
  }

  public render() {
    return (
      <div className={`${styles.scrollWrapper} .wrapper`} id={this.props.id ? this.props.id : 'wrapper'} ref={(el) => {
      }}>
        {this.props.children}
      </div>
    )
  }
}

interface ScrollViewProps {
  isPullUpLoad?: boolean,
  options: {
    click?: boolean,
    scrollY?: boolean,
    scrollX?: boolean,
    observeDom?: boolean,
    pullUpLoad?: boolean | {[key: string]: any},
    [key: string]: any
  },
  className?: string,
  id?: string,
  pullingUp?: () => void,
  stop?: boolean
}

interface ScrollViewState {
  el: any;
}
