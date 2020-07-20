import React from 'react';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>这是电影详情组件---{this.props.match.params.id}</h1>
            </div>
        );
    }
}
