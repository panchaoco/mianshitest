import React from 'react';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import ObserveDom from '@better-scroll/observe-dom'
import styles from './index.less';

BScroll.use(Pullup);
BScroll.use(ObserveDom);

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

  }

  public componentWillReceiveProps(nextProps: Readonly<ScrollViewProps>, nextContext: any): void {
    if (this.isPullUpLoad) {
      this.isPullUpLoad = false;
    }
    this.scroll.finishPullUp();
  }

  private initScroll = (el) => {
    this.setState({
      el
    }, () => {
      this.scroll = new BScroll(this.props.id ? `#${this.props.id}` : '#wrapper', this.props.options);
      if (this.props.options.pullUpLoad) {
        if (!this.isPullUpLoad) {
          this.isPullUpLoad = true
          this.scroll.on('pullingUp', () => {
            if (this.props.pullingUp) {
              console.log('pullingUp')
              this.props.pullingUp();
            }
          })
        }
      }
    })
  }

  public render() {
    return (
      <div className={`${styles.scrollWrapper} .wrapper`} id={this.props.id ? this.props.id : 'wrapper'} ref={(el) => {
        this.initScroll(el)
      }}>
        {this.props.children}
      </div>
    )
  }
}

interface ScrollViewProps {
  options: {
    click?: boolean,
    scrollY?: boolean,
    scrollX?: boolean,
    observeDom?: boolean,
    pullUpLoad?: boolean,
    [key: string]: any
  },
  className?: string,
  id?: string,
  pullingUp?: () => void
}

interface ScrollViewState {
  el: any;
}
