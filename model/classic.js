import {
  HTTP
} from "../util/http";

class Classic extends HTTP {
  /**
   * 获取最新一期期刊信息
   * @param {*} sCoadBack 回调参数
   */
  getLates(sCoadBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCoadBack(res);
        this._setLasterIndex(res.index);
      }
    });
  }
/**
 * 获取api信息
 * @param {*} index 当前期刊
 * @param {*} isPrevious 点击方向 “previous” or “next”
 * @param {*} sCoadBack 回调参数
 */
  getClassic(index, isPrevious, sCoadBack) {
    //获取点击左右方向键后的期刊数，对应“+1”or“-1”
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
  }
  /**
   * 判断是否为最新一期
   * @param {*} index  当前期刊
   */
  isLaster(index) {
    let lasterIndex = this._getLasterIndex();
    return lasterIndex == index ? false : true;
  }
  /**
   * 判断是否为第一期
   * @param {*} index  当前期刊
   */
  isFirst(index) {
    return index != 1 ? true : false;
  }
  /**
   * 设置期刊缓存
   * @param {*} index 当前期刊
   */
  _setLasterIndex(index) {
    wx.setStorageSync('laster', index)
  }
  /**
   * 获取期刊缓存
   */
  _getLasterIndex() {
    return wx.getStorageSync('laster')
  }
  /**
   * 回调缓存信息名称 
   * @param {*} index 当前期刊数
   */
  _getkey(index) {
    let key = 'classic_' + index;
    return key
  }
}



export {
  Classic
};