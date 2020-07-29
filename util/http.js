import {
  config
} from '../config.js'

const tips = {
  1: '出现错误，抱歉',
  1005: 'appley无效',
  3000: '期刊不存在'
}
class HTTP {
  requst(params) {
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: config.api_base_url + params.url,
      complete: (res) => {},
      data: params.data,
      fail: (res) => {
        this._show_error(res.statusCode);
      },
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      method: params.method,
      success: (result) => {
        let code = result.statusCode.toString();
        if (code.startsWith('2')) {
          params.success(result);
        } else {
          this._show_error(result.statusCode);
        }
      },
    })
  }

  _show_error(error) {
    if (!error) {
      error = 1;
    }
    wx.showToast({
      title: tips[error],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
};