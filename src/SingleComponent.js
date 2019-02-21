import React, {Component} from 'react';
import './App.css';

class SingleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
        this.handleClick = this.handleClick.bind(this);
        this.item = 16;
    }

    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {

        return (
            /* 3种事件绑定的方法 效果一致 但是性能不同
            * 因为前两种每一次点击btn之后 => 重新render => 重新绑定/重新生成一个全新的函数
            * 1==1是true 但是{a: 1}却不等于{a: 1} （储存对象）虽然长得一样，但是内存地址是完全不一样的，等于说是每次都在重新生成
            * 但是最后一种，只有在constructor一开始构建的时候绑定仅此一次 */
            <div className="App">
                <h1>num: {this.state.num} </h1>
                <button onClick={this.handleClick.bind(this)}>btn1</button>
                <button onClick={() => this.handleClick()}>btn2</button>
                {/* 推荐写法 */}
                <button onClick={this.handleClick}>btn3</button>

                {/* 每一次render 这里的style obj和person obj都是重新生成一次的 浪费内存
                    推荐直接定义在constructor里: this.item = {age: 16}
                    或者在render里使用const来定义  const item = {age: 16}
                 */}
                <Inside style = {{color: 'red'}} person = {{name: 'SKYE'}} other = {this.item}></Inside>
            </div>

            /*
            * 传参的时候，尽量先规定在render以外的地方，尽量避免
            * <h1 style = {{color: 'red'}} /> 这样的写法
            * 因为每次render，这里的style obj都要重新生成并传入一次*/
        );
    }
}

class Inside extends Component{
    render() {
        return (
            <div>
                <h1>hello, {this.props.person.name}</h1>
                <h2>今年{this.props.other}岁</h2>
            </div>

        )
    }
}
export default SingleComponent;
