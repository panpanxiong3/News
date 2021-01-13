import {
  HTTP
} from "../util/http";

class Classic extends HTTP {
  getLates(sCoadBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCoadBack(res);
        this._setLasterIndex(res.index);
      }
    });
  }

  getClassic(index,isPrevious, sCoadBack) {
    this.request({
      url: "classic/" + index + (isPrevious.toString()=="previous"?"/previous":"/next"),
      success: (res) => {
        sCoadBack(res);
      }
    })
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
}

export {
  Classic
};