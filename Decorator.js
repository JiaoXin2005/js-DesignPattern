/* 装饰者模式 */
Function.prototype.before = function (beforeFn) {
  var _self = this, //保存旧函数的引用
        args = Array.prototype.slice.call(arguments, 1) // 保存新函数的参数
  return function () { // 返回包含旧函数和新函数的“代理”函数
    beforeFn.apply(this, args) // 执行新函数,且保证this不被劫持,新函数接受的参数
    return _self.apply(this, arguments) // 新函数在旧函数之前执行
  }
}

Function.prototype.after = function (afterFn) {
  var _self = this,
        args = Array.prototype.slice.call(arguments, 1)
  return function () {
    _self.apply(this, arguments)
    afterFn.apply(this, args)
  }
}

function doLogic (data) {
  console.log('做一些业务逻辑' + data)
}

function expireBefore (data) {
  console.log('期望在业务逻辑之前执行' + data)
}

function expireAfter (data) {
  console.log('期望在业务逻辑之前执行' + data)
}

doLogic = doLogic.before(expireBefore, '      我是expireBefore的参数')
                           .after(expireAfter, '      我是expireAfter的参数')

doLogic('111111')

// 期望在业务逻辑之前执行      我是expireBefore的参数
// 做一些业务逻辑111111
// 期望在业务逻辑之前执行      我是expireAfter的参数

