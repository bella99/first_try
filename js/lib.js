this.createjs = this.createjs || {},
function() {
    var a = createjs.SoundJS = createjs.SoundJS || {};
    a.version = "0.6.1",
    a.buildDate = "Thu, 21 May 2015 16:17:37 GMT"
}
(),
this.createjs = this.createjs || {},
createjs.extend = function(a, b) {
    function c() {
        this.constructor = a
    }
    return c.prototype = b.prototype,
    a.prototype = new c
}
,
this.createjs = this.createjs || {},
createjs.promote = function(a, b) {
    var c = a.prototype
      , d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;
    if (d) {
        c[(b += "_") + "constructor"] = d.constructor;
        for (var e in d) {
            c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e])
        }
    }
    return a
}
,
this.createjs = this.createjs || {},
createjs.indexOf = function(a, b) {
    for (var c = 0, d = a.length; d > c; c++) {
        if (b === a[c]) {
            return c
        }
    }
    return -1
}
,
this.createjs = this.createjs || {},
function() {
    createjs.proxy = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return function() {
            return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
        }
    }
}
(),
this.createjs = this.createjs || {},
function() {
    function BrowserDetect() {
        throw "BrowserDetect cannot be instantiated"
    }
    var a = BrowserDetect.agent = window.navigator.userAgent;
    BrowserDetect.isWindowPhone = a.indexOf("IEMobile") > -1 || a.indexOf("Windows Phone") > -1,
    BrowserDetect.isFirefox = a.indexOf("Firefox") > -1,
    BrowserDetect.isOpera = null  != window.opera,
    BrowserDetect.isChrome = a.indexOf("Chrome") > -1,
    BrowserDetect.isIOS = (a.indexOf("iPod") > -1 || a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1) && !BrowserDetect.isWindowPhone,
    BrowserDetect.isAndroid = a.indexOf("Android") > -1 && !BrowserDetect.isWindowPhone,
    BrowserDetect.isBlackberry = a.indexOf("Blackberry") > -1,
    createjs.BrowserDetect = BrowserDetect
}
(),
this.createjs = this.createjs || {},
function() {
    function EventDispatcher() {
        this._listeners = null ,
        this._captureListeners = null 
    }
    var a = EventDispatcher.prototype;
    EventDispatcher.initialize = function(b) {
        b.addEventListener = a.addEventListener,
        b.on = a.on,
        b.removeEventListener = b.off = a.removeEventListener,
        b.removeAllEventListeners = a.removeAllEventListeners,
        b.hasEventListener = a.hasEventListener,
        b.dispatchEvent = a.dispatchEvent,
        b._dispatchEvent = a._dispatchEvent,
        b.willTrigger = a.willTrigger
    }
    ,
    a.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c),
        e = d[a],
        e ? e.push(b) : d[a] = [b],
        b
    }
    ,
    a.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b,
        b = b.handleEvent),
        c = c || this,
        this.addEventListener(a, function(a) {
            b.call(c, a, e),
            d && a.remove()
        }
        , f)
    }
    ,
    a.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e) {
                for (var f = 0, g = e.length; g > f; f++) {
                    if (e[f] == b) {
                        1 == g ? delete d[a] : e.splice(f, 1);
                        break
                    }
                }
            }
        }
    }
    ,
    a.off = a.removeEventListener,
    a.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a],
        this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null 
    }
    ,
    a.dispatchEvent = function(a) {
        if ("string" == typeof a) {
            var b = this._listeners;
            if (!b || !b[a]) {
                return !1
            }
            a = new createjs.Event(a)
        } else {
            a.target && a.clone && (a = a.clone())
        }
        try {
            a.target = this
        } catch (c) {}
        if (a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent; ) {
                e.push(d = d.parent)
            }
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--) {
                e[f]._dispatchEvent(a, 1 + (0 == f))
            }
            for (f = 1; g > f && !a.propagationStopped; f++) {
                e[f]._dispatchEvent(a, 3)
            }
        } else {
            this._dispatchEvent(a, 2)
        }
        return a.defaultPrevented
    }
    ,
    a.hasEventListener = function(a) {
        var b = this._listeners
          , c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }
    ,
    a.willTrigger = function(a) {
        for (var b = this; b; ) {
            if (b.hasEventListener(a)) {
                return !0
            }
            b = b.parent
        }
        return !1
    }
    ,
    a.toString = function() {
        return "[EventDispatcher]"
    }
    ,
    a._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length)) {
                return
            }
            try {
                a.currentTarget = this
            } catch (f) {}
            try {
                a.eventPhase = b
            } catch (f) {}
            a.removed = !1,
            e = e.slice();
            for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                var h = e[g];
                h.handleEvent ? h.handleEvent(a) : h(a),
                a.removed && (this.off(a.type, h, 1 == b),
                a.removed = !1)
            }
        }
    }
    ,
    createjs.EventDispatcher = EventDispatcher
}
(),
this.createjs = this.createjs || {},
function() {
    function Event(a, b, c) {
        this.type = a,
        this.target = null ,
        this.currentTarget = null ,
        this.eventPhase = 0,
        this.bubbles = !!b,
        this.cancelable = !!c,
        this.timeStamp = (new Date).getTime(),
        this.defaultPrevented = !1,
        this.propagationStopped = !1,
        this.immediatePropagationStopped = !1,
        this.removed = !1
    }
    var a = Event.prototype;
    a.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }
    ,
    a.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ,
    a.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ,
    a.remove = function() {
        this.removed = !0
    }
    ,
    a.clone = function() {
        return new Event(this.type,this.bubbles,this.cancelable)
    }
    ,
    a.set = function(a) {
        for (var b in a) {
            this[b] = a[b]
        }
        return this
    }
    ,
    a.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ,
    createjs.Event = Event
}
(),
this.createjs = this.createjs || {},
function() {
    function ErrorEvent(a, b, c) {
        this.Event_constructor("error"),
        this.title = a,
        this.message = b,
        this.data = c
    }
    var a = createjs.extend(ErrorEvent, createjs.Event);
    a.clone = function() {
        return new createjs.ErrorEvent(this.title,this.message,this.data)
    }
    ,
    createjs.ErrorEvent = createjs.promote(ErrorEvent, "Event")
}
(),
this.createjs = this.createjs || {},
function() {
    function ProgressEvent(a, b) {
        this.Event_constructor("progress"),
        this.loaded = a,
        this.total = null  == b ? 1 : b,
        this.progress = 0 == b ? 0 : this.loaded / this.total
    }
    var a = createjs.extend(ProgressEvent, createjs.Event);
    a.clone = function() {
        return new createjs.ProgressEvent(this.loaded,this.total)
    }
    ,
    createjs.ProgressEvent = createjs.promote(ProgressEvent, "Event")
}
(window),
this.createjs = this.createjs || {},
function() {
    function LoadItem() {
        this.src = null ,
        this.type = null ,
        this.id = null ,
        this.maintainOrder = !1,
        this.callback = null ,
        this.data = null ,
        this.method = createjs.LoadItem.GET,
        this.values = null ,
        this.headers = null ,
        this.withCredentials = !1,
        this.mimeType = null ,
        this.crossOrigin = null ,
        this.loadTimeout = b.LOAD_TIMEOUT_DEFAULT
    }
    var a = LoadItem.prototype = {}
      , b = LoadItem;
    b.LOAD_TIMEOUT_DEFAULT = 8000,
    b.create = function(a) {
        if ("string" == typeof a) {
            var c = new LoadItem;
            return c.src = a,
            c
        }
        if (a instanceof b) {
            return a
        }
        if (a instanceof Object && a.src) {
            return null  == a.loadTimeout && (a.loadTimeout = b.LOAD_TIMEOUT_DEFAULT),
            a
        }
        throw new Error("Type not recognized.")
    }
    ,
    a.set = function(a) {
        for (var b in a) {
            this[b] = a[b]
        }
        return this
    }
    ,
    createjs.LoadItem = b
}
(),
function() {
    var a = {};
    a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i,
    a.RELATIVE_PATT = /^[./]*?\//i,
    a.EXTENSION_PATT = /\/?[^/]+\.(\w{1,5})$/i,
    a.parseURI = function(b) {
        var c = {
            absolute: !1,
            relative: !1
        };
        if (null  == b) {
            return c
        }
        var d = b.indexOf("?");
        d > -1 && (b = b.substr(0, d));
        var e;
        return a.ABSOLUTE_PATT.test(b) ? c.absolute = !0 : a.RELATIVE_PATT.test(b) && (c.relative = !0),
        (e = b.match(a.EXTENSION_PATT)) && (c.extension = e[1].toLowerCase()),
        c
    }
    ,
    a.formatQueryString = function(a, b) {
        if (null  == a) {
            throw new Error("You must specify data.")
        }
        var c = [];
        for (var d in a) {
            c.push(d + "=" + escape(a[d]))
        }
        return b && (c = c.concat(b)),
        c.join("&")
    }
    ,
    a.buildPath = function(a, b) {
        if (null  == b) {
            return a
        }
        var c = []
          , d = a.indexOf("?");
        if (-1 != d) {
            var e = a.slice(d + 1);
            c = c.concat(e.split("&"))
        }
        return -1 != d ? a.slice(0, d) + "?" + this._formatQueryString(b, c) : a + "?" + this._formatQueryString(b, c)
    }
    ,
    a.isCrossDomain = function(a) {
        var b = document.createElement("a");
        b.href = a.src;
        var c = document.createElement("a");
        c.href = location.href;
        var d = "" != b.hostname && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname);
        return d
    }
    ,
    a.isLocal = function(a) {
        var b = document.createElement("a");
        return b.href = a.src,
        "" == b.hostname && "file:" == b.protocol
    }
    ,
    a.isBinary = function(a) {
        switch (a) {
        case createjs.AbstractLoader.IMAGE:
        case createjs.AbstractLoader.BINARY:
            return !0;
        default:
            return !1
        }
    }
    ,
    a.isImageTag = function(a) {
        return a instanceof HTMLImageElement
    }
    ,
    a.isAudioTag = function(a) {
        return window.HTMLAudioElement ? a instanceof HTMLAudioElement : !1
    }
    ,
    a.isVideoTag = function(a) {
        return window.HTMLVideoElement ? a instanceof HTMLVideoElement : !1
    }
    ,
    a.isText = function(a) {
        switch (a) {
        case createjs.AbstractLoader.TEXT:
        case createjs.AbstractLoader.JSON:
        case createjs.AbstractLoader.MANIFEST:
        case createjs.AbstractLoader.XML:
        case createjs.AbstractLoader.CSS:
        case createjs.AbstractLoader.SVG:
        case createjs.AbstractLoader.JAVASCRIPT:
        case createjs.AbstractLoader.SPRITESHEET:
            return !0;
        default:
            return !1
        }
    }
    ,
    a.getTypeByExtension = function(a) {
        if (null  == a) {
            return createjs.AbstractLoader.TEXT
        }
        switch (a.toLowerCase()) {
        case "jpeg":
        case "jpg":
        case "gif":
        case "png":
        case "webp":
        case "bmp":
            return createjs.AbstractLoader.IMAGE;
        case "ogg":
        case "mp3":
        case "webm":
            return createjs.AbstractLoader.SOUND;
        case "mp4":
        case "webm":
        case "ts":
            return createjs.AbstractLoader.VIDEO;
        case "json":
            return createjs.AbstractLoader.JSON;
        case "xml":
            return createjs.AbstractLoader.XML;
        case "css":
            return createjs.AbstractLoader.CSS;
        case "js":
            return createjs.AbstractLoader.JAVASCRIPT;
        case "svg":
            return createjs.AbstractLoader.SVG;
        default:
            return createjs.AbstractLoader.TEXT
        }
    }
    ,
    createjs.RequestUtils = a
}
(),
this.createjs = this.createjs || {},
function() {
    function AbstractLoader(a, b, c) {
        this.EventDispatcher_constructor(),
        this.loaded = !1,
        this.canceled = !1,
        this.progress = 0,
        this.type = c,
        this.resultFormatter = null ,
        this._item = a ? createjs.LoadItem.create(a) : null ,
        this._preferXHR = b,
        this._result = null ,
        this._rawResult = null ,
        this._loadedItems = null ,
        this._tagSrcAttribute = null ,
        this._tag = null 
    }
    var a = createjs.extend(AbstractLoader, createjs.EventDispatcher)
      , b = AbstractLoader;
    b.POST = "POST",
    b.GET = "GET",
    b.BINARY = "binary",
    b.CSS = "css",
    b.IMAGE = "image",
    b.JAVASCRIPT = "javascript",
    b.JSON = "json",
    b.JSONP = "jsonp",
    b.MANIFEST = "manifest",
    b.SOUND = "sound",
    b.VIDEO = "video",
    b.SPRITESHEET = "spritesheet",
    b.SVG = "svg",
    b.TEXT = "text",
    b.XML = "xml",
    a.getItem = function() {
        return this._item
    }
    ,
    a.getResult = function(a) {
        return a ? this._rawResult : this._result
    }
    ,
    a.getTag = function() {
        return this._tag
    }
    ,
    a.setTag = function(a) {
        this._tag = a
    }
    ,
    a.load = function() {
        this._createRequest(),
        this._request.on("complete", this, this),
        this._request.on("progress", this, this),
        this._request.on("loadStart", this, this),
        this._request.on("abort", this, this),
        this._request.on("timeout", this, this),
        this._request.on("error", this, this);
        var a = new createjs.Event("initialize");
        a.loader = this._request,
        this.dispatchEvent(a),
        this._request.load()
    }
    ,
    a.cancel = function() {
        this.canceled = !0,
        this.destroy()
    }
    ,
    a.destroy = function() {
        this._request && (this._request.removeAllEventListeners(),
        this._request.destroy()),
        this._request = null ,
        this._item = null ,
        this._rawResult = null ,
        this._result = null ,
        this._loadItems = null ,
        this.removeAllEventListeners()
    }
    ,
    a.getLoadedItems = function() {
        return this._loadedItems
    }
    ,
    a._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
    }
    ,
    a._createTag = function() {
        return null 
    }
    ,
    a._sendLoadStart = function() {
        this._isCanceled() || this.dispatchEvent("loadstart")
    }
    ,
    a._sendProgress = function(a) {
        if (!this._isCanceled()) {
            var b = null ;
            "number" == typeof a ? (this.progress = a,
            b = new createjs.ProgressEvent(this.progress)) : (b = a,
            this.progress = a.loaded / a.total,
            b.progress = this.progress,
            (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)),
            this.hasEventListener("progress") && this.dispatchEvent(b)
        }
    }
    ,
    a._sendComplete = function() {
        if (!this._isCanceled()) {
            this.loaded = !0;
            var a = new createjs.Event("complete");
            a.rawResult = this._rawResult,
            null  != this._result && (a.result = this._result),
            this.dispatchEvent(a)
        }
    }
    ,
    a._sendError = function(a) {
        !this._isCanceled() && this.hasEventListener("error") && (null  == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),
        this.dispatchEvent(a))
    }
    ,
    a._isCanceled = function() {
        return null  == window.createjs || this.canceled ? !0 : !1
    }
    ,
    a.resultFormatter = null ,
    a.handleEvent = function(a) {
        switch (a.type) {
        case "complete":
            this._rawResult = a.target._response;
            var b = this.resultFormatter && this.resultFormatter(this)
              , c = this;
            b instanceof Function ? b(function(a) {
                c._result = a,
                c._sendComplete()
            }
            ) : (this._result = b || this._rawResult,
            this._sendComplete());
            break;
        case "progress":
            this._sendProgress(a);
            break;
        case "error":
            this._sendError(a);
            break;
        case "loadstart":
            this._sendLoadStart();
            break;
        case "abort":
        case "timeout":
            this._isCanceled() || this.dispatchEvent(a.type)
        }
    }
    ,
    a.buildPath = function(a, b) {
        return createjs.RequestUtils.buildPath(a, b)
    }
    ,
    a.toString = function() {
        return "[PreloadJS AbstractLoader]"
    }
    ,
    createjs.AbstractLoader = createjs.promote(AbstractLoader, "EventDispatcher")
}
(),
this.createjs = this.createjs || {},
function() {
    function AbstractMediaLoader(a, b, c) {
        this.AbstractLoader_constructor(a, b, c),
        this.resultFormatter = this._formatResult,
        this._tagSrcAttribute = "src"
    }
    var a = createjs.extend(AbstractMediaLoader, createjs.AbstractLoader);
    a.load = function() {
        this._tag || (this._tag = this._createTag(this._item.src)),
        this._tag.preload = "auto",
        this._tag.load(),
        this.AbstractLoader_load()
    }
    ,
    a._createTag = function() {}
    ,
    a._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
    }
    ,
    a._formatResult = function(a) {
        return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
        this._tag.onstalled = null ,
        this._preferXHR && (a.getTag().src = a.getResult(!0)),
        a.getTag()
    }
    ,
    createjs.AbstractMediaLoader = createjs.promote(AbstractMediaLoader, "AbstractLoader")
}
(),
this.createjs = this.createjs || {},
function() {
    var AbstractRequest = function(a) {
        this._item = a
    }
      , a = createjs.extend(AbstractRequest, createjs.EventDispatcher);
    a.load = function() {}
    ,
    a.destroy = function() {}
    ,
    a.cancel = function() {}
    ,
    createjs.AbstractRequest = createjs.promote(AbstractRequest, "EventDispatcher")
}
(),
this.createjs = this.createjs || {},
function() {
    function TagRequest(a, b, c) {
        this.AbstractRequest_constructor(a),
        this._tag = b,
        this._tagSrcAttribute = c,
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this),
        this._addedToDOM = !1,
        this._startTagVisibility = null 
    }
    var a = createjs.extend(TagRequest, createjs.AbstractRequest);
    a.load = function() {
        this._tag.onload = createjs.proxy(this._handleTagComplete, this),
        this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this),
        this._tag.onerror = createjs.proxy(this._handleError, this);
        var a = new createjs.Event("initialize");
        a.loader = this._tag,
        this.dispatchEvent(a),
        this._hideTag(),
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout),
        this._tag[this._tagSrcAttribute] = this._item.src,
        null  == this._tag.parentNode && (window.document.body.appendChild(this._tag),
        this._addedToDOM = !0)
    }
    ,
    a.destroy = function() {
        this._clean(),
        this._tag = null ,
        this.AbstractRequest_destroy()
    }
    ,
    a._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }
    ,
    a._handleError = function() {
        this._clean(),
        this.dispatchEvent("error")
    }
    ,
    a._handleTagComplete = function() {
        this._rawResult = this._tag,
        this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult,
        this._clean(),
        this._showTag(),
        this.dispatchEvent("complete")
    }
    ,
    a._handleTimeout = function() {
        this._clean(),
        this.dispatchEvent(new createjs.Event("timeout"))
    }
    ,
    a._clean = function() {
        this._tag.onload = null ,
        this._tag.onreadystatechange = null ,
        this._tag.onerror = null ,
        this._addedToDOM && null  != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag),
        clearTimeout(this._loadTimeout)
    }
    ,
    a._hideTag = function() {
        this._startTagVisibility = this._tag.style.visibility,
        this._tag.style.visibility = "hidden"
    }
    ,
    a._showTag = function() {
        this._tag.style.visibility = this._startTagVisibility
    }
    ,
    a._handleStalled = function() {}
    ,
    createjs.TagRequest = createjs.promote(TagRequest, "AbstractRequest")
}
(),
this.createjs = this.createjs || {},
function() {
    function MediaTagRequest(a, b, c) {
        this.AbstractRequest_constructor(a),
        this._tag = b,
        this._tagSrcAttribute = c,
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
    }
    var a = createjs.extend(MediaTagRequest, createjs.TagRequest);
    a.load = function() {
        var a = createjs.proxy(this._handleStalled, this);
        this._stalledCallback = a;
        var b = createjs.proxy(this._handleProgress, this);
        this._handleProgress = b,
        this._tag.addEventListener("stalled", a),
        this._tag.addEventListener("progress", b),
        this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
        this.TagRequest_load()
    }
    ,
    a._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }
    ,
    a._handleStalled = function() {}
    ,
    a._handleProgress = function(a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded,a.total);
            this.dispatchEvent(b)
        }
    }
    ,
    a._clean = function() {
        this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
        this._tag.removeEventListener("stalled", this._stalledCallback),
        this._tag.removeEventListener("progress", this._progressCallback),
        this.TagRequest__clean()
    }
    ,
    createjs.MediaTagRequest = createjs.promote(MediaTagRequest, "TagRequest")
}
(),
this.createjs = this.createjs || {},
function() {
    function XHRRequest(a) {
        this.AbstractRequest_constructor(a),
        this._request = null ,
        this._loadTimeout = null ,
        this._xhrLevel = 1,
        this._response = null ,
        this._rawResponse = null ,
        this._canceled = !1,
        this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this),
        this._handleProgressProxy = createjs.proxy(this._handleProgress, this),
        this._handleAbortProxy = createjs.proxy(this._handleAbort, this),
        this._handleErrorProxy = createjs.proxy(this._handleError, this),
        this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this),
        this._handleLoadProxy = createjs.proxy(this._handleLoad, this),
        this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this),
        !this._createXHR(a)
    }
    var a = createjs.extend(XHRRequest, createjs.AbstractRequest);
    XHRRequest.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
    a.getResult = function(a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    }
    ,
    a.cancel = function() {
        this.canceled = !0,
        this._clean(),
        this._request.abort()
    }
    ,
    a.load = function() {
        if (null  == this._request) {
            return void this._handleError()
        }
        this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1),
        this._request.addEventListener("progress", this._handleProgressProxy, !1),
        this._request.addEventListener("abort", this._handleAbortProxy, !1),
        this._request.addEventListener("error", this._handleErrorProxy, !1),
        this._request.addEventListener("timeout", this._handleTimeoutProxy, !1),
        this._request.addEventListener("load", this._handleLoadProxy, !1),
        this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1),
        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
        try {
            this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null ,a))
        }
    }
    ,
    a.setResponseType = function(a) {
        this._request.responseType = a
    }
    ,
    a.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null 
    }
    ,
    a.getResponseHeader = function(a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null 
    }
    ,
    a._handleProgress = function(a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded,a.total);
            this.dispatchEvent(b)
        }
    }
    ,
    a._handleLoadStart = function() {
        clearTimeout(this._loadTimeout),
        this.dispatchEvent("loadstart")
    }
    ,
    a._handleAbort = function(a) {
        this._clean(),
        this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null ,a))
    }
    ,
    a._handleError = function(a) {
        this._clean(),
        this.dispatchEvent(new createjs.ErrorEvent(a.message))
    }
    ,
    a._handleReadyStateChange = function() {
        4 == this._request.readyState && this._handleLoad()
    }
    ,
    a._handleLoad = function() {
        if (!this.loaded) {
            this.loaded = !0;
            var a = this._checkError();
            if (a) {
                return void this._handleError(a)
            }
            this._response = this._getResponse(),
            this._clean(),
            this.dispatchEvent(new createjs.Event("complete"))
        }
    }
    ,
    a._handleTimeout = function(a) {
        this._clean(),
        this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null ,a))
    }
    ,
    a._checkError = function() {
        var a = parseInt(this._request.status);
        switch (a) {
        case 404:
        case 0:
            return new Error(a)
        }
        return null 
    }
    ,
    a._getResponse = function() {
        if (null  != this._response) {
            return this._response
        }
        if (null  != this._request.response) {
            return this._request.response
        }
        try {
            if (null  != this._request.responseText) {
                return this._request.responseText
            }
        } catch (a) {}
        try {
            if (null  != this._request.responseXML) {
                return this._request.responseXML
            }
        } catch (a) {}
        return null 
    }
    ,
    a._createXHR = function(a) {
        var b = createjs.RequestUtils.isCrossDomain(a)
          , c = {}
          , d = null ;
        if (window.XMLHttpRequest) {
            d = new XMLHttpRequest,
            b && void 0 === d.withCredentials && window.XDomainRequest && (d = new XDomainRequest)
        } else {
            for (var e = 0, f = s.ACTIVEX_VERSIONS.length; f > e; e++) {
                s.ACTIVEX_VERSIONS[e];
                try {
                    d = new ActiveXObject(axVersions);
                    break
                } catch (g) {}
            }
            if (null  == d) {
                return !1
            }
        }
        null  == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8"),
        a.mimeType && d.overrideMimeType && d.overrideMimeType(a.mimeType),
        this._xhrLevel = "string" == typeof d.responseType ? 2 : 1;
        var h = null ;
        if (h = a.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(a.src, a.values) : a.src,
        d.open(a.method || createjs.AbstractLoader.GET, h, !0),
        b && d instanceof XMLHttpRequest && 1 == this._xhrLevel && (c.Origin = location.origin),
        a.values && a.method == createjs.AbstractLoader.POST && (c["Content-Type"] = "application/x-www-form-urlencoded"),
        b || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"),
        a.headers) {
            for (var i in a.headers) {
                c[i] = a.headers[i]
            }
        }
        for (i in c) {
            d.setRequestHeader(i, c[i])
        }
        return d instanceof XMLHttpRequest && void 0 !== a.withCredentials && (d.withCredentials = a.withCredentials),
        this._request = d,
        !0
    }
    ,
    a._clean = function() {
        clearTimeout(this._loadTimeout),
        this._request.removeEventListener("loadstart", this._handleLoadStartProxy),
        this._request.removeEventListener("progress", this._handleProgressProxy),
        this._request.removeEventListener("abort", this._handleAbortProxy),
        this._request.removeEventListener("error", this._handleErrorProxy),
        this._request.removeEventListener("timeout", this._handleTimeoutProxy),
        this._request.removeEventListener("load", this._handleLoadProxy),
        this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)
    }
    ,
    a.toString = function() {
        return "[PreloadJS XHRRequest]"
    }
    ,
    createjs.XHRRequest = createjs.promote(XHRRequest, "AbstractRequest")
}
(),
this.createjs = this.createjs || {},
function() {
    function SoundLoader(a, b) {
        this.AbstractMediaLoader_constructor(a, b, createjs.AbstractLoader.SOUND),
        createjs.RequestUtils.isAudioTag(a) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.src) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.tag) && (this._tag = createjs.RequestUtils.isAudioTag(a) ? a : a.src),
        null  != this._tag && (this._preferXHR = !1)
    }
    var a = createjs.extend(SoundLoader, createjs.AbstractMediaLoader)
      , b = SoundLoader;
    b.canLoadItem = function(a) {
        return a.type == createjs.AbstractLoader.SOUND
    }
    ,
    a._createTag = function(a) {
        var b = document.createElement("audio");
        return b.autoplay = !1,
        b.preload = "none",
        b.src = a,
        b
    }
    ,
    createjs.SoundLoader = createjs.promote(SoundLoader, "AbstractMediaLoader")
}
(),
this.createjs = this.createjs || {},
function() {
    var PlayPropsConfig = function() {
        this.interrupt = null ,
        this.delay = null ,
        this.offset = null ,
        this.loop = null ,
        this.volume = null ,
        this.pan = null ,
        this.startTime = null ,
        this.duration = null 
    }
      , a = PlayPropsConfig.prototype = {}
      , b = PlayPropsConfig;
    b.create = function(a) {
        if (a instanceof b || a instanceof Object) {
            var c = new createjs.PlayPropsConfig;
            return c.set(a),
            c
        }
        throw new Error("Type not recognized.")
    }
    ,
    a.set = function(a) {
        for (var b in a) {
            this[b] = a[b]
        }
        return this
    }
    ,
    a.toString = function() {
        return "[PlayPropsConfig]"
    }
    ,
    createjs.PlayPropsConfig = b
}
(),
this.createjs = this.createjs || {},
function() {
    function Sound() {
        throw "Sound cannot be instantiated"
    }
    function a(a, b) {
        this.init(a, b)
    }
    var b = Sound;
    b.INTERRUPT_ANY = "any",
    b.INTERRUPT_EARLY = "early",
    b.INTERRUPT_LATE = "late",
    b.INTERRUPT_NONE = "none",
    b.PLAY_INITED = "playInited",
    b.PLAY_SUCCEEDED = "playSucceeded",
    b.PLAY_INTERRUPTED = "playInterrupted",
    b.PLAY_FINISHED = "playFinished",
    b.PLAY_FAILED = "playFailed",
    b.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"],
    b.EXTENSION_MAP = {
        m4a: "mp4"
    },
    b.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/,
    b.defaultInterruptBehavior = b.INTERRUPT_NONE,
    b.alternateExtensions = [],
    b.activePlugin = null ,
    b._masterVolume = 1,
    Object.defineProperty(b, "volume", {
        get: function() {
            return this._masterVolume
        },
        set: function(a) {
            if (null  == Number(a)) {
                return !1
            }
            if (a = Math.max(0, Math.min(1, a)),
            b._masterVolume = a,
            !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a)) {
                for (var c = this._instances, d = 0, e = c.length; e > d; d++) {
                    c[d].setMasterVolume(a)
                }
            }
        }
    }),
    b._masterMute = !1,
    Object.defineProperty(b, "muted", {
        get: function() {
            return this._masterMute
        },
        set: function(a) {
            if (null  == a) {
                return !1
            }
            if (this._masterMute = a,
            !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a)) {
                for (var b = this._instances, c = 0, d = b.length; d > c; c++) {
                    b[c].setMasterMute(a)
                }
            }
            return !0
        }
    }),
    Object.defineProperty(b, "capabilities", {
        get: function() {
            return null  == b.activePlugin ? null  : b.activePlugin._capabilities
        },
        set: function() {
            return !1
        }
    }),
    b._pluginsRegistered = !1,
    b._lastID = 0,
    b._instances = [],
    b._idHash = {},
    b._preloadHash = {},
    b._defaultPlayPropsHash = {},
    b.addEventListener = null ,
    b.removeEventListener = null ,
    b.removeAllEventListeners = null ,
    b.dispatchEvent = null ,
    b.hasEventListener = null ,
    b._listeners = null ,
    createjs.EventDispatcher.initialize(b),
    b.getPreloadHandlers = function() {
        return {
            callback: createjs.proxy(b.initLoad, b),
            types: ["sound"],
            extensions: b.SUPPORTED_EXTENSIONS
        }
    }
    ,
    b._handleLoadComplete = function(a) {
        var c = a.target.getItem().src;
        if (b._preloadHash[c]) {
            for (var d = 0, e = b._preloadHash[c].length; e > d; d++) {
                var f = b._preloadHash[c][d];
                if (b._preloadHash[c][d] = !0,
                b.hasEventListener("fileload")) {
                    var a = new createjs.Event("fileload");
                    a.src = f.src,
                    a.id = f.id,
                    a.data = f.data,
                    a.sprite = f.sprite,
                    b.dispatchEvent(a)
                }
            }
        }
    }
    ,
    b._handleLoadError = function(a) {
        var c = a.target.getItem().src;
        if (b._preloadHash[c]) {
            for (var d = 0, e = b._preloadHash[c].length; e > d; d++) {
                var f = b._preloadHash[c][d];
                if (b._preloadHash[c][d] = !1,
                b.hasEventListener("fileerror")) {
                    var a = new createjs.Event("fileerror");
                    a.src = f.src,
                    a.id = f.id,
                    a.data = f.data,
                    a.sprite = f.sprite,
                    b.dispatchEvent(a)
                }
            }
        }
    }
    ,
    b._registerPlugin = function(a) {
        return a.isSupported() ? (b.activePlugin = new a,
        !0) : !1
    }
    ,
    b.registerPlugins = function(a) {
        b._pluginsRegistered = !0;
        for (var c = 0, d = a.length; d > c; c++) {
            if (b._registerPlugin(a[c])) {
                return !0
            }
        }
        return !1
    }
    ,
    b.initializeDefaultPlugins = function() {
        return null  != b.activePlugin ? !0 : b._pluginsRegistered ? !1 : b.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    }
    ,
    b.isReady = function() {
        return null  != b.activePlugin
    }
    ,
    b.getCapabilities = function() {
        return null  == b.activePlugin ? null  : b.activePlugin._capabilities
    }
    ,
    b.getCapability = function(a) {
        return null  == b.activePlugin ? null  : b.activePlugin._capabilities[a]
    }
    ,
    b.initLoad = function(a) {
        return b._registerSound(a)
    }
    ,
    b._registerSound = function(c) {
        if (!b.initializeDefaultPlugins()) {
            return !1
        }
        var d;
        if (c.src instanceof Object ? (d = b._parseSrc(c.src),
        d.src = c.path + d.src) : d = b._parsePath(c.src),
        null  == d) {
            return !1
        }
        c.src = d.src,
        c.type = "sound";
        var e = c.data
          , f = null ;
        if (null  != e && (isNaN(e.channels) ? isNaN(e) || (f = parseInt(e)) : f = parseInt(e.channels),
        e.audioSprite)) {
            for (var g, h = e.audioSprite.length; h--; ) {
                g = e.audioSprite[h],
                b._idHash[g.id] = {
                    src: c.src,
                    startTime: parseInt(g.startTime),
                    duration: parseInt(g.duration)
                },
                g.defaultPlayProps && (b._defaultPlayPropsHash[g.id] = createjs.PlayPropsConfig.create(g.defaultPlayProps))
            }
        }
        null  != c.id && (b._idHash[c.id] = {
            src: c.src
        });
        var i = b.activePlugin.register(c);
        return a.create(c.src, f),
        null  != e && isNaN(e) ? c.data.channels = f || a.maxPerChannel() : c.data = f || a.maxPerChannel(),
        i.type && (c.type = i.type),
        c.defaultPlayProps && (b._defaultPlayPropsHash[c.src] = createjs.PlayPropsConfig.create(c.defaultPlayProps)),
        i
    }
    ,
    b.registerSound = function(a, c, d, e, f) {
        var g = {
            src: a,
            id: c,
            data: d,
            defaultPlayProps: f
        };
        a instanceof Object && a.src && (e = c,
        g = a),
        g = createjs.LoadItem.create(g),
        g.path = e,
        null  == e || g.src instanceof Object || (g.src = e + a);
        var h = b._registerSound(g);
        if (!h) {
            return !1
        }
        if (b._preloadHash[g.src] || (b._preloadHash[g.src] = []),
        b._preloadHash[g.src].push(g),
        1 == b._preloadHash[g.src].length) {
            h.on("complete", createjs.proxy(this._handleLoadComplete, this)),
            h.on("error", createjs.proxy(this._handleLoadError, this)),
            b.activePlugin.preload(h)
        } else {
            if (1 == b._preloadHash[g.src][0]) {
                return !0
            }
        }
        return g
    }
    ,
    b.registerSounds = function(a, b) {
        var c = [];
        a.path && (b ? b += a.path : b = a.path,
        a = a.manifest);
        for (var d = 0, e = a.length; e > d; d++) {
            c[d] = createjs.Sound.registerSound(a[d].src, a[d].id, a[d].data, b, a[d].defaultPlayProps)
        }
        return c
    }
    ,
    b.removeSound = function(c, d) {
        if (null  == b.activePlugin) {
            return !1
        }
        c instanceof Object && c.src && (c = c.src);
        var e;
        if (c instanceof Object ? e = b._parseSrc(c) : (c = b._getSrcById(c).src,
        e = b._parsePath(c)),
        null  == e) {
            return !1
        }
        c = e.src,
        null  != d && (c = d + c);
        for (var f in b._idHash) {
            b._idHash[f].src == c && delete b._idHash[f]
        }
        return a.removeSrc(c),
        delete b._preloadHash[c],
        b.activePlugin.removeSound(c),
        !0
    }
    ,
    b.removeSounds = function(a, b) {
        var c = [];
        a.path && (b ? b += a.path : b = a.path,
        a = a.manifest);
        for (var d = 0, e = a.length; e > d; d++) {
            c[d] = createjs.Sound.removeSound(a[d].src, b)
        }
        return c
    }
    ,
    b.removeAllSounds = function() {
        b._idHash = {},
        b._preloadHash = {},
        a.removeAll(),
        b.activePlugin && b.activePlugin.removeAllSounds()
    }
    ,
    b.loadComplete = function(a) {
        if (!b.isReady()) {
            return !1
        }
        var c = b._parsePath(a);
        return a = c ? b._getSrcById(c.src).src : b._getSrcById(a).src,
        void 0 == b._preloadHash[a] ? !1 : 1 == b._preloadHash[a][0]
    }
    ,
    b._parsePath = function(a) {
        "string" != typeof a && (a = a.toString());
        var c = a.match(b.FILE_PATTERN);
        if (null  == c) {
            return !1
        }
        for (var d = c[4], e = c[5], f = b.capabilities, g = 0; !f[e]; ) {
            if (e = b.alternateExtensions[g++],
            g > b.alternateExtensions.length) {
                return null 
            }
        }
        a = a.replace("." + c[5], "." + e);
        var h = {
            name: d,
            src: a,
            extension: e
        };
        return h
    }
    ,
    b._parseSrc = function(a) {
        var c = {
            name: void 0,
            src: void 0,
            extension: void 0
        }
          , d = b.capabilities;
        for (var e in a) {
            if (a.hasOwnProperty(e) && d[e]) {
                c.src = a[e],
                c.extension = e;
                break
            }
        }
        if (!c.src) {
            return !1
        }
        var f = c.src.lastIndexOf("/");
        return c.name = -1 != f ? c.src.slice(f + 1) : c.src,
        c
    }
    ,
    b.play = function(a, c, d, e, f, g, h, i, j) {
        var k;
        k = createjs.PlayPropsConfig.create(c instanceof Object || c instanceof createjs.PlayPropsConfig ? c : {
            interrupt: c,
            delay: d,
            offset: e,
            loop: f,
            volume: g,
            pan: h,
            startTime: i,
            duration: j
        });
        var l = b.createInstance(a, k.startTime, k.duration)
          , m = b._playInstance(l, k);
        return m || l._playFailed(),
        l
    }
    ,
    b.createInstance = function(c, d, e) {
        if (!b.initializeDefaultPlugins()) {
            return new createjs.DefaultSoundInstance(c,d,e)
        }
        var f = b._defaultPlayPropsHash[c];
        c = b._getSrcById(c);
        var g = b._parsePath(c.src)
          , h = null ;
        return null  != g && null  != g.src ? (a.create(g.src),
        null  == d && (d = c.startTime),
        h = b.activePlugin.create(g.src, d, e || c.duration),
        f = f || b._defaultPlayPropsHash[g.src],
        f && h.applyPlayProps(f)) : h = new createjs.DefaultSoundInstance(c,d,e),
        h.uniqueId = b._lastID++,
        h
    }
    ,
    b.stop = function() {
        for (var a = this._instances, b = a.length; b--; ) {
            a[b].stop()
        }
    }
    ,
    b.setVolume = function(a) {
        if (null  == Number(a)) {
            return !1
        }
        if (a = Math.max(0, Math.min(1, a)),
        b._masterVolume = a,
        !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a)) {
            for (var c = this._instances, d = 0, e = c.length; e > d; d++) {
                c[d].setMasterVolume(a)
            }
        }
    }
    ,
    b.getVolume = function() {
        return this._masterVolume
    }
    ,
    b.setMute = function(a) {
        if (null  == a) {
            return !1
        }
        if (this._masterMute = a,
        !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a)) {
            for (var b = this._instances, c = 0, d = b.length; d > c; c++) {
                b[c].setMasterMute(a)
            }
        }
        return !0
    }
    ,
    b.getMute = function() {
        return this._masterMute
    }
    ,
    b.setDefaultPlayProps = function(a, c) {
        a = b._getSrcById(a),
        b._defaultPlayPropsHash[b._parsePath(a.src).src] = createjs.PlayPropsConfig.create(c)
    }
    ,
    b.getDefaultPlayProps = function(a) {
        return a = b._getSrcById(a),
        b._defaultPlayPropsHash[b._parsePath(a.src).src]
    }
    ,
    b._playInstance = function(a, c) {
        var d = b._defaultPlayPropsHash[a.src] || {};
        if (null  == c.interrupt && (c.interrupt = d.interrupt || b.defaultInterruptBehavior),
        null  == c.delay && (c.delay = d.delay || 0),
        null  == c.offset && (c.offset = a.getPosition()),
        null  == c.loop && (c.loop = a.loop),
        null  == c.volume && (c.volume = a.volume),
        null  == c.pan && (c.pan = a.pan),
        0 == c.delay) {
            var e = b._beginPlaying(a, c);
            if (!e) {
                return !1
            }
        } else {
            var f = setTimeout(function() {
                b._beginPlaying(a, c)
            }
            , c.delay);
            a.delayTimeoutId = f
        }
        return this._instances.push(a),
        !0
    }
    ,
    b._beginPlaying = function(b, c) {
        if (!a.add(b, c.interrupt)) {
            return !1
        }
        var d = b._beginPlaying(c);
        if (!d) {
            var e = createjs.indexOf(this._instances, b);
            return e > -1 && this._instances.splice(e, 1),
            !1
        }
        return !0
    }
    ,
    b._getSrcById = function(a) {
        return b._idHash[a] || {
            src: a
        }
    }
    ,
    b._playFinished = function(b) {
        a.remove(b);
        var c = createjs.indexOf(this._instances, b);
        c > -1 && this._instances.splice(c, 1)
    }
    ,
    createjs.Sound = Sound,
    a.channels = {},
    a.create = function(b, c) {
        var d = a.get(b);
        return null  == d ? (a.channels[b] = new a(b,c),
        !0) : !1
    }
    ,
    a.removeSrc = function(b) {
        var c = a.get(b);
        return null  == c ? !1 : (c._removeAll(),
        delete a.channels[b],
        !0)
    }
    ,
    a.removeAll = function() {
        for (var b in a.channels) {
            a.channels[b]._removeAll()
        }
        a.channels = {}
    }
    ,
    a.add = function(b, c) {
        var d = a.get(b.src);
        return null  == d ? !1 : d._add(b, c)
    }
    ,
    a.remove = function(b) {
        var c = a.get(b.src);
        return null  == c ? !1 : (c._remove(b),
        !0)
    }
    ,
    a.maxPerChannel = function() {
        return c.maxDefault
    }
    ,
    a.get = function(b) {
        return a.channels[b]
    }
    ;
    var c = a.prototype;
    c.constructor = a,
    c.src = null ,
    c.max = null ,
    c.maxDefault = 100,
    c.length = 0,
    c.init = function(a, b) {
        this.src = a,
        this.max = b || this.maxDefault,
        -1 == this.max && (this.max = this.maxDefault),
        this._instances = []
    }
    ,
    c._get = function(a) {
        return this._instances[a]
    }
    ,
    c._add = function(a, b) {
        return this._getSlot(b, a) ? (this._instances.push(a),
        this.length++,
        !0) : !1
    }
    ,
    c._remove = function(a) {
        var b = createjs.indexOf(this._instances, a);
        return -1 == b ? !1 : (this._instances.splice(b, 1),
        this.length--,
        !0)
    }
    ,
    c._removeAll = function() {
        for (var a = this.length - 1; a >= 0; a--) {
            this._instances[a].stop()
        }
    }
    ,
    c._getSlot = function(a) {
        var b, c;
        if (a != Sound.INTERRUPT_NONE && (c = this._get(0),
        null  == c)) {
            return !0
        }
        for (var d = 0, e = this.max; e > d; d++) {
            if (b = this._get(d),
            null  == b) {
                return !0
            }
            if (b.playState == Sound.PLAY_FINISHED || b.playState == Sound.PLAY_INTERRUPTED || b.playState == Sound.PLAY_FAILED) {
                c = b;
                break
            }
            a != Sound.INTERRUPT_NONE && (a == Sound.INTERRUPT_EARLY && b.getPosition() < c.getPosition() || a == Sound.INTERRUPT_LATE && b.getPosition() > c.getPosition()) && (c = b)
        }
        return null  != c ? (c._interrupt(),
        this._remove(c),
        !0) : !1
    }
    ,
    c.toString = function() {
        return "[Sound SoundChannel]"
    }
}
(),
this.createjs = this.createjs || {},
function() {
    var AbstractSoundInstance = function(a, b, c, d) {
        this.EventDispatcher_constructor(),
        this.src = a,
        this.uniqueId = -1,
        this.playState = null ,
        this.delayTimeoutId = null ,
        this._volume = 1,
        Object.defineProperty(this, "volume", {
            get: this.getVolume,
            set: this.setVolume
        }),
        this._pan = 0,
        Object.defineProperty(this, "pan", {
            get: this.getPan,
            set: this.setPan
        }),
        this._startTime = Math.max(0, b || 0),
        Object.defineProperty(this, "startTime", {
            get: this.getStartTime,
            set: this.setStartTime
        }),
        this._duration = Math.max(0, c || 0),
        Object.defineProperty(this, "duration", {
            get: this.getDuration,
            set: this.setDuration
        }),
        this._playbackResource = null ,
        Object.defineProperty(this, "playbackResource", {
            get: this.getPlaybackResource,
            set: this.setPlaybackResource
        }),
        d !== !1 && d !== !0 && this.setPlaybackResource(d),
        this._position = 0,
        Object.defineProperty(this, "position", {
            get: this.getPosition,
            set: this.setPosition
        }),
        this._loop = 0,
        Object.defineProperty(this, "loop", {
            get: this.getLoop,
            set: this.setLoop
        }),
        this._muted = !1,
        Object.defineProperty(this, "muted", {
            get: this.getMuted,
            set: this.setMuted
        }),
        this._paused = !1,
        Object.defineProperty(this, "paused", {
            get: this.getPaused,
            set: this.setPaused
        })
    }
      , a = createjs.extend(AbstractSoundInstance, createjs.EventDispatcher);
    a.play = function(a, b, c, d, e, f) {
        var g;
        return g = createjs.PlayPropsConfig.create(a instanceof Object || a instanceof createjs.PlayPropsConfig ? a : {
            interrupt: a,
            delay: b,
            offset: c,
            loop: d,
            volume: e,
            pan: f
        }),
        this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(g),
        void (this._paused && this.setPaused(!1))) : (this._cleanUp(),
        createjs.Sound._playInstance(this, g),
        this)
    }
    ,
    a.stop = function() {
        return this._position = 0,
        this._paused = !1,
        this._handleStop(),
        this._cleanUp(),
        this.playState = createjs.Sound.PLAY_FINISHED,
        this
    }
    ,
    a.destroy = function() {
        this._cleanUp(),
        this.src = null ,
        this.playbackResource = null ,
        this.removeAllEventListeners()
    }
    ,
    a.applyPlayProps = function(a) {
        return null  != a.offset && this.setPosition(a.offset),
        null  != a.loop && this.setLoop(a.loop),
        null  != a.volume && this.setVolume(a.volume),
        null  != a.pan && this.setPan(a.pan),
        null  != a.startTime && (this.setStartTime(a.startTime),
        this.setDuration(a.duration)),
        this
    }
    ,
    a.toString = function() {
        return "[AbstractSoundInstance]"
    }
    ,
    a.getPaused = function() {
        return this._paused
    }
    ,
    a.setPaused = function(a) {
        return a !== !0 && a !== !1 || this._paused == a || 1 == a && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = a,
        a ? this._pause() : this._resume(),
        clearTimeout(this.delayTimeoutId),
        this)
    }
    ,
    a.setVolume = function(a) {
        return a == this._volume ? this : (this._volume = Math.max(0, Math.min(1, a)),
        this._muted || this._updateVolume(),
        this)
    }
    ,
    a.getVolume = function() {
        return this._volume
    }
    ,
    a.setMuted = function(a) {
        return a === !0 || a === !1 ? (this._muted = a,
        this._updateVolume(),
        this) : void 0
    }
    ,
    a.getMuted = function() {
        return this._muted
    }
    ,
    a.setPan = function(a) {
        return a == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, a)),
        this._updatePan(),
        this)
    }
    ,
    a.getPan = function() {
        return this._pan
    }
    ,
    a.getPosition = function() {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()),
        this._position
    }
    ,
    a.setPosition = function(a) {
        return this._position = Math.max(0, a),
        this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(),
        this
    }
    ,
    a.getStartTime = function() {
        return this._startTime
    }
    ,
    a.setStartTime = function(a) {
        return a == this._startTime ? this : (this._startTime = Math.max(0, a || 0),
        this._updateStartTime(),
        this)
    }
    ,
    a.getDuration = function() {
        return this._duration
    }
    ,
    a.setDuration = function(a) {
        return a == this._duration ? this : (this._duration = Math.max(0, a || 0),
        this._updateDuration(),
        this)
    }
    ,
    a.setPlaybackResource = function(a) {
        return this._playbackResource = a,
        0 == this._duration && this._setDurationFromSource(),
        this
    }
    ,
    a.getPlaybackResource = function() {
        return this._playbackResource
    }
    ,
    a.getLoop = function() {
        return this._loop
    }
    ,
    a.setLoop = function(a) {
        null  != this._playbackResource && (0 != this._loop && 0 == a ? this._removeLooping(a) : 0 == this._loop && 0 != a && this._addLooping(a)),
        this._loop = a
    }
    ,
    a._sendEvent = function(a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b)
    }
    ,
    a._cleanUp = function() {
        clearTimeout(this.delayTimeoutId),
        this._handleCleanUp(),
        this._paused = !1,
        createjs.Sound._playFinished(this)
    }
    ,
    a._interrupt = function() {
        this._cleanUp(),
        this.playState = createjs.Sound.PLAY_INTERRUPTED,
        this._sendEvent("interrupted")
    }
    ,
    a._beginPlaying = function(a) {
        return this.setPosition(a.offset),
        this.setLoop(a.loop),
        this.setVolume(a.volume),
        this.setPan(a.pan),
        null  != a.startTime && (this.setStartTime(a.startTime),
        this.setDuration(a.duration)),
        null  != this._playbackResource && this._position < this._duration ? (this._paused = !1,
        this._handleSoundReady(),
        this.playState = createjs.Sound.PLAY_SUCCEEDED,
        this._sendEvent("succeeded"),
        !0) : (this._playFailed(),
        !1)
    }
    ,
    a._playFailed = function() {
        this._cleanUp(),
        this.playState = createjs.Sound.PLAY_FAILED,
        this._sendEvent("failed")
    }
    ,
    a._handleSoundComplete = function() {
        return this._position = 0,
        0 != this._loop ? (this._loop--,
        this._handleLoop(),
        void this._sendEvent("loop")) : (this._cleanUp(),
        this.playState = createjs.Sound.PLAY_FINISHED,
        void this._sendEvent("complete"))
    }
    ,
    a._handleSoundReady = function() {}
    ,
    a._updateVolume = function() {}
    ,
    a._updatePan = function() {}
    ,
    a._updateStartTime = function() {}
    ,
    a._updateDuration = function() {}
    ,
    a._setDurationFromSource = function() {}
    ,
    a._calculateCurrentPosition = function() {}
    ,
    a._updatePosition = function() {}
    ,
    a._removeLooping = function() {}
    ,
    a._addLooping = function() {}
    ,
    a._pause = function() {}
    ,
    a._resume = function() {}
    ,
    a._handleStop = function() {}
    ,
    a._handleCleanUp = function() {}
    ,
    a._handleLoop = function() {}
    ,
    createjs.AbstractSoundInstance = createjs.promote(AbstractSoundInstance, "EventDispatcher"),
    createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
}
(),
this.createjs = this.createjs || {},
function() {
    var AbstractPlugin = function() {
        this._capabilities = null ,
        this._loaders = {},
        this._audioSources = {},
        this._soundInstances = {},
        this._volume = 1,
        this._loaderClass,
        this._soundInstanceClass
    }
      , a = AbstractPlugin.prototype;
    AbstractPlugin._capabilities = null ,
    AbstractPlugin.isSupported = function() {
        return !0
    }
    ,
    a.register = function(a) {
        var b = this._loaders[a.src];
        return b && !b.canceled ? this._loaders[a.src] : (this._audioSources[a.src] = !0,
        this._soundInstances[a.src] = [],
        b = new this._loaderClass(a),
        b.on("complete", createjs.proxy(this._handlePreloadComplete, this)),
        this._loaders[a.src] = b,
        b)
    }
    ,
    a.preload = function(a) {
        a.on("error", createjs.proxy(this._handlePreloadError, this)),
        a.load()
    }
    ,
    a.isPreloadStarted = function(a) {
        return null  != this._audioSources[a]
    }
    ,
    a.isPreloadComplete = function(a) {
        return !(null  == this._audioSources[a] || 1 == this._audioSources[a])
    }
    ,
    a.removeSound = function(a) {
        if (this._soundInstances[a]) {
            for (var b = this._soundInstances[a].length; b--; ) {
                var c = this._soundInstances[a][b];
                c.destroy()
            }
            delete this._soundInstances[a],
            delete this._audioSources[a],
            this._loaders[a] && this._loaders[a].destroy(),
            delete this._loaders[a]
        }
    }
    ,
    a.removeAllSounds = function() {
        for (var a in this._audioSources) {
            this.removeSound(a)
        }
    }
    ,
    a.create = function(a, b, c) {
        this.isPreloadStarted(a) || this.preload(this.register(a));
        var d = new this._soundInstanceClass(a,b,c,this._audioSources[a]);
        return this._soundInstances[a].push(d),
        d
    }
    ,
    a.setVolume = function(a) {
        return this._volume = a,
        this._updateVolume(),
        !0
    }
    ,
    a.getVolume = function() {
        return this._volume
    }
    ,
    a.setMute = function() {
        return this._updateVolume(),
        !0
    }
    ,
    a.toString = function() {
        return "[AbstractPlugin]"
    }
    ,
    a._handlePreloadComplete = function(a) {
        var b = a.target.getItem().src;
        this._audioSources[b] = a.result;
        for (var c = 0, d = this._soundInstances[b].length; d > c; c++) {
            var e = this._soundInstances[b][c];
            e.setPlaybackResource(this._audioSources[b])
        }
    }
    ,
    a._handlePreloadError = function() {}
    ,
    a._updateVolume = function() {}
    ,
    createjs.AbstractPlugin = AbstractPlugin
}
(),
this.createjs = this.createjs || {},
function() {
    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.SOUND)
    }
    var b = createjs.extend(a, createjs.AbstractLoader);
    a.context = null ,
    b.toString = function() {
        return "[WebAudioLoader]"
    }
    ,
    b._createRequest = function() {
        this._request = new createjs.XHRRequest(this._item,!1),
        this._request.setResponseType("arraybuffer")
    }
    ,
    b._sendComplete = function() {
        a.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this))
    }
    ,
    b._handleAudioDecoded = function(a) {
        this._result = a,
        this.AbstractLoader__sendComplete()
    }
    ,
    createjs.WebAudioLoader = createjs.promote(a, "AbstractLoader")
}
(),
this.createjs = this.createjs || {},
function() {
    function WebAudioSoundInstance(a, c, d, e) {
        this.AbstractSoundInstance_constructor(a, c, d, e),
        this.gainNode = b.context.createGain(),
        this.panNode = b.context.createPanner(),
        this.panNode.panningModel = b._panningModel,
        this.panNode.connect(this.gainNode),
        this.sourceNode = null ,
        this._soundCompleteTimeout = null ,
        this._sourceNodeNext = null ,
        this._playbackStartTime = 0,
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
    }
    var a = createjs.extend(WebAudioSoundInstance, createjs.AbstractSoundInstance)
      , b = WebAudioSoundInstance;
    b.context = null ,
    b.destinationNode = null ,
    b._panningModel = "equalpower",
    a.destroy = function() {
        this.AbstractSoundInstance_destroy(),
        this.panNode.disconnect(0),
        this.panNode = null ,
        this.gainNode.disconnect(0),
        this.gainNode = null 
    }
    ,
    a.toString = function() {
        return "[WebAudioSoundInstance]"
    }
    ,
    a._updatePan = function() {
        this.panNode.setPosition(this._pan, 0, -0.5)
    }
    ,
    a._removeLooping = function() {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
    }
    ,
    a._addLooping = function() {
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
    }
    ,
    a._setDurationFromSource = function() {
        this._duration = 1000 * this.playbackResource.duration
    }
    ,
    a._handleCleanUp = function() {
        this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
        0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
        clearTimeout(this._soundCompleteTimeout),
        this._playbackStartTime = 0
    }
    ,
    a._cleanUpAudioNode = function(a) {
        return a && (a.stop(0),
        a.disconnect(0),
        a = null ),
        a
    }
    ,
    a._handleSoundReady = function() {
        this.gainNode.connect(b.destinationNode);
        var a = 0.001 * this._duration
          , c = 0.001 * this._position;
        c > a && (c = a),
        this.sourceNode = this._createAndPlayAudioNode(b.context.currentTime - a, c),
        this._playbackStartTime = this.sourceNode.startTime - c,
        this._soundCompleteTimeout = setTimeout(this._endedHandler, 1000 * (a - c)),
        0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
    }
    ,
    a._createAndPlayAudioNode = function(a, c) {
        var d = b.context.createBufferSource();
        d.buffer = this.playbackResource,
        d.connect(this.panNode);
        var e = 0.001 * this._duration;
        return d.startTime = a + e,
        d.start(d.startTime, c + 0.001 * this._startTime, e - c),
        d
    }
    ,
    a._pause = function() {
        this._position = 1000 * (b.context.currentTime - this._playbackStartTime),
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext),
        0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
        clearTimeout(this._soundCompleteTimeout)
    }
    ,
    a._resume = function() {
        this._handleSoundReady()
    }
    ,
    a._updateVolume = function() {
        var a = this._muted ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    }
    ,
    a._calculateCurrentPosition = function() {
        return 1000 * (b.context.currentTime - this._playbackStartTime)
    }
    ,
    a._updatePosition = function() {
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext),
        clearTimeout(this._soundCompleteTimeout),
        this._paused || this._handleSoundReady()
    }
    ,
    a._handleLoop = function() {
        this._cleanUpAudioNode(this.sourceNode),
        this.sourceNode = this._sourceNodeNext,
        this._playbackStartTime = this.sourceNode.startTime,
        this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0),
        this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
    }
    ,
    a._updateDuration = function() {
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._pause(),
        this._resume())
    }
    ,
    createjs.WebAudioSoundInstance = createjs.promote(WebAudioSoundInstance, "AbstractSoundInstance")
}
(),
this.createjs = this.createjs || {},
function() {
    function WebAudioPlugin() {
        this.AbstractPlugin_constructor(),
        this._panningModel = b._panningModel,
        this.context = b.context,
        this.dynamicsCompressorNode = this.context.createDynamicsCompressor(),
        this.dynamicsCompressorNode.connect(this.context.destination),
        this.gainNode = this.context.createGain(),
        this.gainNode.connect(this.dynamicsCompressorNode),
        createjs.WebAudioSoundInstance.destinationNode = this.gainNode,
        this._capabilities = b._capabilities,
        this._loaderClass = createjs.WebAudioLoader,
        this._soundInstanceClass = createjs.WebAudioSoundInstance,
        this._addPropsToClasses()
    }
    var a = createjs.extend(WebAudioPlugin, createjs.AbstractPlugin)
      , b = WebAudioPlugin;
    b._capabilities = null ,
    b._panningModel = "equalpower",
    b.context = null ,
    b.isSupported = function() {
        var a = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || a || this._isFileXHRSupported() ? (b._generateCapabilities(),
        null  == b.context ? !1 : !0) : !1
    }
    ,
    b.playEmptySound = function() {
        if (null  != b.context) {
            var a = b.context.createBufferSource();
            a.buffer = b.context.createBuffer(1, 1, 22050),
            a.connect(b.context.destination),
            a.start(0, 0, 0)
        }
    }
    ,
    b._isFileXHRSupported = function() {
        var a = !0
          , b = new XMLHttpRequest;
        try {
            b.open("GET", "WebAudioPluginTest.fail", !1)
        } catch (c) {
            return a = !1
        }
        b.onerror = function() {
            a = !1
        }
        ,
        b.onload = function() {
            a = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
        }
        ;
        try {
            b.send()
        } catch (c) {
            a = !1
        }
        return a
    }
    ,
    b._generateCapabilities = function() {
        if (null  == b._capabilities) {
            var a = document.createElement("audio");
            if (null  == a.canPlayType) {
                return null 
            }
            if (null  == b.context) {
                if (window.AudioContext) {
                    b.context = new AudioContext
                } else {
                    if (!window.webkitAudioContext) {
                        return null 
                    }
                    b.context = new webkitAudioContext
                }
            }
            b._compatibilitySetUp(),
            b.playEmptySound(),
            b._capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var c = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = c.length; f > e; e++) {
                var g = c[e]
                  , h = d[g] || g;
                b._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
            b.context.destination.numberOfChannels < 2 && (b._capabilities.panning = !1)
        }
    }
    ,
    b._compatibilitySetUp = function() {
        if (b._panningModel = "equalpower",
        !b.context.createGain) {
            b.context.createGain = b.context.createGainNode;
            var a = b.context.createBufferSource();
            a.__proto__.start = a.__proto__.noteGrainOn,
            a.__proto__.stop = a.__proto__.noteOff,
            b._panningModel = 0
        }
    }
    ,
    a.toString = function() {
        return "[WebAudioPlugin]"
    }
    ,
    a._addPropsToClasses = function() {
        var a = this._soundInstanceClass;
        a.context = this.context,
        a.destinationNode = this.gainNode,
        a._panningModel = this._panningModel,
        this._loaderClass.context = this.context
    }
    ,
    a._updateVolume = function() {
        var a = createjs.Sound._masterMute ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    }
    ,
    createjs.WebAudioPlugin = createjs.promote(WebAudioPlugin, "AbstractPlugin")
}
(),
this.createjs = this.createjs || {},
function() {
    function HTMLAudioTagPool() {
        throw "HTMLAudioTagPool cannot be instantiated"
    }
    function a() {
        this._tags = []
    }
    var b = HTMLAudioTagPool;
    b._tags = {},
    b._tagPool = new a,
    b._tagUsed = {},
    b.get = function(a) {
        var c = b._tags[a];
        return null  == c ? (c = b._tags[a] = b._tagPool.get(),
        c.src = a) : b._tagUsed[a] ? (c = b._tagPool.get(),
        c.src = a) : b._tagUsed[a] = !0,
        c
    }
    ,
    b.set = function(a, c) {
        c == b._tags[a] ? b._tagUsed[a] = !1 : b._tagPool.set(c)
    }
    ,
    b.remove = function(a) {
        var c = b._tags[a];
        return null  == c ? !1 : (b._tagPool.set(c),
        delete b._tags[a],
        delete b._tagUsed[a],
        !0)
    }
    ,
    b.getDuration = function(a) {
        var c = b._tags[a];
        return null  == c ? 0 : 1000 * c.duration
    }
    ,
    createjs.HTMLAudioTagPool = HTMLAudioTagPool;
    var c = a.prototype;
    c.constructor = a,
    c.get = function() {
        var a;
        return a = 0 == this._tags.length ? this._createTag() : this._tags.pop(),
        null  == a.parentNode && document.body.appendChild(a),
        a
    }
    ,
    c.set = function(a) {
        var b = createjs.indexOf(this._tags, a);
        -1 == b && (this._tags.src = null ,
        this._tags.push(a))
    }
    ,
    c.toString = function() {
        return "[TagPool]"
    }
    ,
    c._createTag = function() {
        var a = document.createElement("audio");
        return a.autoplay = !1,
        a.preload = "none",
        a
    }
}
(),
this.createjs = this.createjs || {},
function() {
    function HTMLAudioSoundInstance(a, b, c, d) {
        this.AbstractSoundInstance_constructor(a, b, c, d),
        this._audioSpriteStopTime = null ,
        this._delayTimeoutId = null ,
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this),
        this._readyHandler = createjs.proxy(this._handleTagReady, this),
        this._stalledHandler = createjs.proxy(this._playFailed, this),
        this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this),
        this._loopHandler = createjs.proxy(this._handleSoundComplete, this),
        c ? this._audioSpriteStopTime = 0.001 * (b + c) : this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)
    }
    var a = createjs.extend(HTMLAudioSoundInstance, createjs.AbstractSoundInstance);
    a.setMasterVolume = function() {
        this._updateVolume()
    }
    ,
    a.setMasterMute = function() {
        this._updateVolume()
    }
    ,
    a.toString = function() {
        return "[HTMLAudioSoundInstance]"
    }
    ,
    a._removeLooping = function() {
        null  != this._playbackResource && (this._playbackResource.loop = !1,
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }
    ,
    a._addLooping = function() {
        null  == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
        this._playbackResource.loop = !0)
    }
    ,
    a._handleCleanUp = function() {
        var a = this._playbackResource;
        if (null  != a) {
            a.pause(),
            a.loop = !1,
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
            a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
            try {
                a.currentTime = this._startTime
            } catch (b) {}
            createjs.HTMLAudioTagPool.set(this.src, a),
            this._playbackResource = null 
        }
    }
    ,
    a._beginPlaying = function(a) {
        return this._playbackResource = createjs.HTMLAudioTagPool.get(this.src),
        this.AbstractSoundInstance__beginPlaying(a)
    }
    ,
    a._handleSoundReady = function() {
        if (4 !== this._playbackResource.readyState) {
            var a = this._playbackResource;
            return a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
            a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
            a.preload = "auto",
            void a.load()
        }
        this._updateVolume(),
        this._playbackResource.currentTime = 0.001 * (this._startTime + this._position),
        this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
        0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
        this._playbackResource.loop = !0)),
        this._playbackResource.play()
    }
    ,
    a._handleTagReady = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
        this._handleSoundReady()
    }
    ,
    a._pause = function() {
        this._playbackResource.pause()
    }
    ,
    a._resume = function() {
        this._playbackResource.play()
    }
    ,
    a._updateVolume = function() {
        if (null  != this._playbackResource) {
            var a = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
            a != this._playbackResource.volume && (this._playbackResource.volume = a)
        }
    }
    ,
    a._calculateCurrentPosition = function() {
        return 1000 * this._playbackResource.currentTime - this._startTime
    }
    ,
    a._updatePosition = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
        try {
            this._playbackResource.currentTime = 0.001 * (this._position + this._startTime)
        } catch (a) {
            this._handleSetPositionSeek(null )
        }
    }
    ,
    a._handleSetPositionSeek = function() {
        null  != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1),
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }
    ,
    a._handleAudioSpriteLoop = function() {
        this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(),
        0 == this._loop ? this._handleSoundComplete(null ) : (this._position = 0,
        this._loop--,
        this._playbackResource.currentTime = 0.001 * this._startTime,
        this._paused || this._playbackResource.play(),
        this._sendEvent("loop")))
    }
    ,
    a._handleLoop = function() {
        0 == this._loop && (this._playbackResource.loop = !1,
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }
    ,
    a._updateStartTime = function() {
        this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration),
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
    }
    ,
    a._updateDuration = function() {
        this._audioSpriteStopTime = 0.001 * (this._startTime + this._duration),
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
    }
    ,
    createjs.HTMLAudioSoundInstance = createjs.promote(HTMLAudioSoundInstance, "AbstractSoundInstance")
}
(),
this.createjs = this.createjs || {},
function() {
    function HTMLAudioPlugin() {
        this.AbstractPlugin_constructor(),
        this.defaultNumChannels = 2,
        this._capabilities = b._capabilities,
        this._loaderClass = createjs.SoundLoader,
        this._soundInstanceClass = createjs.HTMLAudioSoundInstance
    }
    var a = createjs.extend(HTMLAudioPlugin, createjs.AbstractPlugin)
      , b = HTMLAudioPlugin;
    b.MAX_INSTANCES = 30,
    b._AUDIO_READY = "canplaythrough",
    b._AUDIO_ENDED = "ended",
    b._AUDIO_SEEKED = "seeked",
    b._AUDIO_STALLED = "stalled",
    b._TIME_UPDATE = "timeupdate",
    b._capabilities = null ,
    b.isSupported = function() {
        return b._generateCapabilities(),
        null  != b._capabilities
    }
    ,
    b._generateCapabilities = function() {
        if (null  == b._capabilities) {
            var a = document.createElement("audio");
            if (null  == a.canPlayType) {
                return null 
            }
            b._capabilities = {
                panning: !1,
                volume: !0,
                tracks: -1
            };
            for (var c = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = c.length; f > e; e++) {
                var g = c[e]
                  , h = d[g] || g;
                b._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
        }
    }
    ,
    a.register = function(a) {
        var b = createjs.HTMLAudioTagPool.get(a.src)
          , c = this.AbstractPlugin_register(a);
        return c.setTag(b),
        c
    }
    ,
    a.removeSound = function(a) {
        this.AbstractPlugin_removeSound(a),
        createjs.HTMLAudioTagPool.remove(a)
    }
    ,
    a.create = function(a, b, c) {
        var d = this.AbstractPlugin_create(a, b, c);
        return d.setPlaybackResource(null ),
        d
    }
    ,
    a.toString = function() {
        return "[HTMLAudioPlugin]"
    }
    ,
    a.setVolume = a.getVolume = a.setMute = null ,
    createjs.HTMLAudioPlugin = createjs.promote(HTMLAudioPlugin, "AbstractPlugin")
}
();
function ImgLoader(property) {
    var onloadedcompleted, onloading, NUM_ELEMENTS, NUM_LOADED = 0, NUM_ERROR = 0, TempProperty = {}, LOADED_THEMES = {}, loadList = [];
    if (typeof (property) == "string") {
        NUM_ELEMENTS = 1;
        loadList[0] = property
    } else {
        NUM_ELEMENTS = property.length;
        loadList = property
    }
    this.assets = TempProperty;
    this.asset = LOADED_THEMES;
    this.completed = function(callback) {
        onloadedcompleted = callback
    }
    ;
    this.progress = function(callback) {
        onloading = callback
    }
    ;
    this.start = function() {
        for (var i = 0; i < NUM_ELEMENTS; i++) {
            load(loadList[i], imageLoaded, imageLoadError)
        }
        return TempProperty
    }
    ;
    function load(img, loaded, error) {
        var image = new Image();
        image.onload = loaded;
        image.onerror = error;
        image.src = img;
        TempProperty[img] = image
    }
    function imageLoaded() {
        var imgsrc = this.getAttribute("src");
        TempProperty[imgsrc].loaded = true;
        NUM_LOADED++;
        if (NUM_LOADED + NUM_ERROR == NUM_ELEMENTS) {
            typeof (onloadedcompleted) == "function" && onloadedcompleted(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR)
        } else {
            typeof (onloading) == "function" && onloading(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR)
        }
    }
    function imageLoadError() {
        var imgsrc = this.getAttribute("src");
        TempProperty[imgsrc].loaded = false;
        NUM_ERROR++;
        if (NUM_LOADED + NUM_ERROR == NUM_ELEMENTS) {
            typeof (onloadedcompleted) == "function" && onloadedcompleted(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR)
        } else {
            typeof (onloading) == "function" && onloading(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR)
        }
    }
}
;
var H5Sound = {
    load: function(sounds, fun) {
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this));
        createjs.Sound.registerSounds(sounds);
        var _num = 0;
        function soundLoaded(e) {
            _num++;
            if (_num >= sounds.length) {
                if (fun) {
                    fun()
                }
            }
        }
    },
    play: function(id, loop, completeFun) {
        var instance = createjs.Sound.play(id, createjs.Sound.INTERRUPT_ANY, 0, 0, loop - 1, 1, 0);
        if (instance == null  || instance.playState == createjs.Sound.PLAY_FAILED) {
            return
        }
        instance.addEventListener("complete", function(instance) {
            if (completeFun) {
                completeFun()
            }
        }
        )
    },
    stop: function(id) {
        createjs.Sound.stop(id)
    }
};
var basePath = "";
var loader = new WxMoment.Loader();
var fileList = ["../img/bg1.jpg", "../img/bg2.jpg", "../img/bg3.jpg", "../img/bg4.jpg", "../img/share.jpg", "../img/hand.png", "../img/yun1.png", "../img/yun2.png", "../img/assets2.png", "../img/assets3.png", "../img/assets4.png"];
for (var i = 0; i < fileList.length; i++) {
    loader.addImage(basePath + fileList[i])
}
loader.addProgressListener(function(e) {
    var percent = Math.round((e.completedCount / e.totalCount) * 100);
    $("#loadNum").html(percent + "%");
    $("#loadLine").css({
        "width": percent + "%"
    })
}
);
loader.addCompletionListener(function() {
    $("#loadNum").html("100%");
    $("#loadLine").css({
        "width": "100%"
    });
    setTimeout(function() {
        $("#loading").remove();
        $("#wrap").css("display", "block");
        $("#page0").css("display", "block");
        $(window).scrollTop = 0
    }
    , 400);
    loadSound()
}
);
loader.start();
var soundLock = 1;
var cunSoundID = -1;
var isSoundLoaded = false;
function loadSound() {
    var sounds = [{
        src: "../media/5.mp3",
        id: "s5"
    }, {
        src: "../media/1.mp3",
        id: "s1"
    }, {
        src: "../media/2.mp3",
        id: "s2"
    }, {
        src: "../media/3.mp3",
        id: "s3"
    }];
    H5Sound.load(sounds, soundLoadComplete);
    function soundLoadComplete() {
        $("#off").css({
            "display": "block"
        });
        isSoundLoaded = true;
        soundPlay(5)
    }
}
function soundStop(id) {
    if (cunSoundID < 0) {
        return
    }
    H5Sound.stop("s" + id)
}
function soundPlay(id) {
    if (isSoundLoaded) {
        if (soundLock == 1) {
            if (cunSoundID != id) {
                soundStop(cunSoundID);
                H5Sound.play("s" + id, 0);
                cunSoundID = id
            }
        }
    }
}
$(document).ready(function() {
    var _h = window.innerHeight;
    var ren = {
        marginLeft: ["-212", "-283", "-145", "-311", "-137", "-208", "-320", "-57", "-207", "-66", "-320", "64"],
        top: ["390", "530", "600", "700", "765", "869", "987", "991", "1121", "1152", "1167", "1137"]
    };
    var hua = {
        marginLeft: ["-68", "41", "-65", "-210", "-120", "-86", "-155"],
        top: ["379", "871", "51", "437", "787", "118", "615"],
        th: ["220", "670", "960", "1300", "1716", "2219"]
    };
    var car = {
        marginLeft: ["25", "167", "-346", "-123", "-102", "193"],
        top: ["853", "464", "443", "717", "310", "767"]
    };
    var niao = {
        position1: ["-101px -36px", "-130px -36px", "-159px -36px"],
        position2: ["-52px -36px", "-2px -36px", "-149px -2px"],
        position3: ["-51px -2px", "-2px -2px", "-100px -2px"]
    };
    var page = document.getElementsByClassName("page");
    var wrap = document.getElementById("wrap");
    var page0 = document.getElementById("page0");
    function init() {
        $("body").css({
            "scrollTop": "0px"
        });
        for (var i = 1; i <= 2; i++) {
            $("#page0").append("<div class='hua' id=talk" + i + ">");
            $("#talk" + i).css({
                "marginLeft": hua.marginLeft[i - 1] + "px",
                "top": hua.top[i - 1] + "px",
                "z-index": "2"
            })
        }
        for (var i = 3; i <= 5; i++) {
            $("#page1").append("<div class='hua' id=talk" + i + ">");
            $("#talk" + i).css({
                "marginLeft": hua.marginLeft[i - 1] + "px",
                "top": hua.top[i - 1] + "px",
                "z-index": "2"
            })
        }
        for (var i = 6; i <= 7; i++) {
            $("#page2").append("<div class='hua' id=talk" + i + ">");
            $("#talk" + i).css({
                "marginLeft": hua.marginLeft[i - 1] + "px",
                "top": hua.top[i - 1] + "px",
                "z-index": "2"
            })
        }
        $("#page0").append("<div id='tang'>");
        $("#page0").append("<div id='deng'>");
        var $index = 1;
        setInterval(function() {
            if ($index > 3) {
                $index = 1
            }
            $("#niao1").css({
                "background-position": niao.position1[$index]
            });
            $("#niao2").css({
                "background-position": niao.position2[$index]
            });
            $("#niao3").css({
                "background-position": niao.position3[$index]
            });
            $index++
        }
        , 200);
        touchp4();
        setTimeout(function() {
            $("#handa_title").css({
                "display": "block"
            })
        }
        , 3000);
    }
    init();
    $("#off").on("touchstart", function() {
        $(this).css({
            "display": "none"
        });
        $("#on").css({
            "display": "block"
        });
        H5Sound.stop("s1");
        H5Sound.stop("s2");
        H5Sound.stop("s3");
        H5Sound.stop("s4");
        H5Sound.stop("s5");
        soundLock = 0
    }
    );
    $("#on").on("touchstart", function() {
        $(this).css({
            "display": "none"
        });
        $("#off").css({
            "display": "block"
        });
        soundLock = 1;
        var _cunSoundID = cunSoundID;
        cunSoundID = -1;
        playMusic();
        if (_cunSoundID == 3) {
            soundPlay(3)
        }
    }
    );
    $("#off1").on("touchstart", function() {
        $(this).css({
            "display": "none"
        });
        $("#on1").css({
            "display": "block"
        });
        H5Sound.stop("s1");
        H5Sound.stop("s2");
        H5Sound.stop("s3");
        H5Sound.stop("s4");
        H5Sound.stop("s5");
        soundLock = 0
    }
    );
    $("#on1").on("touchstart", function() {
        $(this).css({
            "display": "none"
        });
        $("#off1").css({
            "display": "block"
        });
        soundLock = 1;
        var _cunSoundID = cunSoundID;
        cunSoundID = -1;
        playMusic();
        if (_cunSoundID == 3) {
            soundPlay(3)
        }
    }
    );
    var page0_t = 0;
    var pageH = ["1345", "1082", "1167", "948"];
    var pageT = ["0", "-1344", "-2427", "-3594"];
    var pageTOP = [parseInt(_h - 4542), parseInt(_h - 3197), parseInt(_h - 2115), parseInt(_h - 948)];
    var locked = false;
    function playMusic() {
        if (parseInt($(window).scrollTop()) >= 0 && parseInt($(window).scrollTop()) <= 750) {
            soundPlay(5)
        } else {
            if (parseInt($(window).scrollTop()) > 750 && parseInt($(window).scrollTop()) <= 1600) {
                soundPlay(1)
            } else {
                if (parseInt($(window).scrollTop()) > 1600 && parseInt($(window).scrollTop()) <= 2750) {
                    soundPlay(2)
                } else {
                    if (parseInt($(window).scrollTop()) > 2750) {
                        soundPlay(3)
                    } else {
                        if (parseInt($(window).scrollTop()) == null ) {
                            soundPlay(3)
                        }
                    }
                }
            }
        }
    }
    function lock() {
        setTimeout(function() {
            locked = false
        }
        , 700)
    }
    var talkTop = setInterval(function() {
        for (var i = 2; i <= 7; i++) {
            if (parseInt($(window).scrollTop()) >= hua.th[i - 2]) {
                $("#talk" + i).addClass("talk" + i)
            }
        }
        if (parseInt($(window).scrollTop()) > 1) {
            $("#up").remove()
        }
        playMusic();
        if (parseInt($(window).scrollTop()) < 3434 && parseInt($(window).scrollTop()) > 0) {
            $("#btnNext").css({
                "display": "none"
            })
        } else {
            if (parseInt($(window).scrollTop()) >= 3434) {
                $("#btnNext").css({
                    "display": "block"
                })
            }
        }
    }
    , 100);
    $("#btnNext").on("touchstart click", function() {
        $("#page4").css({
            "display": "block"
        });
        $("#page0,#page1").css({
            "display": "none"
        });
        setTimeout(function() {
            $("#page4").animate({
                "top": (4542 - _h) + "px"
            }, 500);
            $("body").css({
                "overflow": "hidden"
            })
        }
        , 10);
        setTimeout(function() {
            $("#backBtn").css({
                "display": "none"
            });
            $("#wrap").css({
                "display": "none"
            })
        }
        , 600);
        touchp4()
    }
    );
    document.getElementById("btnNext").addEventListener("touchmove", function(e) {
        e = e || window.event;
        e.preventDefault()
    }
    , false);
    var touchP5Lock = parseInt(1);
    function touchp4() {
        var sY, cY, eY;
        document.getElementById("page4").addEventListener("touchstart", function(e) {
            e = e || window.event;
            sY = !!e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        }
        , false);
        document.getElementById("page4").addEventListener("touchmove", function(e) {
            e = e || window.event;
            e.preventDefault();
            cY = !!e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        }
        , false);
        document.getElementById("page4").addEventListener("touchend", function(e) {
            e = e || window.event;
            eY = !!e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
            if (touchP5Lock > 0) {
                if (eY - sY > 50) {
                    if (locked) {
                        return
                    }
                    locked = true;
                    $("#wrap").css({
                        "display": "block"
                    });
                    $("#handb_title").css({
                        "display": "none"
                    });
                    setTimeout(function() {
                        $("#page4").animate({
                            "top": "4542px"
                        })
                    }
                    , 10);
                    setTimeout(function() {
                        $("body").css({
                            "overflow": "auto"
                        });
                        $("#page4").css({
                            "display": "none"
                        });
                        $("#backBtn").css({
                            "display": "block"
                        });
                        $("#page0,#page1").css({
                            "display": "block"
                        });
                        soundPlay(3)
                    }
                    , 520);
                    lock()
                }
            }
        }
        , false)
    }
    function setData(key, val) {
        var storage = window.sessionStorage;
        if (window.sessionStorage) {
            window.sessionStorage.setItem(key, val)
        } else {}
    }
    function getData(key) {
        if (window.sessionStorage) {
            return window.sessionStorage.getItem(key)
        } else {}
    }
    var datanum;
    function dectory() {
        setData("pageID", datanum)
    }
    $(".page5_btn").on("click", function() {
        datanum = $("#page4").attr("id")
    }
    );
    window.onunload = dectory;
    var hashs = {
        "page4": 4
    };
    var hashL = getData("pageID");
    $(function() {
        if (!hashL || !hashs[hashL]) {} else {
            touchP5Lock = -1;
            $("#wrap").remove();
            H5Sound.play("s3", 0);
            $("#backBtn").css({
                "display": "none"
            });
            $("#page4").css({
                "display": "block",
                "top": "0px"
            });
            $("#on").on("touchstart", function() {
                soundPlay(3)
            }
            )
        }
    }
    )
}
);
