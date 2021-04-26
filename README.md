# 皛熊随记[小程序]

2.1 小程序代码编写规范
1.不能引起代码错误
2.遵循现在编程语言的大规范环境

2.2 flex容器消除item的块状特效

flex: flexible box    
        弹性盒子,弹性布局

flex两个概念:
       flex container: 弹性容器
       flex item: 弹性容器下面的子元素
       弹性布局: 对弹性容器下面的子元素布局

使用弹性盒子: display: flex   指定该容器为弹性盒子容器
几个块状的元素,放置在一个弹性盒子容器中,他们的块状元素就会消除

2.3 flex-direction 的应用
色块位于弹性盒子下的时候,块状属性 display: block 属性无效
实现纵向排列:
flex-direction: 设置flex-item 排布方向
column: 列 – 指定容器下面的子元素垂直排列
row: 行(默认值) – 指定容器下面的子元素水平排列

2.4 reverse 倒序排列

flex-direction: row-reverse 行方向倒序
                       column-reverse 列方向倒序
view 组件不能指定高度，默认是100%，高度需要自适应
revrese 不仅仅是本身产生颠倒现象，同时所有元素也会产生变化

2.5 justify-content 属性分析
       justify-content：方向对齐
flex-start，代表的是flex-item开始部分，即1、2、3的1的位置对齐
flex-end，代表的是flex-item结束部分，即1、2、3的3的位置对齐

center: 居中
space-between: 左边的元素靠左对齐,右边的元素靠右对齐,其他元素保持等距间隔(平均分布)
space-around: 所有元素等距分布</pre>

2.6 主轴和交叉轴

主轴和交叉轴取决于flex-direction的值，
当flex-direction:column; 主轴为垂直方向
当flex-direction:row; 主轴为水平方向

justify-content :设置子元素在主轴方向的对齐
align-items:设置子元素在交叉轴方向的对齐

2.7 baseline 与 stretch 使用

align-items: baseline – 基线(文字底线)对齐: 不能够保证子元素对齐,是参考第一个子元素中的文字底线对齐
align-items: stretch - 在子元素没有高度的情况下,让所有的子元素拉伸

2.8 flex-wrap与消除间距

如果一行所有子元素宽度之和大于屏幕宽度,没有设置换行,flex会让每个元素(在同一行)平均分配总宽度

flex-wrap:  换行
nowrap – 默认值,不换行,平均分配
wrap – 换行,存在flex换行间距(容器的高度大于换行之后的高度),解决方法,设置容器的高度为:  子元素高度 * 行数 
wrap- reverse: 颠倒


自定义组件
从小程序基础库版本 1.6.3 开始，小程序支持简洁的组件化编程。所有自定义组件相关特性都需要基础库版本 1.6.3 或更高。
开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。自定义组件在使用时与基础组件非常相似。


细节注意事项
一些需要注意的细节：

因为 WXML 节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。
自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用 usingComponents 字段）。
自定义组件和页面所在项目根目录名不能以“wx-”为前缀，否则会报错。
注意，是否在页面文件中使用 usingComponents 会使得页面的 this 对象的原型稍有差异，包括：
使用 usingComponents 页面的原型与不使用时不一致，即 Object.getPrototypeOf(this) 结果不同。
使用 usingComponents 时会多一些方法，如 selectComponent 。
出于性能考虑，使用 usingComponents 时， setData 内容不会被直接深复制，即 this.setData({ field: obj }) 后 this.data.field === obj 。（深复制会在这个值被组件间传递时发生。）
如果页面比较复杂，新增或删除 usingComponents 定义段时建议重新测试一下。


1.1定义，引用与使用组件

微信组件在使用组件的页面json中的"usingComponent"选项中声明组件名和文件路径
wxml中使用组件：
<组件名称></组件名称>

相对路径："../"表示返回上级
决定路径："/" 从根目录开始，表示根目录

2.2小程序尺寸单位与设计原则

