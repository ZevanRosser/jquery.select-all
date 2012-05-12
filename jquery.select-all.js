(function($) {

  var cache = {};

  var target;
  $.fn.selectAll = function(theTarget) {
    
    target = theTarget;
    
    var elem;
    
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
    var self = this;
    self._elements = [];
    self.parent = elem.parent();
    self.elem = elem.clone();
    elem.remove();
  };
  List.prototype.get = function(index) {
    var self = this;
    return self._elements[index];
  };
  List.prototype.set = function(index, value) {
    var self = this;
    self._elements[index].text(value);
    return self;
  }
  List.prototype.append = function(value) {
    var self = this;
    var elem = self.elem.clone();
    elem.html(value);
    self.parent.append(elem);
    self._elements.push(elem);
    return self;
  };
  List.prototype.prepend = function(value) {
    var self = this;
    var elem = self.elem.clone();
    elem.html(value);
    self.parent.prepend(elem);
    self._elements.unshift(elem);
    return self;
  };
  List.prototype.deleteAt = function(index) {
    var self = this;
    self._elements[index].remove();
    self._elements.splice(index, 1);
    return self;
  };

})(jQuery);