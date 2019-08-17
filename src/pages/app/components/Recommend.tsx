import React from 'react'
import { connect } from "dva";
import {Action, Dispatch} from "redux";

@connect()
export default class RecommendView extends React.PureComponent<RecommendViewProps> {
  public constructor(props) {
    super(props);
  }

  public componentDidMount(): void {
    console.log(this.props);
    this.props.dispatch({
      type: 'app/getRecommendData'
    })
  }

  public render() {
    return (
      <div></div>
    )
  }
}

interface RecommendViewProps {
  dispatch?: Dispatch<Action>
}
