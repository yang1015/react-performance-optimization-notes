
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
直接使用is来代替复杂深层的compareObj(ob1, obj2)
immutable中不允许修改，只能新建
const map1 = Map({a:1, b:2});

immutable.js优点
1. 便于比较复杂数据，直接用is，方便定制shouldComponentUpdate
2. 并发安全，不用担心别人动你的数据
3. 减少内存
4. 降低项目复杂度
5. 时间旅行功能
6. 函数式编程

缺点
1. 库大 很多东西不需要（可选择seamless-immutable更小 api少）
2. 对现有项目入侵严重
本来cons里this.state = {} 全都要在外面包一层Map
在handleChange的时候，也得先去get("num")然后再+1
3. 学习成本

---

### reselect (Redux)
对于不能直接从store里获取渲染的
需要二次计算再输出的
可以利用reselect缓存的特性
在上次计算结果的基础上再计算
提高性能

Selector可以计算衍生的数据,可以让Redux做到存储尽可能少的state
Selector比较高效,只有在某个参数发生变化的时候才发生计算过程
Selector是可以组合的,他们可以作为输入,传递到其他的selector

参考：
https://segmentfault.com/a/1190000011936772
https://www.jianshu.com/p/6e38c66366cd

---


### 遍历key
性能差别会很大

定义key的时候不要使用index索引值
比如原数组[1, 2, 3]
如果setState之后变成了[a, 1, 2, 3]
key={index}的作用不过就是又从头开始计数了一遍而已
因为index总是从0开始的，于是索引全部发生了变化
react就认为这又是一波全新的数据了，重新生成元素并插入，无法优化

但是如果用的是val
那么第一次[1,2,3]的时候 三个data的key分别是1,2,3了
当update之后变成了[a,1,2,3] 此时1,2,3的key是没有变化的
只是新增了一个a所对应的key a而已，只会部分重新生成，而不会全部都重新生成元素了