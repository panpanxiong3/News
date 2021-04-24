// components/likes/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number
    },
    isLike: {
      type: Boolean
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesImg: "images/like.png",
    noImg: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      let count = this.properties.count;
      let isLike = this.properties.isLike;
      if(this.properties.readOnly){
        return;
      }
      count = isLike ? count + 1 : count - 1;
      this.setData({
        count: count,
        isLike: !isLike
      })
      // 激活
      let behaveir = this.properties.isLike ? 'cancal' : 'like';
      this.triggerEvent('like', {
        behaveir: behaveir
      })
    }
  }
})