小程序设计稿依据：
以iphone6为基准
宽度为750个物理像素，对应逻辑分辨率为375pt
高度为667 * 2 个物理像素，即1334个物理像素 对应逻辑分辨率为667pt
备注：物理像素的尺寸并不是真实物理尺寸，没有长度概念，指代的是像素点的个数（点是没有尺寸概念的）
px不会自适应，在所有屏幕上大小不变
rpx会根据屏幕自适应
以iphone6为基准的前提下(屏幕显示宽度为375pt)
在css中写px，和iphone6的pt 是1:1的关系，如375px对应了375pt
写rpx，则是2:1的关系，如750rpx对应了375pt

flex  rpx  解决了小程序布局和响应的痛点
pc端 生产力工具 涉及大量的交互  输入  响应式
移动端主要涉及浏览 显示数据

给文字设定指定字体: font-family:"PingFangSC-Thin" [注：苹果官方字体]

2.3 page样式的巧妙应用 

注意：小程序最外层有一个隐藏的<page>标签，可以加入整体样式，类似web的 *{}

组件能继承的全局样式: font, color
页面可以继承所有全局样式

2.4组件之间最好不要留有空白间距
文字上下都是有空白间距，(消除文字上下间距，即line-height大小等于font-size大小)

2.5固定宽度还是自适应
容器设置成display:flex，容器本身不会取消块状属性，容器里面的子元素取消块状属性。
容器宽度根据内容自适应： display:inline-flex。缺点（当组件宽度变化的时候，会有跳动效果）

2.6 组件事件与事件处理

组织事件与事件处理
绑定点击事件：（其中onLike为事例事件名称，自定义）
bind:tap="onLike"  （不阻止默认冒泡事件）
catch:tap="onLike"   （阻止默认冒泡事件）
在json文件中写事件：
onLike:function(event){
conso.log(event)
}


非冒泡事件 form  提交事件 input事件scroll-view 滚动事件 不是冒泡 其他都是冒泡事件


数据来源的三种途径

前端不仅需要显示样式还要显示数据  


数据绑定

js-wxml(数据绑定):组件内部使用的数据定义在data里面。在页面中引用js写的数据：{{变量名}}。

三元表达式

三元表达式与图片切换
{{like？count1:count2}}

可以用三元表达式，也可以在组件的属性里面应用三元表达式

组件开发时需要考虑的问题：
组件的封闭性、开发性、以及粒度

组件的properties属性详解

组件的封装性、开放性及粒度
组件开放的数据，写在properties里面，
properties:{
  变量名：{
   type:Number/Boolen/String/Object/Array/null,   //(必须写)
   value:默认值，
   observer:function(){}
}
}
属性绑定：{{}}

1.看待组件的两种观点(重要)

开发者可以将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；
也可以将复杂的页面拆分成多个低耦合的模块，有助于代码维护。

组件作用：
1. 复用，并适当的修改；
2. 代码拆分


2.Blink API介绍与测试API

服务器-&gt;js-&gt;wxml(主要数据来源)
如何从服务器加载数据：
1.区分http动词
GET:查询数据
POST:提交数据
PUT:更新数据

400     请求包含不支持参数    BAD REQUEST
401     未授权         UNAUTHORIZED
403     被禁止访问   FORBIDDEN
404     资源部存在   NOT FOUND
413     上传文件太大       REQUIRED LENGTH TOO LARGE
500     内部错误       INTERNAL SERVER ERROR



3.生命周期函数

官方文档：https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

onLoad：页面加载（vue created，可以向服务器请求数据）
onReady：页面初次渲染完成（vue mounted 已挂载 == 已渲染）
onShow：页面被显示，包括首次加载和从后台切换回前台
onHide：页面被隐藏（从前台切换到后台，可做一些数据清理和缓存）
onUnload：页面被卸载（vue destroyed）

onPullDownRefresh：下拉刷新
onReachBottom：页面触底是触发
onShareAppMessage：页面被分享
onPageScroll：页面滚动
onResize：页面尺寸变化
onTabItemTap：tab标签被点击

