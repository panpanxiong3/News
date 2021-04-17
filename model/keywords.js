import {
  HTTP
} from "../util/http-p"
class keyWordsModel extends HTTP{
  key = 'keyword' //历史搜索关键字
  maxLength = 10 //历史搜索数据最大值

  /**
   * 获取历史搜索数据
   */
  getHistory() {
    const key = wx.getStorageSync(this.key);
    if (!key) return [];
    return key;
  }

  /**
   * 获取热门搜索数据
   */
  getHot() {
    return this.request({
      url:'book/hot_keyword'
    })
  }
  /**
   * 添加历史搜索数据
   * @param {*} keyword 关键字
   */
  addHistory(keyword) {
    let words = this.getHistory(); //获取当前历史搜索
    let hasHistory = words.includes(keyword); //判断是否存在历史搜索
    if (!hasHistory) {
      if (words.length >= this.maxLength) { //判断搜索历史数据是否大于最大值
        words.pop();
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words)
    }

  }
}

export {
  keyWordsModel
}