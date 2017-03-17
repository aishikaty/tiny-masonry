/**
  @version: 0.2.2
  @license WTFPL
*/
function TinyMasonry(el) {
  var self = this
  var columns = []

  function createColumns(n) {
    var width = 100 / n + "%"
    columns = []
    while (n--) {
      var column = document.createElement("div")
      column.style.width = width
      column.style.float = "left"
      el.appendChild(column)
      columns.push(column)
    }
  }

  function getShortest() {
    var shortest = columns[0]
    for (var i = columns.length; i--;) {
      if (columns[i].clientHeight <= shortest.clientHeight) {
        shortest = columns[i]
      }
    }
    return shortest
  }

  function layout(tested) {
    var width = tested.parentElement.clientWidth / tested.clientWidth
    var n = Math.min(42, Math.round(width)) || 1
    var child
    while (child = el.firstElementChild) {
      child.parentNode.removeChild(child)
    }
    el.style.overflow = "hidden"
    createColumns(n)
    self.items.forEach(function(item) {
      item.style.display = "block"
      item.style.width = "auto"
      item.style.visibility = ""
      getShortest().appendChild(item)
    })
    el.style.minHeight = ""
  }

  self.update = function() {
    if (self.items[0]) {
      el.classList.add("tinyMasonryLoaded")
      if (columns[0]) {
        el.style.minHeight = el.clientHeight + "px"
      }
      var tested = self.items[0]
      tested.style.width = ""
      if (tested.parentNode && tested.parentNode.parentNode === el) {
        layout(tested)
      } else {
        el.appendChild(tested)
        setTimeout(layout.bind(0, tested))
      }
    }
  }

  self.items = [].slice.call(el.children)
  self.update()
  window.addEventListener("resize", self.update)
}

if (typeof exports === "object") {
  module.exports = TinyMasonry
}
