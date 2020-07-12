//App组件
import React from 'react';
// 导入路由相关组件
import { HashRouter, Route, Link } from 'react-router-dom';
// 导入需要的AntDesign组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
// 导入app.scss样式文件
import styles from './css/app.scss';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        {/*  <h1>这是App根组件</h1> */}
        <Layout className="layout" style={{ height: '100%' }}>
          {/* 头部区域 */}
          <Header>
            <div className={styles.logo}/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">电影</Menu.Item>
              <Menu.Item key="3">关于</Menu.Item>
            </Menu>
          </Header>
          {/* 内容区域 */}
          <Content style={{ backgroundColor: '#fff' }}>123</Content>
          {/* 底部区域 */}
          <Footer style={{ textAlign: 'center' }}>
            江湖夜雨©2020 Created by BaoChengyi
          </Footer>
        </Layout>
      </HashRouter>
    );
  }
}
