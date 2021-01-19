// components/classic/music/index.js
const pgM = wx.getBackgroundAudioManager();

import {
  BehaviorClassic
} from "../classic-beh"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:String,
    title:String
  },
  behaviors: [BehaviorClassic],
  attached:function(){
    if(pgM.paused){
      this.setData({
        playing:false
      })
      return;
    }
    if(pgM.play &&  pgM.src == this.properties.src){
      this.setData({
        playing:true
      })
    } 
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing:false, //音乐播放状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMusicPlay:function(){
       if(!this.data.playing){
         this.setData({
          playing:true
         });
         pgM.src = this.properties.src;
         pgM.title = this.properties.title;
       }else{
        this.setData({
          playing:false
         });
         pgM.pause()
       }
    }
  }
})