// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fH7gS":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "fe27fe52f5c48570";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8ZNvh":[function(require,module,exports) {
var _db = require("./js/db");
var _store = require("./js/store");
var _view = require("./js/view");
var _subscribe = require("./subscribe");
var _notifier = require("./js/utils/notifier");
(0, _subscribe.subscribeToStore)();
// Database
(0, _db.initDB)().then(({ tags, items, periods })=>{
    const periodsList = periods;
    if (periods.length === 0) {
        const basePeriod = {
            id: 0,
            createdAt: null
        };
        periodsList.push(basePeriod);
        (0, _db.addPeriodToDb)(basePeriod);
    }
    (0, _store.initStore)({
        tags,
        items,
        periods: periodsList
    });
});
// Init
(0, _view.initNewItemForm)({
    onSubmit: (formData)=>{
        const { text, price, tag, subitems } = formData;
        const createdAt = +new Date();
        const newItem = {
            id: (0, _store.getNextId)((0, _store.storeFields).items),
            text,
            price,
            tag,
            createdAt,
            subitems: subitems.map((subitem)=>{
                return {
                    id: (0, _store.getNextId)((0, _store.storeFields).items),
                    text: subitem.text,
                    price: subitem.price,
                    tag: subitem.tag,
                    createdAt
                };
            })
        };
        (0, _store.addItem)(newItem);
    }
});
(0, _view.initNewTagForm)({
    onSubmit: (formData)=>{
        const { name } = formData;
        const newTag = {
            id: (0, _store.getNextId)((0, _store.storeFields).tags),
            name,
            createdAt: +new Date()
        };
        (0, _store.addTag)(newTag);
    }
});
(0, _view.initItemsList)({
    onRemove: (itemId)=>{
        const item = (0, _store.selectItemById)(itemId);
        (0, _store.removeItem)(item);
    }
});
(0, _view.initTagsList)({
    onRemove: (tagId)=>{
        const tag = (0, _store.selectTagById)(tagId);
        const tagItems = (0, _store.selectItemsByTag)(tagId);
        if (tagItems.length) {
            (0, _notifier.notifyError)("Тег нельзя удалить");
            return;
        }
        (0, _store.removeTag)(tag);
    }
});
(0, _view.initPeriodsList)({
    onStart: ()=>{
        const newPeriod = {
            id: (0, _store.getNextId)((0, _store.storeFields).periods),
            createdAt: +new Date()
        };
        (0, _store.addPeriod)(newPeriod);
    },
    onRemove: (periodId)=>{
        const period = (0, _store.selectPeriodById)(periodId);
        (0, _store.removePeriod)(period);
    },
    onSelect: (periodId)=>{
        const period = (0, _store.selectPeriodById)(periodId);
        (0, _store.setActivePeriod)(period);
    }
});

},{"./js/db":"aF8BE","./js/store":"2rPL6","./js/view":"3gZq0","./subscribe":"lvYRj","./js/utils/notifier":"7aVBF"}],"aF8BE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initDB", ()=>(0, _init.initDB));
parcelHelpers.export(exports, "addItemToDb", ()=>(0, _items.addItemToDb));
parcelHelpers.export(exports, "removeItemFromDb", ()=>(0, _items.removeItemFromDb));
parcelHelpers.export(exports, "addTagToDb", ()=>(0, _tags.addTagToDb));
parcelHelpers.export(exports, "removeTagFromDb", ()=>(0, _tags.removeTagFromDb));
parcelHelpers.export(exports, "addPeriodToDb", ()=>(0, _periods.addPeriodToDb));
parcelHelpers.export(exports, "removePeriodFromDb", ()=>(0, _periods.removePeriodFromDb));
var _init = require("./init");
var _items = require("./items");
var _tags = require("./tags");
var _periods = require("./periods");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./init":"jSoDn","./items":"g7UNv","./tags":"4asb7","./periods":"ch64E"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jSoDn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initDB", ()=>initDB);
var _notifier = require("../utils/notifier");
var _constants = require("./constants");
var _db = require("./db");
var _utils = require("./utils");
function getItems() {
    return new Promise((resolve)=>{
        const items = (0, _utils.getStore)((0, _constants.ITEMS_STORE_NAME));
        const request = items.getAll();
        request.onsuccess = function() {
            const result = request.result;
            resolve(result);
        };
    });
}
async function getTags() {
    return new Promise((resolve)=>{
        const tags = (0, _utils.getStore)((0, _constants.TAGS_STORE_NAME));
        const request = tags.getAll();
        request.onsuccess = function() {
            const result = request.result;
            resolve(result);
        };
    });
}
async function getPeriods() {
    return new Promise((resolve)=>{
        const periods = (0, _utils.getStore)((0, _constants.PERIODS_STORE_NAME));
        const request = periods.getAll();
        request.onsuccess = function() {
            const result = request.result;
            resolve(result);
        };
    });
}
async function initDB() {
    return new Promise((resolve)=>{
        const dbRequest = indexedDB.open((0, _constants.DB_NAME), (0, _constants.DB_VERSION));
        dbRequest.onupgradeneeded = function() {
            let db = dbRequest.result;
            if (!db.objectStoreNames.contains((0, _constants.ITEMS_STORE_NAME))) db.createObjectStore((0, _constants.ITEMS_STORE_NAME), {
                keyPath: "id"
            });
            if (!db.objectStoreNames.contains((0, _constants.TAGS_STORE_NAME))) db.createObjectStore((0, _constants.TAGS_STORE_NAME), {
                keyPath: "id"
            });
            if (!db.objectStoreNames.contains((0, _constants.PERIODS_STORE_NAME))) db.createObjectStore((0, _constants.PERIODS_STORE_NAME), {
                keyPath: "id"
            });
        };
        dbRequest.onerror = function() {
            (0, _notifier.notifyError)("DB ERROR", dbRequest.error);
        };
        dbRequest.onsuccess = function() {
            Promise.all([
                getTags(),
                getItems(),
                getPeriods()
            ]).then(([tags, items, periods])=>{
                resolve({
                    tags,
                    items,
                    periods
                });
            });
        };
        (0, _db.setDb)(dbRequest);
    });
}

},{"../utils/notifier":"7aVBF","./constants":"b0ukR","./db":"aFICN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./utils":"7hJH5"}],"7aVBF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "notify", ()=>notify);
parcelHelpers.export(exports, "notifyError", ()=>notifyError);
function notify(message, data) {
    alert(message);
    console.info(message, data);
}
function notifyError(message, data) {
    alert(message);
    console.error(message, data);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b0ukR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DB_NAME", ()=>DB_NAME);
parcelHelpers.export(exports, "DB_VERSION", ()=>DB_VERSION);
parcelHelpers.export(exports, "ITEMS_STORE_NAME", ()=>ITEMS_STORE_NAME);
parcelHelpers.export(exports, "TAGS_STORE_NAME", ()=>TAGS_STORE_NAME);
parcelHelpers.export(exports, "PERIODS_STORE_NAME", ()=>PERIODS_STORE_NAME);
const DB_NAME = "wallet";
const DB_VERSION = 4;
const ITEMS_STORE_NAME = "items";
const TAGS_STORE_NAME = "tags";
const PERIODS_STORE_NAME = "periods";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aFICN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setDb", ()=>setDb);
parcelHelpers.export(exports, "getDb", ()=>getDb);
let dbRequest;
function setDb(db) {
    dbRequest = db;
}
function getDb() {
    return dbRequest.result;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7hJH5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getStore", ()=>getStore);
var _db = require("./db");
function getStore(storeName, toWrite) {
    let db = (0, _db.getDb)();
    let transaction = db.transaction(storeName, toWrite ? "readwrite" : "readonly");
    let store = transaction.objectStore(storeName);
    return store;
}

},{"./db":"aFICN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g7UNv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addItemToDb", ()=>addItemToDb);
parcelHelpers.export(exports, "removeItemFromDb", ()=>removeItemFromDb);
var _utils = require("./utils");
var _notifier = require("../utils/notifier");
var _constants = require("./constants");
function addItemToDb(item) {
    const items = (0, _utils.getStore)((0, _constants.ITEMS_STORE_NAME), true);
    let request = items.add(item);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно сохранена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось сохранить запись", request.error);
    };
}
function removeItemFromDb(item) {
    let items = (0, _utils.getStore)((0, _constants.ITEMS_STORE_NAME), true);
    let request = items.delete(item.id);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно удалена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось удалить запись", request.error);
    };
}

},{"../utils/notifier":"7aVBF","./constants":"b0ukR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./utils":"7hJH5"}],"4asb7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addTagToDb", ()=>addTagToDb);
parcelHelpers.export(exports, "removeTagFromDb", ()=>removeTagFromDb);
var _notifier = require("../utils/notifier");
var _constants = require("./constants");
var _utils = require("./utils");
function addTagToDb(tag) {
    let tags = (0, _utils.getStore)((0, _constants.TAGS_STORE_NAME), true);
    let request = tags.add(tag);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно сохранена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось сохранить запись", request.error);
    };
}
function removeTagFromDb(tag) {
    let tags = (0, _utils.getStore)((0, _constants.TAGS_STORE_NAME), true);
    let request = tags.delete(tag.id);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно удалена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось удалить запись", request.error);
    };
}

},{"../utils/notifier":"7aVBF","./constants":"b0ukR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./utils":"7hJH5"}],"ch64E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addPeriodToDb", ()=>addPeriodToDb);
parcelHelpers.export(exports, "removePeriodFromDb", ()=>removePeriodFromDb);
var _utils = require("./utils");
var _notifier = require("../utils/notifier");
var _constants = require("./constants");
function addPeriodToDb(period) {
    const periods = (0, _utils.getStore)((0, _constants.PERIODS_STORE_NAME), true);
    let request = periods.add(period);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно сохранена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось сохранить запись", request.error);
    };
}
function removePeriodFromDb(period) {
    let periods = (0, _utils.getStore)((0, _constants.PERIODS_STORE_NAME), true);
    let request = periods.delete(period.id);
    request.onsuccess = function() {
        (0, _notifier.notify)("Запись успешно удалена");
    };
    request.onerror = function() {
        (0, _notifier.notifyError)("Не удалось удалить запись", request.error);
    };
}

},{"../utils/notifier":"7aVBF","./constants":"b0ukR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./utils":"7hJH5"}],"2rPL6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "subscribe", ()=>(0, _emitter.subscribe));
parcelHelpers.export(exports, "events", ()=>(0, _events.events));
parcelHelpers.export(exports, "storeFields", ()=>(0, _constants.storeFields));
parcelHelpers.export(exports, "getNextId", ()=>(0, _ids.getNextId));
parcelHelpers.export(exports, "selectItems", ()=>(0, _items.selectItems));
parcelHelpers.export(exports, "selectItemById", ()=>(0, _items.selectItemById));
parcelHelpers.export(exports, "selectFlatItems", ()=>(0, _items.selectFlatItems));
parcelHelpers.export(exports, "selectItemsByTag", ()=>(0, _items.selectItemsByTag));
parcelHelpers.export(exports, "selectActiveItems", ()=>(0, _items.selectActiveItems));
parcelHelpers.export(exports, "selectPeriods", ()=>(0, _periods.selectPeriods));
parcelHelpers.export(exports, "selectPeriodById", ()=>(0, _periods.selectPeriodById));
parcelHelpers.export(exports, "selectActivePeriod", ()=>(0, _periods.selectActivePeriod));
parcelHelpers.export(exports, "selectTags", ()=>(0, _tags.selectTags));
parcelHelpers.export(exports, "selectTagById", ()=>(0, _tags.selectTagById));
parcelHelpers.export(exports, "selectWeightedTags", ()=>(0, _tags.selectWeightedTags));
parcelHelpers.export(exports, "initStore", ()=>(0, _state.initStore));
parcelHelpers.export(exports, "addItem", ()=>(0, _state.addItem));
parcelHelpers.export(exports, "addTag", ()=>(0, _state.addTag));
parcelHelpers.export(exports, "addPeriod", ()=>(0, _state.addPeriod));
parcelHelpers.export(exports, "removeItem", ()=>(0, _state.removeItem));
parcelHelpers.export(exports, "removeTag", ()=>(0, _state.removeTag));
parcelHelpers.export(exports, "removePeriod", ()=>(0, _state.removePeriod));
parcelHelpers.export(exports, "setActivePeriod", ()=>(0, _state.setActivePeriod));
var _emitter = require("./emitter");
var _events = require("./events");
var _constants = require("./constants");
var _ids = require("./ids");
var _items = require("./items");
var _periods = require("./periods");
var _tags = require("./tags");
var _state = require("./state");

},{"./emitter":"443qx","./events":"3nR5h","./constants":"kyqGh","./ids":"3p0Iy","./items":"ckKP9","./periods":"5eesY","./tags":"3ze5P","./state":"ekZMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"443qx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "subscribe", ()=>subscribe);
parcelHelpers.export(exports, "emit", ()=>emit);
const callbacks = {};
function subscribe(eventName, eventCb) {
    if (!(eventName in callbacks)) callbacks[eventName] = [];
    callbacks[eventName].push(eventCb);
}
function emit(eventName, eventData) {
    const eventCallbacks = callbacks[eventName];
    if (!eventCallbacks) return;
    eventCallbacks.forEach((cb)=>cb(eventData));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3nR5h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "events", ()=>events);
