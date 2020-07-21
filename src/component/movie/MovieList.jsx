import React from 'react';
// 导入 【加载中】特效组件 Spin
import { Spin, Alert, Pagination } from 'antd';
// 导入fetch-jsonp，可以避开fetch请求时，出现的跨域问题。但是jsonp这种方式只适用于get请求
import fetchJSONP from 'fetch-jsonp';
// 导入电影显示区域组件MovieItem
import MovieItem from './MovieItem.jsx';
export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        // 注意问题：在this.state={params:props.match.params}来拿到路由参数会有问题，在切换正在热映 即将上映 和 top250三个路由时，需要手动刷新页面才能拿到路由数据。而在render生命周期钩子中可以直接拿到路由参数了，无需手动刷新页面
        this.state = {
            movies: [], //电影列表
            // nowPage:2, //当前所在的电影列表页码数
            nowPage: parseInt(props.match.params.page) || 1,
            pageSize: 12, //每一页显示多少条数据
            start: 0, //当前列表页条目开始的索引
            isLoading: true, //电影列表呈现前的加载特效，是否在加载？
            total: 0, //当前电影列表的总数量
            movieType: props.match.params.type, //保存当前获取电影的内存
        };
    }
    // 总结：React数据请求
    // 1.初始默认数据请求在组件将要开始挂载阶段，即componentWillMount阶段
    // 2.切换路由时，路由参数变化，会触发componentWillReceiveProps(nextProps)钩子
    // ajax等数据请求在这个生命周期开始请求
    componentWillMount() {
        //   用老数据接口来测试发现，第一个.then拿不到数据，只是返回了一个promise,这个promise(response)调用.json()方法并返回，再次.then才能拿到数据
        // fetch('http://www.liulongbin.top:3005/api/getimgcategory')
        //   .then((response) => {
        //     //当使用fetch API获取数据时，第一个.then中是拿不到数据的，而是拿到了一个promise对象，我们可以调用promise.json()再次返回一个promise
        //     console.log(response);
        //     return response.json();//返回一个新的promise
        //   })
        //   .then((result) => {
        //     console.log(result);
        //   });
        // 用定时器模拟数据接口请求后的过程，假设1s后数据请求完成
        // setTimeout(() => {
        //   this.setState({
        //     isLoading:false
        //   });
        // }, 1000);
        this.loadMovieListByTypeAndPage();
    }
    // 根据电影类型和页码获取数据
    loadMovieListByTypeAndPage = () => {
        // 请求不到数据，提示有跨域问题。为此，我们需要使用github上的第三方包
        // 注意：默认的window.fetch受到跨域限制，无法直接使用，这时候使用第三方包，fetch-jsonp发送jsonp请求，它的用法和浏览器内置的fetch完全兼容
        // fetch('http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a').then(response=>{
        //   return response.json();
        // }).then(result=>{
        //   console.log(result);
        // });
        // 1.适配不同类型的电影
        // const start = (this.state.nowPage - 1) * this.state.pageSize;
        // const url = `http://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`;
        // fetchJSONP(url)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result);
        //         // state值改变，要重新更新组件，将重新render函数
        //         this.setState({
        //             isLoading: false, //数据加载完成
        //             movies: result.subjects, //为电影列表重新赋值
        //             total: result.total, //电影列表中电影总条数
        //         });
        //     });

        // 为避免超过appkey的使用次数，可以将拿到的数据存放.json文件中，作为测试使用
        const data = require(`../test_data/${this.state.movieType}.json`);
        // 用定时器模拟请求数据接口的时间
        setTimeout(() => {
          this.setState({
            isLoading: false,
            movies: data.subjects,
            total: data.total,
          });
        }, 1000);
    };
    // 那么实现【即将上映】【Top250】路由切换时，props属性发生改变（原因是this.props.match.params可以拿到路由参数。推理：路由变化，props必定发生变化，就一定会执行componentWillReceiveProps生命周期函数）
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match.params);
        // 每当地址栏变化的时候，重置state中的参数项，重置完毕后，可以重新发起数据请求了
        this.setState(
            {
                isLoading: true, //又要重新加载数据了
                movieType: nextProps.match.params.type, //电影类型
                nowPage: parseInt(nextProps.match.params.page) || 1, //要来获取第几页的数据了
            },
            function () {
                this.loadMovieListByTypeAndPage();
            },
        );
    }
    render() {
        return (
            <div style={{ height: '100%', maxHeight: '735px', overflow: 'auto' }}>
                {/* <h1>
        这是MovieList组件---{this.props.match.params.type}---
        {this.props.match.params.page}
      </h1> */}
                {this.renderList()}
            </div>
        );
    }
    renderList = () => {
        if (this.state.isLoading) {
            //正在加载中，就放置 加载中组件
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
                <div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                        {this.state.movies.map(item => {
                            return (
                                <MovieItem
                                    {...item}
                                    key={item.id}
                                    history={this.props.history}></MovieItem>
                            );
                        })}
                    </div>
                    <Pagination
                        defaultCurrent={this.state.nowPage}
                        pageSize={this.state.pageSize}
                        total={this.state.total}
                        onChange={this.changePage}
                    />
                </div>
            );
        }
    };
    // 当页码改变的时候，加载新的页面数据
    changePage = page => {
        //page里面保存的就是当前点击的页码数
        // 方式一：使用BOM实现页面跳转
        // window.location.href = '/#/movie/' + this.state.movieType + '/' + page;
        // 方式二(推荐使用)：由于手动使用了BOM对象，实现跳转，这种方式并不好，我们采用 编程式导航
        console.log(this.props); //里面的history对象
        // 使用react-router-dom实现编程式导航 前进 history下的goForward(),后退goBack()，或者go(-1),go(正数前进或负数后退)
        /* 切换分页时，路由地址变化，路由地址变化，props属性变化，推理出要执行.loadMovieListByTypeAndPage()方法 */
        this.props.history.push('/movie/' + this.state.movieType + '/' + page);
    };
}
// 获取数据的方式：
// 在react中，我们使用fetch API来获取数据，fetch API是基于promise封装的