4.wx.request-4xx状态码并不会执行fail

只要服务器返回了结果，都会走success，只有断网情况才会走fail

5.访问API获取数据

微信获取API调用的方法：
xw.request({
     url:"",
     methor:"get/post",
     header:{
     "":....
     }
})


6.同步、异步与回调函数

小程序的wx.request只有异步。获取异步的数据
同时异步调用，无法直接获取调用结果。通过success回调函数，获取调用结果，同时success:function(res)中的参数res:服务器返回的结果。
异步编程:性能比较好，代码维护成本高
同步编程:性能稍微差

7. ES6箭头函数与this指向

在回调函数里面由于当前函数的作用域发生了改变所以，this的指代是不明确的
1、解决方法1，回调函数外部定义: let that = this
2、解决方法2，使用ES6标准箭头函数,  例如success: (res)=&gt;{}

this 在 回调函数中指向null  可以在回调函数外面 用  let that = this 保留 this的状态   或者箭头函数进行绑定

8.正确理解Promise

1、解决回调地狱现象， 即多层嵌套的回调，如果只有一个异步，没有用promise的必要
2、回调函数剥夺了return能力，promise可以解决

9. ES6 const变量

ES6中const 定义的常量是根据内存地址是否被改变来判断常量是否被修改了，如果const定义的变量是一个对象，改变对象属性是不会被认为定义的常量被修改了的
将API的地址等配置信息保存到config.js中

10.ES6 Module export 与 import

class HTTP{}定义一个类(es6) 
给类添加方法class HTTP{
   方法名(params){
      方法体
}
}
es6中一个js文件就是一个模块
1、export const config={}  输出模块
     export let fun1=function(){}
2、export{config，fun1}
导入模块：import {config} from '/config.js'    输出模块

11.HTTP类的封装 与 ES6 的startsWith

ES6 startsWith/endsWith判断字符串以什么开头/结尾
str.startWidth('1')   
str.endWidth('1')

12.分析问题的思维培养与练习

thirdScriptError第三方脚本错误，自己写的代码出现错误就会报这个错误
控制台Sources 两个文件 一个带SM 在SM里面打断点  ,不带SM的文件是被小程序翻译后的文件
不能直接使用一个类下面的实例方法，必须先实例化一个类
let http=new HTTP()



13.分析问题的思维培养与练习二

小程序中如果使用 ES6 语法的 export、import 只能使用相对路径，require 可以会用绝对路径

14.回调函数传递

http 中封装的方法中 success回调函数中执行params.success(res)，可以将请求到的数据返回给page页面打印出来

15.通用错误异常处理(重要)

错误信息处理：
1、对于异常的处理，除了使用http状态码之外，还要自定义错误码，明确错误；
2、除了http状态码返回500服务器访问失败之外，都算作服务器有响应；
3、除了200码和300码之外，算作服务器异常

注：错误异常处理，fail回调函数里面是API调用失败，else里面是服务器异常

1.什么是"剥夺函数return的能力"

获取异步数据
    1， 用回调函数当做参数传进去
    2， promise 写法 = 一个变量
    不能直接用回调函数的写法那样 = 赋值给一个变量
    那是同步方法的获取方式
    这么说来promise是同步方法，里面才是异步的？

在一个新类的定义中使用旧类有两种途径：
1、导入，然后实例化一个旧类
2、导入，然后新类选择继承旧类
注：两者使用旧类的方式有所不同

2.组件属性赋值与页面渲染流程解析

页面渲染流程
1、JS通过API从服务器获取数据
2、通过this.setData()，再将数据传递给页面
3、可以直接将数据渲染到页面，或者通过对组件的属性设置将数据传递给组件，再由组件渲染到页面

注：组件的Properties 是可以从外部访问，而data是私有的不能从外部访问


3.setData的误区

