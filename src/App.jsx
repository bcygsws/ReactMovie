//这是项目的根组件-App组件
import React from 'react';
// 导入路由相关组件
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
// 导入Home Movie About子组件
import Home from './component/home/HomeContainer.jsx';
import Movie from './component/movie/MovieContainer.jsx';
import About from './component/about/AboutContainer.jsx';
// 导入需要的AntDesign组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
// 导入app.scss样式文件---两种方式：a.import ES6方式 b.common.js方式
// import styles from './css/app.scss';
require('./css/app.scss');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentWillMount() {
  //   // console.log(window);
  //   // console.log(window.location.hash);//#/about
  //   // 使用String的split方法，将字符串按指定分隔符，分割成数组
  //   console.log(window.location.hash.split('/')[1]);
  // }
  render() {
    return (
      <HashRouter>
        {/*  <h1>这是App根组件</h1> */}
        <Layout className="layout" style={{ height: '100%' }}>
          {/* 头部区域 */}
          <Header>
            <div className="logo"></div>
            {/* 默认会有一个问题：efaultSelectedKeys 值默认为1，但是当我们切换到/about路由后，刷新页面。页面重新挂载，会出现/about路由，然后选中的是 1，对应的【首页】按钮，出现了错误，为此我们需要使用window这个对象，从这个对象中拿到当前路由的地址，让defaultSelectedKeys为动态值，以使得路由地址和切换按钮匹配2.Item中的key值也需要更改 3.待解决问题？刷新页面后，默认选中的蓝色背景色看不到了？*/}
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[window.location.hash.split(' / ')[1]]}>
              <Menu.Item key="home">
                <Link to="/home">首页</Link>
              </Menu.Item>
              <Menu.Item key="movie">
                <Link to="/movie">电影</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">关于</Link>
              </Menu.Item>
            </Menu>
          </Header>
          {/* 内容区域 */}
          <Content style={{ backgroundColor: '#fff' }}>
            {/* <Redirect path="/" to="/home"></Redirect> */}
            <Route path="/home" component={Home}></Route>
            <Route path="/movie" component={Movie}></Route>
            <Route path="/about" component={About}></Route>
          </Content>
          {/* 底部区域 */}
          <Footer style={{ textAlign: 'center' }}>
            江湖夜雨©2020 Created by BaoChengyi
          </Footer>
        </Layout>
      </HashRouter>
    );
  }
}
