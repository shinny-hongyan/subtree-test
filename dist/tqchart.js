import { timeFormat, scaleLinear, axisBottom, timeSecond, timeMinute, timeHour, timeDay, timeMonth, timeYear, axisLeft, axisRight, min as min$3, max as max$2, select, mouse, drag, event, zoom } from 'd3';

var version = "0.0.1";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.10' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$1 = _global.document;
var _html = document$1 && document$1.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if ( typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$1 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = ArrayValues;
    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
  }
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

const formatMillisecond = timeFormat('.%L');
const formatSecond = timeFormat(':%S');
const formatMinute = timeFormat('%H:%M');
const formatHour = timeFormat('%H:%M');
const formatDay = timeFormat('%m%d');
const formatMonth = timeFormat('%m%d');
const formatYear = timeFormat('%y');

function MultiFormat(date) {
  return (timeSecond(date) < date ? formatMillisecond : timeMinute(date) < date ? formatSecond : timeHour(date) < date ? formatMinute : timeDay(date) < date ? formatHour : timeMonth(date) < date ? formatDay : timeYear(date) < date ? formatMonth : formatYear)(date);
}

class XAxis {
  constructor(chart) {
    this.chart = chart;
    this.xScale = scaleLinear();
    this.xAxis = axisBottom().scale(this.xScale);

    this._init();
  }

  _init() {
    this.rootG = this.chart.rootG.append('g').attr('class', 'x axis');
    this.resetPosition();
  } // 柱子宽度 柱子个数 图表高度改变的时候调用


  resetPosition() {
    this.rootG.attr('transform', 'translate(' + Math.floor(this.chart.bar.barWidth / 2) + ',' + (this.chart.innerHeight + 1) + ')');
    this.xScale.rangeRound([0, this.chart.bar.barNumbers * this.chart.bar.barWidth - this.chart.bar.barWidth]);
  }

  draw(leftId, rightId, data) {
    this.xScale.domain([leftId, rightId]);
    this.xAxis.tickFormat((x, i) => {
      return data[x] && data[x].datetime ? MultiFormat(data[x].datetime / 1e6) : '';
    });
    this.rootG.call(this.xAxis);
  }

}

function FormatPrice(price) {
  let priceDecs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  const n = Number(price);
  const decs = Number.isInteger(priceDecs) ? priceDecs : 2;
  return Number.isFinite(n) ? n.toFixed(decs) : price;
}

class Crosshair {
  constructor(chart) {
    this.tqchart = chart; // 覆盖整个 chart.svg

    this.svgG = this.tqchart.svg.append('g').attr('class', 'crosshair-container').attr('visibility', 'hidden'); // 覆盖 chart.rootG

    this.rootG = this.svgG.append('g').attr('class', 'crosshair-content').attr('transform', 'translate(' + this.tqchart.margin.left + ',' + this.tqchart.margin.top + ')'); // 矩形框，鼠标样式在此矩形框上面改变

    this.rectG = this.rootG.append('rect').attr('class', 'crosshair-cursor').attr('width', this.tqchart.innerWidth).attr('height', this.tqchart.innerHeight); // K线信息 kline panel

    this.klinePanel = this.svgG.append('g').attr('class', 'kline panel');
    this.klinePanelWidth = 100;
    this.klinePanelHeight = 144;
    this.klinePanelDefaultColor = '#333333';
    this.klinePanel.append('rect').attr('x', 0.5).attr('y', 0.5).attr('width', this.klinePanelWidth).attr('height', this.klinePanelHeight).attr('stroke', '#DDDDDD');
    this.klinePanel.append('text').attr('x', 0).attr('y', 0);

    this._initCrosshairline();

    this._initAxisannotation();
  }

  _initCrosshairline() {
    this.rootG.append('g').attr('class', 'crosshair horizontal').append('line').attr('x1', 0).attr('y1', 0).attr('x2', this.tqchart.innerWidth).attr('y2', 0).attr('stroke', '#aaaaaa').attr('stroke-dasharray', '2');
    this.rootG.append('g').attr('class', 'crosshair vertical').append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', this.tqchart.innerHeight).attr('stroke', '#aaaaaa').attr('stroke-dasharray', '2');
  }

  _initAxisannotation() {
    this.rootG.append('g').attr('class', 'axisannotation x').attr('transform', 'translate(0,' + (this.tqchart.innerHeight + 2) + ')');
    this.rootG.append('g').attr('class', 'axisannotation y left').attr('transform', 'translate(-' + (this.tqchart.margin.left - 1) + ',0)');
    this.rootG.append('g').attr('class', 'axisannotation y right').attr('transform', 'translate(' + (this.tqchart.innerWidth + 1) + ',0)');
    this.rootG.select('g.axisannotation.x').append('rect').style('fill', '#eeeeee').attr('opacity', '0.8').attr('width', '120px').attr('height', '14px');
    this.rootG.select('g.axisannotation.x').append('text').attr('x', 1).attr('y', 12);
    this.rootG.select('g.axisannotation.y.left').append('rect').style('fill', '#FAFAFA').attr('opacity', '0.9').attr('width', this.tqchart.margin.left - 2).attr('height', '16px');
    this.rootG.select('g.axisannotation.y.left').append('text').attr('x', this.tqchart.margin.left - 2).attr('y', 13).attr('text-anchor', 'end');
    this.rootG.select('g.axisannotation.y.right').append('rect').style('fill', '#FAFAFA').attr('opacity', '0.9').attr('width', this.tqchart.margin.right - 2).attr('height', '16px');
    this.rootG.select('g.axisannotation.y.right').append('text').attr('x', 2).attr('y', 13);
  } // 整个图表放大缩小的时候调用


  resize() {
    this.rectG.attr('width', this.tqchart.innerWidth).attr('height', this.tqchart.innerHeight);
    this.rootG.select('g.crosshair.horizontal line').attr('x2', this.tqchart.innerWidth);
    this.rootG.select('g.crosshair.vertical line').attr('y2', this.tqchart.innerHeight);
    this.rootG.select('g.axisannotation.x').attr('transform', 'translate(0,' + this.tqchart.innerHeight + ')');
    this.rootG.select('g.axisannotation.y.right').attr('transform', 'translate(' + (this.tqchart.innerWidth + 1) + ',0)');
  }

  update(x, y) {
    // x y 相对于 rootG 的位置
    const xBarsNum = Math.floor(x / this.tqchart.bar.barWidth);
    const xAlign = xBarsNum * this.tqchart.bar.barWidth + this.tqchart.bar.barWidth / 2; // 更新 水平线 垂直线

    this.rootG.select('g.crosshair.horizontal line').attr('y1', y + 0.5).attr('y2', y + 0.5);
    this.rootG.select('g.crosshair.vertical line').attr('x1', xAlign).attr('x2', xAlign);
    const mainSeries = this.tqchart.mainSeries;

    if (mainSeries && mainSeries.last_id > -1 && mainSeries.data && this.tqchart.range.leftId > -1) {
      const id = this.tqchart.range.leftId + xBarsNum; // 当前指向 id

      const data = mainSeries.data[id]; // 当前指向 kline

      const preData = mainSeries.data[id - 1];
      if (!data) return;

      this._updateKlinePanel(xAlign, data, preData); // 更新kline面板


      this._updateXAxisannotation(xAlign, data.datetime); // 更新 axisannotation x


      const board = this.tqchart.getBoardByYPosition(y);
      if (board) this._updateYAxisannotation(y, board); // 更新 axisannotation y
    }
  }

  _updateKlinePanel(x, data, preData) {
    const strs = [timeFormat('%Y-%m-%d (%w)')(data.datetime / 1e6), // 0
    timeFormat('%H:%M:%S')(data.datetime / 1e6), // 1
    '开盘', // 2
    FormatPrice(data.open, this.tqchart.price_decs), // 3
    '最高', // 4
    FormatPrice(data.high, this.tqchart.price_decs), // 5
    '最低', // 6
    FormatPrice(data.low, this.tqchart.price_decs), // 7
    '收盘', // 8
    FormatPrice(data.close, this.tqchart.price_decs), // 9
    '成交量', // 10
    data.volume, // 11
    '持仓量', // 12
    data.close_oi // 13
    ];
    let change = null;

    if (preData && preData.close) {
      change = FormatPrice(data.close - preData.close, this.tqchart.price_decs);
      strs.push('涨跌'); // 14

      strs.push(change); // 15

      strs.push('涨跌幅'); // 16

      strs.push(FormatPrice(change / preData.close * 100, 2) + '%'); // 17
    }

    const selections = this.klinePanel.select('text').selectAll('tspan').data(strs);
    selections.enter().append('tspan').merge(selections).attr('x', (d, i) => i > 1 && i % 2 === 1 ? this.klinePanelWidth - 1 : 1).attr('dy', (d, i) => i > 1 && i % 2 === 1 ? '0px' : '14px').attr('text-anchor', (d, i) => i > 1 && i % 2 === 1 ? 'end' : 'start').attr('class', (d, i) => {
      if (i === 15 || i === 17) {
        if (change > 0) return 'up';
        if (change < 0) return 'down';
      }

      return '';
    }).text(d => d).exit().remove();
    let leftPadding = 2;

    if (x < this.klinePanelWidth - this.tqchart.margin.left) {
      leftPadding = this.tqchart.outerWidth - 2 - this.klinePanelWidth;
    }

    this.klinePanel.attr('transform', 'translate(' + leftPadding + ',0)');
  }

  _updateXAxisannotation(x, datetime) {
    this.rootG.select('g.axisannotation.x rect').attr('x', x - 40);
    this.rootG.select('g.axisannotation.x text').text(timeFormat('%Y-%m-%d %H:%M:%S')(datetime / 1e6)).attr('x', x - 38);
  }

  _updateYAxisannotation(y, board) {
    for (const align of ['left', 'right']) {
      const yAxis = board[align + 'YAxis'];
      const selector = ['g', 'axisannotation', 'y', align].join('.');

      if (yAxis) {
        const val = FormatPrice(yAxis.yScale.invert(y - board.top), board.boardId === 'main' && align === 'right' && this.tqchart.price_decs ? this.tqchart.price_decs : 0);

        if (!Number.isNaN(val)) {
          this.rootG.select(selector).attr('visibility', 'visible');
          this.rootG.select(selector + ' rect').attr('y', y - 10);
          this.rootG.select(selector + ' text').text(val).attr('y', y + 2);
          continue;
        }
      }

      this.rootG.select('g.axisannotation.y.left').attr('visibility', 'hidden');
    }
  }

