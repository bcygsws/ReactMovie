import React from 'react';
// 导入布局需要的相关组件
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1">正在热映</Menu.Item>
            <Menu.Item key="2">即将上映</Menu.Item>
            <Menu.Item key="3">Top250</Menu.Item>
          </Menu>
        </Sider>
        {/* 通过查看控制台代码，它的类样式名称为ant-layout background:#f0f2f5，为灰色，设置其padding-left后，其子容器为白色背景，这样就出现了一条灰色竖线*/}
        <Layout style={{ paddingLeft: '1px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#fff',
            }}>
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