const events = {
    inited: "store/inited",
    addItem: "item/add",
    removeItem: "item/remove",
    addTag: "tag/add",
    removeTag: "tag/remove",
    addPeriod: "period/add",
    removePeriod: "period/remove",
    setActivePeriod: "activePeriod/set"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kyqGh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storeFields", ()=>storeFields);
const storeFields = {
    items: "items",
    periods: "periods",
    tags: "tags"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3p0Iy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getNextId", ()=>getNextId);
parcelHelpers.export(exports, "setLastId", ()=>setLastId);
const ids = {};
function getNextId(fieldName) {
    if (!(fieldName in ids)) ids[fieldName] = 0;
    return ++ids[fieldName];
}
function setLastId(fieldName, id) {
    ids[fieldName] = id;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ckKP9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "selectItems", ()=>selectItems);
parcelHelpers.export(exports, "selectItemById", ()=>selectItemById);
parcelHelpers.export(exports, "selectFlatItems", ()=>selectFlatItems);
parcelHelpers.export(exports, "selectItemsByTag", ()=>selectItemsByTag);
parcelHelpers.export(exports, "selectActiveItems", ()=>selectActiveItems);
var _state = require("./state");
function selectItems() {
    return [
        ...(0, _state.getState)().items
    ];
}
function selectItemById(itemId) {
    const items = selectItems();
    return items.find((i)=>i.id === itemId);
}
function selectFlatItems() {
    const items = [];
    (0, _state.getState)().items.forEach((item)=>{
        items.push(item);
        items.push(...item.subitems);
    });
    return items;
}
function selectItemsByTag(tagId) {
    const items = selectFlatItems();
    return items.filter((i)=>i.tag === tagId);
}
function selectActiveItems() {
    const state = (0, _state.getState)();
    const period = state.activePeriod;
    if (!period) return [
        ...state.items
    ];
    const periodIndex = state.periods.findIndex((p)=>p.id === period.id);
    const nextPeriod = state.periods[periodIndex + 1];
    return state.items.filter((item)=>{
        if (period.createdAt && item.createdAt < period.createdAt) return false;
        if (nextPeriod && item.createdAt >= nextPeriod.createdAt) return false;
        return true;
    });
}

},{"./state":"ekZMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ekZMZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getState", ()=>getState);
parcelHelpers.export(exports, "initStore", ()=>initStore);
parcelHelpers.export(exports, "addItem", ()=>addItem);
parcelHelpers.export(exports, "addTag", ()=>addTag);
parcelHelpers.export(exports, "addPeriod", ()=>addPeriod);
parcelHelpers.export(exports, "removeItem", ()=>removeItem);
parcelHelpers.export(exports, "removeTag", ()=>removeTag);
parcelHelpers.export(exports, "removePeriod", ()=>removePeriod);
parcelHelpers.export(exports, "setActivePeriod", ()=>setActivePeriod);
var _constants = require("./constants");
var _emitter = require("./emitter");
var _events = require("./events");
var _ids = require("./ids");
const state = {
    items: [],
    tags: [],
    periods: [],
    activePeriod: null
};
function getState() {
    return {
        ...state
    };
}
function initStore({ tags: tagsList, items: itemsList, periods: periodsList }) {
    if (tagsList.length > 0) {
        (0, _ids.setLastId)((0, _constants.storeFields).tags, tagsList[tagsList.length - 1].id);
        state.tags = tagsList;
    }
    if (itemsList.length > 0) {
        (0, _ids.setLastId)((0, _constants.storeFields).items, itemsList[itemsList.length - 1].id);
        state.items = itemsList;
    }
    if (periodsList.length > 0) {
        const lastPeriod = periodsList[periodsList.length - 1];
        (0, _ids.setLastId)((0, _constants.storeFields).periods, lastPeriod.id);
        state.periods = periodsList;
        state.activePeriod = lastPeriod;
    }
    (0, _emitter.emit)((0, _events.events).inited, state);
}
function addItem(item) {
    state.items.push(item);
    (0, _emitter.emit)((0, _events.events).addItem, item);
}
function addTag(tag) {
    state.tags.push(tag);
    (0, _emitter.emit)((0, _events.events).addTag, tag);
}
function addPeriod(period) {
    state.periods.push(period);
    (0, _emitter.emit)((0, _events.events).addPeriod, period);
}
function removeItem(item) {
    state.items = state.items.filter((i)=>i.id !== item.id);
    (0, _emitter.emit)((0, _events.events).removeItem, item);
}
function removeTag(tag) {
    state.tags = state.tags.filter((t)=>t.id !== tag.id);
    (0, _emitter.emit)((0, _events.events).removeTag, tag);
}
function removePeriod(period) {
    state.periods = state.items.filter((p)=>p.id !== period.id);
    (0, _emitter.emit)((0, _events.events).removePeriod, period);
}
function setActivePeriod(period) {
    state.activePeriod = period;
    (0, _emitter.emit)((0, _events.events).setActivePeriod, period);
}

},{"./constants":"kyqGh","./emitter":"443qx","./events":"3nR5h","./ids":"3p0Iy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5eesY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "selectPeriods", ()=>selectPeriods);
parcelHelpers.export(exports, "selectPeriodById", ()=>selectPeriodById);
parcelHelpers.export(exports, "selectActivePeriod", ()=>selectActivePeriod);
var _state = require("./state");
function selectPeriods() {
    return (0, _state.getState)().periods;
}
function selectPeriodById(periodId) {
    const periods = selectPeriods();
    return periods.find((p)=>p.id === periodId);
}
function selectActivePeriod() {
    return (0, _state.getState)().activePeriod;
}

},{"./state":"ekZMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3ze5P":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "selectTags", ()=>selectTags);
parcelHelpers.export(exports, "selectTagById", ()=>selectTagById);
parcelHelpers.export(exports, "selectWeightedTags", ()=>selectWeightedTags);
var _items = require("./items");
var _state = require("./state");
function selectTags() {
    return [
        ...(0, _state.getState)().tags
    ];
}
function selectTagById(tagId) {
    const tags = selectTags();
    return tags.find((t)=>t.id === tagId);
}
function selectTagsWeight() {
    const state = (0, _state.getState)();
    const items = (0, _items.selectFlatItems)();
    const weight = {};
    state.tags.forEach((tag)=>{
        weight[tag.id] = 0;
    });
    items.forEach((item)=>{
        weight[item.tag] += 1;
    });
    return weight;
}
function selectWeightedTags() {
    const tags = selectTags();
    const weight = selectTagsWeight();
    tags.sort((a, b)=>weight[b.id] - weight[a.id]);
    return tags;
}

},{"./state":"ekZMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./items":"ckKP9"}],"3gZq0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateTagsSelect", ()=>(0, _itemForm.updateTagsSelect));
parcelHelpers.export(exports, "closeNewItemForm", ()=>(0, _itemForm.closeNewItemForm));
parcelHelpers.export(exports, "initNewItemForm", ()=>(0, _itemForm.initNewItemForm));
parcelHelpers.export(exports, "closeNewTagForm", ()=>(0, _tagForm.closeNewTagForm));
parcelHelpers.export(exports, "initNewTagForm", ()=>(0, _tagForm.initNewTagForm));
parcelHelpers.export(exports, "renderItemsList", ()=>(0, _items.renderItemsList));
parcelHelpers.export(exports, "addItemToList", ()=>(0, _items.addItemToList));
parcelHelpers.export(exports, "removeItemFromList", ()=>(0, _items.removeItemFromList));
parcelHelpers.export(exports, "initItemsList", ()=>(0, _items.initItemsList));
parcelHelpers.export(exports, "renderTagsList", ()=>(0, _tags.renderTagsList));
parcelHelpers.export(exports, "addTagToList", ()=>(0, _tags.addTagToList));
parcelHelpers.export(exports, "removeTagFromList", ()=>(0, _tags.removeTagFromList));
parcelHelpers.export(exports, "initTagsList", ()=>(0, _tags.initTagsList));
parcelHelpers.export(exports, "renderPeriodsList", ()=>(0, _periods.renderPeriodsList));
parcelHelpers.export(exports, "addPeriodToList", ()=>(0, _periods.addPeriodToList));
parcelHelpers.export(exports, "removePeriodFromList", ()=>(0, _periods.removePeriodFromList));
parcelHelpers.export(exports, "initPeriodsList", ()=>(0, _periods.initPeriodsList));
parcelHelpers.export(exports, "highlightActivePeriod", ()=>(0, _periods.highlightActivePeriod));
var _itemForm = require("./itemForm");
var _tagForm = require("./tagForm");
var _items = require("./items");
var _tags = require("./tags");
var _periods = require("./periods");

},{"./itemForm":"ls1cb","./tagForm":"a9hVv","./items":"hxYzp","./tags":"74Zyy","./periods":"iKb5k","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ls1cb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateTagsSelect", ()=>updateTagsSelect);
parcelHelpers.export(exports, "closeNewItemForm", ()=>closeNewItemForm);
parcelHelpers.export(exports, "initNewItemForm", ()=>initNewItemForm);
var _store = require("../store");
var _elements = require("./elements");
const selectors = {
    subitem: ".subitem-form"
};
function renderSubitemForm() {
    const $clone = (0, _elements.getTemplate)((0, _elements.IDS).itemForm.subitemTemplate);
    const $subitem = $clone.querySelector(selectors.subitem);
    const $subitemSelect = $subitem.querySelector("select");
    const tags = (0, _store.selectWeightedTags)();
    tags.forEach((tag)=>{
        const $tag = renderTagOption(tag);
        $subitemSelect.appendChild($tag);
    });
    return $subitem;
}
function renderTagOption(tag) {
    const $option = document.createElement("option");
    $option.textContent = tag.name;
    $option.value = tag.id;
    return $option;
}
function updateTagsSelect(tags) {
    const $tagsSelect = (0, _elements.getElement)((0, _elements.IDS).itemForm.tagsSelect);
    $tagsSelect.innerHTML = "";
    tags.forEach((tag)=>{
        const $option = renderTagOption(tag);
        $tagsSelect.appendChild($option);
    });
}
function resetNewItemForm() {
    const $newItemForm = (0, _elements.getElement)((0, _elements.IDS).itemForm.form);
    const $newItemFormSubitemsList = (0, _elements.getElement)((0, _elements.IDS).itemForm.subitemsList);
    $newItemForm.reset();
    $newItemFormSubitemsList.innerHTML = "";
}
function openNewItemForm() {
    const $newItemDialog = (0, _elements.getElement)((0, _elements.IDS).itemForm.dialog);
    $newItemDialog.showModal();
}
function closeNewItemForm() {
    const $newItemDialog = (0, _elements.getElement)((0, _elements.IDS).itemForm.dialog);
    $newItemDialog.close();
    resetNewItemForm();
}
function getNewItemFormData() {
    const $newItemForm = (0, _elements.getElement)((0, _elements.IDS).itemForm.form);
    const fd = new FormData($newItemForm);
    const subitemTexts = fd.getAll("subitems[text][]");
    const subitemPrices = fd.getAll("subitems[price][]");
    const subitemTags = fd.getAll("subitems[tag][]");
    return {
        text: fd.get("text"),
        price: fd.get("price"),
        tag: Number(fd.get("tag")),
        subitems: subitemTexts.map((text, i)=>{
            return {
                text,
                price: subitemPrices[i],
                tag: Number(subitemTags[i])
            };
        })
    };
}
function initNewItemForm(config) {
    const { onSubmit } = config;
    const $newItemForm = (0, _elements.getElement)((0, _elements.IDS).itemForm.form);
    const $addItemButton = (0, _elements.getElement)((0, _elements.IDS).itemForm.addButton);
    const $closeDialogButton = (0, _elements.getElement)((0, _elements.IDS).itemForm.closeButton);
    const $addSubitemButton = (0, _elements.getElement)((0, _elements.IDS).itemForm.addSubitemBtn);
    const $subitemsList = (0, _elements.getElement)((0, _elements.IDS).itemForm.subitemsList);
    $newItemForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        onSubmit(getNewItemFormData());
    });
    $addItemButton.addEventListener("click", ()=>{
        openNewItemForm();
    });
    $closeDialogButton.addEventListener("click", ()=>{
        closeNewItemForm();
    });
    $addSubitemButton.addEventListener("click", ()=>{
        const $subitemForm = renderSubitemForm();
        $subitemsList.appendChild($subitemForm);
    });
}

},{"./elements":"8Ekdt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../store":"2rPL6"}],"8Ekdt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IDS", ()=>IDS);
parcelHelpers.export(exports, "getElement", ()=>getElement);
parcelHelpers.export(exports, "getTemplate", ()=>getTemplate);
const IDS = {
    items: {
        list: "items",
        template: "item-tmpl",
        subitemTemplate: "subitem-tmpl"
    },
    itemForm: {
        dialog: "new-item-dialog",
        form: "new-item-form",
        addButton: "add-item",
        closeButton: "close-new-item-dialog",
        subitemsList: "new-item-form-subitems",
        tagsSelect: "tags-select",
        addSubitemBtn: "new-item-add-subitem",
        subitemTemplate: "subitem-form-tmpl"
    },
    tags: {
        list: "tags",
        template: "tag-tmpl",
        aside: "tags-sidebar",
        toggleListBtn: "tags-toggle"
    },
    tagForm: {
        dialog: "new-tag-dialog",
        form: "new-tag-form",
        addButton: "add-tag",
        closeButton: "close-new-tag-dialog"
    },
    periods: {
        toggleButton: "periods-toggle",
        startButton: "start-period",
        aside: "periods-sidebar",
        list: "periods-list",
        periodTemplate: "period-tmpl"
    }
};
const cache = {};
function getElement(id) {
    if (cache[id]) return cache[id];
    const element = document.getElementById(id);
    cache[id] = element;
    return element;
}
function getTemplate(id) {
    const template = getElement(id);
    const $clone = template.content.cloneNode(true);
    return $clone;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a9hVv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "closeNewTagForm", ()=>closeNewTagForm);
