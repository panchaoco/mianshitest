import React from 'react';
import RecommendView from './components/Recommend'

export default class AppIndexUI extends React.PureComponent {
  public constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <RecommendView />
      </div>
    )
  }
}
