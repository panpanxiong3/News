import { HTTP } from "../util/http";

class Classic extends HTTP {
    getLates(sCoadBack){
      this.requst({
        url: 'classic/latest',
        success: (res) => {
          sCoadBack(res);
        }s
      });
    }
}

export {Classic};