this.setData({})误区，作用：数据更新(必须通过setData)
1、页面中使用的数据，是由js中的data决定的，组件中的wxml使用的数据是由properties和data决定的。
2、小技巧，setData更新的数据，可以把相应的变量先添加到data中，然后setData更新数据。

4.movie组件的实现

来源于服务器的是外部数据，放在properties里面，内部数据放在data里面

文字的自动换行
1、让文字到达一定长度后自动换行，最简单方法就是设置文字所在容器的width
2、但如果同时想保留容器的自适应，那就使用max-width

注意：max-width的作用是当文字长度没有max-width宽时使用文字正常产生的宽度，以此可以使得该文本标签居中，当超过时，自动换行依然可以居中

5.再谈组件的粒度

组件只负责自己的业务逻辑(比如:like组件只负责图片切换点赞的+1 -1)
把请求写在组件外面可以保证组件的通用性
组件的独立逻辑需要写在组件的使用方比如 Page1 Page2 Page3
*业务逻辑到底是写在组件内 还是写在组件的使用方,这就是组件的 粒度

组件粒度控制的原则
组件只负责比较通用的业务逻辑
不同的业务场景，执行自己特定的业务逻辑



6.自定义事件的激活与监听

小程序中，页面和组件的通讯，可以通过在组件中激活一个自定义事件来实现。

具体实现如下：
 1、在组件js中，
激活一个自定义事件 this.triggerEvent("", { }, {}) 

其中，第一个参数是自定义事件名，第二个参数是组件中要传递的数据，第三个参数一般不使用。

2、在页面wxml里，
在组件上添加监听自定义事件，通过回调函数传递的event.detail可以获取组件传递的数据。

Vue子传父:
this.$emit("like","要传的值")
父组件自定义一个方法,$emit触发父组件的自定义方法,然后通过函数传参数的形式去接受参数

7.喜欢还是不喜欢 组件编写

自定义事件的激活与监听
激活：this.triggerEvent('自定义事件名称',{自定义事件属性},{})
监听：bind:自定义事件名称="执行的函数"


注：利用 逻辑判断 &&，如果前者为假，则后边的不会执行

8.组件的生命周期函数

组件生命周期函数：
1. created(不能调用setData)
2. attached
3. ready
4. moved
5. detached

官网参考案例：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html

9.组件的data与properties的“奇怪现象”

data里面赋值，给一个初始值初始化。
小程序里面，properties对象和data对象合并成一个对象处理，
 properties里面的值和data里面的值不要重名。

10.observer 函数的应用

observer:function(newVal,oldVal,changPath){}

函数，用于监听properties和data的变化

属性值的改变情况可以使用 observer 来监听。目前，在新版本基础库中不推荐使用这个字段，而是使用 Component 构造器的 observers 字段代替，它更加强大且性能更好。

11.千万不要在observer中修改自身属性

1、在observer中使用了setData更新index属性值，而observer就是监听属性变化了，所以就造成了，更新-->变化-->监听的无限循环
2、千万不要在属性的observer方法中修改自身的值，否则会发生递归调用

1.navi组件与移动端触控区域探讨

在移动端，有时候我们用手指点击一个按钮，必须手指完完全全的放到按钮的边界内点击才可以触碰；很是麻烦，所以为了提高用户的体验，有时候触碰区域通常比我们实际的按钮要大一点。（这点不同于网页开发，因为在网页中鼠标的点击是非常精确的，而移动端由于手指等因素，往往没那么灵活）

2.navi组件与flex宽度陷阱

如果小程序的布局有了困惑，那么可以在调试面板下的Wxml中查看一下。没有给宽度的话，这个宽度就是自适应的。让其充满整个屏幕的是widrh:100%
如果设计之初就希望某些元素就应该设置成指定宽度，那么一开始就如此设置比如这里的header组件，和classic的最外面的容器container

3.禁用事件的技巧

子组件给父组件传值,通过 this.triggerEvent("left",{},{})来触发父组件的事件



