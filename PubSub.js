function PubSub () {
  this.handlers = {}
}

PubSub.prototype = {
  on: function (type, func) {
    /* 订阅 */
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    this.handlers[type].push(func)
    return this
  },
  emit: function (type) {
    /* 触发事件 */
    var _this = this
    var args = Array.prototype.slice.call(arguments, 1)
    if (_this.handlers[type]) {
      for (var i = 0; i < _this.handlers[type].length; i++) {
        _this.handlers[type][i].apply(_this, args)
      }
    }
    return _this
  },
  off: function (type, handler) {
    if (!this.handlers[type]) {
      return
    }
    for (var i = this.handlers[type].length - 1; i >= 0; i--) {
      if (this.handlers[type][i] == handler) {
        this.handlers[type].splice(i,1)
      }
    }
  }
}

function callBack (data) {
  console.log(111, data)
}

var pubSub = new PubSub()
// pubSub.on('A', function (data){
//   console.log('订阅的A事件1' + data)
// })

// pubSub.on('A', callBack)

// pubSub.on('A', function (){
//   console.log('订阅的A事件3333333')
// })

// pubSub.off('A', callBack)
pubSub.emit('A', 'jiaoxin')
pubSub.emit('A', 'jiaoxin')
pubSub.emit('A', 'jiaoxin')


