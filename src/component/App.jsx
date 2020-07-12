import React from 'react'; //组件和其生命周期需要的包
import { HashRouter, Link, Route } from 'react-router-dom';
// 导入Home、Movie、About组基恩
import Home from './Home.jsx';
import Movie from './Movie.jsx';
import About from './About.jsx';
// 导入AntDesign日期选择组件，DataPicker
import { DatePicker } from 'antd';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //  1.当使用HashRouter把App组件的根组件div包裹起来后，网站就已经开始使用路由了
    // 表现为 网址变成了http://localhost:3000/#/ 多了#/
    // 2.在一个HashRouter里只能有一个根元素，里面已经以后根元素div,就不能再有其他直接子元素了
    return (
      <HashRouter>
        {/* 在一个HashRouter里只能有一个根元素，里面已经以后根元素div,就不能再有其他直接子元素了 */}
        <div>
          <h1>这是网站的App根组件</h1>
          <hr />
          <Link to="/home">首页</Link>&nbsp;
          {/* <Link to="/movie">电影</Link>&nbsp; */}
          {/* Route中匹配规则不变，Link链接中地址改造成下面这样，还是能匹配到组件Movie。原因是： */}
          <Link to="/movie/top250/10">电影</Link>&nbsp;
          <Link to="/about">关于</Link>
          <hr />
          {/* Route创建的标签，path表示路由地址，component表示路由地址对应的组件 */}
          {/* 在Vue中，有个router-view标签用来专门放置，匹配到的组件。但是在React中没有这样的标签，而是Route本身就占坑，相当于一个占位符。由此可知， Route有双重作用：1.它是一个路由匹配规则2.它是一个占位符，表示将来要匹配的组件，都放在这个位置*/}
          <Route path="/home" component={Home}></Route>
          <hr />
          {/* 默认情况下，路由中匹配规则是模糊匹配的，如果路由可以部分匹配成功，就可以展示对应的组件。为此，思考怎么能精确匹配呢？为了实现【精确匹配】模式，我们要为路由添加 exact属性,此时只能匹配/movie路径了。那么，为了匹配/movie/top250/10，可以为路由规则添加参数 */}
          <Route path="/movie/:type/:id" component={Movie} exact></Route>
          <hr />
          <Route path="/about" component={About}></Route>
          <hr />
          <DatePicker></DatePicker>
        </div>
      </HashRouter>
    );
  }
}
