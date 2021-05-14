/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path')
const os = require('os')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619507994505_3900';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'damonmok',
      // 数据库名
      database: 'zhihu_db',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  config.security = {
    // 关闭csrf防护
    csrf: {
      enable: false
    },
  }

  // token认证
  config.jwt = {
    secret: "S%#KDHJK_+SSEW{FV>]KWw.s1kdP~S\|<,SLWWITYOB_(&^$@R",
    expiresIn: 24 * 60 * 60
  }

  // 文件上传插件
  config.multipart = {
    mode: 'file',
    fileSize: '10mb',
    tmpdir: path.join(os.tmpdir(), appInfo.name)
  }

  config.appConstant = {
    appHost: 'http://localhost',
    appPort: 7001
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
