
###  单组件优化
#### 事件绑定

> a. this.handleClick.bind(this)
> b. ( ) => this.handleClick( )
> c. this.handleClick = this.handleClick.bind(this) + this.handleClick

三种事件绑定的方法 效果一致 但是性能不同。
因为前两种每一次点击btn之后
=> 重新render
=> 重新绑定/重新生成一个全新的函数

对于写法b来说：
1==1是true，但是{a: 1}却不等于{a:1}（储存对象）
虽然长得一样，但是内存地址是完全不一样，等于说是每次都在重新生。
但是最后一种，只有在constructor一开始构建的时候绑定仅此一次，性能就此得以优化。

#### 传参

```
<Demo style = {{color: 'red'}} person = {{name: 'SKYE'}} other = {this.item}></Demo>
```

每一次render 这里的style obj和person obj
都是重新生成一次的 浪费内存
推荐以other的方式，直接定义在constructor里: this.item = {age: 16}
或者在render里使用const来定义  const item = {age: 16}

---

### 多组件优化
#### shouldComponentUpdate
判断nextProps和this.props的区别来手动规定是否要重新渲染子组件
当比较对象是obj的时候，本可以compareObj使出连环递归一层一层深究对比的
但是复杂度太高，还不如直接render掉。
所以就只shallow compare浅比较

#### pure component
#### immutable.js