关于命名（class类名、事件名等）的一点探讨
在组件中，用方位之类的来命名，可以清晰展示布局
在页面中，用具有实际意义的命名来代替，方便维护

4.music 组件的 初步实现

music 基本布局代码
<view class="container">
<image class="classic-img" src="{{img}}"></image>
<image class="plager-img" src="{{playSrc}}"></image>
<image class="tag" src="images/music@tag.png" />
<text class="content">{{content}}</text>
</view>


实现基本页面布局，【properites】属性内容与movic 组件大致相同

5.初识组件的Behavior行为

behavior实现 js代码的继承及复用（属性、方法、生命周期、多继承

注意：使用behavior后原组件类的其他属性不能删除，里面被替代的内容可以删除，比如这里如果删除properties：{} 虽然不会报错，但是数据会无法加载


6.behavior 继承与多继承的覆盖规则（重要）

Behavior 引入后如果出现内部多个引入成员同名或者与组件内的属性、data、方法同名，则：
behavior 类似继承 组件内部的优先。
如果引用多个后面的覆盖前面的，对于method和data也是一样。
注意！生命周期函数比如 attached 不会相互覆盖而是会依次执行，注意！！最后会执行组件内的生命周期函数

7.初步实现期刊切换

    获取上一期的数据信息，类似获取最新一期数据，但是需传入index【当前期数】
    getPrevious(index,sCoadBack){
       this.request({
         url:"classic/" + index + "/previous",
         success:(res)=>{
           sCoadBack(res);
         }
       })
    }


点击切换期刊数
 /**
   * 监听navi组件向右切换动作
   */
  onPrevious:function(){
    let index = this.data.classicData.index;
    classicModel.getPrevious(index,(res)=>{
      this.setData({
        classicData:res
      })
    })
  },


8.是否为最新期刊的逻辑判断

利用缓存的方法对最新一期进行保存
  /**
   * 设置期刊缓存
   * @param {*} index 当前期刊
   */
  _setLasterIndex(index) {
    wx.setStorageSync('laster', index)
  }


获取当前的期刊数【index】进行判断
/**
   * 判断是否为最新一期
   * @param {*} index  当前期刊
   */
  isLaster(index) {
    let lasterIndex = this._getLasterIndex();
    return lasterIndex == index ? false : true;
  }


9.使用Storage保存最新期刊号

wx.setStorageSync(key, value)  同步写入小程序缓存 （ 数据量较少的情况下使用 ）
wx.setStorage(key, value)  异步写入小程序缓存
wx.getStorageSync(key)  读取缓存中的数据

注：为什么要封装成私有函数？
- 增加代码的可读性，别人不需要知道里面的细节，函数名字就是很好地注释

10.onNext与函数重构技巧

将复用代码整理整合获得
/**
 * 设置当前期刊信息
 * @param {*} direction 点击方向 
 */
  _setClassic:function(direction){
    let index = this.data.classicData.index;
    classicModel.getClassic(index,direction,(res)=>{
      this.setData({
        classicData:res,
        first:classicModel.isFirst(res.index),
        latest:classicModel.isLaster(res.index)
      })
    })
  },


/model/classic.js
/**
 * 获取期刊信息
 * @param {*} index 当前期刊index
 * @param {*} isPrevious 点击方向
 * @param {*} sCoadBack 回调函数
 */
  getClassic(index,isPrevious, sCoadBack) {
    this.request({
      url: "classic/" + index + (isPrevious.toString()=="previous"?"/previous":"/next"),
      success: (res) => {
        sCoadBack(res);
      }
    })
  }
  
  1.谈谈缓存对于改善用户体验的作用

判断获取页面数据是从API调用还是从缓存中获取，缓存数据加载速度更加快速并且无网络调用，节约服务器的流量使用

数据页面获取代码