  show() {
    this.svgG.attr('visibility', 'visible');
  }

  hide() {
    this.svgG.attr('visibility', 'hidden');
    this.rootG.selectAll('g.axisannotation.y').attr('visibility', 'hidden');
  }

  drag(draging) {
    if (draging) {
      this.rectG.attr('class', 'crosshair-cursor drag');
    } else {
      this.rectG.attr('class', 'crosshair-cursor');
    }
  }

}

class YAxis {
  constructor(board, align) {
    this.board = board;
    this.align = align;
    this.yScale = scaleLinear().range([this.board.height, 0]);
    this.yAxis = align === 'left' ? axisLeft() : axisRight();
    this.yAxis.scale(this.yScale);

    this._init();
  }

  _init() {
    this.rootG = this.board.rootG.append('g').attr('class', 'y axis ' + this.align);
    this.resetPosition();
  } // 图表宽度 = board宽度 改变的时候调用
  // 图表高度 = board高度 改变的时候调用


  resetPosition() {
    this.yScale.range([this.board.height, 0]);

    if (this.align === 'right') {
      this.rootG.attr('transform', 'translate(' + this.board.width + ',0)');
    }
  }

  getTicks() {
    const result = [];
    const that = this;
    this.rootG.selectAll('.tick').each(function (data) {
      result.push(Math.round(that.yScale(data)));
    });
    return result;
  } // board draw 用来绘制 YAxis


  draw(domain) {
    // 绘制Y轴的范围
    this.yScale.domain(domain);
    this.yAxis.ticks(this.board.boardId === 'main' ? 6 : 3);
    this.rootG.call(this.yAxis);
  }

}

class ChartBackground {
  constructor(tqchart, parentSvg) {
    let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'vertical';
    let board = arguments.length > 3 ? arguments[3] : undefined;
    // 背景格子 竖线
    this.tqchart = tqchart;
    this.parentSvg = parentSvg;
    this.board = board;
    this.rootG = this.parentSvg.append('g').attr('class', 'background');
    this.direction = direction; //  vertical | horizontal

    if (this.direction === 'horizontal') {
      this.rootG.append('line').attr('class', 'border').attr('x1', -this.tqchart.margin.left).attr('y1', -0.5).attr('x2', this.tqchart.innerWidth + this.tqchart.margin.right).attr('y2', -0.5);
    }
  }

  clear() {
    this.rootG.selectAll('line').remove();
  }

  draw() {
    if (this.direction === 'vertical') {
      const ticks = this.tqchart.xAxis.getTicks();

      this._drawVerticalLines(ticks);
    } else if (this.direction === 'horizontal') {
      const ticks = this.board.rightYAxis.getTicks();

      this._drawHorizontalLines(ticks);
    }
  }

  resize() {
    if (this.direction === 'vertical') {
      this.rootG.selectAll('line').attr('y2', this.tqchart.innerHeight);
    } else if (this.direction === 'horizontal') {
      this.rootG.selectAll('line').attr('x2', this.tqchart.innerWidth);
    }
  }

  _drawVerticalLines(data) {
    const height = this.tqchart.innerHeight;
    const selections = this.rootG.selectAll('line.bgline').data(data);
    selections.enter().append('line').attr('class', 'bgline').attr('y1', 0).attr('y2', height).merge(selections).attr('x1', d => d).attr('x2', d => d);
    selections.exit().remove();
  }

  _drawHorizontalLines(data) {
    const width = this.tqchart.innerWidth;
    const selections = this.rootG.selectAll('line.bgline').data(data);
    selections.enter().append('line').attr('class', 'bgline').attr('x1', 0).attr('x2', width).merge(selections).attr('y1', d => d + 0.5).attr('y2', d => d + 0.5);
    selections.exit().remove();
  }

}

const PLOT_PADDING = 2;

class ChartBoard {
  constructor(chart, boardId, top, height, hasLeftYAxis) {
    this.tqchart = chart;
    this.boardId = boardId;
    this.top = top;
    this.height = height;
    this.width = this.tqchart.innerWidth; // 当前 board 的根结点
    //    包含 plotG --- 放置主要图形
    //    包含 markG --- 放置标识层
    //    包含 leftYAxis / rightYAxis
    // 拖动图表时，* 不足以移动一根柱子时 --> 只移动 plotG markG
    //           * 需要移动柱子时 --> 移动 plotG markG && YAxis 缩放

    this.rootG = this.tqchart.rootG.append('g').attr('class', this.boardId).attr('transform', 'translate(0,' + this.top + ')');
    this.background = new ChartBackground(this.tqchart, this.rootG, 'horizontal', this);
    this.plotG = this.rootG.append('g').attr('class', this.boardId + ' plots'); // 当前 board 放置标志的层

    this.maskG = this.rootG.append('mask').attr('id', 'mask-' + this.boardId).append('rect').attr('x', '0').attr('y', '0').attr('width', this.width).attr('height', this.height).style('fill', '#FFFFFF').attr('stroke', 'none');
    this.markG = this.rootG.append('g').attr('mask', 'url(#' + 'mask-' + this.boardId + ')').attr('class', this.boardId + ' marks');
    this.nameG = this.markG.append('text').attr('class', this.boardId + ' name text').attr('dy', '12').attr('dx', '2').text(this.boardId.toUpperCase()); // 初始化 Y 轴

    this.leftYAxis = new YAxis(this, 'left');
    this.rightYAxis = new YAxis(this, 'right');
  } // board 位置 大小 改变的时候调用


  resetPosition() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$top = _ref.top,
        top = _ref$top === void 0 ? this.top : _ref$top,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? this.height : _ref$height;

    // top 改变
    this.top = top;
    this.rootG.attr('transform', 'translate(0,' + this.top + ')'); // height width 改变的时候

