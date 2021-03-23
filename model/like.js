import {
  HTTP
} from '../util/http'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  /**
   * like组件调用获取数据
   * @param {*} artId id名称
   * @param {*} category type方式
   * @param {*} sCallBack 回调参数
   */
  getClassicLikeStatus(artId, category, sCallBack) {
    let url = `classic/${category}/${artId}/favor`;
    this.request({
      url: url,
      success: sCallBack
    })
  }

}

export {
  LikeModel
}