module.exports = {
  // 必须要定义该对象
  configureWebpack: {
    resolve: {
      alias: {//正式开始配置别名
        'assets': '@/assets',
        'common': '@/common',
        'content': 'components/content',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