let classicKey = isPrevious == "next" ? this._getkey(index + 1) : this._getkey(index - 1);
    //获取缓存
    let classics = wx.getStorageSync(classicKey);
    //无缓存，调用api并设置缓存
    if (!classics) {
      this.request({
        url: "classic/" + index + "/" + isPrevious,
        success: (res) => {
          sCoadBack(res);
          wx.setStorageSync(classicKey, res);
        }
      })     
    } else {
      //存在缓存信息即回调
       sCoadBack(classics)
    }



2.解决缓存带来的问题

考虑【like】组件时，应该是实时获取api数据，并不是直接从缓存中获取，以及仔细查看文档信息，了解到API数据中存在相应对应调用方法，使用实时获取调用的方法获得。

3.ES6模板字符串和扩展运算符的应用

模板字符串用法：
let a=123
console.log('a123')
如上，如果我们要引用字符串a的话，不能这样写，否则JS会认为a是一个单纯的字符串，而不是变量。
要使用模板字符串：
（1）将单引号变为反引号；
（2）如果a是变量，那么要写成${a}

扩展运算符的作用:
把classic.res 改成 ...res
classic对象里的数据平铺出来了,wxml可以直接{{index}}调用.</pre>

4.独立更新like组件状态

重新调用API
GET     classic/<int:type>/<int:id>/favor


API调用代码
  /**
   * like组件调用获取数据
   * @param {*} artId id名称
   * @param {*} category type方式
   * @param {*} sCallBack 回调参数
   */
  getClassicLikeStatus(artId,category,sCallBack){
    let url = `classic/${category}/${artId}/favor`;
    this.request({
      url:url,
      success:sCallBack
    })
  }


xhtml代码编写
<v-likes class="like-model" bind:like="onLike" count="{{likeCount}}" isLike="{{likeState}}"></v-likes>


因为like组件是因为单独获取的数据，并不是和获取【最新一期】同时获取，每次点击切换实时获取点赞数据

5.如何让自定义组件支持hidden？

WX:if VS hidden
因为wx:if 之中的模板也可能包含数据绑定，所以当Wx:if 的条件值切换时， 框架有-个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。
同时wx:if 也是惰性的，如果在初始渲染条件为false ，框架什么也不做，在条件第-次变成真的时候才开始局部渲染。
相比之下，hidden 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。
一般来说，wx:if 有更高的切换消耗而hidden 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用hidden 更好， 如果在运行时条
件不大可能改变则wx:if 较好。

6.@import在组件间复用样式

wxss复用小技巧(共用的css样式写在common.wxss里)
@import "../common.wxss"

7.music组件样式

/* components/classic/music/index.wxss */
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classic-img{
  width: 422rpx;
  height: 422rpx;
  margin-top: 60rpx;
  border-radius: 50%;
}

.player-img{
  width: 120rpx;
  height: 120rpx;
  position: relative;
  bottom: 270rpx;
}

.tag{
  width: 44rpx;
  height: 128rpx;
  position: relative;
  bottom: 160rpx;
  right: 310rpx;
}

.content{
  font-size: 36rpx;
  max-width: 550rpx;
}

