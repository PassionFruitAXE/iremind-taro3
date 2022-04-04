/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-04 20:22:13
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-04 21:12:27
 */
const baseResponse = function(code = 200, msg = null, data = null) {
  return {
    code,
    msg,
    data
  };
};

module.exports = baseResponse;
