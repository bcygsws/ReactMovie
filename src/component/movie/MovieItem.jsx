import React from 'react';
// 导入CSS样式表
require('../../css/movie_item.scss');
// 导入评分控件
import { Rate } from 'antd';
export default class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="box" onClick={this.getDetail}>
                <img src={this.props.images.small} alt="" />
                {/*渲染数据来自其父组件MovieList的属性扩散{...item}，直接this.props.【键名称】来取值 */}
                <h4> 电影名称： {this.props.title}</h4> <h4> 上映年份： {this.props.year} </h4>
                <h4> 电影类型： {this.props.genres.join(',')} </h4>
                <Rate disabled allowHalf defaultValue={this.props.rating.average / 2} />
            </div>
        );
    }
    // 注意在MovieList中直接为MovieItem添加onClick事件无效，想到直接在定义子组件的最外层div添加点击事件
    getDetail = () => {
        // console.log('ok');
        // 在父组件MovieItem中，将history作为定义属性传过来，那么MovieItem也具有了history属性，里面有push方法
        console.log(this.props.history);
        // 从属性扩散{...item}中拿到数据，直接this.props.id即可
        console.log(this.props);
        // this.props.id从属性扩散中拿到值
        // this.props.history从自定义属性中拿到值
        this.props.history.push('/movie/detail/' + this.props.id);
    };
}
