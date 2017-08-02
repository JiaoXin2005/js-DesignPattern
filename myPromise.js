function Pro (fn) {
  var callbacks = []
  this.then = function (cb) {
    callbacks.push(cb)
    return this
  }
  function resolve (data) {
    setTimeout(() => {
      callbacks.forEach((cb) => {
        cb(data)
      })
    }, 0)
  }
  fn(resolve)
}

function asyncFn () {
  return new Pro ((resolve) => {
    console.log('come in')
    setTimeout(() => {
      resolve('finish async ---------')
    },1500)
    // resolve('这是同步代码')
  })
}

asyncFn().then((data) => {
  console.log(data,1111)
}).then((data) => {
  console.log(2222, data)
})