parcelHelpers.export(exports, "initNewTagForm", ()=>initNewTagForm);
var _store = require("../store");
var _notifier = require("../utils/notifier");
var _elements = require("./elements");
function resetNewTagForm() {
    const $newTagForm = (0, _elements.getElement)((0, _elements.IDS).tagForm.form);
    $newTagForm.reset();
}
function openNewTagForm() {
    const $newTagDialog = (0, _elements.getElement)((0, _elements.IDS).tagForm.dialog);
    $newTagDialog.showModal();
}
function closeNewTagForm() {
    const $newTagDialog = (0, _elements.getElement)((0, _elements.IDS).tagForm.dialog);
    $newTagDialog.close();
    resetNewTagForm();
}
function getNewTagFormData() {
    const $newTagForm = (0, _elements.getElement)((0, _elements.IDS).tagForm.form);
    return {
        name: $newTagForm.elements.name.value
    };
}
function initNewTagForm(config) {
    const { onSubmit } = config;
    const $newTagForm = (0, _elements.getElement)((0, _elements.IDS).tagForm.form);
    const $addTagButton = (0, _elements.getElement)((0, _elements.IDS).tagForm.addButton);
    const $closeDialogButton = (0, _elements.getElement)((0, _elements.IDS).tagForm.closeButton);
    $newTagForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = getNewTagFormData();
        if (!formData.name) {
            (0, _notifier.notifyError)("Не заполнено поле name", {
                formData
            });
            return;
        }
        const tags = (0, _store.selectTags)();
        const isDouble = tags.some((t)=>t.name === formData.name);
        if (isDouble) {
            (0, _notifier.notifyError)(`Тег с именем ${formData.name} уже добавлен`, {
                formData
            });
            return;
        }
        onSubmit(formData);
    });
    $addTagButton.addEventListener("click", ()=>{
        openNewTagForm();
    });
    $closeDialogButton.addEventListener("click", ()=>{
        closeNewTagForm();
    });
}

},{"../store":"2rPL6","../utils/notifier":"7aVBF","./elements":"8Ekdt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hxYzp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderItemsList", ()=>renderItemsList);
parcelHelpers.export(exports, "addItemToList", ()=>addItemToList);
parcelHelpers.export(exports, "removeItemFromList", ()=>removeItemFromList);
parcelHelpers.export(exports, "initItemsList", ()=>initItemsList);
var _store = require("../store");
var _elements = require("./elements");
const selectors = {
    item: ".item",
    itemText: ".item-text",
    itemPrice: ".item-price",
    itemTag: ".item-tag",
    itemRemove: ".item-remove",
    subitems: ".item-subitems",
    subitem: ".subitem",
    subitemText: ".subitem-text",
    subitemPrice: ".subitem-price",
    subitemTag: ".subitem-tag"
};
function renderSubitem(subitem) {
    const $clone = (0, _elements.getTemplate)((0, _elements.IDS).items.subitemTemplate);
    const $subitem = $clone.querySelector(selectors.subitem);
    $subitem.querySelector(selectors.subitemText).textContent = subitem.text;
    $subitem.querySelector(selectors.subitemPrice).textContent = subitem.price;
    const subitemTag = (0, _store.selectTagById)(subitem.tag);
    $subitem.querySelector(selectors.subitemTag).textContent = subitemTag?.name || "";
    return $subitem;
}
function renderItem(item) {
    const $clone = (0, _elements.getTemplate)((0, _elements.IDS).items.template);
    const $item = $clone.querySelector(selectors.item);
    $item.dataset.itemId = item.id;
    $item.querySelector(selectors.itemText).textContent = item.text;
    $item.querySelector(selectors.itemPrice).textContent = item.price;
    const itemTag = (0, _store.selectTagById)(item.tag);
    $item.querySelector(selectors.itemTag).textContent = itemTag?.name || "";
    if (item.subitems?.length > 0) {
        const $subitemsList = $item.querySelector(selectors.subitems);
        item.subitems.forEach((subitem)=>{
            const $subitem = renderSubitem(subitem);
            $subitemsList.appendChild($subitem);
        });
    }
    return $item;
}
function renderItemsList(items) {
    const $itemsList = (0, _elements.getElement)((0, _elements.IDS).items.list);
    $itemsList.innerHTML = "";
    items.forEach((item)=>{
        const $item = renderItem(item);
        $itemsList.appendChild($item);
    });
}
function addItemToList(item) {
    const $item = renderItem(item);
    const $itemsList = (0, _elements.getElement)((0, _elements.IDS).items.list);
    $itemsList.appendChild($item);
}
function removeItemFromList(itemId) {
    const $element = document.querySelector(`[data-item-id="${itemId}"]`);
    $element.remove();
}
function initItemsList(config) {
    const { onRemove } = config;
    const $itemsList = (0, _elements.getElement)((0, _elements.IDS).items.list);
    $itemsList.addEventListener("click", (e)=>{
        const $removeButton = e.target.closest(selectors.itemRemove);
        if ($removeButton) {
            const $tag = e.target.closest(selectors.item);
            onRemove(Number($tag.dataset.itemId));
        }
    });
}

},{"./elements":"8Ekdt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../store":"2rPL6"}],"74Zyy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderTagsList", ()=>renderTagsList);
parcelHelpers.export(exports, "addTagToList", ()=>addTagToList);
parcelHelpers.export(exports, "removeTagFromList", ()=>removeTagFromList);
parcelHelpers.export(exports, "initTagsList", ()=>initTagsList);
var _elements = require("./elements");
const selectors = {
    tag: ".tag",
    tagName: ".tag-name",
    tagRemove: ".tag-remove"
};
function renderTag(tag) {
    const $clone = (0, _elements.getTemplate)((0, _elements.IDS).tags.template);
    const $tag = $clone.querySelector(selectors.tag);
    $tag.dataset.tagId = tag.id;
    $tag.querySelector(selectors.tagName).textContent = tag.name;
    return $tag;
}
function renderTagsList(tags) {
    const $tagsList = (0, _elements.getElement)((0, _elements.IDS).tags.list);
    $tagsList.innerHTML = "";
    tags.forEach((tag)=>{
        const $tag = renderTag(tag);
        $tagsList.appendChild($tag);
    });
}
function addTagToList(tag) {
    const $tagsList = (0, _elements.getElement)((0, _elements.IDS).tags.list);
    const $tag = renderTag(tag);
    $tagsList.appendChild($tag);
}
function removeTagFromList(tagId) {
    const $element = document.querySelector(`[data-tag-id="${tagId}"]`);
    $element.remove();
}
function initTagsList(config) {
    const { onRemove } = config;
    const $tagsList = (0, _elements.getElement)((0, _elements.IDS).tags.list);
    $tagsList.addEventListener("click", (e)=>{
        const $removeButton = e.target.closest(selectors.tagRemove);
        if ($removeButton) {
            const $tag = e.target.closest(selectors.tag);
            onRemove(Number($tag.dataset.tagId));
        }
    });
    const $tagsToggleButton = (0, _elements.getElement)((0, _elements.IDS).tags.toggleListBtn);
    const $tagsSidebar = (0, _elements.getElement)((0, _elements.IDS).tags.aside);
    $tagsToggleButton.addEventListener("click", ()=>{
        if ($tagsSidebar.hasAttribute("data-open")) $tagsSidebar.removeAttribute("data-open");
        else $tagsSidebar.setAttribute("data-open", "true");
    });
}

},{"./elements":"8Ekdt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iKb5k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPeriodsList", ()=>renderPeriodsList);
parcelHelpers.export(exports, "addPeriodToList", ()=>addPeriodToList);
parcelHelpers.export(exports, "removePeriodFromList", ()=>removePeriodFromList);
parcelHelpers.export(exports, "initPeriodsList", ()=>initPeriodsList);
parcelHelpers.export(exports, "highlightActivePeriod", ()=>highlightActivePeriod);
var _date = require("../utils/date");
var _elements = require("./elements");
const selectors = {
    period: ".period",
    periodStart: ".period-start",
    periodEnd: ".period-end",
    periodRemove: ".period-remove"
};
function renderPeriod(period, nextPeriod) {
    const $clone = (0, _elements.getTemplate)((0, _elements.IDS).periods.periodTemplate);
    const $period = $clone.querySelector(selectors.period);
    $period.dataset.periodId = period.id;
    const start = new Date(period.createdAt);
    const end = nextPeriod ? new Date(nextPeriod.createdAt) : null;
    $period.querySelector(selectors.periodStart).textContent = `с ${(0, _date.formatDate)(start)}`;
    $period.querySelector(selectors.periodEnd).textContent = end ? `по ${(0, _date.formatDate)(end)}` : `...`;
    return $period;
}
function renderPeriodsList(periods) {
    const $periodsList = (0, _elements.getElement)((0, _elements.IDS).periods.list);
    $periodsList.innerHTML = "";
    periods.forEach((period, i)=>{
        const $period = renderPeriod(period, periods[i + 1]);
        $periodsList.appendChild($period);
    });
}
function addPeriodToList(period) {
    const $periodsList = (0, _elements.getElement)((0, _elements.IDS).periods.list);
    const $period = renderPeriod(period);
    $periodsList.appendChild($period);
}
function removePeriodFromList(periodId) {
    const $element = document.querySelector(`[data-period-id="${periodId}"]`);
    $element.remove();
}
function initPeriodsList(config) {
    const { onStart, onRemove, onSelect } = config;
    const $toggleButton = (0, _elements.getElement)((0, _elements.IDS).periods.toggleButton);
    const $periodsSidebar = (0, _elements.getElement)((0, _elements.IDS).periods.aside);
    const $periodsList = (0, _elements.getElement)((0, _elements.IDS).periods.list);
    const $startButton = (0, _elements.getElement)((0, _elements.IDS).periods.startButton);
    $toggleButton.addEventListener("click", ()=>{
        if ($periodsSidebar.hasAttribute("data-open")) $periodsSidebar.removeAttribute("data-open");
        else $periodsSidebar.setAttribute("data-open", "true");
    });
    $periodsList.addEventListener("click", (e)=>{
        const $removeButton = e.target.closest(selectors.periodRemove);
        if ($removeButton) {
            const $period = e.target.closest(selectors.period);
            onRemove(Number($period.dataset.periodId));
            return;
        }
        const $period = e.target.closest(selectors.period);
        if ($period) onSelect(Number($period.dataset.periodId));
    });
    $startButton.addEventListener("click", onStart);
}
function highlightActivePeriod(period) {}

},{"../utils/date":"2Vjtu","./elements":"8Ekdt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Vjtu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatDate", ()=>formatDate);
function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lvYRj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "subscribeToStore", ()=>subscribeToStore);
var _db = require("./js/db");
var _store = require("./js/store");
var _view = require("./js/view");
function updateTagsHelper() {
    (0, _view.updateTagsSelect)((0, _store.selectWeightedTags)());
}
function subscribeToStore() {
    (0, _store.subscribe)((0, _store.events).inited, ()=>{
        (0, _view.renderTagsList)((0, _store.selectTags)());
        (0, _view.renderItemsList)((0, _store.selectActiveItems)());
        (0, _view.renderPeriodsList)((0, _store.selectPeriods)());
        (0, _view.highlightActivePeriod)((0, _store.selectActivePeriod)());
        updateTagsHelper();
    });
    (0, _store.subscribe)((0, _store.events).addItem, (item)=>{
        (0, _db.addItemToDb)(item);
        (0, _view.addItemToList)(item);
        (0, _view.closeNewItemForm)();
        updateTagsHelper();
    });
    (0, _store.subscribe)((0, _store.events).addTag, (tag)=>{
        (0, _db.addTagToDb)(tag);
        (0, _view.addTagToList)(tag);
        (0, _view.closeNewTagForm)();
        updateTagsHelper();
    });
    (0, _store.subscribe)((0, _store.events).addPeriod, (period)=>{
        (0, _db.addPeriodToDb)(period);
        (0, _view.addPeriodToList)(period);
        (0, _store.setActivePeriod)(period);
    });
    (0, _store.subscribe)((0, _store.events).removeTag, (tag)=>{
        (0, _db.removeTagFromDb)(tag);
        removeTagFromList(tag.id);
        updateTagsHelper();
    });
    (0, _store.subscribe)((0, _store.events).removeItem, (item)=>{
        (0, _db.removeItemFromDb)(item);
        (0, _view.removeItemFromList)(item.id);
        updateTagsHelper();
    });
    (0, _store.subscribe)((0, _store.events).setActivePeriod, (activePeriod)=>{
        (0, _view.renderItemsList)((0, _store.selectActiveItems)());
        (0, _view.highlightActivePeriod)(activePeriod);
    });
}

},{"./js/store":"2rPL6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./js/view":"3gZq0","./js/db":"aF8BE"}]},["fH7gS","8ZNvh"], "8ZNvh", "parcelRequire1d24")

//# sourceMappingURL=index.f5c48570.js.map
