import React from 'react';
export default class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>
    <h1>电影列表：{this.props.title}</h1>
    </div>;
  }
}

