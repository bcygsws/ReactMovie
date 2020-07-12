import React from 'react';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeParams: props.match.params,
    };
  }
  render() {
    console.log(this); //展开组件，为了获取路由Route中匹配的参数
    // 知识点：如果要获取路由路径中的参数，可以使用this.props.match.params这个对象中拿到。但是这样书写相当冗长，为此。我们可以在state中自定义一个属性，专门存储该参数值。state中直接props代替this.props了，所以要简单
    return (
      <div>
        <h2>这是电影组件</h2>
        <h3>
          Movie---{this.props.match.params.type}---{this.props.match.params.id}
          <hr/>
          Movie--{this.state.routeParams.type}---{this.state.routeParams.id}
        </h3>
      </div>
    );
  }
}
