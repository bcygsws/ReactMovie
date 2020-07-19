import React from 'react';
// 该组件里面涉及路由，需要先导入路由相关包
import { HashRouter, Route, Link } from 'react-router-dom';
// 导入布局需要的相关组件
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;
// 导入组件MovieList,三个路由页面的结构完全一样，可以共用MovieList,传入的参数不同，对应请求数据接口的地址也不同
import MovieList from './MovieList.jsx';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Layout style={{ height: '100%' }}>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item key="1">
                <Link to="/movie/in_theaters/1"> 正在热映 </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/movie/coming_soon/1"> 即将上映 </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/movie/top250/1"> Top250 </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {/* 通过查看控制台代码，它的类样式名称为ant-layout background:#f0f2f5，为灰色，设置其padding-left后，其子容器为白色背景，这样就出现了一条灰色竖线*/}
          <Layout style={{ paddingLeft: '1px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 15,
                margin: 0,
                minHeight: 280,
                backgroundColor: '#fff',
                height:'100%'
              }}>
              
              {/* 在匹配路由规则中，有两个路由参数 */}
              <Route path="/movie/:type/:page" component={MovieList}>
                
              </Route>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}
