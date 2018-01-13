export default {
  assign: (...objs) => {
    let result = {};
    for (let obj of objs)
      for (let key in obj)
        result[key] = obj[key];
    return result;
  },
  fetch: (url, params, option) => {
    if (void(0) === option) option = params;
    else {
      let paramsArray = [];
      Object.keys(params).map(key => paramsArray.push(key + '=' + params[key]));
      url += (-1 === url.search(/\?/) ? '?' : '&') + paramsArray.join('&');
    }
    return fetch("https://cnodejs.org/api/v1" + url, option);
  },
}
