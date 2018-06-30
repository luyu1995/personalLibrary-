let base ="http://localhost/china/index.php/"
let api = {
  //登录
  userLogin: base +'china/User/login',
  //注册
  userRegister:base +'china/User/register',
// 用户禁言 传id
  userDisabled:base +'china/User/doDisabled',
// 用户管理查询
  userSelect:base +'china/User/select',
  // 用户管理删除
  userDelete:base +'china/User/delete',
  // 用户修改
  userUpdate:base +'china/User/update',
  //新闻查询、搜索
  newsSelect:base +'china/News/select',
  //新闻添加
  newsAdd:base +'china/News/add',
  //新闻修改
  newsUpdate:base +'china/News/update',
  //新闻删除
  newsDelete:base +'china/News/delete',
  //新增留言
  wordAdd:base +'china/word/add',
  //留言查询\搜索
  wordSelect:base +'china/Word/select',
  //留言删除
  wordDelete:base +'china/Word/delete',
  //公司信息查询
  companySelect:base +'china/Company/select',
  //商品图片上传
  // goodsUpload:base +'china/Goods/upload',
  goodsUpload:base +'china/Test/upload',
  //商品存到数据库中
  goodsAdd:base +'china/Goods/add',
  //获取全部数据
  getAllgoods:base +'china/Goods/select',
  //修改数据
  goodsUpdate:base +'china/Goods/update',
  //删除数据
  goodsDelete:base +'china/Goods/delete',
  // 订单
  addSellBill:base +'china/Sellbill/add',
}
export default api;
