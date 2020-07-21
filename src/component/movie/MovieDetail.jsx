import React from 'react';
// 返回按钮组件
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Spin, Alert } from 'antd';
// 避开跨域请求的fetch-jsonp
import fetchJsonp from 'fetch-jsonp';
// require commonjs方式引入样式文件
require('../../css/movie_detail.scss');
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: {}, isLoading: true };
    }
    // 请求数据
    componentWillMount() {
        let url = `http://api.douban.com/v2/movie/subject/${this.props.match.params.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        fetchJsonp(url)
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result);
                this.setState({
                    info: result, //是一个对象
                    isLoading: false, //数据请求完成了，加载中 组件完成使命，要开始渲染详情了
                });
            });
    }
    render() {
        return (
            <div>
                <Button type="primary" icon={<LeftOutlined />} onClick={this.backPage}>
                    返回电影列表页面
                </Button>
                {this.showInfo()}
            </div>
        );
    }
    backPage = () => {
        // console.log('ok');
        console.log(this);
        this.props.history.go(-1);
    };
    showInfo = () => {
        if (this.state.isLoading) {
            return (
                <Spin tip="Loading...">
                    <Alert
                        message="正在请求电影列表"
                        description="精彩内容，马上呈现！"
                        type="info"
                    />
                </Spin>
            );
        } else {
            return (
                <div className="detail_box">
                    <h1>{this.state.info.title}</h1>
                    <img src={this.state.info.images.large.replace('img9','img1')} alt="" />
                    <p>{this.state.info.summary}</p>
                </div>
            );
        }
    };
}
