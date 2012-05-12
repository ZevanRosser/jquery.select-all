(function($) {
  var cache = {};
  var target;

  $.fn.selectAll = function(theTarget) {
    var elem;
    target = theTarget;
    if (cache[target]) {
      elem = cache[target].clone();
    } else {
      elem = $("<div class='select-all'>" + this.html() + "<\/div>");
      if (elem.children().length == 1) {
        elem = $(elem.html());
      }
      cache[target] = elem.clone();
    }
    elem.each(populate);
    elem.find("*").each(populate);
    return elem;
  };

  function populate() {
    var curr = $(this);
    var html = $.trim(curr.html());
    if (html[0] == "~") {
      if (curr.hasClass("select-all-list")) {
        target[html.substr(1)] = new List(curr);
      } else {
        target[html.substr(1)] = curr;
      }
      curr.text("");
    } else if (curr.attr("data-var")) {
      target[curr.attr("data-var")] = curr;
    } 
  }

  // this is an experimental feature
  function List(elem) {
    this._elements = [];
    this.parent = elem.parent();
    this.elem = elem.clone();
    elem.remove();
  };
  
  List.prototype = {
    constructor: List,
    get: function(index) {
      return this._elements[index];
    },
    set: function(index, value) {
      this._elements[index].text(value);
      return this;
    },
    append: function(value) {
      var elem = this.elem.clone();
      elem.html(value);
      this.parent.append(elem);
      this._elements.push(elem);
      return this;
    },
    prepend: function(value) {
      var elem = this.elem.clone();
      elem.html(value);
      this.parent.prepend(elem);
      this._elements.unshift(elem);
      return this;
    },
    deleteAt: function(index) {
      this._elements[index].remove();
      this._elements.splice(index, 1);
      return this;
    }
  };

})(jQuery);