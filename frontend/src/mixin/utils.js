/**
 * 检查fetch请求返回是否报错
 * @param response
 */
exports.checkStatus = function (response) {
  let {status, statusText} = response;

  if (status >= 200 && status < 300) {
    return response;
  }

  let error = new Error();
  error = {
    status,
    msg: statusText
  };
  throw error;

};

/**
 * 检查状态码
 * @param json
 */
exports.checkCode = function (json) {
  let {code, msg} = json;

  if (json.code === 0) {
    return json;
  }

  let error = new Error();
  error = {
    status: 200,
    code,
    msg
  };
  throw error;

};

