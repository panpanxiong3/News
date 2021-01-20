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
    this._musicAttached();
    this._listernMusic();
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
    },

    _musicAttached:function(){
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

    _listernMusic:function(){
      //监听背景音播放
       pgM.onPlay(()=>{
         this._musicAttached();
       })
       //监听背景音暂停
       pgM.onPause(()=>{
         this._musicAttached();
       })
       //监听背景音播放结束
       pgM.onEnded(()=>{
         this._musicAttached();
       })
       //监听背景音取消
       pgM.onStop(()=>{
         this._musicAttached();
       })
    }
  }
})