import React from 'react';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>这是电影组件</h1>
      </div>
    );
  }
}
