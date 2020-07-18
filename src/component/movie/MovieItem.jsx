import React from 'react';
// 导入CSS样式表
require('../../css/movie_item.scss');
export default class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="box">
        <img src={this.props.images.small} alt=""/>
        <h4>电影名称：{this.props.title}</h4>
        <h4>上映年份：{this.props.year}</h4>
        <h4>电影类型：{this.props.genres.join(',')}</h4>
      </div>
    );
  }
}
