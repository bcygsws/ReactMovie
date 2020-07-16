import React from 'react';
export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    // 注意问题：在this.state={params:props.match.params}来拿到路由参数会有问题，在切换正在热映 即将上映 和 top250三个路由时，需要手动刷新页面才能拿到路由数据。而在render生命周期钩子中可以直接拿到路由参数了，无需手动刷新页面
    this.state = {};
  }
  componentWillMount() {
    //   用老数据接口来测试发现，第一个.then拿不到数据，只是返回了一个promise,这个promise(response)调用.json()方法并返回，再次.then才能拿到数据
    fetch('http://www.liulongbin.top:3005/api/getimgcategory')
      .then((response) => {
        //当使用fetch API获取数据时，第一个.then中是拿不到数据的，而是拿到了一个promise对象，我们可以调用promise.json()再次返回一个promise
        console.log(response);
        return response.json();//返回一个新的promise
      })
      .then((result) => {
        console.log(result);
      });
  }
  render() {
    return (
      <div>
        <h1>
          这是MovieList组件---{this.props.match.params.type}---
          {this.props.match.params.page}
        </h1>
      </div>
    );
  }
}
// 获取数据的方式：
// 在react中，我们使用fetch API来获取数据，fetch API是基于promise封装的