    this.height = height;
    this.width = this.tqchart.innerWidth;
    this.maskG.attr('width', this.width).attr('height', this.height);
    this.background.resize();
    if (this.leftYAxis) this.leftYAxis.resetPosition();
    this.rightYAxis.resetPosition();
  }

  setDomain(domain) {
    let align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'right';
    this[align + 'Domain'] = domain;
  }

  draw(l, r, data) {
    this.leftYAxis.draw(this.leftDomain);
    this.rightYAxis.draw(this.rightDomain);
    this.background.draw();
  }

  remove() {
    this.rootG.remove();
  }

  static GetMutilPlotsHeight(plotsNumber, height) {
    // 根据总高度和图表间隔返回每个部分的高度
    const avalibleHeight = height - PLOT_PADDING * (plotsNumber - 1);
    const avg = 1 / plotsNumber;
    const othersHeight = Math.ceil(avalibleHeight * avg * 0.7);
    const firstHeight = avalibleHeight - othersHeight * (plotsNumber - 1);
    const positions = [{
      top: 0,
      height: firstHeight
    }];

    for (let i = 1; i < plotsNumber; i++) {
      positions[i] = {
        height: othersHeight,
        top: positions[i - 1].top + positions[i - 1].height + PLOT_PADDING
      };
    }

    return positions;
  }

}

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var at = _stringAt(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var _advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var _regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (_classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

// 21.2.5.3 get RegExp.prototype.flags

var _flags = function () {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var _regexpExec = patchedExec;

_export({
  target: 'RegExp',
  proto: true,
  forced: _regexpExec !== /./.exec
}, {
  exec: _regexpExec
});

var SPECIES$1 = _wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

var _fixReWks = function (KEY, length, exec) {
  var SYMBOL = _wks(KEY);

  var DELEGATES_TO_SYMBOL = !_fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$1] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      _defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === _regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    _redefine(String.prototype, KEY, strfn);
    _hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX$1 = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = _regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX$1];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = _anObject(regexp);
      var S = String(this);
      var C = _speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = _advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = _anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = _regexpExecAbstract(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = _toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

// 21.2.5.3 get RegExp.prototype.flags()
if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  _redefine(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = _anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

var moment = createCommonjsModule(function (module, exports) {
(function (global, factory) {
     module.exports = factory() ;
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && ('object' !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));
});

const formatMillisecond$1 = timeFormat('.%L');
const formatSecond$1 = timeFormat(':%S');
const formatMinute$1 = timeFormat('%H:%M');
const formatHour$1 = timeFormat('%H:%M');
const formatDay$1 = timeFormat('%m%d');
const formatMonth$1 = timeFormat('%m%d');
const formatYear$1 = timeFormat('%y');

const ParseDuartionToString = function ParseDuartionToString(duration) {
  let parseString = '';

  if (duration && duration >= 1e9) {
    const dur = moment.duration(duration / 1e9, 'seconds');
    if (dur.years() > 0) parseString += dur.years() + 'Y';
    if (dur.months() > 0) parseString += dur.months() + 'M';
    if (dur.days() > 0) parseString += dur.days() + 'D';
    if (dur.hours() > 0) parseString += dur.hours() + 'h';
    if (dur.minutes() > 0) parseString += dur.minutes() + 'm';
    if (dur.seconds() > 0) parseString += dur.seconds() + 's';
  }

  return parseString;
};

const UpDown = {
  up: d => d.open <= d.close,
  down: d => d.open > d.close
};
const UpDownKeys = Object.keys(UpDown);
const UpDownEqual = {
  up: d => d.open < d.close,
  down: d => d.open > d.close,
  equal: d => d.open === d.close
};
const UpDownEqualKeys = Object.keys(UpDownEqual);

const createLog = function createLog(style, title, titleColor) {
  return function () {
    const args = Array.from(arguments).join(' ');
    const titleStyle = `color: white; background-color: ${titleColor};`;
    console.log.apply(this, ['%c ' + title + ' %c ' + args, titleStyle, style]);
  };
};

const CreateConsole = function CreateConsole() {
  let title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'TqChart';
  let titleColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'plum';
  return {
    log: createLog('color: green;', title, titleColor),
    info: createLog('color: blue;', title, titleColor),
    debug: createLog('color: pink;', title, titleColor),
    warn: createLog('color: orange;', title, titleColor),
    error: createLog('color: red;', title, titleColor)
  };
};

const isInteger = v => Number.isInteger(Number(v));

const RevertColor = function RevertColor(originColor) {
  let color = typeof originColor === 'string' ? originColor : ''; // rgba rgb 34

  if (isInteger(originColor)) {
    const colorStr = originColor.toString(16).padStart(8, 'F'); // argb

    const a = parseInt(colorStr.slice(0, 2), 16) / 255;
    const r = parseInt(colorStr.slice(2, 4), 16);
    const g = parseInt(colorStr.slice(4, 6), 16);
    const b = parseInt(colorStr.slice(6), 16);
    color = `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  return color;
};

class BasePath {
  constructor() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        bar = _ref.bar;

    this.id = id || new Date().getTime();
    this.bar = bar;
    this.xScale = xScale;
    this.yScale = yScale;
    this.paths = [];
  }

}

class Candle extends BasePath {
  constructor() {
    let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref2.id,
        xScale = _ref2.xScale,
        yScale = _ref2.yScale,
        bar = _ref2.bar;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    UpDownEqualKeys.forEach(k => this.paths.push([this.id, 'candle', 'line', k].join('.')));
    UpDownEqualKeys.forEach(k => this.paths.push([this.id, 'candle', 'body', k].join('.')));
  }

  getYDomain(leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1);
    let _ref3 = [min$3(list, d => d && d.low), max$2(list, d => d && d.high)],
        min = _ref3[0],
        max = _ref3[1];
    min -= (max - min) * 0.2;
    max += (max - min) * 0.2;
    return [min, max];
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    const _path = {};
    this.paths.forEach(function (k) {
      _path[k] = '';
    });

    for (let i = leftId; i <= rightId; i++) {
      if (this.id === 'kline') console.info(i, data, data[i]);
      if (!data[i]) continue;
      UpDownEqualKeys.forEach(key => {
        if (UpDownEqual[key](data[i])) {
          const diff = key === 'up' ? 0.5 : 0;
          _path[[this.id, 'candle', 'body', key].join('.')] += this._bodyPath(data[i], i, diff);
          _path[[this.id, 'candle', 'line', key].join('.')] += this._linePath(data[i], i);
        }
      });
    }

    return _path;
  }

  _bodyPath(d, id, diff) {
    const o = Math.round(this.yScale(d.open)) + diff;
    const c = Math.round(this.yScale(d.close)) + diff;
    const x = this.xScale(id) + this.bar.barPadding;
    if (Number.isNaN(o) || Number.isNaN(c) || Number.isNaN(x)) return '';
    const width = this.bar.barWidth - this.bar.barPadding * 2;

    if (o !== c) {
      return `M${x + diff} ${o} L${x + width - diff} ${o} L${x + width - diff} ${c} L${x + diff} ${c} L${x + diff} ${o}`;
    } else {
      return `M${x} ${o + 0.5} L${x + width} ${o + 0.5}`;
    }
  }

  _linePath(d, id) {
    const h = Math.round(this.yScale(d.high));
    const l = Math.round(this.yScale(d.low));
    const x = this.xScale(id) + this.bar.barWidth / 2;
    if (Number.isNaN(h) || Number.isNaN(l) || Number.isNaN(x)) return '';
    return `M ${x} ${h} L ${x} ${l}`;
  }

}

class Volume extends BasePath {
  constructor() {
    let _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref4.id,
        xScale = _ref4.xScale,
        yScale = _ref4.yScale,
        bar = _ref4.bar;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    UpDownKeys.forEach(k => this.paths.push([this.id, 'body', k].join('.')));
  }

  getYDomain(leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1);
    return [0, max$2(list, d => d && d.volume) * 1.2];
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    const _path = {};
    this.paths.forEach(function (k) {
      _path[k] = '';
    });

    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue;
      UpDownKeys.forEach(key => {
        if (UpDown[key](data[i])) {
          // _path[[this.id, 'body', key].join('.')] += this.bodyPath(data[i], i, 0) // 实心矩形
          _path[[this.id, 'body', key].join('.')] += this.bodyPath(data[i], i, key === 'up' ? 0.5 : 0); // 空心矩形需要+0.5
        }
      });
    }

    return _path;
  }

  bodyPath(d, id, diff) {
    const max = Math.ceil(this.yScale(0)) + (diff === 0 ? 1 : diff);
    const vol = Math.min(Math.round(max - this.yScale(d.volume)), max - diff);
    const x = this.xScale(id) + this.bar.barPadding;
    const width = this.bar.barWidth - this.bar.barPadding * 2;
    const path = `M${x + diff} ${max}L${x + width - diff} ${max}L ${x + width - diff} ${max - vol}L${x + diff} ${max - vol}L${x + diff} ${max}`;
    return path;
  }

}

class Oi extends BasePath {
  constructor() {
    let _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref5.id,
        xScale = _ref5.xScale,
        yScale = _ref5.yScale,
        bar = _ref5.bar;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    this.paths = ['oi'];
  }

  getYDomain(leftId, rightId, data) {
    const list = data.slice(leftId, rightId + 1);
    let _ref6 = [min$3(list, d => d && d.close_oi), max$2(list, d => d && d.close_oi)],
        min = _ref6[0],
        max = _ref6[1];
    min -= (max - min) * 0.2;
    max += (max - min) * 0.2;
    return [min, max];
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    let _path = '';

    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue;
      const oi = this.yScale(data[i].close_oi);
      const x = this.xScale(i) + this.bar.barWidth / 2;
      _path += _path === '' ? 'M' : 'L';
      _path += `${x} ${oi} `;
    }

    return {
      oi: _path
    };
  }

}

class Line extends BasePath {
  constructor() {
    let _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref7.id,
        xScale = _ref7.xScale,
        yScale = _ref7.yScale,
        bar = _ref7.bar,
        propName = _ref7.propName,
        min = _ref7.min,
        max = _ref7.max;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    this.min = min;
    this.max = max;
    this.propName = propName || 'value';
    this.paths = ['value'];
  }

  getYDomain(leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max];
    } else {
      const list = data.slice(leftId, rightId + 1);
      return [min$3(list, d => d && d[this.propName]), max$2(list, d => d && d[this.propName])];
    }
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    let _path = 'M';

    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) {
        if (!_path.endsWith('M')) _path += 'M';
        continue;
      }

      const val = this.yScale(data[i][this.propName]);
      const x = this.xScale(i) + this.bar.barWidth / 2;

      if (val === undefined || Number.isNaN(val) || Number.isNaN(x)) {
        if (!_path.endsWith('M')) _path += 'M';
      } else {
        _path += _path.endsWith('M') ? '' : 'L';
        _path += `${x} ${val}`;
      }
    }

    return {
      value: _path.replace(/[LM]$/, '')
    };
  }

}

class Bar extends BasePath {
  constructor() {
    let _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref8.id,
        xScale = _ref8.xScale,
        yScale = _ref8.yScale,
        bar = _ref8.bar,
        propName = _ref8.propName,
        isHollow = _ref8.isHollow,
        min = _ref8.min,
        max = _ref8.max;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    this.isHollow = isHollow || false; // 是否空心

    this.min = min;
    this.max = max;
    this.propName = propName || 'value';
    this.paths = ['value'];
  }

  getYDomain(leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max];
    } else {
      const list = data.slice(leftId, rightId + 1);
      return [0, max$2(list, d => d && d[this.propName])];
    }
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    let _path = '';

    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue;
      _path += this.bodyPath(data[i], i, this.isHollow ? 0.5 : 0); // 空心矩形需要+0.5
    }

    return {
      value: _path
    };
  }

  bodyPath(d, id, diff) {
    const max = Math.floor(this.yScale(0));
    const val = Math.round(max - this.yScale(d[this.propName]));
    const x = this.xScale(id) + this.bar.barPadding;
    if (Number.isNaN(val) || Number.isNaN(x)) return '';
    const width = this.bar.barWidth - this.bar.barPadding * 2;
    return `M ${x + diff} ${max - diff} L ${x + width - diff} ${max - diff} L ${x + width - diff} ${max - val + diff} L ${x + diff} ${max - val + diff} L ${x + diff} ${max - diff}`;
  }

}

class Dot extends BasePath {
  constructor() {
    let _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref9.id,
        xScale = _ref9.xScale,
        yScale = _ref9.yScale,
        bar = _ref9.bar,
        propName = _ref9.propName,
        min = _ref9.min,
        max = _ref9.max;

    super({
      id,
      xScale,
      yScale,
      bar
    });
    this.min = min;
    this.max = max;
    this.propName = propName || 'value';
    this.paths = ['value'];
  }

  getYDomain(leftId, rightId, data) {
    if (Number.isFinite(this.min) && Number.isFinite(this.max)) {
      return [this.min, this.max];
    } else {
      const list = data.slice(leftId, rightId + 1);
      return [min$3(list, d => d && d[this.propName]), max$2(list, d => d && d[this.propName])];
    }
  }

  calcPaths(leftId, rightId, data) {
    if (!this.yScale || !this.xScale || !this.bar) return;
    let _path = '';

    for (let i = leftId; i <= rightId; i++) {
      if (!data[i]) continue;
      const cy = this.yScale(data[i][this.propName]);
      const cx = this.xScale(i) + this.bar.barWidth / 2;
      if (Number.isNaN(cy) || Number.isNaN(cx)) continue;
      const r = 3; // Math.min(this.bar.barWidth, 5)

      _path += `M ${cx - r} ${cy} a ${r}, ${r} 0 1,0 ${r * 2},0 a ${r}, ${r} 0 1,0 ${-r * 2},0 `;
    }

    return {
      value: _path
    };
  }

}

class ChartPlot {
  constructor() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        chart = _ref.chart,
        boardId = _ref.boardId,
        _ref$plotId = _ref.plotId,
        plotId = _ref$plotId === void 0 ? '' : _ref$plotId,
        _ref$yAlign = _ref.yAlign,
        yAlign = _ref$yAlign === void 0 ? 'right' : _ref$yAlign,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'candle' : _ref$type,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'red' : _ref$color,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 2 : _ref$width,
        _ref$dash = _ref.dash,
        dash = _ref$dash === void 0 ? false : _ref$dash,
        data = _ref.data;

    this.chart = chart;
    this.boardId = boardId;
    this.plotId = plotId;
    this.yAlign = yAlign;
    this.board = this.chart.boards[boardId]; // TODO data 属性放在 Plot 里面

    this.data = data;
    this.type = type;
    this.color = color;
    this.width = Number.isFinite(width) ? Math.round(width) : 2;
    this.dash = dash;
    this.g = this.board.plotG.append('g').attr('class', `plot ${this.boardId} ${this.plotId}`);
    this.path = null;

    this._initPath();
  }

  _initPath() {
    switch (this.type) {
      case 'candle':
        this.path = new Candle({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'volume':
        this.path = new Volume({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'oi':
        this.path = new Oi({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'dash':
        this.path = new Line({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'line':
        this.path = new Line({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'bar':
        this.path = new Bar({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;

      case 'dot':
        this.path = new Dot({
          id: this.plotId,
          xScale: this.chart.xAxis.xScale,
          yScale: this.chart.boards[this.boardId][this.yAlign + 'YAxis'].yScale,
          bar: this.chart.bar
        });
        break;
    } // append 相应的 paths 到 plot


    for (let i = 0; i < this.path.paths.length; i++) {
      this._appendPlotTypePath(this.path.paths[i]);
    }
  } // classNames ['hij', 'foo']


  _appendPlotTypePath(classNames) {
    if (!Array.isArray(classNames)) classNames = classNames.split('.');
    this.g.selectAll(`path.${classNames.join('.')}`).data(d => [d]).enter().append('path').attr('class', classNames.join(' '));

    if (this.type === 'line' || this.type === 'dash') {
      const color = typeof this.color === 'string' ? this.color : '';
      this.g.selectAll(`path.${classNames.join('.')}`).style('fill', 'none').attr('stroke', color).attr('stroke-width', this.width + 'px').attr('stroke-dasharray', this.dash ? '4 4' : '0');
    } else if (this.type === 'bar') {
      this.g.selectAll(`path.${classNames.join('.')}`).style('fill', this.color).attr('stroke', 'none');
    } else if (this.type === 'dot') {
      this.g.selectAll(`path.${classNames.join('.')}`).style('fill', this.color).attr('stroke', 'none');
    }
  }

  getYDomain(l, r, data) {
    return this.path.getYDomain(l, r, data);
  }

  draw(l, r, data) {
    const paths = this.path.calcPaths(l, r, data);

    for (const key in paths) {
      try {
        this.g.select(`path.${key}`).attr('d', paths[key]);
      } catch (error) {
        this.chart.tqChartConsole.error(error);
      }
    }
  }

  remove() {
    this.g.remove();
  }

}

class HighlightBar {
  constructor(tqchart, id, klineId) {
    this.tqchart = tqchart;
    this.id = id;
    this.klineId = klineId;
  }

  update(klineId) {
    this.klineId = klineId;
  }

  resize() {
    this.g.attr('width', this.tqchart.bar.barWidth).attr('height', this.tqchart.innerHeight);
  }

  draw() {
    if (!this.g) {
      this.g = this.tqchart.bgShapesG.append('rect').attr('class', 'highlight').attr('width', this.tqchart.bar.barWidth).attr('height', this.tqchart.innerHeight);
    }

    const leftPx = this.tqchart.chartController.revertIdToPx(this.klineId);
    this.g.attr('transform', `translate(${leftPx},0)`);
  }

  clear() {
    this.g.remove();
  }

}

/**
 * 这些被管理类需要实现：
 * new XXX(tqchart, id, ...args)
 * update(...args)
 * clear()
 * ************
 * draw()
 * **************
 * hide()
 * show()
 */

const Classes = {
  HighlightBar
};

class ChartManager {
  constructor(tqchart, managerId, typeClass) {
    this.tqchart = tqchart;
    this.managerId = managerId;
    this.typeClass = typeClass;
    this.contents = {};
  }

  add(key) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.contents[key]) {
      this.contents[key].update(...args);
    } else {
      this.contents[key] = new Classes[this.typeClass](this.tqchart, key, ...args);
    }

    return this.contents[key];
  }

  each(funcName, filterFunc) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    for (const key in this.contents) {
      if (this.contents[key]) {
        const element = this.contents[key];
        element[funcName](filterFunc, ...args);
      }
    }
  }

  get(key) {
    return this.contents[key] || null;
  }

  remove(key) {
    this.contents[key].clear();
    delete this.contents[key];
  }

  removeAll() {
    for (const key in this.contents) {
      this.contents[key].clear();
      delete this.contents[key];
    }
  }

}

/***
 * 标志一个点的位置可以有几种形式
 * -----------------------------------------------------
 * X 轴  优先级排列        Y 轴 优先级排列
 * -----------------------------------------------------
 * 1 xPos 坐标轴px      | 1 yPos 坐标轴px值
 * 2 x    柱子在id      | 2 y    y值,在k线图上就是价格
 * -----------------------------------------------------
 *
 * -----------------------------------------------------
 * 矩形 优先级
 * -----------------------------------------------------
 * 1 (x1,y1) + (width, height)
 * 2 (x1,y1) + (x2, y2)
 * -----------------------------------------------------
 * 支持 3 种类型 line  rect  arrow
 ***/

/**
 * ChartMark 两大类
 * a. 一个点决定位置 Text Arrow
 * b. 两个点决定位置 line rect
 */
class ChartMark {
  constructor() {
    let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        chart = _ref.chart,
        board = _ref.board,
        boardId = _ref.boardId,
        parentG = _ref.parentG,
        type = _ref.type,
        yAlign = _ref.yAlign,
        fill = _ref.fill,
        fillOpacity = _ref.fillOpacity,
        stroke = _ref.stroke,
        strokeWidth = _ref.strokeWidth,
        strokeOpacity = _ref.strokeOpacity,
        strokeDasharray = _ref.strokeDasharray;

    this.id = id || new Date().getTime();
    this.chart = chart;
    this.boardId = boardId || 'main';
    this.board = board || this.chart.boards[this.boardId];
    this.parentG = parentG;

    if (parentG) {
      this.g = parentG.append('g').attr('class', this.boardId + ' mark ' + type + ' ' + this.id);
    } else {
      this.g = this.board.markG.append('g').attr('class', this.boardId + ' mark ' + type + ' ' + this.id);
    }

    this.yAlign = yAlign || 'right';
    this.type = type;
    this.fill = fill || 'none';
    this.fillOpacity = fillOpacity || 0.5;
    this.stroke = stroke || '#bbbbbb';
    this.strokeWidth = strokeWidth || 1;
    this.strokeOpacity = strokeOpacity || 0.5;
    this.strokeDasharray = strokeDasharray || '0';
    this._show = true;
  }

  update(opts) {
    this.xPos1 = opts.xPos1 === undefined ? this.xPos1 : opts.xPos1;
    this.x1 = opts.x1 === undefined ? this.x1 : opts.x1;
    this.dt1 = opts.dt1 === undefined ? this.dt1 : opts.dt1;
    this.yPos1 = opts.yPos1 === undefined ? this.yPos1 : opts.yPos1;
    this.y1 = opts.y1 === undefined ? this.y1 : opts.y1;
    this.xPos2 = opts.xPos2 === undefined ? this.xPos2 : opts.xPos2;
    this.x2 = opts.x2 === undefined ? this.x2 : opts.x2;
    this.dt2 = opts.dt2 === undefined ? this.dt2 : opts.dt2;
    this.yPos2 = opts.yPos2 === undefined ? this.yPos2 : opts.yPos2;
    this.y2 = opts.y2 === undefined ? this.y2 : opts.y2;
  }

  show() {
    if (this.g && !this._show) {
      this._show = true;
      this.g.attr('visibility', 'visible');
    }
  }

  hide() {
    if (this.g && this._show) {
      this._show = false;
      this.g.attr('visibility', 'hidden');
    }
  }

  remove() {
    this.g.remove();
  }

  revertSomeToPos(sequenceNumber) {
    // sequenceNumber is 1 or 2
    const point = {
      x: null,
      y: null
    };

    if (Number.isFinite(this['xPos' + sequenceNumber])) {
      point.x = this['xPos' + sequenceNumber];
    } else if (Number.isFinite(this['x' + sequenceNumber])) {
      point.x = this.revertIdToPos(this['x' + sequenceNumber]);
    } else if (Number.isFinite(this['dt' + sequenceNumber])) {
      point.x = this.revertIdToPos(this.revertDtToId(this['dt' + sequenceNumber]));
    }

    if (Number.isFinite(this['yPos' + sequenceNumber])) {
      point.y = this['yPos' + sequenceNumber];
    } else if (Number.isFinite(this['y' + sequenceNumber])) {
      point.y = this.revertValueToYPos(this['y' + sequenceNumber]);
    }

    return point;
  }

  revertDtToId(dt) {
    const klines = this.chart.mainSeries;
    const _ref2 = [this.chart.range.leftId, this.chart.range.rightId],
          l = _ref2[0],
          r = _ref2[1];
    if (!klines || !klines.data || !klines.data[l] || dt < klines.data[l].datetime) return null; // 可能整个图的right_id 大于 klines.last_id， 造成 klines.data[r].datetime 是 undefined

    const rightId = klines.data[r] ? r : klines.last_id;

    if (dt <= klines.data[rightId].datetime) {
      for (let i = l; i < rightId + 1; i++) {
        if (dt - klines.data[i].datetime <= 0) return i;
      }
    }

    return null;
  }

  revertIdToPos(id) {
    return Math.round(this.chart.xAxis.xScale(id)) + Math.floor(this.chart.bar.barWidth / 2);
  }

  revertValueToYPos(val) {
    return val && this.board[this.yAlign + 'YAxis'] ? Math.round(this.board[this.yAlign + 'YAxis'].yScale(val)) : null;
  }

  isPointInChart(point) {
    const x = point.x,
          y = point.y;
    if (x >= 0 && x <= this.chart.innerWidth && y >= 0 && y <= this.chart.innerHeight) return true;
    return false;
  }

}

class ChartMarkText extends ChartMark {
  constructor(opts) {
    super(opts);
    this.type = 'text';
    this.xPos1 = opts.xPos1;
    this.x1 = opts.x1;
    this.dt1 = opts.dt1;
    this.yPos1 = opts.yPos1;
    this.y1 = opts.y1;
    this.text = opts.text;
    this.size = opts.size;
    this.textG = this.g.append('text').style('font-size', this.size).style('fill', this.fill);
  }

  update(opts) {
    super.update(opts);
    this.text = opts.text === undefined ? this.text : opts.text;
  }

  draw() {
    const start = this.revertSomeToPos('1');

    if (Number.isFinite(start.x) && Number.isFinite(start.y) && this.text) {
      this.show();
      this.textG.attr('x', start.x).attr('y', start.y).text(this.text);
      return;
    }

    this.hide();
  }

}

class ChartMarkLine extends ChartMark {
  constructor(opts) {
    super(opts);
    this.type = 'line';
    this.lineG = this.g.append('line');
    this.lineG.style('fill', 'none').attr('stroke', this.stroke).attr('stroke-width', this.strokeWidth).attr('stroke-opacity', this.strokeOpacity).attr('stroke-dasharray', this.strokeDasharray);
    this.xPos1 = opts.xPos1;
    this.x1 = opts.x1;
    this.dt1 = opts.dt1;
    this.yPos1 = opts.yPos1;
    this.y1 = opts.y1;
    this.xPos2 = opts.xPos2;
    this.x2 = opts.x2;
    this.dt2 = opts.dt2;
    this.yPos2 = opts.yPos2;
    this.y2 = opts.y2;
    this.text = opts.text;
    this.clamp = opts.clamp;
  }

  update(opts) {
    super.update(opts);
    this.x1 = opts.x1 || this.x1;
    this.y1 = opts.y1 || this.y1;
    this.text = opts.text === undefined ? this.text : opts.text;
    this.clamp = opts.clamp === undefined ? this.clamp : opts.clamp;
  }

  draw() {
    const start = this.revertSomeToPos('1');
    const end = this.revertSomeToPos('2');

    if (Number.isFinite(start.x) && Number.isFinite(start.y) && Number.isFinite(end.x) && Number.isFinite(end.y)) {
      if (this.clamp && start.y - end.y < 0.000001) {
        if (start.y < 0 || end.y < 0) start.y = end.y = 0;else if (start.y > this.chart.innerHeight || end.y > this.chart.innerHeight) start.y = end.y = this.chart.innerHeight;
      }

      this.lineG.attr('x1', start.x).attr('y1', start.y).attr('x2', end.x).attr('y2', end.y);
      this.show();

      if (this.text) {
        this.textG = this.textG || this.g.append('text');
        this.textG.attr('x', start.x).attr('y', start.y).attr('dy', start.y < 15 ? '12px' : '-2px').text(this.text);
      }
    } // this.hide()

  }

}

class ChartMarkRect extends ChartMark {
  constructor(opts) {
    super(opts);
    this.type = 'rect';
    this.rectG = this.g.append('rect');
    this.rectG.style('fill', this.fill).attr('fill-opacity', this.fillOpacity).attr('stroke', this.stroke).attr('stroke-width', this.strokeWidth).attr('stroke-opacity', this.strokeOpacity).attr('stroke-dasharray', this.strokeDasharray);
    this.xPos1 = opts.xPos1;
    this.x1 = opts.x1;
    this.dt1 = opts.dt1;
    this.yPos1 = opts.yPos1;
    this.y1 = opts.y1;
    this.xPos2 = opts.xPos2;
    this.x2 = opts.x2;
    this.dt2 = opts.dt2;
    this.yPos2 = opts.yPos2;
    this.y2 = opts.y2;
    this.width = opts.width;
    this.height = opts.height;
  }

  update(opts) {
    super.update(opts);
    this.width = opts.width === undefined ? this.width : opts.width;
    this.height = opts.height === undefined ? this.height : opts.height;
  }

  draw() {
    const start = this.revertSomeToPos('1');
    let diff = 0.5;
    if (this.rectG.attr('stroke') === 'none') diff = 0;

    if (Number.isFinite(start.x) && Number.isFinite(start.y)) {
      if (Number.isFinite(this.width) && Number.isFinite(this.height)) {
        this.rectG.attr('x', start.x + diff).attr('y', start.y + diff).attr('width', this.width).attr('height', this.height);
        this.show();
        return;
      }

      const end = this.revertSomeToPos('2');

      if (Number.isFinite(end.x) && Number.isFinite(end.y)) {
        this.rectG.attr('x', start.x + diff).attr('y', start.y + diff).attr('width', Math.abs(end.x - start.x)).attr('height', Math.abs(end.y - start.y));
        this.show();
        return;
      }
    }

    this.hide();
  }

}

class ChartMarkArrow extends ChartMark {
  constructor(opts) {
    super(opts);
    this.type = 'arrow';
    this.arrowG = this.g.append('path');
    this.arrowG.style('fill', this.fill).attr('stroke', this.stroke).attr('stroke-width', this.strokeWidth).attr('stroke-opacity', this.strokeOpacity).attr('stroke-dasharray', this.strokeDasharray);
    this.xPos1 = opts.xPos1;
    this.x1 = opts.x1;
    this.dt1 = opts.dt1;
    this.yPos1 = opts.yPos1;
    this.y1 = opts.y1;
    this.xPos2 = opts.xPos2;
    this.x2 = opts.x2;
    this.dt2 = opts.dt2;
    this.yPos2 = opts.yPos2;
    this.y2 = opts.y2;
    this.width = opts.width;
    this.height = opts.height;
    this.direction = opts.direction;
  }

  update(opts) {
    super.update(opts);
    this.width = opts.width === undefined ? this.width : opts.width;
    this.height = opts.height === undefined ? this.height : opts.height;
    this.direction = opts.direction === undefined ? this.direction : opts.direction;
  }

  draw() {
    const start = this.revertSomeToPos('1');
    const w = this.width || this.chart.bar.barWidth;
    const h = this.height || this.chart.bar.barWidth;
    const neg = this.direction === 'up' ? 1 : -1;
    const diff = this.stroke === 'none' ? 0 : 0.5;

    if (Number.isFinite(start.x) && Number.isFinite(start.y) && this.isPointInChart(start)) {
      const w3 = Math.round(w / 3);
      const path = `M ${start.x + w / 2} ${start.y} l ${-w / 2} ${neg * h / 2} l ${w3 - diff} 0 l 0 ${neg * h / 2} l ${w3} 0 l 0 ${-1 * neg * h / 2} l ${w3} 0 z`;
      this.arrowG.attr('d', path);
      this.show();
    } else {
      this.hide();
    }
  }

}

class ChartMarkManager {
  constructor(chart) {
    this.chart = chart;
    this.marks = {};
  }

  addMark(opts) {
    opts.id = opts.id || new Date().getTime();

    if (this.marks[opts.id]) {
      this.marks[opts.id].update(opts);
    } else {
      opts.chart = opts.chart || this.chart;
      opts.boardId = opts.boardId || 'main';
      opts.board = opts.board || this.chart.boards[opts.boardId];
      opts.yAlign = opts.yAlign || 'right';

      if (opts.type === 'line') {
        this.marks[opts.id] = new ChartMarkLine(opts);
      } else if (opts.type === 'rect') {
        this.marks[opts.id] = new ChartMarkRect(opts);
      } else if (opts.type === 'arrow') {
        this.marks[opts.id] = new ChartMarkArrow(opts);
      } else if (opts.type === 'text') {
        this.marks[opts.id] = new ChartMarkText(opts);
      } else {
        this.chart.tqChartConsole.error(`未支持 ${opts.type} 类型标记，[line|rect|arrow|text]`);
      }
    }

    return this.marks[opts.id];
  }

  removeMarkAll() {
    for (const key in this.marks) {
      this.marks[key].remove();
      delete this.marks[key];
    }
  }

  removeMark(id) {
    if (this.marks[id]) this.marks[id].remove();
    delete this.marks[id];
  }

  showMark(id) {
    this.marks[id].show();
  }

  hideMark(id) {
    this.marks[id].hide();
  }

  draw() {
    const klines = this.chart.mainSeries;
    let _ref = [this.chart.range.leftId, this.chart.range.rightId],
        l = _ref[0],
        r = _ref[1];
    r = klines.data[r] ? r : klines.last_id;

    if (klines.data[l] && klines.data[r]) {
      const leftDt = klines.data[l].datetime;
      const rightDt = klines.data[r].datetime;

      for (const key in this.marks) {
        const mark = this.marks[key];

        if (mark.type === 'arrow') {
          if (mark.dt1 >= leftDt && mark.dt1 <= rightDt) {
            const klineId = this.marks[key].revertDtToId(mark.dt1);
            this.marks[key].x1 = klineId;
            this.marks[key].y1 = this.marks[key].direction === 'up' ? klines.data[klineId].low : klines.data[klineId].high;
            this.marks[key].draw();
          } else {
            this.marks[key].hide();
          }
        } else {
          this.marks[key].draw();
        }
      }
    }
  }

}

class TradeArrowManager {
  constructor(tqchart) {
    this.tqchart = tqchart;
    this._board = null;
    this._g = null;
    this.trades = {}; // 记录全部交易记录 trade_id: {trade_id, trade_date_time, volume, direction, offset}
  }

  get board() {
    if (this._board === null) {
      this._board = this.tqchart.boards.main ? this.tqchart.boards.main : null;
    }

    return this._board;
  }

  get g() {
    if (this._g === null) {
      this._g = this.board.markG.append('g').attr('class', 'tradearrow');
    }

    return this._g;
  }

  add(id, trade) {
    if (!this.trades[id]) {
      this.trades[id] = trade;
    }
  }

  removeAll() {
    this.g.select('path').remove();

    for (const k in this.trades) {
      delete this.trades[k];
    }
  }

  revertValueToYPos(val) {
    return val && this.board.rightYAxis ? Math.round(this.board.rightYAxis.yScale(val)) : null;
  }

  draw() {
    const _arrows = []; // 需要标记箭头的数组
    // 每个方向的箭头只标记一次， 这里记录已经标记过的id

    const upKlineIds = {};
    const downKlineIds = {};
    const klines = this.tqchart.mainSeries;
    let _ref = [this.tqchart.range.leftId, this.tqchart.range.rightId],
        l = _ref[0],
        r = _ref[1];
    r = klines.data[r] ? r : klines.last_id;
    if (!klines.data[l] || !klines.data[r]) return;
    const _ref2 = [klines.data[l].datetime, klines.data[r].datetime],
          leftDt = _ref2[0],
          rightDt = _ref2[1];

    for (const tradeId in this.trades) {
      const trade = this.trades[tradeId];

      if (trade.trade_date_time >= leftDt && trade.trade_date_time <= rightDt + this.tqchart.duration) {
        const klineId = this.tqchart.chartController.revertDtToId(trade.trade_date_time, l, r);
        if (!klineId) continue; // 略过已经标记过有箭头的 id

        if (trade.direction === 'BUY') {
          if (upKlineIds[klineId]) {
            upKlineIds[klineId].volume += trade.volume;
          } else {
            const arr = {
              x: this.tqchart.chartController.revertIdToPx(klineId),
              y: this.revertValueToYPos(klines.data[klineId].low),
              dir: 'up',
              diff: trade.offset === 'OPEN' ? 0 : 0.5,
              width: this.tqchart.bar.barWidth,
              volume: trade.volume
            };
            upKlineIds[klineId] = arr;

            _arrows.push(arr);
          }
        } else if (trade.direction === 'SELL') {
          if (downKlineIds[klineId]) {
            downKlineIds[klineId].volume += trade.volume;
          } else {
            const arr = {
              x: this.tqchart.chartController.revertIdToPx(klineId),
              y: this.revertValueToYPos(klines.data[klineId].high),
              dir: 'down',
              diff: trade.offset === 'OPEN' ? 0 : 0.5,
              width: this.tqchart.bar.barWidth,
              volume: trade.volume
            };
            downKlineIds[klineId] = arr;

            _arrows.push(arr);
          }
        }
      }
    }

    this.drawArrows(_arrows);
  }

  drawArrows(_arrows) {
    const selections = this.g.selectAll('path').data(_arrows);
    selections.enter().append('path').attr('class', d => d.dir).attr('d', this.getArrowPath);
    selections.merge(selections).attr('class', d => d.dir).attr('d', this.getArrowPath);
    selections.exit().remove();
  }

  getArrowPath(d) {
    const neg = d.dir === 'up' ? 1 : -1;
    const h = d.width;
    const w = d.width;
    const w3 = Math.round(w / 3);
    return `M ${d.x + w / 2} ${d.y} l ${-w / 2} ${neg * h / 2} l ${w3 - d.diff} 0 l 0 ${neg * h / 2} l ${w3} 0 l 0 ${-1 * neg * h / 2} l ${w3} 0 z`;
  }

}

class PositionManager {
  constructor(tqchart) {
    this.tqchart = tqchart;
    this._board = null;
    this._g = null;
    this.datetimeKeys = [];
    this.positions = {}; // 记录持仓序列 datetime: {datetime, volume_long, volume_short, volume, direction, offset}
  }

  get board() {
    if (this._board === null) {
      this._board = this.tqchart.boards.main ? this.tqchart.boards.main : null;
    }

    return this._board;
  }

  get g() {
    if (this._g === null) {
      this._g = this.board.markG.append('g').attr('class', 'posrect');
    }

    return this._g;
  }

  add(dt, position) {
    if (!this.positions[dt]) {
      this.positions[dt] = position;
      position.datetime = dt;
      position.volume_net = position.volume_long - position.volume_short;
      position.klineId = this.tqchart.chartController.revertDtToId(dt);
      this.datetimeKeys = Object.keys(this.positions).sort();
    }
  }

  removeAll() {
    this.g.select('rect').remove();

    for (const k in this.positions) {
      delete this.positions[k];
    }
  }

  getPostionKlineId(position) {
    if (position.klineId) return position.klineId;
    position.klineId = this.tqchart.chartController.revertDtToId(position.datetime);
    return position.klineId;
  }

  revertValueToYPos(val) {
    return val && this.board.rightYAxis ? Math.round(this.board.rightYAxis.yScale(val)) : null;
  }

  draw() {
    const klines = this.tqchart.mainSeries;
    let _ref = [this.tqchart.range.leftId, this.tqchart.range.rightId],
        l = _ref[0],
        r = _ref[1];
    r = klines.data[r] ? r : klines.last_id;
    if (!klines.data[l] || !klines.data[r]) return;
    const _ref2 = [klines.data[l].datetime, klines.data[r].datetime],
          leftDt = _ref2[0],
          rightDt = _ref2[1];
    const positionsRect = []; // 需要绘制的矩形

    for (let i = 1; i < this.datetimeKeys.length; i++) {
      const preDt = this.datetimeKeys[i - 1];
      const curDt = this.datetimeKeys[i];
      if (curDt < leftDt) continue;
      if (leftDt > rightDt) break;
      const prePos = this.positions[preDt];
      const curPos = this.positions[curDt];
      const preId = this.getPostionKlineId(prePos);
      const curId = this.getPostionKlineId(curPos);
      if (preId === null || curId === null) continue;

      if (curId - preId > 1 && prePos.volume_net !== 0) {
        const priceDiff = klines.data[curId].close - klines.data[preId].open;

        if (prePos.volume_net !== 0 && priceDiff !== 0) {
          const min = Math.min(klines.data[preId].low, klines.data[curId].low);
          const max = Math.max(klines.data[preId].high, klines.data[curId].high);
          const className = prePos.volume_net * priceDiff > 0 ? 'profit' : 'loss'; // 矩形颜色，净持仓和价格变化的符号相同，那么red，否则green

          positionsRect.push({
            id: 'rect' + preId,
            x1: preId,
            y1: max,
            x2: curId + 1,
            y2: min,
            className: className,
            stroke: 'none'
          });
        }
      }
    }

    this.drawPosRect(positionsRect);
  }

  drawPosRect(_rects) {
    const selections = this.g.selectAll('rect').data(_rects);
    selections.enter().append('rect').attr('class', d => d.className).attr('x', d => this.tqchart.chartController.revertIdToPx(d.x1)).attr('y', d => this.revertValueToYPos(d.y1)).attr('width', d => (d.x2 - d.x1) * this.tqchart.bar.barWidth).attr('height', d => this.revertValueToYPos(d.y2) - this.revertValueToYPos(d.y1));
    selections.merge(selections).attr('class', d => d.className).attr('x', d => this.tqchart.chartController.revertIdToPx(d.x1)).attr('y', d => this.revertValueToYPos(d.y1)).attr('width', d => (d.x2 - d.x1) * this.tqchart.bar.barWidth).attr('height', d => this.revertValueToYPos(d.y2) - this.revertValueToYPos(d.y1));
    selections.exit().remove();
  }

}

class ChartBar {
  /**
     * @param {number} fullWidth 整个图表的宽度
     */
  constructor(fullWidth) {
    this.fullWidth = fullWidth;
    this.barWidth = ChartBar.BAR_WIDTH; // 柱子宽度包含 padding

    this.barPadding = this._getBarPadding();
    this.barNumbers = this._getBarNumbers();
  }

  _getBarPadding() {
    return this.barWidth <= 3 ? 0 : this.barWidth <= 17 ? 1 : 2;
  }

  _getBarNumbers() {
    return Math.floor(this.fullWidth / this.barWidth);
  }
  /**
   * 柱子缩放
   * @param {number} x 正数放大柱子，负数缩小柱子
   */


  zoom(x) {
    if (x === 0) return;
    const zoom = x / Math.abs(x);
    const w = this.barWidth + zoom * 2;
    if (w < ChartBar.BAR_WIDTH_MIN || w > ChartBar.BAR_WIDTH_MAX || w === this.barWidth) return;
    this.barWidth = w;
    this.barPadding = this._getBarPadding();
    this.barNumbers = this._getBarNumbers();
  }

  setFullWidth(w) {
    this.fullWidth = w;
    this.barNumbers = this._getBarNumbers();
  }

}

ChartBar.BAR_WIDTH = 9;
ChartBar.BAR_WIDTH_MAX = 35;
ChartBar.BAR_WIDTH_MIN = 1;

class ChartDataRange {
  constructor(leftId, rightId) {
    this.leftId = Number.isInteger(leftId) ? leftId : -1;
    this.rightId = Number.isInteger(rightId) ? rightId : -1;
  }

  reset(leftId, rightId) {
    if (this.isInvalid() || leftId !== this.leftId || rightId !== this.rightId) {
      this.leftId = Number.isInteger(leftId) ? leftId : -1;
      this.rightId = Number.isInteger(rightId) ? rightId : -1;
      return true;
    }

    return false;
  }

  isInvalid() {
    return this.leftId === -1 || this.rightId === -1;
  }

  isEqual(range) {
    return range.leftId === this.leftId && range.rightId === this.rightId;
  }

  copy(range) {
    if (range instanceof ChartDataRange) {
      this.leftId = range.leftId;
      this.rightId = range.rightId;
    }
  }

}

class ChartController {
  constructor(tqchart) {
    this.tqchart = tqchart;
    this.range = new ChartDataRange();
  }

  _initRange() {
    let leftId = -1,
        rightId = -1;

    if (this.tqchart.mainSeries && this.tqchart.mainSeries.last_id !== -1) {
      rightId = this.tqchart.mainSeries.last_id;
      leftId = rightId - this.tqchart.bar.barNumbers + 1;
    }

    this.range.reset(leftId, rightId);
  }

  getRange() {
    if (this.range.isInvalid()) this._initRange();
    return this.range;
  }

  init() {
    this._initRange();
  }

  setRange(leftId, rightId) {
    if (leftId >= 0 && rightId >= leftId) {
      this.range.reset(leftId, rightId);
    } else {
      this.tqchart.tqChartConsole.warn('setRange 不传入数据，表示指定移动到最后端');
      this.range.reset(-1, -1);
    }
  }
  /**
   * 移动图表调用
   * @param {Integer} m 移动 m 个柱子 正数向右 负数向左
   * @return {range | false}
   */


  move(m) {
    if (this.getRange().isInvalid()) {
      this.tqchart.tqChartConsole.warn('move 拖动图表的时候，图表范围还未确定');
      return false;
    }

    let _tempLeftId = this.range.leftId - m;

    let _tempRightId = _tempLeftId + this.tqchart.bar.barNumbers - 1;

    if (_tempLeftId >= 0 && _tempLeftId <= this.tqchart.mainSeries.last_id - this.tqchart.bar.barNumbers + 10) {
      return this.range.reset(_tempLeftId, _tempRightId);
    } else if (_tempLeftId < 0) {
      if (this.range.leftId === 0) return false;
      _tempLeftId = 0;
      _tempRightId = _tempLeftId + this.tqchart.bar.barNumbers - 1;
      return this.range.reset(_tempLeftId, _tempRightId);
    } else if (_tempLeftId >= 0 && m > 0) {
      return this.range.reset(_tempLeftId, _tempRightId);
    }

    return false;
  }
  /**
   * 调整柱子宽度 && 重新计算 leftId rightId
   * @return {Boolean} false 没有缩放；true 有缩放
   */


  zoom() {
    // 优先 resetByRight
    let tempLeftId = -1,
        tempRightId = -1;

    if (this.range.rightId > this.tqchart.mainSeries.last_id) {
      tempLeftId = this.tqchart.mainSeries.last_id - this.tqchart.bar.barNumbers + 1;
    } else {
      tempLeftId = this.range.rightId - this.tqchart.bar.barNumbers + 1;
    }

    tempLeftId = tempLeftId < 0 ? 0 : tempLeftId;
    tempRightId = tempLeftId + this.tqchart.bar.barNumbers - 1;
    this.range.reset(tempLeftId, tempRightId);
    return true;
  }

  revertIdToPx(id) {
    return Math.round(this.tqchart.xAxis.xScale(id));
  }

  revertDtToId(dt, leftId, rightId) {
    const klines = this.tqchart.mainSeries;
    if (!klines || !klines.data || this.range.isInvalid()) return null; // 如果用户指定 leftId, rightId 那么只查找此范围内

    let isCustomRange = false;

    if (leftId >= 0 && rightId > leftId) {
      isCustomRange = true;
    } else {
      leftId = this.range.leftId;
      rightId = this.range.rightId;
    } // 几种情况 dt 介于 [leftId, rightId]


    let l = leftId,
        r = rightId;
    r = r <= klines.last_id ? r : klines.last_id; // 可能整个图的 right_id 大于 klines.last_id， 这个时候就改用 last_id 判断

    if (!klines.data[l] || !klines.data[r]) {
      // 如果没有 l, r 都没有数据直接返回 null，klines 在 leftId, rightId 这两个点没有数据
      return null;
    } // 如果落在最后一根柱子，直接返回


    if (dt >= klines.data[r].datetime && dt < klines.data[r].datetime + this.tqchart.duration) {
      return r;
    }

    if (dt >= klines.data[l].datetime && dt <= klines.data[r].datetime) {
      for (let i = l; i < r + 1 && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i;
      }

      return null;
    }

    if (isCustomRange) return null; // dt 大于 rightId

    if (dt > klines.data[r].datetime) {
      if (r === klines.last_id) return null;

      for (let i = r; i < klines.last_id && klines.data[i] && klines.data[i]; i++) {
        if (dt - klines.data[i].datetime <= 0) return i >= 1 ? i - 1 : i;
      }

      return null;
    } // dt 小于 leftId


    if (dt < klines.data[l].datetime) {
      if (l === 0) return null;

      for (let i = l; i >= 0 && klines.data[i]; i--) {
        if (dt - klines.data[i].datetime >= 0) return i;
      }

      return null;
    }
  }

}

class TqChart extends eventemitter3 {
  constructor(opts) {
    super();
    this.divDomId = opts.id;
    this.outerWidth = opts.width;
    this.outerHeight = opts.height;
    this.margin = opts.margin ? opts.margin : {
      top: 15,
      right: 50,
      bottom: 20,
      left: 80
    };
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
    this.mode = 'free'; // free / fixed

    this.customRange = new ChartDataRange(); // 记录用户指定的 leftId / rightId

    this.mainType = 'candle'; //  candle / close

    this.bar = new ChartBar(this.innerWidth); // 全局柱子配置

    this.range = new ChartDataRange(); // 实际绘制的 Id 范围

    this.symbol = opts.symbol || opts.instrumentId;
    this.duration = opts.duration || 60 * 1e9; // 默认一分钟线

    this.price_decs = opts.price_decs || 2; // 价格保留小数位数

    this.price_ticks = opts.price_ticks; // 一跳价格

    this.mainSeries = opts.mainSeries;
    this.chartController = new ChartController(this);
    this.highlightManager = new ChartManager(this, 'highlight', 'HighlightBar');
    this.tradeArrowManager = new TradeArrowManager(this); // 交易标记

    this.positionManager = new PositionManager(this); // 持仓块

    this.tqChartConsole = CreateConsole('TqChart', 'plum');
  } // 主要接口列表


  setMode(mode, leftId, rightId) {
    if (mode === 'free') {
      // 可以自由拖拽
      this.mode = 'free';

      if (leftId >= 0 && rightId >= leftId) {
        this.customRange.reset(leftId, rightId);
      } else {
        this.customRange.reset();
      }
    } else if (mode === 'fixed') {
      // 不可以自由拖拽，固定范围
      if (leftId >= 0 && rightId >= leftId) {
        this.mode = 'fixed';
        this.customRange.reset(leftId, rightId);
      } else {
        this.tqChartConsole.error('mode:fixed 必须指定 leftId rightId');
      }
    } else {
      this.tqChartConsole.error(`不支持 mode:${mode}， 只支持 mode:[free|fixed]`);
    }
  }

  setRange(leftId, rightId) {
    this.chartController.setRange(leftId, rightId);
    this.draw();
  }

  setMainType(type) {
    if (type === 'candle' || type === 'close') {
      this.mainType = type;
    } else {
      this.tqChartConsole.error('mainType 只支持 [candle|close] => [K线图|收盘价线]');
    }
  }

  setMainSeries(symbol, duration, klines) {
    if (symbol && duration && klines) {
      this.symbol = symbol;
      this.duration = duration;
      this.mainSeries = klines;
      this.backgroundText.text(`${this.symbol} ${ParseDuartionToString(this.duration)}`).attr('dy', '-2');
      this.chartController.init();
      this.marksManager.removeMarkAll();
      this.tradeArrowManager.removeAll();
      this.positionManager.removeAll();

      this._resetBoards();

      this.draw();
    } else {
      this.tqChartConsole.error('setMainSeries 必须同时指定 symbol, duration, klines');
    }
  }

  addHighlightBar(id, klineId) {
    this.highlightManager.add(id, klineId);
  }

  addTradeArrow(id, trade) {
    this.tradeArrowManager.add(id, trade);
  }

  addPositionRecord(dt, position) {
    this.positionManager.add(dt, position);
  }

  init() {
    this._initSvgNode();

    this._initEventListenners(); // 全局 XAxis


    this.xAxis = new XAxis(this); // init boards 目前只有两个 boards

    const positions = ChartBoard.GetMutilPlotsHeight(2, this.innerHeight);
    this.boards = {
      main: new ChartBoard(this, 'main', positions[0].top, positions[0].height, false),
      sub: new ChartBoard(this, 'sub', positions[1].top, positions[1].height, true) // init plots
      // [mainkline volume oi]

    };
    this.plots = {
      mainkline: new ChartPlot({
        chart: this,
        boardId: 'main',
        plotId: 'candle',
        yAlign: 'right',
        type: 'candle'
      }),
      volume: new ChartPlot({
        chart: this,
        boardId: 'sub',
        plotId: 'volume',
        yAlign: 'right',
        type: 'volume'
      }),
      oi: new ChartPlot({
        chart: this,
        boardId: 'sub',
        plotId: 'oi',
        yAlign: 'left',
        type: 'oi'
      }) // 管理图上标识

    };
    this.marksManager = new ChartMarkManager(this); // init crosshair

    this.crosshair = new Crosshair(this);
    this.chartController.init();
  }

  _initSvgNode() {
    // 初始化 svg ，整个图表的根结点
    this.svg = select('#' + this.divDomId).append('svg').attr('class', 'tqchart').attr('width', this.outerWidth).attr('height', this.outerHeight);
    this.defs = this.svg.append('defs');
    const maskId = 'mask-global';
    this.maskGlobal = TqChart.AppendMask(this.defs, maskId, this.innerWidth, this.innerHeight, 0, 0); // 按顺序生成一批全局节点

    const _ref = [this.margin.left, this.margin.top],
          left = _ref[0],
          top = _ref[1]; // 整个背景

    this.backgroundG = TqChart.AppendG(this.svg, 'background global', left, top); // board background

    this.boardBackgroundG = TqChart.AppendG(this.svg, 'boardBackground global', left, top); // this.bgShapesG = TqChart.AppendG(this.svg, 'bgShapes global', left, top, maskId)

    this.rootG = TqChart.AppendG(this.svg, 'root global', left, top);
    this.crosshairG = TqChart.AppendG(this.svg, 'crosshair global', left, top);
    this.loadingG = TqChart.AppendG(this.svg, 'loading global', left, top);
    this.bgShapesG = TqChart.AppendG(this.svg, 'bgShapes global', left, top, maskId); // 背景格子 竖线

    this.backgroundText = this.backgroundG.append('g').append('text');
    this.backgroundText.text(`${this.symbol} ${ParseDuartionToString(this.duration)}`).attr('dy', '-2');
    this.markG = this.rootG.append('g');
  }

  _debounce(fn, delay) {
    // 维护一个 timer
    let timer = null;
    return function () {
      // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  _initEventListenners() {
    const _this = this; // 鼠标悬停


    this.svg.on('mousemove', function () {
      const _d3$mouse = mouse(this),
            _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
            x = _d3$mouse2[0],
            y = _d3$mouse2[1];

      if (x > _this.margin.left && x < _this.margin.left + _this.innerWidth && y > _this.margin.top && y < _this.margin.top + _this.innerHeight) {
        _this.crosshair.update(x - _this.margin.left, y - _this.margin.top);
      }
    });
    this.svg.on('mouseover', function () {
      if (initX === null) _this.crosshair.show();
    });
    this.svg.on('mouseleave', function () {
      _this.crosshair.hide();
    }); // 处理拖动事件  使用 rootG 要设置长宽

    let initX = null;
    const dragOnMove = drag().on('start', function () {
      // 记下起始位置
      initX = event.x; // 拖动开始的时候 隐藏十字光标层

      _this.crosshair.hide();

      _this.crosshair.drag(true);
    }).on('drag', function () {
      const moves = Math.round((event.x - initX) / _this.bar.barWidth);
      this.bar = new ChartBar(this.innerWidth);

      if (Math.abs(moves) > 0) {
        initX = event.x; // _this.chartController.move(moves)

        _this.move(moves); // 移动 moves 柱子

      }
    }).on('end', function () {
      // 拖动结束
      initX = null; // 显示十字光标层

      _this.crosshair.show();

      _this.crosshair.drag(false);
    });
    this.svg.call(dragOnMove); // 处理缩放事件

    const zoom$1 = zoom().on('zoom', function () {
      const deltaY = event.sourceEvent.deltaY;

      if (Math.abs(deltaY) > 0) {
        _this._debounce(_this.zoom, 200).bind(_this)(deltaY > 0 ? -2 : 2);
      }
    });
    this.svg.call(zoom$1).on('dblclick.zoom', null);
  } // 根据 y 坐标位置，返回对应 board , crosshair 根据这个计算出显示的值


  getBoardByYPosition(y) {
    for (const key in this.boards) {
      if (y >= this.boards[key].top && y <= this.boards[key].top + this.boards[key].height) {
        return this.boards[key];
      }
    }
  }

  resize() {
    let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        height = _ref2.height,
        width = _ref2.width;

    this.tqChartConsole.log('onresize', width);
    this.outerWidth = width;
    this.outerHeight = height;
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
    this.svg.attr('width', this.outerWidth).attr('height', this.outerHeight);
    this.bar.setFullWidth(this.innerWidth); // 调整位置

    this.xAxis.resetPosition(); // 调整范围 leftId rightId

    this.chartController.zoom();
    const positions = ChartBoard.GetMutilPlotsHeight(Object.keys(this.boards).length, this.innerHeight);
    let index = 0;

    for (const key in this.boards) {
      this.boards[key].resetPosition(positions[index++]);
    } // 调整 crosshair 位置


    this.crosshair.resize(); // 重新绘制

    this.draw();
  }

  _resetBoards() {
    for (const k in this.boards) {
      if (k !== 'main' && k !== 'sub') {
        this.boards[k].remove();
        delete this.boards[k];
      }
    }

    const positions = ChartBoard.GetMutilPlotsHeight(2, this.innerHeight);
    this.boards.main.resetPosition(positions[0]);
    this.boards.sub.resetPosition(positions[1]);

    for (const k in this.plots) {
      if (k !== 'mainkline' && k !== 'volume' && k !== 'oi') {
        this.plots[k].remove();
        delete this.plots[k];
      }
    }
  }

  _updateBoards() {
    const positions = ChartBoard.GetMutilPlotsHeight(Object.keys(this.boards).length, this.innerHeight);
    let index = 0;

    for (const key in this.boards) {
      this.boards[key].resetPosition(positions[index++]);
    }
  } // 接口列表


  addSeries(serialId, serial) {
    this.tqChartConsole.log('addSeries', serialId, serial);
    const boardName = serial.board ? serial.board.toLowerCase() : 'main';

    if (!this.boards[boardName]) {
      this.boards[boardName] = new ChartBoard(this, boardName, this.innerHeight, 0, true);

      this._updateBoards();
    }

    if ((serial.type === 'KSERIAL' || serial.type === 'SERIAL') && !this.plots[serialId]) {
      if (serial.type === 'KSERIAL') {
        this.plots[serialId] = new ChartPlot({
          chart: this,
          boardId: boardName,
          plotId: serialId,
          yAlign: serial.yAlign,
          type: 'candle',
          data: serial.data
        });
      } else if (serial.type === 'SERIAL') {
        this.plots[serialId] = new ChartPlot({
          chart: this,
          boardId: boardName,
          plotId: serialId,
          yAlign: serial.yAlign,
          type: serial.style.toLowerCase(),
          data: serial.data,
          color: RevertColor(serial.color),
          width: serial.width,
          dash: serial.style.toLowerCase() === 'dash'
        });
      }
    }

    if (serial.type === 'TEXT') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'text',
        x1: serial.x1,
        y1: serial.y1,
        fill: RevertColor(serial.color),
        size: serial.size,
        text: serial.text
      });
    } else if (serial.type === 'LINE' || serial.type === 'SEG' || serial.type === 'RAY') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'line',
        x1: serial.x1,
        x2: serial.x2,
        y1: serial.y1,
        y2: serial.y2,
        stroke: RevertColor(serial.color),
        strokeWidth: serial.width,
        text: '',
        clamp: false
      });
    } else if (serial.type === 'BOX') {
      this.addMark({
        id: serialId,
        boardId: serial.board.toLowerCase(),
        type: 'rect',
        x1: serial.x1,
        x2: serial.x2,
        y1: serial.y1,
        y2: serial.y2,
        fill: RevertColor(serial.bg_color),
        stroke: RevertColor(serial.color),
        strokeWidth: serial.width || 1
      });
    }

    this.draw();
  } // ======= about marks =======


  addMark(opts) {
    this.marksManager.addMark(opts);
  }

  removeMark(id) {
    this.marksManager.removeMark(id);
  }

  removeMarkAll() {
    this.marksManager.removeMarkAll();
  }

  showMark(id) {
    this.marksManager.showMark(id);
  }

  hideMark(id) {
    this.marksManager.hideMark(id);
  } // ======= about marks =======


  move(x) {
    if (this.mode === 'fixed') return;

    if (this.chartController.move(x)) {
      this.draw();
    }
  }

  zoom(n) {
    if (this.mode === 'fixed') return; // n 正数放大/负数缩小 n 根柱子

    const oldBarWidth = this.bar.barWidth;
    this.bar.zoom(n);
    if (oldBarWidth === this.bar.barWidth) return; // 缩放后宽度确实有变化才更新

    this.highlightManager.each('resize');
    this.chartController.zoom(); // 重新计算了 leftId rightId

    this.xAxis.resetPosition();
    this.draw();
  }

  readyToDraw() {
    return this.dm.readyToDraw();
  }

  draw() {
    if (this.mainSeries.last_id === -1) return;

    if (this.mainSeries.last_id - this.range.rightId === 1) {
      this.chartController.setRange(this.mainSeries.last_id - this.bar.barNumbers + 1, this.mainSeries.last_id);
    }

    const _this$chartController = this.chartController.getRange(),
          leftId = _this$chartController.leftId,
          rightId = _this$chartController.rightId;

    this.xAxis.draw(leftId, rightId, this.mainSeries.data); // this._drawBackground(leftId, rightId, this.mainSeries.data)
    // 根据 plots 计算出每个 board 的 YAxis 的 domain

    const boardesDomains = {};

    for (const plotId in this.plots) {
      const domain = this.plots[plotId].getYDomain(leftId, rightId, this.plots[plotId].data || this.mainSeries.data); // if (!domain[0] || !domain[1]) continue

      const boardId = this.plots[plotId].boardId;
      const yAlign = this.plots[plotId].yAlign;
      boardesDomains[boardId] = boardesDomains[boardId] || {
        left: [Infinity, -Infinity],
        right: [Infinity, -Infinity]
      };
      boardesDomains[boardId][yAlign][0] = Math.min(boardesDomains[boardId][yAlign][0], domain[0]);
      boardesDomains[boardId][yAlign][1] = Math.max(boardesDomains[boardId][yAlign][1], domain[1]);
    } // boards draw


    for (const boardId in this.boards) {
      const domain = boardesDomains[boardId];
      if (!domain) continue;
      this.boards[boardId].setDomain(domain.left, 'left'); // domain

      this.boards[boardId].setDomain(domain.right, 'right'); // domain

      this.boards[boardId].draw(leftId, rightId, this.mainSeries.data); // drawYAxis
    } // plots draw


    for (const plotId in this.plots) {
      this.plots[plotId].draw(leftId, rightId, this.plots[plotId].data || this.mainSeries.data);
    }

    this.marksManager.draw();
    this.highlightManager.each('draw');
    this.tradeArrowManager.draw();
    this.positionManager.draw();

    if (!this.chartController.range.isEqual(this.range)) {
      this.range.copy(this.chartController.range);
      this.emit('showRangeChanged', this.range);
    }
  }

  _drawBackground(l, r, data) {
    const quote = this.tqsdk.get_quote(this.symbol);

    if (quote && quote.trading_time) {
      const x = [];

      const _getTime = timeFormat('%H:%M:%S');

      const _getDay = timeFormat('%d');

      if (this.duration <= 60 * 1e9) {
        const times = [];

        for (const i in quote.trading_time.day) times.push(quote.trading_time.day[i][0]);

        if (quote.trading_time.night && quote.trading_time.night.length > 0) {
          for (const i in quote.trading_time.night) times.push(quote.trading_time.night[i][0]);
        }

        for (let i = l; i <= r; i++) {
          if (data[i] && times.indexOf(_getTime(data[i].datetime / 1e6)) > -1) {
            x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2);
          }
        }
      } else if (this.duration < 60 * 60 * 24 * 1e9) {
        const times = [];
        const tradingStart = quote.trading_time.night ? 'night' : 'day';
        times.push(quote.trading_time[tradingStart][0][0]);

        for (let i = l; i <= r; i++) {
          if (data[i] && times.indexOf(_getTime(data[i].datetime / 1e6)) > -1) {
            x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2);
          }
        }
      } else if (this.duration <= 5 * 60 * 60 * 24 * 1e9) {
        for (let i = l; i <= r; i++) {
          if (data[i] && data[i - 1]) {
            if (_getDay(data[i].datetime / 1e6) < _getDay(data[i - 1].datetime / 1e6)) {
              x.push((i - l) * this.bar.barWidth + this.bar.barWidth / 2);
            }
          }
        }
      }

      const selections = this.backgroundG.selectAll('line').data(x);
      selections.enter().append('line').attr('y1', 0).attr('y2', this.innerHeight).attr('stroke', '#E6E6E6').attr('stroke-dasharray', '12 6').attr('x1', d => d).attr('x2', d => d);
      selections.merge(selections).attr('x1', d => d).attr('x2', d => d);
      selections.exit().remove();
    }
  }

}

TqChart.AppendG = function (parent, className) {
  let left = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let top = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  let maskId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  const g = parent.append('g').attr('class', className);

  if (left !== 0 || top !== 0) {
    g.attr('transform', `translate(${left},${top})`);
  }

  if (maskId) {
    g.attr('mask', `url(#${maskId})`);
  }

  return g;
};

TqChart.AppendMask = function (parent, id) {
  let width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  let x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  let y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  return parent.append('mask').attr('id', id).append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', height).style('fill', '#FFFFFF').attr('stroke', 'none');
};

TqChart.version = version;

export default TqChart;
