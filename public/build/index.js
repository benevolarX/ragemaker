(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/konva/lib/Global.js
  var require_Global = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports._registerNode = exports._NODES_REGISTRY = exports.Konva = exports.glob = exports._parseUA = void 0;
    var PI_OVER_180 = Math.PI / 180;
    function detectBrowser() {
      return typeof window !== "undefined" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
    }
    var _detectIE = function(ua) {
      var msie = ua.indexOf("msie ");
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }
      var trident = ua.indexOf("trident/");
      if (trident > 0) {
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }
      var edge = ua.indexOf("edge/");
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
      }
      return false;
    };
    var _parseUA = function(userAgent) {
      var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) || /(webkit)[ /]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
      return {
        browser: match[1] || "",
        version: match[2] || "0",
        isIE: _detectIE(ua),
        mobile,
        ieMobile
      };
    };
    exports._parseUA = _parseUA;
    exports.glob = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : {};
    exports.Konva = {
      _global: exports.glob,
      version: "7.2.5",
      isBrowser: detectBrowser(),
      isUnminified: /param/.test(function(param) {
      }.toString()),
      dblClickWindow: 400,
      getAngle: function(angle) {
        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
      },
      enableTrace: false,
      _pointerEventsEnabled: false,
      hitOnDragEnabled: false,
      captureTouchEventsEnabled: false,
      listenClickTap: false,
      inDblClickWindow: false,
      pixelRatio: void 0,
      dragDistance: 3,
      angleDeg: true,
      showWarnings: true,
      dragButtons: [0, 1],
      isDragging: function() {
        return exports.Konva["DD"].isDragging;
      },
      isDragReady: function() {
        return !!exports.Konva["DD"].node;
      },
      UA: exports._parseUA(exports.glob.navigator && exports.glob.navigator.userAgent || ""),
      document: exports.glob.document,
      _injectGlobal: function(Konva2) {
        exports.glob.Konva = Konva2;
      },
      _parseUA: exports._parseUA
    };
    exports._NODES_REGISTRY = {};
    var _registerNode = function(NodeClass) {
      exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
      exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
    };
    exports._registerNode = _registerNode;
  });

  // node_modules/konva/lib/Util.js
  var require_Util = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Util = exports.Transform = exports.Collection = void 0;
    var Global_1 = require_Global();
    var Collection = function() {
      function Collection2() {
      }
      Collection2.toCollection = function(arr) {
        var collection = new Collection2(), len = arr.length, n2;
        for (n2 = 0; n2 < len; n2++) {
          collection.push(arr[n2]);
        }
        return collection;
      };
      Collection2._mapMethod = function(methodName) {
        Collection2.prototype[methodName] = function() {
          var len = this.length, i2;
          var args = [].slice.call(arguments);
          for (i2 = 0; i2 < len; i2++) {
            this[i2][methodName].apply(this[i2], args);
          }
          return this;
        };
      };
      Collection2.mapMethods = function(constructor) {
        var prot = constructor.prototype;
        for (var methodName in prot) {
          Collection2._mapMethod(methodName);
        }
      };
      return Collection2;
    }();
    exports.Collection = Collection;
    Collection.prototype = [];
    Collection.prototype.each = function(func) {
      for (var n2 = 0; n2 < this.length; n2++) {
        func(this[n2], n2);
      }
    };
    Collection.prototype.toArray = function() {
      var arr = [], len = this.length, n2;
      for (n2 = 0; n2 < len; n2++) {
        arr.push(this[n2]);
      }
      return arr;
    };
    var Transform = function() {
      function Transform2(m2) {
        if (m2 === void 0) {
          m2 = [1, 0, 0, 1, 0, 0];
        }
        this.dirty = false;
        this.m = m2 && m2.slice() || [1, 0, 0, 1, 0, 0];
      }
      Transform2.prototype.reset = function() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 1;
        this.m[4] = 0;
        this.m[5] = 0;
      };
      Transform2.prototype.copy = function() {
        return new Transform2(this.m);
      };
      Transform2.prototype.copyInto = function(tr) {
        tr.m[0] = this.m[0];
        tr.m[1] = this.m[1];
        tr.m[2] = this.m[2];
        tr.m[3] = this.m[3];
        tr.m[4] = this.m[4];
        tr.m[5] = this.m[5];
      };
      Transform2.prototype.point = function(point) {
        var m2 = this.m;
        return {
          x: m2[0] * point.x + m2[2] * point.y + m2[4],
          y: m2[1] * point.x + m2[3] * point.y + m2[5]
        };
      };
      Transform2.prototype.translate = function(x2, y2) {
        this.m[4] += this.m[0] * x2 + this.m[2] * y2;
        this.m[5] += this.m[1] * x2 + this.m[3] * y2;
        return this;
      };
      Transform2.prototype.scale = function(sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
      };
      Transform2.prototype.rotate = function(rad) {
        var c2 = Math.cos(rad);
        var s2 = Math.sin(rad);
        var m11 = this.m[0] * c2 + this.m[2] * s2;
        var m12 = this.m[1] * c2 + this.m[3] * s2;
        var m21 = this.m[0] * -s2 + this.m[2] * c2;
        var m22 = this.m[1] * -s2 + this.m[3] * c2;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      };
      Transform2.prototype.getTranslation = function() {
        return {
          x: this.m[4],
          y: this.m[5]
        };
      };
      Transform2.prototype.skew = function(sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
      };
      Transform2.prototype.multiply = function(matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
      };
      Transform2.prototype.invert = function() {
        var d2 = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d2;
        var m1 = -this.m[1] * d2;
        var m2 = -this.m[2] * d2;
        var m3 = this.m[0] * d2;
        var m4 = d2 * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d2 * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
      };
      Transform2.prototype.getMatrix = function() {
        return this.m;
      };
      Transform2.prototype.setAbsolutePosition = function(x2, y2) {
        var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y2 - m5) - m1 * (x2 - m4)) / (m0 * m3 - m1 * m2), xt = (x2 - m4 - m2 * yt) / m0;
        return this.translate(xt, yt);
      };
      Transform2.prototype.decompose = function() {
        var a2 = this.m[0];
        var b2 = this.m[1];
        var c2 = this.m[2];
        var d2 = this.m[3];
        var e2 = this.m[4];
        var f2 = this.m[5];
        var delta = a2 * d2 - b2 * c2;
        var result = {
          x: e2,
          y: f2,
          rotation: 0,
          scaleX: 0,
          scaleY: 0,
          skewX: 0,
          skewY: 0
        };
        if (a2 != 0 || b2 != 0) {
          var r2 = Math.sqrt(a2 * a2 + b2 * b2);
          result.rotation = b2 > 0 ? Math.acos(a2 / r2) : -Math.acos(a2 / r2);
          result.scaleX = r2;
          result.scaleY = delta / r2;
          result.skewX = (a2 * c2 + b2 * d2) / delta;
          result.skewY = 0;
        } else if (c2 != 0 || d2 != 0) {
          var s2 = Math.sqrt(c2 * c2 + d2 * d2);
          result.rotation = Math.PI / 2 - (d2 > 0 ? Math.acos(-c2 / s2) : -Math.acos(c2 / s2));
          result.scaleX = delta / s2;
          result.scaleY = s2;
          result.skewX = 0;
          result.skewY = (a2 * c2 + b2 * d2) / delta;
        } else {
        }
        result.rotation = exports.Util._getRotation(result.rotation);
        return result;
      };
      return Transform2;
    }();
    exports.Transform = Transform;
    var OBJECT_ARRAY = "[object Array]";
    var OBJECT_NUMBER = "[object Number]";
    var OBJECT_STRING = "[object String]";
    var OBJECT_BOOLEAN = "[object Boolean]";
    var PI_OVER_DEG180 = Math.PI / 180;
    var DEG180_OVER_PI = 180 / Math.PI;
    var HASH = "#";
    var EMPTY_STRING = "";
    var ZERO = "0";
    var KONVA_WARNING = "Konva warning: ";
    var KONVA_ERROR = "Konva error: ";
    var RGB_PAREN = "rgb(";
    var COLORS = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5]
    };
    var RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    var animQueue = [];
    exports.Util = {
      _isElement: function(obj) {
        return !!(obj && obj.nodeType == 1);
      },
      _isFunction: function(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
      },
      _isPlainObject: function(obj) {
        return !!obj && obj.constructor === Object;
      },
      _isArray: function(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
      },
      _isNumber: function(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
      },
      _isString: function(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
      },
      _isBoolean: function(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
      },
      isObject: function(val) {
        return val instanceof Object;
      },
      isValidSelector: function(selector) {
        if (typeof selector !== "string") {
          return false;
        }
        var firstChar = selector[0];
        return firstChar === "#" || firstChar === "." || firstChar === firstChar.toUpperCase();
      },
      _sign: function(number) {
        if (number === 0) {
          return 1;
        }
        if (number > 0) {
          return 1;
        } else {
          return -1;
        }
      },
      requestAnimFrame: function(callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
          requestAnimationFrame(function() {
            var queue = animQueue;
            animQueue = [];
            queue.forEach(function(cb) {
              cb();
            });
          });
        }
      },
      createCanvasElement: function() {
        var canvas = document.createElement("canvas");
        try {
          canvas.style = canvas.style || {};
        } catch (e2) {
        }
        return canvas;
      },
      createImageElement: function() {
        return document.createElement("img");
      },
      _isInDocument: function(el) {
        while (el = el.parentNode) {
          if (el == document) {
            return true;
          }
        }
        return false;
      },
      _simplifyArray: function(arr) {
        var retArr = [], len = arr.length, util = exports.Util, n2, val;
        for (n2 = 0; n2 < len; n2++) {
          val = arr[n2];
          if (util._isNumber(val)) {
            val = Math.round(val * 1e3) / 1e3;
          } else if (!util._isString(val)) {
            val = val.toString();
          }
          retArr.push(val);
        }
        return retArr;
      },
      _urlToImage: function(url, callback) {
        var imageObj = new Global_1.glob.Image();
        imageObj.onload = function() {
          callback(imageObj);
        };
        imageObj.src = url;
      },
      _rgbToHex: function(r2, g2, b2) {
        return ((1 << 24) + (r2 << 16) + (g2 << 8) + b2).toString(16).slice(1);
      },
      _hexToRgb: function(hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        var bigint = parseInt(hex, 16);
        return {
          r: bigint >> 16 & 255,
          g: bigint >> 8 & 255,
          b: bigint & 255
        };
      },
      getRandomColor: function() {
        var randColor = (Math.random() * 16777215 << 0).toString(16);
        while (randColor.length < 6) {
          randColor = ZERO + randColor;
        }
        return HASH + randColor;
      },
      get: function(val, def) {
        if (val === void 0) {
          return def;
        } else {
          return val;
        }
      },
      getRGB: function(color) {
        var rgb;
        if (color in COLORS) {
          rgb = COLORS[color];
          return {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
          };
        } else if (color[0] === HASH) {
          return this._hexToRgb(color.substring(1));
        } else if (color.substr(0, 4) === RGB_PAREN) {
          rgb = RGB_REGEX.exec(color.replace(/ /g, ""));
          return {
            r: parseInt(rgb[1], 10),
            g: parseInt(rgb[2], 10),
            b: parseInt(rgb[3], 10)
          };
        } else {
          return {
            r: 0,
            g: 0,
            b: 0
          };
        }
      },
      colorToRGBA: function(str) {
        str = str || "black";
        return exports.Util._namedColorToRBA(str) || exports.Util._hex3ColorToRGBA(str) || exports.Util._hex6ColorToRGBA(str) || exports.Util._rgbColorToRGBA(str) || exports.Util._rgbaColorToRGBA(str) || exports.Util._hslColorToRGBA(str);
      },
      _namedColorToRBA: function(str) {
        var c2 = COLORS[str.toLowerCase()];
        if (!c2) {
          return null;
        }
        return {
          r: c2[0],
          g: c2[1],
          b: c2[2],
          a: 1
        };
      },
      _rgbColorToRGBA: function(str) {
        if (str.indexOf("rgb(") === 0) {
          str = str.match(/rgb\(([^)]+)\)/)[1];
          var parts = str.split(/ *, */).map(Number);
          return {
            r: parts[0],
            g: parts[1],
            b: parts[2],
            a: 1
          };
        }
      },
      _rgbaColorToRGBA: function(str) {
        if (str.indexOf("rgba(") === 0) {
          str = str.match(/rgba\(([^)]+)\)/)[1];
          var parts = str.split(/ *, */).map(Number);
          return {
            r: parts[0],
            g: parts[1],
            b: parts[2],
            a: parts[3]
          };
        }
      },
      _hex6ColorToRGBA: function(str) {
        if (str[0] === "#" && str.length === 7) {
          return {
            r: parseInt(str.slice(1, 3), 16),
            g: parseInt(str.slice(3, 5), 16),
            b: parseInt(str.slice(5, 7), 16),
            a: 1
          };
        }
      },
      _hex3ColorToRGBA: function(str) {
        if (str[0] === "#" && str.length === 4) {
          return {
            r: parseInt(str[1] + str[1], 16),
            g: parseInt(str[2] + str[2], 16),
            b: parseInt(str[3] + str[3], 16),
            a: 1
          };
        }
      },
      _hslColorToRGBA: function(str) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
          var _a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str), _2 = _a[0], hsl = _a.slice(1);
          var h = Number(hsl[0]) / 360;
          var s2 = Number(hsl[1]) / 100;
          var l2 = Number(hsl[2]) / 100;
          var t2 = void 0;
          var t3 = void 0;
          var val = void 0;
          if (s2 === 0) {
            val = l2 * 255;
            return {
              r: Math.round(val),
              g: Math.round(val),
              b: Math.round(val),
              a: 1
            };
          }
          if (l2 < 0.5) {
            t2 = l2 * (1 + s2);
          } else {
            t2 = l2 + s2 - l2 * s2;
          }
          var t1 = 2 * l2 - t2;
          var rgb = [0, 0, 0];
          for (var i2 = 0; i2 < 3; i2++) {
            t3 = h + 1 / 3 * -(i2 - 1);
            if (t3 < 0) {
              t3++;
            }
            if (t3 > 1) {
              t3--;
            }
            if (6 * t3 < 1) {
              val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
              val = t2;
            } else if (3 * t3 < 2) {
              val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
              val = t1;
            }
            rgb[i2] = val * 255;
          }
          return {
            r: Math.round(rgb[0]),
            g: Math.round(rgb[1]),
            b: Math.round(rgb[2]),
            a: 1
          };
        }
      },
      haveIntersection: function(r1, r2) {
        return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
      },
      cloneObject: function(obj) {
        var retObj = {};
        for (var key in obj) {
          if (this._isPlainObject(obj[key])) {
            retObj[key] = this.cloneObject(obj[key]);
          } else if (this._isArray(obj[key])) {
            retObj[key] = this.cloneArray(obj[key]);
          } else {
            retObj[key] = obj[key];
          }
        }
        return retObj;
      },
      cloneArray: function(arr) {
        return arr.slice(0);
      },
      _degToRad: function(deg) {
        return deg * PI_OVER_DEG180;
      },
      _radToDeg: function(rad) {
        return rad * DEG180_OVER_PI;
      },
      _getRotation: function(radians) {
        return Global_1.Konva.angleDeg ? exports.Util._radToDeg(radians) : radians;
      },
      _capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      throw: function(str) {
        throw new Error(KONVA_ERROR + str);
      },
      error: function(str) {
        console.error(KONVA_ERROR + str);
      },
      warn: function(str) {
        if (!Global_1.Konva.showWarnings) {
          return;
        }
        console.warn(KONVA_WARNING + str);
      },
      extend: function(child, parent) {
        function Ctor() {
          this.constructor = child;
        }
        Ctor.prototype = parent.prototype;
        var oldProto = child.prototype;
        child.prototype = new Ctor();
        for (var key in oldProto) {
          if (oldProto.hasOwnProperty(key)) {
            child.prototype[key] = oldProto[key];
          }
        }
        child.__super__ = parent.prototype;
        child.super = parent;
      },
      _getControlPoints: function(x0, y0, x1, y1, x2, y2, t2) {
        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = t2 * d01 / (d01 + d12), fb = t2 * d12 / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
        return [p1x, p1y, p2x, p2y];
      },
      _expandPoints: function(p2, tension) {
        var len = p2.length, allPoints = [], n2, cp;
        for (n2 = 2; n2 < len - 2; n2 += 2) {
          cp = exports.Util._getControlPoints(p2[n2 - 2], p2[n2 - 1], p2[n2], p2[n2 + 1], p2[n2 + 2], p2[n2 + 3], tension);
          if (isNaN(cp[0])) {
            continue;
          }
          allPoints.push(cp[0]);
          allPoints.push(cp[1]);
          allPoints.push(p2[n2]);
          allPoints.push(p2[n2 + 1]);
          allPoints.push(cp[2]);
          allPoints.push(cp[3]);
        }
        return allPoints;
      },
      each: function(obj, func) {
        for (var key in obj) {
          func(key, obj[key]);
        }
      },
      _inRange: function(val, left, right) {
        return left <= val && val < right;
      },
      _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
        var x4, y4, dist;
        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
          x4 = x1;
          y4 = y1;
          dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        } else {
          var u2 = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
          if (u2 < 0) {
            x4 = x1;
            y4 = y1;
            dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
          } else if (u2 > 1) {
            x4 = x2;
            y4 = y2;
            dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
          } else {
            x4 = x1 + u2 * (x2 - x1);
            y4 = y1 + u2 * (y2 - y1);
            dist = (x4 - x3) * (x4 - x3) + (y4 - y3) * (y4 - y3);
          }
        }
        return [x4, y4, dist];
      },
      _getProjectionToLine: function(pt, line, isClosed) {
        var pc = exports.Util.cloneObject(pt);
        var dist = Number.MAX_VALUE;
        line.forEach(function(p1, i2) {
          if (!isClosed && i2 === line.length - 1) {
            return;
          }
          var p2 = line[(i2 + 1) % line.length];
          var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
          var px = proj[0], py = proj[1], pdist = proj[2];
          if (pdist < dist) {
            pc.x = px;
            pc.y = py;
            dist = pdist;
          }
        });
        return pc;
      },
      _prepareArrayForTween: function(startArray, endArray, isClosed) {
        var n2, start2 = [], end = [];
        if (startArray.length > endArray.length) {
          var temp = endArray;
          endArray = startArray;
          startArray = temp;
        }
        for (n2 = 0; n2 < startArray.length; n2 += 2) {
          start2.push({
            x: startArray[n2],
            y: startArray[n2 + 1]
          });
        }
        for (n2 = 0; n2 < endArray.length; n2 += 2) {
          end.push({
            x: endArray[n2],
            y: endArray[n2 + 1]
          });
        }
        var newStart = [];
        end.forEach(function(point) {
          var pr = exports.Util._getProjectionToLine(point, start2, isClosed);
          newStart.push(pr.x);
          newStart.push(pr.y);
        });
        return newStart;
      },
      _prepareToStringify: function(obj) {
        var desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (var key in obj) {
          if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == "object")) {
            continue;
          }
          desc = Object.getOwnPropertyDescriptor(obj, key);
          if (obj[key].visitedByCircularReferenceRemoval || exports.Util._isElement(obj[key])) {
            if (desc.configurable) {
              delete obj[key];
            } else {
              return null;
            }
          } else if (exports.Util._prepareToStringify(obj[key]) === null) {
            if (desc.configurable) {
              delete obj[key];
            } else {
              return null;
            }
          }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
      },
      _assign: function(target, source) {
        for (var key in source) {
          target[key] = source[key];
        }
        return target;
      },
      _getFirstPointerId: function(evt) {
        if (!evt.touches) {
          return 999;
        } else {
          return evt.changedTouches[0].identifier;
        }
      }
    };
  });

  // node_modules/konva/lib/Validators.js
  var require_Validators = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.getComponentValidator = exports.getBooleanValidator = exports.getNumberArrayValidator = exports.getFunctionValidator = exports.getStringOrGradientValidator = exports.getStringValidator = exports.getNumberOrAutoValidator = exports.getNumberOrArrayOfNumbersValidator = exports.getNumberValidator = exports.alphaComponent = exports.RGBComponent = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    function _formatValue(val) {
      if (Util_1.Util._isString(val)) {
        return '"' + val + '"';
      }
      if (Object.prototype.toString.call(val) === "[object Number]") {
        return val;
      }
      if (Util_1.Util._isBoolean(val)) {
        return val;
      }
      return Object.prototype.toString.call(val);
    }
    function RGBComponent(val) {
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      }
      return Math.round(val);
    }
    exports.RGBComponent = RGBComponent;
    function alphaComponent(val) {
      if (val > 1) {
        return 1;
      } else if (val < 1e-4) {
        return 1e-4;
      }
      return val;
    }
    exports.alphaComponent = alphaComponent;
    function getNumberValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isNumber(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number.');
          }
          return val;
        };
      }
    }
    exports.getNumberValidator = getNumberValidator;
    function getNumberOrArrayOfNumbersValidator(noOfElements) {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isNumber = Util_1.Util._isNumber(val);
          var isValidArray = Util_1.Util._isArray(val) && val.length == noOfElements;
          if (!isNumber && !isValidArray) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or Array<number>(' + noOfElements + ")");
          }
          return val;
        };
      }
    }
    exports.getNumberOrArrayOfNumbersValidator = getNumberOrArrayOfNumbersValidator;
    function getNumberOrAutoValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isNumber = Util_1.Util._isNumber(val);
          var isAuto = val === "auto";
          if (!(isNumber || isAuto)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or "auto".');
          }
          return val;
        };
      }
    }
    exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
    function getStringValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isString(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string.');
          }
          return val;
        };
      }
    }
    exports.getStringValidator = getStringValidator;
    function getStringOrGradientValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isString = Util_1.Util._isString(val);
          var isGradient = Object.prototype.toString.call(val) === "[object CanvasGradient]";
          if (!(isString || isGradient)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string or a native gradient.');
          }
          return val;
        };
      }
    }
    exports.getStringOrGradientValidator = getStringOrGradientValidator;
    function getFunctionValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isFunction(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a function.');
          }
          return val;
        };
      }
    }
    exports.getFunctionValidator = getFunctionValidator;
    function getNumberArrayValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util._isArray(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a array of numbers.');
          } else {
            val.forEach(function(item) {
              if (!Util_1.Util._isNumber(item)) {
                Util_1.Util.warn('"' + attr + '" attribute has non numeric element ' + item + ". Make sure that all elements are numbers.");
              }
            });
          }
          return val;
        };
      }
    }
    exports.getNumberArrayValidator = getNumberArrayValidator;
    function getBooleanValidator() {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          var isBool = val === true || val === false;
          if (!isBool) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a boolean.');
          }
          return val;
        };
      }
    }
    exports.getBooleanValidator = getBooleanValidator;
    function getComponentValidator(components) {
      if (Global_1.Konva.isUnminified) {
        return function(val, attr) {
          if (!Util_1.Util.isObject(val)) {
            Util_1.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be an object with properties ' + components);
          }
          return val;
        };
      }
    }
    exports.getComponentValidator = getComponentValidator;
  });

  // node_modules/konva/lib/Factory.js
  var require_Factory = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Factory = void 0;
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var GET = "get";
    var SET = "set";
    exports.Factory = {
      addGetterSetter: function(constructor, attr, def, validator, after) {
        exports.Factory.addGetter(constructor, attr, def);
        exports.Factory.addSetter(constructor, attr, validator, after);
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      addGetter: function(constructor, attr, def) {
        var method = GET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = constructor.prototype[method] || function() {
          var val = this.attrs[attr];
          return val === void 0 ? def : val;
        };
      },
      addSetter: function(constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
          exports.Factory.overWriteSetter(constructor, attr, validator, after);
        }
      },
      overWriteSetter: function(constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = function(val) {
          if (validator && val !== void 0 && val !== null) {
            val = validator.call(this, val, attr);
          }
          this._setAttr(attr, val);
          if (after) {
            after.call(this);
          }
          return this;
        };
      },
      addComponentsGetterSetter: function(constructor, attr, components, validator, after) {
        var len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n2, component;
        constructor.prototype[getter] = function() {
          var ret = {};
          for (n2 = 0; n2 < len; n2++) {
            component = components[n2];
            ret[component] = this.getAttr(attr + capitalize(component));
          }
          return ret;
        };
        var basicValidator = Validators_1.getComponentValidator(components);
        constructor.prototype[setter] = function(val) {
          var oldVal = this.attrs[attr], key;
          if (validator) {
            val = validator.call(this, val);
          }
          if (basicValidator) {
            basicValidator.call(this, val, attr);
          }
          for (key in val) {
            if (!val.hasOwnProperty(key)) {
              continue;
            }
            this._setAttr(attr + capitalize(key), val[key]);
          }
          this._fireChangeEvent(attr, oldVal, val);
          if (after) {
            after.call(this);
          }
          return this;
        };
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      addOverloadedGetterSetter: function(constructor, attr) {
        var capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function() {
          if (arguments.length) {
            this[setter](arguments[0]);
            return this;
          }
          return this[getter]();
        };
      },
      addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
        Util_1.Util.error("Adding deprecated " + attr);
        var method = GET + Util_1.Util._capitalize(attr);
        var message = attr + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
        constructor.prototype[method] = function() {
          Util_1.Util.error(message);
          var val = this.attrs[attr];
          return val === void 0 ? def : val;
        };
        exports.Factory.addSetter(constructor, attr, validator, function() {
          Util_1.Util.error(message);
        });
        exports.Factory.addOverloadedGetterSetter(constructor, attr);
      },
      backCompat: function(constructor, methods) {
        Util_1.Util.each(methods, function(oldMethodName, newMethodName) {
          var method = constructor.prototype[newMethodName];
          var oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
          var oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
          function deprecated() {
            method.apply(this, arguments);
            Util_1.Util.error('"' + oldMethodName + '" method is deprecated and will be removed soon. Use ""' + newMethodName + '" instead.');
          }
          constructor.prototype[oldMethodName] = deprecated;
          constructor.prototype[oldGetter] = deprecated;
          constructor.prototype[oldSetter] = deprecated;
        });
      },
      afterSetFilter: function() {
        this._filterUpToDate = false;
      }
    };
  });

  // node_modules/konva/lib/Context.js
  var require_Context = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.HitContext = exports.SceneContext = exports.Context = void 0;
    var Util_1 = require_Util();
    var Global_1 = require_Global();
    var COMMA = ",";
    var OPEN_PAREN = "(";
    var CLOSE_PAREN = ")";
    var OPEN_PAREN_BRACKET = "([";
    var CLOSE_BRACKET_PAREN = "])";
    var SEMICOLON = ";";
    var DOUBLE_PAREN = "()";
    var EQUALS = "=";
    var CONTEXT_METHODS = [
      "arc",
      "arcTo",
      "beginPath",
      "bezierCurveTo",
      "clearRect",
      "clip",
      "closePath",
      "createLinearGradient",
      "createPattern",
      "createRadialGradient",
      "drawImage",
      "ellipse",
      "fill",
      "fillText",
      "getImageData",
      "createImageData",
      "lineTo",
      "moveTo",
      "putImageData",
      "quadraticCurveTo",
      "rect",
      "restore",
      "rotate",
      "save",
      "scale",
      "setLineDash",
      "setTransform",
      "stroke",
      "strokeText",
      "transform",
      "translate"
    ];
    var CONTEXT_PROPERTIES = [
      "fillStyle",
      "strokeStyle",
      "shadowColor",
      "shadowBlur",
      "shadowOffsetX",
      "shadowOffsetY",
      "lineCap",
      "lineDashOffset",
      "lineJoin",
      "lineWidth",
      "miterLimit",
      "font",
      "textAlign",
      "textBaseline",
      "globalAlpha",
      "globalCompositeOperation",
      "imageSmoothingEnabled"
    ];
    var traceArrMax = 100;
    var Context = function() {
      function Context2(canvas) {
        this.canvas = canvas;
        this._context = canvas._canvas.getContext("2d");
        if (Global_1.Konva.enableTrace) {
          this.traceArr = [];
          this._enableTrace();
        }
      }
      Context2.prototype.fillShape = function(shape) {
        if (shape.fillEnabled()) {
          this._fill(shape);
        }
      };
      Context2.prototype._fill = function(shape) {
      };
      Context2.prototype.strokeShape = function(shape) {
        if (shape.hasStroke()) {
          this._stroke(shape);
        }
      };
      Context2.prototype._stroke = function(shape) {
      };
      Context2.prototype.fillStrokeShape = function(shape) {
        if (shape.attrs.fillAfterStrokeEnabled) {
          this.strokeShape(shape);
          this.fillShape(shape);
        } else {
          this.fillShape(shape);
          this.strokeShape(shape);
        }
      };
      Context2.prototype.getTrace = function(relaxed) {
        var traceArr = this.traceArr, len = traceArr.length, str = "", n2, trace, method, args;
        for (n2 = 0; n2 < len; n2++) {
          trace = traceArr[n2];
          method = trace.method;
          if (method) {
            args = trace.args;
            str += method;
            if (relaxed) {
              str += DOUBLE_PAREN;
            } else {
              if (Util_1.Util._isArray(args[0])) {
                str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
              } else {
                str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
              }
            }
          } else {
            str += trace.property;
            if (!relaxed) {
              str += EQUALS + trace.val;
            }
          }
          str += SEMICOLON;
        }
        return str;
      };
      Context2.prototype.clearTrace = function() {
        this.traceArr = [];
      };
      Context2.prototype._trace = function(str) {
        var traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
          traceArr.shift();
        }
      };
      Context2.prototype.reset = function() {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
      };
      Context2.prototype.getCanvas = function() {
        return this.canvas;
      };
      Context2.prototype.clear = function(bounds) {
        var canvas = this.getCanvas();
        if (bounds) {
          this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        } else {
          this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
      };
      Context2.prototype._applyLineCap = function(shape) {
        var lineCap = shape.getLineCap();
        if (lineCap) {
          this.setAttr("lineCap", lineCap);
        }
      };
      Context2.prototype._applyOpacity = function(shape) {
        var absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
          this.setAttr("globalAlpha", absOpacity);
        }
      };
      Context2.prototype._applyLineJoin = function(shape) {
        var lineJoin = shape.attrs.lineJoin;
        if (lineJoin) {
          this.setAttr("lineJoin", lineJoin);
        }
      };
      Context2.prototype.setAttr = function(attr, val) {
        this._context[attr] = val;
      };
      Context2.prototype.arc = function(a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
      };
      Context2.prototype.arcTo = function(a0, a1, a2, a3, a4) {
        this._context.arcTo(a0, a1, a2, a3, a4);
      };
      Context2.prototype.beginPath = function() {
        this._context.beginPath();
      };
      Context2.prototype.bezierCurveTo = function(a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
      };
      Context2.prototype.clearRect = function(a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
      };
      Context2.prototype.clip = function() {
        this._context.clip();
      };
      Context2.prototype.closePath = function() {
        this._context.closePath();
      };
      Context2.prototype.createImageData = function(a0, a1) {
        var a2 = arguments;
        if (a2.length === 2) {
          return this._context.createImageData(a0, a1);
        } else if (a2.length === 1) {
          return this._context.createImageData(a0);
        }
      };
      Context2.prototype.createLinearGradient = function(a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
      };
      Context2.prototype.createPattern = function(a0, a1) {
        return this._context.createPattern(a0, a1);
      };
      Context2.prototype.createRadialGradient = function(a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
      };
      Context2.prototype.drawImage = function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a9 = arguments, _context = this._context;
        if (a9.length === 3) {
          _context.drawImage(a0, a1, a2);
        } else if (a9.length === 5) {
          _context.drawImage(a0, a1, a2, a3, a4);
        } else if (a9.length === 9) {
          _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
      };
      Context2.prototype.ellipse = function(a0, a1, a2, a3, a4, a5, a6, a7) {
        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
      };
      Context2.prototype.isPointInPath = function(x2, y2) {
        return this._context.isPointInPath(x2, y2);
      };
      Context2.prototype.fill = function() {
        this._context.fill();
      };
      Context2.prototype.fillRect = function(x2, y2, width, height) {
        this._context.fillRect(x2, y2, width, height);
      };
      Context2.prototype.strokeRect = function(x2, y2, width, height) {
        this._context.strokeRect(x2, y2, width, height);
      };
      Context2.prototype.fillText = function(a0, a1, a2) {
        this._context.fillText(a0, a1, a2);
      };
      Context2.prototype.measureText = function(text) {
        return this._context.measureText(text);
      };
      Context2.prototype.getImageData = function(a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
      };
      Context2.prototype.lineTo = function(a0, a1) {
        this._context.lineTo(a0, a1);
      };
      Context2.prototype.moveTo = function(a0, a1) {
        this._context.moveTo(a0, a1);
      };
      Context2.prototype.rect = function(a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
      };
      Context2.prototype.putImageData = function(a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
      };
      Context2.prototype.quadraticCurveTo = function(a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
      };
      Context2.prototype.restore = function() {
        this._context.restore();
      };
      Context2.prototype.rotate = function(a0) {
        this._context.rotate(a0);
      };
      Context2.prototype.save = function() {
        this._context.save();
      };
      Context2.prototype.scale = function(a0, a1) {
        this._context.scale(a0, a1);
      };
      Context2.prototype.setLineDash = function(a0) {
        if (this._context.setLineDash) {
          this._context.setLineDash(a0);
        } else if ("mozDash" in this._context) {
          this._context["mozDash"] = a0;
        } else if ("webkitLineDash" in this._context) {
          this._context["webkitLineDash"] = a0;
        }
      };
      Context2.prototype.getLineDash = function() {
        return this._context.getLineDash();
      };
      Context2.prototype.setTransform = function(a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
      };
      Context2.prototype.stroke = function() {
        this._context.stroke();
      };
      Context2.prototype.strokeText = function(a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
      };
      Context2.prototype.transform = function(a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
      };
      Context2.prototype.translate = function(a0, a1) {
        this._context.translate(a0, a1);
      };
      Context2.prototype._enableTrace = function() {
        var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util_1.Util._simplifyArray, origSetter = this.setAttr, n2, args;
        var func = function(methodName) {
          var origMethod = that[methodName], ret;
          that[methodName] = function() {
            args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
            ret = origMethod.apply(that, arguments);
            that._trace({
              method: methodName,
              args
            });
            return ret;
          };
        };
        for (n2 = 0; n2 < len; n2++) {
          func(CONTEXT_METHODS[n2]);
        }
        that.setAttr = function() {
          origSetter.apply(that, arguments);
          var prop = arguments[0];
          var val = arguments[1];
          if (prop === "shadowOffsetX" || prop === "shadowOffsetY" || prop === "shadowBlur") {
            val = val / this.canvas.getPixelRatio();
          }
          that._trace({
            property: prop,
            val
          });
        };
      };
      Context2.prototype._applyGlobalCompositeOperation = function(node) {
        var globalCompositeOperation = node.getGlobalCompositeOperation();
        if (globalCompositeOperation !== "source-over") {
          this.setAttr("globalCompositeOperation", globalCompositeOperation);
        }
      };
      return Context2;
    }();
    exports.Context = Context;
    CONTEXT_PROPERTIES.forEach(function(prop) {
      Object.defineProperty(Context.prototype, prop, {
        get: function() {
          return this._context[prop];
        },
        set: function(val) {
          this._context[prop] = val;
        }
      });
    });
    var SceneContext = function(_super) {
      __extends(SceneContext2, _super);
      function SceneContext2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      SceneContext2.prototype._fillColor = function(shape) {
        var fill = shape.fill();
        this.setAttr("fillStyle", fill);
        shape._fillFunc(this);
      };
      SceneContext2.prototype._fillPattern = function(shape) {
        var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternRotation = Global_1.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY();
        if (fillPatternX || fillPatternY) {
          this.translate(fillPatternX || 0, fillPatternY || 0);
        }
        if (fillPatternRotation) {
          this.rotate(fillPatternRotation);
        }
        if (fillPatternScaleX || fillPatternScaleY) {
        }
        if (fillPatternOffsetX || fillPatternOffsetY) {
          this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
        }
        this.setAttr("fillStyle", shape._getFillPattern());
        shape._fillFunc(this);
      };
      SceneContext2.prototype._fillLinearGradient = function(shape) {
        var grd = shape._getLinearGradient();
        if (grd) {
          this.setAttr("fillStyle", grd);
          shape._fillFunc(this);
        }
      };
      SceneContext2.prototype._fillRadialGradient = function(shape) {
        var grd = shape._getRadialGradient();
        if (grd) {
          this.setAttr("fillStyle", grd);
          shape._fillFunc(this);
        }
      };
      SceneContext2.prototype._fill = function(shape) {
        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === "color") {
          this._fillColor(shape);
          return;
        }
        var hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === "pattern") {
          this._fillPattern(shape);
          return;
        }
        var hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === "linear-gradient") {
          this._fillLinearGradient(shape);
          return;
        }
        var hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === "radial-gradient") {
          this._fillRadialGradient(shape);
          return;
        }
        if (hasColor) {
          this._fillColor(shape);
        } else if (hasPattern) {
          this._fillPattern(shape);
        } else if (hasLinearGradient) {
          this._fillLinearGradient(shape);
        } else if (hasRadialGradient) {
          this._fillRadialGradient(shape);
        }
      };
      SceneContext2.prototype._strokeLinearGradient = function(shape) {
        var start2 = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start2.x, start2.y, end.x, end.y);
        if (colorStops) {
          for (var n2 = 0; n2 < colorStops.length; n2 += 2) {
            grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
          }
          this.setAttr("strokeStyle", grd);
        }
      };
      SceneContext2.prototype._stroke = function(shape) {
        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
          if (!strokeScaleEnabled) {
            this.save();
            var pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }
          this._applyLineCap(shape);
          if (dash && shape.dashEnabled()) {
            this.setLineDash(dash);
            this.setAttr("lineDashOffset", shape.dashOffset());
          }
          this.setAttr("lineWidth", shape.strokeWidth());
          if (!shape.getShadowForStrokeEnabled()) {
            this.setAttr("shadowColor", "rgba(0,0,0,0)");
          }
          var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
          if (hasLinearGradient) {
            this._strokeLinearGradient(shape);
          } else {
            this.setAttr("strokeStyle", shape.stroke());
          }
          shape._strokeFunc(this);
          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      };
      SceneContext2.prototype._applyShadow = function(shape) {
        var util = Util_1.Util, color = util.get(shape.getShadowRGBA(), "black"), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
          x: 0,
          y: 0
        }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr("shadowColor", color);
        this.setAttr("shadowBlur", blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr("shadowOffsetX", offset.x * scaleX);
        this.setAttr("shadowOffsetY", offset.y * scaleY);
      };
      return SceneContext2;
    }(Context);
    exports.SceneContext = SceneContext;
    var HitContext = function(_super) {
      __extends(HitContext2, _super);
      function HitContext2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      HitContext2.prototype._fill = function(shape) {
        this.save();
        this.setAttr("fillStyle", shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
      };
      HitContext2.prototype.strokeShape = function(shape) {
        if (shape.hasHitStroke()) {
          this._stroke(shape);
        }
      };
      HitContext2.prototype._stroke = function(shape) {
        if (shape.hasHitStroke()) {
          var strokeScaleEnabled = shape.getStrokeScaleEnabled();
          if (!strokeScaleEnabled) {
            this.save();
            var pixelRatio = this.getCanvas().getPixelRatio();
            this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          }
          this._applyLineCap(shape);
          var hitStrokeWidth = shape.hitStrokeWidth();
          var strokeWidth = hitStrokeWidth === "auto" ? shape.strokeWidth() : hitStrokeWidth;
          this.setAttr("lineWidth", strokeWidth);
          this.setAttr("strokeStyle", shape.colorKey);
          shape._strokeFuncHit(this);
          if (!strokeScaleEnabled) {
            this.restore();
          }
        }
      };
      return HitContext2;
    }(Context);
    exports.HitContext = HitContext;
  });

  // node_modules/konva/lib/Canvas.js
  var require_Canvas = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.HitCanvas = exports.SceneCanvas = exports.Canvas = void 0;
    var Util_1 = require_Util();
    var Context_1 = require_Context();
    var Global_1 = require_Global();
    var Factory_1 = require_Factory();
    var Validators_1 = require_Validators();
    var _pixelRatio;
    function getDevicePixelRatio() {
      if (_pixelRatio) {
        return _pixelRatio;
      }
      var canvas = Util_1.Util.createCanvasElement();
      var context = canvas.getContext("2d");
      _pixelRatio = function() {
        var devicePixelRatio = Global_1.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        return devicePixelRatio / backingStoreRatio;
      }();
      return _pixelRatio;
    }
    var Canvas = function() {
      function Canvas2(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        var conf = config || {};
        var pixelRatio = conf.pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = Util_1.Util.createCanvasElement();
        this._canvas.style.padding = "0";
        this._canvas.style.margin = "0";
        this._canvas.style.border = "0";
        this._canvas.style.background = "transparent";
        this._canvas.style.position = "absolute";
        this._canvas.style.top = "0";
        this._canvas.style.left = "0";
      }
      Canvas2.prototype.getContext = function() {
        return this.context;
      };
      Canvas2.prototype.getPixelRatio = function() {
        return this.pixelRatio;
      };
      Canvas2.prototype.setPixelRatio = function(pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
      };
      Canvas2.prototype.setWidth = function(width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + "px";
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
      };
      Canvas2.prototype.setHeight = function(height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + "px";
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
      };
      Canvas2.prototype.getWidth = function() {
        return this.width;
      };
      Canvas2.prototype.getHeight = function() {
        return this.height;
      };
      Canvas2.prototype.setSize = function(width, height) {
        this.setWidth(width || 0);
        this.setHeight(height || 0);
      };
      Canvas2.prototype.toDataURL = function(mimeType, quality) {
        try {
          return this._canvas.toDataURL(mimeType, quality);
        } catch (e2) {
          try {
            return this._canvas.toDataURL();
          } catch (err) {
            Util_1.Util.error("Unable to get data URL. " + err.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.");
            return "";
          }
        }
      };
      return Canvas2;
    }();
    exports.Canvas = Canvas;
    Factory_1.Factory.addGetterSetter(Canvas, "pixelRatio", void 0, Validators_1.getNumberValidator());
    var SceneCanvas = function(_super) {
      __extends(SceneCanvas2, _super);
      function SceneCanvas2(config) {
        if (config === void 0) {
          config = {width: 0, height: 0};
        }
        var _this = _super.call(this, config) || this;
        _this.context = new Context_1.SceneContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
      }
      return SceneCanvas2;
    }(Canvas);
    exports.SceneCanvas = SceneCanvas;
    var HitCanvas = function(_super) {
      __extends(HitCanvas2, _super);
      function HitCanvas2(config) {
        if (config === void 0) {
          config = {width: 0, height: 0};
        }
        var _this = _super.call(this, config) || this;
        _this.hitCanvas = true;
        _this.context = new Context_1.HitContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
      }
      return HitCanvas2;
    }(Canvas);
    exports.HitCanvas = HitCanvas;
  });

  // node_modules/konva/lib/DragAndDrop.js
  var require_DragAndDrop = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.DD = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    exports.DD = {
      get isDragging() {
        var flag = false;
        exports.DD._dragElements.forEach(function(elem) {
          if (elem.dragStatus === "dragging") {
            flag = true;
          }
        });
        return flag;
      },
      justDragged: false,
      get node() {
        var node;
        exports.DD._dragElements.forEach(function(elem) {
          node = elem.node;
        });
        return node;
      },
      _dragElements: new Map(),
      _drag: function(evt) {
        var nodesToFireEvents = [];
        exports.DD._dragElements.forEach(function(elem, key) {
          var node = elem.node;
          var stage = node.getStage();
          stage.setPointersPositions(evt);
          if (elem.pointerId === void 0) {
            elem.pointerId = Util_1.Util._getFirstPointerId(evt);
          }
          var pos = stage._changedPointerPositions.find(function(pos2) {
            return pos2.id === elem.pointerId;
          });
          if (!pos) {
            return;
          }
          if (elem.dragStatus !== "dragging") {
            var dragDistance = node.dragDistance();
            var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
            if (distance < dragDistance) {
              return;
            }
            node.startDrag({evt});
            if (!node.isDragging()) {
              return;
            }
          }
          node._setDragPosition(evt, elem);
          nodesToFireEvents.push(node);
        });
        nodesToFireEvents.forEach(function(node) {
          node.fire("dragmove", {
            type: "dragmove",
            target: node,
            evt
          }, true);
        });
      },
      _endDragBefore: function(evt) {
        exports.DD._dragElements.forEach(function(elem, key) {
          var node = elem.node;
          var stage = node.getStage();
          if (evt) {
            stage.setPointersPositions(evt);
          }
          var pos = stage._changedPointerPositions.find(function(pos2) {
            return pos2.id === elem.pointerId;
          });
          if (!pos) {
            return;
          }
          if (elem.dragStatus === "dragging" || elem.dragStatus === "stopped") {
            exports.DD.justDragged = true;
            Global_1.Konva.listenClickTap = false;
            elem.dragStatus = "stopped";
          }
          var drawNode = elem.node.getLayer() || elem.node instanceof Global_1.Konva["Stage"] && elem.node;
          if (drawNode) {
            drawNode.batchDraw();
          }
        });
      },
      _endDragAfter: function(evt) {
        exports.DD._dragElements.forEach(function(elem, key) {
          if (elem.dragStatus === "stopped") {
            elem.node.fire("dragend", {
              type: "dragend",
              target: elem.node,
              evt
            }, true);
          }
          if (elem.dragStatus !== "dragging") {
            exports.DD._dragElements.delete(key);
          }
        });
      }
    };
    if (Global_1.Konva.isBrowser) {
      window.addEventListener("mouseup", exports.DD._endDragBefore, true);
      window.addEventListener("touchend", exports.DD._endDragBefore, true);
      window.addEventListener("mousemove", exports.DD._drag);
      window.addEventListener("touchmove", exports.DD._drag);
      window.addEventListener("mouseup", exports.DD._endDragAfter, false);
      window.addEventListener("touchend", exports.DD._endDragAfter, false);
    }
  });

  // node_modules/konva/lib/Node.js
  var require_Node = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Node = exports._removeName = exports._addName = exports._removeId = exports.names = exports.ids = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Canvas_1 = require_Canvas();
    var Global_1 = require_Global();
    var DragAndDrop_1 = require_DragAndDrop();
    var Validators_1 = require_Validators();
    exports.ids = {};
    exports.names = {};
    var _addId = function(node, id) {
      if (!id) {
        return;
      }
      exports.ids[id] = node;
    };
    var _removeId = function(id, node) {
      if (!id) {
        return;
      }
      if (exports.ids[id] !== node) {
        return;
      }
      delete exports.ids[id];
    };
    exports._removeId = _removeId;
    var _addName = function(node, name) {
      if (name) {
        if (!exports.names[name]) {
          exports.names[name] = [];
        }
        exports.names[name].push(node);
      }
    };
    exports._addName = _addName;
    var _removeName = function(name, _id) {
      if (!name) {
        return;
      }
      var nodes = exports.names[name];
      if (!nodes) {
        return;
      }
      for (var n2 = 0; n2 < nodes.length; n2++) {
        var no = nodes[n2];
        if (no._id === _id) {
          nodes.splice(n2, 1);
        }
      }
      if (nodes.length === 0) {
        delete exports.names[name];
      }
    };
    exports._removeName = _removeName;
    var ABSOLUTE_OPACITY = "absoluteOpacity";
    var ALL_LISTENERS = "allEventListeners";
    var ABSOLUTE_TRANSFORM = "absoluteTransform";
    var ABSOLUTE_SCALE = "absoluteScale";
    var CANVAS = "canvas";
    var CHANGE = "Change";
    var CHILDREN = "children";
    var KONVA = "konva";
    var LISTENING = "listening";
    var MOUSEENTER = "mouseenter";
    var MOUSELEAVE = "mouseleave";
    var NAME = "name";
    var SET = "set";
    var SHAPE = "Shape";
    var SPACE = " ";
    var STAGE = "stage";
    var TRANSFORM = "transform";
    var UPPER_STAGE = "Stage";
    var VISIBLE = "visible";
    var TRANSFORM_CHANGE_STR = [
      "xChange.konva",
      "yChange.konva",
      "scaleXChange.konva",
      "scaleYChange.konva",
      "skewXChange.konva",
      "skewYChange.konva",
      "rotationChange.konva",
      "offsetXChange.konva",
      "offsetYChange.konva",
      "transformsEnabledChange.konva"
    ].join(SPACE);
    var SCALE_CHANGE_STR = ["scaleXChange.konva", "scaleYChange.konva"].join(SPACE);
    var emptyChildren = new Util_1.Collection();
    var idCounter = 1;
    var Node = function() {
      function Node2(config) {
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this._allEventListeners = null;
        this.parent = null;
        this._cache = new Map();
        this._attachedDepsListeners = new Map();
        this._lastPos = null;
        this._batchingTransformChange = false;
        this._needClearTransformCache = false;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this.children = emptyChildren;
        this._dragEventId = null;
        this._shouldFireChangeEvents = false;
        this.setAttrs(config);
        this._shouldFireChangeEvents = true;
      }
      Node2.prototype.hasChildren = function() {
        return false;
      };
      Node2.prototype.getChildren = function() {
        return emptyChildren;
      };
      Node2.prototype._clearCache = function(attr) {
        if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache.get(attr)) {
          this._cache.get(attr).dirty = true;
        } else if (attr) {
          this._cache.delete(attr);
        } else {
          this._cache.clear();
        }
      };
      Node2.prototype._getCache = function(attr, privateGetter) {
        var cache = this._cache.get(attr);
        var isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
        var invalid = cache === void 0 || isTransform && cache.dirty === true;
        if (invalid) {
          cache = privateGetter.call(this);
          this._cache.set(attr, cache);
        }
        return cache;
      };
      Node2.prototype._calculate = function(name, deps, getter) {
        var _this = this;
        if (!this._attachedDepsListeners.get(name)) {
          var depsString = deps.map(function(dep) {
            return dep + "Change.konva";
          }).join(SPACE);
          this.on(depsString, function() {
            _this._clearCache(name);
          });
          this._attachedDepsListeners.set(name, true);
        }
        return this._getCache(name, getter);
      };
      Node2.prototype._getCanvasCache = function() {
        return this._cache.get(CANVAS);
      };
      Node2.prototype._clearSelfAndDescendantCache = function(attr, forceEvent) {
        this._clearCache(attr);
        if (forceEvent && attr === ABSOLUTE_TRANSFORM) {
          this.fire("_clearTransformCache");
        }
        if (this.isCached()) {
          return;
        }
        if (this.children) {
          this.children.each(function(node) {
            node._clearSelfAndDescendantCache(attr, true);
          });
        }
      };
      Node2.prototype.clearCache = function() {
        this._cache.delete(CANVAS);
        this._clearSelfAndDescendantCache();
        return this;
      };
      Node2.prototype.cache = function(config) {
        var conf = config || {};
        var rect = {};
        if (conf.x === void 0 || conf.y === void 0 || conf.width === void 0 || conf.height === void 0) {
          rect = this.getClientRect({
            skipTransform: true,
            relativeTo: this.getParent()
          });
        }
        var width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x2 = conf.x === void 0 ? rect.x : conf.x, y2 = conf.y === void 0 ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
        if (!width || !height) {
          Util_1.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
          return;
        }
        width += offset * 2;
        height += offset * 2;
        x2 -= offset;
        y2 -= offset;
        var cachedSceneCanvas = new Canvas_1.SceneCanvas({
          pixelRatio,
          width,
          height
        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
          pixelRatio,
          width: 0,
          height: 0
        }), cachedHitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: 1,
          width,
          height
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        cachedSceneCanvas.isCache = true;
        this._cache.delete("canvas");
        this._filterUpToDate = false;
        if (conf.imageSmoothingEnabled === false) {
          cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
          cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
        }
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x2, -y2);
        hitContext.translate(-x2, -y2);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this);
        this.drawHit(cachedHitCanvas, this);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
          sceneContext.save();
          sceneContext.beginPath();
          sceneContext.rect(0, 0, width, height);
          sceneContext.closePath();
          sceneContext.setAttr("strokeStyle", "red");
          sceneContext.setAttr("lineWidth", 5);
          sceneContext.stroke();
          sceneContext.restore();
        }
        this._cache.set(CANVAS, {
          scene: cachedSceneCanvas,
          filter: cachedFilterCanvas,
          hit: cachedHitCanvas,
          x: x2,
          y: y2
        });
        return this;
      };
      Node2.prototype.isCached = function() {
        return this._cache.has("canvas");
      };
      Node2.prototype.getClientRect = function(config) {
        throw new Error('abstract "getClientRect" method call');
      };
      Node2.prototype._transformedRect = function(rect, top) {
        var points = [
          {x: rect.x, y: rect.y},
          {x: rect.x + rect.width, y: rect.y},
          {x: rect.x + rect.width, y: rect.y + rect.height},
          {x: rect.x, y: rect.y + rect.height}
        ];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function(point) {
          var transformed = trans.point(point);
          if (minX === void 0) {
            minX = maxX = transformed.x;
            minY = maxY = transformed.y;
          }
          minX = Math.min(minX, transformed.x);
          minY = Math.min(minY, transformed.y);
          maxX = Math.max(maxX, transformed.x);
          maxY = Math.max(maxY, transformed.y);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      };
      Node2.prototype._drawCachedSceneCanvas = function(context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        var canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        var cacheCanvas = this._getCachedSceneCanvas();
        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
      };
      Node2.prototype._drawCachedHitCanvas = function(context) {
        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0);
        context.restore();
      };
      Node2.prototype._getCachedSceneCanvas = function() {
        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n2, filter;
        if (filters) {
          if (!this._filterUpToDate) {
            var ratio = sceneCanvas.pixelRatio;
            filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);
            try {
              len = filters.length;
              filterContext.clear();
              filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
              imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
              for (n2 = 0; n2 < len; n2++) {
                filter = filters[n2];
                if (typeof filter !== "function") {
                  Util_1.Util.error("Filter should be type of function, but got " + typeof filter + " instead. Please check correct filters");
                  continue;
                }
                filter.call(this, imageData);
                filterContext.putImageData(imageData, 0, 0);
              }
            } catch (e2) {
              Util_1.Util.error("Unable to apply filter. " + e2.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
            }
            this._filterUpToDate = true;
          }
          return filterCanvas;
        }
        return sceneCanvas;
      };
      Node2.prototype.on = function(evtStr, handler) {
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (arguments.length === 3) {
          return this._delegate.apply(this, arguments);
        }
        var events = evtStr.split(SPACE), len = events.length, n2, event, parts, baseEvent, name;
        for (n2 = 0; n2 < len; n2++) {
          event = events[n2];
          parts = event.split(".");
          baseEvent = parts[0];
          name = parts[1] || "";
          if (!this.eventListeners[baseEvent]) {
            this.eventListeners[baseEvent] = [];
          }
          this.eventListeners[baseEvent].push({
            name,
            handler
          });
        }
        return this;
      };
      Node2.prototype.off = function(evtStr, callback) {
        var events = (evtStr || "").split(SPACE), len = events.length, n2, t2, event, parts, baseEvent, name;
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (!evtStr) {
          for (t2 in this.eventListeners) {
            this._off(t2);
          }
        }
        for (n2 = 0; n2 < len; n2++) {
          event = events[n2];
          parts = event.split(".");
          baseEvent = parts[0];
          name = parts[1];
          if (baseEvent) {
            if (this.eventListeners[baseEvent]) {
              this._off(baseEvent, name, callback);
            }
          } else {
            for (t2 in this.eventListeners) {
              this._off(t2, name, callback);
            }
          }
        }
        return this;
      };
      Node2.prototype.dispatchEvent = function(evt) {
        var e2 = {
          target: this,
          type: evt.type,
          evt
        };
        this.fire(evt.type, e2);
        return this;
      };
      Node2.prototype.addEventListener = function(type, handler) {
        this.on(type, function(evt) {
          handler.call(this, evt.evt);
        });
        return this;
      };
      Node2.prototype.removeEventListener = function(type) {
        this.off(type);
        return this;
      };
      Node2.prototype._delegate = function(event, selector, handler) {
        var stopNode = this;
        this.on(event, function(evt) {
          var targets = evt.target.findAncestors(selector, true, stopNode);
          for (var i2 = 0; i2 < targets.length; i2++) {
            evt = Util_1.Util.cloneObject(evt);
            evt.currentTarget = targets[i2];
            handler.call(targets[i2], evt);
          }
        });
      };
      Node2.prototype.remove = function() {
        if (this.isDragging()) {
          this.stopDrag();
        }
        DragAndDrop_1.DD._dragElements.delete(this._id);
        this._remove();
        return this;
      };
      Node2.prototype._clearCaches = function() {
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
      };
      Node2.prototype._remove = function() {
        this._clearCaches();
        var parent = this.getParent();
        if (parent && parent.children) {
          parent.children.splice(this.index, 1);
          parent._setChildrenIndices();
          this.parent = null;
        }
      };
      Node2.prototype.destroy = function() {
        exports._removeId(this.id(), this);
        var names = (this.name() || "").split(/\s/g);
        for (var i2 = 0; i2 < names.length; i2++) {
          var subname = names[i2];
          exports._removeName(subname, this._id);
        }
        this.remove();
        return this;
      };
      Node2.prototype.getAttr = function(attr) {
        var method = "get" + Util_1.Util._capitalize(attr);
        if (Util_1.Util._isFunction(this[method])) {
          return this[method]();
        }
        return this.attrs[attr];
      };
      Node2.prototype.getAncestors = function() {
        var parent = this.getParent(), ancestors = new Util_1.Collection();
        while (parent) {
          ancestors.push(parent);
          parent = parent.getParent();
        }
        return ancestors;
      };
      Node2.prototype.getAttrs = function() {
        return this.attrs || {};
      };
      Node2.prototype.setAttrs = function(config) {
        var _this = this;
        this._batchTransformChanges(function() {
          var key, method;
          if (!config) {
            return _this;
          }
          for (key in config) {
            if (key === CHILDREN) {
              continue;
            }
            method = SET + Util_1.Util._capitalize(key);
            if (Util_1.Util._isFunction(_this[method])) {
              _this[method](config[key]);
            } else {
              _this._setAttr(key, config[key]);
            }
          }
        });
        return this;
      };
      Node2.prototype.isListening = function() {
        return this._getCache(LISTENING, this._isListening);
      };
      Node2.prototype._isListening = function(relativeTo) {
        var listening = this.listening();
        if (!listening) {
          return false;
        }
        var parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isListening(relativeTo);
        } else {
          return true;
        }
      };
      Node2.prototype.isVisible = function() {
        return this._getCache(VISIBLE, this._isVisible);
      };
      Node2.prototype._isVisible = function(relativeTo) {
        var visible = this.visible();
        if (!visible) {
          return false;
        }
        var parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
          return parent._isVisible(relativeTo);
        } else {
          return true;
        }
      };
      Node2.prototype.shouldDrawHit = function(top, skipDragCheck) {
        if (skipDragCheck === void 0) {
          skipDragCheck = false;
        }
        if (top) {
          return this._isVisible(top) && this._isListening(top);
        }
        var layer = this.getLayer();
        var layerUnderDrag = false;
        DragAndDrop_1.DD._dragElements.forEach(function(elem) {
          if (elem.dragStatus !== "dragging") {
            return;
          } else if (elem.node.nodeType === "Stage") {
            layerUnderDrag = true;
          } else if (elem.node.getLayer() === layer) {
            layerUnderDrag = true;
          }
        });
        var dragSkip = !skipDragCheck && !Global_1.Konva.hitOnDragEnabled && layerUnderDrag;
        return this.isListening() && this.isVisible() && !dragSkip;
      };
      Node2.prototype.show = function() {
        this.visible(true);
        return this;
      };
      Node2.prototype.hide = function() {
        this.visible(false);
        return this;
      };
      Node2.prototype.getZIndex = function() {
        return this.index || 0;
      };
      Node2.prototype.getAbsoluteZIndex = function() {
        var depth = this.getDepth(), that = this, index = 0, nodes, len, n2, child;
        function addChildren(children) {
          nodes = [];
          len = children.length;
          for (n2 = 0; n2 < len; n2++) {
            child = children[n2];
            index++;
            if (child.nodeType !== SHAPE) {
              nodes = nodes.concat(child.getChildren().toArray());
            }
            if (child._id === that._id) {
              n2 = len;
            }
          }
          if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
            addChildren(nodes);
          }
        }
        if (that.nodeType !== UPPER_STAGE) {
          addChildren(that.getStage().getChildren());
        }
        return index;
      };
      Node2.prototype.getDepth = function() {
        var depth = 0, parent = this.parent;
        while (parent) {
          depth++;
          parent = parent.parent;
        }
        return depth;
      };
      Node2.prototype._batchTransformChanges = function(func) {
        this._batchingTransformChange = true;
        func();
        this._batchingTransformChange = false;
        if (this._needClearTransformCache) {
          this._clearCache(TRANSFORM);
          this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM, true);
        }
        this._needClearTransformCache = false;
      };
      Node2.prototype.setPosition = function(pos) {
        var _this = this;
        this._batchTransformChanges(function() {
          _this.x(pos.x);
          _this.y(pos.y);
        });
        return this;
      };
      Node2.prototype.getPosition = function() {
        return {
          x: this.x(),
          y: this.y()
        };
      };
      Node2.prototype.getAbsolutePosition = function(top) {
        var haveCachedParent = false;
        var parent = this.parent;
        while (parent) {
          if (parent.isCached()) {
            haveCachedParent = true;
            break;
          }
          parent = parent.parent;
        }
        if (haveCachedParent && !top) {
          top = true;
        }
        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
      };
      Node2.prototype.setAbsolutePosition = function(pos) {
        var origTrans = this._clearTransform();
        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;
        this._clearCache(TRANSFORM);
        var it = this._getAbsoluteTransform().copy();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
          x: this.attrs.x + it.getTranslation().x,
          y: this.attrs.y + it.getTranslation().y
        };
        this._setTransform(origTrans);
        this.setPosition({x: pos.x, y: pos.y});
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return this;
      };
      Node2.prototype._setTransform = function(trans) {
        var key;
        for (key in trans) {
          this.attrs[key] = trans[key];
        }
      };
      Node2.prototype._clearTransform = function() {
        var trans = {
          x: this.x(),
          y: this.y(),
          rotation: this.rotation(),
          scaleX: this.scaleX(),
          scaleY: this.scaleY(),
          offsetX: this.offsetX(),
          offsetY: this.offsetY(),
          skewX: this.skewX(),
          skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        return trans;
      };
      Node2.prototype.move = function(change) {
        var changeX = change.x, changeY = change.y, x2 = this.x(), y2 = this.y();
        if (changeX !== void 0) {
          x2 += changeX;
        }
        if (changeY !== void 0) {
          y2 += changeY;
        }
        this.setPosition({x: x2, y: y2});
        return this;
      };
      Node2.prototype._eachAncestorReverse = function(func, top) {
        var family = [], parent = this.getParent(), len, n2;
        if (top && top._id === this._id) {
          return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
          family.unshift(parent);
          parent = parent.parent;
        }
        len = family.length;
        for (n2 = 0; n2 < len; n2++) {
          func(family[n2]);
        }
      };
      Node2.prototype.rotate = function(theta) {
        this.rotation(this.rotation() + theta);
        return this;
      };
      Node2.prototype.moveToTop = function() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveToTop function is ignored.");
          return false;
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.push(this);
        this.parent._setChildrenIndices();
        return true;
      };
      Node2.prototype.moveUp = function() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveUp function is ignored.");
          return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index + 1, 0, this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      };
      Node2.prototype.moveDown = function() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveDown function is ignored.");
          return false;
        }
        var index = this.index;
        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.splice(index - 1, 0, this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      };
      Node2.prototype.moveToBottom = function() {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. moveToBottom function is ignored.");
          return false;
        }
        var index = this.index;
        if (index > 0) {
          this.parent.children.splice(index, 1);
          this.parent.children.unshift(this);
          this.parent._setChildrenIndices();
          return true;
        }
        return false;
      };
      Node2.prototype.setZIndex = function(zIndex) {
        if (!this.parent) {
          Util_1.Util.warn("Node has no parent. zIndex parameter is ignored.");
          return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
          Util_1.Util.warn("Unexpected value " + zIndex + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
      };
      Node2.prototype.getAbsoluteOpacity = function() {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
      };
      Node2.prototype._getAbsoluteOpacity = function() {
        var absOpacity = this.opacity();
        var parent = this.getParent();
        if (parent && !parent._isUnderCache) {
          absOpacity *= parent.getAbsoluteOpacity();
        }
        return absOpacity;
      };
      Node2.prototype.moveTo = function(newContainer) {
        if (this.getParent() !== newContainer) {
          this._remove();
          newContainer.add(this);
        }
        return this;
      };
      Node2.prototype.toObject = function() {
        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        obj.attrs = {};
        for (key in attrs) {
          val = attrs[key];
          nonPlainObject = Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
          if (nonPlainObject) {
            continue;
          }
          getter = typeof this[key] === "function" && this[key];
          delete attrs[key];
          defaultValue = getter ? getter.call(this) : null;
          attrs[key] = val;
          if (defaultValue !== val) {
            obj.attrs[key] = val;
          }
        }
        obj.className = this.getClassName();
        return Util_1.Util._prepareToStringify(obj);
      };
      Node2.prototype.toJSON = function() {
        return JSON.stringify(this.toObject());
      };
      Node2.prototype.getParent = function() {
        return this.parent;
      };
      Node2.prototype.findAncestors = function(selector, includeSelf, stopNode) {
        var res = [];
        if (includeSelf && this._isMatch(selector)) {
          res.push(this);
        }
        var ancestor = this.parent;
        while (ancestor) {
          if (ancestor === stopNode) {
            return res;
          }
          if (ancestor._isMatch(selector)) {
            res.push(ancestor);
          }
          ancestor = ancestor.parent;
        }
        return res;
      };
      Node2.prototype.isAncestorOf = function(node) {
        return false;
      };
      Node2.prototype.findAncestor = function(selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
      };
      Node2.prototype._isMatch = function(selector) {
        if (!selector) {
          return false;
        }
        if (typeof selector === "function") {
          return selector(this);
        }
        var selectorArr = selector.replace(/ /g, "").split(","), len = selectorArr.length, n2, sel;
        for (n2 = 0; n2 < len; n2++) {
          sel = selectorArr[n2];
          if (!Util_1.Util.isValidSelector(sel)) {
            Util_1.Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
            Util_1.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
            Util_1.Util.warn("Konva is awesome, right?");
          }
          if (sel.charAt(0) === "#") {
            if (this.id() === sel.slice(1)) {
              return true;
            }
          } else if (sel.charAt(0) === ".") {
            if (this.hasName(sel.slice(1))) {
              return true;
            }
          } else if (this.className === sel || this.nodeType === sel) {
            return true;
          }
        }
        return false;
      };
      Node2.prototype.getLayer = function() {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
      };
      Node2.prototype.getStage = function() {
        return this._getCache(STAGE, this._getStage);
      };
      Node2.prototype._getStage = function() {
        var parent = this.getParent();
        if (parent) {
          return parent.getStage();
        } else {
          return void 0;
        }
      };
      Node2.prototype.fire = function(eventType, evt, bubble) {
        if (evt === void 0) {
          evt = {};
        }
        evt.target = evt.target || this;
        if (bubble) {
          this._fireAndBubble(eventType, evt);
        } else {
          this._fire(eventType, evt);
        }
        return this;
      };
      Node2.prototype.getAbsoluteTransform = function(top) {
        if (top) {
          return this._getAbsoluteTransform(top);
        } else {
          return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
      };
      Node2.prototype._getAbsoluteTransform = function(top) {
        var at;
        if (top) {
          at = new Util_1.Transform();
          this._eachAncestorReverse(function(node) {
            var transformsEnabled2 = node.transformsEnabled();
            if (transformsEnabled2 === "all") {
              at.multiply(node.getTransform());
            } else if (transformsEnabled2 === "position") {
              at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
            }
          }, top);
          return at;
        } else {
          at = this._cache.get(ABSOLUTE_TRANSFORM) || new Util_1.Transform();
          if (this.parent) {
            this.parent.getAbsoluteTransform().copyInto(at);
          } else {
            at.reset();
          }
          var transformsEnabled = this.transformsEnabled();
          if (transformsEnabled === "all") {
            at.multiply(this.getTransform());
          } else if (transformsEnabled === "position") {
            var x2 = this.attrs.x || 0;
            var y2 = this.attrs.y || 0;
            var offsetX = this.attrs.offsetX || 0;
            var offsetY = this.attrs.offsetY || 0;
            at.translate(x2 - offsetX, y2 - offsetY);
          }
          at.dirty = false;
          return at;
        }
      };
      Node2.prototype.getAbsoluteScale = function(top) {
        var parent = this;
        while (parent) {
          if (parent._isUnderCache) {
            top = parent;
          }
          parent = parent.getParent();
        }
        var transform = this.getAbsoluteTransform(top);
        var attrs = transform.decompose();
        return {
          x: attrs.scaleX,
          y: attrs.scaleY
        };
      };
      Node2.prototype.getAbsoluteRotation = function() {
        return this.getAbsoluteTransform().decompose().rotation;
      };
      Node2.prototype.getTransform = function() {
        return this._getCache(TRANSFORM, this._getTransform);
      };
      Node2.prototype._getTransform = function() {
        var _a, _b;
        var m2 = this._cache.get(TRANSFORM) || new Util_1.Transform();
        m2.reset();
        var x2 = this.x(), y2 = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
        if (x2 !== 0 || y2 !== 0) {
          m2.translate(x2, y2);
        }
        if (rotation !== 0) {
          m2.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
          m2.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
          m2.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
          m2.translate(-1 * offsetX, -1 * offsetY);
        }
        m2.dirty = false;
        return m2;
      };
      Node2.prototype.clone = function(obj) {
        var attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n2, listener;
        for (key in obj) {
          attrs[key] = obj[key];
        }
        var node = new this.constructor(attrs);
        for (key in this.eventListeners) {
          allListeners = this.eventListeners[key];
          len = allListeners.length;
          for (n2 = 0; n2 < len; n2++) {
            listener = allListeners[n2];
            if (listener.name.indexOf(KONVA) < 0) {
              if (!node.eventListeners[key]) {
                node.eventListeners[key] = [];
              }
              node.eventListeners[key].push(listener);
            }
          }
        }
        return node;
      };
      Node2.prototype._toKonvaCanvas = function(config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(), x2 = config.x !== void 0 ? config.x : box.x, y2 = config.y !== void 0 ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
          width: config.width || box.width || (stage ? stage.width() : 0),
          height: config.height || box.height || (stage ? stage.height() : 0),
          pixelRatio
        }), context = canvas.getContext();
        context.save();
        if (x2 || y2) {
          context.translate(-1 * x2, -1 * y2);
        }
        this.drawScene(canvas);
        context.restore();
        return canvas;
      };
      Node2.prototype.toCanvas = function(config) {
        return this._toKonvaCanvas(config)._canvas;
      };
      Node2.prototype.toDataURL = function(config) {
        config = config || {};
        var mimeType = config.mimeType || null, quality = config.quality || null;
        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
          config.callback(url);
        }
        return url;
      };
      Node2.prototype.toImage = function(config) {
        if (!config || !config.callback) {
          throw "callback required for toImage method config argument";
        }
        var callback = config.callback;
        delete config.callback;
        Util_1.Util._urlToImage(this.toDataURL(config), function(img) {
          callback(img);
        });
      };
      Node2.prototype.setSize = function(size) {
        this.width(size.width);
        this.height(size.height);
        return this;
      };
      Node2.prototype.getSize = function() {
        return {
          width: this.width(),
          height: this.height()
        };
      };
      Node2.prototype.getClassName = function() {
        return this.className || this.nodeType;
      };
      Node2.prototype.getType = function() {
        return this.nodeType;
      };
      Node2.prototype.getDragDistance = function() {
        if (this.attrs.dragDistance !== void 0) {
          return this.attrs.dragDistance;
        } else if (this.parent) {
          return this.parent.getDragDistance();
        } else {
          return Global_1.Konva.dragDistance;
        }
      };
      Node2.prototype._off = function(type, name, callback) {
        var evtListeners = this.eventListeners[type], i2, evtName, handler;
        for (i2 = 0; i2 < evtListeners.length; i2++) {
          evtName = evtListeners[i2].name;
          handler = evtListeners[i2].handler;
          if ((evtName !== "konva" || name === "konva") && (!name || evtName === name) && (!callback || callback === handler)) {
            evtListeners.splice(i2, 1);
            if (evtListeners.length === 0) {
              delete this.eventListeners[type];
              break;
            }
            i2--;
          }
        }
      };
      Node2.prototype._fireChangeEvent = function(attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
          oldVal,
          newVal
        });
      };
      Node2.prototype.setId = function(id) {
        var oldId = this.id();
        exports._removeId(oldId, this);
        _addId(this, id);
        this._setAttr("id", id);
        return this;
      };
      Node2.prototype.setName = function(name) {
        var oldNames = (this.name() || "").split(/\s/g);
        var newNames = (name || "").split(/\s/g);
        var subname, i2;
        for (i2 = 0; i2 < oldNames.length; i2++) {
          subname = oldNames[i2];
          if (newNames.indexOf(subname) === -1 && subname) {
            exports._removeName(subname, this._id);
          }
        }
        for (i2 = 0; i2 < newNames.length; i2++) {
          subname = newNames[i2];
          if (oldNames.indexOf(subname) === -1 && subname) {
            exports._addName(this, subname);
          }
        }
        this._setAttr(NAME, name);
        return this;
      };
      Node2.prototype.addName = function(name) {
        if (!this.hasName(name)) {
          var oldName = this.name();
          var newName = oldName ? oldName + " " + name : name;
          this.setName(newName);
        }
        return this;
      };
      Node2.prototype.hasName = function(name) {
        if (!name) {
          return false;
        }
        var fullName = this.name();
        if (!fullName) {
          return false;
        }
        var names = (fullName || "").split(/\s/g);
        return names.indexOf(name) !== -1;
      };
      Node2.prototype.removeName = function(name) {
        var names = (this.name() || "").split(/\s/g);
        var index = names.indexOf(name);
        if (index !== -1) {
          names.splice(index, 1);
          this.setName(names.join(" "));
        }
        return this;
      };
      Node2.prototype.setAttr = function(attr, val) {
        var func = this[SET + Util_1.Util._capitalize(attr)];
        if (Util_1.Util._isFunction(func)) {
          func.call(this, val);
        } else {
          this._setAttr(attr, val);
        }
        return this;
      };
      Node2.prototype._setAttr = function(key, val, skipFire) {
        if (skipFire === void 0) {
          skipFire = false;
        }
        var oldVal = this.attrs[key];
        if (oldVal === val && !Util_1.Util.isObject(val)) {
          return;
        }
        if (val === void 0 || val === null) {
          delete this.attrs[key];
        } else {
          this.attrs[key] = val;
        }
        if (this._shouldFireChangeEvents) {
          this._fireChangeEvent(key, oldVal, val);
        }
      };
      Node2.prototype._setComponentAttr = function(key, component, val) {
        var oldVal;
        if (val !== void 0) {
          oldVal = this.attrs[key];
          if (!oldVal) {
            this.attrs[key] = this.getAttr(key);
          }
          this.attrs[key][component] = val;
          this._fireChangeEvent(key, oldVal, val);
        }
      };
      Node2.prototype._fireAndBubble = function(eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
          evt.target = this;
        }
        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === "Stage" && !compareShape);
        if (!shouldStop) {
          this._fire(eventType, evt);
          var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);
          if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) {
            if (compareShape && compareShape.parent) {
              this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
            } else {
              this._fireAndBubble.call(this.parent, eventType, evt);
            }
          }
        }
      };
      Node2.prototype._getProtoListeners = function(eventType) {
        var listeners = this._cache.get(ALL_LISTENERS);
        if (!listeners) {
          listeners = {};
          var obj = Object.getPrototypeOf(this);
          while (obj) {
            if (!obj.eventListeners) {
              obj = Object.getPrototypeOf(obj);
              continue;
            }
            for (var event in obj.eventListeners) {
              var newEvents = obj.eventListeners[event];
              var oldEvents = listeners[event] || [];
              listeners[event] = newEvents.concat(oldEvents);
            }
            obj = Object.getPrototypeOf(obj);
          }
          this._cache.set(ALL_LISTENERS, listeners);
        }
        return listeners[eventType];
      };
      Node2.prototype._fire = function(eventType, evt) {
        evt = evt || {};
        evt.currentTarget = this;
        evt.type = eventType;
        var topListeners = this._getProtoListeners(eventType);
        if (topListeners) {
          for (var i2 = 0; i2 < topListeners.length; i2++) {
            topListeners[i2].handler.call(this, evt);
          }
        }
        var selfListeners = this.eventListeners[eventType];
        if (selfListeners) {
          for (var i2 = 0; i2 < selfListeners.length; i2++) {
            selfListeners[i2].handler.call(this, evt);
          }
        }
      };
      Node2.prototype.draw = function() {
        this.drawScene();
        this.drawHit();
        return this;
      };
      Node2.prototype._createDragElement = function(evt) {
        var pointerId = evt ? evt.pointerId : void 0;
        var stage = this.getStage();
        var ap = this.getAbsolutePosition();
        var pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;
        DragAndDrop_1.DD._dragElements.set(this._id, {
          node: this,
          startPointerPos: pos,
          offset: {
            x: pos.x - ap.x,
            y: pos.y - ap.y
          },
          dragStatus: "ready",
          pointerId
        });
      };
      Node2.prototype.startDrag = function(evt, bubbleEvent) {
        if (bubbleEvent === void 0) {
          bubbleEvent = true;
        }
        if (!DragAndDrop_1.DD._dragElements.has(this._id)) {
          this._createDragElement(evt);
        }
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        elem.dragStatus = "dragging";
        this.fire("dragstart", {
          type: "dragstart",
          target: this,
          evt: evt && evt.evt
        }, bubbleEvent);
      };
      Node2.prototype._setDragPosition = function(evt, elem) {
        var pos = this.getStage()._getPointerById(elem.pointerId);
        if (!pos) {
          return;
        }
        var newNodePos = {
          x: pos.x - elem.offset.x,
          y: pos.y - elem.offset.y
        };
        var dbf = this.dragBoundFunc();
        if (dbf !== void 0) {
          var bounded = dbf.call(this, newNodePos, evt);
          if (!bounded) {
            Util_1.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
          } else {
            newNodePos = bounded;
          }
        }
        if (!this._lastPos || this._lastPos.x !== newNodePos.x || this._lastPos.y !== newNodePos.y) {
          this.setAbsolutePosition(newNodePos);
          if (this.getLayer()) {
            this.getLayer().batchDraw();
          } else if (this.getStage()) {
            this.getStage().batchDraw();
          }
        }
        this._lastPos = newNodePos;
      };
      Node2.prototype.stopDrag = function(evt) {
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        if (elem) {
          elem.dragStatus = "stopped";
        }
        DragAndDrop_1.DD._endDragBefore(evt);
        DragAndDrop_1.DD._endDragAfter(evt);
      };
      Node2.prototype.setDraggable = function(draggable) {
        this._setAttr("draggable", draggable);
        this._dragChange();
      };
      Node2.prototype.isDragging = function() {
        var elem = DragAndDrop_1.DD._dragElements.get(this._id);
        return elem ? elem.dragStatus === "dragging" : false;
      };
      Node2.prototype._listenDrag = function() {
        this._dragCleanup();
        this.on("mousedown.konva touchstart.konva", function(evt) {
          var _this = this;
          var shouldCheckButton = evt.evt["button"] !== void 0;
          var canDrag = !shouldCheckButton || Global_1.Konva.dragButtons.indexOf(evt.evt["button"]) >= 0;
          if (!canDrag) {
            return;
          }
          if (this.isDragging()) {
            return;
          }
          var hasDraggingChild = false;
          DragAndDrop_1.DD._dragElements.forEach(function(elem) {
            if (_this.isAncestorOf(elem.node)) {
              hasDraggingChild = true;
            }
          });
          if (!hasDraggingChild) {
            this._createDragElement(evt);
          }
        });
      };
      Node2.prototype._dragChange = function() {
        if (this.attrs.draggable) {
          this._listenDrag();
        } else {
          this._dragCleanup();
          var stage = this.getStage();
          if (!stage) {
            return;
          }
          var dragElement = DragAndDrop_1.DD._dragElements.get(this._id);
          var isDragging = dragElement && dragElement.dragStatus === "dragging";
          var isReady = dragElement && dragElement.dragStatus === "ready";
          if (isDragging) {
            this.stopDrag();
          } else if (isReady) {
            DragAndDrop_1.DD._dragElements.delete(this._id);
          }
        }
      };
      Node2.prototype._dragCleanup = function() {
        this.off("mousedown.konva");
        this.off("touchstart.konva");
      };
      Node2.create = function(data, container) {
        if (Util_1.Util._isString(data)) {
          data = JSON.parse(data);
        }
        return this._createNode(data, container);
      };
      Node2._createNode = function(obj, container) {
        var className = Node2.prototype.getClassName.call(obj), children = obj.children, no, len, n2;
        if (container) {
          obj.attrs.container = container;
        }
        if (!Global_1._NODES_REGISTRY[className]) {
          Util_1.Util.warn('Can not find a node with class name "' + className + '". Fallback to "Shape".');
          className = "Shape";
        }
        var Class = Global_1._NODES_REGISTRY[className];
        no = new Class(obj.attrs);
        if (children) {
          len = children.length;
          for (n2 = 0; n2 < len; n2++) {
            no.add(Node2._createNode(children[n2]));
          }
        }
        return no;
      };
      return Node2;
    }();
    exports.Node = Node;
    Node.prototype.nodeType = "Node";
    Node.prototype._attrsAffectingSize = [];
    Node.prototype.eventListeners = {};
    Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function() {
      if (this._batchingTransformChange) {
        this._needClearTransformCache = true;
        return;
      }
      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    });
    Node.prototype.on.call(Node.prototype, "visibleChange.konva", function() {
      this._clearSelfAndDescendantCache(VISIBLE);
    });
    Node.prototype.on.call(Node.prototype, "listeningChange.konva", function() {
      this._clearSelfAndDescendantCache(LISTENING);
    });
    Node.prototype.on.call(Node.prototype, "opacityChange.konva", function() {
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
    });
    var addGetterSetter = Factory_1.Factory.addGetterSetter;
    addGetterSetter(Node, "zIndex");
    addGetterSetter(Node, "absolutePosition");
    addGetterSetter(Node, "position");
    addGetterSetter(Node, "x", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "y", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "globalCompositeOperation", "source-over", Validators_1.getStringValidator());
    addGetterSetter(Node, "opacity", 1, Validators_1.getNumberValidator());
    addGetterSetter(Node, "name", "", Validators_1.getStringValidator());
    addGetterSetter(Node, "id", "", Validators_1.getStringValidator());
    addGetterSetter(Node, "rotation", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Node, "scale", ["x", "y"]);
    addGetterSetter(Node, "scaleX", 1, Validators_1.getNumberValidator());
    addGetterSetter(Node, "scaleY", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Node, "skew", ["x", "y"]);
    addGetterSetter(Node, "skewX", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "skewY", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Node, "offset", ["x", "y"]);
    addGetterSetter(Node, "offsetX", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "offsetY", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "dragDistance", null, Validators_1.getNumberValidator());
    addGetterSetter(Node, "width", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "height", 0, Validators_1.getNumberValidator());
    addGetterSetter(Node, "listening", true, Validators_1.getBooleanValidator());
    addGetterSetter(Node, "preventDefault", true, Validators_1.getBooleanValidator());
    addGetterSetter(Node, "filters", null, function(val) {
      this._filterUpToDate = false;
      return val;
    });
    addGetterSetter(Node, "visible", true, Validators_1.getBooleanValidator());
    addGetterSetter(Node, "transformsEnabled", "all", Validators_1.getStringValidator());
    addGetterSetter(Node, "size");
    addGetterSetter(Node, "dragBoundFunc");
    addGetterSetter(Node, "draggable", false, Validators_1.getBooleanValidator());
    Factory_1.Factory.backCompat(Node, {
      rotateDeg: "rotate",
      setRotationDeg: "setRotation",
      getRotationDeg: "getRotation"
    });
    Util_1.Collection.mapMethods(Node);
  });

  // node_modules/konva/lib/Container.js
  var require_Container = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Container = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Container = function(_super) {
      __extends(Container2, _super);
      function Container2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new Util_1.Collection();
        return _this;
      }
      Container2.prototype.getChildren = function(filterFunc) {
        if (!filterFunc) {
          return this.children;
        }
        var results = new Util_1.Collection();
        this.children.each(function(child) {
          if (filterFunc(child)) {
            results.push(child);
          }
        });
        return results;
      };
      Container2.prototype.hasChildren = function() {
        return this.getChildren().length > 0;
      };
      Container2.prototype.removeChildren = function() {
        var child;
        for (var i2 = 0; i2 < this.children.length; i2++) {
          child = this.children[i2];
          child.parent = null;
          child.index = 0;
          child.remove();
        }
        this.children = new Util_1.Collection();
        return this;
      };
      Container2.prototype.destroyChildren = function() {
        var child;
        for (var i2 = 0; i2 < this.children.length; i2++) {
          child = this.children[i2];
          child.parent = null;
          child.index = 0;
          child.destroy();
        }
        this.children = new Util_1.Collection();
        return this;
      };
      Container2.prototype.add = function() {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          children[_i] = arguments[_i];
        }
        if (arguments.length > 1) {
          for (var i2 = 0; i2 < arguments.length; i2++) {
            this.add(arguments[i2]);
          }
          return this;
        }
        var child = children[0];
        if (child.getParent()) {
          child.moveTo(this);
          return this;
        }
        var _children = this.children;
        this._validateAdd(child);
        child._clearCaches();
        child.index = _children.length;
        child.parent = this;
        _children.push(child);
        this._fire("add", {
          child
        });
        return this;
      };
      Container2.prototype.destroy = function() {
        if (this.hasChildren()) {
          this.destroyChildren();
        }
        _super.prototype.destroy.call(this);
        return this;
      };
      Container2.prototype.find = function(selector) {
        return this._generalFind(selector, false);
      };
      Container2.prototype.get = function(selector) {
        Util_1.Util.warn("collection.get() method is deprecated. Please use collection.find() instead.");
        return this.find(selector);
      };
      Container2.prototype.findOne = function(selector) {
        var result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : void 0;
      };
      Container2.prototype._generalFind = function(selector, findOne) {
        var retArr = [];
        this._descendants(function(node) {
          var valid = node._isMatch(selector);
          if (valid) {
            retArr.push(node);
          }
          if (valid && findOne) {
            return true;
          }
          return false;
        });
        return Util_1.Collection.toCollection(retArr);
      };
      Container2.prototype._descendants = function(fn) {
        var shouldStop = false;
        for (var i2 = 0; i2 < this.children.length; i2++) {
          var child = this.children[i2];
          shouldStop = fn(child);
          if (shouldStop) {
            return true;
          }
          if (!child.hasChildren()) {
            continue;
          }
          shouldStop = child._descendants(fn);
          if (shouldStop) {
            return true;
          }
        }
        return false;
      };
      Container2.prototype.toObject = function() {
        var obj = Node_1.Node.prototype.toObject.call(this);
        obj.children = [];
        var children = this.getChildren();
        var len = children.length;
        for (var n2 = 0; n2 < len; n2++) {
          var child = children[n2];
          obj.children.push(child.toObject());
        }
        return obj;
      };
      Container2.prototype.isAncestorOf = function(node) {
        var parent = node.getParent();
        while (parent) {
          if (parent._id === this._id) {
            return true;
          }
          parent = parent.getParent();
        }
        return false;
      };
      Container2.prototype.clone = function(obj) {
        var node = Node_1.Node.prototype.clone.call(this, obj);
        this.getChildren().each(function(no) {
          node.add(no.clone());
        });
        return node;
      };
      Container2.prototype.getAllIntersections = function(pos) {
        var arr = [];
        this.find("Shape").each(function(shape) {
          if (shape.isVisible() && shape.intersects(pos)) {
            arr.push(shape);
          }
        });
        return arr;
      };
      Container2.prototype._setChildrenIndices = function() {
        this.children.each(function(child, n2) {
          child.index = n2;
        });
      };
      Container2.prototype.drawScene = function(can, top) {
        var layer = this.getLayer(), canvas = can || layer && layer.getCanvas(), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        var caching = canvas && canvas.isCache;
        if (!this.isVisible() && !caching) {
          return this;
        }
        if (cachedSceneCanvas) {
          context.save();
          var m2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
          this._drawCachedSceneCanvas(context);
          context.restore();
        } else {
          this._drawChildren("drawScene", canvas, top);
        }
        return this;
      };
      Container2.prototype.drawHit = function(can, top) {
        if (!this.shouldDrawHit(top)) {
          return this;
        }
        var layer = this.getLayer(), canvas = can || layer && layer.hitCanvas, context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (cachedHitCanvas) {
          context.save();
          var m2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
          this._drawCachedHitCanvas(context);
          context.restore();
        } else {
          this._drawChildren("drawHit", canvas, top);
        }
        return this;
      };
      Container2.prototype._drawChildren = function(drawMethod, canvas, top) {
        var context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = clipWidth && clipHeight || clipFunc;
        var selfCache = top === this;
        if (hasClip) {
          context.save();
          var transform = this.getAbsoluteTransform(top);
          var m2 = transform.getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
          context.beginPath();
          if (clipFunc) {
            clipFunc.call(this, context, this);
          } else {
            var clipX = this.clipX();
            var clipY = this.clipY();
            context.rect(clipX, clipY, clipWidth, clipHeight);
          }
          context.clip();
          m2 = transform.copy().invert().getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
        }
        var hasComposition = !selfCache && this.globalCompositeOperation() !== "source-over" && drawMethod === "drawScene";
        if (hasComposition) {
          context.save();
          context._applyGlobalCompositeOperation(this);
        }
        this.children.each(function(child) {
          child[drawMethod](canvas, top);
        });
        if (hasComposition) {
          context.restore();
        }
        if (hasClip) {
          context.restore();
        }
      };
      Container2.prototype.getClientRect = function(config) {
        config = config || {};
        var skipTransform = config.skipTransform;
        var relativeTo = config.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
          x: Infinity,
          y: Infinity,
          width: 0,
          height: 0
        };
        var that = this;
        this.children.each(function(child) {
          if (!child.visible()) {
            return;
          }
          var rect = child.getClientRect({
            relativeTo: that,
            skipShadow: config.skipShadow,
            skipStroke: config.skipStroke
          });
          if (rect.width === 0 && rect.height === 0) {
            return;
          }
          if (minX === void 0) {
            minX = rect.x;
            minY = rect.y;
            maxX = rect.x + rect.width;
            maxY = rect.y + rect.height;
          } else {
            minX = Math.min(minX, rect.x);
            minY = Math.min(minY, rect.y);
            maxX = Math.max(maxX, rect.x + rect.width);
            maxY = Math.max(maxY, rect.y + rect.height);
          }
        });
        var shapes = this.find("Shape");
        var hasVisible = false;
        for (var i2 = 0; i2 < shapes.length; i2++) {
          var shape = shapes[i2];
          if (shape._isVisible(this)) {
            hasVisible = true;
            break;
          }
        }
        if (hasVisible && minX !== void 0) {
          selfRect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        } else {
          selfRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        if (!skipTransform) {
          return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
      };
      return Container2;
    }(Node_1.Node);
    exports.Container = Container;
    Factory_1.Factory.addComponentsGetterSetter(Container, "clip", [
      "x",
      "y",
      "width",
      "height"
    ]);
    Factory_1.Factory.addGetterSetter(Container, "clipX", void 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Container, "clipY", void 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Container, "clipWidth", void 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Container, "clipHeight", void 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Container, "clipFunc");
    Util_1.Collection.mapMethods(Container);
  });

  // node_modules/konva/lib/PointerEvents.js
  var require_PointerEvents = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.releaseCapture = exports.setPointerCapture = exports.hasPointerCapture = exports.createEvent = exports.getCapturedShape = void 0;
    var Global_1 = require_Global();
    var Captures = new Map();
    var SUPPORT_POINTER_EVENTS = Global_1.Konva._global["PointerEvent"] !== void 0;
    function getCapturedShape(pointerId) {
      return Captures.get(pointerId);
    }
    exports.getCapturedShape = getCapturedShape;
    function createEvent(evt) {
      return {
        evt,
        pointerId: evt.pointerId
      };
    }
    exports.createEvent = createEvent;
    function hasPointerCapture(pointerId, shape) {
      return Captures.get(pointerId) === shape;
    }
    exports.hasPointerCapture = hasPointerCapture;
    function setPointerCapture(pointerId, shape) {
      releaseCapture(pointerId);
      var stage = shape.getStage();
      if (!stage)
        return;
      Captures.set(pointerId, shape);
      if (SUPPORT_POINTER_EVENTS) {
        shape._fire("gotpointercapture", createEvent(new PointerEvent("gotpointercapture")));
      }
    }
    exports.setPointerCapture = setPointerCapture;
    function releaseCapture(pointerId, target) {
      var shape = Captures.get(pointerId);
      if (!shape)
        return;
      var stage = shape.getStage();
      if (stage && stage.content) {
      }
      Captures.delete(pointerId);
      if (SUPPORT_POINTER_EVENTS) {
        shape._fire("lostpointercapture", createEvent(new PointerEvent("lostpointercapture")));
      }
    }
    exports.releaseCapture = releaseCapture;
  });

  // node_modules/konva/lib/Stage.js
  var require_Stage = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Stage = exports.stages = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Container_1 = require_Container();
    var Global_1 = require_Global();
    var Canvas_1 = require_Canvas();
    var DragAndDrop_1 = require_DragAndDrop();
    var Global_2 = require_Global();
    var PointerEvents = require_PointerEvents();
    var STAGE = "Stage";
    var STRING = "string";
    var PX = "px";
    var MOUSEOUT = "mouseout";
    var MOUSELEAVE = "mouseleave";
    var MOUSEOVER = "mouseover";
    var MOUSEENTER = "mouseenter";
    var MOUSEMOVE = "mousemove";
    var MOUSEDOWN = "mousedown";
    var MOUSEUP = "mouseup";
    var POINTERMOVE = "pointermove";
    var POINTERDOWN = "pointerdown";
    var POINTERUP = "pointerup";
    var POINTERCANCEL = "pointercancel";
    var LOSTPOINTERCAPTURE = "lostpointercapture";
    var CONTEXTMENU = "contextmenu";
    var CLICK = "click";
    var DBL_CLICK = "dblclick";
    var TOUCHSTART = "touchstart";
    var TOUCHEND = "touchend";
    var TAP = "tap";
    var DBL_TAP = "dbltap";
    var TOUCHMOVE = "touchmove";
    var WHEEL = "wheel";
    var CONTENT_MOUSEOUT = "contentMouseout";
    var CONTENT_MOUSEOVER = "contentMouseover";
    var CONTENT_MOUSEMOVE = "contentMousemove";
    var CONTENT_MOUSEDOWN = "contentMousedown";
    var CONTENT_MOUSEUP = "contentMouseup";
    var CONTENT_CONTEXTMENU = "contentContextmenu";
    var CONTENT_CLICK = "contentClick";
    var CONTENT_DBL_CLICK = "contentDblclick";
    var CONTENT_TOUCHSTART = "contentTouchstart";
    var CONTENT_TOUCHEND = "contentTouchend";
    var CONTENT_DBL_TAP = "contentDbltap";
    var CONTENT_TAP = "contentTap";
    var CONTENT_TOUCHMOVE = "contentTouchmove";
    var CONTENT_WHEEL = "contentWheel";
    var RELATIVE = "relative";
    var KONVA_CONTENT = "konvajs-content";
    var UNDERSCORE = "_";
    var CONTAINER = "container";
    var MAX_LAYERS_NUMBER = 5;
    var EMPTY_STRING = "";
    var EVENTS = [
      MOUSEENTER,
      MOUSEDOWN,
      MOUSEMOVE,
      MOUSEUP,
      MOUSELEAVE,
      TOUCHSTART,
      TOUCHMOVE,
      TOUCHEND,
      MOUSEOVER,
      WHEEL,
      CONTEXTMENU,
      POINTERDOWN,
      POINTERMOVE,
      POINTERUP,
      POINTERCANCEL,
      LOSTPOINTERCAPTURE
    ];
    var eventsLength = EVENTS.length;
    function addEvent(ctx, eventName) {
      ctx.content.addEventListener(eventName, function(evt) {
        ctx[UNDERSCORE + eventName](evt);
      }, false);
    }
    var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
    exports.stages = [];
    function checkNoClip(attrs) {
      if (attrs === void 0) {
        attrs = {};
      }
      if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        Util_1.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups.");
      }
      return attrs;
    }
    var Stage = function(_super) {
      __extends(Stage2, _super);
      function Stage2(config) {
        var _this = _super.call(this, checkNoClip(config)) || this;
        _this._pointerPositions = [];
        _this._changedPointerPositions = [];
        _this._buildDOM();
        _this._bindContentEvents();
        exports.stages.push(_this);
        _this.on("widthChange.konva heightChange.konva", _this._resizeDOM);
        _this.on("visibleChange.konva", _this._checkVisibility);
        _this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", function() {
          checkNoClip(_this.attrs);
        });
        _this._checkVisibility();
        return _this;
      }
      Stage2.prototype._validateAdd = function(child) {
        var isLayer = child.getType() === "Layer";
        var isFastLayer = child.getType() === "FastLayer";
        var valid = isLayer || isFastLayer;
        if (!valid) {
          Util_1.Util.throw("You may only add layers to the stage.");
        }
      };
      Stage2.prototype._checkVisibility = function() {
        if (!this.content) {
          return;
        }
        var style = this.visible() ? "" : "none";
        this.content.style.display = style;
      };
      Stage2.prototype.setContainer = function(container) {
        if (typeof container === STRING) {
          if (container.charAt(0) === ".") {
            var className = container.slice(1);
            container = document.getElementsByClassName(className)[0];
          } else {
            var id;
            if (container.charAt(0) !== "#") {
              id = container;
            } else {
              id = container.slice(1);
            }
            container = document.getElementById(id);
          }
          if (!container) {
            throw "Can not find container in document with id " + id;
          }
        }
        this._setAttr(CONTAINER, container);
        if (this.content) {
          if (this.content.parentElement) {
            this.content.parentElement.removeChild(this.content);
          }
          container.appendChild(this.content);
        }
        return this;
      };
      Stage2.prototype.shouldDrawHit = function() {
        return true;
      };
      Stage2.prototype.clear = function() {
        var layers = this.children, len = layers.length, n2;
        for (n2 = 0; n2 < len; n2++) {
          layers[n2].clear();
        }
        return this;
      };
      Stage2.prototype.clone = function(obj) {
        if (!obj) {
          obj = {};
        }
        obj.container = document.createElement("div");
        return Container_1.Container.prototype.clone.call(this, obj);
      };
      Stage2.prototype.destroy = function() {
        _super.prototype.destroy.call(this);
        var content = this.content;
        if (content && Util_1.Util._isInDocument(content)) {
          this.container().removeChild(content);
        }
        var index = exports.stages.indexOf(this);
        if (index > -1) {
          exports.stages.splice(index, 1);
        }
        return this;
      };
      Stage2.prototype.getPointerPosition = function() {
        var pos = this._pointerPositions[0] || this._changedPointerPositions[0];
        if (!pos) {
          Util_1.Util.warn(NO_POINTERS_MESSAGE);
          return null;
        }
        return {
          x: pos.x,
          y: pos.y
        };
      };
      Stage2.prototype._getPointerById = function(id) {
        return this._pointerPositions.find(function(p2) {
          return p2.id === id;
        });
      };
      Stage2.prototype.getPointersPositions = function() {
        return this._pointerPositions;
      };
      Stage2.prototype.getStage = function() {
        return this;
      };
      Stage2.prototype.getContent = function() {
        return this.content;
      };
      Stage2.prototype._toKonvaCanvas = function(config) {
        config = config || {};
        config.x = config.x || 0;
        config.y = config.y || 0;
        config.width = config.width || this.width();
        config.height = config.height || this.height();
        var canvas = new Canvas_1.SceneCanvas({
          width: config.width,
          height: config.height,
          pixelRatio: config.pixelRatio || 1
        });
        var _context = canvas.getContext()._context;
        var layers = this.children;
        if (config.x || config.y) {
          _context.translate(-1 * config.x, -1 * config.y);
        }
        layers.each(function(layer) {
          if (!layer.isVisible()) {
            return;
          }
          var layerCanvas = layer._toKonvaCanvas(config);
          _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
      };
      Stage2.prototype.getIntersection = function(pos, selector) {
        if (!pos) {
          return null;
        }
        var layers = this.children, len = layers.length, end = len - 1, n2, shape;
        for (n2 = end; n2 >= 0; n2--) {
          shape = layers[n2].getIntersection(pos, selector);
          if (shape) {
            return shape;
          }
        }
        return null;
      };
      Stage2.prototype._resizeDOM = function() {
        var width = this.width();
        var height = this.height();
        if (this.content) {
          this.content.style.width = width + PX;
          this.content.style.height = height + PX;
        }
        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);
        this.children.each(function(layer) {
          layer.setSize({width, height});
          layer.draw();
        });
      };
      Stage2.prototype.add = function(layer) {
        if (arguments.length > 1) {
          for (var i2 = 0; i2 < arguments.length; i2++) {
            this.add(arguments[i2]);
          }
          return this;
        }
        _super.prototype.add.call(this, layer);
        var length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
          Util_1.Util.warn("The stage has " + length + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.");
        }
        layer.setSize({width: this.width(), height: this.height()});
        layer.draw();
        if (Global_1.Konva.isBrowser) {
          this.content.appendChild(layer.canvas._canvas);
        }
        return this;
      };
      Stage2.prototype.getParent = function() {
        return null;
      };
      Stage2.prototype.getLayer = function() {
        return null;
      };
      Stage2.prototype.hasPointerCapture = function(pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
      };
      Stage2.prototype.setPointerCapture = function(pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
      };
      Stage2.prototype.releaseCapture = function(pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
      };
      Stage2.prototype.getLayers = function() {
        return this.getChildren();
      };
      Stage2.prototype._bindContentEvents = function() {
        if (!Global_1.Konva.isBrowser) {
          return;
        }
        for (var n2 = 0; n2 < eventsLength; n2++) {
          addEvent(this, EVENTS[n2]);
        }
      };
      Stage2.prototype._mouseenter = function(evt) {
        this.setPointersPositions(evt);
        this._fire(MOUSEENTER, {evt, target: this, currentTarget: this});
      };
      Stage2.prototype._mouseover = function(evt) {
        this.setPointersPositions(evt);
        this._fire(CONTENT_MOUSEOVER, {evt});
        this._fire(MOUSEOVER, {evt, target: this, currentTarget: this});
      };
      Stage2.prototype._mouseleave = function(evt) {
        var _a;
        this.setPointersPositions(evt);
        var targetShape = ((_a = this.targetShape) === null || _a === void 0 ? void 0 : _a.getStage()) ? this.targetShape : null;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (targetShape && eventsEnabled) {
          targetShape._fireAndBubble(MOUSEOUT, {evt});
          targetShape._fireAndBubble(MOUSELEAVE, {evt});
          this._fire(MOUSELEAVE, {evt, target: this, currentTarget: this});
          this.targetShape = null;
        } else if (eventsEnabled) {
          this._fire(MOUSELEAVE, {
            evt,
            target: this,
            currentTarget: this
          });
          this._fire(MOUSEOUT, {
            evt,
            target: this,
            currentTarget: this
          });
        }
        this.pointerPos = void 0;
        this._pointerPositions = [];
        this._fire(CONTENT_MOUSEOUT, {evt});
      };
      Stage2.prototype._mousemove = function(evt) {
        var _a;
        if (Global_1.Konva.UA.ieMobile) {
          return this._touchmove(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape;
        var targetShape = ((_a = this.targetShape) === null || _a === void 0 ? void 0 : _a.getStage()) ? this.targetShape : null;
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
          shape = this.getIntersection(this.getPointerPosition());
          if (shape && shape.isListening()) {
            var differentTarget = targetShape !== shape;
            if (eventsEnabled && differentTarget) {
              if (targetShape) {
                targetShape._fireAndBubble(MOUSEOUT, {evt, pointerId}, shape);
                targetShape._fireAndBubble(MOUSELEAVE, {evt, pointerId}, shape);
              }
              shape._fireAndBubble(MOUSEOVER, {evt, pointerId}, targetShape);
              shape._fireAndBubble(MOUSEENTER, {evt, pointerId}, targetShape);
              shape._fireAndBubble(MOUSEMOVE, {evt, pointerId});
              this.targetShape = shape;
            } else {
              shape._fireAndBubble(MOUSEMOVE, {evt, pointerId});
            }
          } else {
            if (targetShape && eventsEnabled) {
              targetShape._fireAndBubble(MOUSEOUT, {evt, pointerId});
              targetShape._fireAndBubble(MOUSELEAVE, {evt, pointerId});
              this._fire(MOUSEOVER, {
                evt,
                target: this,
                currentTarget: this,
                pointerId
              });
              this.targetShape = null;
            }
            this._fire(MOUSEMOVE, {
              evt,
              target: this,
              currentTarget: this,
              pointerId
            });
          }
          this._fire(CONTENT_MOUSEMOVE, {evt});
        }
        if (evt.cancelable) {
          evt.preventDefault();
        }
      };
      Stage2.prototype._mousedown = function(evt) {
        if (Global_1.Konva.UA.ieMobile) {
          return this._touchstart(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        DragAndDrop_1.DD.justDragged = false;
        Global_1.Konva.listenClickTap = true;
        if (shape && shape.isListening()) {
          this.clickStartShape = shape;
          shape._fireAndBubble(MOUSEDOWN, {evt, pointerId});
        } else {
          this._fire(MOUSEDOWN, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
        this._fire(CONTENT_MOUSEDOWN, {evt});
      };
      Stage2.prototype._mouseup = function(evt) {
        if (Global_1.Konva.UA.ieMobile) {
          return this._touchend(evt);
        }
        this.setPointersPositions(evt);
        var pointerId = Util_1.Util._getFirstPointerId(evt);
        var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
          fireDblClick = true;
          clearTimeout(this.dblTimeout);
        } else if (!DragAndDrop_1.DD.justDragged) {
          Global_1.Konva.inDblClickWindow = true;
          clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function() {
          Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        if (shape && shape.isListening()) {
          this.clickEndShape = shape;
          shape._fireAndBubble(MOUSEUP, {evt, pointerId});
          if (Global_1.Konva.listenClickTap && clickStartShape && clickStartShape._id === shape._id) {
            shape._fireAndBubble(CLICK, {evt, pointerId});
            if (fireDblClick && clickEndShape && clickEndShape === shape) {
              shape._fireAndBubble(DBL_CLICK, {evt, pointerId});
            }
          }
        } else {
          this.clickEndShape = null;
          this._fire(MOUSEUP, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
          if (Global_1.Konva.listenClickTap) {
            this._fire(CLICK, {
              evt,
              target: this,
              currentTarget: this,
              pointerId
            });
          }
          if (fireDblClick) {
            this._fire(DBL_CLICK, {
              evt,
              target: this,
              currentTarget: this,
              pointerId
            });
          }
        }
        this._fire(CONTENT_MOUSEUP, {evt});
        if (Global_1.Konva.listenClickTap) {
          this._fire(CONTENT_CLICK, {evt});
          if (fireDblClick) {
            this._fire(CONTENT_DBL_CLICK, {evt});
          }
        }
        Global_1.Konva.listenClickTap = false;
        if (evt.cancelable) {
          evt.preventDefault();
        }
      };
      Stage2.prototype._contextmenu = function(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(CONTEXTMENU, {evt});
        } else {
          this._fire(CONTEXTMENU, {
            evt,
            target: this,
            currentTarget: this
          });
        }
        this._fire(CONTENT_CONTEXTMENU, {evt});
      };
      Stage2.prototype._touchstart = function(evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var triggeredOnShape = false;
        this._changedPointerPositions.forEach(function(pos) {
          var shape = _this.getIntersection(pos);
          Global_1.Konva.listenClickTap = true;
          DragAndDrop_1.DD.justDragged = false;
          var hasShape = shape && shape.isListening();
          if (!hasShape) {
            return;
          }
          if (Global_1.Konva.captureTouchEventsEnabled) {
            shape.setPointerCapture(pos.id);
          }
          _this.tapStartShape = shape;
          shape._fireAndBubble(TOUCHSTART, {evt, pointerId: pos.id}, _this);
          triggeredOnShape = true;
          if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
            evt.preventDefault();
          }
        });
        if (!triggeredOnShape) {
          this._fire(TOUCHSTART, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        this._fire(CONTENT_TOUCHSTART, {evt});
      };
      Stage2.prototype._touchmove = function(evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var eventsEnabled = !DragAndDrop_1.DD.isDragging || Global_1.Konva.hitOnDragEnabled;
        if (eventsEnabled) {
          var triggeredOnShape = false;
          var processedShapesIds = {};
          this._changedPointerPositions.forEach(function(pos) {
            var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
            var hasShape = shape && shape.isListening();
            if (!hasShape) {
              return;
            }
            if (processedShapesIds[shape._id]) {
              return;
            }
            processedShapesIds[shape._id] = true;
            shape._fireAndBubble(TOUCHMOVE, {evt, pointerId: pos.id});
            triggeredOnShape = true;
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
              evt.preventDefault();
            }
          });
          if (!triggeredOnShape) {
            this._fire(TOUCHMOVE, {
              evt,
              target: this,
              currentTarget: this,
              pointerId: this._changedPointerPositions[0].id
            });
          }
          this._fire(CONTENT_TOUCHMOVE, {evt});
        }
        if (DragAndDrop_1.DD.isDragging && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
      };
      Stage2.prototype._touchend = function(evt) {
        var _this = this;
        this.setPointersPositions(evt);
        var tapEndShape = this.tapEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
          fireDblClick = true;
          clearTimeout(this.dblTimeout);
        } else if (!DragAndDrop_1.DD.justDragged) {
          Global_1.Konva.inDblClickWindow = true;
          clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function() {
          Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        var triggeredOnShape = false;
        var processedShapesIds = {};
        var tapTriggered = false;
        var dblTapTriggered = false;
        this._changedPointerPositions.forEach(function(pos) {
          var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
          if (shape) {
            shape.releaseCapture(pos.id);
          }
          var hasShape = shape && shape.isListening();
          if (!hasShape) {
            return;
          }
          if (processedShapesIds[shape._id]) {
            return;
          }
          processedShapesIds[shape._id] = true;
          _this.tapEndShape = shape;
          shape._fireAndBubble(TOUCHEND, {evt, pointerId: pos.id});
          triggeredOnShape = true;
          if (Global_1.Konva.listenClickTap && shape === _this.tapStartShape) {
            tapTriggered = true;
            shape._fireAndBubble(TAP, {evt, pointerId: pos.id});
            if (fireDblClick && tapEndShape && tapEndShape === shape) {
              dblTapTriggered = true;
              shape._fireAndBubble(DBL_TAP, {evt, pointerId: pos.id});
            }
          }
          if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
            evt.preventDefault();
          }
        });
        if (!triggeredOnShape) {
          this._fire(TOUCHEND, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        if (Global_1.Konva.listenClickTap && !tapTriggered) {
          this.tapEndShape = null;
          this._fire(TAP, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        if (fireDblClick && !dblTapTriggered) {
          this._fire(DBL_TAP, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        this._fire(CONTENT_TOUCHEND, {evt});
        if (Global_1.Konva.listenClickTap) {
          this._fire(CONTENT_TAP, {evt});
          if (fireDblClick) {
            this._fire(CONTENT_DBL_TAP, {evt});
          }
        }
        if (this.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
        Global_1.Konva.listenClickTap = false;
      };
      Stage2.prototype._wheel = function(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          shape._fireAndBubble(WHEEL, {evt});
        } else {
          this._fire(WHEEL, {
            evt,
            target: this,
            currentTarget: this
          });
        }
        this._fire(CONTENT_WHEEL, {evt});
      };
      Stage2.prototype._pointerdown = function(evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
          return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
        if (shape) {
          shape._fireAndBubble(POINTERDOWN, PointerEvents.createEvent(evt));
        }
      };
      Stage2.prototype._pointermove = function(evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
          return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
        if (shape) {
          shape._fireAndBubble(POINTERMOVE, PointerEvents.createEvent(evt));
        }
      };
      Stage2.prototype._pointerup = function(evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
          return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
        if (shape) {
          shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
      };
      Stage2.prototype._pointercancel = function(evt) {
        if (!Global_1.Konva._pointerEventsEnabled) {
          return;
        }
        this.setPointersPositions(evt);
        var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
        if (shape) {
          shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
        }
        PointerEvents.releaseCapture(evt.pointerId);
      };
      Stage2.prototype._lostpointercapture = function(evt) {
        PointerEvents.releaseCapture(evt.pointerId);
      };
      Stage2.prototype.setPointersPositions = function(evt) {
        var _this = this;
        var contentPosition = this._getContentPosition(), x2 = null, y2 = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== void 0) {
          this._pointerPositions = [];
          this._changedPointerPositions = [];
          Util_1.Collection.prototype.each.call(evt.touches, function(touch) {
            _this._pointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
          Util_1.Collection.prototype.each.call(evt.changedTouches || evt.touches, function(touch) {
            _this._changedPointerPositions.push({
              id: touch.identifier,
              x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
              y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
            });
          });
        } else {
          x2 = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
          y2 = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
          this.pointerPos = {
            x: x2,
            y: y2
          };
          this._pointerPositions = [{x: x2, y: y2, id: Util_1.Util._getFirstPointerId(evt)}];
          this._changedPointerPositions = [
            {x: x2, y: y2, id: Util_1.Util._getFirstPointerId(evt)}
          ];
        }
      };
      Stage2.prototype._setPointerPosition = function(evt) {
        Util_1.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
      };
      Stage2.prototype._getContentPosition = function() {
        if (!this.content || !this.content.getBoundingClientRect) {
          return {
            top: 0,
            left: 0,
            scaleX: 1,
            scaleY: 1
          };
        }
        var rect = this.content.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          scaleX: rect.width / this.content.clientWidth || 1,
          scaleY: rect.height / this.content.clientHeight || 1
        };
      };
      Stage2.prototype._buildDOM = function() {
        this.bufferCanvas = new Canvas_1.SceneCanvas({
          width: this.width(),
          height: this.height()
        });
        this.bufferHitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: 1,
          width: this.width(),
          height: this.height()
        });
        if (!Global_1.Konva.isBrowser) {
          return;
        }
        var container = this.container();
        if (!container) {
          throw "Stage has no container. A container is required.";
        }
        container.innerHTML = EMPTY_STRING;
        this.content = document.createElement("div");
        this.content.style.position = RELATIVE;
        this.content.style.userSelect = "none";
        this.content.className = KONVA_CONTENT;
        this.content.setAttribute("role", "presentation");
        container.appendChild(this.content);
        this._resizeDOM();
      };
      Stage2.prototype.cache = function() {
        Util_1.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.");
        return this;
      };
      Stage2.prototype.clearCache = function() {
        return this;
      };
      Stage2.prototype.batchDraw = function() {
        this.children.each(function(layer) {
          layer.batchDraw();
        });
        return this;
      };
      return Stage2;
    }(Container_1.Container);
    exports.Stage = Stage;
    Stage.prototype.nodeType = STAGE;
    Global_2._registerNode(Stage);
    Factory_1.Factory.addGetterSetter(Stage, "container");
  });

  // node_modules/konva/lib/Shape.js
  var require_Shape = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Shape = exports.shapes = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var PointerEvents = require_PointerEvents();
    var HAS_SHADOW = "hasShadow";
    var SHADOW_RGBA = "shadowRGBA";
    var patternImage = "patternImage";
    var linearGradient = "linearGradient";
    var radialGradient = "radialGradient";
    var dummyContext;
    function getDummyContext() {
      if (dummyContext) {
        return dummyContext;
      }
      dummyContext = Util_1.Util.createCanvasElement().getContext("2d");
      return dummyContext;
    }
    exports.shapes = {};
    function _fillFunc(context) {
      context.fill();
    }
    function _strokeFunc(context) {
      context.stroke();
    }
    function _fillFuncHit(context) {
      context.fill();
    }
    function _strokeFuncHit(context) {
      context.stroke();
    }
    function _clearHasShadowCache() {
      this._clearCache(HAS_SHADOW);
    }
    function _clearGetShadowRGBACache() {
      this._clearCache(SHADOW_RGBA);
    }
    function _clearFillPatternCache() {
      this._clearCache(patternImage);
    }
    function _clearLinearGradientCache() {
      this._clearCache(linearGradient);
    }
    function _clearRadialGradientCache() {
      this._clearCache(radialGradient);
    }
    var Shape = function(_super) {
      __extends(Shape2, _super);
      function Shape2(config) {
        var _this = _super.call(this, config) || this;
        var key;
        while (true) {
          key = Util_1.Util.getRandomColor();
          if (key && !(key in exports.shapes)) {
            break;
          }
        }
        _this.colorKey = key;
        exports.shapes[key] = _this;
        return _this;
      }
      Shape2.prototype.getContext = function() {
        return this.getLayer().getContext();
      };
      Shape2.prototype.getCanvas = function() {
        return this.getLayer().getCanvas();
      };
      Shape2.prototype.getSceneFunc = function() {
        return this.attrs.sceneFunc || this["_sceneFunc"];
      };
      Shape2.prototype.getHitFunc = function() {
        return this.attrs.hitFunc || this["_hitFunc"];
      };
      Shape2.prototype.hasShadow = function() {
        return this._getCache(HAS_SHADOW, this._hasShadow);
      };
      Shape2.prototype._hasShadow = function() {
        return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
      };
      Shape2.prototype._getFillPattern = function() {
        return this._getCache(patternImage, this.__getFillPattern);
      };
      Shape2.prototype.__getFillPattern = function() {
        if (this.fillPatternImage()) {
          var ctx = getDummyContext();
          var pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
          if (pattern && pattern.setTransform) {
            pattern.setTransform({
              a: this.fillPatternScaleX(),
              b: 0,
              c: 0,
              d: this.fillPatternScaleY(),
              e: 0,
              f: 0
            });
          }
          return pattern;
        }
      };
      Shape2.prototype._getLinearGradient = function() {
        return this._getCache(linearGradient, this.__getLinearGradient);
      };
      Shape2.prototype.__getLinearGradient = function() {
        var colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
          var ctx = getDummyContext();
          var start2 = this.fillLinearGradientStartPoint();
          var end = this.fillLinearGradientEndPoint();
          var grd = ctx.createLinearGradient(start2.x, start2.y, end.x, end.y);
          for (var n2 = 0; n2 < colorStops.length; n2 += 2) {
            grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
          }
          return grd;
        }
      };
      Shape2.prototype._getRadialGradient = function() {
        return this._getCache(radialGradient, this.__getRadialGradient);
      };
      Shape2.prototype.__getRadialGradient = function() {
        var colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
          var ctx = getDummyContext();
          var start2 = this.fillRadialGradientStartPoint();
          var end = this.fillRadialGradientEndPoint();
          var grd = ctx.createRadialGradient(start2.x, start2.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
          for (var n2 = 0; n2 < colorStops.length; n2 += 2) {
            grd.addColorStop(colorStops[n2], colorStops[n2 + 1]);
          }
          return grd;
        }
      };
      Shape2.prototype.getShadowRGBA = function() {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
      };
      Shape2.prototype._getShadowRGBA = function() {
        if (this.hasShadow()) {
          var rgba = Util_1.Util.colorToRGBA(this.shadowColor());
          return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a * (this.shadowOpacity() || 1) + ")";
        }
      };
      Shape2.prototype.hasFill = function() {
        var _this = this;
        return this._calculate("hasFill", [
          "fillEnabled",
          "fill",
          "fillPatternImage",
          "fillLinearGradientColorStops",
          "fillRadialGradientColorStops"
        ], function() {
          return _this.fillEnabled() && !!(_this.fill() || _this.fillPatternImage() || _this.fillLinearGradientColorStops() || _this.fillRadialGradientColorStops());
        });
      };
      Shape2.prototype.hasStroke = function() {
        var _this = this;
        return this._calculate("hasStroke", [
          "strokeEnabled",
          "strokeWidth",
          "stroke",
          "strokeLinearGradientColorStops"
        ], function() {
          return _this.strokeEnabled() && _this.strokeWidth() && !!(_this.stroke() || _this.strokeLinearGradientColorStops());
        });
      };
      Shape2.prototype.hasHitStroke = function() {
        var width = this.hitStrokeWidth();
        if (width === "auto") {
          return this.hasStroke();
        }
        return this.strokeEnabled() && !!width;
      };
      Shape2.prototype.intersects = function(point) {
        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p2;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas, null, true);
        p2 = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p2[3] > 0;
      };
      Shape2.prototype.destroy = function() {
        Node_1.Node.prototype.destroy.call(this);
        delete exports.shapes[this.colorKey];
        delete this.colorKey;
        return this;
      };
      Shape2.prototype._useBufferCanvas = function(forceFill) {
        var _a;
        if (!this.getStage()) {
          return false;
        }
        var perfectDrawEnabled = (_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true;
        if (!perfectDrawEnabled) {
          return false;
        }
        var hasFill = forceFill || this.hasFill();
        var hasStroke = this.hasStroke();
        var isTransparent = this.getAbsoluteOpacity() !== 1;
        if (hasFill && hasStroke && isTransparent) {
          return true;
        }
        var hasShadow = this.hasShadow();
        var strokeForShadow = this.shadowForStrokeEnabled();
        if (hasFill && hasStroke && hasShadow && strokeForShadow) {
          return true;
        }
        return false;
      };
      Shape2.prototype.setStrokeHitEnabled = function(val) {
        Util_1.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.");
        if (val) {
          this.hitStrokeWidth("auto");
        } else {
          this.hitStrokeWidth(0);
        }
      };
      Shape2.prototype.getStrokeHitEnabled = function() {
        if (this.hitStrokeWidth() === 0) {
          return false;
        } else {
          return true;
        }
      };
      Shape2.prototype.getSelfRect = function() {
        var size = this.size();
        return {
          x: this._centroid ? -size.width / 2 : 0,
          y: this._centroid ? -size.height / 2 : 0,
          width: size.width,
          height: size.height
        };
      };
      Shape2.prototype.getClientRect = function(config) {
        if (config === void 0) {
          config = {};
        }
        var skipTransform = config.skipTransform;
        var relativeTo = config.relativeTo;
        var fillRect = this.getSelfRect();
        var applyStroke = !config.skipStroke && this.hasStroke();
        var strokeWidth = applyStroke && this.strokeWidth() || 0;
        var fillAndStrokeWidth = fillRect.width + strokeWidth;
        var fillAndStrokeHeight = fillRect.height + strokeWidth;
        var applyShadow = !config.skipShadow && this.hasShadow();
        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        var blurRadius = applyShadow && this.shadowBlur() || 0;
        var width = preWidth + blurRadius * 2;
        var height = preHeight + blurRadius * 2;
        var roundingOffset = 0;
        if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
          roundingOffset = 1;
        }
        var rect = {
          width: width + roundingOffset,
          height: height + roundingOffset,
          x: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
          y: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
        };
        if (!skipTransform) {
          return this._transformedRect(rect, relativeTo);
        }
        return rect;
      };
      Shape2.prototype.drawScene = function(can, top) {
        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow(), stage, bufferCanvas, bufferContext;
        var caching = canvas.isCache;
        var skipBuffer = canvas.isCache;
        var cachingSelf = top === this;
        if (!this.isVisible() && !caching) {
          return this;
        }
        if (cachedCanvas) {
          context.save();
          var m2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
          this._drawCachedSceneCanvas(context);
          context.restore();
          return this;
        }
        if (!drawFunc) {
          return this;
        }
        context.save();
        if (this._useBufferCanvas() && !skipBuffer) {
          stage = this.getStage();
          bufferCanvas = stage.bufferCanvas;
          bufferContext = bufferCanvas.getContext();
          bufferContext.clear();
          bufferContext.save();
          bufferContext._applyLineJoin(this);
          var o2 = this.getAbsoluteTransform(top).getMatrix();
          bufferContext.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
          drawFunc.call(this, bufferContext, this);
          bufferContext.restore();
          var ratio = bufferCanvas.pixelRatio;
          if (hasShadow) {
            context._applyShadow(this);
          }
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
          context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
        } else {
          context._applyLineJoin(this);
          if (!cachingSelf) {
            var o2 = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
          }
          if (hasShadow) {
            context._applyShadow(this);
          }
          drawFunc.call(this, context, this);
        }
        context.restore();
        return this;
      };
      Shape2.prototype.drawHit = function(can, top, skipDragCheck) {
        if (skipDragCheck === void 0) {
          skipDragCheck = false;
        }
        if (!this.shouldDrawHit(top, skipDragCheck)) {
          return this;
        }
        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
          console.log(this);
          Util_1.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()");
        }
        if (cachedHitCanvas) {
          context.save();
          var m2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
          this._drawCachedHitCanvas(context);
          context.restore();
          return this;
        }
        if (!drawFunc) {
          return this;
        }
        context.save();
        context._applyLineJoin(this);
        var selfCache = this === top;
        if (!selfCache) {
          var o2 = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o2[0], o2[1], o2[2], o2[3], o2[4], o2[5]);
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
      };
      Shape2.prototype.drawHitFromCache = function(alphaThreshold) {
        if (alphaThreshold === void 0) {
          alphaThreshold = 0;
        }
        var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i2, alpha;
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
          hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
          hitData = hitImageData.data;
          len = hitData.length;
          rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
          for (i2 = 0; i2 < len; i2 += 4) {
            alpha = hitData[i2 + 3];
            if (alpha > alphaThreshold) {
              hitData[i2] = rgbColorKey.r;
              hitData[i2 + 1] = rgbColorKey.g;
              hitData[i2 + 2] = rgbColorKey.b;
              hitData[i2 + 3] = 255;
            } else {
              hitData[i2 + 3] = 0;
            }
          }
          hitContext.putImageData(hitImageData, 0, 0);
        } catch (e2) {
          Util_1.Util.error("Unable to draw hit graph from cached scene canvas. " + e2.message);
        }
        return this;
      };
      Shape2.prototype.hasPointerCapture = function(pointerId) {
        return PointerEvents.hasPointerCapture(pointerId, this);
      };
      Shape2.prototype.setPointerCapture = function(pointerId) {
        PointerEvents.setPointerCapture(pointerId, this);
      };
      Shape2.prototype.releaseCapture = function(pointerId) {
        PointerEvents.releaseCapture(pointerId, this);
      };
      return Shape2;
    }(Node_1.Node);
    exports.Shape = Shape;
    Shape.prototype._fillFunc = _fillFunc;
    Shape.prototype._strokeFunc = _strokeFunc;
    Shape.prototype._fillFuncHit = _fillFuncHit;
    Shape.prototype._strokeFuncHit = _strokeFuncHit;
    Shape.prototype._centroid = false;
    Shape.prototype.nodeType = "Shape";
    Global_1._registerNode(Shape);
    Shape.prototype.eventListeners = {};
    Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearHasShadowCache);
    Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearGetShadowRGBACache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva", _clearFillPatternCache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", _clearLinearGradientCache);
    Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", _clearRadialGradientCache);
    Factory_1.Factory.addGetterSetter(Shape, "stroke", void 0, Validators_1.getStringOrGradientValidator());
    Factory_1.Factory.addGetterSetter(Shape, "strokeWidth", 2, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillAfterStrokeEnabled", false);
    Factory_1.Factory.addGetterSetter(Shape, "hitStrokeWidth", "auto", Validators_1.getNumberOrAutoValidator());
    Factory_1.Factory.addGetterSetter(Shape, "strokeHitEnabled", true, Validators_1.getBooleanValidator());
    Factory_1.Factory.addGetterSetter(Shape, "perfectDrawEnabled", true, Validators_1.getBooleanValidator());
    Factory_1.Factory.addGetterSetter(Shape, "shadowForStrokeEnabled", true, Validators_1.getBooleanValidator());
    Factory_1.Factory.addGetterSetter(Shape, "lineJoin");
    Factory_1.Factory.addGetterSetter(Shape, "lineCap");
    Factory_1.Factory.addGetterSetter(Shape, "sceneFunc");
    Factory_1.Factory.addGetterSetter(Shape, "hitFunc");
    Factory_1.Factory.addGetterSetter(Shape, "dash");
    Factory_1.Factory.addGetterSetter(Shape, "dashOffset", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "shadowColor", void 0, Validators_1.getStringValidator());
    Factory_1.Factory.addGetterSetter(Shape, "shadowBlur", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "shadowOpacity", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "shadowOffset", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetX", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "shadowOffsetY", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternImage");
    Factory_1.Factory.addGetterSetter(Shape, "fill", void 0, Validators_1.getStringOrGradientValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternX", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternY", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartRadius", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndRadius", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientColorStops");
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternRepeat", "repeat");
    Factory_1.Factory.addGetterSetter(Shape, "fillEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "strokeEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "shadowEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "dashEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "strokeScaleEnabled", true);
    Factory_1.Factory.addGetterSetter(Shape, "fillPriority", "color");
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternOffset", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetX", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternOffsetY", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillPatternScale", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleX", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternScaleY", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientStartPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientStartPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientEndPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientEndPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientStartPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointY", 0);
    Factory_1.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientEndPoint", [
      "x",
      "y"
    ]);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointX", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointY", 0);
    Factory_1.Factory.addGetterSetter(Shape, "fillPatternRotation", 0);
    Factory_1.Factory.backCompat(Shape, {
      dashArray: "dash",
      getDashArray: "getDash",
      setDashArray: "getDash",
      drawFunc: "sceneFunc",
      getDrawFunc: "getSceneFunc",
      setDrawFunc: "setSceneFunc",
      drawHitFunc: "hitFunc",
      getDrawHitFunc: "getHitFunc",
      setDrawHitFunc: "setHitFunc"
    });
    Util_1.Collection.mapMethods(Shape);
  });

  // node_modules/konva/lib/Layer.js
  var require_Layer = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Layer = void 0;
    var Util_1 = require_Util();
    var Container_1 = require_Container();
    var Node_1 = require_Node();
    var Factory_1 = require_Factory();
    var Canvas_1 = require_Canvas();
    var Validators_1 = require_Validators();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var HASH = "#";
    var BEFORE_DRAW = "beforeDraw";
    var DRAW = "draw";
    var INTERSECTION_OFFSETS = [
      {x: 0, y: 0},
      {x: -1, y: -1},
      {x: 1, y: -1},
      {x: 1, y: 1},
      {x: -1, y: 1}
    ];
    var INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
    var Layer = function(_super) {
      __extends(Layer2, _super);
      function Layer2(config) {
        var _this = _super.call(this, config) || this;
        _this.canvas = new Canvas_1.SceneCanvas();
        _this.hitCanvas = new Canvas_1.HitCanvas({
          pixelRatio: 1
        });
        _this._waitingForDraw = false;
        _this.on("visibleChange.konva", _this._checkVisibility);
        _this._checkVisibility();
        _this.on("imageSmoothingEnabledChange.konva", _this._setSmoothEnabled);
        _this._setSmoothEnabled();
        return _this;
      }
      Layer2.prototype.createPNGStream = function() {
        var c2 = this.canvas._canvas;
        return c2.createPNGStream();
      };
      Layer2.prototype.getCanvas = function() {
        return this.canvas;
      };
      Layer2.prototype.getHitCanvas = function() {
        return this.hitCanvas;
      };
      Layer2.prototype.getContext = function() {
        return this.getCanvas().getContext();
      };
      Layer2.prototype.clear = function(bounds) {
        this.getContext().clear(bounds);
        this.getHitCanvas().getContext().clear(bounds);
        return this;
      };
      Layer2.prototype.setZIndex = function(index) {
        _super.prototype.setZIndex.call(this, index);
        var stage = this.getStage();
        if (stage) {
          stage.content.removeChild(this.getCanvas()._canvas);
          if (index < stage.children.length - 1) {
            stage.content.insertBefore(this.getCanvas()._canvas, stage.children[index + 1].getCanvas()._canvas);
          } else {
            stage.content.appendChild(this.getCanvas()._canvas);
          }
        }
        return this;
      };
      Layer2.prototype.moveToTop = function() {
        Node_1.Node.prototype.moveToTop.call(this);
        var stage = this.getStage();
        if (stage) {
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
      };
      Layer2.prototype.moveUp = function() {
        var moved = Node_1.Node.prototype.moveUp.call(this);
        if (!moved) {
          return false;
        }
        var stage = this.getStage();
        if (!stage) {
          return false;
        }
        stage.content.removeChild(this.getCanvas()._canvas);
        if (this.index < stage.children.length - 1) {
          stage.content.insertBefore(this.getCanvas()._canvas, stage.children[this.index + 1].getCanvas()._canvas);
        } else {
          stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
      };
      Layer2.prototype.moveDown = function() {
        if (Node_1.Node.prototype.moveDown.call(this)) {
          var stage = this.getStage();
          if (stage) {
            var children = stage.children;
            stage.content.removeChild(this.getCanvas()._canvas);
            stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
          }
          return true;
        }
        return false;
      };
      Layer2.prototype.moveToBottom = function() {
        if (Node_1.Node.prototype.moveToBottom.call(this)) {
          var stage = this.getStage();
          if (stage) {
            var children = stage.children;
            stage.content.removeChild(this.getCanvas()._canvas);
            stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
          }
          return true;
        }
        return false;
      };
      Layer2.prototype.getLayer = function() {
        return this;
      };
      Layer2.prototype.remove = function() {
        var _canvas = this.getCanvas()._canvas;
        Node_1.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) {
          _canvas.parentNode.removeChild(_canvas);
        }
        return this;
      };
      Layer2.prototype.getStage = function() {
        return this.parent;
      };
      Layer2.prototype.setSize = function(_a) {
        var width = _a.width, height = _a.height;
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
        this._setSmoothEnabled();
        return this;
      };
      Layer2.prototype._validateAdd = function(child) {
        var type = child.getType();
        if (type !== "Group" && type !== "Shape") {
          Util_1.Util.throw("You may only add groups and shapes to a layer.");
        }
      };
      Layer2.prototype._toKonvaCanvas = function(config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== void 0 ? config.x : this.x();
        config.y = config.y !== void 0 ? config.y : this.y();
        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
      };
      Layer2.prototype._checkVisibility = function() {
        var visible = this.visible();
        if (visible) {
          this.canvas._canvas.style.display = "block";
        } else {
          this.canvas._canvas.style.display = "none";
        }
      };
      Layer2.prototype._setSmoothEnabled = function() {
        this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
      };
      Layer2.prototype.getWidth = function() {
        if (this.parent) {
          return this.parent.width();
        }
      };
      Layer2.prototype.setWidth = function() {
        Util_1.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
      };
      Layer2.prototype.getHeight = function() {
        if (this.parent) {
          return this.parent.height();
        }
      };
      Layer2.prototype.setHeight = function() {
        Util_1.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
      };
      Layer2.prototype.batchDraw = function() {
        var _this = this;
        if (!this._waitingForDraw) {
          this._waitingForDraw = true;
          Util_1.Util.requestAnimFrame(function() {
            _this.draw();
            _this._waitingForDraw = false;
          });
        }
        return this;
      };
      Layer2.prototype.getIntersection = function(pos, selector) {
        if (!this.isListening() || !this.isVisible()) {
          return null;
        }
        var spiralSearchDistance = 1;
        var continueSearch = false;
        while (true) {
          for (var i2 = 0; i2 < INTERSECTION_OFFSETS_LEN; i2++) {
            var intersectionOffset = INTERSECTION_OFFSETS[i2];
            var obj = this._getIntersection({
              x: pos.x + intersectionOffset.x * spiralSearchDistance,
              y: pos.y + intersectionOffset.y * spiralSearchDistance
            });
            var shape = obj.shape;
            if (shape && selector) {
              return shape.findAncestor(selector, true);
            } else if (shape) {
              return shape;
            }
            continueSearch = !!obj.antialiased;
            if (!obj.antialiased) {
              break;
            }
          }
          if (continueSearch) {
            spiralSearchDistance += 1;
          } else {
            return null;
          }
        }
      };
      Layer2.prototype._getIntersection = function(pos) {
        var ratio = this.hitCanvas.pixelRatio;
        var p2 = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
        var p3 = p2[3];
        if (p3 === 255) {
          var colorKey = Util_1.Util._rgbToHex(p2[0], p2[1], p2[2]);
          var shape = Shape_1.shapes[HASH + colorKey];
          if (shape) {
            return {
              shape
            };
          }
          return {
            antialiased: true
          };
        } else if (p3 > 0) {
          return {
            antialiased: true
          };
        }
        return {};
      };
      Layer2.prototype.drawScene = function(can, top) {
        var layer = this.getLayer(), canvas = can || layer && layer.getCanvas();
        this._fire(BEFORE_DRAW, {
          node: this
        });
        if (this.clearBeforeDraw()) {
          canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
          node: this
        });
        return this;
      };
      Layer2.prototype.drawHit = function(can, top) {
        var layer = this.getLayer(), canvas = can || layer && layer.hitCanvas;
        if (layer && layer.clearBeforeDraw()) {
          layer.getHitCanvas().getContext().clear();
        }
        Container_1.Container.prototype.drawHit.call(this, canvas, top);
        return this;
      };
      Layer2.prototype.enableHitGraph = function() {
        this.hitGraphEnabled(true);
        return this;
      };
      Layer2.prototype.disableHitGraph = function() {
        this.hitGraphEnabled(false);
        return this;
      };
      Layer2.prototype.setHitGraphEnabled = function(val) {
        Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
        this.listening(val);
      };
      Layer2.prototype.getHitGraphEnabled = function(val) {
        Util_1.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
        return this.listening();
      };
      Layer2.prototype.toggleHitCanvas = function() {
        if (!this.parent) {
          return;
        }
        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
          parent.content.removeChild(this.hitCanvas._canvas);
        } else {
          parent.content.appendChild(this.hitCanvas._canvas);
        }
      };
      return Layer2;
    }(Container_1.Container);
    exports.Layer = Layer;
    Layer.prototype.nodeType = "Layer";
    Global_1._registerNode(Layer);
    Factory_1.Factory.addGetterSetter(Layer, "imageSmoothingEnabled", true);
    Factory_1.Factory.addGetterSetter(Layer, "clearBeforeDraw", true);
    Factory_1.Factory.addGetterSetter(Layer, "hitGraphEnabled", true, Validators_1.getBooleanValidator());
    Util_1.Collection.mapMethods(Layer);
  });

  // node_modules/konva/lib/FastLayer.js
  var require_FastLayer = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.FastLayer = void 0;
    var Util_1 = require_Util();
    var Layer_1 = require_Layer();
    var Global_1 = require_Global();
    var FastLayer = function(_super) {
      __extends(FastLayer2, _super);
      function FastLayer2(attrs) {
        var _this = _super.call(this, attrs) || this;
        _this.listening(false);
        Util_1.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
        return _this;
      }
      return FastLayer2;
    }(Layer_1.Layer);
    exports.FastLayer = FastLayer;
    FastLayer.prototype.nodeType = "FastLayer";
    Global_1._registerNode(FastLayer);
    Util_1.Collection.mapMethods(FastLayer);
  });

  // node_modules/konva/lib/Group.js
  var require_Group = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Group = void 0;
    var Util_1 = require_Util();
    var Container_1 = require_Container();
    var Global_1 = require_Global();
    var Group = function(_super) {
      __extends(Group2, _super);
      function Group2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Group2.prototype._validateAdd = function(child) {
        var type = child.getType();
        if (type !== "Group" && type !== "Shape") {
          Util_1.Util.throw("You may only add groups and shapes to groups.");
        }
      };
      return Group2;
    }(Container_1.Container);
    exports.Group = Group;
    Group.prototype.nodeType = "Group";
    Global_1._registerNode(Group);
    Util_1.Collection.mapMethods(Group);
  });

  // node_modules/konva/lib/Animation.js
  var require_Animation = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Animation = void 0;
    var Global_1 = require_Global();
    var now = function() {
      if (Global_1.glob.performance && Global_1.glob.performance.now) {
        return function() {
          return Global_1.glob.performance.now();
        };
      }
      return function() {
        return new Date().getTime();
      };
    }();
    var Animation = function() {
      function Animation2(func, layers) {
        this.id = Animation2.animIdCounter++;
        this.frame = {
          time: 0,
          timeDiff: 0,
          lastTime: now(),
          frameRate: 0
        };
        this.func = func;
        this.setLayers(layers);
      }
      Animation2.prototype.setLayers = function(layers) {
        var lays = [];
        if (!layers) {
          lays = [];
        } else if (layers.length > 0) {
          lays = layers;
        } else {
          lays = [layers];
        }
        this.layers = lays;
        return this;
      };
      Animation2.prototype.getLayers = function() {
        return this.layers;
      };
      Animation2.prototype.addLayer = function(layer) {
        var layers = this.layers, len = layers.length, n2;
        for (n2 = 0; n2 < len; n2++) {
          if (layers[n2]._id === layer._id) {
            return false;
          }
        }
        this.layers.push(layer);
        return true;
      };
      Animation2.prototype.isRunning = function() {
        var a2 = Animation2, animations = a2.animations, len = animations.length, n2;
        for (n2 = 0; n2 < len; n2++) {
          if (animations[n2].id === this.id) {
            return true;
          }
        }
        return false;
      };
      Animation2.prototype.start = function() {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation2._addAnimation(this);
        return this;
      };
      Animation2.prototype.stop = function() {
        Animation2._removeAnimation(this);
        return this;
      };
      Animation2.prototype._updateFrameObject = function(time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1e3 / this.frame.timeDiff;
      };
      Animation2._addAnimation = function(anim) {
        this.animations.push(anim);
        this._handleAnimation();
      };
      Animation2._removeAnimation = function(anim) {
        var id = anim.id, animations = this.animations, len = animations.length, n2;
        for (n2 = 0; n2 < len; n2++) {
          if (animations[n2].id === id) {
            this.animations.splice(n2, 1);
            break;
          }
        }
      };
      Animation2._runFrames = function() {
        var layerHash = {}, animations = this.animations, anim, layers, func, n2, i2, layersLen, layer, key, needRedraw;
        for (n2 = 0; n2 < animations.length; n2++) {
          anim = animations[n2];
          layers = anim.layers;
          func = anim.func;
          anim._updateFrameObject(now());
          layersLen = layers.length;
          if (func) {
            needRedraw = func.call(anim, anim.frame) !== false;
          } else {
            needRedraw = true;
          }
          if (!needRedraw) {
            continue;
          }
          for (i2 = 0; i2 < layersLen; i2++) {
            layer = layers[i2];
            if (layer._id !== void 0) {
              layerHash[layer._id] = layer;
            }
          }
        }
        for (key in layerHash) {
          if (!layerHash.hasOwnProperty(key)) {
            continue;
          }
          layerHash[key].draw();
        }
      };
      Animation2._animationLoop = function() {
        var Anim = Animation2;
        if (Anim.animations.length) {
          Anim._runFrames();
          requestAnimationFrame(Anim._animationLoop);
        } else {
          Anim.animRunning = false;
        }
      };
      Animation2._handleAnimation = function() {
        if (!this.animRunning) {
          this.animRunning = true;
          requestAnimationFrame(this._animationLoop);
        }
      };
      Animation2.animations = [];
      Animation2.animIdCounter = 0;
      Animation2.animRunning = false;
      return Animation2;
    }();
    exports.Animation = Animation;
  });

  // node_modules/konva/lib/Tween.js
  var require_Tween = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Easings = exports.Tween = void 0;
    var Util_1 = require_Util();
    var Animation_1 = require_Animation();
    var Node_1 = require_Node();
    var Global_1 = require_Global();
    var blacklist = {
      node: 1,
      duration: 1,
      easing: 1,
      onFinish: 1,
      yoyo: 1
    };
    var PAUSED = 1;
    var PLAYING = 2;
    var REVERSING = 3;
    var idCounter = 0;
    var colorAttrs = ["fill", "stroke", "shadowColor"];
    var TweenEngine = function() {
      function TweenEngine2(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
      }
      TweenEngine2.prototype.fire = function(str) {
        var handler = this[str];
        if (handler) {
          handler();
        }
      };
      TweenEngine2.prototype.setTime = function(t2) {
        if (t2 > this.duration) {
          if (this.yoyo) {
            this._time = this.duration;
            this.reverse();
          } else {
            this.finish();
          }
        } else if (t2 < 0) {
          if (this.yoyo) {
            this._time = 0;
            this.play();
          } else {
            this.reset();
          }
        } else {
          this._time = t2;
          this.update();
        }
      };
      TweenEngine2.prototype.getTime = function() {
        return this._time;
      };
      TweenEngine2.prototype.setPosition = function(p2) {
        this.prevPos = this._pos;
        this.propFunc(p2);
        this._pos = p2;
      };
      TweenEngine2.prototype.getPosition = function(t2) {
        if (t2 === void 0) {
          t2 = this._time;
        }
        return this.func(t2, this.begin, this._change, this.duration);
      };
      TweenEngine2.prototype.play = function() {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire("onPlay");
      };
      TweenEngine2.prototype.reverse = function() {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire("onReverse");
      };
      TweenEngine2.prototype.seek = function(t2) {
        this.pause();
        this._time = t2;
        this.update();
        this.fire("onSeek");
      };
      TweenEngine2.prototype.reset = function() {
        this.pause();
        this._time = 0;
        this.update();
        this.fire("onReset");
      };
      TweenEngine2.prototype.finish = function() {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire("onFinish");
      };
      TweenEngine2.prototype.update = function() {
        this.setPosition(this.getPosition(this._time));
        this.fire("onUpdate");
      };
      TweenEngine2.prototype.onEnterFrame = function() {
        var t2 = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
          this.setTime(t2);
        } else if (this.state === REVERSING) {
          this.setTime(this.duration - t2);
        }
      };
      TweenEngine2.prototype.pause = function() {
        this.state = PAUSED;
        this.fire("onPause");
      };
      TweenEngine2.prototype.getTimer = function() {
        return new Date().getTime();
      };
      return TweenEngine2;
    }();
    var Tween = function() {
      function Tween2(config) {
        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
        if (typeof config.duration === "undefined") {
          duration = 0.3;
        } else if (config.duration === 0) {
          duration = 1e-3;
        } else {
          duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        var layers = node.getLayer() || (node instanceof Global_1.Konva["Stage"] ? node.getLayers() : null);
        if (!layers) {
          Util_1.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first.");
        }
        this.anim = new Animation_1.Animation(function() {
          that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function(i2) {
          that._tweenFunc(i2);
        }, easing, 0, 1, duration * 1e3, yoyo);
        this._addListeners();
        if (!Tween2.attrs[nodeId]) {
          Tween2.attrs[nodeId] = {};
        }
        if (!Tween2.attrs[nodeId][this._id]) {
          Tween2.attrs[nodeId][this._id] = {};
        }
        if (!Tween2.tweens[nodeId]) {
          Tween2.tweens[nodeId] = {};
        }
        for (key in config) {
          if (blacklist[key] === void 0) {
            this._addAttr(key, config[key]);
          }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
        this.onUpdate = config.onUpdate;
      }
      Tween2.prototype._addAttr = function(key, end) {
        var node = this.node, nodeId = node._id, start2, diff, tweenId, n2, len, trueEnd, trueStart, endRGBA;
        tweenId = Tween2.tweens[nodeId][key];
        if (tweenId) {
          delete Tween2.attrs[nodeId][tweenId][key];
        }
        start2 = node.getAttr(key);
        if (Util_1.Util._isArray(end)) {
          diff = [];
          len = Math.max(end.length, start2.length);
          if (key === "points" && end.length !== start2.length) {
            if (end.length > start2.length) {
              trueStart = start2;
              start2 = Util_1.Util._prepareArrayForTween(start2, end, node.closed());
            } else {
              trueEnd = end;
              end = Util_1.Util._prepareArrayForTween(end, start2, node.closed());
            }
          }
          if (key.indexOf("fill") === 0) {
            for (n2 = 0; n2 < len; n2++) {
              if (n2 % 2 === 0) {
                diff.push(end[n2] - start2[n2]);
              } else {
                var startRGBA = Util_1.Util.colorToRGBA(start2[n2]);
                endRGBA = Util_1.Util.colorToRGBA(end[n2]);
                start2[n2] = startRGBA;
                diff.push({
                  r: endRGBA.r - startRGBA.r,
                  g: endRGBA.g - startRGBA.g,
                  b: endRGBA.b - startRGBA.b,
                  a: endRGBA.a - startRGBA.a
                });
              }
            }
          } else {
            for (n2 = 0; n2 < len; n2++) {
              diff.push(end[n2] - start2[n2]);
            }
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          start2 = Util_1.Util.colorToRGBA(start2);
          endRGBA = Util_1.Util.colorToRGBA(end);
          diff = {
            r: endRGBA.r - start2.r,
            g: endRGBA.g - start2.g,
            b: endRGBA.b - start2.b,
            a: endRGBA.a - start2.a
          };
        } else {
          diff = end - start2;
        }
        Tween2.attrs[nodeId][this._id][key] = {
          start: start2,
          diff,
          end,
          trueEnd,
          trueStart
        };
        Tween2.tweens[nodeId][key] = this._id;
      };
      Tween2.prototype._tweenFunc = function(i2) {
        var node = this.node, attrs = Tween2.attrs[node._id][this._id], key, attr, start2, diff, newVal, n2, len, end;
        for (key in attrs) {
          attr = attrs[key];
          start2 = attr.start;
          diff = attr.diff;
          end = attr.end;
          if (Util_1.Util._isArray(start2)) {
            newVal = [];
            len = Math.max(start2.length, end.length);
            if (key.indexOf("fill") === 0) {
              for (n2 = 0; n2 < len; n2++) {
                if (n2 % 2 === 0) {
                  newVal.push((start2[n2] || 0) + diff[n2] * i2);
                } else {
                  newVal.push("rgba(" + Math.round(start2[n2].r + diff[n2].r * i2) + "," + Math.round(start2[n2].g + diff[n2].g * i2) + "," + Math.round(start2[n2].b + diff[n2].b * i2) + "," + (start2[n2].a + diff[n2].a * i2) + ")");
                }
              }
            } else {
              for (n2 = 0; n2 < len; n2++) {
                newVal.push((start2[n2] || 0) + diff[n2] * i2);
              }
            }
          } else if (colorAttrs.indexOf(key) !== -1) {
            newVal = "rgba(" + Math.round(start2.r + diff.r * i2) + "," + Math.round(start2.g + diff.g * i2) + "," + Math.round(start2.b + diff.b * i2) + "," + (start2.a + diff.a * i2) + ")";
          } else {
            newVal = start2 + diff * i2;
          }
          node.setAttr(key, newVal);
        }
      };
      Tween2.prototype._addListeners = function() {
        var _this = this;
        this.tween.onPlay = function() {
          _this.anim.start();
        };
        this.tween.onReverse = function() {
          _this.anim.start();
        };
        this.tween.onPause = function() {
          _this.anim.stop();
        };
        this.tween.onFinish = function() {
          var node = _this.node;
          var attrs = Tween2.attrs[node._id][_this._id];
          if (attrs.points && attrs.points.trueEnd) {
            node.setAttr("points", attrs.points.trueEnd);
          }
          if (_this.onFinish) {
            _this.onFinish.call(_this);
          }
        };
        this.tween.onReset = function() {
          var node = _this.node;
          var attrs = Tween2.attrs[node._id][_this._id];
          if (attrs.points && attrs.points.trueStart) {
            node.points(attrs.points.trueStart);
          }
          if (_this.onReset) {
            _this.onReset();
          }
        };
        this.tween.onUpdate = function() {
          if (_this.onUpdate) {
            _this.onUpdate.call(_this);
          }
        };
      };
      Tween2.prototype.play = function() {
        this.tween.play();
        return this;
      };
      Tween2.prototype.reverse = function() {
        this.tween.reverse();
        return this;
      };
      Tween2.prototype.reset = function() {
        this.tween.reset();
        return this;
      };
      Tween2.prototype.seek = function(t2) {
        this.tween.seek(t2 * 1e3);
        return this;
      };
      Tween2.prototype.pause = function() {
        this.tween.pause();
        return this;
      };
      Tween2.prototype.finish = function() {
        this.tween.finish();
        return this;
      };
      Tween2.prototype.destroy = function() {
        var nodeId = this.node._id, thisId = this._id, attrs = Tween2.tweens[nodeId], key;
        this.pause();
        for (key in attrs) {
          delete Tween2.tweens[nodeId][key];
        }
        delete Tween2.attrs[nodeId][thisId];
      };
      Tween2.attrs = {};
      Tween2.tweens = {};
      return Tween2;
    }();
    exports.Tween = Tween;
    Node_1.Node.prototype.to = function(params) {
      var onFinish = params.onFinish;
      params.node = this;
      params.onFinish = function() {
        this.destroy();
        if (onFinish) {
          onFinish();
        }
      };
      var tween = new Tween(params);
      tween.play();
    };
    exports.Easings = {
      BackEaseIn: function(t2, b2, c2, d2) {
        var s2 = 1.70158;
        return c2 * (t2 /= d2) * t2 * ((s2 + 1) * t2 - s2) + b2;
      },
      BackEaseOut: function(t2, b2, c2, d2) {
        var s2 = 1.70158;
        return c2 * ((t2 = t2 / d2 - 1) * t2 * ((s2 + 1) * t2 + s2) + 1) + b2;
      },
      BackEaseInOut: function(t2, b2, c2, d2) {
        var s2 = 1.70158;
        if ((t2 /= d2 / 2) < 1) {
          return c2 / 2 * (t2 * t2 * (((s2 *= 1.525) + 1) * t2 - s2)) + b2;
        }
        return c2 / 2 * ((t2 -= 2) * t2 * (((s2 *= 1.525) + 1) * t2 + s2) + 2) + b2;
      },
      ElasticEaseIn: function(t2, b2, c2, d2, a2, p2) {
        var s2 = 0;
        if (t2 === 0) {
          return b2;
        }
        if ((t2 /= d2) === 1) {
          return b2 + c2;
        }
        if (!p2) {
          p2 = d2 * 0.3;
        }
        if (!a2 || a2 < Math.abs(c2)) {
          a2 = c2;
          s2 = p2 / 4;
        } else {
          s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a2);
        }
        return -(a2 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2)) + b2;
      },
      ElasticEaseOut: function(t2, b2, c2, d2, a2, p2) {
        var s2 = 0;
        if (t2 === 0) {
          return b2;
        }
        if ((t2 /= d2) === 1) {
          return b2 + c2;
        }
        if (!p2) {
          p2 = d2 * 0.3;
        }
        if (!a2 || a2 < Math.abs(c2)) {
          a2 = c2;
          s2 = p2 / 4;
        } else {
          s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a2);
        }
        return a2 * Math.pow(2, -10 * t2) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2) + c2 + b2;
      },
      ElasticEaseInOut: function(t2, b2, c2, d2, a2, p2) {
        var s2 = 0;
        if (t2 === 0) {
          return b2;
        }
        if ((t2 /= d2 / 2) === 2) {
          return b2 + c2;
        }
        if (!p2) {
          p2 = d2 * (0.3 * 1.5);
        }
        if (!a2 || a2 < Math.abs(c2)) {
          a2 = c2;
          s2 = p2 / 4;
        } else {
          s2 = p2 / (2 * Math.PI) * Math.asin(c2 / a2);
        }
        if (t2 < 1) {
          return -0.5 * (a2 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2)) + b2;
        }
        return a2 * Math.pow(2, -10 * (t2 -= 1)) * Math.sin((t2 * d2 - s2) * (2 * Math.PI) / p2) * 0.5 + c2 + b2;
      },
      BounceEaseOut: function(t2, b2, c2, d2) {
        if ((t2 /= d2) < 1 / 2.75) {
          return c2 * (7.5625 * t2 * t2) + b2;
        } else if (t2 < 2 / 2.75) {
          return c2 * (7.5625 * (t2 -= 1.5 / 2.75) * t2 + 0.75) + b2;
        } else if (t2 < 2.5 / 2.75) {
          return c2 * (7.5625 * (t2 -= 2.25 / 2.75) * t2 + 0.9375) + b2;
        } else {
          return c2 * (7.5625 * (t2 -= 2.625 / 2.75) * t2 + 0.984375) + b2;
        }
      },
      BounceEaseIn: function(t2, b2, c2, d2) {
        return c2 - exports.Easings.BounceEaseOut(d2 - t2, 0, c2, d2) + b2;
      },
      BounceEaseInOut: function(t2, b2, c2, d2) {
        if (t2 < d2 / 2) {
          return exports.Easings.BounceEaseIn(t2 * 2, 0, c2, d2) * 0.5 + b2;
        } else {
          return exports.Easings.BounceEaseOut(t2 * 2 - d2, 0, c2, d2) * 0.5 + c2 * 0.5 + b2;
        }
      },
      EaseIn: function(t2, b2, c2, d2) {
        return c2 * (t2 /= d2) * t2 + b2;
      },
      EaseOut: function(t2, b2, c2, d2) {
        return -c2 * (t2 /= d2) * (t2 - 2) + b2;
      },
      EaseInOut: function(t2, b2, c2, d2) {
        if ((t2 /= d2 / 2) < 1) {
          return c2 / 2 * t2 * t2 + b2;
        }
        return -c2 / 2 * (--t2 * (t2 - 2) - 1) + b2;
      },
      StrongEaseIn: function(t2, b2, c2, d2) {
        return c2 * (t2 /= d2) * t2 * t2 * t2 * t2 + b2;
      },
      StrongEaseOut: function(t2, b2, c2, d2) {
        return c2 * ((t2 = t2 / d2 - 1) * t2 * t2 * t2 * t2 + 1) + b2;
      },
      StrongEaseInOut: function(t2, b2, c2, d2) {
        if ((t2 /= d2 / 2) < 1) {
          return c2 / 2 * t2 * t2 * t2 * t2 * t2 + b2;
        }
        return c2 / 2 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2) + b2;
      },
      Linear: function(t2, b2, c2, d2) {
        return c2 * t2 / d2 + b2;
      }
    };
  });

  // node_modules/konva/lib/_CoreInternals.js
  var require_CoreInternals = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Konva = void 0;
    var Global_1 = require_Global();
    var Util_1 = require_Util();
    var Node_1 = require_Node();
    var Container_1 = require_Container();
    var Stage_1 = require_Stage();
    var Layer_1 = require_Layer();
    var FastLayer_1 = require_FastLayer();
    var Group_1 = require_Group();
    var DragAndDrop_1 = require_DragAndDrop();
    var Shape_1 = require_Shape();
    var Animation_1 = require_Animation();
    var Tween_1 = require_Tween();
    var Context_1 = require_Context();
    var Canvas_1 = require_Canvas();
    exports.Konva = Util_1.Util._assign(Global_1.Konva, {
      Collection: Util_1.Collection,
      Util: Util_1.Util,
      Transform: Util_1.Transform,
      Node: Node_1.Node,
      ids: Node_1.ids,
      names: Node_1.names,
      Container: Container_1.Container,
      Stage: Stage_1.Stage,
      stages: Stage_1.stages,
      Layer: Layer_1.Layer,
      FastLayer: FastLayer_1.FastLayer,
      Group: Group_1.Group,
      DD: DragAndDrop_1.DD,
      Shape: Shape_1.Shape,
      shapes: Shape_1.shapes,
      Animation: Animation_1.Animation,
      Tween: Tween_1.Tween,
      Easings: Tween_1.Easings,
      Context: Context_1.Context,
      Canvas: Canvas_1.Canvas
    });
  });

  // node_modules/konva/lib/shapes/Arc.js
  var require_Arc = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Arc = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var Arc = function(_super) {
      __extends(Arc2, _super);
      function Arc2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Arc2.prototype._sceneFunc = function(context) {
        var angle = Global_1.Konva.getAngle(this.angle()), clockwise = this.clockwise();
        context.beginPath();
        context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
        context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Arc2.prototype.getWidth = function() {
        return this.outerRadius() * 2;
      };
      Arc2.prototype.getHeight = function() {
        return this.outerRadius() * 2;
      };
      Arc2.prototype.setWidth = function(width) {
        this.outerRadius(width / 2);
      };
      Arc2.prototype.setHeight = function(height) {
        this.outerRadius(height / 2);
      };
      return Arc2;
    }(Shape_1.Shape);
    exports.Arc = Arc;
    Arc.prototype._centroid = true;
    Arc.prototype.className = "Arc";
    Arc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
    Global_2._registerNode(Arc);
    Factory_1.Factory.addGetterSetter(Arc, "innerRadius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Arc, "outerRadius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Arc, "angle", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Arc, "clockwise", false, Validators_1.getBooleanValidator());
    Util_1.Collection.mapMethods(Arc);
  });

  // node_modules/konva/lib/shapes/Line.js
  var require_Line = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s2 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
        s2 += arguments[i2].length;
      for (var r2 = Array(s2), k2 = 0, i2 = 0; i2 < il; i2++)
        for (var a2 = arguments[i2], j2 = 0, jl = a2.length; j2 < jl; j2++, k2++)
          r2[k2] = a2[j2];
      return r2;
    };
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Line = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Line = function(_super) {
      __extends(Line2, _super);
      function Line2(config) {
        var _this = _super.call(this, config) || this;
        _this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
          this._clearCache("tensionPoints");
        });
        return _this;
      }
      Line2.prototype._sceneFunc = function(context) {
        var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n2;
        if (!length) {
          return;
        }
        context.beginPath();
        context.moveTo(points[0], points[1]);
        if (tension !== 0 && length > 4) {
          tp = this.getTensionPoints();
          len = tp.length;
          n2 = closed ? 0 : 4;
          if (!closed) {
            context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
          }
          while (n2 < len - 2) {
            context.bezierCurveTo(tp[n2++], tp[n2++], tp[n2++], tp[n2++], tp[n2++], tp[n2++]);
          }
          if (!closed) {
            context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
          }
        } else if (bezier) {
          n2 = 2;
          while (n2 < length) {
            context.bezierCurveTo(points[n2++], points[n2++], points[n2++], points[n2++], points[n2++], points[n2++]);
          }
        } else {
          for (n2 = 2; n2 < length; n2 += 2) {
            context.lineTo(points[n2], points[n2 + 1]);
          }
        }
        if (closed) {
          context.closePath();
          context.fillStrokeShape(this);
        } else {
          context.strokeShape(this);
        }
      };
      Line2.prototype.getTensionPoints = function() {
        return this._getCache("tensionPoints", this._getTensionPoints);
      };
      Line2.prototype._getTensionPoints = function() {
        if (this.closed()) {
          return this._getTensionPointsClosed();
        } else {
          return Util_1.Util._expandPoints(this.points(), this.tension());
        }
      };
      Line2.prototype._getTensionPointsClosed = function() {
        var p2 = this.points(), len = p2.length, tension = this.tension(), firstControlPoints = Util_1.Util._getControlPoints(p2[len - 2], p2[len - 1], p2[0], p2[1], p2[2], p2[3], tension), lastControlPoints = Util_1.Util._getControlPoints(p2[len - 4], p2[len - 3], p2[len - 2], p2[len - 1], p2[0], p2[1], tension), middle = Util_1.Util._expandPoints(p2, tension), tp = [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([
          lastControlPoints[0],
          lastControlPoints[1],
          p2[len - 2],
          p2[len - 1],
          lastControlPoints[2],
          lastControlPoints[3],
          firstControlPoints[0],
          firstControlPoints[1],
          p2[0],
          p2[1]
        ]);
        return tp;
      };
      Line2.prototype.getWidth = function() {
        return this.getSelfRect().width;
      };
      Line2.prototype.getHeight = function() {
        return this.getSelfRect().height;
      };
      Line2.prototype.getSelfRect = function() {
        var points = this.points();
        if (points.length < 4) {
          return {
            x: points[0] || 0,
            y: points[1] || 0,
            width: 0,
            height: 0
          };
        }
        if (this.tension() !== 0) {
          points = __spreadArrays([
            points[0],
            points[1]
          ], this._getTensionPoints(), [
            points[points.length - 2],
            points[points.length - 1]
          ]);
        } else {
          points = this.points();
        }
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x2, y2;
        for (var i2 = 0; i2 < points.length / 2; i2++) {
          x2 = points[i2 * 2];
          y2 = points[i2 * 2 + 1];
          minX = Math.min(minX, x2);
          maxX = Math.max(maxX, x2);
          minY = Math.min(minY, y2);
          maxY = Math.max(maxY, y2);
        }
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      };
      return Line2;
    }(Shape_1.Shape);
    exports.Line = Line;
    Line.prototype.className = "Line";
    Line.prototype._attrsAffectingSize = ["points", "bezier", "tension"];
    Global_1._registerNode(Line);
    Factory_1.Factory.addGetterSetter(Line, "closed", false);
    Factory_1.Factory.addGetterSetter(Line, "bezier", false);
    Factory_1.Factory.addGetterSetter(Line, "tension", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Line, "points", [], Validators_1.getNumberArrayValidator());
    Util_1.Collection.mapMethods(Line);
  });

  // node_modules/konva/lib/shapes/Arrow.js
  var require_Arrow = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Arrow = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Line_1 = require_Line();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Arrow = function(_super) {
      __extends(Arrow2, _super);
      function Arrow2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Arrow2.prototype._sceneFunc = function(ctx) {
        _super.prototype._sceneFunc.call(this, ctx);
        var PI2 = Math.PI * 2;
        var points = this.points();
        var tp = points;
        var fromTension = this.tension() !== 0 && points.length > 4;
        if (fromTension) {
          tp = this.getTensionPoints();
        }
        var n2 = points.length;
        var dx, dy;
        if (fromTension) {
          dx = points[n2 - 2] - (tp[tp.length - 2] + tp[tp.length - 4]) / 2;
          dy = points[n2 - 1] - (tp[tp.length - 1] + tp[tp.length - 3]) / 2;
        } else {
          dx = points[n2 - 2] - points[n2 - 4];
          dy = points[n2 - 1] - points[n2 - 3];
        }
        var radians = (Math.atan2(dy, dx) + PI2) % PI2;
        var length = this.pointerLength();
        var width = this.pointerWidth();
        ctx.save();
        ctx.beginPath();
        ctx.translate(points[n2 - 2], points[n2 - 1]);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, -width / 2);
        ctx.closePath();
        ctx.restore();
        if (this.pointerAtBeginning()) {
          ctx.save();
          ctx.translate(points[0], points[1]);
          if (fromTension) {
            dx = (tp[0] + tp[2]) / 2 - points[0];
            dy = (tp[1] + tp[3]) / 2 - points[1];
          } else {
            dx = points[2] - points[0];
            dy = points[3] - points[1];
          }
          ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
          ctx.moveTo(0, 0);
          ctx.lineTo(-length, width / 2);
          ctx.lineTo(-length, -width / 2);
          ctx.closePath();
          ctx.restore();
        }
        var isDashEnabled = this.dashEnabled();
        if (isDashEnabled) {
          this.attrs.dashEnabled = false;
          ctx.setLineDash([]);
        }
        ctx.fillStrokeShape(this);
        if (isDashEnabled) {
          this.attrs.dashEnabled = true;
        }
      };
      Arrow2.prototype.getSelfRect = function() {
        var lineRect = _super.prototype.getSelfRect.call(this);
        var offset = this.pointerWidth() / 2;
        return {
          x: lineRect.x - offset,
          y: lineRect.y - offset,
          width: lineRect.width + offset * 2,
          height: lineRect.height + offset * 2
        };
      };
      return Arrow2;
    }(Line_1.Line);
    exports.Arrow = Arrow;
    Arrow.prototype.className = "Arrow";
    Global_1._registerNode(Arrow);
    Factory_1.Factory.addGetterSetter(Arrow, "pointerLength", 10, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Arrow, "pointerWidth", 10, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Arrow, "pointerAtBeginning", false);
    Util_1.Collection.mapMethods(Arrow);
  });

  // node_modules/konva/lib/shapes/Circle.js
  var require_Circle = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Circle = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Circle = function(_super) {
      __extends(Circle2, _super);
      function Circle2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Circle2.prototype._sceneFunc = function(context) {
        context.beginPath();
        context.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Circle2.prototype.getWidth = function() {
        return this.radius() * 2;
      };
      Circle2.prototype.getHeight = function() {
        return this.radius() * 2;
      };
      Circle2.prototype.setWidth = function(width) {
        if (this.radius() !== width / 2) {
          this.radius(width / 2);
        }
      };
      Circle2.prototype.setHeight = function(height) {
        if (this.radius() !== height / 2) {
          this.radius(height / 2);
        }
      };
      return Circle2;
    }(Shape_1.Shape);
    exports.Circle = Circle;
    Circle.prototype._centroid = true;
    Circle.prototype.className = "Circle";
    Circle.prototype._attrsAffectingSize = ["radius"];
    Global_1._registerNode(Circle);
    Factory_1.Factory.addGetterSetter(Circle, "radius", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(Circle);
  });

  // node_modules/konva/lib/shapes/Ellipse.js
  var require_Ellipse = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Ellipse = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Ellipse = function(_super) {
      __extends(Ellipse2, _super);
      function Ellipse2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Ellipse2.prototype._sceneFunc = function(context) {
        var rx = this.radiusX(), ry = this.radiusY();
        context.beginPath();
        context.save();
        if (rx !== ry) {
          context.scale(1, ry / rx);
        }
        context.arc(0, 0, rx, 0, Math.PI * 2, false);
        context.restore();
        context.closePath();
        context.fillStrokeShape(this);
      };
      Ellipse2.prototype.getWidth = function() {
        return this.radiusX() * 2;
      };
      Ellipse2.prototype.getHeight = function() {
        return this.radiusY() * 2;
      };
      Ellipse2.prototype.setWidth = function(width) {
        this.radiusX(width / 2);
      };
      Ellipse2.prototype.setHeight = function(height) {
        this.radiusY(height / 2);
      };
      return Ellipse2;
    }(Shape_1.Shape);
    exports.Ellipse = Ellipse;
    Ellipse.prototype.className = "Ellipse";
    Ellipse.prototype._centroid = true;
    Ellipse.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
    Global_1._registerNode(Ellipse);
    Factory_1.Factory.addComponentsGetterSetter(Ellipse, "radius", ["x", "y"]);
    Factory_1.Factory.addGetterSetter(Ellipse, "radiusX", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Ellipse, "radiusY", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(Ellipse);
  });

  // node_modules/konva/lib/shapes/Image.js
  var require_Image = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Image = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Image2 = function(_super) {
      __extends(Image3, _super);
      function Image3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Image3.prototype._useBufferCanvas = function() {
        return _super.prototype._useBufferCanvas.call(this, true);
      };
      Image3.prototype._sceneFunc = function(context) {
        var width = this.getWidth();
        var height = this.getHeight();
        var image = this.attrs.image;
        var params;
        if (image) {
          var cropWidth = this.attrs.cropWidth;
          var cropHeight = this.attrs.cropHeight;
          if (cropWidth && cropHeight) {
            params = [
              image,
              this.cropX(),
              this.cropY(),
              cropWidth,
              cropHeight,
              0,
              0,
              width,
              height
            ];
          } else {
            params = [image, 0, 0, width, height];
          }
        }
        if (this.hasFill() || this.hasStroke()) {
          context.beginPath();
          context.rect(0, 0, width, height);
          context.closePath();
          context.fillStrokeShape(this);
        }
        if (image) {
          context.drawImage.apply(context, params);
        }
      };
      Image3.prototype._hitFunc = function(context) {
        var width = this.width(), height = this.height();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Image3.prototype.getWidth = function() {
        var _a, _b;
        return (_a = this.attrs.width) !== null && _a !== void 0 ? _a : ((_b = this.image()) === null || _b === void 0 ? void 0 : _b.width) || 0;
      };
      Image3.prototype.getHeight = function() {
        var _a, _b;
        return (_a = this.attrs.height) !== null && _a !== void 0 ? _a : ((_b = this.image()) === null || _b === void 0 ? void 0 : _b.height) || 0;
      };
      Image3.fromURL = function(url, callback) {
        var img = Util_1.Util.createImageElement();
        img.onload = function() {
          var image = new Image3({
            image: img
          });
          callback(image);
        };
        img.crossOrigin = "Anonymous";
        img.src = url;
      };
      return Image3;
    }(Shape_1.Shape);
    exports.Image = Image2;
    Image2.prototype.className = "Image";
    Global_1._registerNode(Image2);
    Factory_1.Factory.addGetterSetter(Image2, "image");
    Factory_1.Factory.addComponentsGetterSetter(Image2, "crop", ["x", "y", "width", "height"]);
    Factory_1.Factory.addGetterSetter(Image2, "cropX", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Image2, "cropY", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Image2, "cropWidth", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Image2, "cropHeight", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(Image2);
  });

  // node_modules/konva/lib/shapes/Label.js
  var require_Label = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Tag = exports.Label = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Group_1 = require_Group();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var ATTR_CHANGE_LIST = [
      "fontFamily",
      "fontSize",
      "fontStyle",
      "padding",
      "lineHeight",
      "text",
      "width",
      "height"
    ];
    var CHANGE_KONVA = "Change.konva";
    var NONE = "none";
    var UP = "up";
    var RIGHT = "right";
    var DOWN = "down";
    var LEFT = "left";
    var attrChangeListLen = ATTR_CHANGE_LIST.length;
    var Label = function(_super) {
      __extends(Label2, _super);
      function Label2(config) {
        var _this = _super.call(this, config) || this;
        _this.on("add.konva", function(evt) {
          this._addListeners(evt.child);
          this._sync();
        });
        return _this;
      }
      Label2.prototype.getText = function() {
        return this.find("Text")[0];
      };
      Label2.prototype.getTag = function() {
        return this.find("Tag")[0];
      };
      Label2.prototype._addListeners = function(text) {
        var that = this, n2;
        var func = function() {
          that._sync();
        };
        for (n2 = 0; n2 < attrChangeListLen; n2++) {
          text.on(ATTR_CHANGE_LIST[n2] + CHANGE_KONVA, func);
        }
      };
      Label2.prototype.getWidth = function() {
        return this.getText().width();
      };
      Label2.prototype.getHeight = function() {
        return this.getText().height();
      };
      Label2.prototype._sync = function() {
        var text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x2, y2, pointerHeight;
        if (text && tag) {
          width = text.width();
          height = text.height();
          pointerDirection = tag.pointerDirection();
          pointerWidth = tag.pointerWidth();
          pointerHeight = tag.pointerHeight();
          x2 = 0;
          y2 = 0;
          switch (pointerDirection) {
            case UP:
              x2 = width / 2;
              y2 = -1 * pointerHeight;
              break;
            case RIGHT:
              x2 = width + pointerWidth;
              y2 = height / 2;
              break;
            case DOWN:
              x2 = width / 2;
              y2 = height + pointerHeight;
              break;
            case LEFT:
              x2 = -1 * pointerWidth;
              y2 = height / 2;
              break;
          }
          tag.setAttrs({
            x: -1 * x2,
            y: -1 * y2,
            width,
            height
          });
          text.setAttrs({
            x: -1 * x2,
            y: -1 * y2
          });
        }
      };
      return Label2;
    }(Group_1.Group);
    exports.Label = Label;
    Label.prototype.className = "Label";
    Global_1._registerNode(Label);
    Util_1.Collection.mapMethods(Label);
    var Tag = function(_super) {
      __extends(Tag2, _super);
      function Tag2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Tag2.prototype._sceneFunc = function(context) {
        var width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = this.cornerRadius();
        var topLeft = 0;
        var topRight = 0;
        var bottomLeft = 0;
        var bottomRight = 0;
        if (typeof cornerRadius === "number") {
          topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
        } else {
          topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
          topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
          bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
          bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
        }
        context.beginPath();
        context.moveTo(topLeft, 0);
        if (pointerDirection === UP) {
          context.lineTo((width - pointerWidth) / 2, 0);
          context.lineTo(width / 2, -1 * pointerHeight);
          context.lineTo((width + pointerWidth) / 2, 0);
        }
        context.lineTo(width - topRight, 0);
        context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
        if (pointerDirection === RIGHT) {
          context.lineTo(width, (height - pointerHeight) / 2);
          context.lineTo(width + pointerWidth, height / 2);
          context.lineTo(width, (height + pointerHeight) / 2);
        }
        context.lineTo(width, height - bottomRight);
        context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
        if (pointerDirection === DOWN) {
          context.lineTo((width + pointerWidth) / 2, height);
          context.lineTo(width / 2, height + pointerHeight);
          context.lineTo((width - pointerWidth) / 2, height);
        }
        context.lineTo(bottomLeft, height);
        context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
        if (pointerDirection === LEFT) {
          context.lineTo(0, (height + pointerHeight) / 2);
          context.lineTo(-1 * pointerWidth, height / 2);
          context.lineTo(0, (height - pointerHeight) / 2);
        }
        context.lineTo(0, topLeft);
        context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Tag2.prototype.getSelfRect = function() {
        var x2 = 0, y2 = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
        if (direction === UP) {
          y2 -= pointerHeight;
          height += pointerHeight;
        } else if (direction === DOWN) {
          height += pointerHeight;
        } else if (direction === LEFT) {
          x2 -= pointerWidth * 1.5;
          width += pointerWidth;
        } else if (direction === RIGHT) {
          width += pointerWidth * 1.5;
        }
        return {
          x: x2,
          y: y2,
          width,
          height
        };
      };
      return Tag2;
    }(Shape_1.Shape);
    exports.Tag = Tag;
    Tag.prototype.className = "Tag";
    Global_1._registerNode(Tag);
    Factory_1.Factory.addGetterSetter(Tag, "pointerDirection", NONE);
    Factory_1.Factory.addGetterSetter(Tag, "pointerWidth", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Tag, "pointerHeight", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Tag, "cornerRadius", 0, Validators_1.getNumberOrArrayOfNumbersValidator(4));
    Util_1.Collection.mapMethods(Tag);
  });

  // node_modules/konva/lib/shapes/Path.js
  var require_Path = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Path = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Path = function(_super) {
      __extends(Path2, _super);
      function Path2(config) {
        var _this = _super.call(this, config) || this;
        _this.dataArray = [];
        _this.pathLength = 0;
        _this.dataArray = Path2.parsePathData(_this.data());
        _this.pathLength = 0;
        for (var i2 = 0; i2 < _this.dataArray.length; ++i2) {
          _this.pathLength += _this.dataArray[i2].pathLength;
        }
        _this.on("dataChange.konva", function() {
          this.dataArray = Path2.parsePathData(this.data());
          this.pathLength = 0;
          for (var i3 = 0; i3 < this.dataArray.length; ++i3) {
            this.pathLength += this.dataArray[i3].pathLength;
          }
        });
        return _this;
      }
      Path2.prototype._sceneFunc = function(context) {
        var ca = this.dataArray;
        context.beginPath();
        var isClosed = false;
        for (var n2 = 0; n2 < ca.length; n2++) {
          var c2 = ca[n2].command;
          var p2 = ca[n2].points;
          switch (c2) {
            case "L":
              context.lineTo(p2[0], p2[1]);
              break;
            case "M":
              context.moveTo(p2[0], p2[1]);
              break;
            case "C":
              context.bezierCurveTo(p2[0], p2[1], p2[2], p2[3], p2[4], p2[5]);
              break;
            case "Q":
              context.quadraticCurveTo(p2[0], p2[1], p2[2], p2[3]);
              break;
            case "A":
              var cx = p2[0], cy = p2[1], rx = p2[2], ry = p2[3], theta = p2[4], dTheta = p2[5], psi = p2[6], fs = p2[7];
              var r2 = rx > ry ? rx : ry;
              var scaleX = rx > ry ? 1 : rx / ry;
              var scaleY = rx > ry ? ry / rx : 1;
              context.translate(cx, cy);
              context.rotate(psi);
              context.scale(scaleX, scaleY);
              context.arc(0, 0, r2, theta, theta + dTheta, 1 - fs);
              context.scale(1 / scaleX, 1 / scaleY);
              context.rotate(-psi);
              context.translate(-cx, -cy);
              break;
            case "z":
              isClosed = true;
              context.closePath();
              break;
          }
        }
        if (!isClosed && !this.hasFill()) {
          context.strokeShape(this);
        } else {
          context.fillStrokeShape(this);
        }
      };
      Path2.prototype.getSelfRect = function() {
        var points = [];
        this.dataArray.forEach(function(data) {
          if (data.command === "A") {
            var start2 = data.points[4];
            var dTheta = data.points[5];
            var end = data.points[4] + dTheta;
            var inc = Math.PI / 180;
            if (Math.abs(start2 - end) < inc) {
              inc = Math.abs(start2 - end);
            }
            if (dTheta < 0) {
              for (var t2 = start2 - inc; t2 > end; t2 -= inc) {
                var point = Path2.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t2, 0);
                points.push(point.x, point.y);
              }
            } else {
              for (var t2 = start2 + inc; t2 < end; t2 += inc) {
                var point = Path2.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t2, 0);
                points.push(point.x, point.y);
              }
            }
          } else if (data.command === "C") {
            for (var t2 = 0; t2 <= 1; t2 += 0.01) {
              var point = Path2.getPointOnCubicBezier(t2, data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
              points.push(point.x, point.y);
            }
          } else {
            points = points.concat(data.points);
          }
        });
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x2, y2;
        for (var i2 = 0; i2 < points.length / 2; i2++) {
          x2 = points[i2 * 2];
          y2 = points[i2 * 2 + 1];
          if (!isNaN(x2)) {
            minX = Math.min(minX, x2);
            maxX = Math.max(maxX, x2);
          }
          if (!isNaN(y2)) {
            minY = Math.min(minY, y2);
            maxY = Math.max(maxY, y2);
          }
        }
        return {
          x: Math.round(minX),
          y: Math.round(minY),
          width: Math.round(maxX - minX),
          height: Math.round(maxY - minY)
        };
      };
      Path2.prototype.getLength = function() {
        return this.pathLength;
      };
      Path2.prototype.getPointAtLength = function(length) {
        var point, i2 = 0, ii = this.dataArray.length;
        if (!ii) {
          return null;
        }
        while (i2 < ii && length > this.dataArray[i2].pathLength) {
          length -= this.dataArray[i2].pathLength;
          ++i2;
        }
        if (i2 === ii) {
          point = this.dataArray[i2 - 1].points.slice(-2);
          return {
            x: point[0],
            y: point[1]
          };
        }
        if (length < 0.01) {
          point = this.dataArray[i2].points.slice(0, 2);
          return {
            x: point[0],
            y: point[1]
          };
        }
        var cp = this.dataArray[i2];
        var p2 = cp.points;
        switch (cp.command) {
          case "L":
            return Path2.getPointOnLine(length, cp.start.x, cp.start.y, p2[0], p2[1]);
          case "C":
            return Path2.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p2[0], p2[1], p2[2], p2[3], p2[4], p2[5]);
          case "Q":
            return Path2.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p2[0], p2[1], p2[2], p2[3]);
          case "A":
            var cx = p2[0], cy = p2[1], rx = p2[2], ry = p2[3], theta = p2[4], dTheta = p2[5], psi = p2[6];
            theta += dTheta * length / cp.pathLength;
            return Path2.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
        }
        return null;
      };
      Path2.getLineLength = function(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      };
      Path2.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
        if (fromX === void 0) {
          fromX = P1x;
        }
        if (fromY === void 0) {
          fromY = P1y;
        }
        var m2 = (P2y - P1y) / (P2x - P1x + 1e-8);
        var run = Math.sqrt(dist * dist / (1 + m2 * m2));
        if (P2x < P1x) {
          run *= -1;
        }
        var rise = m2 * run;
        var pt;
        if (P2x === P1x) {
          pt = {
            x: fromX,
            y: fromY + rise
          };
        } else if ((fromY - P1y) / (fromX - P1x + 1e-8) === m2) {
          pt = {
            x: fromX + run,
            y: fromY + rise
          };
        } else {
          var ix, iy;
          var len = this.getLineLength(P1x, P1y, P2x, P2y);
          var u2 = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
          u2 = u2 / (len * len);
          ix = P1x + u2 * (P2x - P1x);
          iy = P1y + u2 * (P2y - P1y);
          var pRise = this.getLineLength(fromX, fromY, ix, iy);
          var pRun = Math.sqrt(dist * dist - pRise * pRise);
          run = Math.sqrt(pRun * pRun / (1 + m2 * m2));
          if (P2x < P1x) {
            run *= -1;
          }
          rise = m2 * run;
          pt = {
            x: ix + run,
            y: iy + rise
          };
        }
        return pt;
      };
      Path2.getPointOnCubicBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
        function CB1(t2) {
          return t2 * t2 * t2;
        }
        function CB2(t2) {
          return 3 * t2 * t2 * (1 - t2);
        }
        function CB3(t2) {
          return 3 * t2 * (1 - t2) * (1 - t2);
        }
        function CB4(t2) {
          return (1 - t2) * (1 - t2) * (1 - t2);
        }
        var x2 = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
        var y2 = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
        return {
          x: x2,
          y: y2
        };
      };
      Path2.getPointOnQuadraticBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
        function QB1(t2) {
          return t2 * t2;
        }
        function QB2(t2) {
          return 2 * t2 * (1 - t2);
        }
        function QB3(t2) {
          return (1 - t2) * (1 - t2);
        }
        var x2 = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
        var y2 = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
        return {
          x: x2,
          y: y2
        };
      };
      Path2.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
        var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
        var pt = {
          x: rx * Math.cos(theta),
          y: ry * Math.sin(theta)
        };
        return {
          x: cx + (pt.x * cosPsi - pt.y * sinPsi),
          y: cy + (pt.x * sinPsi + pt.y * cosPsi)
        };
      };
      Path2.parsePathData = function(data) {
        if (!data) {
          return [];
        }
        var cs = data;
        var cc = [
          "m",
          "M",
          "l",
          "L",
          "v",
          "V",
          "h",
          "H",
          "z",
          "Z",
          "c",
          "C",
          "q",
          "Q",
          "t",
          "T",
          "s",
          "S",
          "a",
          "A"
        ];
        cs = cs.replace(new RegExp(" ", "g"), ",");
        for (var n2 = 0; n2 < cc.length; n2++) {
          cs = cs.replace(new RegExp(cc[n2], "g"), "|" + cc[n2]);
        }
        var arr = cs.split("|");
        var ca = [];
        var coords = [];
        var cpx = 0;
        var cpy = 0;
        var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
        var match;
        for (n2 = 1; n2 < arr.length; n2++) {
          var str = arr[n2];
          var c2 = str.charAt(0);
          str = str.slice(1);
          coords.length = 0;
          while (match = re.exec(str)) {
            coords.push(match[0]);
          }
          var p2 = [];
          for (var j2 = 0, jlen = coords.length; j2 < jlen; j2++) {
            var parsed = parseFloat(coords[j2]);
            if (!isNaN(parsed)) {
              p2.push(parsed);
            } else {
              p2.push(0);
            }
          }
          while (p2.length > 0) {
            if (isNaN(p2[0])) {
              break;
            }
            var cmd = null;
            var points = [];
            var startX = cpx, startY = cpy;
            var prevCmd, ctlPtx, ctlPty;
            var rx, ry, psi, fa, fs, x1, y1;
            switch (c2) {
              case "l":
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "L":
                cpx = p2.shift();
                cpy = p2.shift();
                points.push(cpx, cpy);
                break;
              case "m":
                var dx = p2.shift();
                var dy = p2.shift();
                cpx += dx;
                cpy += dy;
                cmd = "M";
                if (ca.length > 2 && ca[ca.length - 1].command === "z") {
                  for (var idx = ca.length - 2; idx >= 0; idx--) {
                    if (ca[idx].command === "M") {
                      cpx = ca[idx].points[0] + dx;
                      cpy = ca[idx].points[1] + dy;
                      break;
                    }
                  }
                }
                points.push(cpx, cpy);
                c2 = "l";
                break;
              case "M":
                cpx = p2.shift();
                cpy = p2.shift();
                cmd = "M";
                points.push(cpx, cpy);
                c2 = "L";
                break;
              case "h":
                cpx += p2.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "H":
                cpx = p2.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "v":
                cpy += p2.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "V":
                cpy = p2.shift();
                cmd = "L";
                points.push(cpx, cpy);
                break;
              case "C":
                points.push(p2.shift(), p2.shift(), p2.shift(), p2.shift());
                cpx = p2.shift();
                cpy = p2.shift();
                points.push(cpx, cpy);
                break;
              case "c":
                points.push(cpx + p2.shift(), cpy + p2.shift(), cpx + p2.shift(), cpy + p2.shift());
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "S":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "C") {
                  ctlPtx = cpx + (cpx - prevCmd.points[2]);
                  ctlPty = cpy + (cpy - prevCmd.points[3]);
                }
                points.push(ctlPtx, ctlPty, p2.shift(), p2.shift());
                cpx = p2.shift();
                cpy = p2.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "s":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "C") {
                  ctlPtx = cpx + (cpx - prevCmd.points[2]);
                  ctlPty = cpy + (cpy - prevCmd.points[3]);
                }
                points.push(ctlPtx, ctlPty, cpx + p2.shift(), cpy + p2.shift());
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "C";
                points.push(cpx, cpy);
                break;
              case "Q":
                points.push(p2.shift(), p2.shift());
                cpx = p2.shift();
                cpy = p2.shift();
                points.push(cpx, cpy);
                break;
              case "q":
                points.push(cpx + p2.shift(), cpy + p2.shift());
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "Q";
                points.push(cpx, cpy);
                break;
              case "T":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "Q") {
                  ctlPtx = cpx + (cpx - prevCmd.points[0]);
                  ctlPty = cpy + (cpy - prevCmd.points[1]);
                }
                cpx = p2.shift();
                cpy = p2.shift();
                cmd = "Q";
                points.push(ctlPtx, ctlPty, cpx, cpy);
                break;
              case "t":
                ctlPtx = cpx;
                ctlPty = cpy;
                prevCmd = ca[ca.length - 1];
                if (prevCmd.command === "Q") {
                  ctlPtx = cpx + (cpx - prevCmd.points[0]);
                  ctlPty = cpy + (cpy - prevCmd.points[1]);
                }
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "Q";
                points.push(ctlPtx, ctlPty, cpx, cpy);
                break;
              case "A":
                rx = p2.shift();
                ry = p2.shift();
                psi = p2.shift();
                fa = p2.shift();
                fs = p2.shift();
                x1 = cpx;
                y1 = cpy;
                cpx = p2.shift();
                cpy = p2.shift();
                cmd = "A";
                points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                break;
              case "a":
                rx = p2.shift();
                ry = p2.shift();
                psi = p2.shift();
                fa = p2.shift();
                fs = p2.shift();
                x1 = cpx;
                y1 = cpy;
                cpx += p2.shift();
                cpy += p2.shift();
                cmd = "A";
                points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                break;
            }
            ca.push({
              command: cmd || c2,
              points,
              start: {
                x: startX,
                y: startY
              },
              pathLength: this.calcLength(startX, startY, cmd || c2, points)
            });
          }
          if (c2 === "z" || c2 === "Z") {
            ca.push({
              command: "z",
              points: [],
              start: void 0,
              pathLength: 0
            });
          }
        }
        return ca;
      };
      Path2.calcLength = function(x2, y2, cmd, points) {
        var len, p1, p2, t2;
        var path = Path2;
        switch (cmd) {
          case "L":
            return path.getLineLength(x2, y2, points[0], points[1]);
          case "C":
            len = 0;
            p1 = path.getPointOnCubicBezier(0, x2, y2, points[0], points[1], points[2], points[3], points[4], points[5]);
            for (t2 = 0.01; t2 <= 1; t2 += 0.01) {
              p2 = path.getPointOnCubicBezier(t2, x2, y2, points[0], points[1], points[2], points[3], points[4], points[5]);
              len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
            return len;
          case "Q":
            len = 0;
            p1 = path.getPointOnQuadraticBezier(0, x2, y2, points[0], points[1], points[2], points[3]);
            for (t2 = 0.01; t2 <= 1; t2 += 0.01) {
              p2 = path.getPointOnQuadraticBezier(t2, x2, y2, points[0], points[1], points[2], points[3]);
              len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
            return len;
          case "A":
            len = 0;
            var start2 = points[4];
            var dTheta = points[5];
            var end = points[4] + dTheta;
            var inc = Math.PI / 180;
            if (Math.abs(start2 - end) < inc) {
              inc = Math.abs(start2 - end);
            }
            p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start2, 0);
            if (dTheta < 0) {
              for (t2 = start2 - inc; t2 > end; t2 -= inc) {
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t2, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
              }
            } else {
              for (t2 = start2 + inc; t2 < end; t2 += inc) {
                p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t2, 0);
                len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
              }
            }
            p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            return len;
        }
        return 0;
      };
      Path2.convertEndpointToCenterParameterization = function(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
        var psi = psiDeg * (Math.PI / 180);
        var xp = Math.cos(psi) * (x1 - x2) / 2 + Math.sin(psi) * (y1 - y2) / 2;
        var yp = -1 * Math.sin(psi) * (x1 - x2) / 2 + Math.cos(psi) * (y1 - y2) / 2;
        var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
        if (lambda > 1) {
          rx *= Math.sqrt(lambda);
          ry *= Math.sqrt(lambda);
        }
        var f2 = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
        if (fa === fs) {
          f2 *= -1;
        }
        if (isNaN(f2)) {
          f2 = 0;
        }
        var cxp = f2 * rx * yp / ry;
        var cyp = f2 * -ry * xp / rx;
        var cx = (x1 + x2) / 2 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
        var cy = (y1 + y2) / 2 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
        var vMag = function(v3) {
          return Math.sqrt(v3[0] * v3[0] + v3[1] * v3[1]);
        };
        var vRatio = function(u3, v3) {
          return (u3[0] * v3[0] + u3[1] * v3[1]) / (vMag(u3) * vMag(v3));
        };
        var vAngle = function(u3, v3) {
          return (u3[0] * v3[1] < u3[1] * v3[0] ? -1 : 1) * Math.acos(vRatio(u3, v3));
        };
        var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
        var u2 = [(xp - cxp) / rx, (yp - cyp) / ry];
        var v2 = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
        var dTheta = vAngle(u2, v2);
        if (vRatio(u2, v2) <= -1) {
          dTheta = Math.PI;
        }
        if (vRatio(u2, v2) >= 1) {
          dTheta = 0;
        }
        if (fs === 0 && dTheta > 0) {
          dTheta = dTheta - 2 * Math.PI;
        }
        if (fs === 1 && dTheta < 0) {
          dTheta = dTheta + 2 * Math.PI;
        }
        return [cx, cy, rx, ry, theta, dTheta, psi, fs];
      };
      return Path2;
    }(Shape_1.Shape);
    exports.Path = Path;
    Path.prototype.className = "Path";
    Path.prototype._attrsAffectingSize = ["data"];
    Global_1._registerNode(Path);
    Factory_1.Factory.addGetterSetter(Path, "data");
    Util_1.Collection.mapMethods(Path);
  });

  // node_modules/konva/lib/shapes/Rect.js
  var require_Rect = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Rect = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Rect2 = function(_super) {
      __extends(Rect3, _super);
      function Rect3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Rect3.prototype._sceneFunc = function(context) {
        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
          context.rect(0, 0, width, height);
        } else {
          var topLeft = 0;
          var topRight = 0;
          var bottomLeft = 0;
          var bottomRight = 0;
          if (typeof cornerRadius === "number") {
            topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
          } else {
            topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
            topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
            bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
            bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
          }
          context.moveTo(topLeft, 0);
          context.lineTo(width - topRight, 0);
          context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
          context.lineTo(width, height - bottomRight);
          context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
          context.lineTo(bottomLeft, height);
          context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
          context.lineTo(0, topLeft);
          context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
      };
      return Rect3;
    }(Shape_1.Shape);
    exports.Rect = Rect2;
    Rect2.prototype.className = "Rect";
    Global_1._registerNode(Rect2);
    Factory_1.Factory.addGetterSetter(Rect2, "cornerRadius", 0, Validators_1.getNumberOrArrayOfNumbersValidator(4));
    Util_1.Collection.mapMethods(Rect2);
  });

  // node_modules/konva/lib/shapes/RegularPolygon.js
  var require_RegularPolygon = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.RegularPolygon = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var RegularPolygon = function(_super) {
      __extends(RegularPolygon2, _super);
      function RegularPolygon2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      RegularPolygon2.prototype._sceneFunc = function(context) {
        var points = this._getPoints();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var n2 = 1; n2 < points.length; n2++) {
          context.lineTo(points[n2].x, points[n2].y);
        }
        context.closePath();
        context.fillStrokeShape(this);
      };
      RegularPolygon2.prototype._getPoints = function() {
        var sides = this.attrs.sides;
        var radius = this.attrs.radius || 0;
        var points = [];
        for (var n2 = 0; n2 < sides; n2++) {
          points.push({
            x: radius * Math.sin(n2 * 2 * Math.PI / sides),
            y: -1 * radius * Math.cos(n2 * 2 * Math.PI / sides)
          });
        }
        return points;
      };
      RegularPolygon2.prototype.getSelfRect = function() {
        var points = this._getPoints();
        var minX = points[0].x;
        var maxX = points[0].y;
        var minY = points[0].x;
        var maxY = points[0].y;
        points.forEach(function(point) {
          minX = Math.min(minX, point.x);
          maxX = Math.max(maxX, point.x);
          minY = Math.min(minY, point.y);
          maxY = Math.max(maxY, point.y);
        });
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      };
      RegularPolygon2.prototype.getWidth = function() {
        return this.radius() * 2;
      };
      RegularPolygon2.prototype.getHeight = function() {
        return this.radius() * 2;
      };
      RegularPolygon2.prototype.setWidth = function(width) {
        this.radius(width / 2);
      };
      RegularPolygon2.prototype.setHeight = function(height) {
        this.radius(height / 2);
      };
      return RegularPolygon2;
    }(Shape_1.Shape);
    exports.RegularPolygon = RegularPolygon;
    RegularPolygon.prototype.className = "RegularPolygon";
    RegularPolygon.prototype._centroid = true;
    RegularPolygon.prototype._attrsAffectingSize = ["radius"];
    Global_1._registerNode(RegularPolygon);
    Factory_1.Factory.addGetterSetter(RegularPolygon, "radius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(RegularPolygon, "sides", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(RegularPolygon);
  });

  // node_modules/konva/lib/shapes/Ring.js
  var require_Ring = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Ring = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var PIx2 = Math.PI * 2;
    var Ring = function(_super) {
      __extends(Ring2, _super);
      function Ring2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Ring2.prototype._sceneFunc = function(context) {
        context.beginPath();
        context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
        context.moveTo(this.outerRadius(), 0);
        context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Ring2.prototype.getWidth = function() {
        return this.outerRadius() * 2;
      };
      Ring2.prototype.getHeight = function() {
        return this.outerRadius() * 2;
      };
      Ring2.prototype.setWidth = function(width) {
        this.outerRadius(width / 2);
      };
      Ring2.prototype.setHeight = function(height) {
        this.outerRadius(height / 2);
      };
      return Ring2;
    }(Shape_1.Shape);
    exports.Ring = Ring;
    Ring.prototype.className = "Ring";
    Ring.prototype._centroid = true;
    Ring.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
    Global_1._registerNode(Ring);
    Factory_1.Factory.addGetterSetter(Ring, "innerRadius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Ring, "outerRadius", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(Ring);
  });

  // node_modules/konva/lib/shapes/Sprite.js
  var require_Sprite = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Sprite = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Animation_1 = require_Animation();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Sprite = function(_super) {
      __extends(Sprite2, _super);
      function Sprite2(config) {
        var _this = _super.call(this, config) || this;
        _this._updated = true;
        _this.anim = new Animation_1.Animation(function() {
          var updated = _this._updated;
          _this._updated = false;
          return updated;
        });
        _this.on("animationChange.konva", function() {
          this.frameIndex(0);
        });
        _this.on("frameIndexChange.konva", function() {
          this._updated = true;
        });
        _this.on("frameRateChange.konva", function() {
          if (!this.anim.isRunning()) {
            return;
          }
          clearInterval(this.interval);
          this._setInterval();
        });
        return _this;
      }
      Sprite2.prototype._sceneFunc = function(context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x2 = set[ix4 + 0], y2 = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
        if (this.hasFill() || this.hasStroke()) {
          context.beginPath();
          context.rect(0, 0, width, height);
          context.closePath();
          context.fillStrokeShape(this);
        }
        if (image) {
          if (offsets) {
            var offset = offsets[anim], ix2 = index * 2;
            context.drawImage(image, x2, y2, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
          } else {
            context.drawImage(image, x2, y2, width, height, 0, 0, width, height);
          }
        }
      };
      Sprite2.prototype._hitFunc = function(context) {
        var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
        context.beginPath();
        if (offsets) {
          var offset = offsets[anim];
          var ix2 = index * 2;
          context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
        } else {
          context.rect(0, 0, width, height);
        }
        context.closePath();
        context.fillShape(this);
      };
      Sprite2.prototype._useBufferCanvas = function() {
        return _super.prototype._useBufferCanvas.call(this, true);
      };
      Sprite2.prototype._setInterval = function() {
        var that = this;
        this.interval = setInterval(function() {
          that._updateIndex();
        }, 1e3 / this.frameRate());
      };
      Sprite2.prototype.start = function() {
        if (this.isRunning()) {
          return;
        }
        var layer = this.getLayer();
        this.anim.setLayers(layer);
        this._setInterval();
        this.anim.start();
      };
      Sprite2.prototype.stop = function() {
        this.anim.stop();
        clearInterval(this.interval);
      };
      Sprite2.prototype.isRunning = function() {
        return this.anim.isRunning();
      };
      Sprite2.prototype._updateIndex = function() {
        var index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
        if (index < len - 1) {
          this.frameIndex(index + 1);
        } else {
          this.frameIndex(0);
        }
      };
      return Sprite2;
    }(Shape_1.Shape);
    exports.Sprite = Sprite;
    Sprite.prototype.className = "Sprite";
    Global_1._registerNode(Sprite);
    Factory_1.Factory.addGetterSetter(Sprite, "animation");
    Factory_1.Factory.addGetterSetter(Sprite, "animations");
    Factory_1.Factory.addGetterSetter(Sprite, "frameOffsets");
    Factory_1.Factory.addGetterSetter(Sprite, "image");
    Factory_1.Factory.addGetterSetter(Sprite, "frameIndex", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Sprite, "frameRate", 17, Validators_1.getNumberValidator());
    Factory_1.Factory.backCompat(Sprite, {
      index: "frameIndex",
      getIndex: "getFrameIndex",
      setIndex: "setFrameIndex"
    });
    Util_1.Collection.mapMethods(Sprite);
  });

  // node_modules/konva/lib/shapes/Star.js
  var require_Star = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Star = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var Star = function(_super) {
      __extends(Star2, _super);
      function Star2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Star2.prototype._sceneFunc = function(context) {
        var innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
        context.beginPath();
        context.moveTo(0, 0 - outerRadius);
        for (var n2 = 1; n2 < numPoints * 2; n2++) {
          var radius = n2 % 2 === 0 ? outerRadius : innerRadius;
          var x2 = radius * Math.sin(n2 * Math.PI / numPoints);
          var y2 = -1 * radius * Math.cos(n2 * Math.PI / numPoints);
          context.lineTo(x2, y2);
        }
        context.closePath();
        context.fillStrokeShape(this);
      };
      Star2.prototype.getWidth = function() {
        return this.outerRadius() * 2;
      };
      Star2.prototype.getHeight = function() {
        return this.outerRadius() * 2;
      };
      Star2.prototype.setWidth = function(width) {
        this.outerRadius(width / 2);
      };
      Star2.prototype.setHeight = function(height) {
        this.outerRadius(height / 2);
      };
      return Star2;
    }(Shape_1.Shape);
    exports.Star = Star;
    Star.prototype.className = "Star";
    Star.prototype._centroid = true;
    Star.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
    Global_1._registerNode(Star);
    Factory_1.Factory.addGetterSetter(Star, "numPoints", 5, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Star, "innerRadius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Star, "outerRadius", 0, Validators_1.getNumberValidator());
    Util_1.Collection.mapMethods(Star);
  });

  // node_modules/konva/lib/shapes/Text.js
  var require_Text = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Text = exports.stringToArray = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    function stringToArray(string) {
      return Array.from(string);
    }
    exports.stringToArray = stringToArray;
    var AUTO = "auto";
    var CENTER = "center";
    var JUSTIFY = "justify";
    var CHANGE_KONVA = "Change.konva";
    var CONTEXT_2D = "2d";
    var DASH = "-";
    var LEFT = "left";
    var TEXT = "text";
    var TEXT_UPPER = "Text";
    var TOP = "top";
    var BOTTOM = "bottom";
    var MIDDLE = "middle";
    var NORMAL = "normal";
    var PX_SPACE = "px ";
    var SPACE = " ";
    var RIGHT = "right";
    var WORD = "word";
    var CHAR = "char";
    var NONE = "none";
    var ELLIPSIS = "\u2026";
    var ATTR_CHANGE_LIST = [
      "fontFamily",
      "fontSize",
      "fontStyle",
      "fontVariant",
      "padding",
      "align",
      "verticalAlign",
      "lineHeight",
      "text",
      "width",
      "height",
      "wrap",
      "ellipsis",
      "letterSpacing"
    ];
    var attrChangeListLen = ATTR_CHANGE_LIST.length;
    function normalizeFontFamily(fontFamily) {
      return fontFamily.split(",").map(function(family) {
        family = family.trim();
        var hasSpace = family.indexOf(" ") >= 0;
        var hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
        if (hasSpace && !hasQuotes) {
          family = '"' + family + '"';
        }
        return family;
      }).join(", ");
    }
    var dummyContext;
    function getDummyContext() {
      if (dummyContext) {
        return dummyContext;
      }
      dummyContext = Util_1.Util.createCanvasElement().getContext(CONTEXT_2D);
      return dummyContext;
    }
    function _fillFunc(context) {
      context.fillText(this._partialText, this._partialTextX, this._partialTextY);
    }
    function _strokeFunc(context) {
      context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
    }
    function checkDefaultFill(config) {
      config = config || {};
      if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops && !config.fillPatternImage) {
        config.fill = config.fill || "black";
      }
      return config;
    }
    var Text2 = function(_super) {
      __extends(Text3, _super);
      function Text3(config) {
        var _this = _super.call(this, checkDefaultFill(config)) || this;
        _this._partialTextX = 0;
        _this._partialTextY = 0;
        for (var n2 = 0; n2 < attrChangeListLen; n2++) {
          _this.on(ATTR_CHANGE_LIST[n2] + CHANGE_KONVA, _this._setTextData);
        }
        _this._setTextData();
        return _this;
      }
      Text3.prototype._sceneFunc = function(context) {
        var textArr = this.textArr, textArrLen = textArr.length;
        if (!this.text()) {
          return;
        }
        var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf("underline") !== -1, shouldLineThrough = textDecoration.indexOf("line-through") !== -1, n2;
        var translateY = 0;
        var translateY = lineHeightPx / 2;
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        context.setAttr("font", this._getContextFont());
        context.setAttr("textBaseline", MIDDLE);
        context.setAttr("textAlign", LEFT);
        if (verticalAlign === MIDDLE) {
          alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        } else if (verticalAlign === BOTTOM) {
          alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }
        context.translate(padding, alignY + padding);
        for (n2 = 0; n2 < textArrLen; n2++) {
          var lineTranslateX = 0;
          var lineTranslateY = 0;
          var obj = textArr[n2], text = obj.text, width = obj.width, lastLine = n2 !== textArrLen - 1, spacesNumber, oneWord, lineWidth;
          context.save();
          if (align === RIGHT) {
            lineTranslateX += totalWidth - width - padding * 2;
          } else if (align === CENTER) {
            lineTranslateX += (totalWidth - width - padding * 2) / 2;
          }
          if (shouldUnderline) {
            context.save();
            context.beginPath();
            context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
            spacesNumber = text.split(" ").length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
            context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
            context.lineWidth = fontSize / 15;
            context.strokeStyle = fill;
            context.stroke();
            context.restore();
          }
          if (shouldLineThrough) {
            context.save();
            context.beginPath();
            context.moveTo(lineTranslateX, translateY + lineTranslateY);
            spacesNumber = text.split(" ").length - 1;
            oneWord = spacesNumber === 0;
            lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
            context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
            context.lineWidth = fontSize / 15;
            context.strokeStyle = fill;
            context.stroke();
            context.restore();
          }
          if (letterSpacing !== 0 || align === JUSTIFY) {
            spacesNumber = text.split(" ").length - 1;
            var array = stringToArray(text);
            for (var li = 0; li < array.length; li++) {
              var letter = array[li];
              if (letter === " " && n2 !== textArrLen - 1 && align === JUSTIFY) {
                lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
              }
              this._partialTextX = lineTranslateX;
              this._partialTextY = translateY + lineTranslateY;
              this._partialText = letter;
              context.fillStrokeShape(this);
              lineTranslateX += this.measureSize(letter).width + letterSpacing;
            }
          } else {
            this._partialTextX = lineTranslateX;
            this._partialTextY = translateY + lineTranslateY;
            this._partialText = text;
            context.fillStrokeShape(this);
          }
          context.restore();
          if (textArrLen > 1) {
            translateY += lineHeightPx;
          }
        }
      };
      Text3.prototype._hitFunc = function(context) {
        var width = this.getWidth(), height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Text3.prototype.setText = function(text) {
        var str = Util_1.Util._isString(text) ? text : text === null || text === void 0 ? "" : text + "";
        this._setAttr(TEXT, str);
        return this;
      };
      Text3.prototype.getWidth = function() {
        var isAuto = this.attrs.width === AUTO || this.attrs.width === void 0;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
      };
      Text3.prototype.getHeight = function() {
        var isAuto = this.attrs.height === AUTO || this.attrs.height === void 0;
        return isAuto ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
      };
      Text3.prototype.getTextWidth = function() {
        return this.textWidth;
      };
      Text3.prototype.getTextHeight = function() {
        Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
        return this.textHeight;
      };
      Text3.prototype.measureSize = function(text) {
        var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
        _context.save();
        _context.font = this._getContextFont();
        metrics = _context.measureText(text);
        _context.restore();
        return {
          width: metrics.width,
          height: fontSize
        };
      };
      Text3.prototype._getContextFont = function() {
        if (Global_1.Konva.UA.isIE) {
          return this.fontStyle() + SPACE + this.fontSize() + PX_SPACE + this.fontFamily();
        }
        return this.fontStyle() + SPACE + this.fontVariant() + SPACE + (this.fontSize() + PX_SPACE) + normalizeFontFamily(this.fontFamily());
      };
      Text3.prototype._addTextLine = function(line) {
        if (this.align() === JUSTIFY) {
          line = line.trim();
        }
        var width = this._getTextWidth(line);
        return this.textArr.push({text: line, width});
      };
      Text3.prototype._getTextWidth = function(text) {
        var letterSpacing = this.letterSpacing();
        var length = text.length;
        return getDummyContext().measureText(text).width + (length ? letterSpacing * (length - 1) : 0);
      };
      Text3.prototype._setTextData = function() {
        var lines = this.text().split("\n"), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== void 0, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis();
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
        for (var i2 = 0, max = lines.length; i2 < max; ++i2) {
          var line = lines[i2];
          var lineWidth = this._getTextWidth(line);
          if (fixedWidth && lineWidth > maxWidth) {
            while (line.length > 0) {
              var low = 0, high = line.length, match = "", matchWidth = 0;
              while (low < high) {
                var mid = low + high >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
                if (substrWidth <= maxWidth) {
                  low = mid + 1;
                  match = substr;
                  matchWidth = substrWidth;
                } else {
                  high = mid;
                }
              }
              if (match) {
                if (wrapAtWord) {
                  var wrapIndex;
                  var nextChar = line[match.length];
                  var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                  if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                    wrapIndex = match.length;
                  } else {
                    wrapIndex = Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) + 1;
                  }
                  if (wrapIndex > 0) {
                    low = wrapIndex;
                    match = match.slice(0, low);
                    matchWidth = this._getTextWidth(match);
                  }
                }
                match = match.trimRight();
                this._addTextLine(match);
                textWidth = Math.max(textWidth, matchWidth);
                currentHeightPx += lineHeightPx;
                if (!shouldWrap || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                  var lastLine = this.textArr[this.textArr.length - 1];
                  if (lastLine) {
                    if (shouldAddEllipsis) {
                      var haveSpace = this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth;
                      if (!haveSpace) {
                        lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
                      }
                      this.textArr.splice(this.textArr.length - 1, 1);
                      this._addTextLine(lastLine.text + ELLIPSIS);
                    }
                  }
                  break;
                }
                line = line.slice(low);
                line = line.trimLeft();
                if (line.length > 0) {
                  lineWidth = this._getTextWidth(line);
                  if (lineWidth <= maxWidth) {
                    this._addTextLine(line);
                    currentHeightPx += lineHeightPx;
                    textWidth = Math.max(textWidth, lineWidth);
                    break;
                  }
                }
              } else {
                break;
              }
            }
          } else {
            this._addTextLine(line);
            currentHeightPx += lineHeightPx;
            textWidth = Math.max(textWidth, lineWidth);
          }
          if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
            break;
          }
        }
        this.textHeight = fontSize;
        this.textWidth = textWidth;
      };
      Text3.prototype.getStrokeScaleEnabled = function() {
        return true;
      };
      return Text3;
    }(Shape_1.Shape);
    exports.Text = Text2;
    Text2.prototype._fillFunc = _fillFunc;
    Text2.prototype._strokeFunc = _strokeFunc;
    Text2.prototype.className = TEXT_UPPER;
    Text2.prototype._attrsAffectingSize = [
      "text",
      "fontSize",
      "padding",
      "wrap",
      "lineHeight",
      "letterSpacing"
    ];
    Global_2._registerNode(Text2);
    Factory_1.Factory.overWriteSetter(Text2, "width", Validators_1.getNumberOrAutoValidator());
    Factory_1.Factory.overWriteSetter(Text2, "height", Validators_1.getNumberOrAutoValidator());
    Factory_1.Factory.addGetterSetter(Text2, "fontFamily", "Arial");
    Factory_1.Factory.addGetterSetter(Text2, "fontSize", 12, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Text2, "fontStyle", NORMAL);
    Factory_1.Factory.addGetterSetter(Text2, "fontVariant", NORMAL);
    Factory_1.Factory.addGetterSetter(Text2, "padding", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Text2, "align", LEFT);
    Factory_1.Factory.addGetterSetter(Text2, "verticalAlign", TOP);
    Factory_1.Factory.addGetterSetter(Text2, "lineHeight", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Text2, "wrap", WORD);
    Factory_1.Factory.addGetterSetter(Text2, "ellipsis", false, Validators_1.getBooleanValidator());
    Factory_1.Factory.addGetterSetter(Text2, "letterSpacing", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Text2, "text", "", Validators_1.getStringValidator());
    Factory_1.Factory.addGetterSetter(Text2, "textDecoration", "");
    Util_1.Collection.mapMethods(Text2);
  });

  // node_modules/konva/lib/shapes/TextPath.js
  var require_TextPath = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.TextPath = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Path_1 = require_Path();
    var Text_1 = require_Text();
    var Validators_1 = require_Validators();
    var Global_1 = require_Global();
    var EMPTY_STRING = "";
    var NORMAL = "normal";
    function _fillFunc(context) {
      context.fillText(this.partialText, 0, 0);
    }
    function _strokeFunc(context) {
      context.strokeText(this.partialText, 0, 0);
    }
    var TextPath = function(_super) {
      __extends(TextPath2, _super);
      function TextPath2(config) {
        var _this = _super.call(this, config) || this;
        _this.dummyCanvas = Util_1.Util.createCanvasElement();
        _this.dataArray = [];
        _this.dataArray = Path_1.Path.parsePathData(_this.attrs.data);
        _this.on("dataChange.konva", function() {
          this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
          this._setTextData();
        });
        _this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva", _this._setTextData);
        if (config && config["getKerning"]) {
          Util_1.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.');
          _this.kerningFunc(config["getKerning"]);
        }
        _this._setTextData();
        return _this;
      }
      TextPath2.prototype._sceneFunc = function(context) {
        context.setAttr("font", this._getContextFont());
        context.setAttr("textBaseline", this.textBaseline());
        context.setAttr("textAlign", "left");
        context.save();
        var textDecoration = this.textDecoration();
        var fill = this.fill();
        var fontSize = this.fontSize();
        var glyphInfo = this.glyphInfo;
        if (textDecoration === "underline") {
          context.beginPath();
        }
        for (var i2 = 0; i2 < glyphInfo.length; i2++) {
          context.save();
          var p0 = glyphInfo[i2].p0;
          context.translate(p0.x, p0.y);
          context.rotate(glyphInfo[i2].rotation);
          this.partialText = glyphInfo[i2].text;
          context.fillStrokeShape(this);
          if (textDecoration === "underline") {
            if (i2 === 0) {
              context.moveTo(0, fontSize / 2 + 1);
            }
            context.lineTo(fontSize, fontSize / 2 + 1);
          }
          context.restore();
        }
        if (textDecoration === "underline") {
          context.strokeStyle = fill;
          context.lineWidth = fontSize / 20;
          context.stroke();
        }
        context.restore();
      };
      TextPath2.prototype._hitFunc = function(context) {
        context.beginPath();
        var glyphInfo = this.glyphInfo;
        if (glyphInfo.length >= 1) {
          var p0 = glyphInfo[0].p0;
          context.moveTo(p0.x, p0.y);
        }
        for (var i2 = 0; i2 < glyphInfo.length; i2++) {
          var p1 = glyphInfo[i2].p1;
          context.lineTo(p1.x, p1.y);
        }
        context.setAttr("lineWidth", this.fontSize());
        context.setAttr("strokeStyle", this.colorKey);
        context.stroke();
      };
      TextPath2.prototype.getTextWidth = function() {
        return this.textWidth;
      };
      TextPath2.prototype.getTextHeight = function() {
        Util_1.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
        return this.textHeight;
      };
      TextPath2.prototype.setText = function(text) {
        return Text_1.Text.prototype.setText.call(this, text);
      };
      TextPath2.prototype._getContextFont = function() {
        return Text_1.Text.prototype._getContextFont.call(this);
      };
      TextPath2.prototype._getTextSize = function(text) {
        var dummyCanvas = this.dummyCanvas;
        var _context = dummyCanvas.getContext("2d");
        _context.save();
        _context.font = this._getContextFont();
        var metrics = _context.measureText(text);
        _context.restore();
        return {
          width: metrics.width,
          height: parseInt(this.attrs.fontSize, 10)
        };
      };
      TextPath2.prototype._setTextData = function() {
        var that = this;
        var size = this._getTextSize(this.attrs.text);
        var letterSpacing = this.letterSpacing();
        var align = this.align();
        var kerningFunc = this.kerningFunc();
        this.textWidth = size.width;
        this.textHeight = size.height;
        var textFullWidth = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * letterSpacing, 0);
        this.glyphInfo = [];
        var fullPathWidth = 0;
        for (var l2 = 0; l2 < that.dataArray.length; l2++) {
          if (that.dataArray[l2].pathLength > 0) {
            fullPathWidth += that.dataArray[l2].pathLength;
          }
        }
        var offset = 0;
        if (align === "center") {
          offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
        }
        if (align === "right") {
          offset = Math.max(0, fullPathWidth - textFullWidth);
        }
        var charArr = Text_1.stringToArray(this.text());
        var spacesNumber = this.text().split(" ").length - 1;
        var p0, p1, pathCmd;
        var pIndex = -1;
        var currentT = 0;
        var getNextPathSegment = function() {
          currentT = 0;
          var pathData = that.dataArray;
          for (var j2 = pIndex + 1; j2 < pathData.length; j2++) {
            if (pathData[j2].pathLength > 0) {
              pIndex = j2;
              return pathData[j2];
            } else if (pathData[j2].command === "M") {
              p0 = {
                x: pathData[j2].points[0],
                y: pathData[j2].points[1]
              };
            }
          }
          return {};
        };
        var findSegmentToFitCharacter = function(c2) {
          var glyphWidth2 = that._getTextSize(c2).width + letterSpacing;
          if (c2 === " " && align === "justify") {
            glyphWidth2 += (fullPathWidth - textFullWidth) / spacesNumber;
          }
          var currLen = 0;
          var attempts = 0;
          p1 = void 0;
          while (Math.abs(glyphWidth2 - currLen) / glyphWidth2 > 0.01 && attempts < 20) {
            attempts++;
            var cumulativePathLength = currLen;
            while (pathCmd === void 0) {
              pathCmd = getNextPathSegment();
              if (pathCmd && cumulativePathLength + pathCmd.pathLength < glyphWidth2) {
                cumulativePathLength += pathCmd.pathLength;
                pathCmd = void 0;
              }
            }
            if (pathCmd === {} || p0 === void 0) {
              return void 0;
            }
            var needNewSegment = false;
            switch (pathCmd.command) {
              case "L":
                if (Path_1.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth2) {
                  p1 = Path_1.Path.getPointOnLine(glyphWidth2, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
                } else {
                  pathCmd = void 0;
                }
                break;
              case "A":
                var start2 = pathCmd.points[4];
                var dTheta = pathCmd.points[5];
                var end = pathCmd.points[4] + dTheta;
                if (currentT === 0) {
                  currentT = start2 + 1e-8;
                } else if (glyphWidth2 > currLen) {
                  currentT += Math.PI / 180 * dTheta / Math.abs(dTheta);
                } else {
                  currentT -= Math.PI / 360 * dTheta / Math.abs(dTheta);
                }
                if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
                  currentT = end;
                  needNewSegment = true;
                }
                p1 = Path_1.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
                break;
              case "C":
                if (currentT === 0) {
                  if (glyphWidth2 > pathCmd.pathLength) {
                    currentT = 1e-8;
                  } else {
                    currentT = glyphWidth2 / pathCmd.pathLength;
                  }
                } else if (glyphWidth2 > currLen) {
                  currentT += (glyphWidth2 - currLen) / pathCmd.pathLength / 2;
                } else {
                  currentT = Math.max(currentT - (currLen - glyphWidth2) / pathCmd.pathLength / 2, 0);
                }
                if (currentT > 1) {
                  currentT = 1;
                  needNewSegment = true;
                }
                p1 = Path_1.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
                break;
              case "Q":
                if (currentT === 0) {
                  currentT = glyphWidth2 / pathCmd.pathLength;
                } else if (glyphWidth2 > currLen) {
                  currentT += (glyphWidth2 - currLen) / pathCmd.pathLength;
                } else {
                  currentT -= (currLen - glyphWidth2) / pathCmd.pathLength;
                }
                if (currentT > 1) {
                  currentT = 1;
                  needNewSegment = true;
                }
                p1 = Path_1.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
                break;
            }
            if (p1 !== void 0) {
              currLen = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
            }
            if (needNewSegment) {
              needNewSegment = false;
              pathCmd = void 0;
            }
          }
        };
        var testChar = "C";
        var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
        var lettersInOffset = offset / glyphWidth - 1;
        for (var k2 = 0; k2 < lettersInOffset; k2++) {
          findSegmentToFitCharacter(testChar);
          if (p0 === void 0 || p1 === void 0) {
            break;
          }
          p0 = p1;
        }
        for (var i2 = 0; i2 < charArr.length; i2++) {
          findSegmentToFitCharacter(charArr[i2]);
          if (p0 === void 0 || p1 === void 0) {
            break;
          }
          var width = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
          var kern = 0;
          if (kerningFunc) {
            try {
              kern = kerningFunc(charArr[i2 - 1], charArr[i2]) * this.fontSize();
            } catch (e2) {
              kern = 0;
            }
          }
          p0.x += kern;
          p1.x += kern;
          this.textWidth += kern;
          var midpoint = Path_1.Path.getPointOnLine(kern + width / 2, p0.x, p0.y, p1.x, p1.y);
          var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
          this.glyphInfo.push({
            transposeX: midpoint.x,
            transposeY: midpoint.y,
            text: charArr[i2],
            rotation,
            p0,
            p1
          });
          p0 = p1;
        }
      };
      TextPath2.prototype.getSelfRect = function() {
        if (!this.glyphInfo.length) {
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        var points = [];
        this.glyphInfo.forEach(function(info) {
          points.push(info.p0.x);
          points.push(info.p0.y);
          points.push(info.p1.x);
          points.push(info.p1.y);
        });
        var minX = points[0] || 0;
        var maxX = points[0] || 0;
        var minY = points[1] || 0;
        var maxY = points[1] || 0;
        var x2, y2;
        for (var i2 = 0; i2 < points.length / 2; i2++) {
          x2 = points[i2 * 2];
          y2 = points[i2 * 2 + 1];
          minX = Math.min(minX, x2);
          maxX = Math.max(maxX, x2);
          minY = Math.min(minY, y2);
          maxY = Math.max(maxY, y2);
        }
        var fontSize = this.fontSize();
        return {
          x: minX - fontSize / 2,
          y: minY - fontSize / 2,
          width: maxX - minX + fontSize,
          height: maxY - minY + fontSize
        };
      };
      return TextPath2;
    }(Shape_1.Shape);
    exports.TextPath = TextPath;
    TextPath.prototype._fillFunc = _fillFunc;
    TextPath.prototype._strokeFunc = _strokeFunc;
    TextPath.prototype._fillFuncHit = _fillFunc;
    TextPath.prototype._strokeFuncHit = _strokeFunc;
    TextPath.prototype.className = "TextPath";
    TextPath.prototype._attrsAffectingSize = ["text", "fontSize", "data"];
    Global_1._registerNode(TextPath);
    Factory_1.Factory.addGetterSetter(TextPath, "data");
    Factory_1.Factory.addGetterSetter(TextPath, "fontFamily", "Arial");
    Factory_1.Factory.addGetterSetter(TextPath, "fontSize", 12, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(TextPath, "fontStyle", NORMAL);
    Factory_1.Factory.addGetterSetter(TextPath, "align", "left");
    Factory_1.Factory.addGetterSetter(TextPath, "letterSpacing", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(TextPath, "textBaseline", "middle");
    Factory_1.Factory.addGetterSetter(TextPath, "fontVariant", NORMAL);
    Factory_1.Factory.addGetterSetter(TextPath, "text", EMPTY_STRING);
    Factory_1.Factory.addGetterSetter(TextPath, "textDecoration", null);
    Factory_1.Factory.addGetterSetter(TextPath, "kerningFunc", null);
    Util_1.Collection.mapMethods(TextPath);
  });

  // node_modules/konva/lib/shapes/Transformer.js
  var require_Transformer = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
          s2 = arguments[i2];
          for (var p2 in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p2))
              t2[p2] = s2[p2];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Transformer = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Shape_1 = require_Shape();
    var Rect_1 = require_Rect();
    var Group_1 = require_Group();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var EVENTS_NAME = "tr-konva";
    var ATTR_CHANGE_LIST = [
      "resizeEnabledChange",
      "rotateAnchorOffsetChange",
      "rotateEnabledChange",
      "enabledAnchorsChange",
      "anchorSizeChange",
      "borderEnabledChange",
      "borderStrokeChange",
      "borderStrokeWidthChange",
      "borderDashChange",
      "anchorStrokeChange",
      "anchorStrokeWidthChange",
      "anchorFillChange",
      "anchorCornerRadiusChange",
      "ignoreStrokeChange"
    ].map(function(e2) {
      return e2 + ("." + EVENTS_NAME);
    }).join(" ");
    var NODES_RECT = "nodesRect";
    var TRANSFORM_CHANGE_STR = [
      "widthChange",
      "heightChange",
      "scaleXChange",
      "scaleYChange",
      "skewXChange",
      "skewYChange",
      "rotationChange",
      "offsetXChange",
      "offsetYChange",
      "transformsEnabledChange",
      "strokeWidthChange"
    ].map(function(e2) {
      return e2 + ("." + EVENTS_NAME);
    }).join(" ");
    var ANGLES = {
      "top-left": -45,
      "top-center": 0,
      "top-right": 45,
      "middle-right": -90,
      "middle-left": 90,
      "bottom-left": -135,
      "bottom-center": 180,
      "bottom-right": 135
    };
    var TOUCH_DEVICE = "ontouchstart" in Global_1.Konva._global;
    function getCursor(anchorName, rad) {
      if (anchorName === "rotater") {
        return "crosshair";
      }
      rad += Util_1.Util._degToRad(ANGLES[anchorName] || 0);
      var angle = (Util_1.Util._radToDeg(rad) % 360 + 360) % 360;
      if (Util_1.Util._inRange(angle, 315 + 22.5, 360) || Util_1.Util._inRange(angle, 0, 22.5)) {
        return "ns-resize";
      } else if (Util_1.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
        return "nesw-resize";
      } else if (Util_1.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
        return "ew-resize";
      } else if (Util_1.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
        return "nwse-resize";
      } else if (Util_1.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
        return "ns-resize";
      } else if (Util_1.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
        return "nesw-resize";
      } else if (Util_1.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
        return "ew-resize";
      } else if (Util_1.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
        return "nwse-resize";
      } else {
        Util_1.Util.error("Transformer has unknown angle for cursor detection: " + angle);
        return "pointer";
      }
    }
    var ANCHORS_NAMES = [
      "top-left",
      "top-center",
      "top-right",
      "middle-right",
      "middle-left",
      "bottom-left",
      "bottom-center",
      "bottom-right"
    ];
    var MAX_SAFE_INTEGER = 1e8;
    function getCenter(shape) {
      return {
        x: shape.x + shape.width / 2 * Math.cos(shape.rotation) + shape.height / 2 * Math.sin(-shape.rotation),
        y: shape.y + shape.height / 2 * Math.cos(shape.rotation) + shape.width / 2 * Math.sin(shape.rotation)
      };
    }
    function rotateAroundPoint(shape, angleRad, point) {
      var x2 = point.x + (shape.x - point.x) * Math.cos(angleRad) - (shape.y - point.y) * Math.sin(angleRad);
      var y2 = point.y + (shape.x - point.x) * Math.sin(angleRad) + (shape.y - point.y) * Math.cos(angleRad);
      return __assign(__assign({}, shape), {
        rotation: shape.rotation + angleRad,
        x: x2,
        y: y2
      });
    }
    function rotateAroundCenter(shape, deltaRad) {
      var center = getCenter(shape);
      return rotateAroundPoint(shape, deltaRad, center);
    }
    function getSnap(snaps, newRotationRad, tol) {
      var snapped = newRotationRad;
      for (var i2 = 0; i2 < snaps.length; i2++) {
        var angle = Global_1.Konva.getAngle(snaps[i2]);
        var absDiff = Math.abs(angle - newRotationRad) % (Math.PI * 2);
        var dif = Math.min(absDiff, Math.PI * 2 - absDiff);
        if (dif < tol) {
          snapped = angle;
        }
      }
      return snapped;
    }
    var Transformer = function(_super) {
      __extends(Transformer2, _super);
      function Transformer2(config) {
        var _this = _super.call(this, config) || this;
        _this._transforming = false;
        _this._createElements();
        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
        _this.update = _this.update.bind(_this);
        _this.on(ATTR_CHANGE_LIST, _this.update);
        if (_this.getNode()) {
          _this.update();
        }
        return _this;
      }
      Transformer2.prototype.attachTo = function(node) {
        this.setNode(node);
        return this;
      };
      Transformer2.prototype.setNode = function(node) {
        Util_1.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.");
        return this.setNodes([node]);
      };
      Transformer2.prototype.getNode = function() {
        return this._nodes && this._nodes[0];
      };
      Transformer2.prototype.setNodes = function(nodes) {
        var _this = this;
        if (nodes === void 0) {
          nodes = [];
        }
        if (this._nodes && this._nodes.length) {
          this.detach();
        }
        this._nodes = nodes;
        if (nodes.length === 1) {
          this.rotation(nodes[0].getAbsoluteRotation());
        } else {
          this.rotation(0);
        }
        this._nodes.forEach(function(node) {
          var additionalEvents = node._attrsAffectingSize.map(function(prop) {
            return prop + "Change." + EVENTS_NAME;
          }).join(" ");
          var onChange = function() {
            if (_this.nodes().length === 1) {
              _this.rotation(_this.nodes()[0].getAbsoluteRotation());
            }
            _this._resetTransformCache();
            if (!_this._transforming && !_this.isDragging()) {
              _this.update();
            }
          };
          node.on(additionalEvents, onChange);
          node.on(TRANSFORM_CHANGE_STR, onChange);
          node.on("_clearTransformCache." + EVENTS_NAME, onChange);
          node.on("xChange." + EVENTS_NAME + " yChange." + EVENTS_NAME, onChange);
          _this._proxyDrag(node);
        });
        this._resetTransformCache();
        var elementsCreated = !!this.findOne(".top-left");
        if (elementsCreated) {
          this.update();
        }
        return this;
      };
      Transformer2.prototype._proxyDrag = function(node) {
        var _this = this;
        var lastPos;
        node.on("dragstart." + EVENTS_NAME, function(e2) {
          lastPos = node.getAbsolutePosition();
          if (!_this.isDragging() && node !== _this.findOne(".back")) {
            _this.startDrag(e2, false);
          }
        });
        node.on("dragmove." + EVENTS_NAME, function(e2) {
          if (!lastPos) {
            return;
          }
          var abs = node.getAbsolutePosition();
          var dx = abs.x - lastPos.x;
          var dy = abs.y - lastPos.y;
          _this.nodes().forEach(function(otherNode) {
            if (otherNode === node) {
              return;
            }
            if (otherNode.isDragging()) {
              return;
            }
            var otherAbs = otherNode.getAbsolutePosition();
            otherNode.setAbsolutePosition({
              x: otherAbs.x + dx,
              y: otherAbs.y + dy
            });
            otherNode.startDrag(e2);
          });
          lastPos = null;
        });
      };
      Transformer2.prototype.getNodes = function() {
        return this._nodes || [];
      };
      Transformer2.prototype.getActiveAnchor = function() {
        return this._movingAnchorName;
      };
      Transformer2.prototype.detach = function() {
        if (this._nodes) {
          this._nodes.forEach(function(node) {
            node.off("." + EVENTS_NAME);
          });
        }
        this._nodes = [];
        this._resetTransformCache();
      };
      Transformer2.prototype._resetTransformCache = function() {
        this._clearCache(NODES_RECT);
        this._clearCache("transform");
        this._clearSelfAndDescendantCache("absoluteTransform");
      };
      Transformer2.prototype._getNodeRect = function() {
        return this._getCache(NODES_RECT, this.__getNodeRect);
      };
      Transformer2.prototype.__getNodeShape = function(node, rot, relative) {
        if (rot === void 0) {
          rot = this.rotation();
        }
        var rect = node.getClientRect({
          skipTransform: true,
          skipShadow: true,
          skipStroke: this.ignoreStroke()
        });
        var absScale = node.getAbsoluteScale(relative);
        var absPos = node.getAbsolutePosition(relative);
        var dx = rect.x * absScale.x - node.offsetX() * absScale.x;
        var dy = rect.y * absScale.y - node.offsetY() * absScale.y;
        var rotation = (Global_1.Konva.getAngle(node.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2);
        var box = {
          x: absPos.x + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
          y: absPos.y + dy * Math.cos(rotation) + dx * Math.sin(rotation),
          width: rect.width * absScale.x,
          height: rect.height * absScale.y,
          rotation
        };
        return rotateAroundPoint(box, -Global_1.Konva.getAngle(rot), {
          x: 0,
          y: 0
        });
      };
      Transformer2.prototype.__getNodeRect = function() {
        var _this = this;
        var node = this.getNode();
        if (!node) {
          return {
            x: -MAX_SAFE_INTEGER,
            y: -MAX_SAFE_INTEGER,
            width: 0,
            height: 0,
            rotation: 0
          };
        }
        var totalPoints = [];
        this.nodes().map(function(node2) {
          var box = node2.getClientRect({
            skipTransform: true,
            skipShadow: true,
            skipStroke: _this.ignoreStroke()
          });
          var points = [
            {x: box.x, y: box.y},
            {x: box.x + box.width, y: box.y},
            {x: box.x + box.width, y: box.y + box.height},
            {x: box.x, y: box.y + box.height}
          ];
          var trans = node2.getAbsoluteTransform();
          points.forEach(function(point) {
            var transformed = trans.point(point);
            totalPoints.push(transformed);
          });
        });
        var tr = new Util_1.Transform();
        tr.rotate(-Global_1.Konva.getAngle(this.rotation()));
        var minX, minY, maxX, maxY;
        totalPoints.forEach(function(point) {
          var transformed = tr.point(point);
          if (minX === void 0) {
            minX = maxX = transformed.x;
            minY = maxY = transformed.y;
          }
          minX = Math.min(minX, transformed.x);
          minY = Math.min(minY, transformed.y);
          maxX = Math.max(maxX, transformed.x);
          maxY = Math.max(maxY, transformed.y);
        });
        tr.invert();
        var p2 = tr.point({x: minX, y: minY});
        return {
          x: p2.x,
          y: p2.y,
          width: maxX - minX,
          height: maxY - minY,
          rotation: Global_1.Konva.getAngle(this.rotation())
        };
      };
      Transformer2.prototype.getX = function() {
        return this._getNodeRect().x;
      };
      Transformer2.prototype.getY = function() {
        return this._getNodeRect().y;
      };
      Transformer2.prototype.getWidth = function() {
        return this._getNodeRect().width;
      };
      Transformer2.prototype.getHeight = function() {
        return this._getNodeRect().height;
      };
      Transformer2.prototype._createElements = function() {
        this._createBack();
        ANCHORS_NAMES.forEach(function(name) {
          this._createAnchor(name);
        }.bind(this));
        this._createAnchor("rotater");
      };
      Transformer2.prototype._createAnchor = function(name) {
        var _this = this;
        var anchor = new Rect_1.Rect({
          stroke: "rgb(0, 161, 255)",
          fill: "white",
          strokeWidth: 1,
          name: name + " _anchor",
          dragDistance: 0,
          draggable: true,
          hitStrokeWidth: TOUCH_DEVICE ? 10 : "auto"
        });
        var self2 = this;
        anchor.on("mousedown touchstart", function(e2) {
          self2._handleMouseDown(e2);
        });
        anchor.on("dragstart", function(e2) {
          anchor.stopDrag();
          e2.cancelBubble = true;
        });
        anchor.on("dragend", function(e2) {
          e2.cancelBubble = true;
        });
        anchor.on("mouseenter", function() {
          var rad = Global_1.Konva.getAngle(_this.rotation());
          var cursor = getCursor(name, rad);
          anchor.getStage().content.style.cursor = cursor;
          _this._cursorChange = true;
        });
        anchor.on("mouseout", function() {
          anchor.getStage().content.style.cursor = "";
          _this._cursorChange = false;
        });
        this.add(anchor);
      };
      Transformer2.prototype._createBack = function() {
        var _this = this;
        var back = new Shape_1.Shape({
          name: "back",
          width: 0,
          height: 0,
          draggable: true,
          sceneFunc: function(ctx) {
            var tr = this.getParent();
            var padding = tr.padding();
            ctx.beginPath();
            ctx.rect(-padding, -padding, this.width() + padding * 2, this.height() + padding * 2);
            ctx.moveTo(this.width() / 2, -padding);
            if (tr.rotateEnabled()) {
              ctx.lineTo(this.width() / 2, -tr.rotateAnchorOffset() * Util_1.Util._sign(this.height()) - padding);
            }
            ctx.fillStrokeShape(this);
          },
          hitFunc: function(ctx, shape) {
            if (!_this.shouldOverdrawWholeArea()) {
              return;
            }
            var padding = _this.padding();
            ctx.beginPath();
            ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
            ctx.fillStrokeShape(shape);
          }
        });
        this.add(back);
        this._proxyDrag(back);
        back.on("dragstart", function(e2) {
          e2.cancelBubble = true;
        });
        back.on("dragmove", function(e2) {
          e2.cancelBubble = true;
        });
        back.on("dragend", function(e2) {
          e2.cancelBubble = true;
        });
      };
      Transformer2.prototype._handleMouseDown = function(e2) {
        this._movingAnchorName = e2.target.name().split(" ")[0];
        var attrs = this._getNodeRect();
        var width = attrs.width;
        var height = attrs.height;
        var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.sin = Math.abs(height / hypotenuse);
        this.cos = Math.abs(width / hypotenuse);
        window.addEventListener("mousemove", this._handleMouseMove);
        window.addEventListener("touchmove", this._handleMouseMove);
        window.addEventListener("mouseup", this._handleMouseUp, true);
        window.addEventListener("touchend", this._handleMouseUp, true);
        this._transforming = true;
        var ap = e2.target.getAbsolutePosition();
        var pos = e2.target.getStage().getPointerPosition();
        this._anchorDragOffset = {
          x: pos.x - ap.x,
          y: pos.y - ap.y
        };
        this._fire("transformstart", {evt: e2, target: this.getNode()});
        this._nodes.forEach(function(target) {
          target._fire("transformstart", {evt: e2, target});
        });
      };
      Transformer2.prototype._handleMouseMove = function(e2) {
        var x2, y2, newHypotenuse;
        var anchorNode = this.findOne("." + this._movingAnchorName);
        var stage = anchorNode.getStage();
        stage.setPointersPositions(e2);
        var pp = stage.getPointerPosition();
        var newNodePos = {
          x: pp.x - this._anchorDragOffset.x,
          y: pp.y - this._anchorDragOffset.y
        };
        var oldAbs = anchorNode.getAbsolutePosition();
        anchorNode.setAbsolutePosition(newNodePos);
        var newAbs = anchorNode.getAbsolutePosition();
        if (oldAbs.x === newAbs.x && oldAbs.y === newAbs.y) {
          return;
        }
        if (this._movingAnchorName === "rotater") {
          var attrs = this._getNodeRect();
          x2 = anchorNode.x() - attrs.width / 2;
          y2 = -anchorNode.y() + attrs.height / 2;
          var delta = Math.atan2(-y2, x2) + Math.PI / 2;
          if (attrs.height < 0) {
            delta -= Math.PI;
          }
          var oldRotation = Global_1.Konva.getAngle(this.rotation());
          var newRotation = oldRotation + delta;
          var tol = Global_1.Konva.getAngle(this.rotationSnapTolerance());
          var snappedRot = getSnap(this.rotationSnaps(), newRotation, tol);
          var diff = snappedRot - attrs.rotation;
          var shape = rotateAroundCenter(attrs, diff);
          this._fitNodesInto(shape, e2);
          return;
        }
        var keepProportion = this.keepRatio() || e2.shiftKey;
        var centeredScaling = this.centeredScaling() || e2.altKey;
        if (this._movingAnchorName === "top-left") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".bottom-right").x(),
              y: this.findOne(".bottom-right").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
            var reverseX = this.findOne(".top-left").x() > comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".top-left").y() > comparePoint.y ? -1 : 1;
            x2 = newHypotenuse * this.cos * reverseX;
            y2 = newHypotenuse * this.sin * reverseY;
            this.findOne(".top-left").x(comparePoint.x - x2);
            this.findOne(".top-left").y(comparePoint.y - y2);
          }
        } else if (this._movingAnchorName === "top-center") {
          this.findOne(".top-left").y(anchorNode.y());
        } else if (this._movingAnchorName === "top-right") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".bottom-left").x(),
              y: this.findOne(".bottom-left").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
            var reverseX = this.findOne(".top-right").x() < comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".top-right").y() > comparePoint.y ? -1 : 1;
            x2 = newHypotenuse * this.cos * reverseX;
            y2 = newHypotenuse * this.sin * reverseY;
            this.findOne(".top-right").x(comparePoint.x + x2);
            this.findOne(".top-right").y(comparePoint.y - y2);
          }
          var pos = anchorNode.position();
          this.findOne(".top-left").y(pos.y);
          this.findOne(".bottom-right").x(pos.x);
        } else if (this._movingAnchorName === "middle-left") {
          this.findOne(".top-left").x(anchorNode.x());
        } else if (this._movingAnchorName === "middle-right") {
          this.findOne(".bottom-right").x(anchorNode.x());
        } else if (this._movingAnchorName === "bottom-left") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".top-right").x(),
              y: this.findOne(".top-right").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
            var reverseX = comparePoint.x < anchorNode.x() ? -1 : 1;
            var reverseY = anchorNode.y() < comparePoint.y ? -1 : 1;
            x2 = newHypotenuse * this.cos * reverseX;
            y2 = newHypotenuse * this.sin * reverseY;
            anchorNode.x(comparePoint.x - x2);
            anchorNode.y(comparePoint.y + y2);
          }
          pos = anchorNode.position();
          this.findOne(".top-left").x(pos.x);
          this.findOne(".bottom-right").y(pos.y);
        } else if (this._movingAnchorName === "bottom-center") {
          this.findOne(".bottom-right").y(anchorNode.y());
        } else if (this._movingAnchorName === "bottom-right") {
          if (keepProportion) {
            var comparePoint = centeredScaling ? {
              x: this.width() / 2,
              y: this.height() / 2
            } : {
              x: this.findOne(".top-left").x(),
              y: this.findOne(".top-left").y()
            };
            newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
            var reverseX = this.findOne(".bottom-right").x() < comparePoint.x ? -1 : 1;
            var reverseY = this.findOne(".bottom-right").y() < comparePoint.y ? -1 : 1;
            x2 = newHypotenuse * this.cos * reverseX;
            y2 = newHypotenuse * this.sin * reverseY;
            this.findOne(".bottom-right").x(comparePoint.x + x2);
            this.findOne(".bottom-right").y(comparePoint.y + y2);
          }
        } else {
          console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
        }
        var centeredScaling = this.centeredScaling() || e2.altKey;
        if (centeredScaling) {
          var topLeft = this.findOne(".top-left");
          var bottomRight = this.findOne(".bottom-right");
          var topOffsetX = topLeft.x();
          var topOffsetY = topLeft.y();
          var bottomOffsetX = this.getWidth() - bottomRight.x();
          var bottomOffsetY = this.getHeight() - bottomRight.y();
          bottomRight.move({
            x: -topOffsetX,
            y: -topOffsetY
          });
          topLeft.move({
            x: bottomOffsetX,
            y: bottomOffsetY
          });
        }
        var absPos = this.findOne(".top-left").getAbsolutePosition();
        x2 = absPos.x;
        y2 = absPos.y;
        var width = this.findOne(".bottom-right").x() - this.findOne(".top-left").x();
        var height = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
        this._fitNodesInto({
          x: x2,
          y: y2,
          width,
          height,
          rotation: Global_1.Konva.getAngle(this.rotation())
        }, e2);
      };
      Transformer2.prototype._handleMouseUp = function(e2) {
        this._removeEvents(e2);
      };
      Transformer2.prototype.getAbsoluteTransform = function() {
        return this.getTransform();
      };
      Transformer2.prototype._removeEvents = function(e2) {
        if (this._transforming) {
          this._transforming = false;
          window.removeEventListener("mousemove", this._handleMouseMove);
          window.removeEventListener("touchmove", this._handleMouseMove);
          window.removeEventListener("mouseup", this._handleMouseUp, true);
          window.removeEventListener("touchend", this._handleMouseUp, true);
          var node = this.getNode();
          this._fire("transformend", {evt: e2, target: node});
          if (node) {
            this._nodes.forEach(function(target) {
              target._fire("transformend", {evt: e2, target});
            });
          }
          this._movingAnchorName = null;
        }
      };
      Transformer2.prototype._fitNodesInto = function(newAttrs, evt) {
        var _this = this;
        var oldAttrs = this._getNodeRect();
        var minSize = 1;
        if (Util_1.Util._inRange(newAttrs.width, -this.padding() * 2 - minSize, minSize)) {
          this.update();
          return;
        }
        if (Util_1.Util._inRange(newAttrs.height, -this.padding() * 2 - minSize, minSize)) {
          this.update();
          return;
        }
        var allowNegativeScale = true;
        var t2 = new Util_1.Transform();
        t2.rotate(Global_1.Konva.getAngle(this.rotation()));
        if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
          var offset = t2.point({
            x: -this.padding() * 2,
            y: 0
          });
          newAttrs.x += offset.x;
          newAttrs.y += offset.y;
          newAttrs.width += this.padding() * 2;
          this._movingAnchorName = this._movingAnchorName.replace("left", "right");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          if (!allowNegativeScale) {
            this.update();
            return;
          }
        } else if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
          var offset = t2.point({
            x: this.padding() * 2,
            y: 0
          });
          this._movingAnchorName = this._movingAnchorName.replace("right", "left");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.width += this.padding() * 2;
          if (!allowNegativeScale) {
            this.update();
            return;
          }
        }
        if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
          var offset = t2.point({
            x: 0,
            y: -this.padding() * 2
          });
          newAttrs.x += offset.x;
          newAttrs.y += offset.y;
          this._movingAnchorName = this._movingAnchorName.replace("top", "bottom");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.height += this.padding() * 2;
          if (!allowNegativeScale) {
            this.update();
            return;
          }
        } else if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
          var offset = t2.point({
            x: 0,
            y: this.padding() * 2
          });
          this._movingAnchorName = this._movingAnchorName.replace("bottom", "top");
          this._anchorDragOffset.x -= offset.x;
          this._anchorDragOffset.y -= offset.y;
          newAttrs.height += this.padding() * 2;
          if (!allowNegativeScale) {
            this.update();
            return;
          }
        }
        if (this.boundBoxFunc()) {
          var bounded = this.boundBoxFunc()(oldAttrs, newAttrs);
          if (bounded) {
            newAttrs = bounded;
          } else {
            Util_1.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
          }
        }
        var baseSize = 1e7;
        var oldTr = new Util_1.Transform();
        oldTr.translate(oldAttrs.x, oldAttrs.y);
        oldTr.rotate(oldAttrs.rotation);
        oldTr.scale(oldAttrs.width / baseSize, oldAttrs.height / baseSize);
        var newTr = new Util_1.Transform();
        newTr.translate(newAttrs.x, newAttrs.y);
        newTr.rotate(newAttrs.rotation);
        newTr.scale(newAttrs.width / baseSize, newAttrs.height / baseSize);
        var delta = newTr.multiply(oldTr.invert());
        this._nodes.forEach(function(node) {
          var _a;
          var parentTransform = node.getParent().getAbsoluteTransform();
          var localTransform = node.getTransform().copy();
          localTransform.translate(node.offsetX(), node.offsetY());
          var newLocalTransform = new Util_1.Transform();
          newLocalTransform.multiply(parentTransform.copy().invert()).multiply(delta).multiply(parentTransform).multiply(localTransform);
          var attrs = newLocalTransform.decompose();
          node.setAttrs(attrs);
          _this._fire("transform", {evt, target: node});
          node._fire("transform", {evt, target: node});
          (_a = node.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
        });
        this.rotation(Util_1.Util._getRotation(newAttrs.rotation));
        this._resetTransformCache();
        this.update();
        this.getLayer().batchDraw();
      };
      Transformer2.prototype.forceUpdate = function() {
        this._resetTransformCache();
        this.update();
      };
      Transformer2.prototype._batchChangeChild = function(selector, attrs) {
        var anchor = this.findOne(selector);
        anchor.setAttrs(attrs);
      };
      Transformer2.prototype.update = function() {
        var _this = this;
        var _a;
        var attrs = this._getNodeRect();
        this.rotation(Util_1.Util._getRotation(attrs.rotation));
        var width = attrs.width;
        var height = attrs.height;
        var enabledAnchors = this.enabledAnchors();
        var resizeEnabled = this.resizeEnabled();
        var padding = this.padding();
        var anchorSize = this.anchorSize();
        this.find("._anchor").each(function(node) {
          node.setAttrs({
            width: anchorSize,
            height: anchorSize,
            offsetX: anchorSize / 2,
            offsetY: anchorSize / 2,
            stroke: _this.anchorStroke(),
            strokeWidth: _this.anchorStrokeWidth(),
            fill: _this.anchorFill(),
            cornerRadius: _this.anchorCornerRadius()
          });
        });
        this._batchChangeChild(".top-left", {
          x: 0,
          y: 0,
          offsetX: anchorSize / 2 + padding,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-left") >= 0
        });
        this._batchChangeChild(".top-center", {
          x: width / 2,
          y: 0,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-center") >= 0
        });
        this._batchChangeChild(".top-right", {
          x: width,
          y: 0,
          offsetX: anchorSize / 2 - padding,
          offsetY: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("top-right") >= 0
        });
        this._batchChangeChild(".middle-left", {
          x: 0,
          y: height / 2,
          offsetX: anchorSize / 2 + padding,
          visible: resizeEnabled && enabledAnchors.indexOf("middle-left") >= 0
        });
        this._batchChangeChild(".middle-right", {
          x: width,
          y: height / 2,
          offsetX: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("middle-right") >= 0
        });
        this._batchChangeChild(".bottom-left", {
          x: 0,
          y: height,
          offsetX: anchorSize / 2 + padding,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-left") >= 0
        });
        this._batchChangeChild(".bottom-center", {
          x: width / 2,
          y: height,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-center") >= 0
        });
        this._batchChangeChild(".bottom-right", {
          x: width,
          y: height,
          offsetX: anchorSize / 2 - padding,
          offsetY: anchorSize / 2 - padding,
          visible: resizeEnabled && enabledAnchors.indexOf("bottom-right") >= 0
        });
        this._batchChangeChild(".rotater", {
          x: width / 2,
          y: -this.rotateAnchorOffset() * Util_1.Util._sign(height) - padding,
          visible: this.rotateEnabled()
        });
        this._batchChangeChild(".back", {
          width,
          height,
          visible: this.borderEnabled(),
          stroke: this.borderStroke(),
          strokeWidth: this.borderStrokeWidth(),
          dash: this.borderDash(),
          x: 0,
          y: 0
        });
        (_a = this.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
      };
      Transformer2.prototype.isTransforming = function() {
        return this._transforming;
      };
      Transformer2.prototype.stopTransform = function() {
        if (this._transforming) {
          this._removeEvents();
          var anchorNode = this.findOne("." + this._movingAnchorName);
          if (anchorNode) {
            anchorNode.stopDrag();
          }
        }
      };
      Transformer2.prototype.destroy = function() {
        if (this.getStage() && this._cursorChange) {
          this.getStage().content.style.cursor = "";
        }
        Group_1.Group.prototype.destroy.call(this);
        this.detach();
        this._removeEvents();
        return this;
      };
      Transformer2.prototype.toObject = function() {
        return Node_1.Node.prototype.toObject.call(this);
      };
      return Transformer2;
    }(Group_1.Group);
    exports.Transformer = Transformer;
    function validateAnchors(val) {
      if (!(val instanceof Array)) {
        Util_1.Util.warn("enabledAnchors value should be an array");
      }
      if (val instanceof Array) {
        val.forEach(function(name) {
          if (ANCHORS_NAMES.indexOf(name) === -1) {
            Util_1.Util.warn("Unknown anchor name: " + name + ". Available names are: " + ANCHORS_NAMES.join(", "));
          }
        });
      }
      return val || [];
    }
    Transformer.prototype.className = "Transformer";
    Global_2._registerNode(Transformer);
    Factory_1.Factory.addGetterSetter(Transformer, "enabledAnchors", ANCHORS_NAMES, validateAnchors);
    Factory_1.Factory.addGetterSetter(Transformer, "resizeEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "anchorSize", 10, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "rotateEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "rotationSnaps", []);
    Factory_1.Factory.addGetterSetter(Transformer, "rotateAnchorOffset", 50, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "rotationSnapTolerance", 5, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "borderEnabled", true);
    Factory_1.Factory.addGetterSetter(Transformer, "anchorStroke", "rgb(0, 161, 255)");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorStrokeWidth", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "anchorFill", "white");
    Factory_1.Factory.addGetterSetter(Transformer, "anchorCornerRadius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "borderStroke", "rgb(0, 161, 255)");
    Factory_1.Factory.addGetterSetter(Transformer, "borderStrokeWidth", 1, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "borderDash");
    Factory_1.Factory.addGetterSetter(Transformer, "keepRatio", true);
    Factory_1.Factory.addGetterSetter(Transformer, "centeredScaling", false);
    Factory_1.Factory.addGetterSetter(Transformer, "ignoreStroke", false);
    Factory_1.Factory.addGetterSetter(Transformer, "padding", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Transformer, "node");
    Factory_1.Factory.addGetterSetter(Transformer, "nodes");
    Factory_1.Factory.addGetterSetter(Transformer, "boundBoxFunc");
    Factory_1.Factory.addGetterSetter(Transformer, "shouldOverdrawWholeArea", false);
    Factory_1.Factory.backCompat(Transformer, {
      lineEnabled: "borderEnabled",
      rotateHandlerOffset: "rotateAnchorOffset",
      enabledHandlers: "enabledAnchors"
    });
    Util_1.Collection.mapMethods(Transformer);
  });

  // node_modules/konva/lib/shapes/Wedge.js
  var require_Wedge = __commonJS((exports) => {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d2, b2) {
        extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d3, b3) {
          d3.__proto__ = b3;
        } || function(d3, b3) {
          for (var p2 in b3)
            if (Object.prototype.hasOwnProperty.call(b3, p2))
              d3[p2] = b3[p2];
        };
        return extendStatics(d2, b2);
      };
      return function(d2, b2) {
        extendStatics(d2, b2);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Wedge = void 0;
    var Util_1 = require_Util();
    var Factory_1 = require_Factory();
    var Shape_1 = require_Shape();
    var Global_1 = require_Global();
    var Validators_1 = require_Validators();
    var Global_2 = require_Global();
    var Wedge = function(_super) {
      __extends(Wedge2, _super);
      function Wedge2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Wedge2.prototype._sceneFunc = function(context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Global_1.Konva.getAngle(this.angle()), this.clockwise());
        context.lineTo(0, 0);
        context.closePath();
        context.fillStrokeShape(this);
      };
      Wedge2.prototype.getWidth = function() {
        return this.radius() * 2;
      };
      Wedge2.prototype.getHeight = function() {
        return this.radius() * 2;
      };
      Wedge2.prototype.setWidth = function(width) {
        this.radius(width / 2);
      };
      Wedge2.prototype.setHeight = function(height) {
        this.radius(height / 2);
      };
      return Wedge2;
    }(Shape_1.Shape);
    exports.Wedge = Wedge;
    Wedge.prototype.className = "Wedge";
    Wedge.prototype._centroid = true;
    Wedge.prototype._attrsAffectingSize = ["radius"];
    Global_2._registerNode(Wedge);
    Factory_1.Factory.addGetterSetter(Wedge, "radius", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Wedge, "angle", 0, Validators_1.getNumberValidator());
    Factory_1.Factory.addGetterSetter(Wedge, "clockwise", false);
    Factory_1.Factory.backCompat(Wedge, {
      angleDeg: "angle",
      getAngleDeg: "getAngle",
      setAngleDeg: "setAngle"
    });
    Util_1.Collection.mapMethods(Wedge);
  });

  // node_modules/konva/lib/filters/Blur.js
  var require_Blur = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Blur = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function BlurStack() {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
    }
    var mul_table = [
      512,
      512,
      456,
      512,
      328,
      456,
      335,
      512,
      405,
      328,
      271,
      456,
      388,
      335,
      292,
      512,
      454,
      405,
      364,
      328,
      298,
      271,
      496,
      456,
      420,
      388,
      360,
      335,
      312,
      292,
      273,
      512,
      482,
      454,
      428,
      405,
      383,
      364,
      345,
      328,
      312,
      298,
      284,
      271,
      259,
      496,
      475,
      456,
      437,
      420,
      404,
      388,
      374,
      360,
      347,
      335,
      323,
      312,
      302,
      292,
      282,
      273,
      265,
      512,
      497,
      482,
      468,
      454,
      441,
      428,
      417,
      405,
      394,
      383,
      373,
      364,
      354,
      345,
      337,
      328,
      320,
      312,
      305,
      298,
      291,
      284,
      278,
      271,
      265,
      259,
      507,
      496,
      485,
      475,
      465,
      456,
      446,
      437,
      428,
      420,
      412,
      404,
      396,
      388,
      381,
      374,
      367,
      360,
      354,
      347,
      341,
      335,
      329,
      323,
      318,
      312,
      307,
      302,
      297,
      292,
      287,
      282,
      278,
      273,
      269,
      265,
      261,
      512,
      505,
      497,
      489,
      482,
      475,
      468,
      461,
      454,
      447,
      441,
      435,
      428,
      422,
      417,
      411,
      405,
      399,
      394,
      389,
      383,
      378,
      373,
      368,
      364,
      359,
      354,
      350,
      345,
      341,
      337,
      332,
      328,
      324,
      320,
      316,
      312,
      309,
      305,
      301,
      298,
      294,
      291,
      287,
      284,
      281,
      278,
      274,
      271,
      268,
      265,
      262,
      259,
      257,
      507,
      501,
      496,
      491,
      485,
      480,
      475,
      470,
      465,
      460,
      456,
      451,
      446,
      442,
      437,
      433,
      428,
      424,
      420,
      416,
      412,
      408,
      404,
      400,
      396,
      392,
      388,
      385,
      381,
      377,
      374,
      370,
      367,
      363,
      360,
      357,
      354,
      350,
      347,
      344,
      341,
      338,
      335,
      332,
      329,
      326,
      323,
      320,
      318,
      315,
      312,
      310,
      307,
      304,
      302,
      299,
      297,
      294,
      292,
      289,
      287,
      285,
      282,
      280,
      278,
      275,
      273,
      271,
      269,
      267,
      265,
      263,
      261,
      259
    ];
    var shg_table = [
      9,
      11,
      12,
      13,
      13,
      14,
      14,
      15,
      15,
      15,
      15,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      21,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      22,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      23,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24,
      24
    ];
    function filterGaussBlurRGBA(imageData, radius) {
      var pixels = imageData.data, width = imageData.width, height = imageData.height;
      var x2, y2, i2, p2, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
      var div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2, stackStart = new BlurStack(), stackEnd = null, stack = stackStart, stackIn = null, stackOut = null, mul_sum = mul_table[radius], shg_sum = shg_table[radius];
      for (i2 = 1; i2 < div; i2++) {
        stack = stack.next = new BlurStack();
        if (i2 === radiusPlus1) {
          stackEnd = stack;
        }
      }
      stack.next = stackStart;
      yw = yi = 0;
      for (y2 = 0; y2 < height; y2++) {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i2 = 0; i2 < radiusPlus1; i2++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        for (i2 = 1; i2 < radiusPlus1; i2++) {
          p2 = yi + ((widthMinus1 < i2 ? widthMinus1 : i2) << 2);
          r_sum += (stack.r = pr = pixels[p2]) * (rbs = radiusPlus1 - i2);
          g_sum += (stack.g = pg = pixels[p2 + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[p2 + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[p2 + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x2 = 0; x2 < width; x2++) {
          pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (pa !== 0) {
            pa = 255 / pa;
            pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
            pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          p2 = yw + ((p2 = x2 + radius + 1) < widthMinus1 ? p2 : widthMinus1) << 2;
          r_in_sum += stackIn.r = pixels[p2];
          g_in_sum += stackIn.g = pixels[p2 + 1];
          b_in_sum += stackIn.b = pixels[p2 + 2];
          a_in_sum += stackIn.a = pixels[p2 + 3];
          r_sum += r_in_sum;
          g_sum += g_in_sum;
          b_sum += b_in_sum;
          a_sum += a_in_sum;
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += 4;
        }
        yw += width;
      }
      for (x2 = 0; x2 < width; x2++) {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
        yi = x2 << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;
        stack = stackStart;
        for (i2 = 0; i2 < radiusPlus1; i2++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }
        yp = width;
        for (i2 = 1; i2 <= radius; i2++) {
          yi = yp + x2 << 2;
          r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i2);
          g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
          b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
          a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
          r_in_sum += pr;
          g_in_sum += pg;
          b_in_sum += pb;
          a_in_sum += pa;
          stack = stack.next;
          if (i2 < heightMinus1) {
            yp += width;
          }
        }
        yi = x2;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y2 = 0; y2 < height; y2++) {
          p2 = yi << 2;
          pixels[p2 + 3] = pa = a_sum * mul_sum >> shg_sum;
          if (pa > 0) {
            pa = 255 / pa;
            pixels[p2] = (r_sum * mul_sum >> shg_sum) * pa;
            pixels[p2 + 1] = (g_sum * mul_sum >> shg_sum) * pa;
            pixels[p2 + 2] = (b_sum * mul_sum >> shg_sum) * pa;
          } else {
            pixels[p2] = pixels[p2 + 1] = pixels[p2 + 2] = 0;
          }
          r_sum -= r_out_sum;
          g_sum -= g_out_sum;
          b_sum -= b_out_sum;
          a_sum -= a_out_sum;
          r_out_sum -= stackIn.r;
          g_out_sum -= stackIn.g;
          b_out_sum -= stackIn.b;
          a_out_sum -= stackIn.a;
          p2 = x2 + ((p2 = y2 + radiusPlus1) < heightMinus1 ? p2 : heightMinus1) * width << 2;
          r_sum += r_in_sum += stackIn.r = pixels[p2];
          g_sum += g_in_sum += stackIn.g = pixels[p2 + 1];
          b_sum += b_in_sum += stackIn.b = pixels[p2 + 2];
          a_sum += a_in_sum += stackIn.a = pixels[p2 + 3];
          stackIn = stackIn.next;
          r_out_sum += pr = stackOut.r;
          g_out_sum += pg = stackOut.g;
          b_out_sum += pb = stackOut.b;
          a_out_sum += pa = stackOut.a;
          r_in_sum -= pr;
          g_in_sum -= pg;
          b_in_sum -= pb;
          a_in_sum -= pa;
          stackOut = stackOut.next;
          yi += width;
        }
      }
    }
    var Blur = function Blur2(imageData) {
      var radius = Math.round(this.blurRadius());
      if (radius > 0) {
        filterGaussBlurRGBA(imageData, radius);
      }
    };
    exports.Blur = Blur;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blurRadius", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Brighten.js
  var require_Brighten = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Brighten = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Brighten = function(imageData) {
      var brightness = this.brightness() * 255, data = imageData.data, len = data.length, i2;
      for (i2 = 0; i2 < len; i2 += 4) {
        data[i2] += brightness;
        data[i2 + 1] += brightness;
        data[i2 + 2] += brightness;
      }
    };
    exports.Brighten = Brighten;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "brightness", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Contrast.js
  var require_Contrast = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Contrast = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Contrast = function(imageData) {
      var adjust = Math.pow((this.contrast() + 100) / 100, 2);
      var data = imageData.data, nPixels = data.length, red = 150, green = 150, blue = 150, i2;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        red = data[i2];
        green = data[i2 + 1];
        blue = data[i2 + 2];
        red /= 255;
        red -= 0.5;
        red *= adjust;
        red += 0.5;
        red *= 255;
        green /= 255;
        green -= 0.5;
        green *= adjust;
        green += 0.5;
        green *= 255;
        blue /= 255;
        blue -= 0.5;
        blue *= adjust;
        blue += 0.5;
        blue *= 255;
        red = red < 0 ? 0 : red > 255 ? 255 : red;
        green = green < 0 ? 0 : green > 255 ? 255 : green;
        blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
        data[i2] = red;
        data[i2 + 1] = green;
        data[i2 + 2] = blue;
      }
    };
    exports.Contrast = Contrast;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "contrast", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Emboss.js
  var require_Emboss = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Emboss = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var Emboss = function(imageData) {
      var strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), dirY = 0, dirX = 0, data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y2 = h;
      switch (direction) {
        case "top-left":
          dirY = -1;
          dirX = -1;
          break;
        case "top":
          dirY = -1;
          dirX = 0;
          break;
        case "top-right":
          dirY = -1;
          dirX = 1;
          break;
        case "right":
          dirY = 0;
          dirX = 1;
          break;
        case "bottom-right":
          dirY = 1;
          dirX = 1;
          break;
        case "bottom":
          dirY = 1;
          dirX = 0;
          break;
        case "bottom-left":
          dirY = 1;
          dirX = -1;
          break;
        case "left":
          dirY = 0;
          dirX = -1;
          break;
        default:
          Util_1.Util.error("Unknown emboss direction: " + direction);
      }
      do {
        var offsetY = (y2 - 1) * w4;
        var otherY = dirY;
        if (y2 + otherY < 1) {
          otherY = 0;
        }
        if (y2 + otherY > h) {
          otherY = 0;
        }
        var offsetYOther = (y2 - 1 + otherY) * w * 4;
        var x2 = w;
        do {
          var offset = offsetY + (x2 - 1) * 4;
          var otherX = dirX;
          if (x2 + otherX < 1) {
            otherX = 0;
          }
          if (x2 + otherX > w) {
            otherX = 0;
          }
          var offsetOther = offsetYOther + (x2 - 1 + otherX) * 4;
          var dR = data[offset] - data[offsetOther];
          var dG = data[offset + 1] - data[offsetOther + 1];
          var dB = data[offset + 2] - data[offsetOther + 2];
          var dif = dR;
          var absDif = dif > 0 ? dif : -dif;
          var absG = dG > 0 ? dG : -dG;
          var absB = dB > 0 ? dB : -dB;
          if (absG > absDif) {
            dif = dG;
          }
          if (absB > absDif) {
            dif = dB;
          }
          dif *= strength;
          if (blend) {
            var r2 = data[offset] + dif;
            var g2 = data[offset + 1] + dif;
            var b2 = data[offset + 2] + dif;
            data[offset] = r2 > 255 ? 255 : r2 < 0 ? 0 : r2;
            data[offset + 1] = g2 > 255 ? 255 : g2 < 0 ? 0 : g2;
            data[offset + 2] = b2 > 255 ? 255 : b2 < 0 ? 0 : b2;
          } else {
            var grey = greyLevel - dif;
            if (grey < 0) {
              grey = 0;
            } else if (grey > 255) {
              grey = 255;
            }
            data[offset] = data[offset + 1] = data[offset + 2] = grey;
          }
        } while (--x2);
      } while (--y2);
    };
    exports.Emboss = Emboss;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossStrength", 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossWhiteLevel", 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossDirection", "top-left", null, Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "embossBlend", false, null, Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Enhance.js
  var require_Enhance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Enhance = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function remap(fromValue, fromMin, fromMax, toMin, toMax) {
      var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;
      if (fromRange === 0) {
        return toMin + toRange / 2;
      }
      if (toRange === 0) {
        return toMin;
      }
      toValue = (fromValue - fromMin) / fromRange;
      toValue = toRange * toValue + toMin;
      return toValue;
    }
    var Enhance = function(imageData) {
      var data = imageData.data, nSubPixels = data.length, rMin = data[0], rMax = rMin, r2, gMin = data[1], gMax = gMin, g2, bMin = data[2], bMax = bMin, b2, i2;
      var enhanceAmount = this.enhance();
      if (enhanceAmount === 0) {
        return;
      }
      for (i2 = 0; i2 < nSubPixels; i2 += 4) {
        r2 = data[i2 + 0];
        if (r2 < rMin) {
          rMin = r2;
        } else if (r2 > rMax) {
          rMax = r2;
        }
        g2 = data[i2 + 1];
        if (g2 < gMin) {
          gMin = g2;
        } else if (g2 > gMax) {
          gMax = g2;
        }
        b2 = data[i2 + 2];
        if (b2 < bMin) {
          bMin = b2;
        } else if (b2 > bMax) {
          bMax = b2;
        }
      }
      if (rMax === rMin) {
        rMax = 255;
        rMin = 0;
      }
      if (gMax === gMin) {
        gMax = 255;
        gMin = 0;
      }
      if (bMax === bMin) {
        bMax = 255;
        bMin = 0;
      }
      var rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
      if (enhanceAmount > 0) {
        rGoalMax = rMax + enhanceAmount * (255 - rMax);
        rGoalMin = rMin - enhanceAmount * (rMin - 0);
        gGoalMax = gMax + enhanceAmount * (255 - gMax);
        gGoalMin = gMin - enhanceAmount * (gMin - 0);
        bGoalMax = bMax + enhanceAmount * (255 - bMax);
        bGoalMin = bMin - enhanceAmount * (bMin - 0);
      } else {
        rMid = (rMax + rMin) * 0.5;
        rGoalMax = rMax + enhanceAmount * (rMax - rMid);
        rGoalMin = rMin + enhanceAmount * (rMin - rMid);
        gMid = (gMax + gMin) * 0.5;
        gGoalMax = gMax + enhanceAmount * (gMax - gMid);
        gGoalMin = gMin + enhanceAmount * (gMin - gMid);
        bMid = (bMax + bMin) * 0.5;
        bGoalMax = bMax + enhanceAmount * (bMax - bMid);
        bGoalMin = bMin + enhanceAmount * (bMin - bMid);
      }
      for (i2 = 0; i2 < nSubPixels; i2 += 4) {
        data[i2 + 0] = remap(data[i2 + 0], rMin, rMax, rGoalMin, rGoalMax);
        data[i2 + 1] = remap(data[i2 + 1], gMin, gMax, gGoalMin, gGoalMax);
        data[i2 + 2] = remap(data[i2 + 2], bMin, bMax, bGoalMin, bGoalMax);
      }
    };
    exports.Enhance = Enhance;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "enhance", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Grayscale.js
  var require_Grayscale = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Grayscale = void 0;
    var Grayscale = function(imageData) {
      var data = imageData.data, len = data.length, i2, brightness;
      for (i2 = 0; i2 < len; i2 += 4) {
        brightness = 0.34 * data[i2] + 0.5 * data[i2 + 1] + 0.16 * data[i2 + 2];
        data[i2] = brightness;
        data[i2 + 1] = brightness;
        data[i2 + 2] = brightness;
      }
    };
    exports.Grayscale = Grayscale;
  });

  // node_modules/konva/lib/filters/HSL.js
  var require_HSL = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.HSL = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "luminance", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    var HSL = function(imageData) {
      var data = imageData.data, nPixels = data.length, v2 = 1, s2 = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l2 = this.luminance() * 127, i2;
      var vsu = v2 * s2 * Math.cos(h * Math.PI / 180), vsw = v2 * s2 * Math.sin(h * Math.PI / 180);
      var rr = 0.299 * v2 + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v2 - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v2 - 0.114 * vsu - 0.497 * vsw;
      var gr = 0.299 * v2 - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v2 + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v2 - 0.114 * vsu + 0.293 * vsw;
      var br = 0.299 * v2 - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v2 - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v2 + 0.886 * vsu - 0.2 * vsw;
      var r2, g2, b2, a2;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        r2 = data[i2 + 0];
        g2 = data[i2 + 1];
        b2 = data[i2 + 2];
        a2 = data[i2 + 3];
        data[i2 + 0] = rr * r2 + rg * g2 + rb * b2 + l2;
        data[i2 + 1] = gr * r2 + gg * g2 + gb * b2 + l2;
        data[i2 + 2] = br * r2 + bg * g2 + bb * b2 + l2;
        data[i2 + 3] = a2;
      }
    };
    exports.HSL = HSL;
  });

  // node_modules/konva/lib/filters/HSV.js
  var require_HSV = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.HSV = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var HSV = function(imageData) {
      var data = imageData.data, nPixels = data.length, v2 = Math.pow(2, this.value()), s2 = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, i2;
      var vsu = v2 * s2 * Math.cos(h * Math.PI / 180), vsw = v2 * s2 * Math.sin(h * Math.PI / 180);
      var rr = 0.299 * v2 + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v2 - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v2 - 0.114 * vsu - 0.497 * vsw;
      var gr = 0.299 * v2 - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v2 + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v2 - 0.114 * vsu + 0.293 * vsw;
      var br = 0.299 * v2 - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v2 - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v2 + 0.886 * vsu - 0.2 * vsw;
      var r2, g2, b2, a2;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        r2 = data[i2 + 0];
        g2 = data[i2 + 1];
        b2 = data[i2 + 2];
        a2 = data[i2 + 3];
        data[i2 + 0] = rr * r2 + rg * g2 + rb * b2;
        data[i2 + 1] = gr * r2 + gg * g2 + gb * b2;
        data[i2 + 2] = br * r2 + bg * g2 + bb * b2;
        data[i2 + 3] = a2;
      }
    };
    exports.HSV = HSV;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "hue", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "saturation", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "value", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Invert.js
  var require_Invert = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Invert = void 0;
    var Invert = function(imageData) {
      var data = imageData.data, len = data.length, i2;
      for (i2 = 0; i2 < len; i2 += 4) {
        data[i2] = 255 - data[i2];
        data[i2 + 1] = 255 - data[i2 + 1];
        data[i2 + 2] = 255 - data[i2 + 2];
      }
    };
    exports.Invert = Invert;
  });

  // node_modules/konva/lib/filters/Kaleidoscope.js
  var require_Kaleidoscope = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Kaleidoscope = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Util_1 = require_Util();
    var Validators_1 = require_Validators();
    var ToPolar = function(src, dst, opt) {
      var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i2, x2, y2, r2 = 0, g2 = 0, b2 = 0, a2 = 0;
      var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
      x2 = xSize - xMid;
      y2 = ySize - yMid;
      rad = Math.sqrt(x2 * x2 + y2 * y2);
      rMax = rad > rMax ? rad : rMax;
      var rSize = ySize, tSize = xSize, radius, theta;
      var conversion = 360 / tSize * Math.PI / 180, sin, cos;
      for (theta = 0; theta < tSize; theta += 1) {
        sin = Math.sin(theta * conversion);
        cos = Math.cos(theta * conversion);
        for (radius = 0; radius < rSize; radius += 1) {
          x2 = Math.floor(xMid + rMax * radius / rSize * cos);
          y2 = Math.floor(yMid + rMax * radius / rSize * sin);
          i2 = (y2 * xSize + x2) * 4;
          r2 = srcPixels[i2 + 0];
          g2 = srcPixels[i2 + 1];
          b2 = srcPixels[i2 + 2];
          a2 = srcPixels[i2 + 3];
          i2 = (theta + radius * xSize) * 4;
          dstPixels[i2 + 0] = r2;
          dstPixels[i2 + 1] = g2;
          dstPixels[i2 + 2] = b2;
          dstPixels[i2 + 3] = a2;
        }
      }
    };
    var FromPolar = function(src, dst, opt) {
      var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i2, x2, y2, dx, dy, r2 = 0, g2 = 0, b2 = 0, a2 = 0;
      var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
      x2 = xSize - xMid;
      y2 = ySize - yMid;
      rad = Math.sqrt(x2 * x2 + y2 * y2);
      rMax = rad > rMax ? rad : rMax;
      var rSize = ySize, tSize = xSize, radius, theta, phaseShift = opt.polarRotation || 0;
      var x1, y1;
      for (x2 = 0; x2 < xSize; x2 += 1) {
        for (y2 = 0; y2 < ySize; y2 += 1) {
          dx = x2 - xMid;
          dy = y2 - yMid;
          radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
          theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
          theta = theta * tSize / 360;
          x1 = Math.floor(theta);
          y1 = Math.floor(radius);
          i2 = (y1 * xSize + x1) * 4;
          r2 = srcPixels[i2 + 0];
          g2 = srcPixels[i2 + 1];
          b2 = srcPixels[i2 + 2];
          a2 = srcPixels[i2 + 3];
          i2 = (y2 * xSize + x2) * 4;
          dstPixels[i2 + 0] = r2;
          dstPixels[i2 + 1] = g2;
          dstPixels[i2 + 2] = b2;
          dstPixels[i2 + 3] = a2;
        }
      }
    };
    var Kaleidoscope = function(imageData) {
      var xSize = imageData.width, ySize = imageData.height;
      var x2, y2, xoff, i2, r2, g2, b2, a2, srcPos, dstPos;
      var power = Math.round(this.kaleidoscopePower());
      var angle = Math.round(this.kaleidoscopeAngle());
      var offset = Math.floor(xSize * (angle % 360) / 360);
      if (power < 1) {
        return;
      }
      var tempCanvas = Util_1.Util.createCanvasElement();
      tempCanvas.width = xSize;
      tempCanvas.height = ySize;
      var scratchData = tempCanvas.getContext("2d").getImageData(0, 0, xSize, ySize);
      ToPolar(imageData, scratchData, {
        polarCenterX: xSize / 2,
        polarCenterY: ySize / 2
      });
      var minSectionSize = xSize / Math.pow(2, power);
      while (minSectionSize <= 8) {
        minSectionSize = minSectionSize * 2;
        power -= 1;
      }
      minSectionSize = Math.ceil(minSectionSize);
      var sectionSize = minSectionSize;
      var xStart = 0, xEnd = sectionSize, xDelta = 1;
      if (offset + minSectionSize > xSize) {
        xStart = sectionSize;
        xEnd = 0;
        xDelta = -1;
      }
      for (y2 = 0; y2 < ySize; y2 += 1) {
        for (x2 = xStart; x2 !== xEnd; x2 += xDelta) {
          xoff = Math.round(x2 + offset) % xSize;
          srcPos = (xSize * y2 + xoff) * 4;
          r2 = scratchData.data[srcPos + 0];
          g2 = scratchData.data[srcPos + 1];
          b2 = scratchData.data[srcPos + 2];
          a2 = scratchData.data[srcPos + 3];
          dstPos = (xSize * y2 + x2) * 4;
          scratchData.data[dstPos + 0] = r2;
          scratchData.data[dstPos + 1] = g2;
          scratchData.data[dstPos + 2] = b2;
          scratchData.data[dstPos + 3] = a2;
        }
      }
      for (y2 = 0; y2 < ySize; y2 += 1) {
        sectionSize = Math.floor(minSectionSize);
        for (i2 = 0; i2 < power; i2 += 1) {
          for (x2 = 0; x2 < sectionSize + 1; x2 += 1) {
            srcPos = (xSize * y2 + x2) * 4;
            r2 = scratchData.data[srcPos + 0];
            g2 = scratchData.data[srcPos + 1];
            b2 = scratchData.data[srcPos + 2];
            a2 = scratchData.data[srcPos + 3];
            dstPos = (xSize * y2 + sectionSize * 2 - x2 - 1) * 4;
            scratchData.data[dstPos + 0] = r2;
            scratchData.data[dstPos + 1] = g2;
            scratchData.data[dstPos + 2] = b2;
            scratchData.data[dstPos + 3] = a2;
          }
          sectionSize *= 2;
        }
      }
      FromPolar(scratchData, imageData, {polarRotation: 0});
    };
    exports.Kaleidoscope = Kaleidoscope;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopePower", 2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "kaleidoscopeAngle", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Mask.js
  var require_Mask = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Mask = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    function pixelAt(idata, x2, y2) {
      var idx = (y2 * idata.width + x2) * 4;
      var d2 = [];
      d2.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
      return d2;
    }
    function rgbDistance(p1, p2) {
      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
    }
    function rgbMean(pTab) {
      var m2 = [0, 0, 0];
      for (var i2 = 0; i2 < pTab.length; i2++) {
        m2[0] += pTab[i2][0];
        m2[1] += pTab[i2][1];
        m2[2] += pTab[i2][2];
      }
      m2[0] /= pTab.length;
      m2[1] /= pTab.length;
      m2[2] /= pTab.length;
      return m2;
    }
    function backgroundMask(idata, threshold) {
      var rgbv_no = pixelAt(idata, 0, 0);
      var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
      var rgbv_so = pixelAt(idata, 0, idata.height - 1);
      var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
      var thres = threshold || 10;
      if (rgbDistance(rgbv_no, rgbv_ne) < thres && rgbDistance(rgbv_ne, rgbv_se) < thres && rgbDistance(rgbv_se, rgbv_so) < thres && rgbDistance(rgbv_so, rgbv_no) < thres) {
        var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
        var mask = [];
        for (var i2 = 0; i2 < idata.width * idata.height; i2++) {
          var d2 = rgbDistance(mean, [
            idata.data[i2 * 4],
            idata.data[i2 * 4 + 1],
            idata.data[i2 * 4 + 2]
          ]);
          mask[i2] = d2 < thres ? 0 : 255;
        }
        return mask;
      }
    }
    function applyMask(idata, mask) {
      for (var i2 = 0; i2 < idata.width * idata.height; i2++) {
        idata.data[4 * i2 + 3] = mask[i2];
      }
    }
    function erodeMask(mask, sw, sh) {
      var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
      var side = Math.round(Math.sqrt(weights.length));
      var halfSide = Math.floor(side / 2);
      var maskResult = [];
      for (var y2 = 0; y2 < sh; y2++) {
        for (var x2 = 0; x2 < sw; x2++) {
          var so = y2 * sw + x2;
          var a2 = 0;
          for (var cy = 0; cy < side; cy++) {
            for (var cx = 0; cx < side; cx++) {
              var scy = y2 + cy - halfSide;
              var scx = x2 + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                var srcOff = scy * sw + scx;
                var wt = weights[cy * side + cx];
                a2 += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a2 === 255 * 8 ? 255 : 0;
        }
      }
      return maskResult;
    }
    function dilateMask(mask, sw, sh) {
      var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
      var side = Math.round(Math.sqrt(weights.length));
      var halfSide = Math.floor(side / 2);
      var maskResult = [];
      for (var y2 = 0; y2 < sh; y2++) {
        for (var x2 = 0; x2 < sw; x2++) {
          var so = y2 * sw + x2;
          var a2 = 0;
          for (var cy = 0; cy < side; cy++) {
            for (var cx = 0; cx < side; cx++) {
              var scy = y2 + cy - halfSide;
              var scx = x2 + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                var srcOff = scy * sw + scx;
                var wt = weights[cy * side + cx];
                a2 += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a2 >= 255 * 4 ? 255 : 0;
        }
      }
      return maskResult;
    }
    function smoothEdgeMask(mask, sw, sh) {
      var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
      var side = Math.round(Math.sqrt(weights.length));
      var halfSide = Math.floor(side / 2);
      var maskResult = [];
      for (var y2 = 0; y2 < sh; y2++) {
        for (var x2 = 0; x2 < sw; x2++) {
          var so = y2 * sw + x2;
          var a2 = 0;
          for (var cy = 0; cy < side; cy++) {
            for (var cx = 0; cx < side; cx++) {
              var scy = y2 + cy - halfSide;
              var scx = x2 + cx - halfSide;
              if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                var srcOff = scy * sw + scx;
                var wt = weights[cy * side + cx];
                a2 += mask[srcOff] * wt;
              }
            }
          }
          maskResult[so] = a2;
        }
      }
      return maskResult;
    }
    var Mask = function(imageData) {
      var threshold = this.threshold(), mask = backgroundMask(imageData, threshold);
      if (mask) {
        mask = erodeMask(mask, imageData.width, imageData.height);
        mask = dilateMask(mask, imageData.width, imageData.height);
        mask = smoothEdgeMask(mask, imageData.width, imageData.height);
        applyMask(imageData, mask);
      }
      return imageData;
    };
    exports.Mask = Mask;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", 0, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Noise.js
  var require_Noise = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Noise = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Noise = function(imageData) {
      var amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2, i2;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        data[i2 + 0] += half - 2 * half * Math.random();
        data[i2 + 1] += half - 2 * half * Math.random();
        data[i2 + 2] += half - 2 * half * Math.random();
      }
    };
    exports.Noise = Noise;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "noise", 0.2, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Pixelate.js
  var require_Pixelate = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Pixelate = void 0;
    var Factory_1 = require_Factory();
    var Util_1 = require_Util();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Pixelate = function(imageData) {
      var pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x2, y2, i2, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
      if (pixelSize <= 0) {
        Util_1.Util.error("pixelSize value can not be <= 0");
        return;
      }
      for (xBin = 0; xBin < nBinsX; xBin += 1) {
        for (yBin = 0; yBin < nBinsY; yBin += 1) {
          red = 0;
          green = 0;
          blue = 0;
          alpha = 0;
          xBinStart = xBin * pixelSize;
          xBinEnd = xBinStart + pixelSize;
          yBinStart = yBin * pixelSize;
          yBinEnd = yBinStart + pixelSize;
          pixelsInBin = 0;
          for (x2 = xBinStart; x2 < xBinEnd; x2 += 1) {
            if (x2 >= width) {
              continue;
            }
            for (y2 = yBinStart; y2 < yBinEnd; y2 += 1) {
              if (y2 >= height) {
                continue;
              }
              i2 = (width * y2 + x2) * 4;
              red += data[i2 + 0];
              green += data[i2 + 1];
              blue += data[i2 + 2];
              alpha += data[i2 + 3];
              pixelsInBin += 1;
            }
          }
          red = red / pixelsInBin;
          green = green / pixelsInBin;
          blue = blue / pixelsInBin;
          alpha = alpha / pixelsInBin;
          for (x2 = xBinStart; x2 < xBinEnd; x2 += 1) {
            if (x2 >= width) {
              continue;
            }
            for (y2 = yBinStart; y2 < yBinEnd; y2 += 1) {
              if (y2 >= height) {
                continue;
              }
              i2 = (width * y2 + x2) * 4;
              data[i2 + 0] = red;
              data[i2 + 1] = green;
              data[i2 + 2] = blue;
              data[i2 + 3] = alpha;
            }
          }
        }
      }
    };
    exports.Pixelate = Pixelate;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "pixelSize", 8, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/Posterize.js
  var require_Posterize = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Posterize = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Posterize = function(imageData) {
      var levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels, i2;
      for (i2 = 0; i2 < len; i2 += 1) {
        data[i2] = Math.floor(data[i2] / scale) * scale;
      }
    };
    exports.Posterize = Posterize;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "levels", 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/RGB.js
  var require_RGB = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.RGB = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var RGB = function(imageData) {
      var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), i2, brightness;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        brightness = (0.34 * data[i2] + 0.5 * data[i2 + 1] + 0.16 * data[i2 + 2]) / 255;
        data[i2] = brightness * red;
        data[i2 + 1] = brightness * green;
        data[i2 + 2] = brightness * blue;
        data[i2 + 3] = data[i2 + 3];
      }
    };
    exports.RGB = RGB;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/filters/RGBA.js
  var require_RGBA = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.RGBA = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var RGBA = function(imageData) {
      var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha(), i2, ia;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        ia = 1 - alpha;
        data[i2] = red * alpha + data[i2] * ia;
        data[i2 + 1] = green * alpha + data[i2 + 1] * ia;
        data[i2 + 2] = blue * alpha + data[i2 + 2] * ia;
      }
    };
    exports.RGBA = RGBA;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
      this._filterUpToDate = false;
      if (val > 255) {
        return 255;
      } else if (val < 0) {
        return 0;
      } else {
        return Math.round(val);
      }
    });
    Factory_1.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators_1.RGBComponent, Factory_1.Factory.afterSetFilter);
    Factory_1.Factory.addGetterSetter(Node_1.Node, "alpha", 1, function(val) {
      this._filterUpToDate = false;
      if (val > 1) {
        return 1;
      } else if (val < 0) {
        return 0;
      } else {
        return val;
      }
    });
  });

  // node_modules/konva/lib/filters/Sepia.js
  var require_Sepia = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Sepia = void 0;
    var Sepia = function(imageData) {
      var data = imageData.data, nPixels = data.length, i2, r2, g2, b2;
      for (i2 = 0; i2 < nPixels; i2 += 4) {
        r2 = data[i2 + 0];
        g2 = data[i2 + 1];
        b2 = data[i2 + 2];
        data[i2 + 0] = Math.min(255, r2 * 0.393 + g2 * 0.769 + b2 * 0.189);
        data[i2 + 1] = Math.min(255, r2 * 0.349 + g2 * 0.686 + b2 * 0.168);
        data[i2 + 2] = Math.min(255, r2 * 0.272 + g2 * 0.534 + b2 * 0.131);
      }
    };
    exports.Sepia = Sepia;
  });

  // node_modules/konva/lib/filters/Solarize.js
  var require_Solarize = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Solarize = void 0;
    var Solarize = function(imageData) {
      var data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y2 = h;
      do {
        var offsetY = (y2 - 1) * w4;
        var x2 = w;
        do {
          var offset = offsetY + (x2 - 1) * 4;
          var r2 = data[offset];
          var g2 = data[offset + 1];
          var b2 = data[offset + 2];
          if (r2 > 127) {
            r2 = 255 - r2;
          }
          if (g2 > 127) {
            g2 = 255 - g2;
          }
          if (b2 > 127) {
            b2 = 255 - b2;
          }
          data[offset] = r2;
          data[offset + 1] = g2;
          data[offset + 2] = b2;
        } while (--x2);
      } while (--y2);
    };
    exports.Solarize = Solarize;
  });

  // node_modules/konva/lib/filters/Threshold.js
  var require_Threshold = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Threshold = void 0;
    var Factory_1 = require_Factory();
    var Node_1 = require_Node();
    var Validators_1 = require_Validators();
    var Threshold = function(imageData) {
      var level = this.threshold() * 255, data = imageData.data, len = data.length, i2;
      for (i2 = 0; i2 < len; i2 += 1) {
        data[i2] = data[i2] < level ? 0 : 255;
      }
    };
    exports.Threshold = Threshold;
    Factory_1.Factory.addGetterSetter(Node_1.Node, "threshold", 0.5, Validators_1.getNumberValidator(), Factory_1.Factory.afterSetFilter);
  });

  // node_modules/konva/lib/_FullInternals.js
  var require_FullInternals = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Konva = void 0;
    var _CoreInternals_1 = require_CoreInternals();
    var Arc_1 = require_Arc();
    var Arrow_1 = require_Arrow();
    var Circle_1 = require_Circle();
    var Ellipse_1 = require_Ellipse();
    var Image_1 = require_Image();
    var Label_1 = require_Label();
    var Line_1 = require_Line();
    var Path_1 = require_Path();
    var Rect_1 = require_Rect();
    var RegularPolygon_1 = require_RegularPolygon();
    var Ring_1 = require_Ring();
    var Sprite_1 = require_Sprite();
    var Star_1 = require_Star();
    var Text_1 = require_Text();
    var TextPath_1 = require_TextPath();
    var Transformer_1 = require_Transformer();
    var Wedge_1 = require_Wedge();
    var Blur_1 = require_Blur();
    var Brighten_1 = require_Brighten();
    var Contrast_1 = require_Contrast();
    var Emboss_1 = require_Emboss();
    var Enhance_1 = require_Enhance();
    var Grayscale_1 = require_Grayscale();
    var HSL_1 = require_HSL();
    var HSV_1 = require_HSV();
    var Invert_1 = require_Invert();
    var Kaleidoscope_1 = require_Kaleidoscope();
    var Mask_1 = require_Mask();
    var Noise_1 = require_Noise();
    var Pixelate_1 = require_Pixelate();
    var Posterize_1 = require_Posterize();
    var RGB_1 = require_RGB();
    var RGBA_1 = require_RGBA();
    var Sepia_1 = require_Sepia();
    var Solarize_1 = require_Solarize();
    var Threshold_1 = require_Threshold();
    exports.Konva = _CoreInternals_1.Konva.Util._assign(_CoreInternals_1.Konva, {
      Arc: Arc_1.Arc,
      Arrow: Arrow_1.Arrow,
      Circle: Circle_1.Circle,
      Ellipse: Ellipse_1.Ellipse,
      Image: Image_1.Image,
      Label: Label_1.Label,
      Tag: Label_1.Tag,
      Line: Line_1.Line,
      Path: Path_1.Path,
      Rect: Rect_1.Rect,
      RegularPolygon: RegularPolygon_1.RegularPolygon,
      Ring: Ring_1.Ring,
      Sprite: Sprite_1.Sprite,
      Star: Star_1.Star,
      Text: Text_1.Text,
      TextPath: TextPath_1.TextPath,
      Transformer: Transformer_1.Transformer,
      Wedge: Wedge_1.Wedge,
      Filters: {
        Blur: Blur_1.Blur,
        Brighten: Brighten_1.Brighten,
        Contrast: Contrast_1.Contrast,
        Emboss: Emboss_1.Emboss,
        Enhance: Enhance_1.Enhance,
        Grayscale: Grayscale_1.Grayscale,
        HSL: HSL_1.HSL,
        HSV: HSV_1.HSV,
        Invert: Invert_1.Invert,
        Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
        Mask: Mask_1.Mask,
        Noise: Noise_1.Noise,
        Pixelate: Pixelate_1.Pixelate,
        Posterize: Posterize_1.Posterize,
        RGB: RGB_1.RGB,
        RGBA: RGBA_1.RGBA,
        Sepia: Sepia_1.Sepia,
        Solarize: Solarize_1.Solarize,
        Threshold: Threshold_1.Threshold
      }
    });
  });

  // node_modules/konva/lib/index.js
  var require_lib = __commonJS((exports, module) => {
    var Konva2 = require_FullInternals().Konva;
    Konva2._injectGlobal(Konva2);
    exports["default"] = Konva2;
    module.exports = exports["default"];
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r = {};
  var f = [];
  var e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function c(n2, l2) {
    for (var u2 in l2)
      n2[u2] = l2[u2];
    return n2;
  }
  function s(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
  }
  function a(n2, l2, u2) {
    var i2, t2, o2, r2 = arguments, f2 = {};
    for (o2 in l2)
      o2 == "key" ? i2 = l2[o2] : o2 == "ref" ? t2 = l2[o2] : f2[o2] = l2[o2];
    if (arguments.length > 3)
      for (u2 = [u2], o2 = 3; o2 < arguments.length; o2++)
        u2.push(r2[o2]);
    if (u2 != null && (f2.children = u2), typeof n2 == "function" && n2.defaultProps != null)
      for (o2 in n2.defaultProps)
        f2[o2] === void 0 && (f2[o2] = n2.defaultProps[o2]);
    return v(n2, f2, i2, t2, null);
  }
  function v(l2, u2, i2, t2, o2) {
    var r2 = {type: l2, props: u2, key: i2, ref: t2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o2 == null ? ++n.__v : o2};
    return n.vnode != null && n.vnode(r2), r2;
  }
  function y(n2) {
    return n2.children;
  }
  function p(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function d(n2, l2) {
    if (l2 == null)
      return n2.__ ? d(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++)
      if ((u2 = n2.__k[l2]) != null && u2.__e != null)
        return u2.__e;
    return typeof n2.type == "function" ? d(n2) : null;
  }
  function _(n2) {
    var l2, u2;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
        if ((u2 = n2.__k[l2]) != null && u2.__e != null) {
          n2.__e = n2.__c.base = u2.__e;
          break;
        }
      return _(n2);
    }
  }
  function k(l2) {
    (!l2.__d && (l2.__d = true) && u.push(l2) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
  }
  function b() {
    for (var n2; b.__r = u.length; )
      n2 = u.sort(function(n3, l2) {
        return n3.__v.__b - l2.__v.__b;
      }), u = [], n2.some(function(n3) {
        var l2, u2, i2, t2, o2, r2;
        n3.__d && (o2 = (t2 = (l2 = n3).__v).__e, (r2 = l2.__P) && (u2 = [], (i2 = c({}, t2)).__v = t2.__v + 1, I(r2, t2, i2, l2.__n, r2.ownerSVGElement !== void 0, t2.__h != null ? [o2] : null, u2, o2 == null ? d(t2) : o2, t2.__h), T(u2, t2), t2.__e != o2 && _(t2)));
      });
  }
  function m(n2, l2, u2, i2, t2, o2, e2, c2, s2, a2) {
    var h, p2, _2, k2, b2, m2, w, A2 = i2 && i2.__k || f, P2 = A2.length;
    for (u2.__k = [], h = 0; h < l2.length; h++)
      if ((k2 = u2.__k[h] = (k2 = l2[h]) == null || typeof k2 == "boolean" ? null : typeof k2 == "string" || typeof k2 == "number" || typeof k2 == "bigint" ? v(null, k2, null, null, k2) : Array.isArray(k2) ? v(y, {children: k2}, null, null, null) : k2.__b > 0 ? v(k2.type, k2.props, k2.key, null, k2.__v) : k2) != null) {
        if (k2.__ = u2, k2.__b = u2.__b + 1, (_2 = A2[h]) === null || _2 && k2.key == _2.key && k2.type === _2.type)
          A2[h] = void 0;
        else
          for (p2 = 0; p2 < P2; p2++) {
            if ((_2 = A2[p2]) && k2.key == _2.key && k2.type === _2.type) {
              A2[p2] = void 0;
              break;
            }
            _2 = null;
          }
        I(n2, k2, _2 = _2 || r, t2, o2, e2, c2, s2, a2), b2 = k2.__e, (p2 = k2.ref) && _2.ref != p2 && (w || (w = []), _2.ref && w.push(_2.ref, null, k2), w.push(p2, k2.__c || b2, k2)), b2 != null ? (m2 == null && (m2 = b2), typeof k2.type == "function" && k2.__k != null && k2.__k === _2.__k ? k2.__d = s2 = g(k2, s2, n2) : s2 = x(n2, k2, _2, A2, b2, s2), a2 || u2.type !== "option" ? typeof u2.type == "function" && (u2.__d = s2) : n2.value = "") : s2 && _2.__e == s2 && s2.parentNode != n2 && (s2 = d(_2));
      }
    for (u2.__e = m2, h = P2; h--; )
      A2[h] != null && (typeof u2.type == "function" && A2[h].__e != null && A2[h].__e == u2.__d && (u2.__d = d(i2, h + 1)), L(A2[h], A2[h]));
    if (w)
      for (h = 0; h < w.length; h++)
        z(w[h], w[++h], w[++h]);
  }
  function g(n2, l2, u2) {
    var i2, t2;
    for (i2 = 0; i2 < n2.__k.length; i2++)
      (t2 = n2.__k[i2]) && (t2.__ = n2, l2 = typeof t2.type == "function" ? g(t2, l2, u2) : x(u2, t2, t2, n2.__k, t2.__e, l2));
    return l2;
  }
  function x(n2, l2, u2, i2, t2, o2) {
    var r2, f2, e2;
    if (l2.__d !== void 0)
      r2 = l2.__d, l2.__d = void 0;
    else if (u2 == null || t2 != o2 || t2.parentNode == null)
      n:
        if (o2 == null || o2.parentNode !== n2)
          n2.appendChild(t2), r2 = null;
        else {
          for (f2 = o2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 2)
            if (f2 == t2)
              break n;
          n2.insertBefore(t2, o2), r2 = o2;
        }
    return r2 !== void 0 ? r2 : t2.nextSibling;
  }
  function A(n2, l2, u2, i2, t2) {
    var o2;
    for (o2 in u2)
      o2 === "children" || o2 === "key" || o2 in l2 || C(n2, o2, null, u2[o2], i2);
    for (o2 in l2)
      t2 && typeof l2[o2] != "function" || o2 === "children" || o2 === "key" || o2 === "value" || o2 === "checked" || u2[o2] === l2[o2] || C(n2, o2, l2[o2], u2[o2], i2);
  }
  function P(n2, l2, u2) {
    l2[0] === "-" ? n2.setProperty(l2, u2) : n2[l2] = u2 == null ? "" : typeof u2 != "number" || e.test(l2) ? u2 : u2 + "px";
  }
  function C(n2, l2, u2, i2, t2) {
    var o2;
    n:
      if (l2 === "style")
        if (typeof u2 == "string")
          n2.style.cssText = u2;
        else {
          if (typeof i2 == "string" && (n2.style.cssText = i2 = ""), i2)
            for (l2 in i2)
              u2 && l2 in u2 || P(n2.style, l2, "");
          if (u2)
            for (l2 in u2)
              i2 && u2[l2] === i2[l2] || P(n2.style, l2, u2[l2]);
        }
      else if (l2[0] === "o" && l2[1] === "n")
        o2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? i2 || n2.addEventListener(l2, o2 ? H : $, o2) : n2.removeEventListener(l2, o2 ? H : $, o2);
      else if (l2 !== "dangerouslySetInnerHTML") {
        if (t2)
          l2 = l2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "tabIndex" && l2 !== "download" && l2 in n2)
          try {
            n2[l2] = u2 == null ? "" : u2;
            break n;
          } catch (n3) {
          }
        typeof u2 == "function" || (u2 != null && (u2 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u2) : n2.removeAttribute(l2));
      }
  }
  function $(l2) {
    this.l[l2.type + false](n.event ? n.event(l2) : l2);
  }
  function H(l2) {
    this.l[l2.type + true](n.event ? n.event(l2) : l2);
  }
  function I(l2, u2, i2, t2, o2, r2, f2, e2, s2) {
    var a2, v2, h, d2, _2, k2, b2, g2, w, x2, A2, P2 = u2.type;
    if (u2.constructor !== void 0)
      return null;
    i2.__h != null && (s2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, r2 = [e2]), (a2 = n.__b) && a2(u2);
    try {
      n:
        if (typeof P2 == "function") {
          if (g2 = u2.props, w = (a2 = P2.contextType) && t2[a2.__c], x2 = a2 ? w ? w.props.value : a2.__ : t2, i2.__c ? b2 = (v2 = u2.__c = i2.__c).__ = v2.__E : ("prototype" in P2 && P2.prototype.render ? u2.__c = v2 = new P2(g2, x2) : (u2.__c = v2 = new p(g2, x2), v2.constructor = P2, v2.render = M), w && w.sub(v2), v2.props = g2, v2.state || (v2.state = {}), v2.context = x2, v2.__n = t2, h = v2.__d = true, v2.__h = []), v2.__s == null && (v2.__s = v2.state), P2.getDerivedStateFromProps != null && (v2.__s == v2.state && (v2.__s = c({}, v2.__s)), c(v2.__s, P2.getDerivedStateFromProps(g2, v2.__s))), d2 = v2.props, _2 = v2.state, h)
            P2.getDerivedStateFromProps == null && v2.componentWillMount != null && v2.componentWillMount(), v2.componentDidMount != null && v2.__h.push(v2.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && g2 !== d2 && v2.componentWillReceiveProps != null && v2.componentWillReceiveProps(g2, x2), !v2.__e && v2.shouldComponentUpdate != null && v2.shouldComponentUpdate(g2, v2.__s, x2) === false || u2.__v === i2.__v) {
              v2.props = g2, v2.state = v2.__s, u2.__v !== i2.__v && (v2.__d = false), v2.__v = u2, u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n2) {
                n2 && (n2.__ = u2);
              }), v2.__h.length && f2.push(v2);
              break n;
            }
            v2.componentWillUpdate != null && v2.componentWillUpdate(g2, v2.__s, x2), v2.componentDidUpdate != null && v2.__h.push(function() {
              v2.componentDidUpdate(d2, _2, k2);
            });
          }
          v2.context = x2, v2.props = g2, v2.state = v2.__s, (a2 = n.__r) && a2(u2), v2.__d = false, v2.__v = u2, v2.__P = l2, a2 = v2.render(v2.props, v2.state, v2.context), v2.state = v2.__s, v2.getChildContext != null && (t2 = c(c({}, t2), v2.getChildContext())), h || v2.getSnapshotBeforeUpdate == null || (k2 = v2.getSnapshotBeforeUpdate(d2, _2)), A2 = a2 != null && a2.type === y && a2.key == null ? a2.props.children : a2, m(l2, Array.isArray(A2) ? A2 : [A2], u2, i2, t2, o2, r2, f2, e2, s2), v2.base = u2.__e, u2.__h = null, v2.__h.length && f2.push(v2), b2 && (v2.__E = v2.__ = null), v2.__e = false;
        } else
          r2 == null && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = j(i2.__e, u2, i2, t2, o2, r2, f2, s2);
      (a2 = n.diffed) && a2(u2);
    } catch (l3) {
      u2.__v = null, (s2 || r2 != null) && (u2.__e = e2, u2.__h = !!s2, r2[r2.indexOf(e2)] = null), n.__e(l3, u2, i2);
    }
  }
  function T(l2, u2) {
    n.__c && n.__c(u2, l2), l2.some(function(u3) {
      try {
        l2 = u3.__h, u3.__h = [], l2.some(function(n2) {
          n2.call(u3);
        });
      } catch (l3) {
        n.__e(l3, u3.__v);
      }
    });
  }
  function j(n2, l2, u2, i2, t2, o2, e2, c2) {
    var a2, v2, h, y2, p2 = u2.props, d2 = l2.props, _2 = l2.type, k2 = 0;
    if (_2 === "svg" && (t2 = true), o2 != null) {
      for (; k2 < o2.length; k2++)
        if ((a2 = o2[k2]) && (a2 === n2 || (_2 ? a2.localName == _2 : a2.nodeType == 3))) {
          n2 = a2, o2[k2] = null;
          break;
        }
    }
    if (n2 == null) {
      if (_2 === null)
        return document.createTextNode(d2);
      n2 = t2 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d2.is && d2), o2 = null, c2 = false;
    }
    if (_2 === null)
      p2 === d2 || c2 && n2.data === d2 || (n2.data = d2);
    else {
      if (o2 = o2 && f.slice.call(n2.childNodes), v2 = (p2 = u2.props || r).dangerouslySetInnerHTML, h = d2.dangerouslySetInnerHTML, !c2) {
        if (o2 != null)
          for (p2 = {}, y2 = 0; y2 < n2.attributes.length; y2++)
            p2[n2.attributes[y2].name] = n2.attributes[y2].value;
        (h || v2) && (h && (v2 && h.__html == v2.__html || h.__html === n2.innerHTML) || (n2.innerHTML = h && h.__html || ""));
      }
      if (A(n2, d2, p2, t2, c2), h)
        l2.__k = [];
      else if (k2 = l2.props.children, m(n2, Array.isArray(k2) ? k2 : [k2], l2, u2, i2, t2 && _2 !== "foreignObject", o2, e2, n2.firstChild, c2), o2 != null)
        for (k2 = o2.length; k2--; )
          o2[k2] != null && s(o2[k2]);
      c2 || ("value" in d2 && (k2 = d2.value) !== void 0 && (k2 !== n2.value || _2 === "progress" && !k2) && C(n2, "value", k2, p2.value, false), "checked" in d2 && (k2 = d2.checked) !== void 0 && k2 !== n2.checked && C(n2, "checked", k2, p2.checked, false));
    }
    return n2;
  }
  function z(l2, u2, i2) {
    try {
      typeof l2 == "function" ? l2(u2) : l2.current = u2;
    } catch (l3) {
      n.__e(l3, i2);
    }
  }
  function L(l2, u2, i2) {
    var t2, o2, r2;
    if (n.unmount && n.unmount(l2), (t2 = l2.ref) && (t2.current && t2.current !== l2.__e || z(t2, null, u2)), i2 || typeof l2.type == "function" || (i2 = (o2 = l2.__e) != null), l2.__e = l2.__d = void 0, (t2 = l2.__c) != null) {
      if (t2.componentWillUnmount)
        try {
          t2.componentWillUnmount();
        } catch (l3) {
          n.__e(l3, u2);
        }
      t2.base = t2.__P = null;
    }
    if (t2 = l2.__k)
      for (r2 = 0; r2 < t2.length; r2++)
        t2[r2] && L(t2[r2], u2, i2);
    o2 != null && s(o2);
  }
  function M(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function N(l2, u2, i2) {
    var t2, o2, e2;
    n.__ && n.__(l2, u2), o2 = (t2 = typeof i2 == "function") ? null : i2 && i2.__k || u2.__k, e2 = [], I(u2, l2 = (!t2 && i2 || u2).__k = a(y, null, [l2]), o2 || r, r, u2.ownerSVGElement !== void 0, !t2 && i2 ? [i2] : o2 ? null : u2.firstChild ? f.slice.call(u2.childNodes) : null, e2, !t2 && i2 ? i2 : o2 ? o2.__e : u2.firstChild, t2), T(e2, l2);
  }
  n = {__e: function(n2, l2) {
    for (var u2, i2, t2; l2 = l2.__; )
      if ((u2 = l2.__c) && !u2.__)
        try {
          if ((i2 = u2.constructor) && i2.getDerivedStateFromError != null && (u2.setState(i2.getDerivedStateFromError(n2)), t2 = u2.__d), u2.componentDidCatch != null && (u2.componentDidCatch(n2), t2 = u2.__d), t2)
            return u2.__E = u2;
        } catch (l3) {
          n2 = l3;
        }
    throw n2;
  }, __v: 0}, l = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, p.prototype.setState = function(n2, l2) {
    var u2;
    u2 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), typeof n2 == "function" && (n2 = n2(c({}, u2), this.props)), n2 && c(u2, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), k(this));
  }, p.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), k(this));
  }, p.prototype.render = y, u = [], i = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

  // src/kanvas.tsx
  var import_konva = __toModule(require_lib());
  var Rect = import_konva.default.Rect;
  var Image = import_konva.default.Image;
  var Text = import_konva.default.Text;
  var LAYOUT_WIDTH = 325;
  var LAYOUT_HEIGHT = 240;
  var Kanvas = class extends p {
    constructor() {
      super(...arguments);
      this.stage = null;
      this.layer = null;
      this.bg = null;
      this.cases = null;
    }
    componentDidMount() {
      const self2 = this;
      this.stage = new import_konva.default.Stage({
        container: "canvas",
        width: 2 * LAYOUT_WIDTH,
        height: 0
      });
      this.layer = new import_konva.default.Layer();
      this.stage.add(this.layer);
      this.bg = new import_konva.default.Group();
      this.layer.add(this.bg);
      this.cases = new import_konva.default.Group();
      this.layer.add(this.cases);
      for (let i2 = 0; i2 < 2; i2++) {
        self2.addLine();
      }
      let simpleText = new Text({
        x: this.stage.width() / 2,
        y: 15,
        text: "What are you doed ?",
        fontSize: 30,
        fontFamily: "Calibri",
        fill: "#e33",
        draggable: true
      });
      self2.addBoxToLayer(simpleText);
      Image.fromURL("./assets/cereal_newspaper/BeerGuy.png", (box) => {
        box.setAttrs({
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          draggable: true
        });
        self2.addBoxToLayer(box);
        self2.layer?.batchDraw();
      });
      this.layer.draw();
    }
    addBoxToLayer(box) {
      box.on("mouseover", () => {
        document.body.style.cursor = "pointer";
        box.setAttrs({
          stroke: "#000",
          strokeWidth: 1
        });
        this.layer?.batchDraw();
      });
      box.on("mouseout", () => {
        document.body.style.cursor = "default";
        box.setAttrs({
          stroke: void 0,
          strokeWidth: 0
        });
        this.layer?.batchDraw();
      });
      this.cases?.add(box);
    }
    addLine() {
      const y2 = Math.trunc(this.stage?.height() ?? 0);
      for (let i2 = 0; i2 < 2; i2++) {
        let box = new Rect({
          x: i2 * LAYOUT_WIDTH,
          y: y2,
          width: LAYOUT_WIDTH,
          height: LAYOUT_HEIGHT,
          fill: "#fff",
          stroke: "#000",
          strokeWidth: 1,
          draggable: false
        });
        this.bg?.add(box);
      }
      this.setHeight((this.stage?.height() ?? 0) + LAYOUT_HEIGHT);
    }
    removeLine() {
      let old = this.stage?.height() ?? 0;
      if (old > LAYOUT_HEIGHT) {
        this.setHeight((this.stage?.height() ?? 0) - LAYOUT_HEIGHT);
      }
    }
    setHeight(height) {
      this.stage?.setSize({
        width: this.stage?.width(),
        height
      });
      this.layer?.draw();
    }
    render() {
      return /* @__PURE__ */ a("div", {
        className: "canvas"
      }, /* @__PURE__ */ a("div", {
        id: "canvas"
      }), /* @__PURE__ */ a("div", null, /* @__PURE__ */ a("p", null, /* @__PURE__ */ a("button", {
        onClick: () => this.addLine()
      }, "add+")), /* @__PURE__ */ a("hr", null), /* @__PURE__ */ a("p", null, /* @__PURE__ */ a("button", {
        onClick: () => this.removeLine()
      }, "del-"))));
    }
  };

  // src/app.tsx
  var App = () => {
    return /* @__PURE__ */ a("div", {
      className: "app"
    }, /* @__PURE__ */ a(Kanvas, null));
  };

  // src/index.tsx
  var start = async () => {
    N(/* @__PURE__ */ a(App, null), document.body);
  };
  document.addEventListener("readystatechange", () => {
    const elem = window.addEventListener ? window : document;
    elem.addEventListener("load", start, false);
  });
})();
