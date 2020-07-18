import React from 'react';
// 导入 【加载中】特效组件 Spin
import { Spin, Alert } from 'antd';
// 导入fetch-jsonp
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
      pageSize: 14, //每一页显示多少条数据
      start: 0, //当前列表页条目开始的索引
      isLoading: true, //电影列表呈现前的加载特效，是否在加载？
      total: 0, //当前电影列表的总数量
      movieType: props.match.params.type, //保存当前获取电影的内存
    };
  }
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
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     // state值改变，要重新更新组件，将重新render函数
    //     this.setState({
    //       isLoading: false,//数据加载完成
    //       movies: result.subjects,//为电影列表重新赋值
    //       total: result.total,//电影列表中电影总条数
    //     });
    //   });

    // 为避免超过appkey的使用次数，可以将拿到的数据存放.json文件中，作为测试使用
    const data = require('../test_data/in_theaters.json');
    // 用定时器模拟请求数据接口的时间
    setTimeout(() => {
      this.setState({
        isLoading: false,
        movies: data.subjects,
        total: data.total,
      });
    }, 1000);
  };
  render() {
    return (
      <div style={{height:'100%'}}>
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
      return <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>{
      this.state.movies.map((item)=>{
        return <MovieItem {...item} key={item.id}></MovieItem>;
      })
      }</div>;
    }
  };
}
// 获取数据的方式：
// 在react中，我们使用fetch API来获取数据，fetch API是基于promise封装的
