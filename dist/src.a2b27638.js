// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/index.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/barrage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Barrage =
/*#__PURE__*/
function () {
  function Barrage(_ref) {
    var container = _ref.container,
        content = _ref.content;

    _classCallCheck(this, Barrage);

    this.container = container;
    this.content = content || "default text";
    this.color = null;
    this.backgroundColor = null;
    this.viewPortLength = null;
    this.time = 5000;
    this.heightOffset = null;
    this.timeOut = null;
    this.barrageStyle = {
      "line-height": "2",
      "user-select": "none",
      position: "absolute",
      left: "".concat(container.offsetWidth, "px"),
      top: "20px",
      transform: "0",
      transition: "transform 5s linear",
      "white-space": "pre",
      "will-change": "transform",
      "font-size": "25px;",
      color: "#ffffff",
      "text-shadow": "rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px"
    };
    this.barrage = this.genBarrage();
  }

  _createClass(Barrage, [{
    key: "init",
    value: function init() {}
  }, {
    key: "getStyleString",
    value: function getStyleString() {
      var _this = this;

      return Object.keys(this.barrageStyle).map(function (key) {
        return "".concat(key, ":").concat(_this.barrageStyle[key]);
      }).join(";");
    }
  }, {
    key: "genBarrage",
    value: function genBarrage() {
      var div = document.createElement("div");
      div.textContent = this.content;
      div.setAttribute("style", this.getStyleString());
      return div;
    }
  }, {
    key: "init",
    value: function init(_ref2) {
      var _ref2$top = _ref2.top,
          top = _ref2$top === void 0 ? 0 : _ref2$top,
          _ref2$timeOut = _ref2.timeOut,
          timeOut = _ref2$timeOut === void 0 ? 0 : _ref2$timeOut;
      this.timeOut = timeOut;
      this.barrage.style.top = "".concat(top, "px");
      this.container.insertBefore(this.barrage, this.container.children[0]);
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      setTimeout(function () {
        _this2.barrage.style.transform = "translateX(-".concat(_this2.container.offsetWidth + _this2.barrage.offsetWidth + 10, "px)");
      }, this.timeOut);
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return Barrage;
}();

exports.default = Barrage;
},{}],"src/barrageController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _barrage = _interopRequireDefault(require("./barrage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var container = document.getElementById("barrages");
var lineHeight = 50;

var barrageController =
/*#__PURE__*/
function () {
  function barrageController() {
    _classCallCheck(this, barrageController);

    this.data = null;
    this.verticalCount = Math.floor(container.clientHeight / lineHeight);
    this.count = 0;
  }

  _createClass(barrageController, [{
    key: "initBarrages",
    value: function initBarrages(data) {
      this.data = data;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.data.forEach(function (d, index) {
        var barrage = new _barrage.default({
          container: container,
          content: d.content
        });
        barrage.init({
          top: lineHeight * (index % _this.verticalCount),
          timeOut: 2000 * Math.floor(index / _this.verticalCount)
        });
        barrage.start();
      });
    }
  }]);

  return barrageController;
}();

exports.default = barrageController;
},{"./barrage":"src/barrage.js"}],"src/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  content: "试一试"
}, {
  content: "热刺是冠军"
}, {
  content: "嗯"
}, {
  content: "我觉得不行"
}, {
  content: "你好"
}, {
  content: "你是xxx请来的xxxx吗"
}, {
  content: "好好好"
}, {
  content: "2333333333333333333333333333"
}, {
  content: "6666666666666666"
}, {
  content: "666666666666"
}, {
  content: "791179117911"
}, {
  content: "龙虾"
}, {
  content: "wonim"
}, {
  content: "sjnb"
}, {
  content: "绿色"
}, {
  content: "舒服了"
}, {
  content: "试一试"
}, {
  content: "热刺是冠军"
}, {
  content: "嗯"
}, {
  content: "我觉得不行"
}, {
  content: "你好"
}, {
  content: "你是xxx请来的xxxx吗"
}, {
  content: "好好好"
}, {
  content: "2333333333333333333333333333"
}, {
  content: "6666666666666666"
}, {
  content: "666666666666"
}, {
  content: "791179117911"
}, {
  content: "龙虾"
}, {
  content: "wonim"
}, {
  content: "sjnb"
}, {
  content: "绿色"
}, {
  content: "舒服了"
}, {
  content: "试一试"
}, {
  content: "热刺是冠军"
}, {
  content: "嗯"
}, {
  content: "我觉得不行"
}, {
  content: "你好"
}, {
  content: "你是xxx请来的xxxx吗"
}, {
  content: "好好好"
}, {
  content: "2333333333333333333333333333"
}, {
  content: "6666666666666666"
}, {
  content: "666666666666"
}, {
  content: "791179117911"
}, {
  content: "龙虾"
}, {
  content: "wonim"
}, {
  content: "sjnb"
}, {
  content: "绿色"
}, {
  content: "舒服了"
}, {
  content: "试一试"
}, {
  content: "热刺是冠军"
}, {
  content: "嗯"
}, {
  content: "我觉得不行"
}, {
  content: "你好"
}, {
  content: "你是xxx请来的xxxx吗"
}, {
  content: "好好好"
}, {
  content: "2333333333333333333333333333"
}, {
  content: "6666666666666666"
}, {
  content: "666666666666"
}, {
  content: "791179117911"
}, {
  content: "龙虾"
}, {
  content: "wonim"
}, {
  content: "sjnb"
}, {
  content: "绿色"
}, {
  content: "舒服了"
}, {
  content: "试一试"
}, {
  content: "热刺是冠军"
}, {
  content: "嗯"
}, {
  content: "我觉得不行"
}, {
  content: "你好"
}, {
  content: "你是xxx请来的xxxx吗"
}, {
  content: "好好好"
}, {
  content: "2333333333333333333333333333"
}, {
  content: "6666666666666666"
}, {
  content: "666666666666"
}, {
  content: "791179117911"
}, {
  content: "龙虾"
}, {
  content: "wonim"
}, {
  content: "sjnb"
}, {
  content: "绿色"
}, {
  content: "舒服了"
}];
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./index.less");

var _barrage = _interopRequireDefault(require("./barrage"));

var _barrageController = _interopRequireDefault(require("./barrageController"));

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementById("barrages");
var controller = new _barrageController.default();
controller.initBarrages(_data.default);
controller.start();
document.getElementById("button").addEventListener("click", function () {
  var content = document.getElementById("input").value;
  var barrage = new _barrage.default({
    container: container,
    content: content
  });
  barrage.init({});
  barrage.start();
});
},{"./index.less":"src/index.less","./barrage":"src/barrage.js","./barrageController":"src/barrageController.js","./data":"src/data.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51308" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map