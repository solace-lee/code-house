export default {
    db: 'mongodb://127.0.0.1:27017/code-house',
    // db: 'mongodb://solace:solace6637296@www.cleanown.cn:27017/code-house',
    // db: 'mongodb://www.cleanown.cn:27017/code-house',
    prefix: 'http://api.cleanown.cn/upload/images/',
    port: 3000,
    base: 'http://localhost:3000',
    qiniu: {
      bucket: 'yourbucket',
      video: 'http://yourvideourl.xxx.com/',
      AK: '-dLG8KAfxx',
      SK: 'wcgqiwkL7xxx'
    }
  }