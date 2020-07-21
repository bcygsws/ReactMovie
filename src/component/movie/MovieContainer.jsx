import React from 'react';
// 该组件里面涉及路由，需要先导入路由相关包
import { Route, Link, Switch } from 'react-router-dom';
// 导入布局需要的相关组件
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;
// 导入组件MovieList,三个路由页面的结构完全一样，可以共用MovieList,传入的参数不同，对应请求数据接口的地址也不同
import MovieList from './MovieList.jsx';
// 导入电影详情组件
import MovieDetail from './MovieDetail.jsx';
export default class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider width={200} className="site-layout-background">
                    {/* window.localtion.hash得到的是字符串  #/movie/in_theaters/1 ，用String的split方法转为数组*/}
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                        style={{ height: '100%', borderRight: 0 }}>
                        <Menu.Item key="in_theaters">
                            {/* 在控制台可以看到下面语句解析成了 <a href="#/movie/in_theaters/1"></a> */}
                            <Link to="/movie/in_theaters/1"> 正在热映 </Link>
                        </Menu.Item>
                        <Menu.Item key="coming_soon">
                            <Link to="/movie/coming_soon/1"> 即将上映 </Link>
                        </Menu.Item>
                        <Menu.Item key="top250">
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
                            height: '100%',
                        }}>
                        {/* 1.在匹配路由规则中，有两个路由参数
                                2.在MovieList组件中，可以通过props.match.params(在构造函数的state中)来获取路由参数，同理在组件其他地方，可以使用this.props.match.params 
                                3.注意：哪怕为路由用了精确匹配模式exact,【列表详情】和【列表页】都会被下面两条规则匹配上，我们需要使用路由中Switch组件(react-router-dom)能够指定，如果前面的路由规则优先匹配，则放弃匹配后面的路由*/}
                        <Switch>
                            {/*电影详情整个页面和电影列表一样，也是放置在content中，第一个路由只有1个参数id,第二个路由有两个参数type和page,且顺序不能换  */}
                            <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
                            <Route exact path="/movie/:type/:page" component={MovieList}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
