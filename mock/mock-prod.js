// 可以在生产服务中调用，在main中开启即可
// eslint-disable-next-line import/no-extraneous-dependencies
import Mock from "mockjs";
import URLUtil from "../src/utils/supplement/URLUtil.js";
import mocks from "./index";

export default function mockXHR() {
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false;

            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType;
            }
        }
        this.proxy_send(...arguments);
    };

    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null;
            if (respond instanceof Function) {
                const { body, type, url } = options;
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: URLUtil.param2Obj(url)
                });
            } else {
                result = respond;
            }
            return Mock.mock(result);
        };
    }

    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || "get", XHR2ExpressReqWrap(i.response));
    }
}