.rotation{
  /* -webkit-transform: rotate(360deg); */
  animation: rotation 12s linear infinite;
  -moz-animation: rotation 12s linear infinite;
  -webkit-animation: rotation 12s linear infinite;
  -o-animation: rotation 12s linear infinite backwards;
  -webkit-animation-play-state: running;
}
.rotation-stop{
  -webkit-animation-play-state: paused;
}
@-webkit-keyframes rotation {
  from{
    -webkit-transform: rotate(0deg);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
}




8 新版音乐播放对象

使用最新的音乐播放对象，监听页面背景音乐
wx.getBackgroundAudioManager()

获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态。

API链接：https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html

9 组件间通信

组件间的基本通信方式有以下几种。
WXML数据绑定:用于父组件向子组件的指定属性设置数据，仅能设置JSON兼容数据(自基础库版本2.0.9开始，还可以在数据中包含函数)。具体在组件模版和样式章节中介绍。
事件:用于子组件向父组件传递数据， 可以传递任意数据。
如果以上两种方式不足以满足需要，父组件还可以通过this. selectComponent方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法。

通俗的讲：

父组件通过属性与子组件通信

子组件通过事件与父组件通信 this.triggerEvent("事件名称",{传递参数})

10 hidden不会触发组件的detached，但wxif会

组件中有一个detached函数，也是组件的生命周期函数，在组件实例被从页面节点树移除的时候才会触发。

控制音乐的停止可以通过监听页面是否被从页面树移除来进行。

但是前面我们在实现页面期刊切换的时候使用的是hidden，只是隐藏了，所以并不会触发detached函数。

11.完成音乐播放

this问题，如果当前的_recoverStatus：（）=》{} 使用箭头函数那么，这里的this将是最顶层的对象，undefined或者其他什么的
注意：背景音乐的组件时全局滴，也就是说它播放的是上一个音乐组件的音乐，如果全局组件src ==当前组件的 src，就可以判断当前的音乐需要变为播放状态
注意：组件的函数必须写在method内
为什么要在该生命周期填写？
            //因为背景音乐一直在播放，那是全局滴，但可以移动页面
            //也就是说当页面被渲染时，如果是music页面则进行判断需要执行该函数 
生命周期函数 detached 和 attached 只能使用 wx：if，而不能使用hidden！

12.真实感受Component与Model的好处

组件有利于分配开发任务，提升团队的开发效率；Model用来单独处理业务逻辑，减少页面代码量，增加代码的易读性


1 tabBar配置

app.json tabbar配置代码：
  "tabBar": {
    "selectedColor": "#000000",
    "backgroundColor": "#ffffff",
    "color": "#c7c7c7",
    "list": [
      {
        "selectedIconPath": "/images/tab/classic@highlight.png", //tabbar 点击图片
        "pagePath": "pages/classic/classic", //路由路径
        "text": "流行",  //tabar 标题文字
        "iconPath": "/images/tab/classic.png" //tabbar 未点击图片
      },
      {
        "pagePath": "pages/book/book",
        "selectedIconPath": "/images/tab/book@highlight.png",
        "iconPath": "/images/tab/book.png",
        "text": "书籍"
      },
      {
        "pagePath": "pages/my/my",
        "selectedIconPath": "/images/tab/my@highlight.png",
        "iconPath": "/images/tab/my.png",
        "text": "喜欢"
      }
    ]
  },


2.airbnb编码规范

编码规范
看airbnb的代码规范[重点是1-10]
用import 和export代替required

3.纯粹回调、Promise与async、await

処理异步的常用写法:
1. callback  缺点:易陷入回凋地獄，剥奇fun return 能力
2. promise代点:解决代码分格callback 陷入回凋地獄，多 个异步等待合并,
不需要层层传递 callback
3. async ,await,ES7

4.Promise的本质与用法

对象可以保存状态  函数不行  闭包是个例外
promise的精髓是通过对象保存异步回调的结果，然后在任何时候取出结果

promise 的使用步骤

new 一个Promise对象
编写异步代码函数，该函数是上一步创建对象时的第一个函数
promise.then 注册成功和失败的回调

5.Promise重构--参数设计原则与默认值

不要使用单独的参数，应详细列出详细参数中值，方便后期修改以及后续工作人员的编写

参数传递默认值
例子：
_request(url,resolve,reject,data={},method="GET")

直接传递默认值

6.Promise重构--重构request

参数传递值必须在默认值之前
_request(url,resolve,reject,data={},method="GET")


7.Promise重构--对象解构

函数参数传入{对象}参数，是解构赋值，在此函数内部可以直接调用对象的属性，调用方法就是直接写属性名；在其他地方调用次函数时就可以传入一个对象，系统会根据对象名称对应参数值

8. promise的正确用法
Promise的正确用法应该是在回调函数中返回一个Promise，而不是在回调函数中直接调用Promise
