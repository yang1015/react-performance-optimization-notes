import React from 'react';

class MultipleComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            // person: {
            //     name: "skylar",
            //     age: 2
            // }
            age: {
                lastYear: 1,
                nextYear: 2
            }
        }
        this.btnStyle = {
            fontSize: 16,
            background: 'lightgreen'
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClickAge = this.handleClickAge.bind(this);
    }

    handleClick() {
        this.setState({
            num: this.state.num + 1
        });
        console.log("父组件点击button")
    }
    handleClickAge() {
        this.setState({
            age: {
                lastYear: this.state.age.lastYear, // 此时子组件不会re-render, +1后就会了
                nextYear: this.state.age.nextYear
            }
        });
        console.log("父组件修改年龄")
    }


    render() {
        console.log("父组件render")
        return (
            <div>
                <h2>num: {this.state.num} </h2>
                <button style={this.btnStyle} onClick={this.handleClick}>btn</button>
                <h2>age: {this.state.age.lastYear} </h2>
                <button style={this.btnStyle} onClick={this.handleClickAge}>change age</button>
                <Inside age={this.state.age.lastYear}/>
            </div>
        )
    }
}

/* 浅对比 shallow compare */
function compareObj(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false; // key的长度都不一样肯定是不同的obj

    for (let k in obj1){
        if (obj1[k] !== obj2[k]) return false;
    }
    return true;
}

class Inside extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (compareObj(nextProps, this.props)) return false;
        return true;
    }

    render() {
        console.log("子组件render")
        return <h3>今年{this.props.age}岁</h3>
    }
}

export default MultipleComponents;