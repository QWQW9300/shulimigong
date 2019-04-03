/*
 * Official Web Page
 * <https: //kagedesuworkshop.blogspot.com/p/alpha-net.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// Alpha_NET
//=============================================================================

/*:
 * @author Pheonix KageDesu
 * @plugindesc v0.8.1100 Network system (Beta)
 * @help
 * 
 * Web Page: 
 * https://kagedesuworkshop.blogspot.com/p/alpha-net.html
 * Wiki Page: 
 * https://github.com/KageDesu/AlphaNET/wiki
 * Patreon Page: 
 * https://www.patreon.com/KageDesu
 * YouTube Channel:
 * https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 * 
 * Thanks to all my patrons!
 * Plugin supporters:
 *  - Donald Derrick
 *  - Ilya Chkoliar (https://elushisgaming.club/)
 *  - Kevin Sjöberg
 *  - Sarcastic Sloth (https://sarcasticsloth42.wixsite.com/avillainstale)
 *  - Bud Leiser
 *  - DoctorWheeze
 *  - Plerai
 *  - Zachary Fredricksen
 *  - Timothy Barry
 *  - Xanathoth (https://darkmortalis.com)
 *  - GiantHurtBall (https://deviantart.com/chaos14u)
 *  - The Commander
 * 
 * ==============================================================
 * Plugin Commands
 * ==============================================================
 *  --- Game Host ---
 * NET start - start server (only for PC)
 * NET hotSeat - start split screen
 *    (server must be started on your PC first)
 * NET stop - stop server
 * 
 * NET restrict - disable connection other players to the game
 * NET allow - enable connection to the game
 * 
 *  --- Game Client ---
 * NET connect - join to the game
 * NET disconnect - left the game
 * 
 * [!] Please read Wiki Page for more information and documentation
 * 
 * === === === === === === === === === === === === === === === === ===
 * 
 * @param Alpha NET
 * 
 * @param GameMode
 * @parent Alpha NET
 * @type combo
 * @text Game Mode
 * @option Cooperative
 * @option Multiplayer
 * @default Cooperative
 * @desc Read more about game modes on Wiki Page
 * 
 * @param ActorsForPlayers
 * @parent Alpha NET
 * @text Actors for players
 * @type string
 * @default 1, 2, 3, 4
 * @desc Actor ID for each player, separate by comma. Actors count = how many players can join to the game
 * 
 * @param UseInGameChat
 * @parent Alpha NET
 * @text Use in-game chat?
 * @type boolean
 * @default true
 * @desc Can players use in-game chat
 * 
 * @param NetworkEvents
 * @text Network Events
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param ServerStarted
 * @text On Server Started
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when Server get started (only for host)
 * 
 * @param OnConnect
 * @text On Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you join the game
 * 
 * @param OnDisconect
 * @text On Disconect
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you lost connection with game
 * 
 * @param OnOtherCon
 * @text On Another Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player join your game
 * 
 * @param OnOtherDisc
 * @text On Another Left
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player left your game
 * 
 * @param OnPvPEnd
 * @text On PvP Battle End
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when PvP battle ends (only for PvP participants)
 * 
 * @param NetworkUI
 * @text UI Settings
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param NameplatesMode
 * @parent NetworkUI
 * @type combo
 * @text Nameplate display mode
 * @option Others
 * @option All
 * @option Never
 * @default Others
 * @desc How display players names above characters
 * 
 */

//Show NET Icons?
//Show ICON while Chat?
//Show ICON while Wait?
//Show ICON while Menu?
//PICs for All Three Icons (стандартные хранить в памяти?)


//@[CODE STANDARD X2]

/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.AlphaNET = true;

var AlphaNET = {};
AlphaNET.Version = '0.8';
AlphaNET.Build = 1100;

//? GLOBAL SHORTCUT
window.ANET = AlphaNET;

AlphaNET._define = 'build';

AlphaNET.Versions = {
    'KDCore': '1.2',
    'NET': AlphaNET.Version + ' : ' + AlphaNET.Build,
    'Socket.io': '2.0.4',
    'CoffeeScript CLI': '2.3.1'
};

AlphaNET.LIBS = {};

AlphaNET.register = function (library) {
    this.LIBS[library.name] = library;
};

AlphaNET.isDEV = function () {
    return AlphaNET._define == 'dev';
};

// ------------------------- MAIN MODULES ---------------------------------
function Network() {
    throw new Error('This is a static class');
}

function NetPartyManager() {
    throw new Error('This is a static class');
}

function MakerManager() {
    throw new Error('This is a static class');
}

function HotSeatKeyMapper() {
    throw new Error('This is a static class');
}

function NetWorldManager() {
    throw new Error('This is a static class');
}

function InfoPrinter() {
    throw new Error('This is a static class');
}

function NetUIManager() {
    throw new Error('This is a static class');
}
// -------------------------------------------------------------------------

//@[GLOBAL DEFINITON]
function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

(function () {
    //@[ALIAS]
    var _SceneManager_catchException_NET = SceneManager.catchException;
    SceneManager.catchException = function (e) {
        AlphaNET._printPluginInfo();
        _SceneManager_catchException_NET.call(this, e);
        AlphaNET._showDevTools();
    };

    //@[ALIAS]
    var _SceneManager_onError_NET = SceneManager.onError;
    SceneManager.onError = function (e) {
        AlphaNET._printPluginInfo();
        _SceneManager_onError_NET.call(this, e);
        AlphaNET._showDevTools();
    };

    // * Данный метод отвечает чтобы при загрузке сохранённой игры нашлись классы библиотек
    //@[ALIAS]
    var _JsonEx_decode = JsonEx._decode;
    JsonEx._decode = function (value, circular, registry) {
        var type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            if (value['@']) {
                var constructor = AlphaNET.LIBS[value['@']] || KDCore[value['@']];
                if (constructor) {
                    value = this._resetPrototype(value, constructor.prototype);
                    value['@'] = null;
                }
            }
        }
        return _JsonEx_decode.call(this, value, circular, registry);
    };
})();

// -------------------------------------------------------------------------

// * Вывод текста
AlphaNET.print = function (message) {
    if (AlphaNET._warningLog == undefined) {
        AlphaNET._warningLog = new KDCore.DevLog('Alpha NET');
        AlphaNET._warningLog.setColors(KDCore.Color.ORANGE, KDCore.Color.BLACK.getLightestColor(100));
        AlphaNET._warningLog.on();
    }
    if (message) {
        AlphaNET._warningLog.p(message);
    }
};

// * Просто предупреждение в консоль
AlphaNET.warning = function (message, error = null) {
    console.warn("Alpha NET warning!");
    if (error)
        AlphaNET.print(message + ": " + error.message);
    else
        AlphaNET.print(message);
};

// * Критическая ошибка -> завершение приложения
AlphaNET.criticalError = function (error, message) {
    AlphaNET.error(null, message);
    SceneManager.catchException(error);
};

AlphaNET._printPluginInfo = function () {
    console.error("Using AlphaNET [Version: " + AlphaNET.Version +
        " ; Build: " + AlphaNET.Build +
        " ; on MV  " + Utils.RPGMAKER_VERSION + "]");
};

AlphaNET._showDevTools = function () {
    if (Utils.isNwjs()) {
        require('nw.gui').Window.get().showDevTools();
    }
};

// * Ошибка с предупреждением пользователя
AlphaNET.error = function (error, message) {
    if (AlphaNET._errorLog == undefined) {
        AlphaNET._errorLog = new KDCore.DevLog('ANET Error');
        AlphaNET._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
        AlphaNET._errorLog.on();
    }
    console.error(error);
    if (message) {
        AlphaNET._errorLog.p(message);
        AlphaNET.alert(message);
    }
};

AlphaNET.alert = function (message) {
    if (message) {
        alert(message);
    }
};

// * Лог для разработки
AlphaNET.log = function (message, obj) {
    if (!ANET.isDEV()) {
        return;
    }
    if (AlphaNET._devLog == undefined) {
        AlphaNET._devLog = new KDCore.DevLog('ANET');
        AlphaNET._devLog.setColors(KDCore.Color.BLUE, KDCore.Color.BLACK.getLightestColor(200));
        AlphaNET._devLog.on();
    }
    if (message) {
        if (!obj)
            AlphaNET._devLog.p(message);
        else
            AlphaNET._devLog.p(obj.constructor.name + " : " + message);
    }
};
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var KDCore;

KDCore = KDCore || {};

KDCore.Version = '1.2';

KDCore.LIBS = {};

KDCore.register = function(library) {
  return this.LIBS[library.name] = library;
};

(function() {
  var BitmapSrc, Color, DevLog, ParametersManager, SDK, StringsLoader, __TMP_LOGS__, __alias_Bitmap_fillAll;
  //Array Extension
  //------------------------------------------------------------------------------
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.include = function(value) {
    return this.indexOf(value) !== -1;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  //Number Extension
  //------------------------------------------------------------------------------
  Number.prototype.do = function(method) {
    return SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  //Sprite Extension
  //------------------------------------------------------------------------------
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX, floatY) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  //Bitmap Extension
  //------------------------------------------------------------------------------
  __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll.call(this, color);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
  //String Extenstion
  //------------------------------------------------------------------------------
  String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
  //SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  //Color
  //------------------------------------------------------------------------------
  Color = class Color {
    constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
    }

    getLightestColor(lightLevel) {
      var bf, newColor, p;
      bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
      p = 0;
      newColor = [0, 0, 0, 0];
      if (bf - lightLevel >= 0) {
        if (bf >= 0) {
          p = Math.abs(bf - lightLevel) / lightLevel;
        }
        newColor = this.ARR.map(function(c) {
          return c - (p * c);
        });
      } else {
        if (bf >= 0) {
          p = (lightLevel - bf) / (255 - bf);
        }
        newColor = this.ARR.map(function(c) {
          return [(255 - c) * p + c, 255].min();
        });
      }
      return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
    }

    clone() {
      return this.reAlpha(this.a);
    }

    reAlpha(newAlpha) {
      return new Color(this.r, this.g, this.b, newAlpha || 255);
    }

    static AddConstantColor(name, color) {
      color.toHex();
      color.toArray();
      color.toCSS();
      SDK.setConstantToObject(Color, name, color);
    }

    toHex() {
      var b, g, r;
      if (this._colorHex != null) {
        return this._colorHex;
      }
      r = Math.floor(this.r).toString(16).padStart(2, "0");
      g = Math.floor(this.g).toString(16).padStart(2, "0");
      b = Math.floor(this.b).toString(16).padStart(2, "0");
      return this._colorHex = '#' + r + g + b;
    }

    toArray() {
      if (this._colorArray != null) {
        return this._colorArray;
      }
      return this._colorArray = [this.r, this.g, this.b, this.a];
    }

    toCSS() {
      var na, nb, ng, nr;
      if (this._colorCss != null) {
        return this._colorCss;
      }
      nr = Math.round(this.r);
      ng = Math.round(this.g);
      nb = Math.round(this.b);
      na = this.a / 255;
      return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
    }

    toNumber() {
      return Number(this.toHex().replace("#", "0x"));
    }

    static Random() {
      var a, b, c;
      a = SDK.rand(1, 254);
      b = SDK.rand(1, 254);
      c = SDK.rand(1, 254);
      return new Color(a, b, c, 255);
    }

    static FromHex(hexString) {
      var color, result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      color = null;
      if (result != null) {
        color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
      if (color != null) {
        return new Color(color.r, color.g, color.b, 255);
      } else {
        return Color.NONE;
      }
    }

  };
  Object.defineProperties(Color.prototype, {
    R: {
      get: function() {
        return this.r;
      },
      configurable: true
    },
    G: {
      get: function() {
        return this.g;
      },
      configurable: true
    },
    B: {
      get: function() {
        return this.b;
      },
      configurable: true
    },
    A: {
      get: function() {
        return this.a;
      },
      configurable: true
    },
    ARR: {
      get: function() {
        return this.toArray();
      },
      configurable: true
    },
    CSS: {
      get: function() {
        return this.toCSS();
      },
      configurable: true
    },
    HEX: {
      get: function() {
        return this.toHex();
      },
      configurable: true
    },
    OX: {
      get: function() {
        return this.toNumber();
      },
      configurable: true
    }
  });
  Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
  Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
  Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
  Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
  Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
  Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
  Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
  Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
  Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
  Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
  //DevLog
  //------------------------------------------------------------------------------
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.WHITE);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  BitmapSrc = (function() {
    //BitmapSrc
    //------------------------------------------------------------------------------
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          pw = Window_Base._iconWidth;
          ph = Window_Base._iconHeight;
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //ParametersManager
  //------------------------------------------------------------------------------
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] !== void 0;
  };
  ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

  };
  //StringsLoader
  //------------------------------------------------------------------------------
  StringsLoader = class StringsLoader {
    constructor(_parameters) {
      this._parameters = _parameters;
    }

    loadAllStringsToObject(object) {
      var strings;
      strings = this._collect(object);
      this._writeNewString(object, strings);
    }

    _collect(object) {
      var properties, strings;
      properties = Object.getOwnPropertyNames(object);
      strings = properties.filter(function(item) {
        return item.includes("STRING_");
      });
      return strings;
    }

    _writeNewString(object, strings) {
      var j, len, string;
      for (j = 0, len = strings.length; j < len; j++) {
        string = strings[j];
        this._setStringFromPluginParametersToObject(object, string);
      }
    }

    _setStringFromPluginParametersToObject(object, stringName) {
      var newValue;
      newValue = this._parameters[stringName];
      if (newValue) {
        object[stringName] = newValue;
      }
    }

  };
  //EXTENSION TO GLOBAL
  //------------------------------------------------------------------------------
  KDCore.SDK = SDK;
  KDCore.Color = Color;
  KDCore.DevLog = DevLog;
  KDCore.BitmapSrc = BitmapSrc;
  KDCore.ParametersManager = ParametersManager;
  KDCore.StringsLoader = StringsLoader;
})();

// ■ END KDCore.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UTILS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  _ = {};
  _.isSceneMap = function() {
    try {
      return SceneManager._scene instanceof Scene_Map;
    } catch (error) {
      return false;
    }
  };
  _.getPositionPointFromJSON = function(jsonSettings) {
    return _.convertPositionPointFromJSON(jsonSettings.position);
  };
  _.convertPositionPointFromJSON = function(position) {
    var e, x, y;
    try {
      x = position[0];
      y = position[1];
      if (!KDCore.SDK.isInt(x)) {
        x = eval(x);
      }
      if (!KDCore.SDK.isInt(y)) {
        y = eval(y);
      }
      return new PointX(x, y);
    } catch (error) {
      e = error;
      ANET.warning('Utils.getPositionPointFromJSON', e);
      return PointX.Empty;
    }
  };
  //@[EXTEND]
  ANET.Utils = _;
})();

// ■ END UTILS.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UTILS Math.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  ANET.Utils.Math = {};
  //@[DEFINES]
  _ = ANET.Utils.Math;
  _.inRect = function(point, rect) {
    var e, x2, y2;
    try {
      x2 = rect.x + rect.width;
      y2 = rect.y + rect.height;
      return point.x > rect.x && point.x < x2 && point.y < y2 && point.y > rect.y;
    } catch (error) {
      e = error;
      ANET.warning('Utils.Math.inRect', e);
      return false;
    }
  };
})();

// ■ END UTILS Math.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DevExt.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var __TMP_LOG__;
  __TMP_LOG__ = null;
  String.prototype.LOG = function() {
    if (__TMP_LOG__ === null) {
      __TMP_LOG__ = new KDCore.DevLog("TMP");
      __TMP_LOG__.setColors(KDCore.Color.WHITE, KDCore.Color.BLACK.getLightestColor(20));
    }
    __TMP_LOG__.p(this);
  };
  Number.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Array.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Boolean.prototype.LOG = function() {
    return this.toString().LOG();
  };
  String.prototype.P = function() {
    return this.LOG();
  };
  String.prototype.p = function(additionText) {
    var str;
    if (additionText != null) {
      str = this + " : " + additionText;
      return str.LOG();
    } else {
      return this.LOG();
    }
  };
  Array.prototype.findElementByField = function(elementField, value) {
    var result;
    result = this.filter(function(item) {
      return item[elementField] === value;
    });
    if (result.length === 0) {
      return null;
    } else {
      return result[0];
    }
  };
  Array.prototype.findElementIndexByField = function(elementField, value) {
    var element;
    element = this.findElementByField(elementField, value);
    return this.indexOf(element);
  };
})();

// ■ END DevExt.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ XInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var DefaultKeyConfig, IKey, KEYS_GAME, KEYS_RAW, UNSAFE, alias_atbs_input_onKeyDown, alias_atbs_input_onKeyUp, i, j, k, l, m;
  // * CHAT
  DefaultKeyConfig = ["tab", "t"];
  UNSAFE = ['q', 'w', 'x', 'z', 'space'];
  KEYS_RAW = [];
  KEYS_GAME = [];
  Input.KeyMapperPKD = {};
  Input.KeyMapperPKD[8] = "backspace";
  Input.KeyMapperPKD[9] = "tab";
  Input.KeyMapperPKD[13] = "ok";
  Input.KeyMapperPKD[27] = "escape";
  Input.KeyMapperPKD[32] = "space";
  Input.KeyMapperPKD[189] = "-";
  Input.KeyMapperPKD[187] = "+";
  Input.KeyMapperPKD[188] = ",";
  Input.KeyMapperPKD[190] = ".";
  Input.KeyMapperPKD[191] = "?";
  Input.KeyMapperPKD[222] = '"';
  Input.KeyMapperPKD[186] = ';';
  Input.KeyMapperPKD[219] = '[';
  Input.KeyMapperPKD[221] = ']';
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
  for (i = k = 58; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = l = 65; l <= 90; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = m = 97; m <= 122; i = ++m) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  Input._setIgnoreSpecial = false;
  alias_atbs_input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    if (Input._setIgnoreSpecial === true) {
      Input._setStateWithMapperPKD(event.keyCode, true);
    } else {
      alias_atbs_input_onKeyDown.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode, true);
    }
  };
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      this._currentState[symbol] = state;
    }
  };
  alias_atbs_input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    if (Input._setIgnoreSpecial === true) {
      Input._setStateWithMapperPKD(event.keyCode, false);
    } else {
      alias_atbs_input_onKeyUp.call(this, event);
      if (Input.keyMapper[event.keyCode]) {
        return;
      }
      Input._setStateWithMapperPKD(event.keyCode, false);
    }
  };
  Input.isCancel = function() {
    //if Input.isGamepad()
    //    Input.isTriggered('pageup') #LB
    //else
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  Input._isAnySymbol = function(method) {
    var n, o, p;
    for (i = n = 48; n <= 90; i = ++n) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    for (i = o = 186; o <= 222; i = ++o) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    for (i = p = 106; p <= 111; i = ++p) {
      if (method(Input.KeyMapperPKD[i])) {
        return Input.KeyMapperPKD[i];
      }
    }
    return null;
  };
  Input.isAnyPressed = function() {
    return Input._isAnySymbol(Input.isPressed.bind(Input));
  };
  Input.isAnyTriggered = function() {
    return Input._isAnySymbol(Input.isTriggered.bind(Input));
  };
  Input.isAnyLongPressed = function() {
    return Input._isAnySymbol(Input.isLongPressed.bind(Input));
  };
  IKey = function() {
    throw new Error('This is a static class');
  };
  IKey.CHAT = function() {
    return KEYS_GAME[0];
  };
  IKey.SAY = function() {
    return KEYS_GAME[1];
  };
  IKey.loadDefaultKeyConfig = function() {
    return this.loadKeyConfig(DefaultKeyConfig.slice(0)); //Clone
  };
  IKey.loadKeyConfig = function(keyBindingsArray) {
    var n, ref;
    KEYS_RAW = keyBindingsArray;
    for (i = n = 0, ref = KEYS_RAW.length; (0 <= ref ? n < ref : n > ref); i = 0 <= ref ? ++n : --n) {
      if (KEYS_RAW[i] != null) {
        KEYS_GAME[i] = IKey.convertUnsafeSymbols(KEYS_RAW[i]);
      }
    }
  };
  IKey.convertUnsafeSymbols = function(symbol) {
    symbol = symbol.toLowerCase();
    if (!UNSAFE.include(symbol)) {
      return symbol;
    }
    if (symbol === 'q') {
      return 'pageup';
    }
    if (symbol === 'w') {
      return 'pagedown';
    }
    if (symbol === 'x') {
      return 'escape';
    }
    if (symbol === 'z') {
      return 'ok';
    }
    if (symbol === 'space') {
      return 'ok';
    }
  };
  IKey.convertIKeyToLetter = function(symbol) {
    if (symbol === IKey.CHAT()) {
      return KEYS_RAW[0];
    }
    if (symbol === IKey.SAY()) {
      return KEYS_RAW[1];
    }
    return "";
  };
  IKey.getGameRawKeys = function() {
    return KEYS_RAW;
  };
  IKey.getGameKeyByIndex = function(index) {
    return KEYS_GAME[index];
  };
  IKey.changeRawKey = function(index, key) {
    KEYS_RAW[index] = key;
    return KEYS_GAME[index] = this.convertUnsafeSymbols(key);
  };
  AlphaNET.LIBS.IKey = IKey;
  ANET.KEYS = IKey;
})();

// ■ END XInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkClient.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG, NetworkClient, _C, _M, _R;
  LOG = new KDCore.DevLog(" * Client");
  LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200));
  LOG.on();
  //@[DEFINES]
  _C = null; //? ClientManager
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  NetworkClient = class NetworkClient {
    constructor(socket) {
      this.socket = socket;
      _R = this._registerNetMessage.bind(this);
      _M = NetMessage;
      _C = AlphaNET.LIBS.ClientManager;
      NetMessage.Setup(this.socket);
      this._handleCommands();
    }

    _handleCommands() {
      this._handleError();
      this._handleConnect();
      this._handleDisconect();
      return this._handleNET();
    }

    _handleError() {
      return this.socket.on('connect_error', function() {
        LOG.p('Connect error!');
        Network.onConnectionError();
        return Network.disconnect();
      });
    }

    _handleConnect() { // * WHEN THIS CLIENT CONNECT TO SERVER
      return this.socket.on('connect', function() {
        LOG.p('Connected');
        Network.runEvent(Network.commonEventOnConnectToServer);
        return Network.onConnectToServer();
      });
    }

    _handleDisconect() { // * WHEN SERVER TURN OFF
      return this.socket.on('disconnect', function() {
        LOG.p('Disconnected');
        NetPartyManager.clearParty();
        Network.runEvent(Network.commonEventOnDisconectFromServer);
        return Network.onConnectionLost();
      });
    }

    _handleNET() {
      this.socket.on('trace', function() { // * Используется для теста соединения
        return LOG.p("Trace from Server");
      });
      _R(_M.AlertMessage(), function(netData) {
        return window.alert(netData.data);
      });
      _R(_M.PlayerConnect(), _C.OnAnotherConnected);
      _R(_M.PlayerDisconnect(), _C.OnAnotherDisconnected);
      _R(_M.HostResponse(), _C.OnHostResponse);
      _R(_M.PlayersTableResponse(), _C.SetPlayersTableData);
      _R(_M.RequestPlayerData(), _C.OnAnotherPlayerDataRequested);
      _R(_M.PlayerDataResponse(), _C.OnAnotherPlayerDataResponse);
      _R(_M.PlayerMoveData(), _C.OnAnotherPlayerMove);
      _R(_M.MapEventMoveData(), _C.OnEventMoveData);
      _R(_M.WindowSelect(), _C.OnWindowSelectData);
      _R(_M.BattleInputCommand(), _C.OnBattleInputCommand);
      _R(_M.TempMessage(), _C.OnTempMessage);
      _R(_M.SyncEvent(), _C.OnEventSync);
      _R(_M.LockEvent(), _C.OnEventLock);
      _R(_M.OwnEvent(), _C.OnEventOwned);
      _R(_M.StartSharedEvent(), _C.OnStartSharedEvent);
      _R(_M.BattleBattlerRefreshData(), _C.OnBattleBattlerRefreshCommand);
      _R(_M.BattleAction(), _C.OnBattleActionCommand);
      _R(_M.BattleManager(), _C.OnBattleManagerCommand);
      _R(_M.PlayerNetIcon(), _C.OnPlayerNetIcon);
      _R(_M.VirtualInterpreter(), _C.OnVirtualIterpreterCommand);
      _R(_M.PlayerNetActorData(), _C.OnPlayerNetActorData);
      _R(_M.HostGameMapId(), _C.OnHostGameMapId);
      _R(_M.PlayerWorldData(), _C.OnPlayerWorldData);
      _R(_M.GlobalWorldData(), _C.OnGlobalWorldData);
      _R(_M.PlayerNetMapData(), _C.OnPlayerNetMapData);
      _R(_M.RequestGameMapEventsData(), _C.OnRequestGameMapEventsDataFromServer);
      _R(_M.GameMapEventsDataResponse(), _C.OnResponseGameMapEventsDataFromServer);
      _R(_M.SetOwner(), _C.OnSetOwner);
      _R(_M.CallUApi(), _C.OnUserApiCommand);
      _R(_M.StartPvPBattle(), _C.OnStartPvPBattle);
      _R(_M.BattleManagerPvP(), _C.OnBattleManagerPvPCommand);
      _R(_M.SendChatMessage(), _C.OnChatMessage);
      
      // * При завершени ожидания сервера
      this.socket.on(_M.OnWaitResponse().name, function(data) {
        return Network.onServerResponse(data);
      });
      
      //?{TEST}
      return this.socket.on('123', function(data) {
        if ((data != null ? data.waited : void 0) === true) {
          return Network.onServerResponse();
        }
      });
    }

    _registerNetMessage(netMessage, func) {
      return this.socket.on(netMessage.name, func);
    }

    _requestPlayersInitialData() {
      return _M.RequestPlayerData().send();
    }

    disconnect() {
      _C.OnDisconnect();
      if (this.socket != null) {
        return this.socket.disconnect();
      }
    }

  };
  AlphaNET.register(NetworkClient);
})();

// ■ END NetworkClient.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkServer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//* ================ HELP SECTION =================
//client.emit('testX') #ТОЛЬКО ЭТОМУ
//this._server.emit('testX') #ВСЕМ
//client.broadcast.emit('testX') #ВСЕМ, КРОМЕ СЕБЯ

//Как создавать новую команду
//1 - Создаём NetMessage
//2 - Прописываем команду в NetworkServer.coffee
//3 - Прописываем команду в NetworkClient.coffee
//4 - Прописываем логику команды в ClientManager (если это сообщение от сервера)
//5 - Прописываем логику в ServerManager (если это сообщение от клиента к сереру)
//* ==============================================
(function() {
  var LOG, NetworkServer, ServerManager, _M, _R, _RT;
  LOG = new KDCore.DevLog("Server");
  LOG.setColors(KDCore.Color.GREEN, KDCore.Color.BLACK.getLightestColor(120));
  LOG.on();
  //@[DEFINES]
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  _RT = null; //? _retranslate
  ServerManager = null;
  NetworkServer = class NetworkServer {
    constructor(port) {
      this.port = port;
      _M = NetMessage;
      _R = this._registerNetMessage.bind(this);
      _RT = this._retranslate.bind(this);
      ServerManager = AlphaNET.LIBS.ServerManager;
      this._host = null;
      this._startServer();
      ServerManager.Init(this);
      this._handleCommands();
    }

    _startServer() {
      var path;
      path = './js/libs/server';
      this._server = require(path)(this.port);
      Network.runEvent(Network.commonEventOnServerStarted);
      InfoPrinter.p('<font color="green" size="3">网络连接模式开启！</font>');
      setTimeout(InfoPrinter.clear, 3000);
      return LOG.p("started");
    }

    _handleCommands() {
      return this._server.on('connection', (client) => { // * WHEN ANOTHER CLIENT CONNECTS TO THIS SERVER
        LOG.p("Client connected " + client.id);
        this._handleDisconnect(client);
        this._setupServerCommands(client);
        return this._registerConnection(client);
      });
    }

    _handleDisconnect(client) { // * WHEN ANOTHER CLIENT GONE FROM THIS SERVER
      return client.on('disconnect', function() {
        LOG.p("Client disconnected " + client.id);
        return ServerManager.OnClientDisconnect(client);
      });
    }

    _registerConnection(client) {
      "REGISTER CONNECTION".p();
      if (!this._isHostExists()) {
        return this._registerHost(client);
      } else {
        return ServerManager.OnNewPlayerConnected(client);
      }
    }

    _isHostExists() {
      return this._host !== null;
    }

    _registerHost(client) {
      this._host = client;
      LOG.p("Host is " + client.id);
      //TODO: Это не обязательно, так как Хост = этому клиенту, можно сразу на NEtwork Установить
      NetMessage.HostResponse(client).send();
      return ServerManager.RegisterHost(client);
    }

    _setupServerCommands(client) {
      var e;
      try {
        // * Эти команды ретранслируются
        _RT(client, _M.RequestPlayerData());
        _RT(client, _M.PlayerDataResponse());
        _RT(client, _M.PlayerMoveData());
        _RT(client, _M.MapEventMoveData());
        _RT(client, _M.WindowSelect());
        _RT(client, _M.BattleInputCommand());
        _RT(client, _M.TempMessage());
        _RT(client, _M.LockEvent());
        _RT(client, _M.OwnEvent());
        _RT(client, _M.BattleBattlerRefreshData());
        _RT(client, _M.BattleAction());
        _RT(client, _M.BattleManager());
        _RT(client, _M.PlayerNetIcon());
        _RT(client, _M.PlayerNetActorData());
        _RT(client, _M.PlayerNetMapData());
        _RT(client, _M.CallUApi());
        _RT(client, _M.SendChatMessage());
        // * Эти команды выполняются только на сервере
        _R(client, _M.RegisterOnSharedEvent(), ServerManager.RegisterOnSharedEvent);
        _R(client, _M.RegisterOnSharedEventSync(), ServerManager.RegisterOnSharedEventSync);
        _R(client, _M.RequestSync(), ServerManager.RegisterOnSync);
        _R(client, _M.PlayerWorldData(), ServerManager.OnPlayerWorldData);
        _R(client, _M.PlayerNetItemsData(), ServerManager.OnPlayerNetItemsData);
        _R(client, _M.RequestGameMapEventsData(), ServerManager.OnPlayerRequestMapData);
        _R(client, _M.GameMapEventsDataResponse(), ServerManager.OnMapDataResonpse);
        _R(client, _M.PlayerChangeMap(), ServerManager.OnPlayerChangeMap);
        _R(client, _M.RequestPvP(), ServerManager.OnPlayerRequestPvPWithAnother);
        _R(client, _M.BattleManagerPvP(), ServerManager.OnBattleManagerPvPCommand);
        // * Эти команды ретранслируются, а также выполняются на сервере
        _RT(client, _M.StartSharedEvent());
        _R(client, _M.StartSharedEvent(), ServerManager.StartSharedEvent);
        _RT(client, _M.SyncEvent());
        _R(client, _M.SyncEvent(), ServerManager.OnSyncEvent);
        _RT(client, _M.VirtualInterpreter());
        _R(client, _M.VirtualInterpreter(), ServerManager.OnVirtualInterpreter);
      } catch (error) {
        e = error;
        LOG.p(' ! ! ! Server CMD Error');
        Network.error(e, ' on Server commands');
      }
      //?{TEST}
      //client.on _M.TempMessage().name, (data) ->
      //    LOG.p('123')
      //    _M.TempMessage(client).send(data.data)
      //    _M.TempMessage(client).broadcast(data.data)

      //@_registerNetMessage client, 'testWaitHard', -> LOG.p('hard wait accepted')

      //?{TEST}
      client.on('testWaitHard', function(data) {
        return LOG.p('hard wait accepted ' + data.data);
      });
      //?{TEST}
      return client.on('testWaitHardRepeated', function(data) {
        return LOG.p('hard repeat wait accepted ' + data.data);
      });
    }

    // * Этот метод перенаправляет команду от сервера на все клиенты (кроме клиента, который прислал эту команду)
    _retranslate(client, netCommand) {
      return _R(client, netCommand, function(networkData) {
        netCommand.socket = client;
        netCommand.setFrom(client.id);
        return netCommand.broadcast(networkData.data);
      });
    }

    _registerNetMessage(client, netMessage, func) {
      return client.on(netMessage.name, func);
    }

    instance() {
      return this._server;
    }

    isStarted() {
      return this.instance() != null;
    }

    onWaitPoolReady(data) {
      return this._server.emit(_M.OnWaitResponse().name, data);
    }

    abortWaitPool(clientId, code) {
      var client;
      client = this._getClientById(clientId);
      return client != null ? client.emit(_M.OnWaitResponse().name, code) : void 0;
    }

    _getClientById(clientId) {
      return this.clients()[clientId];
    }

    //?{TEST}
    test() {
      return this._server.emit('123', {
        waited: true
      });
    }

    stop() {
      var ref;
      if ((ref = this._server) != null) {
        ref.close();
      }
      this._server = null;
      return LOG.p("stopped");
    }

    clients() {
      return this._server.clients().sockets;
    }

    clientsCount() {
      return Object.keys(this.clients()).length;
    }

  };
  AlphaNET.register(NetworkServer);
})();

// ■ END NetworkServer.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x36af = [
    'charData',
    'onNetworkMoveData',
    'moveData',
    'While\x20moving\x20character',
    'OnEventMoveData',
    'event',
    'nlwzb',
    'parameters',
    '_mapId',
    '_eventId',
    'eventId',
    'function',
    'isCurrentSceneIsMenuBased',
    'safeRefreshCurrentScene',
    'OFKcr',
    '_moveCharacterFromNetwork',
    'EVENT\x20SYNC\x20COMMAND',
    'executeSyncCommandFromNetwork',
    'directionData',
    'onNetworkDirectionData',
    'KSIQj',
    'SEdaS',
    'While\x20moving\x20event',
    'read\x20event\x20sync\x20data',
    'OnWindowSelectData',
    'bRaez',
    'index',
    'networkWAction',
    'action',
    'EVENT\x20OWN\x20COMMAND',
    'setOwnedEventByNetwork',
    'isLock',
    'BmUWQ',
    'while\x20accept\x20new\x20chat\x20message',
    'OnEventSync',
    'OnEventLock',
    'EVENT\x20LOCK\x20COMMAND',
    'OnEventOwned',
    'OnStartSharedEvent',
    'obAPM',
    'NDheL',
    'startEventFromNetwork',
    'NETWORK\x20ICON',
    'inBattle',
    'showNetworkIcon',
    'While\x20start\x20network\x20icon',
    'vwZKl',
    'While\x20responde\x20game\x20map\x20data\x20from\x20server',
    'OnBattleInputCommand',
    'BATTLE\x20:\x20ON\x20INPUT\x20COMMAND',
    '_selectInputCommandFromNetwork',
    'BATTLE\x20:\x20ACTOR\x20REFRESH',
    'getBattleSubjectById',
    'UqgvX',
    'xjNcY',
    '_hp',
    '_tp',
    'states',
    'OnBattleActionCommand',
    'BATTLE\x20:\x20GAME\x20ACTION',
    'setResult',
    'cITlq',
    'TEMP\x20MESSAGE\x20:\x20NETWORK\x20DATA',
    'target',
    'hJdbw',
    'BTLRX',
    'clearResult',
    'setupFromOuterData',
    'result',
    '_result',
    'memberByActorId',
    'actorId',
    'currentAction',
    'setSkill',
    'PUbEK',
    '_states',
    'setSkillFromNet',
    'setItem',
    'OGwIg',
    'Xilft',
    'setItemFromNet',
    'setTargetFromNet',
    'actionId',
    'OnBattleManagerCommand',
    'BATTLE\x20:\x20MANAGER',
    'battleOrder',
    '_actionBattlers',
    'convertIdsToBattlers',
    'orderData',
    'enemyIds',
    'GoIjP',
    'setUniqueIdsForEnemies',
    'endAction',
    'IaeJr',
    'lkxUf',
    'onGlobalWorldDataFromNetwork',
    'endTurn',
    'processTurn',
    '_processTurnFromNetwork',
    'subjectId',
    'startAction',
    '_startActionFromNetwork',
    'targets',
    'invokeNormal',
    'abortBattle',
    'exptE',
    '_abortBattleCommandFromNetwork',
    'read\x20Window\x20Select\x20Data\x20from\x20Server',
    'victory',
    'processVictory',
    'defeat',
    'escape',
    '_onEscapeFromNetwork',
    'success',
    'OnPlayerNetIcon',
    'iCOTk',
    'TayoW',
    '_params',
    'command',
    'ezgny',
    'While\x20try\x20response\x20to\x20server\x20map\x20data\x20events\x20request',
    'terminate',
    'While\x20try\x20synchronize\x20another\x20actor\x20data',
    'MwkCj',
    'kmEQz',
    'While\x20try\x20execute\x20virtual\x20command',
    'OnPlayerNetActorData',
    'wmuJI',
    'umhHJ',
    'onActorDataFromNetwork',
    'byrIm',
    'isHost',
    'tTGbB',
    'NcDrz',
    'sessionData',
    'setPlayerActorData',
    'While\x20try\x20save\x20another\x20actor\x20data',
    'parse',
    'targetData',
    '_actionEndPvPFromNetwork',
    'SERVER\x20MAP\x20IS\x20OTHER,\x20TRANSFER\x20PLAYER!',
    'reserveTransfer',
    'OnPlayerWorldData',
    'onActroItemsFromNetwork',
    'actorItems',
    'actorData',
    'onWorldDataFromNetwork',
    'JgKWX',
    'While\x20try\x20load\x20player\x20world\x20data\x20from\x20server',
    'While\x20try\x20synchronize\x20game\x20map\x20with\x20Server',
    'hXRdu',
    'dsXIh',
    'RdyQj',
    'mapData',
    'While\x20try\x20load\x20global\x20world\x20data\x20from\x20server',
    'OnPlayerNetMapData',
    'zrSnA',
    'MNdLY',
    'OnRequestGameMapEventsDataFromServer',
    'PETKN',
    'GameMapEventsDataResponse',
    'tIDjD',
    'OnResponseGameMapEventsDataFromServer',
    'OnSetOwner',
    'I\x20map\x20owner!',
    '_isMapOwner',
    'OnUserApiCommand',
    'zUEoQ',
    'While\x20execute\x20uAPI\x20network\x20command',
    'name',
    'OnStartPvPBattle',
    '_outerStartPvP',
    'OnBattleManagerPvPCommand',
    'startTurnPvP',
    '_startPvPTurnFromNetwork',
    'startActionPvP',
    'kAQFh',
    'kXSdA',
    '_startActionFromNetworkPvP',
    'invokeNormalActionPvP',
    'XryMm',
    'resultSubject',
    'resultTarget',
    '_invokeNormalActionFromNetworkPvP',
    'targetId',
    'endActionPvP',
    'subjectData',
    'while\x20accept\x20Battle\x20Manager\x20PvP\x20Command',
    'OnChatMessage',
    'OnHostResponse',
    'setHost',
    'OnAnotherConnected',
    'runEvent',
    'commonEventOnOtherClientConnected',
    'OnAnotherDisconnected',
    'from',
    'removePlayer',
    'commonEventOnOtherClientDisconected',
    'players',
    'data',
    'myPlayerData',
    'playerData',
    'myId',
    'refreshParty',
    'SetupVirtualUpdate',
    'RequestPlayerData',
    'send',
    'RequestGameMapEventsData',
    'PlayerChangeMap',
    'mapId',
    '_virtualUpdateThread',
    'WEewj',
    'error',
    'isConnected',
    'HUFoi',
    'getActorIdBySocketId',
    '_onNewChatMessage',
    'synchronize',
    'aUKcc',
    'SERVER_UPDATE_TIME',
    'OnAnotherPlayerDataRequested',
    'collectDataForNetwork',
    'OnAnotherPlayerDataResponse',
    'PLAYER\x20DATA\x20FROM',
    'synchronizeFromNetwork',
    'While\x20character\x20synchronization',
    'OnAnotherPlayerMove',
    'getCharById',
    'onNetworkCharacterData'
];
(function (_0x2ddba9, _0x79ee40) {
    var _0x2d03e6 = function (_0x2bb6a1) {
        while (--_0x2bb6a1) {
            _0x2ddba9['push'](_0x2ddba9['shift']());
        }
    };
    _0x2d03e6(++_0x79ee40);
}(_0x36af, 0x1a2));
var _0x1410 = function (_0x4f8396, _0x4b81e5) {
    _0x4f8396 = _0x4f8396 - 0x0;
    var _0x2d0adf = _0x36af[_0x4f8396];
    return _0x2d0adf;
};
var ClientManager;
ClientManager = class ClientManager {
    static [_0x1410('0x0')]() {
        return Network[_0x1410('0x1')]();
    }
    static [_0x1410('0x2')](_0x2707f2) {
        return Network[_0x1410('0x3')](Network[_0x1410('0x4')]);
    }
    static [_0x1410('0x5')](_0x40be18) {
        if (!Network['playerData'](_0x40be18[_0x1410('0x6')])) {
            return;
        }
        NetPartyManager[_0x1410('0x7')](_0x40be18[_0x1410('0x6')]);
        return Network['runEvent'](Network[_0x1410('0x8')]);
    }
    static ['SetPlayersTableData'](_0x173ec0) {
        if (!Network['isHost']()) {
            Network[_0x1410('0x9')] = _0x173ec0[_0x1410('0xa')];
            Network[_0x1410('0xb')] = Network[_0x1410('0xc')](Network[_0x1410('0xd')]());
        }
        NetPartyManager[_0x1410('0xe')]();
        ClientManager[_0x1410('0xf')]();
        NetMessage[_0x1410('0x10')]()[_0x1410('0x11')]();
        if (!Network['isHost']()) {
            NetMessage[_0x1410('0x12')]()[_0x1410('0x11')]($gameMap['mapId']());
            return NetMessage[_0x1410('0x13')]()[_0x1410('0x11')]($gameMap[_0x1410('0x14')]());
        }
    }
    static ['SetupVirtualUpdate']() {
        var _0x4841d3;
        if (ClientManager[_0x1410('0x15')] != null) {
            if (_0x1410('0x16') === _0x1410('0x16')) {
                return;
            } else {
                e = error;
                return Network[_0x1410('0x17')](e, 'read\x20event\x20sync\x20data');
            }
        }
        return ClientManager['_virtualUpdateThread'] = setTimeout(_0x4841d3 = function () {
            if (!Network[_0x1410('0x18')]()) {
                if ('HUFoi' !== _0x1410('0x19')) {
                    actorId = NetPartyManager[_0x1410('0x1a')](networkData['from']);
                    return Network[_0x1410('0x1b')](actorId, networkData[_0x1410('0xa')]);
                } else {
                    return;
                }
            }
            NetPartyManager[_0x1410('0x1c')]();
            NetWorldManager[_0x1410('0x1c')]();
            if (ClientManager[_0x1410('0x15')] != null) {
                if (_0x1410('0x1d') !== 'zpQBT') {
                    return ClientManager[_0x1410('0x15')] = setTimeout(_0x4841d3, Network[_0x1410('0x1e')]);
                } else {
                    return;
                }
            }
        }, Network[_0x1410('0x1e')]);
    }
    static [_0x1410('0x1f')](_0x3118f6) {
        NetMessage['PlayerDataResponse']()[_0x1410('0x11')]($gamePlayer[_0x1410('0x20')]());
        return NetPartyManager[_0x1410('0x1c')]();
    }
    static [_0x1410('0x21')](_0x381c9a) {
        var _0x3d2ea4, _0x2fe75d;
        _0x1410('0x22')['p'](_0x381c9a['from']);
        try {
            _0x3d2ea4 = NetPartyManager['getCharById'](_0x381c9a[_0x1410('0x6')]);
            return _0x3d2ea4 != null ? _0x3d2ea4[_0x1410('0x23')](_0x381c9a[_0x1410('0xa')]) : void 0x0;
        } catch (_0x3a02f8) {
            _0x2fe75d = _0x3a02f8;
            return Network[_0x1410('0x17')](_0x2fe75d, _0x1410('0x24'));
        }
    }
    static [_0x1410('0x25')](_0x40df94) {
        var _0x27aa59;
        _0x27aa59 = NetPartyManager[_0x1410('0x26')](_0x40df94[_0x1410('0x6')]);
        if (_0x27aa59 == null) {
            return;
        }
        return ClientManager['_moveCharacterFromNetwork'](_0x27aa59, _0x40df94[_0x1410('0xa')]);
    }
    static ['_moveCharacterFromNetwork'](_0x31c406, _0x1d6793) {
        var _0x523e40;
        try {
            _0x31c406[_0x1410('0x27')](_0x1d6793[_0x1410('0x28')]);
            return _0x31c406[_0x1410('0x29')](_0x1d6793[_0x1410('0x2a')]);
        } catch (_0x22874) {
            _0x523e40 = _0x22874;
            return Network[_0x1410('0x17')](_0x523e40, _0x1410('0x2b'));
        }
    }
    static [_0x1410('0x2c')](_0xaeb421) {
        var _0x588b03, _0x299b81, _0x19ac8a, _0x4a1a55;
        try {
            _0x588b03 = _0xaeb421[_0x1410('0xa')];
            _0x4a1a55 = _0x588b03[_0x1410('0x14')];
            if ($gameMap[_0x1410('0x14')]() !== _0x4a1a55) {
                return;
            }
            _0x19ac8a = $gameMap[_0x1410('0x2d')](_0x588b03['eventId']);
            if (!_0x19ac8a) {
                if (_0x1410('0x2e') !== _0x1410('0x2e')) {
                    interpreter = new Game_Interpreter();
                    interpreter['_params'] = _0x588b03[_0x1410('0x2f')];
                    interpreter[_0x1410('0x30')] = _0x588b03['mapId'];
                    interpreter[_0x1410('0x31')] = _0x588b03[_0x1410('0x32')];
                    methodName = 'command' + _0x588b03['id'];
                    method = interpreter[methodName];
                    if (method != null && typeof method === _0x1410('0x33')) {
                        interpreter[methodName]();
                        if (SceneManager[_0x1410('0x34')]()) {
                            SceneManager[_0x1410('0x35')]();
                        }
                    }
                    return interpreter['terminate']();
                } else {
                    return;
                }
            }
            if (_0x588b03['moveData'] != null) {
                if ('HbJcZ' !== _0x1410('0x36')) {
                    ClientManager[_0x1410('0x37')](_0x19ac8a, _0x588b03[_0x1410('0x2a')]);
                } else {
                    _0x1410('0x38')['p']();
                    _ = _0xaeb421['data'];
                    _0x4a1a55 = _['mapId'];
                    if ($gameMap[_0x1410('0x14')]() !== _0x4a1a55) {
                        return;
                    }
                    _0x19ac8a = $gameMap[_0x1410('0x2d')](_[_0x1410('0x32')]);
                    return _0x19ac8a != null ? _0x19ac8a[_0x1410('0x39')](_['pi'], _['li']) : void 0x0;
                }
            }
            if (_0x588b03[_0x1410('0x3a')] != null) {
                return _0x19ac8a[_0x1410('0x3b')](_0x588b03['directionData']);
            }
        } catch (_0x37a684) {
            if (_0x1410('0x3c') !== _0x1410('0x3d')) {
                _0x299b81 = _0x37a684;
                return Network[_0x1410('0x17')](_0x299b81, _0x1410('0x3e'));
            } else {
                var _0x34c9b7, _0x4945bf, _0x259ff9, _0x140386;
                try {
                    _0x1410('0x38')['p']();
                    _0x34c9b7 = _0xaeb421['data'];
                    _0x140386 = _0x34c9b7[_0x1410('0x14')];
                    if ($gameMap[_0x1410('0x14')]() !== _0x140386) {
                        return;
                    }
                    _0x259ff9 = $gameMap[_0x1410('0x2d')](_0x34c9b7[_0x1410('0x32')]);
                    return _0x259ff9 != null ? _0x259ff9[_0x1410('0x39')](_0x34c9b7['pi'], _0x34c9b7['li']) : void 0x0;
                } catch (_0x1d5d73) {
                    _0x4945bf = _0x1d5d73;
                    return Network[_0x1410('0x17')](_0x4945bf, _0x1410('0x3f'));
                }
            }
        }
    }
    static [_0x1410('0x40')](_0x3b6dc7) {
        var _0x220197, _0x30e9f8;
        try {
            if (_0x1410('0x41') !== 'VwWXm') {
                _0x220197 = _0x3b6dc7[_0x1410('0xa')];
                $gameTemp['networkWSelectedIndex'] = _0x220197[_0x1410('0x42')];
                if ($gameTemp['networkWAction'] == null) {
                    return $gameTemp[_0x1410('0x43')] = _0x220197[_0x1410('0x44')];
                }
            } else {
                var _0x44ab21, _0x43ebf9;
                try {
                    _0x1410('0x45')['p']();
                    _0x44ab21 = _0x3b6dc7['data'];
                    if ($gameMap['mapId']() !== _0x44ab21['mapId']) {
                        return;
                    }
                    return $gameMap[_0x1410('0x46')](_0x44ab21[_0x1410('0x32')], _0x44ab21[_0x1410('0x47')]);
                } catch (_0x565ab3) {
                    _0x43ebf9 = _0x565ab3;
                    return Network[_0x1410('0x17')](_0x43ebf9, _0x1410('0x3f'));
                }
            }
        } catch (_0x399ab6) {
            if ('BmUWQ' !== _0x1410('0x48')) {
                _0x30e9f8 = _0x399ab6;
                return Network[_0x1410('0x17')](_0x30e9f8, _0x1410('0x49'));
            } else {
                _0x30e9f8 = _0x399ab6;
                return Network[_0x1410('0x17')](_0x30e9f8, 'read\x20Window\x20Select\x20Data\x20from\x20Server');
            }
        }
    }
    static [_0x1410('0x4a')](_0x23afc6) {
        var _0x26d1e7, _0x56b4a5, _0x566fd4, _0x2f6bc7;
        try {
            _0x1410('0x38')['p']();
            _0x26d1e7 = _0x23afc6['data'];
            _0x2f6bc7 = _0x26d1e7[_0x1410('0x14')];
            if ($gameMap[_0x1410('0x14')]() !== _0x2f6bc7) {
                return;
            }
            _0x566fd4 = $gameMap[_0x1410('0x2d')](_0x26d1e7[_0x1410('0x32')]);
            return _0x566fd4 != null ? _0x566fd4[_0x1410('0x39')](_0x26d1e7['pi'], _0x26d1e7['li']) : void 0x0;
        } catch (_0x5d389f) {
            _0x56b4a5 = _0x5d389f;
            return Network[_0x1410('0x17')](_0x56b4a5, 'read\x20event\x20sync\x20data');
        }
    }
    static [_0x1410('0x4b')](_0x112394) {
        var _0x15b37d, _0x5cb597;
        try {
            _0x1410('0x4c')['p']();
            _0x15b37d = _0x112394[_0x1410('0xa')];
            if ($gameMap[_0x1410('0x14')]() !== _0x15b37d[_0x1410('0x14')]) {
                return;
            }
            return $gameMap['setLockedEventByNetwork'](_0x15b37d['eventId'], _0x15b37d['isLock']);
        } catch (_0x13c699) {
            _0x5cb597 = _0x13c699;
            return Network[_0x1410('0x17')](_0x5cb597, _0x1410('0x3f'));
        }
    }
    static [_0x1410('0x4d')](_0x3413b2) {
        var _0x4610d6, _0xa328ae;
        try {
            _0x1410('0x45')['p']();
            _0x4610d6 = _0x3413b2['data'];
            if ($gameMap[_0x1410('0x14')]() !== _0x4610d6[_0x1410('0x14')]) {
                return;
            }
            return $gameMap['setOwnedEventByNetwork'](_0x4610d6[_0x1410('0x32')], _0x4610d6[_0x1410('0x47')]);
        } catch (_0x3e03d5) {
            _0xa328ae = _0x3e03d5;
            return Network[_0x1410('0x17')](_0xa328ae, 'read\x20event\x20sync\x20data');
        }
    }
    static [_0x1410('0x4e')](_0x23caea) {
        var _0x219aed;
        try {
            if (_0x1410('0x4f') !== _0x1410('0x50')) {
                'START\x20SHARED\x20EVENT\x20FROM\x20NETWORK'['p']();
                return $gameMap[_0x1410('0x51')](_0x23caea[_0x1410('0xa')]);
            } else {
                var _0x16573a, _0x3f3654;
                _0x1410('0x52')['p']();
                try {
                    _0x16573a = NetPartyManager['getCharById'](_0x23caea[_0x1410('0x6')]);
                    if (!Network[_0x1410('0x53')]()) {
                        return _0x16573a != null ? _0x16573a[_0x1410('0x54')](_0x23caea[_0x1410('0xa')]) : void 0x0;
                    }
                } catch (_0x501c51) {
                    _0x3f3654 = _0x501c51;
                    return Network[_0x1410('0x17')](_0x3f3654, _0x1410('0x55'));
                }
            }
        } catch (_0x232b50) {
            if (_0x1410('0x56') !== 'vwZKl') {
                _0x219aed = _0x232b50;
                return Network[_0x1410('0x17')](_0x219aed, _0x1410('0x57'));
            } else {
                _0x219aed = _0x232b50;
                return Network[_0x1410('0x17')](_0x219aed, 'read\x20shared\x20event\x20data');
            }
        }
    }
    static [_0x1410('0x58')](_0x363553) {
        _0x1410('0x59')['p']();
        return BattleManager[_0x1410('0x5a')](_0x363553['data']);
    }
    static ['OnBattleBattlerRefreshCommand'](_0x58be09) {
        var _0x2bb9f1, _0x37277a;
        _0x37277a = _0x58be09[_0x1410('0xa')];
        _0x1410('0x5b')['p'](_0x37277a['id']);
        _0x2bb9f1 = BattleManager[_0x1410('0x5c')](_0x37277a['id']);
        if (_0x2bb9f1 != null) {
            if (_0x1410('0x5d') !== _0x1410('0x5e')) {
                _0x2bb9f1[_0x1410('0x5f')] = _0x37277a['hp'];
                _0x2bb9f1['_mp'] = _0x37277a['mp'];
                _0x2bb9f1[_0x1410('0x60')] = _0x37277a['tp'];
                _0x2bb9f1['_states'] = _0x37277a[_0x1410('0x61')];
            } else {
                e = error;
                return Network[_0x1410('0x17')](e, 'read\x20shared\x20event\x20data');
            }
        }
    }
    static [_0x1410('0x62')](_0x497b16) {
        var _0x27b01a, _0x3f4822, _0x1cf246, _0x21c380, _0x2de7ea, _0x4118ba;
        _0x1cf246 = _0x497b16['data'];
        _0x1410('0x63')['p'](_0x1cf246['id']);
        if (_0x1cf246['id'] === _0x1410('0x64')) {
            if ('Tchec' === _0x1410('0x65')) {
                return _0x1410('0x66')['p']();
            } else {
                _0x2de7ea = BattleManager[_0x1410('0x5c')](_0x1cf246['sbj']);
                _0x4118ba = BattleManager[_0x1410('0x5c')](_0x1cf246[_0x1410('0x67')]);
                if (_0x2de7ea != null) {
                    if (_0x1410('0x68') === _0x1410('0x69')) {
                        Network['players'] = _0x497b16['data'];
                        Network[_0x1410('0xb')] = Network[_0x1410('0xc')](Network['myId']());
                    } else {
                        _0x2de7ea[_0x1410('0x6a')]();
                    }
                }
                _0x21c380 = new Game_ActionResult();
                _0x21c380[_0x1410('0x6b')](_0x1cf246[_0x1410('0x6c')]);
                _0x4118ba[_0x1410('0x6d')] = _0x21c380;
                return;
            }
        }
        _0x3f4822 = $gameParty[_0x1410('0x6e')](_0x1cf246[_0x1410('0x6f')]);
        _0x27b01a = _0x3f4822[_0x1410('0x70')]();
        if (_0x1cf246['id'] === _0x1410('0x71')) {
            if (_0x1410('0x72') === 'vSlBJ') {
                var _0x3fcb7f, _0x37d28a;
                _0x37d28a = _0x497b16['data'];
                _0x1410('0x5b')['p'](_0x37d28a['id']);
                _0x3fcb7f = BattleManager[_0x1410('0x5c')](_0x37d28a['id']);
                if (_0x3fcb7f != null) {
                    _0x3fcb7f[_0x1410('0x5f')] = _0x37d28a['hp'];
                    _0x3fcb7f['_mp'] = _0x37d28a['mp'];
                    _0x3fcb7f[_0x1410('0x60')] = _0x37d28a['tp'];
                    _0x3fcb7f[_0x1410('0x73')] = _0x37d28a[_0x1410('0x61')];
                }
            } else {
                if (_0x27b01a != null) {
                    _0x27b01a[_0x1410('0x74')](_0x1cf246['actionId']);
                }
                return;
            }
        }
        if (_0x1cf246['id'] === _0x1410('0x75')) {
            if (_0x1410('0x76') === _0x1410('0x77')) {
                if (!Network[_0x1410('0xc')](_0x497b16[_0x1410('0x6')])) {
                    return;
                }
                NetPartyManager[_0x1410('0x7')](_0x497b16['from']);
                return Network[_0x1410('0x3')](Network[_0x1410('0x8')]);
            } else {
                if (_0x27b01a != null) {
                    _0x27b01a[_0x1410('0x78')](_0x1cf246['actionId']);
                }
                return;
            }
        }
        if (_0x1cf246['id'] === 'setTarget') {
            if (_0x27b01a != null) {
                _0x27b01a[_0x1410('0x79')](_0x1cf246[_0x1410('0x7a')]);
            }
        }
    }
    static [_0x1410('0x7b')](_0x4a977e) {
        var _0xe416ff, _0x4cffa9;
        _0x4cffa9 = _0x4a977e[_0x1410('0xa')];
        _0xe416ff = _0x4cffa9['id'];
        _0x1410('0x7c')['p'](_0xe416ff);
        if (_0xe416ff === _0x1410('0x7d')) {
            BattleManager[_0x1410('0x7e')] = BattleManager[_0x1410('0x7f')](_0x4cffa9[_0x1410('0x80')]);
            return;
        }
        if (_0xe416ff === _0x1410('0x81')) {
            if (_0x1410('0x82') === 'ffeEy') {
                var _0x9f4ae7;
                _0x9f4ae7 = NetPartyManager[_0x1410('0x26')](_0x4a977e[_0x1410('0x6')]);
                if (_0x9f4ae7 == null) {
                    return;
                }
                return ClientManager['_moveCharacterFromNetwork'](_0x9f4ae7, _0x4a977e[_0x1410('0xa')]);
            } else {
                $gameTroop[_0x1410('0x83')](_0x4cffa9['troopIds']);
                return;
            }
        }
        if (_0xe416ff === _0x1410('0x84')) {
            if (_0x1410('0x85') !== _0x1410('0x86')) {
                BattleManager[_0x1410('0x84')]();
                return;
            } else {
                return NetWorldManager[_0x1410('0x87')](_0x4a977e[_0x1410('0xa')]);
            }
        }
        if (_0xe416ff === _0x1410('0x88')) {
            BattleManager[_0x1410('0x88')]();
            return;
        }
        if (_0xe416ff === _0x1410('0x89')) {
            BattleManager[_0x1410('0x8a')](_0x4cffa9[_0x1410('0x8b')]);
            return;
        }
        if (_0xe416ff === _0x1410('0x8c')) {
            BattleManager[_0x1410('0x8d')](_0x4cffa9[_0x1410('0x8e')]);
            return;
        }
        if (_0xe416ff === _0x1410('0x8f')) {
            BattleManager['_invokeNormalActionFromNetwork'](_0x4cffa9[_0x1410('0x8b')], _0x4cffa9['targetId']);
            return;
        }
        if (_0xe416ff === _0x1410('0x90')) {
            if ('Hbzgx' !== _0x1410('0x91')) {
                BattleManager[_0x1410('0x92')]();
                return;
            } else {
                e = error;
                return Network[_0x1410('0x17')](e, _0x1410('0x93'));
            }
        }
        if (_0xe416ff === _0x1410('0x94')) {
            BattleManager[_0x1410('0x95')]();
            return;
        }
        if (_0xe416ff === _0x1410('0x96')) {
            BattleManager['processDefeat']();
            return;
        }
        if (_0xe416ff === _0x1410('0x97')) {
            BattleManager[_0x1410('0x98')](_0x4cffa9[_0x1410('0x99')]);
        }
    }
    static [_0x1410('0x9a')](_0x50333c) {
        var _0x38a8b9, _0xcd8b07;
        _0x1410('0x52')['p']();
        try {
            _0x38a8b9 = NetPartyManager[_0x1410('0x26')](_0x50333c[_0x1410('0x6')]);
            if (!Network[_0x1410('0x53')]()) {
                return _0x38a8b9 != null ? _0x38a8b9[_0x1410('0x54')](_0x50333c[_0x1410('0xa')]) : void 0x0;
            }
        } catch (_0x55716c) {
            if (_0x1410('0x9b') !== _0x1410('0x9b')) {
                data = _0x50333c['data'];
                $gameTemp['networkWSelectedIndex'] = data['index'];
                if ($gameTemp[_0x1410('0x43')] == null) {
                    return $gameTemp['networkWAction'] = data['action'];
                }
            } else {
                _0xcd8b07 = _0x55716c;
                return Network[_0x1410('0x17')](_0xcd8b07, _0x1410('0x55'));
            }
        }
    }
    static ['OnVirtualIterpreterCommand'](_0x381001) {
        var _0x39836b, _0xd6ff8f, _0x49fee2, _0x2ede31, _0x4c3e26;
        'VIRTUAL\x20INTERPRETER'['p'](_0x381001[_0x1410('0xa')]['id']);
        _0x39836b = _0x381001['data'];
        try {
            if (_0x1410('0x9c') === _0x1410('0x9c')) {
                _0x49fee2 = new Game_Interpreter();
                _0x49fee2[_0x1410('0x9d')] = _0x39836b[_0x1410('0x2f')];
                _0x49fee2[_0x1410('0x30')] = _0x39836b['mapId'];
                _0x49fee2[_0x1410('0x31')] = _0x39836b['eventId'];
                _0x4c3e26 = _0x1410('0x9e') + _0x39836b['id'];
                _0x2ede31 = _0x49fee2[_0x4c3e26];
                if (_0x2ede31 != null && typeof _0x2ede31 === _0x1410('0x33')) {
                    if (_0x1410('0x9f') !== _0x1410('0x9f')) {
                        var _0xf9506, _0x4be3fd, _0x1f4fcd, _0x473eba;
                        try {
                            _0x1f4fcd = _0x381001[_0x1410('0xa')];
                            if ($gameMap[_0x1410('0x14')]() === _0x1f4fcd) {
                                _0x4be3fd = $gameMap[_0x1410('0x20')]();
                                _0x473eba = {
                                    'mapId': $gameMap['mapId'](),
                                    'mapData': _0x4be3fd
                                };
                                NetMessage['GameMapEventsDataResponse']()['send'](_0x473eba);
                                return NetMessage[_0x1410('0x10')]()[_0x1410('0x11')]();
                            }
                        } catch (_0x1eccfe) {
                            _0xf9506 = _0x1eccfe;
                            return Network[_0x1410('0x17')](_0xf9506, _0x1410('0xa0'));
                        }
                    } else {
                        _0x49fee2[_0x4c3e26]();
                        if (SceneManager[_0x1410('0x34')]()) {
                            if ('aaWlS' === 'aaWlS') {
                                SceneManager[_0x1410('0x35')]();
                            } else {
                                NetMessage[_0x1410('0x12')]()[_0x1410('0x11')]($gameMap[_0x1410('0x14')]());
                                return NetMessage[_0x1410('0x13')]()['send']($gameMap[_0x1410('0x14')]());
                            }
                        }
                    }
                }
                return _0x49fee2[_0x1410('0xa1')]();
            } else {
                _0xd6ff8f = error;
                return Network[_0x1410('0x17')](_0xd6ff8f, _0x1410('0xa2'));
            }
        } catch (_0x19f492) {
            if (_0x1410('0xa3') === _0x1410('0xa4')) {
                SceneManager[_0x1410('0x35')]();
            } else {
                _0xd6ff8f = _0x19f492;
                return Network[_0x1410('0x17')](_0xd6ff8f, _0x1410('0xa5'));
            }
        }
    }
    static ['OnTempMessage'](_0x637b5e) {
        return _0x1410('0x66')['p']();
    }
    static [_0x1410('0xa6')](_0x59dc53) {
        var _0x38e11d, _0x2c62fc;
        try {
            if (_0x1410('0xa7') !== _0x1410('0xa8')) {
                NetPartyManager[_0x1410('0xa9')](_0x59dc53[_0x1410('0x6')], _0x59dc53[_0x1410('0xa')]);
                try {
                    if (_0x1410('0xaa') !== _0x1410('0xaa')) {
                        BattleManager[_0x1410('0x95')]();
                        return;
                    } else {
                        if (Network[_0x1410('0xab')]()) {
                            if (_0x1410('0xac') !== _0x1410('0xad')) {
                                _0x38e11d = NetPartyManager[_0x1410('0x1a')](_0x59dc53[_0x1410('0x6')]);
                                return Network[_0x1410('0xae')][_0x1410('0xaf')](_0x38e11d, _0x59dc53[_0x1410('0xa')]);
                            } else {
                                _0x2c62fc = error;
                                return Network[_0x1410('0x17')](_0x2c62fc, _0x1410('0x3e'));
                            }
                        }
                    }
                } catch (_0x4b6251) {
                    _0x2c62fc = _0x4b6251;
                    return Network[_0x1410('0x17')](_0x2c62fc, _0x1410('0xb0'));
                }
            } else {
                dataA = JsonEx['parse'](data['subjectData']);
                dataB = JsonEx[_0x1410('0xb1')](data[_0x1410('0xb2')]);
                BattleManager[_0x1410('0xb3')](dataA, dataB);
            }
        } catch (_0x519dc8) {
            _0x2c62fc = _0x519dc8;
            return Network[_0x1410('0x17')](_0x2c62fc, _0x1410('0xa2'));
        }
    }
    static ['OnHostGameMapId'](_0x3ea2dc) {
        var _0x222a2e, _0x466e1a, _0x4a2819;
        try {
            _0x466e1a = _0x3ea2dc['data'][_0x1410('0x14')];
            if ($gameMap[_0x1410('0x14')]() !== _0x466e1a) {
                _0x1410('0xb4')['p']();
                _0x4a2819 = _0x3ea2dc[_0x1410('0xa')];
                return $gamePlayer[_0x1410('0xb5')](_0x466e1a, _0x4a2819['x'], _0x4a2819['y'], _0x4a2819['d'], 0x0);
            }
        } catch (_0x28f8ba) {
            _0x222a2e = _0x28f8ba;
            return Network[_0x1410('0x17')](_0x222a2e, 'While\x20try\x20synchronize\x20game\x20map\x20with\x20Server');
        }
    }
    static [_0x1410('0xb6')](_0x45eb57) {
        var _0x3da431, _0x1ada10;
        try {
            _0x1ada10 = _0x45eb57[_0x1410('0xa')];
            NetPartyManager[_0x1410('0xb7')](_0x45eb57[_0x1410('0x6')], _0x1ada10[_0x1410('0xb8')]);
            NetPartyManager[_0x1410('0xa9')](_0x45eb57[_0x1410('0x6')], _0x1ada10[_0x1410('0xb9')]);
            return NetWorldManager[_0x1410('0xba')](_0x1ada10);
        } catch (_0x1ff486) {
            if (_0x1410('0xbb') === _0x1410('0xbb')) {
                _0x3da431 = _0x1ff486;
                return Network[_0x1410('0x17')](_0x3da431, _0x1410('0xbc'));
            } else {
                _0x3da431 = _0x1ff486;
                return Network[_0x1410('0x17')](_0x3da431, _0x1410('0xbd'));
            }
        }
    }
    static ['OnGlobalWorldData'](_0x30ec72) {
        var _0x37b844;
        try {
            if (_0x1410('0xbe') === _0x1410('0xbe')) {
                return NetWorldManager['onGlobalWorldDataFromNetwork'](_0x30ec72[_0x1410('0xa')]);
            } else {
                BattleManager[_0x1410('0x98')](data['success']);
            }
        } catch (_0x2138bf) {
            if (_0x1410('0xbf') === _0x1410('0xc0')) {
                var _0x5e43d1, _0x71f8b, _0x1bf306;
                try {
                    _0x1bf306 = _0x30ec72['data'][_0x1410('0x14')];
                    if ($gameMap['mapId']() === _0x1bf306) {
                        _0x71f8b = _0x30ec72[_0x1410('0xa')][_0x1410('0xc1')];
                        return $gameMap[_0x1410('0x23')](_0x71f8b);
                    }
                } catch (_0x1aed77) {
                    _0x5e43d1 = _0x1aed77;
                    return Network[_0x1410('0x17')](_0x5e43d1, _0x1410('0x57'));
                }
            } else {
                _0x37b844 = _0x2138bf;
                return Network[_0x1410('0x17')](_0x37b844, _0x1410('0xc2'));
            }
        }
    }
    static [_0x1410('0xc3')](_0x3368ab) {
        var _0x13ac7c, _0x43b3a8;
        try {
            if (_0x1410('0xc4') === _0x1410('0xc5')) {
                _0x13ac7c = error;
                return Network['error'](_0x13ac7c, _0x1410('0xc2'));
            } else {
                _0x43b3a8 = NetPartyManager['getPlayer'](_0x3368ab[_0x1410('0x6')]);
                return _0x43b3a8['mapId'] = _0x3368ab['data'];
            }
        } catch (_0x5457a2) {
            _0x13ac7c = _0x5457a2;
            return Network[_0x1410('0x17')](_0x13ac7c, _0x1410('0xc2'));
        }
    }
    static [_0x1410('0xc6')](_0x59038) {
        var _0x2b99f2, _0x16551f, _0x2a0046, _0x29ae3d;
        try {
            if (_0x1410('0xc7') === _0x1410('0xc7')) {
                _0x2a0046 = _0x59038['data'];
                if ($gameMap[_0x1410('0x14')]() === _0x2a0046) {
                    _0x16551f = $gameMap['collectDataForNetwork']();
                    _0x29ae3d = {
                        'mapId': $gameMap[_0x1410('0x14')](),
                        'mapData': _0x16551f
                    };
                    NetMessage[_0x1410('0xc8')]()[_0x1410('0x11')](_0x29ae3d);
                    return NetMessage['RequestPlayerData']()[_0x1410('0x11')]();
                }
            } else {
                return;
            }
        } catch (_0x3d75f4) {
            if (_0x1410('0xc9') !== 'tIDjD') {
                if (act != null) {
                    act['setTargetFromNet'](data[_0x1410('0x7a')]);
                }
            } else {
                _0x2b99f2 = _0x3d75f4;
                return Network[_0x1410('0x17')](_0x2b99f2, _0x1410('0xa0'));
            }
        }
    }
    static [_0x1410('0xca')](_0x45095b) {
        var _0x13d434, _0xc238df, _0x58afef;
        try {
            _0x58afef = _0x45095b[_0x1410('0xa')][_0x1410('0x14')];
            if ($gameMap[_0x1410('0x14')]() === _0x58afef) {
                _0xc238df = _0x45095b['data']['mapData'];
                return $gameMap[_0x1410('0x23')](_0xc238df);
            }
        } catch (_0x155031) {
            _0x13d434 = _0x155031;
            return Network[_0x1410('0x17')](_0x13d434, _0x1410('0x57'));
        }
    }
    static [_0x1410('0xcb')](_0x255164) {
        _0x1410('0xcc')['p']();
        return Network[_0x1410('0xcd')] = !![];
    }
    static [_0x1410('0xce')](_0x3e37f6) {
        var _0x1c1f66, _0x417ea6, _0xf3f6e3;
        try {
            if ('avbNE' === _0x1410('0xcf')) {
                _0x417ea6 = error;
                return Network[_0x1410('0x17')](_0x417ea6, _0x1410('0xd0'));
            } else {
                _0x1c1f66 = _0x3e37f6[_0x1410('0xa')][_0x1410('0xd1')];
                _0xf3f6e3 = _0x3e37f6[_0x1410('0xa')][_0x1410('0x2f')];
                return uAPI[_0x1c1f66](..._0xf3f6e3);
            }
        } catch (_0x11d5a8) {
            _0x417ea6 = _0x11d5a8;
            return Network[_0x1410('0x17')](_0x417ea6, 'While\x20execute\x20uAPI\x20network\x20command');
        }
    }
    static [_0x1410('0xd2')](_0x1739fc) {
        return Network[_0x1410('0xd3')](_0x1739fc[_0x1410('0xa')]);
    }
    static [_0x1410('0xd4')](_0x5b7c2d) {
        var _0x5592b8, _0x563cc8, _0x1d6978, _0x2858b5, _0x562758, _0x5c41bf, _0x12fb33, _0x356ddf;
        try {
            _0x1d6978 = _0x5b7c2d[_0x1410('0xa')];
            _0x563cc8 = _0x1d6978['id'];
            'BATTLE\x20:\x20MANAGER\x20PVP:\x20CLIENT'['p'](_0x563cc8);
            if (_0x563cc8 === 'inputActionPvP') {
                _0x5592b8 = JsonEx[_0x1410('0xb1')](_0x1d6978[_0x1410('0x44')]);
                BattleManager['_setPvPRivalActionFromNetwork'](_0x5592b8);
                return;
            }
            if (_0x563cc8 === _0x1410('0xd5')) {
                BattleManager[_0x1410('0xd6')]();
                return;
            }
            if (_0x563cc8 === _0x1410('0xd7')) {
                if (_0x1410('0xd8') === _0x1410('0xd9')) {
                    mapId = _0x5b7c2d['data'][_0x1410('0x14')];
                    if ($gameMap['mapId']() === mapId) {
                        mapData = _0x5b7c2d[_0x1410('0xa')]['mapData'];
                        return $gameMap[_0x1410('0x23')](mapData);
                    }
                } else {
                    _0x5592b8 = JsonEx[_0x1410('0xb1')](_0x1d6978[_0x1410('0x44')]);
                    BattleManager[_0x1410('0xda')](_0x1d6978[_0x1410('0x8b')], _0x5592b8, _0x1d6978[_0x1410('0x8e')]);
                    return;
                }
            }
            if (_0x563cc8 === _0x1410('0xdb')) {
                if (_0x1410('0xdc') !== _0x1410('0xdc')) {
                    _0x5c41bf = error;
                    return Network[_0x1410('0x17')](_0x5c41bf, 'While\x20start\x20network\x20icon');
                } else {
                    _0x12fb33 = JsonEx[_0x1410('0xb1')](_0x1d6978[_0x1410('0xdd')]);
                    _0x356ddf = JsonEx[_0x1410('0xb1')](_0x1d6978[_0x1410('0xde')]);
                    BattleManager[_0x1410('0xdf')](_0x1d6978[_0x1410('0x8b')], _0x1d6978[_0x1410('0xe0')], _0x12fb33, _0x356ddf);
                    return;
                }
            }
            if (_0x563cc8 === _0x1410('0xe1')) {
                _0x2858b5 = JsonEx[_0x1410('0xb1')](_0x1d6978[_0x1410('0xe2')]);
                _0x562758 = JsonEx[_0x1410('0xb1')](_0x1d6978['targetData']);
                BattleManager['_actionEndPvPFromNetwork'](_0x2858b5, _0x562758);
            }
        } catch (_0x24596d) {
            _0x5c41bf = _0x24596d;
            return Network[_0x1410('0x17')](_0x5c41bf, _0x1410('0xe3'));
        }
    }
    static [_0x1410('0xe4')](_0x580d33) {
        var _0x8fcc70, _0x1b4c48;
        try {
            _0x8fcc70 = NetPartyManager[_0x1410('0x1a')](_0x580d33['from']);
            return Network[_0x1410('0x1b')](_0x8fcc70, _0x580d33[_0x1410('0xa')]);
        } catch (_0x5606da) {
            _0x1b4c48 = _0x5606da;
            return Network[_0x1410('0x17')](_0x1b4c48, _0x1410('0x49'));
        }
    }
    static ['OnDisconnect']() {
        return ClientManager[_0x1410('0x15')] = null;
    }
};
AlphaNET['register'](ClientManager);
})();

//Compressed by MV Plugin Builder
(function(){var _0x48cb = [
    'clientsCount',
    'isPoolReady',
    'LaCHU',
    'lxusz',
    'onWaitPoolReady',
    'hsDvJ',
    'Zmptu',
    'OnPlayerStartPvPWithAnother',
    'RegisterOnSync',
    'SERVER\x20ACCEPT\x20SYNC\x20REQUEST',
    'RegisterOnSyncPool',
    'xmFHJ',
    '_startSyncPoolThread',
    'Connection\x20restricted\x20by\x20Server!',
    'OnPlayerWorldData',
    'getActorIdBySocketId',
    'setPlayerWorldData',
    'OnSyncEvent',
    'OnVirtualInterpreter',
    'onEventVirtualCommand',
    'While\x20try\x20check\x20virtual\x20command\x20on\x20Server',
    'OnPlayerNetItemsData',
    'dZEvT',
    'vgfiJ',
    'setPlayerItemsData',
    'myRivalActorId',
    'While\x20try\x20save\x20another\x20actor\x20data',
    'PlayerDisconnect',
    'OnPlayerRequestMapData',
    'forEach',
    'SEND\x20REQUEST\x20TO\x20PLAYER',
    'RequestGameMapEventsData',
    '_SendMapDataResponseToClient',
    'BsONx',
    'XUgsG',
    'While\x20try\x20get\x20map\x20events\x20data\x20from\x20server',
    '_getClientById',
    'OnMapDataResonpse',
    'eMEmH',
    'Server\x20is\x20Busy!\x20Try\x20again\x20later!',
    'JrZcq',
    'mPqTe',
    'KhvLp',
    'QxmYJ',
    'Yiepc',
    'getPlayerByActorId',
    'GameMapEventsDataResponse',
    'OnPlayerChangeMap',
    'jZBum',
    'cEFoG',
    'jlfNh',
    'SetOwner',
    'FVWTY',
    'jCphu',
    'find',
    'XcuhQ',
    'jOTlB',
    'kUGjZ',
    'MMNhl',
    'OnPlayerRequestPvPWithAnother',
    'mhVRg',
    'HWKeo',
    'OnBattleManagerPvPCommand',
    'vbFoz',
    'GDKqf',
    'uMRPJ',
    'BATTLE\x20:\x20MANAGER\x20PVP',
    'inputActionPvP',
    'BattleManagerPvP',
    'JgrXw',
    'whoStart',
    'startActionPvP',
    'myzxd',
    'isHost',
    'endActionPvP',
    'register',
    'serv',
    'eventWaitPool',
    'syncPools',
    'mapUpdateWaitPool',
    'mapOwnerPool',
    'REGISTER\x20HOST',
    'registerNewPlayer',
    'myPlayerData',
    'players',
    'first',
    'mapId',
    '_isMapOwner',
    'zdTtZ',
    'mdcJZ',
    'sessionData',
    'NetSessionData',
    'getPlayer',
    'from',
    'getPlayerByIndex',
    '_GetClientById',
    'send',
    'actorId',
    'StartPvPBattle',
    'OnNewPlayerConnected',
    'canConnectToServer',
    'disconnect',
    'isMaximumForNetwork',
    'AlertMessage',
    'broadcast',
    'hasInfoAbout',
    'getAllData',
    'PlayerWorldData',
    'isMultiMode',
    '_SendHostMapIdToClient',
    'getWorldDataNetwork',
    'GlobalWorldData',
    'allowConnect',
    'RegisterNewPlayer',
    'getGlobalData',
    'AqUBu',
    'error',
    'direction',
    '_netServer',
    '_host',
    'stopServer',
    '_CheckExistsOwner',
    'setFrom',
    'StartSharedEvent',
    'SERVER\x20START\x20NET\x20MESSAGE',
    'CreateEventPool',
    'data',
    'eventId',
    'RegisterOnSharedEvent',
    'REGISTER\x20\x20ON\x20EVENT',
    'waitId',
    'nSFIl',
    'addClient',
    '_waitPoolThread',
    '!!!\x20ABORT,\x20something\x20wrong!',
    'RegisterOnSharedEventSync',
    'line',
    'IsEventPoolExists',
    'cHMTZ',
    'LIBS',
    'NetWaitPool',
    'BRzrO',
    'getPoolSize'
];
(function (_0x407da1, _0x1053ba) {
    var _0x2479d8 = function (_0x21949d) {
        while (--_0x21949d) {
            _0x407da1['push'](_0x407da1['shift']());
        }
    };
    _0x2479d8(++_0x1053ba);
}(_0x48cb, 0xdb));
var _0x5f4d = function (_0x16215b, _0x279869) {
    _0x16215b = _0x16215b - 0x0;
    var _0x2a24a5 = _0x48cb[_0x16215b];
    return _0x2a24a5;
};
var ServerManager;
ServerManager = class ServerManager {
    static ['Init'](_0x34e308) {
        this['_netServer'] = _0x34e308;
        this[_0x5f4d('0x0')] = _0x34e308['instance']();
        this[_0x5f4d('0x1')] = null;
        this[_0x5f4d('0x2')] = {};
        this[_0x5f4d('0x3')] = {};
        return this[_0x5f4d('0x4')] = {};
    }
    static ['RegisterHost'](_0x45df1d) {
        _0x5f4d('0x5')['p']();
        NetPartyManager[_0x5f4d('0x6')](_0x45df1d['id']);
        Network[_0x5f4d('0x7')] = Network[_0x5f4d('0x8')][_0x5f4d('0x9')]();
        Network[_0x5f4d('0x7')]['mapId'] = $gameMap[_0x5f4d('0xa')]();
        ServerManager['mapOwnerPool'][$gameMap[_0x5f4d('0xa')]()] = _0x45df1d['id'];
        Network[_0x5f4d('0xb')] = !![];
        if (Network['sessionData'] === null) {
            if (_0x5f4d('0xc') !== _0x5f4d('0xd')) {
                return Network[_0x5f4d('0xe')] = new AlphaNET['LIBS'][(_0x5f4d('0xf'))]();
            } else {
                playerOne = NetPartyManager[_0x5f4d('0x10')](networkData[_0x5f4d('0x11')]);
                playerTwo = NetPartyManager[_0x5f4d('0x12')](networkData['data']);
                _0x45df1d = ServerManager[_0x5f4d('0x13')](networkData[_0x5f4d('0x11')]);
                client2 = ServerManager[_0x5f4d('0x13')](playerTwo['id']);
                if (_0x45df1d && client2) {
                    NetMessage['StartPvPBattle'](_0x45df1d)[_0x5f4d('0x14')](playerTwo[_0x5f4d('0x15')]);
                    return NetMessage[_0x5f4d('0x16')](client2)['send'](playerOne[_0x5f4d('0x15')]);
                } else {
                }
            }
        }
    }
    static [_0x5f4d('0x17')](_0x490d49) {
        if (!Network[_0x5f4d('0x18')]()) {
            NetMessage['AlertMessage'](_0x490d49)[_0x5f4d('0x14')]('Server\x20is\x20Busy!\x20Try\x20again\x20later!');
            _0x490d49[_0x5f4d('0x19')]();
            return;
        }
        if ($gameParty[_0x5f4d('0x1a')]()) {
            if ('bICJJ' === 'bICJJ') {
                NetMessage[_0x5f4d('0x1b')](_0x490d49)[_0x5f4d('0x14')]('Server\x20is\x20Full!');
                _0x490d49[_0x5f4d('0x19')]();
                return;
            } else {
                NetPartyManager[_0x5f4d('0x6')](_0x490d49['id']);
                NetMessage['PlayersTableResponse'](ServerManager[_0x5f4d('0x0')])[_0x5f4d('0x14')](Network[_0x5f4d('0x8')]);
                NetMessage['PlayerConnect'](_0x490d49)[_0x5f4d('0x1c')]();
                newPlayerActorId = NetPartyManager['getActorIdBySocketId'](_0x490d49['id']);
                if (Network[_0x5f4d('0xe')][_0x5f4d('0x1d')](newPlayerActorId)) {
                    worldData = Network[_0x5f4d('0xe')][_0x5f4d('0x1e')](newPlayerActorId);
                    NetMessage[_0x5f4d('0x1f')](_0x490d49)[_0x5f4d('0x14')](worldData);
                }
                if (!Network[_0x5f4d('0x20')]()) {
                    ServerManager[_0x5f4d('0x21')](_0x490d49);
                }
                global = Network[_0x5f4d('0xe')]['getGlobalData']()[_0x5f4d('0x22')]();
                return NetMessage[_0x5f4d('0x23')](_0x490d49)[_0x5f4d('0x14')](global);
            }
        }
        if (!Network[_0x5f4d('0x24')]()) {
            NetMessage[_0x5f4d('0x1b')](_0x490d49)[_0x5f4d('0x14')]('Connection\x20restricted\x20by\x20Server!');
            _0x490d49[_0x5f4d('0x19')]();
            return;
        }
        return this['RegisterNewPlayer'](_0x490d49);
    }
    static [_0x5f4d('0x25')](_0x3a05ef) {
        var _0x5b1769, _0x148480, _0x2f92a1, _0x1fb9f1;
        try {
            NetPartyManager[_0x5f4d('0x6')](_0x3a05ef['id']);
            NetMessage['PlayersTableResponse'](ServerManager[_0x5f4d('0x0')])[_0x5f4d('0x14')](Network[_0x5f4d('0x8')]);
            NetMessage['PlayerConnect'](_0x3a05ef)['broadcast']();
            _0x2f92a1 = NetPartyManager['getActorIdBySocketId'](_0x3a05ef['id']);
            if (Network[_0x5f4d('0xe')][_0x5f4d('0x1d')](_0x2f92a1)) {
                _0x1fb9f1 = Network[_0x5f4d('0xe')][_0x5f4d('0x1e')](_0x2f92a1);
                NetMessage['PlayerWorldData'](_0x3a05ef)[_0x5f4d('0x14')](_0x1fb9f1);
            }
            if (!Network[_0x5f4d('0x20')]()) {
                ServerManager[_0x5f4d('0x21')](_0x3a05ef);
            }
            _0x148480 = Network[_0x5f4d('0xe')][_0x5f4d('0x26')]()[_0x5f4d('0x22')]();
            return NetMessage['GlobalWorldData'](_0x3a05ef)[_0x5f4d('0x14')](_0x148480);
        } catch (_0x58b63a) {
            if (_0x5f4d('0x27') !== _0x5f4d('0x27')) {
                NetMessage[_0x5f4d('0x16')](_0x3a05ef)[_0x5f4d('0x14')](playerTwo[_0x5f4d('0x15')]);
                return NetMessage[_0x5f4d('0x16')](client2)[_0x5f4d('0x14')](playerOne[_0x5f4d('0x15')]);
            } else {
                _0x5b1769 = _0x58b63a;
                return Network[_0x5f4d('0x28')](_0x5b1769, 'when\x20new\x20player\x20register');
            }
        }
    }
    static [_0x5f4d('0x21')](_0x5828b0) {
        var _0x214340;
        _0x214340 = {
            'mapId': $gameMap[_0x5f4d('0xa')](),
            'x': $gamePlayer['x'],
            'y': $gamePlayer['y'],
            'd': $gamePlayer[_0x5f4d('0x29')]()
        };
        return NetMessage['HostGameMapId'](_0x5828b0)['send'](_0x214340);
    }
    static ['OnClientDisconnect'](_0x14ce83) {
        if (_0x14ce83['id'] === ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x2b')]['id']) {
            return Network[_0x5f4d('0x2c')]();
        } else {
            ServerManager[_0x5f4d('0x2d')](_0x14ce83['id']);
            return NetMessage['PlayerDisconnect'](_0x14ce83)[_0x5f4d('0x2e')](_0x14ce83['id'])[_0x5f4d('0x1c')]();
        }
    }
    static [_0x5f4d('0x2f')](_0x6b473d) {
        _0x5f4d('0x30')['p']();
        if (!ServerManager['IsEventPoolExists']()) {
            ServerManager[_0x5f4d('0x31')](_0x6b473d[_0x5f4d('0x32')][_0x5f4d('0x33')]);
        }
        return ServerManager[_0x5f4d('0x34')](_0x6b473d);
    }
    static [_0x5f4d('0x34')](_0x29c655) {
        _0x5f4d('0x35')['p']();
        if (ServerManager[_0x5f4d('0x1')] != null && _0x29c655[_0x5f4d('0x32')][_0x5f4d('0x33')] === ServerManager['eventWaitPool'][_0x5f4d('0x36')]) {
            if (_0x5f4d('0x37') !== 'DOBeB') {
                return ServerManager[_0x5f4d('0x1')][_0x5f4d('0x38')](_0x29c655[_0x5f4d('0x11')], !![]);
            } else {
                ServerManager[_0x5f4d('0x39')] = setTimeout(mama, 0x64);
            }
        } else {
            Network['error']('', _0x5f4d('0x34'));
            _0x5f4d('0x3a')['p']();
            return ServerManager['_netServer']['abortWaitPool'](_0x29c655[_0x5f4d('0x11')], -0x64);
        }
    }
    static [_0x5f4d('0x3b')](_0x424929) {
        'REGISTER\x20\x20ON\x20EVENT\x20SYNC\x20LINE'['p'](_0x424929[_0x5f4d('0x32')][_0x5f4d('0x3c')]);
        if (!ServerManager[_0x5f4d('0x3d')]()) {
            ServerManager[_0x5f4d('0x31')](_0x424929['data'][_0x5f4d('0x33')]);
        }
        if (_0x424929[_0x5f4d('0x32')][_0x5f4d('0x33')] !== ServerManager[_0x5f4d('0x1')][_0x5f4d('0x36')]) {
            if (_0x5f4d('0x3e') !== 'cHMTZ') {
                if (item[_0x5f4d('0xa')] === _0x424929[_0x5f4d('0x32')] && item['id'] !== _0x424929[_0x5f4d('0x11')]) {
                    return playerId = item['id'];
                }
            } else {
                return;
            }
        }
        return ServerManager[_0x5f4d('0x1')][_0x5f4d('0x38')](_0x424929['from'], !![]);
    }
    static [_0x5f4d('0x3d')]() {
        return this['eventWaitPool'] != null;
    }
    static [_0x5f4d('0x31')](_0x177083) {
        var _0x5d4a9f;
        ServerManager[_0x5f4d('0x1')] = new AlphaNET[(_0x5f4d('0x3f'))][(_0x5f4d('0x40'))](_0x177083);
        return ServerManager['_waitPoolThread'] = setTimeout(_0x5d4a9f = function () {
            if (_0x5f4d('0x41') === 'BRzrO') {
                var _0x23c108, _0x1647b8;
                if (((_0x1647b8 = ServerManager[_0x5f4d('0x1')]) != null ? _0x1647b8[_0x5f4d('0x42')]() : void 0x0) === ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x43')]()) {
                    if (ServerManager[_0x5f4d('0x1')][_0x5f4d('0x44')]()) {
                        if (_0x5f4d('0x45') === _0x5f4d('0x46')) {
                            setTimeout(poolCheck, 0x64);
                        } else {
                            _0x23c108 = ServerManager['eventWaitPool'][_0x5f4d('0x36')];
                            ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x47')](_0x23c108);
                            ServerManager[_0x5f4d('0x1')] = null;
                            return;
                        }
                    }
                }
                if (ServerManager[_0x5f4d('0x1')] != null) {
                    if (_0x5f4d('0x48') === _0x5f4d('0x49')) {
                        e = error;
                        return Network[_0x5f4d('0x28')](e, _0x5f4d('0x4a'));
                    } else {
                        ServerManager['_waitPoolThread'] = setTimeout(_0x5d4a9f, 0x64);
                    }
                }
            } else {
                var _0x354436, _0x4dc18c;
                _0x354436 = ServerManager[_0x5f4d('0x2')][_0x23c108];
                if (_0x354436 == null) {
                    return;
                }
                _0x4dc18c = ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x43')]();
                if (_0x354436[_0x5f4d('0x42')]() === _0x4dc18c && _0x354436[_0x5f4d('0x44')]()) {
                    ServerManager['_netServer'][_0x5f4d('0x47')](_0x354436[_0x5f4d('0x36')]);
                    ServerManager[_0x5f4d('0x2')][_0x23c108] = null;
                    return;
                } else {
                    setTimeout(poolCheck, 0x64);
                }
            }
        }, 0x64);
    }
    static [_0x5f4d('0x4b')](_0x24cc90) {
        var _0x36d13b;
        _0x5f4d('0x4c')['p'](_0x24cc90[_0x5f4d('0x32')]);
        _0x36d13b = _0x24cc90['data'];
        return ServerManager['RegisterOnSyncPool'](_0x36d13b, _0x24cc90[_0x5f4d('0x11')]);
    }
    static [_0x5f4d('0x4d')](_0x1d00c4, _0x2b2d0a) {
        var _0x30abd6;
        if (ServerManager['syncPools'][_0x1d00c4] == null) {
            if (_0x5f4d('0x4e') === _0x5f4d('0x4e')) {
                ServerManager[_0x5f4d('0x2')][_0x1d00c4] = new AlphaNET[(_0x5f4d('0x3f'))][(_0x5f4d('0x40'))](_0x1d00c4);
                ServerManager[_0x5f4d('0x4f')](_0x1d00c4);
            } else {
                NetMessage[_0x5f4d('0x1b')](_0x2b2d0a)[_0x5f4d('0x14')](_0x5f4d('0x50'));
                _0x2b2d0a[_0x5f4d('0x19')]();
                return;
            }
        }
        _0x30abd6 = ServerManager[_0x5f4d('0x2')][_0x1d00c4];
        return _0x30abd6[_0x5f4d('0x38')](_0x2b2d0a, !![]);
    }
    static [_0x5f4d('0x4f')](_0x5cd20c) {
        var _0x1f7dc8;
        return setTimeout(_0x1f7dc8 = function () {
            var _0xf32bad, _0x48422a;
            _0xf32bad = ServerManager[_0x5f4d('0x2')][_0x5cd20c];
            if (_0xf32bad == null) {
                return;
            }
            _0x48422a = ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x43')]();
            if (_0xf32bad[_0x5f4d('0x42')]() === _0x48422a && _0xf32bad['isPoolReady']()) {
                ServerManager[_0x5f4d('0x2a')]['onWaitPoolReady'](_0xf32bad[_0x5f4d('0x36')]);
                ServerManager[_0x5f4d('0x2')][_0x5cd20c] = null;
                return;
            } else {
                if ('XtJIU' === 'hGjqV') {
                    NetMessage[_0x5f4d('0x1b')](client)['send']('Server\x20is\x20Full!');
                    client[_0x5f4d('0x19')]();
                    return;
                } else {
                    setTimeout(_0x1f7dc8, 0x64);
                }
            }
        }, 0x64);
    }
    static [_0x5f4d('0x51')](_0x37e5b1) {
        var _0x42db0e;
        _0x42db0e = NetPartyManager[_0x5f4d('0x52')](_0x37e5b1[_0x5f4d('0x11')]);
        if (_0x42db0e == null) {
            return;
        }
        Network[_0x5f4d('0xe')][_0x5f4d('0x53')](_0x42db0e, _0x37e5b1[_0x5f4d('0x32')]);
    }
    static [_0x5f4d('0x54')](_0x487b2f) {
        return NetWorldManager['onEventSyncCommand'](_0x487b2f[_0x5f4d('0x32')]);
    }
    static [_0x5f4d('0x55')](_0x9509ac) {
        var _0x437ed7, _0x11b85a;
        _0x437ed7 = _0x9509ac[_0x5f4d('0x32')];
        try {
            return NetWorldManager[_0x5f4d('0x56')](_0x437ed7);
        } catch (_0x5e6ed1) {
            _0x11b85a = _0x5e6ed1;
            return Network[_0x5f4d('0x28')](_0x11b85a, _0x5f4d('0x57'));
        }
    }
    static [_0x5f4d('0x58')](_0x11c45c) {
        var _0x3db399, _0x2ba54c;
        try {
            if (Network['isHost']()) {
                if (_0x5f4d('0x59') !== _0x5f4d('0x5a')) {
                    _0x3db399 = NetPartyManager[_0x5f4d('0x52')](_0x11c45c['from']);
                    return Network['sessionData'][_0x5f4d('0x5b')](_0x3db399, _0x11c45c[_0x5f4d('0x32')]);
                } else {
                    client = _getClient(data[_0x5f4d('0x5c')]);
                    NetMessage['BattleManagerPvP'](client)[_0x5f4d('0x14')](data);
                    return;
                }
            }
        } catch (_0x781ce8) {
            if ('GUJqV' === 'GUJqV') {
                _0x2ba54c = _0x781ce8;
                return Network[_0x5f4d('0x28')](_0x2ba54c, _0x5f4d('0x5d'));
            } else {
                if (client['id'] === ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x2b')]['id']) {
                    return Network['stopServer']();
                } else {
                    ServerManager[_0x5f4d('0x2d')](client['id']);
                    return NetMessage[_0x5f4d('0x5e')](client)['setFrom'](client['id'])[_0x5f4d('0x1c')]();
                }
            }
        }
    }
    static [_0x5f4d('0x5f')](_0x28ef4c) {
        var _0x1cddd2, _0x1d52ac, _0x5e5427, _0x12c2bb;
        try {
            ServerManager['mapUpdateWaitPool'][_0x28ef4c[_0x5f4d('0x11')]] = _0x28ef4c[_0x5f4d('0x32')];
            _0x12c2bb = null;
            Network[_0x5f4d('0x8')][_0x5f4d('0x60')](function (_0x33901b) {
                if (_0x33901b[_0x5f4d('0xa')] === _0x28ef4c[_0x5f4d('0x32')] && _0x33901b['id'] !== _0x28ef4c[_0x5f4d('0x11')]) {
                    return _0x12c2bb = _0x33901b['id'];
                }
            });
            if (_0x12c2bb != null) {
                _0x5f4d('0x61')['p']();
                _0x1cddd2 = ServerManager[_0x5f4d('0x13')](_0x12c2bb);
                if (_0x1cddd2 != null) {
                    return NetMessage[_0x5f4d('0x62')](_0x1cddd2)[_0x5f4d('0x14')](_0x28ef4c[_0x5f4d('0x32')]);
                }
            } else {
                _0x5e5427 = {
                    'mapId': _0x28ef4c[_0x5f4d('0x32')],
                    'mapData': []
                };
                return ServerManager[_0x5f4d('0x63')](_0x28ef4c[_0x5f4d('0x11')], _0x5e5427);
            }
        } catch (_0x522a6d) {
            if (_0x5f4d('0x64') !== _0x5f4d('0x65')) {
                _0x1d52ac = _0x522a6d;
                return Network[_0x5f4d('0x28')](_0x1d52ac, _0x5f4d('0x66'));
            } else {
                ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x47')](pool[_0x5f4d('0x36')]);
                ServerManager[_0x5f4d('0x2')][poolId] = null;
                return;
            }
        }
    }
    static [_0x5f4d('0x13')](_0x50a119) {
        return ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x67')](_0x50a119);
    }
    static [_0x5f4d('0x68')](_0x50fb6c) {
        var _0xbdec58, _0x1ffcca, _0x45e73d, _0x321612;
        try {
            if ('USREz' === _0x5f4d('0x69')) {
                NetMessage['AlertMessage'](client)[_0x5f4d('0x14')](_0x5f4d('0x6a'));
                client[_0x5f4d('0x19')]();
                return;
            } else {
                _0x45e73d = _0x50fb6c['data'][_0x5f4d('0xa')];
                _0x321612 = null;
                for (_0x1ffcca in ServerManager['mapUpdateWaitPool']) {
                    if (ServerManager[_0x5f4d('0x3')][_0x1ffcca] === _0x45e73d) {
                        if (_0x5f4d('0x6b') !== _0x5f4d('0x6c')) {
                            _0x321612 = _0x1ffcca;
                            break;
                        } else {
                            return ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x67')](id);
                        }
                    }
                }
                if (_0x321612 != null) {
                    if (_0x5f4d('0x6d') === _0x5f4d('0x6e')) {
                        var _0x2593b2, _0x5831c3;
                        if (((_0x5831c3 = ServerManager[_0x5f4d('0x1')]) != null ? _0x5831c3[_0x5f4d('0x42')]() : void 0x0) === ServerManager[_0x5f4d('0x2a')][_0x5f4d('0x43')]()) {
                            if (ServerManager['eventWaitPool'][_0x5f4d('0x44')]()) {
                                _0x2593b2 = ServerManager[_0x5f4d('0x1')][_0x5f4d('0x36')];
                                ServerManager['_netServer'][_0x5f4d('0x47')](_0x2593b2);
                                ServerManager[_0x5f4d('0x1')] = null;
                                return;
                            }
                        }
                        if (ServerManager['eventWaitPool'] != null) {
                            ServerManager[_0x5f4d('0x39')] = setTimeout(mama, 0x64);
                        }
                    } else {
                        return ServerManager[_0x5f4d('0x63')](_0x321612, _0x50fb6c[_0x5f4d('0x32')]);
                    }
                }
            }
        } catch (_0x1ea3ff) {
            if (_0x5f4d('0x6f') !== _0x5f4d('0x6f')) {
                var _0x94dac9, _0x3e80fe;
                _0x3e80fe = NetPartyManager[_0x5f4d('0x70')](id);
                _0x94dac9 = ServerManager[_0x5f4d('0x13')](_0x3e80fe['id']);
                return _0x94dac9;
            } else {
                _0xbdec58 = _0x1ea3ff;
                return Network[_0x5f4d('0x28')](_0xbdec58, 'while\x20get\x20map\x20data\x20response');
            }
        }
    }
    static ['_SendMapDataResponseToClient'](_0x190d0b, _0x3fd90f) {
        var _0x90d837;
        _0x90d837 = ServerManager[_0x5f4d('0x13')](_0x190d0b);
        if (_0x90d837 != null) {
            ServerManager['mapUpdateWaitPool'][_0x190d0b] = null;
            NetMessage[_0x5f4d('0x71')](_0x90d837)[_0x5f4d('0x14')](_0x3fd90f);
        }
    }
    static [_0x5f4d('0x72')](_0xeb776) {
        var _0x25ece2, _0x29d514, _0x2dd2b5;
        try {
            if (_0x5f4d('0x73') !== _0x5f4d('0x74')) {
                if (!Network['isMultiMode']()) {
                    return;
                }
                ServerManager[_0x5f4d('0x2d')](_0xeb776['from']);
                _0x2dd2b5 = _0xeb776[_0x5f4d('0x32')];
                if (ServerManager[_0x5f4d('0x4')][_0x2dd2b5] == null) {
                    ServerManager[_0x5f4d('0x4')][_0x2dd2b5] = _0xeb776['from'];
                    _0x25ece2 = ServerManager[_0x5f4d('0x13')](_0xeb776[_0x5f4d('0x11')]);
                    if (_0x25ece2 != null) {
                        if (_0x5f4d('0x75') === 'RdoZd') {
                            var _0x31432e, _0x18a4d5;
                            _0x31432e = _0xeb776[_0x5f4d('0x32')];
                            try {
                                return NetWorldManager['onEventVirtualCommand'](_0x31432e);
                            } catch (_0x1d876f) {
                                _0x18a4d5 = _0x1d876f;
                                return Network['error'](_0x18a4d5, _0x5f4d('0x57'));
                            }
                        } else {
                            NetMessage[_0x5f4d('0x76')](_0x25ece2)[_0x5f4d('0x14')]();
                        }
                    }
                }
            } else {
                return;
            }
        } catch (_0x4abd51) {
            _0x29d514 = _0x4abd51;
            return Network['error'](_0x29d514, _0x5f4d('0x72'));
        }
    }
    static [_0x5f4d('0x2d')](_0x202774) {
        var _0x2ad47a, _0x4a148d, _0x3ad195, _0x4cf323;
        if (!Network[_0x5f4d('0x20')]()) {
            if (_0x5f4d('0x77') !== _0x5f4d('0x77')) {
                _0x5f4d('0x5')['p']();
                NetPartyManager['registerNewPlayer'](_0x2ad47a['id']);
                Network[_0x5f4d('0x7')] = Network['players']['first']();
                Network[_0x5f4d('0x7')]['mapId'] = $gameMap[_0x5f4d('0xa')]();
                ServerManager[_0x5f4d('0x4')][$gameMap[_0x5f4d('0xa')]()] = _0x2ad47a['id'];
                Network[_0x5f4d('0xb')] = !![];
                if (Network['sessionData'] === null) {
                    return Network[_0x5f4d('0xe')] = new AlphaNET[(_0x5f4d('0x3f'))][(_0x5f4d('0xf'))]();
                }
            } else {
                return;
            }
        }
        _0x4cf323 = null;
        _0x3ad195 = 0x0;
        for (_0x4a148d in ServerManager[_0x5f4d('0x4')]) {
            if (ServerManager[_0x5f4d('0x4')][_0x4a148d] === _0x202774) {
                if (_0x5f4d('0x78') !== _0x5f4d('0x78')) {
                    ServerManager['_SendHostMapIdToClient'](_0x2ad47a);
                } else {
                    _0x4cf323 = Network[_0x5f4d('0x8')][_0x5f4d('0x79')](function (_0x385956) {
                        if ('ZMftG' === _0x5f4d('0x7a')) {
                            if (!Network[_0x5f4d('0x18')]()) {
                                NetMessage[_0x5f4d('0x1b')](_0x2ad47a)['send'](_0x5f4d('0x6a'));
                                _0x2ad47a[_0x5f4d('0x19')]();
                                return;
                            }
                            if ($gameParty['isMaximumForNetwork']()) {
                                NetMessage[_0x5f4d('0x1b')](_0x2ad47a)[_0x5f4d('0x14')]('Server\x20is\x20Full!');
                                _0x2ad47a[_0x5f4d('0x19')]();
                                return;
                            }
                            if (!Network[_0x5f4d('0x24')]()) {
                                NetMessage[_0x5f4d('0x1b')](_0x2ad47a)[_0x5f4d('0x14')](_0x5f4d('0x50'));
                                _0x2ad47a[_0x5f4d('0x19')]();
                                return;
                            }
                            return this['RegisterNewPlayer'](_0x2ad47a);
                        } else {
                            if (_0x385956[_0x5f4d('0xa')] === Number(_0x4a148d)) {
                                if ('jOTlB' === _0x5f4d('0x7b')) {
                                    return _0x385956;
                                } else {
                                    ServerManager[_0x5f4d('0x2d')](_0x2ad47a['id']);
                                    return NetMessage[_0x5f4d('0x5e')](_0x2ad47a)['setFrom'](_0x2ad47a['id'])[_0x5f4d('0x1c')]();
                                }
                            }
                        }
                    });
                    if (_0x4cf323 != null) {
                        _0x3ad195 = _0x4a148d;
                        break;
                    } else {
                        if (_0x5f4d('0x7c') === _0x5f4d('0x7d')) {
                            NetMessage[_0x5f4d('0x76')](_0x2ad47a)['send']();
                        } else {
                            ServerManager[_0x5f4d('0x4')][_0x4a148d] = null;
                            'NOT\x20OWNER\x20ANYMORE'['p']();
                        }
                    }
                }
            }
        }
        if (_0x4cf323 != null) {
            ServerManager[_0x5f4d('0x4')][_0x3ad195] = _0x4cf323['id'];
            _0x2ad47a = ServerManager[_0x5f4d('0x13')](_0x4cf323['id']);
            if (_0x2ad47a != null) {
                if ('tctlF' !== 'tctlF') {
                    er = error;
                    return Network[_0x5f4d('0x28')](er, 'when\x20new\x20player\x20register');
                } else {
                    NetMessage[_0x5f4d('0x76')](_0x2ad47a)[_0x5f4d('0x14')]();
                }
            }
            return 'ANOTHER\x20OWNER'['p']();
        }
    }
    static [_0x5f4d('0x7e')](_0x3960a3) {
        var _0x3fdf13, _0x454a03, _0x3ba5d5, _0x5eda52, _0x10c018;
        try {
            if (_0x5f4d('0x7f') !== _0x5f4d('0x80')) {
                _0x5eda52 = NetPartyManager[_0x5f4d('0x10')](_0x3960a3[_0x5f4d('0x11')]);
                _0x10c018 = NetPartyManager[_0x5f4d('0x12')](_0x3960a3[_0x5f4d('0x32')]);
                _0x3fdf13 = ServerManager[_0x5f4d('0x13')](_0x3960a3[_0x5f4d('0x11')]);
                _0x454a03 = ServerManager[_0x5f4d('0x13')](_0x10c018['id']);
                if (_0x3fdf13 && _0x454a03) {
                    NetMessage[_0x5f4d('0x16')](_0x3fdf13)['send'](_0x10c018[_0x5f4d('0x15')]);
                    return NetMessage[_0x5f4d('0x16')](_0x454a03)[_0x5f4d('0x14')](_0x5eda52[_0x5f4d('0x15')]);
                } else {
                }
            } else {
                return NetMessage['RequestGameMapEventsData'](_0x3fdf13)[_0x5f4d('0x14')](_0x3960a3[_0x5f4d('0x32')]);
            }
        } catch (_0x47f8a1) {
            _0x3ba5d5 = _0x47f8a1;
            return Network[_0x5f4d('0x28')](_0x3ba5d5, _0x5f4d('0x4a'));
        }
    }
    static [_0x5f4d('0x81')](_0x46a382) {
        var _0x5ebd8b, _0x20a96f, _0x4593ab, _0x34acab, _0x236e0f;
        try {
            if (_0x5f4d('0x82') === _0x5f4d('0x83')) {
                return;
            } else {
                _0x5ebd8b = function (_0x1015f1) {
                    if (_0x5f4d('0x84') !== _0x5f4d('0x84')) {
                        return;
                    } else {
                        var _0x20a96f, _0x7c727c;
                        _0x7c727c = NetPartyManager[_0x5f4d('0x70')](_0x1015f1);
                        _0x20a96f = ServerManager[_0x5f4d('0x13')](_0x7c727c['id']);
                        return _0x20a96f;
                    }
                };
                _0x34acab = _0x46a382[_0x5f4d('0x32')];
                _0x4593ab = _0x34acab['id'];
                _0x5f4d('0x85')['p'](_0x4593ab);
                if (_0x4593ab === _0x5f4d('0x86')) {
                    _0x20a96f = _0x5ebd8b(_0x34acab['myRivalActorId']);
                    NetMessage[_0x5f4d('0x87')](_0x20a96f)[_0x5f4d('0x14')](_0x34acab);
                    return;
                }
                if (_0x4593ab === 'startTurnPvP') {
                    if (_0x5f4d('0x88') !== _0x5f4d('0x88')) {
                        _0x236e0f = error;
                        return Network['error'](_0x236e0f, _0x5f4d('0x72'));
                    } else {
                        _0x20a96f = _0x5ebd8b(_0x34acab[_0x5f4d('0x89')]);
                        NetMessage[_0x5f4d('0x87')](_0x20a96f)['send'](_0x34acab);
                        return;
                    }
                }
                if (_0x4593ab === _0x5f4d('0x8a')) {
                    _0x20a96f = _0x5ebd8b(_0x34acab[_0x5f4d('0x5c')]);
                    NetMessage[_0x5f4d('0x87')](_0x20a96f)[_0x5f4d('0x14')](_0x34acab);
                    return;
                }
                if (_0x4593ab === 'invokeNormalActionPvP') {
                    if (_0x5f4d('0x8b') === _0x5f4d('0x8b')) {
                        _0x20a96f = _0x5ebd8b(_0x34acab[_0x5f4d('0x5c')]);
                        NetMessage[_0x5f4d('0x87')](_0x20a96f)[_0x5f4d('0x14')](_0x34acab);
                        return;
                    } else {
                        var _0x1e91eb, _0x5829a3;
                        try {
                            if (Network[_0x5f4d('0x8c')]()) {
                                _0x1e91eb = NetPartyManager[_0x5f4d('0x52')](_0x46a382[_0x5f4d('0x11')]);
                                return Network[_0x5f4d('0xe')][_0x5f4d('0x5b')](_0x1e91eb, _0x46a382['data']);
                            }
                        } catch (_0x1973fd) {
                            _0x5829a3 = _0x1973fd;
                            return Network[_0x5f4d('0x28')](_0x5829a3, _0x5f4d('0x5d'));
                        }
                    }
                }
                if (_0x4593ab === _0x5f4d('0x8d')) {
                    _0x20a96f = _0x5ebd8b(_0x34acab[_0x5f4d('0x5c')]);
                    NetMessage[_0x5f4d('0x87')](_0x20a96f)[_0x5f4d('0x14')](_0x34acab);
                }
            }
        } catch (_0x3cca74) {
            _0x236e0f = _0x3cca74;
            return Network[_0x5f4d('0x28')](_0x236e0f, _0x5f4d('0x81'));
        }
    }
};
AlphaNET[_0x5f4d('0x8e')](ServerManager);
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AASprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Расширение - методы быстрого доступа к рисованию
var AASprite;

AASprite = class AASprite extends Sprite {
  constructor() {
    super(...arguments);
  }

  b() {
    return this.bitmap;
  }

  clear() {
    return this.bitmap.clear();
  }

  bNew(w, h) {
    if (h == null) {
      h = w;
    }
    return this.bitmap = new Bitmap(w, h);
  }

  bImg(filename) {
    return this.bitmap = ImageManager.loadNetwork(filename);
  }

  onReady(method) {
    if (method != null) {
      return this.bitmap.addLoadListener(method);
    }
  }

  fillAll(c) {
    return this.bitmap.fillAll(c);
  }

  add(child) {
    return this.addChild(child);
  }

  drawText() {
    return this.bitmap.drawText(...arguments);
  }

  drawTextFull(text, position) {
    return this.bitmap.drawTextFull(text, position);
  }

  drawIcon() {
    return this.bitmap.drawIcon(...arguments);
  }

  moveByJson(settings) {
    var pos;
    pos = ANET.Utils.getPositionPointFromJSON(settings);
    return this.move(pos.x, pos.y);
  }

  applyTextSettingsByJson(sprite, settings) {
    this.applyTextSettingsByExtraSettings(sprite, settings.text);
  }

  applyTextSettingsByExtraSettings(sprite, s) {
    sprite.move(s.marginX, s.marginY);
    sprite.b().fontSize = s.fontSize;
    sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
    sprite.b().outlineWidth = s.outlineWidth;
    if (s.outlineColor != null) {
      sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
    }
    if ((s.fontFace != null) && AlphaNET.isUseFonts()) {
      sprite.b().fontFace = s.fontFace;
    }
    sprite.b().fontItalic = s.fontItalic;
    sprite.visible = s.visible;
  }

  setGlowFilter(color, power = 0.8) { //color is 16 number, like 0xF00080
    if (PIXI.filters == null) {
      return;
    }
    return this.filters = [new PIXI.filters.GlowFilter(2, power, 0, color, 0.5)];
  }

  setOutlineFilter(color, power = 0.8) {
    if (PIXI.filters == null) {
      return;
    }
    return this.filters = [new PIXI.filters.OutlineFilter(power, color, 0.5)];
  }

  clearFilters() {
    return this.filters = [];
  }

  // * Не работает Push команда, это не массив?
  //_addNewFilter: (f) -> if @filters? then @filters.push(f) else @filters = [f]
  inPosition(point) {
    var rect, rx, ry;
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = new Rectangle(rx, ry, this.width, this.height);
    return ANET.Utils.Math.inRect(point, rect);
  }

  isReady() {
    var i, j, ref;
    if (this.bitmap != null) {
      if (!this.bitmap.isReady()) {
        return false;
      }
    }
    for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      if (!this.children[i].bitmap.isReady()) {
        return false;
      }
    }
    return true;
  }

  static FromImg(filename) {
    var s;
    s = new AASprite();
    s.bImg(filename);
    return s;
  }

  static FromBitmap(w, h) {
    var s;
    s = new AASprite();
    s.bNew(w, h);
    return s;
  }

};

// ■ END AASprite.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Alpha NET JSON Settings.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var ANJsonSettings;

ANJsonSettings = function() {
  throw new Error('This is a static class');
};

(function() {
  var _;
  //@[DEFINES]
  _ = ANJsonSettings;
  _.ChatSettings = 'ChatSettings';
  _.CharNameplate = 'CharNameplate';
  _.KeyBinding = 'KeyBinding';
  _._FILES = [_.CharNameplate, _.ChatSettings, _.KeyBinding];
  //@[PUBLIC]
  //@[=====================================================================]
  _.InitAndLoad = function() {
    var i, j, ref, results;
    this.data = {};
    results = [];
    for (i = j = 0, ref = _._FILES.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(_._loadAAJSONFile(_._FILES[i]));
    }
    return results;
  };
  _.getNamePlateDataForId = function(id) {
    return this.data[_.CharNameplate][id];
  };
  _.getChatSettings = function() {
    return this.data[_.ChatSettings];
  };
  // * Надо загружать через другой метод
  _.getKeyBinding = function() {
    return this.data[_.KeyBinding];
  };
  //@[PRIVATE]
  //@[=====================================================================]
  _._loadAAJSONFile = function(name) {
    var src, url, xhr;
    xhr = new XMLHttpRequest();
    src = name + '.json';
    url = 'data/ANET/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      var data, e, message;
      if (xhr.status < 400) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch (error) {
          e = error;
          ANET.criticalError(e, "Error in JSON file " + src);
          return;
        }
        ANJsonSettings._loadJSONData(name, data);
        if (name === _.KeyBinding) {
          return ANJsonSettings._loadKeyBinding();
        }
      } else {
        message = url + " not found!";
        return ANET.criticalError(new Error(message), message);
      }
    };
    xhr.send();
  };
  _._loadJSONData = function(name, settings) {
    return this.data[name] = settings;
  };
  _._getSettingsById = function(id, name) {
    var result;
    result = this.data[_[name]].find(function(i) {
      return i.id === id;
    });
    if (result != null) {
      return result;
    }
    return ANET.criticalError(new Error('ID not found!'), id + ' not found in ' + name + '.json');
  };
  _._loadKeyBinding = function() {
    var db, keys;
    ANET.KEYS.loadDefaultKeyConfig();
    keys = [];
    db = _.getKeyBinding()[0].chat;
    keys[0] = db.inOutChatWindow;
    keys[1] = db.sayToChat;
    return ANET.KEYS.loadKeyConfig(keys);
  };
})();

// ■ END Alpha NET JSON Settings.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {
    //@[DEFINES]
    var _ = BattleManager;

    //@[ALIAS]
    var _alias__startBattle = _.startBattle;
    _.startBattle = function () {
        _alias__startBattle.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer())
            $gameParty.refreshForNetwork();
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._battlersMakeTurns = 0;
            BattleManager._battlersMakeInput = 0;
        }
    };

    //@[ALIAS]
    var _alias__isBusy = _.isBusy;
    _.isBusy = function () {
        var result = _alias__isBusy.call(this, ...arguments);
        return result || Network.isBusy();
    };

    //@[ALIAS]
    var _alias__updateTurn = _.updateTurn;
    _.updateTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            $gameParty.requestMotionRefresh();
        } else {
            if (!BattleManager.isNetworkBattle()) {
                _alias__updateTurn.call(this, ...arguments);
                return;
            }
            if (BattleManager.isNetworkBattleServer()) {
                // * Только на сервере происходит обновление хода
                _alias__updateTurn.call(this, ...arguments);
            } else
                $gameParty.requestMotionRefresh();
        }
    };

    //@[ALIAS]
    var _alias__startTurn = _.startTurn;
    _.startTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            this._phase = 'turn';
            this.clearActor();
            $gameTroop.increaseTurn();
            $gameParty.requestMotionRefresh();
            this._logWindow.startTurn();
            this._startTurnPvP();
        } else {
            _alias__startTurn.call(this, ...arguments);
            if (BattleManager.isNetworkBattleServer()) {
                this._sendBattleOrderToNetwork();
            }
        }
    };

    //@[ALIAS]
    var _alias__setup = _.setup;
    _.setup = function () {
        if (Network.isConnected())
            Network._inBattle = true;
        _alias__setup.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendTroopNetworkIds();
        }
    };

    //@[ALIAS]
    var _alias__endAction = _.endAction;
    _.endAction = function () {
        _alias__endAction.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionEndToNetwork();
        }
        if(BattleManager.isNetworkBattlePvP()){
            this._sendEndActionPvPToServer();
        }
    };

    //@[ALIAS]
    var _alias__endTurn = _.endTurn;
    _.endTurn = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendTurnEndToNetwork();
        }
        _alias__endTurn.call(this, ...arguments);
        if (BattleManager.isNetworkBattle())
            BattleManager.syncNet();
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__processTurn = _.processTurn;
    _.processTurn = function () { 
        if(BattleManager.isNetworkBattlePvP()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if(!action) {
                BattleManager._battlersMakeTurns++;
                //"ON ALL END".p();
                BattleManager._checkTurnEndPvP();
            }
            //BattleManager._processTurnPvP();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__processTurn.call(this, ...arguments);
            return;
        }
        if(BattleManager.isNetworkBattleServer()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if (!action) {
                this._sendProcessTurnToNetwork(subject);
            }
        }
    };

    // * Данный метод работает только на сервере (от processTurn)
    //@[ALIAS]
    var _alias__startAction = _.startAction;
    _.startAction = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            _alias__startAction.call(this, ...arguments);
            BattleManager._sendStartActionPvPToNetwork();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__startAction.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattleServer()) {
            _alias__startAction.call(this, ...arguments);
            this._sendStartActionToNetwork(this._targets);
        }
    };

    //TODO: Временно!
    // * Временно отключил его для сети
    //@[ALIAS]
    var _alias__displayStartMessages = _.displayStartMessages;
    _.displayStartMessages = function () {
        if(BattleManager.isNetworkBattle()) {
            return;
        }
        _alias__displayStartMessages.call(this, ...arguments);  
    };

    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeNormalAction = _.invokeNormalAction;
    _.invokeNormalAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()){
            BattleManager._invokeNormalActionPvP(subject, target);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            var realTarget = this.applySubstitute(target);
            _alias__invokeNormalAction.call(this, ...arguments);
            $gameParty.refreshForNetwork();
            if(BattleManager.isNetworkBattleServer()) {
                this._sendInvokeNormalToNetwork(subject, realTarget);
            }
        } else {
            _alias__invokeNormalAction.call(this, ...arguments);
        }
    };

    //TODO: invokeCounterAttack
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeCounterAttack = _.invokeCounterAttack;
    _.invokeCounterAttack = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeCounterAttack.call(this, ...arguments);
            return;
        }
        // * Пока Counter Attack не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //TODO: invokeMagicReflection
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeMagicReflection = _.invokeMagicReflection;
    _.invokeMagicReflection = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeMagicReflection.call(this, ...arguments);
            return;
        }
        // * Пока Magic Reflection не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //@[ALIAS]
    BattleManager._alias__selectNextCommand = _.selectNextCommand;
    _.selectNextCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectNextCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('next');
    };

    //@[ALIAS]
    BattleManager._alias__selectPreviousCommand = _.selectPreviousCommand;
    _.selectPreviousCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectPreviousCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('prev');
    };


    //@[ALIAS]
    var _alias__endBattle = _.endBattle;
    _.endBattle = function (result) {
        if(BattleManager.isNetworkBattlePvP()) {
            Network.clearPvPBattleWithResult(result);
            _alias__endBattle.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            BattleManager.syncNet();
            _alias__endBattle.call(this, ...arguments);
        } else {
            _alias__endBattle.call(this, ...arguments);
        }
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__checkBattleEnd = _.checkBattleEnd;
    _.checkBattleEnd = function () {
        if (BattleManager.isNetworkBattle()) {
            if (BattleManager.isNetworkBattleServer()) {
                return _alias__checkBattleEnd.call(this, ...arguments);
            } else {
                return false;
            }
        } else 
            return _alias__checkBattleEnd.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__checkAbort = _.checkAbort;
    _.checkAbort = function () {
        if (BattleManager.isNetworkBattle()) {
            if ($gameParty.isEmpty() || this.isAborting()) {
                SoundManager.playEscape();
                this._escaped = true;
                this._sendAbortBattleToNetwork();
                this.processAbort();
            }
            return false;
        } else {
            return _alias__checkAbort.call(this);
        }
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processVictory = _.processVictory;
    _.processVictory = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendVictoryToNetwork();
        }
        _alias__processVictory.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processDefeat = _.processDefeat;
    _.processDefeat = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendDefeatToNetwork();
        }
        _alias__processDefeat.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias__processEscape = _.processEscape;
    _.processEscape = function () {
        if (BattleManager.isNetworkBattle()) {
            return _alias__processEscape.call(this, ...arguments);
        } else {
            if (BattleManager.isNetworkBattleServer()) {
                var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
                this._sendEscapeToNetwork(success);
                this._onEscapeFromNetwork(success); // * Логика вынесена отдельно для севрера и клиента
                return success;
            }
            return false;
        }
    };

    //@[ALIAS]
    var _alias__invokeAction = _.invokeAction;
    _.invokeAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._invokeActionPvP(subject, target);
        } else
            _alias__invokeAction.call(this, subject, target);
    };

})();

// ■ END BattleManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
BattleManager.setupPvPBattle = function (enemyActorId) {
    this.initMembers();
    this._canEscape = false;
    this._canLose = true;
    $gameTroop.setupPvPBattle(enemyActorId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
    Network._inPvPBattle = true;
    Network._lastPvPResult = -1;
};

//?[NEW]
BattleManager.isNetworkBattlePvP = function () {
    if (Network.isConnected() && Network.isMultiMode() && Network.inPvPBattle()) {
        return true;
    }
    return false;
};

//?[NEW]
BattleManager.isNetworkBattlePvPServer = function () {
    return BattleManager.isNetworkBattlePvP() && Network.isPvPBattleServer();
};

//?[NEW]
BattleManager.isNetworkBattle = function () {
    if(Network.isMultiMode()) {
        return false;
    } else
        return Network.isConnected() && Network.inBattle();
};

//?[NEW]
BattleManager.isNetworkBattleServer = function () {
    return BattleManager.isNetworkBattle() && Network.isHost();
};

//?[NEW]
BattleManager.convertBattlersToIds = function (arrayOfBattlers) {
    return arrayOfBattlers.map(item => {
        return BattleManager.getIdByBattleSubject(item);
    });
};

//?[NEW]
BattleManager.convertIdsToBattlers = function (arrayOfIds) {
    return arrayOfIds.map(item => {
        return BattleManager.getBattleSubjectById(item);
    });
};

//?[NEW]
BattleManager.getBattleSubjectById = function (id) {
    if(BattleManager.isNetworkBattlePvP()) {
        if(id == $gameParty.leader().actorId()) {
            return $gameParty.leader();
        } else {
            return $gameTroop.rival();
        }
    } else {
        if (id < 900)
            return $gameParty.memberByActorId(id);
        else
            return $gameTroop.getEnemyByNetId(id);
    }
};

//?[NEW]
BattleManager.getIdByBattleSubject = function (subject) {
    if (subject == null)
        subject = this._subject;
    if (subject.isActor()) {
        return subject.actorId();
    } else {
        return subject.uniqueNetworkId();
    }
};

//?[NEW]
BattleManager.isMyActorInput = function () {
    if (!BattleManager.isNetworkBattle()) return true;
    var myIndex = $gameParty.memberIndexByActorId(NetPartyManager.getMyActorId());
    return myIndex == this._actorIndex;
};

//?[NEW]
BattleManager.syncNet = function () {
    if (BattleManager.isNetworkBattle()) {
        Network.requestSync();
    }
};

//?[NEW]
BattleManager._processTurnFromNetwork = function (subjectId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
    } catch (error) {
        AlphaNET.error(error, ' processTurnFromNetwork');
    }
};

//?[NEW]
BattleManager._startActionFromNetwork = function (targets) {
    this._startActionFromNetworkDefault(targets);
};

//?[NEW]
BattleManager._startActionFromNetworkDefault = function (targets) {
    try {
        this._subject = this.getNextSubject();
        if (this._subject == null) {
            return;
        }
        this._action = this._subject.currentAction();
        this._subject.useItem(this._action.item());
        this.refreshStatus();
        this._action.applyGlobal();
        this._targets = this.convertIdsToBattlers(targets);
    } catch (error) {
        AlphaNET.error(error, ' startActionFromNetwork  : DEFAULT');
        return;
    }
    if (this._targets.length > 0) {
        try {
            this._logWindow.startAction(this._subject, this._action, this._targets);
        } catch (error) {
            console.error(error);
        }
    }
};

//?[NEW]
BattleManager._selectInputCommandFromNetwork = function (commnadName) {
    try {
        if (commnadName == 'next')
            this._alias__selectNextCommand.call(this);
        else
            this._alias__selectPreviousCommand.call(this);
    } catch (error) {
        AlphaNET.error(error, ' _selectInputCommandFromNetwork');
        this._alias__selectNextCommand.call(this);
    }
};

//?[NEW]
BattleManager._invokeNormalActionFromNetwork = function (subjectId, targetId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        var target = this.getBattleSubjectById(targetId);
        this._logWindow.displayActionResults(subject, target);
    } catch (error) {
        AlphaNET.error(error, 'invokeNormalActionFromNetwork');
    }
};

//?[NEW]
BattleManager._abortBattleCommandFromNetwork = function () {
    SoundManager.playEscape();
    this._escaped = true;
    this.processAbort();
};

//?[NEW]
BattleManager._onEscapeFromNetwork = function (success) {
    $gameParty.performEscape();
    SoundManager.playEscape();
    if (success) {
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
};

//?[NEW]
BattleManager._sendBattleOrderToNetwork = function () {
    var orderData = this.convertBattlersToIds(BattleManager._actionBattlers);
    //console.info(BattleManager._actionBattlers);
    var data = NetMessage.CreateSubMessageData('battleOrder');
    data.orderData = orderData;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendNetworkMsg = function (data) {
    Network.sendMessage(NetMessage.BattleManager().setData(data));
};

//?[NEW]
BattleManager._sendTroopNetworkIds = function () {
    var troopIds = $gameTroop.members().map(item => item.uniqueNetworkId());
    var data = NetMessage.CreateSubMessageData('enemyIds');
    data.troopIds = troopIds;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendActionEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endAction'));
};

//?[NEW]
BattleManager._sendTurnEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endTurn'));
};

//?[NEW]
BattleManager._sendProcessTurnToNetwork = function (subject) {
    var data = NetMessage.CreateSubMessageData('processTurn');
    data.subjectId = this.getIdByBattleSubject(subject);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendStartActionToNetwork = function (targets) {
    var data = NetMessage.CreateSubMessageData('startAction');
    data.targets = this.convertBattlersToIds(targets);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendInvokeNormalToNetwork = function (subject, target) {
    var data = NetMessage.CreateSubMessageData('invokeNormal');
    data.subjectId = this.getIdByBattleSubject(subject);
    data.targetId = this.getIdByBattleSubject(target);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._selectInputCommandNetwork = function (commandName) {
    var method = this._alias__selectNextCommand;
    if (commandName == 'prev')
        method = this._alias__selectPreviousCommand;
    if (this.actor()) {
        if (BattleManager.isMyActorInput()) {
            method.call(this);
            Network.sendMessage(NetMessage.BattleInputCommand().setData(commandName));
        }
    } else {
        method.call(this);
    }
};

//?[NEW]
BattleManager._sendAbortBattleToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('abortBattle');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendVictoryToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('victory');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendDefeatToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('defeat');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendEscapeToNetwork = function (success) {
    var data = NetMessage.CreateSubMessageData('escape');
    data.success = success;
    this._sendNetworkMsg(data);
};

// * DEPRECATED
//?[NEW]
BattleManager.isWaitInputtingForPvP = function () {
    return this._waitInputPvP === true;
};

// * NOT USED
//?[NEW]
BattleManager._onPvPStartInputCommandFromServer = function() {
    this._waitInputPvP = false;
};

//?[NEW]
BattleManager._startTurnPvP = function() {
    ///"StartTurnPvP".p();
    BattleManager._battlersMakeTurns = 0;
    BattleManager._battlersMakeInput++;
    //console.info($gameParty.leader().currentAction());
    if (BattleManager.isNetworkBattlePvPServer()) {
        //WAIT ANOTHER ACTOR INPUT FROM SERVER
        if (BattleManager._battlersMakeInput == 2) {
            BattleManager._startPvP();
        }
    } else {
        //SEND MY INPPUTING ACTION
        BattleManager._sendInputActionPvPToServer($gameParty.leader().currentAction());
    }
};

//?[NEW]
BattleManager._sendInputActionPvPToServer = function (action) {
    if(!this.isNetworkBattlePvP()) return;
    var data = BattleManager._collectBasicPvPData('inputActionPvP');
    data.action = JsonEx.stringify(action);
    this._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._collectBasicPvPData = function (commandName) {
    var data = NetMessage.CreateSubMessageData(commandName);
    data.myActorId = $gameParty.leader().actorId();
    data.myRivalActorId = $gameTroop.rival().actorId();
    return data;
};

//?[NEW]
BattleManager._sendNetworkMsgPvP = function (data) {
    Network.sendMessage(NetMessage.BattleManagerPvP().setData(data));
};

//?[NEW]
BattleManager._setPvPRivalActionFromNetwork = function (action) {
    $gameTroop.rival()._actions[0] = action;
    BattleManager._battlersMakeInput++;
    if (BattleManager.isNetworkBattlePvPServer()) {
        if(BattleManager._battlersMakeInput == 2)
            BattleManager._startPvP();
    }
};

//?[NEW]
BattleManager._startPvP = function () {
    BattleManager._battlersMakeInput = 0;
    BattleManager.makeActionOrders();
    //BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    ///"START".p(BattleManager._actionBattlers[0].name());
    BattleManager._sendStartTurnPvPToServer(BattleManager._actionBattlers[0].actorId());
};

//?[NEW]
BattleManager._sendStartTurnPvPToServer = function (actorId) {
    var data = BattleManager._collectBasicPvPData('startTurnPvP');
    data.whoStart = actorId;
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startPvPTurnFromNetwork = function() {
    //"START PVP TURN FROM NETWORK".p();
    BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    BattleManager._subject = BattleManager._actionBattlers[0];
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._sendStartActionPvPToNetwork = function() {
    var data = BattleManager._collectBasicPvPData('startActionPvP');
    data.subjectId = $gameParty.leader().actorId();
    data.action = JsonEx.stringify(BattleManager._action);
    data.targets = BattleManager.convertBattlersToIds(BattleManager._targets);
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startActionFromNetworkPvP = function(subjectId, action, targetsIds) {
    //"START ACTION FROM NETWORK".p();
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var targets = BattleManager.convertIdsToBattlers(targetsIds);
    BattleManager._logWindow.startAction(subject, action, targets);
};

//?[NEW]
// * Только Normal Action
//TODO: Magic Reflection, CounterAttack
BattleManager._invokeActionPvP = function (subject, target) {
    this._logWindow.push('pushBaseLine');
    this.invokeNormalAction(subject, target);
    subject.setLastTarget(target);
    this._logWindow.push('popBaseLine');
    this.refreshStatus();
};

//?[NEW]
BattleManager._invokeNormalActionPvP = function (subject, target) {
    this._action.apply(target);
    this._logWindow.displayActionResults(subject, target);

    var data = BattleManager._collectBasicPvPData('invokeNormalActionPvP');
    data.subjectId = subject.actorId();
    data.targetId = target.actorId();
    data.resultSubject = JsonEx.stringify(subject.result());
    data.resultTarget = JsonEx.stringify(target.result());
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._invokeNormalActionFromNetworkPvP = function (subjectId, targetId, subResult, tarResult) {
    //"NORMAL ACTION FROM NETWORK".p();
    BattleManager._logWindow.push('pushBaseLine');
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var target = BattleManager.getBattleSubjectById(targetId);
    subject._result = subResult;
    target._result = tarResult;
    BattleManager._logWindow.displayActionResults(subject, target);
    BattleManager._logWindow.push('popBaseLine');
    BattleManager.refreshStatus();
};

//?[NEW]
BattleManager._sendEndActionPvPToServer = function() {
    ///"END ACTION -> SERVER".p();
    var data = BattleManager._collectBasicPvPData('endActionPvP');
    data.subjectData = JsonEx.stringify($gameParty.leader()._collectDataPvPForNetwork());
    data.targetData = JsonEx.stringify($gameTroop.rival()._collectDataPvPForNetwork());
    BattleManager._sendNetworkMsgPvP(data);
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._actionEndPvPFromNetwork = function(targetData, partyLeaderData) {
    //"END ACTION FROM SERVER".p();
    BattleManager._logWindow.endAction($gameTroop.rival());
    BattleManager.refreshStatus();
    BattleManager._battlersMakeTurns++;
    $gameParty.leader()._onNetworkPvPData(partyLeaderData);
    $gameTroop.rival()._onNetworkPvPData(targetData);
    if(BattleManager._battlersMakeTurns == 1) {
        // * Так как это пришло от сервера, значит следующий ход - мой
        BattleManager._sendStartTurnPvPToServer($gameParty.leader().actorId());
    } else
        BattleManager._checkTurnEndPvP();
};

//?[NEW]
BattleManager._checkTurnEndPvP = function () {
    if (BattleManager._battlersMakeTurns == 2) {
        //"END TURN".p();
        BattleManager._battlersMakeTurns = 0;
        BattleManager.endTurn();
    }
};

//TODO: СБОС ФЛАГОВ PVP в NETWORK!!

// ■ END BattleManager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = _alias_DataManager_makeSaveContents.call(this, ...arguments);
        try {
            if (Network.isConnected()) {
                if (Network.isHost() && Network.sessionData != null) {
                    contents.network = Network.sessionData.makeSaveContents();
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' create network world save data');
        }
        return contents;
    };

    //@[ALIAS]
    var _alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _alias_DataManager_extractSaveContents.call(this, ...arguments);
        try {
            if (contents.network != null) {
                if (Network.sessionData == null)
                    Network.sessionData = new AlphaNET.LIBS.NetSessionData();
                Network.sessionData.extractSaveContents(contents.network);
            }
        } catch (error) {
            AlphaNET.error(error, ' load network world save data');
        }
    };

    //@[ALIAS]
    var _alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _alias_DataManager_createGameObjects.call(this, ...arguments);
        AlphaNET.ExtraPluginSupport();
    };

    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        _alias_DataManager_loadDatabase.call(this, ...arguments);
        ANJsonSettings.InitAndLoad();
    };

})();
// ■ END DataManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager_PRO.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _alias_DataManager_setupNewGame.call(this);
        ANET.loadFonts();
    };
})();
// ■ END DataManager_PRO.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ExtraPluginsSupport.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaNET.ExtraPluginSupport = (function () {

    // * Yanfly Engine Plugins - Item Core
    (function(){
        if (Imported.YEP_ItemCore == null)
            return;
        try {
            //@[ALIAS]
            var _alias_Game_Party_getDataForNetwork = Game_Party.prototype.getDataForNetwork;
            Game_Party.prototype.getDataForNetwork = function () {
                var result = _alias_Game_Party_getDataForNetwork.call(this, ...arguments);
                
                var weapons = {};
                for (const [key, value] of Object.entries($gameParty._weapons)) {
                    var newKey = Number(key) - Yanfly.Param.ItemStartingId;
                    weapons[newKey] = value;
                }
                result.weapons = JSON.stringify(weapons);

                var armors = {};
                var realArmors = $gameParty.armors();
                for(var i = 0; i<realArmors.length; i++) {
                    var baseId = DataManager.getBaseItem(realArmors[i]).id;
                    if (armors[baseId] == null)
                        armors[baseId] = 1;
                    else
                        armors[baseId] += 1;
                }
                result.armors = JSON.stringify(armors);

                return result;
            };

            //$[OVER]
            Game_Party.prototype._setArmorsFromNetwork = function (armors) {
                if (armors != null) {
                    try {
                        var temp = JSON.parse(armors);
                        for (const [key, value] of Object.entries(temp)) {
                            var item = $dataArmors[Number(key)];
                            $gameParty.gainItem(item, value);
                        }
                    } catch(error) {
                        AlphaNET.error(error, ' load player armors from Network');
                    }
                }
            };


        } catch(error) {
            AlphaNET.warning('Alpha NET compatibility for YEP_ItemCore.js not loaded!');
        }
    })();

});
// ■ END ExtraPluginsSupport.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ FontLoadManager_PRO.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var FontLoadManager = function () {
    throw new Error('This is a static class');
};

FontLoadManager.initAndLoadAll = function () {
    FontLoadManager.init();
    FontLoadManager.loadAll();
};

FontLoadManager.init = function () {
    var fs = require('fs');
    this._files = fs.readdirSync(this.localFileDirectoryPath());
};


FontLoadManager.loadAll = function () {
    for (var i = 0; i < this._files.length; i++) {
        if (this._files[i].contains("mplus-1m-regular"))
            continue;
        if (this._files[i].includes('.ttf') || this._files[i].includes('.TTF')) {
            ANET.log("Load font " + this._files[i]);
            var name = this._files[i].substring(0, this._files[i].length - 4);
            var url = this.localFileDirectoryPath() + this._files[i];
            url = url.replaceAll("\\", "\\\\");
            Graphics.loadFont(name, url);
        }
    }
};

FontLoadManager._localFileDirectoryPath = null;
FontLoadManager.localFileDirectoryPath = function () {
    if (this._localFileDirectoryPath == null) {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        this._localFileDirectoryPath = path.join(base, 'fonts/');
    }
    return this._localFileDirectoryPath;
};
// ■ END FontLoadManager_PRO.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        _alias_Game_Action_apply.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionResultToNetwork(target);
        }
    };

    //@[ALIAS]
    var _alias_Game_Action_setSkill = Game_Action.prototype.setSkill;
    Game_Action.prototype.setSkill = function (skillId) {
        _alias_Game_Action_setSkill.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionSkillToNetwork(skillId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setItem = Game_Action.prototype.setItem;
    Game_Action.prototype.setItem = function (itemId) {
        _alias_Game_Action_setItem.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionItemToNetwork(itemId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setTarget = Game_Action.prototype.setTarget;
    Game_Action.prototype.setTarget = function (targetIndex) {
        _alias_Game_Action_setTarget.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionTargetToNetwork(targetIndex);
        }
        this._outerCall = false;
    };

    //?[NEW]
    Game_Action.prototype.setSkillFromNet = function (skillId) {
        this._outerCall = true;
        "Game_Action: Skill set from Net".p(skillId);
        this.setSkill(skillId);
    };

    //?[NEW]
    Game_Action.prototype.setItemFromNet = function (itemId) {
        this._outerCall = true;
        "Game_Action: Item set from Net".p(itemId);
        this.setItem(itemId);
    };

    //?[NEW]
    Game_Action.prototype.setTargetFromNet = function (targetIndex) {
        this._outerCall = true;
        "Game_Action: Target set from Net".p(targetIndex);
        this.setTarget(targetIndex);
    };

    //@[ALIAS]
    var _alias_Game_Action_setSubject = Game_Action.prototype.setSubject;
    Game_Action.prototype.setSubject = function (subject) {
        if(BattleManager.isNetworkBattlePvP()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        } else
            _alias_Game_Action_setSubject.call(this, subject);
    };

    //@[ALIAS]
    var _alias_Game_Action_subject = Game_Action.prototype.subject;
    Game_Action.prototype.subject = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            if (this._subjectActorId == $gameParty.leader().actorId()) {
                return $gameParty.leader();
            } else {
                return $gameTroop.rival();
            }
        } else
            return _alias_Game_Action_subject.call(this);
    };

})();
// ■ END Game_Action.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Action.prototype;
  _._sendActionResultToNetwork = function(target) {
    var data;
    if (BattleManager._phase !== 'action') {
      return;
    }
    data = NetMessage.CreateSubMessageData('setResult');
    data.sbj = BattleManager.getIdByBattleSubject(this.subject());
    data.target = BattleManager.getIdByBattleSubject(target);
    data.result = target.result();
    this._sendActionNetMsg(data);
  };
  _._sendActionNetMsg = function(data) {
    return Network.sendMessage(NetMessage.BattleAction().setData(data));
  };
  _._sendSetActionSkillToNetwork = function(skillId) {
    return this._createActionNetMessage('setSkill', skillId);
  };
  _._createActionNetMessage = function(name, actionId) {
    var data;
    if (this._outerCall === true) {
      return;
    }
    if (!(this._subjectActorId > 0)) {
      return;
    }
    data = NetMessage.CreateSubMessageData(name);
    data.actionId = actionId;
    data.actorId = this._subjectActorId;
    this._sendActionNetMsg(data);
  };
  _._sendSetActionItemToNetwork = function(itemId) {
    return this._createActionNetMessage('setItem', itemId);
  };
  _._sendSetActionTargetToNetwork = function(targetIndex) {
    return this._createActionNetMessage('setTarget', targetIndex);
  };
})();

// ■ END Game_Action_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Game_ActionResult.prototype.setupFromOuterData = function (data) {
    var item = this;
    Object.getOwnPropertyNames(data).forEach(function (key, index) {
        item[key] = data[key];
    });
};
// ■ END Game_ActionResult_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function () {
        _alias_Game_Actor_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.actorId());
        }
    };

    //@[ALIAS]
    var _alias_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _alias_Game_Actor_initMembers.call(this, ...arguments);
        this._networkNameplateStyleId = null;
    };

    //?[NEW]
    Game_Actor.prototype.networkStyleId = function () {
        return this._networkNameplateStyleId;
    };

    //?[NEW]
    Game_Actor.prototype._collectDataPvPForNetwork = function () {
        var data = {};
        data._hp = this._hp;
        data._mp = this._mp;
        data._tp = this._tp;
        data._paramPlus = this._paramPlus;
        data._states = this._states;
        data._stateTurns = this._stateTurns;
        data._buffs = this._buffs;
        data._buffTurns = this._buffTurns;
        return data;
    };

    //?[NEW]
    Game_Actor.prototype._onNetworkPvPData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
})();
// ■ END Game_Actor.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor_X.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
        this.requestMotion('damage');
    } else {
        if (this == $gameParty.leader())
            $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playActorDamage();
};
// ■ END Game_Actor_X.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //TODO: Game_Battler.escape - не синхронизирован. Т.е. один игрок может  убежать, если у вещи есть
    //специальный эффект, но это не синхронизируется, бой встаёт!

    //@[ALIAS]
    var _alias_Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                "CONSUME ITEM".p();
                _alias_Game_Battler_consumeItem.call(this, ...arguments);
            }
        } else {
            _alias_Game_Battler_consumeItem.call(this, ...arguments);
        }
    };

    //@[ALIAS]
    var _alias_Game_Battler_meetsItemConditions = Game_Battler.prototype.meetsItemConditions;
    Game_Battler.prototype.meetsItemConditions = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                return _alias_Game_Battler_meetsItemConditions.call(this, item);
            } else {
                return this.meetsUsableItemConditions(item);
            }
        } else
            return _alias_Game_Battler_meetsItemConditions.call(this, item);
    };
})();
// ■ END Game_Battler.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Battler.prototype;
  _._sendRefreshMessageToNetwork = function(netId) {
    var data, msg;
    data = this._collectDataForNetwork();
    data.id = netId;
    msg = NetMessage.BattleBattlerRefreshData().setData(data);
    Network.sendMessage(msg);
  };
  _._collectDataForNetwork = function() {
    var data;
    return data = {
      hp: this._hp,
      mp: this._mp,
      tp: this._tp,
      states: this._states
    };
  };
  _._isNeedNetworkRefresh = function() {
    var phase;
    if (BattleManager.isNetworkBattleServer()) {
      phase = BattleManager._phase;
      return phase === 'action' || phase === 'start';
    }
    return false;
  };
})();

// ■ END Game_Battler_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _alias_Game_Character_initMembers.call(this, ...arguments);
        this._networkIconId = 0;
    };
})();
// ■ END Game_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

//?[NEW]
Game_Character.prototype.synchronizeFromNetwork = function (netCharData) {
    this.onNetworkCharacterData(netCharData.charData);
    this.locate(netCharData.locatePoint.x, netCharData.locatePoint.y);
    this.onNetworkDirectionData(netCharData.locatePoint.direction);
};

//?[NEW]
Game_Character.prototype.onNetworkCharacterData = function (characterData) {
    this.updateNetworkData(characterData);
};

//?[NEW]
Game_Character.prototype.updateNetworkData = function (characterData) {
    for (var key in characterData) {
        this[key] = characterData[key];
    }
};

//?[NEW]
Game_Character.prototype.onNetworkDirectionData = function (d) {
    this._direction = d;
};

//?[NEW]
Game_Character.prototype.collectDataForNetwork = function () {
    var data = this._collectDataForNetwork();
    data.locatePoint = {
        x: this._x,
        y: this._y,
        direction: this._direction
    };
    return data;
};

//?[NEW]
Game_Character.prototype._collectDataForNetwork = function () {
    var data = {};
    data.charData = this._collectCharDataForNetwork();
    data.moveData = this._collectMoveDataForNetwork();
    return data;
};

//?[NEW]
Game_Character.prototype._collectCharDataForNetwork = function () {
    var data = {};
    data._moveSpeed = this.realMoveSpeed();
    data._opacity = this.opacity();
    data._blendMode = this.blendMode();
    data._walkAnime = this.hasWalkAnime();
    data._stepAnime = this.hasStepAnime();
    data._directionFix = this.isDirectionFixed();
    data._transparent = this.isTransparent();
    data._direction = this._direction;
    return data;
};

//?[NEW]
Game_Character.prototype._collectMoveDataForNetwork = function () {
    return {
        x: this.x,
        y: this.y
    };
};

//?[NEW]
Game_Character.prototype.onNetworkMoveData = function (moveData) {
    this._moveFromNetwork(moveData);
};

//?[NEW]
Game_Character.prototype._moveFromNetwork = function (point) {
    try {
        var sx = this.deltaXFrom(point.x);
        var sy = this.deltaYFrom(point.y);
        if (sx !== 0 && sy !== 0) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        } else if (sx !== 0) {
            this._moveStraightNetwork(sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            this._moveStraightNetwork(sy > 0 ? 8 : 2);
        }
    } catch (e) {

    }
};

//?[NEW]
Game_Character.prototype._moveStraightNetwork = function (d) {
    this.setMovementSuccess(true);
    this.setDirection(d);
    this._x = $gameMap.roundXWithDirection(this._x, d);
    this._y = $gameMap.roundYWithDirection(this._y, d);
    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
    this.increaseSteps();
};

//?[NEW]
Game_Character.prototype.networkIconId = function () {
    if (this.isTransparent())
        return -1;
    else
        return this._networkIconId;
};

//?[NEW]
Game_Character.prototype._startNetworkIcon = function () {
    this._networkIconId = 0;
};

//?[NEW]
Game_Character.prototype.showNetworkIcon = function (iconId) {
    this._networkIconId = iconId;
};

//?[NEW]
Game_Character.prototype.getNetworkName = function() {
    return null;
};

//?[NEW]
Game_Character.prototype.getNetworkNameStyleId = function() {
    return null;
};
// ■ END Game_Character_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function () {
        _alias_Game_Enemy_setup.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer()) {
            this._uniqueNetworkId = 901 + $gameTroop.members().length;
            "UID".p(this._uniqueNetworkId);
        }
    };

    //?[NEW]
    Game_Enemy.prototype.uniqueNetworkId = function () {
        return this._uniqueNetworkId;
    };

    //@[ALIAS]
    var _alias_Game_Enemy_refresh = Game_Enemy.prototype.refresh;
    Game_Enemy.prototype.refresh = function () {
        _alias_Game_Enemy_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.uniqueNetworkId());
        }
    };
})();
// ■ END Game_Enemy.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_EnemyPvP.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    function Game_EnemyPvP() {
        this.initialize.apply(this, arguments);
    }

    Game_EnemyPvP.prototype = Object.create(Game_Actor.prototype);
    Game_EnemyPvP.prototype.constructor = Game_EnemyPvP;

    Game_EnemyPvP.prototype.initialize = function (actorId, x, y) {
        Game_Actor.prototype.initialize.call(this, actorId);
        this._screenX = x-200;
        this._screenY = y-100;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.setup = function (actorId) {
        Game_Actor.prototype.setup.call(this, actorId);
        this._setupFromActor();
    };

    //?[NEW]
    Game_EnemyPvP.prototype._setupFromActor = function () {
        var actor = $gameActors.actor(this._actorId);
        this._name = actor.name();
        this._nickname = actor.nickname();
        this._profile = actor.profile();
        this._classId = actor._classId;
        this._level = actor._level;
        
        this._characterName = actor.characterName();
        this._characterIndex = actor.characterIndex();
        this._faceName = actor.faceName();
        this._faceIndex = actor.faceIndex();
        this._battlerName = actor.battlerName();

        this._exp[this._classId] = actor._exp[this._classId];
        this._skills = actor._skills;
        this._equips = actor._equips;

        var data = actor._collectDataPvPForNetwork();
        this._onNetworkPvPData(data);
    };


    //?[BASE]
    Game_EnemyPvP.prototype.initMembers = function () {
        Game_Actor.prototype.initMembers.call(this);
        this._screenX = 0;
        this._screenY = 0;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.isActor = function () {
        return false;
    };

    Game_EnemyPvP.prototype.isEnemy = function () {
        return true;
    };

    Game_EnemyPvP.prototype.friendsUnit = function () {
        return $gameTroop;
    };

    Game_EnemyPvP.prototype.opponentsUnit = function () {
        return $gameParty;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.index = function () {
        return 0; // * PvP only 1 by 1
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.isBattleMember = function () {
        return true;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemyId = function () {
        return Game_Actor.prototype.actorId.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemy = function () {
        return Game_Actor.prototype.actor.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.exp = function () {
        return 0; // * TODO: EXP
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.gold = function () {
        return 0; // * TODO: GOLD
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.makeDropItems = function () {
        return []; // * TODO: DROP ITEMS
    };

    Game_EnemyPvP.prototype.isSpriteVisible = function () {
        return true;
    };

    Game_EnemyPvP.prototype.screenX = function () {
        return Game_Enemy.prototype.screenX.call(this);
    };

    Game_EnemyPvP.prototype.screenY = function () {
        return Game_Enemy.prototype.screenY.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.battlerHue = function () {
        return 0;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.originalName = function () {
        return this.battlerName();
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performActionStart = function (action) {
        Game_Enemy.prototype.performActionStart.call(this, action);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performDamage = function () {
        Game_Enemy.prototype.performDamage.call(this);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performCollapse = function () {
        Game_Battler.prototype.performCollapse.call(this);
        this.requestEffect('collapse');
        SoundManager.playEnemyCollapse();
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.meetsCondition = function (action) {
        return false; // * In PvP Interpreter not working!
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.makeActions = function () {
        Game_Battler.prototype.makeActions.call(this);
        this.makeAutoBattleActions(); //TODO: Auto Battle in TEST
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.uniqueNetworkId = function () {
        return this.enemyId();
    };

    AlphaNET.register(Game_EnemyPvP);
})();
// ■ END Game_EnemyPvP.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {

    //@[ALIAS]
    var _Game_Event_prototype_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function () {
        _Game_Event_prototype_initMembers.call(this);
        this._isOnlyLocalMovement = false;
        this._isNetworkSharedMode = false;
        this._isStartedFromNetwork = false;
        this._networkSyncCommands = [];
    };

    //@[ALIAS]
    var _alias_Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function () {
        _alias_Game_Event_initialize.call(this, ...arguments);
        this._checkNetworkGlobalSymbols();
    };

    //?[NEW]
    Game_Event.prototype.isLockedByNet = function () {
        return $gameMap.isEventLockedByNet(this.eventId());
    };

    //?[NEW]
    Game_Event.prototype._checkNetworkGlobalSymbols = function () {
        try {
            var ev = this.event();
            if (ev.note.contains('LOCAL')) {
                //"LOCAL".p(ev.id);
                this.setLocalMovementMode(true);
            }
            if (ev.note.contains('NET')) {
                if (Network.isMultiMode() == false) {
                    this.setLocalMovementMode(true);
                    this.setNetworkSharedMode(true);
                } else {
                    AlphaNET.warning(`using NET event (id ${this._eventId}) in multiplayer game mode on ${$gameMap.mapId()}`);
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' read network global symbols from Event');
        }
    };

    //?[NEW]
    Game_Event.prototype.isOnlyLocalMoveMode = function () {
        return this._isOnlyLocalMovement == true;
    };

    //?[NEW]
    Game_Event.prototype.setLocalMovementMode = function (bool) {
        this._isOnlyLocalMovement = bool;
    };

    //?[NEW]
    Game_Event.prototype.setNetworkSharedMode = function (bool) {
        this._isNetworkSharedMode = bool;
    };

    //?[NEW]
    Game_Event.prototype.isNetworkSharedMode = function () {
        return (this._isNetworkSharedMode == true);
    };

    // * Когда Event движется, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_moveStraight = Game_Event.prototype.moveStraight;
    Game_Event.prototype.moveStraight = function (d) {
        _Game_Event_prototype_moveStraight.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            var data = this._collectEventBasicDataForNetwork();
            data.moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //?[NEW]
    Game_Event.prototype._collectEventBasicDataForNetwork = function () {
        var data = {
            eventId: this.eventId(),
            mapId: $gameMap.mapId()
        };
        return data;
    };

    // * Когда Event меняет Direction, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_setDirection = Game_Event.prototype.setDirection;
    Game_Event.prototype.setDirection = function (d) {
        _Game_Event_prototype_setDirection.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            this._syncDirectionNetwork(d);
        }
    };

    //?[NEW]
    Game_Event.prototype._syncDirectionNetwork = function (d) {
        if (!this.isDirectionFixed() && d) {
            var data = this._collectEventBasicDataForNetwork();
            data.directionData = d;
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //@[ALIAS]
    var _Game_Event_prototype_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function () {
        if(Network.isConnected()) {
            this._updateSelfMovementForNetwork();
        } else {
            _Game_Event_prototype_updateSelfMovement.call(this);
        }
    };

    //?[NEW]
    Game_Event.prototype._updateSelfMovementForNetwork = function () {
        if(Network.isMultiMode()) {
            if ($gameMap.isEventOwnedByNet(this.eventId())) {
                //?EMPTY
                //* Если другой игрок заблокировал событие, то оно не обновляется в любом случае!
                return;
            }
            if(!Network.isMapOwner() && 
            !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на том клиенте, который первый попал на карту
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        } else {
            if (!Network.isHost() &&
                !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на хосте, кроме только локальных
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        }
    };

    // * Эта функция вызывается на Хосте, когда он находится не на сцене карты
    // * Она нужна, чтобы события продолжали SelfMovement и не зависали у всех игроков
    //?[NEW]
    Game_Event.prototype.updateForNetwork = function () {
        Game_Character.prototype.update.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Event_list = Game_Event.prototype.list;
    Game_Event.prototype.list = function () {
        if (this.isNeedStartSyncCommand()) {
            "RUN EVENT SYNC COMMAND".p();
            return this._createSyncCommandsList();
        } else if (this.isLockedByNet()) {
            return [];
        } else
            return _alias_Game_Event_list.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function () {
        _alias_Game_Event_update.call(this, ...arguments);
        if (this.isNeedStartSyncCommand()) {
            this._starting = true;
        }
    };

    //?[NEW]
    Game_Event.prototype.startFromNetwork = function () {       
        this._isStartedFromNetwork = true;
        if (this.sharedPageIndex >= 0) {
            this._pageIndex = this.sharedPageIndex;
            this.sharedPageIndex = -1;
        }
        this.start();
    };

    //?[NEW]
    Game_Event.prototype.isStartedFromNetwork = function () {
        return this._isStartedFromNetwork == true;
    };

    //?[NEW]
    Game_Event.prototype.clearStartFromNetwork = function () {
        this._isStartedFromNetwork = false;
    };

    //@[ALIAS]
    var _alias_Game_Event_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function () {
        if (!this._locked) {
            this._setEventOwned(true);
        }
        _alias_Game_Event_lock.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_unlock = Game_Event.prototype.unlock;
    Game_Event.prototype.unlock = function () {
        if (this._locked) {
            this._setEventOwned(false);
        }
        _alias_Game_Event_unlock.call(this, ...arguments);
    };
})();

// ■ END Game_Event.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Event.prototype;
  _.isNeedStartSyncCommand = function() {
    return this._networkSyncCommands.length > 0;
  };
  _.executeSyncCommandFromNetwork = function(pageIndex = 0, listIndex = -1) {
    this._networkSyncCommands.push([...arguments]);
    "COMMAND ADDED TO networkSyncCommands".p();
    if (!this.isStarting()) {
      return this._starting = true;
    }
  };
  _._createSyncCommandsList = function() {
    var list;
    list = this._networkSyncCommands.map((command) => {
      var item;
      item = this._getSyncCommand(...command);
      if (item != null) {
        return item;
      }
    });
    this._networkSyncCommands = [];
    return list;
  };
  _._getSyncCommand = function(pageIndex = 0, listIndex = -1) {
    var page;
    page = this.event().pages[pageIndex];
    if (page != null) {
      return this._getSyncCommandLine(page, listIndex);
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._getSyncCommandLine = function(page, index = -1) {
    var line, list;
    if (index < 0) {
      this._syncCommandLineNotFounded();
    }
    list = page.list;
    if (!((list != null) && list.length > 1)) {
      this._syncCommandLineNotFounded();
    }
    line = list[index];
    if (line != null) {
      return line;
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._syncCommandLineNotFounded = function() {
    AlphaNET.error('', 'Cannot Sync. Event Line not founded!');
    return null;
  };
  _._setEventOwned = function(isOwned) {
    var data;
    if (this._isEventNeedBeOwned()) {
      data = this._collectEventBasicDataForNetwork();
      data.isLock = isOwned;
      Network.sendMessage(NetMessage.OwnEvent().setData(data));
    }
  };
  _._isEventNeedBeOwned = function() {
    return Network.isConnected() && Network.isMultiMode() && !Network.isMapOwner();
  };
})();

// ■ END Game_Event_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Followers.prototype.initialize = function () {
    this._visible = true;
    this._gathering = false;
    this._data = [];
    for (var i = 0; i < Network.maximumNetworkPlayers; i++) {
        this._data.push(new AlphaNET.LIBS.NetworkCharacter(i));
    }
    this._netCharIdStore = null; // * Для оптимизации
};

//?[NEW]
Game_Followers.prototype.getNetworkCharById = function (id) {
    if (this._netCharIdStore == null)
        this._generateStore();
    return this._netCharIdStore[id];
};

// * Создаём хэш ID и character, чтобы каждый раз не искать по ID в _data
//?[NEW] 
Game_Followers.prototype._generateStore = function () {
    this._netCharIdStore = {};
    this._data.forEach(item => {
        this._netCharIdStore[item.netId] = item;
    });
};

//$[OVER]
Game_Followers.prototype.update = function () {
    this.forEach(function (follower) {
        follower.update();
    }, this);
};

//@[ALIAS]
/*var _alias_Game_Followers_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function () {
    if(Network.isConnected()) {
        if (!Network.isHost()) return;
        for (var i = this._data.length - 1; i >= 0; i--) {
            var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
            this._data[i].chaseCharacter(precedingCharacter);
        }
    } else
        _alias_Game_Followers_updateMove.call(this, ...arguments);
};*/ //TODO: Gather можно реализовать

//?[NEW]
Game_Followers.prototype.count = function () {
    return this._data.length;
};

//?[NEW]
Game_Followers.prototype.refreshNetwork = function () {
    this._data.forEach(item => item.refreshNet());
    this._generateStore();
};

//?[NEW]
Game_Followers.prototype.getNetworkPlayerOnPosition = function(x, y) {
    var networkPlayer = this._data.find(item => (item.x == x && item.y == y && item.actor()));
    return networkPlayer;
};
// ■ END Game_Followers.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

  // * 1 - сделать выполнение событий с Sync, only, except командами - OK
  //  Проверить если событие запущено другое, а приходит синхронизация - OK
  //  Проверить очередь - OK
  // * 2 - сделать NET ALL событие с Sync, only, except командами + регулировка одновременного старта - OK
  // * 3 - параллельные события ???
  // * 4 - indent, ветвление ???
  // * 5 - общие события (обыные, параллельные, автоматические) ???

  //@[DEFINES]
  var _ = Game_Interpreter.prototype;

  //@[ALIAS]
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'NET') {
      switch (args[0]) {
        /* jshint -W086 */
        case 'start':
          AlphaNET.startServer();
          // * Тут нет Break намеренно, так как сразу соединение нужно к серверу
        case 'connect':
          AlphaNET.connectToServer();
          break;
        case 'disconnect':
          AlphaNET.disconnectFromServer();
          break;
        case 'hotSeat':
          AlphaNET.startAnotherClient();
          break;
        case 'stop':
          AlphaNET.stopServer();
          break;
        case 'sync':
          this._onNETSyncCommand();
          break;
        case 'lock':
          this._onNETLockCommand();
          break;
        case 'only':
        case 'except':
          this._onNETConditionCommand(args);
          break;
        case 'virtual':
          this._onNETVirtualCommand();
          break;
        case 'restrict':
          if (Network.isHost())
            Network._allowConnection = false;
          break;
        case 'allow':
          if (Network.isHost())
            Network._allowConnection = true;
          break;
        default:
          break;
      }
    }
  };

  //@[ALIAS]
  var _alias_Game_Interpreter_clear = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function () {
    _alias_Game_Interpreter_clear.call(this);
    this._network = new AlphaNET.LIBS.InterpreterNET();
  };

  //@[ALIAS]
  var _alias__setup = _.setup;
  _.setup = function () {
    _alias__setup.call(this, ...arguments);
    if (Network.isConnected() && this._eventId > 0) {
      this._network.setup(this._eventId, this._list);
      if (this._network.isShared() && this.isRunning()) {
        this._network.startNetwork();
      }
    }
  };

  //@[ALIAS]
  var _alias__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function () {
    if (this._waitMode == 'network') {
      return this._updateWaitModeNetwork();
    } else 
      {
        this._network.resetWait();
        return _alias__updateWaitMode.call(this, ...arguments);
      }
  };

  //?[NEW]
  _._updateWaitModeNetwork = function () {
    if (!Network.isBusy()) {
      return this._network.updateWaitMode();
    }
    return true; // * Continue waiting
  };

  //@[ALIAS]
  var _alias__setupChoices = _.setupChoices;
  _.setupChoices = function () {
    _alias__setupChoices.call(this, ...arguments);
    if (Network.isConnected()) {
      $gameMessage.setSharedChoiseMode(this._network.isShared());
    }
  };

  // * Transfer Player
  //@[ALIAS]
  var _alias__command201 = _.command201;
  _.command201 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command201, arguments);
  };


  // * Battle Processing
  //@[ALIAS]
  var _alias__command301 = _.command301;
  _.command301 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command301, arguments);
  };

  //@[ALIAS]
  var _alias__terminate = _.terminate;
  _.terminate = function () {
    _alias__terminate.call(this, ...arguments);
    if (this._needEventUnlock) { // * Unlock the event
      this._onNETLockCommand(false);
    }
  };

  //?[NEW]
  _.command900 = function () {
    this.setWaitMode('network');
    return this._network.command900();
  };

  //?[NEW]
  _.command901 = function () {
    this.setWaitMode('network');
    return this._network.command901(this._index);
  };

  // * Change Party Member
  //@[ALIAS]
  var _alias__command129 = _.command129;
  _.command129 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Party Member (129) - not allowed in Network game!');
      return true;
    } else
      return _alias__command129.call(this, ...arguments);
  };

  // * Getting On and Off Vehicles
  //@[ALIAS]
  var _alias__command206 = _.command206;
  _.command206 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Getting On and Off Vehicles (206) - not allowed in Network game!');
      return true;
    } else
      return _alias__command206.call(this, ...arguments);
  };

  // * Change Player Followers
  //@[ALIAS]
  var _alias__command216 = _.command216;
  _.command216 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Player Followers (216) - not allowed in Network game!');
      return true;
    } else
      return _alias__command216.call(this, ...arguments);
  };

  // * Gather Followers
  //$[OVER]
  _.command217 = function () {
    AlphaNET.warning('Gather Followers (217) - not working with Alpha NET plugin');
    return true;
  };

  //@[ALIAS]
  var _alias__executeCommand = _.executeCommand;
  _.executeCommand = function () {
    if (Network.isConnected())
      this._networkSynchronization();
    return _alias__executeCommand.call(this, ...arguments);
  };

})();

// ■ END LibGame_Interpreter
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x56dd = [
    'BCkzH',
    'getMyActorId',
    'nextEventCode',
    'include',
    'HRhub',
    'NET\x20sync',
    '_getBasicEventDataForNet',
    '_getCurrentPageIndexForNet',
    '_index',
    'sendMessage',
    'SyncEvent',
    '_mapId',
    'Jvqlt',
    'eventId',
    'jynKh',
    '_executeConditionCommand',
    'pSrmM',
    'error',
    'get\x20page\x20index\x20for\x20event\x20sync\x20command',
    '_needEventUnlock',
    'LockEvent',
    'setData',
    'ugQBz',
    'isLock',
    'tBaRd',
    'hRRmP',
    'split',
    'map',
    'mnNZG',
    'parameters',
    'sAQYQ',
    'getMyPlayerIndex',
    'contains',
    'except',
    'rNeaU',
    '_network',
    'isShared',
    'warning',
    'This\x20command\x20allowed\x20only\x20in\x20NET\x20shared\x20events',
    '_isListLineIsSynced',
    '_list',
    'code',
    'bVzPi',
    'WtAAS',
    'mWohX',
    '_startCommandOnlyInSharedMode',
    'zWzRI',
    'isMultiMode',
    'call',
    'VlWKp',
    'event',
    '_networkSynchronization',
    'currentCommand',
    'NICNl',
    'isHost',
    '_sendVirtualCommand',
    '_isSyncCommandRequire',
    'CsUhf',
    'bPpeN',
    'CreateSubMessageData',
    'mapId',
    '_eventId',
    '_onNETVirtualCommand',
    'UbSUB',
    'uLNzM',
    'prototype',
    'isConnected',
    '_isSyncCommandValid',
    '_executeSyncCommand',
    'IwnvY'
];
(function (_0x7931b1, _0x5c43b5) {
    var _0x2c7d85 = function (_0xa4048e) {
        while (--_0xa4048e) {
            _0x7931b1['push'](_0x7931b1['shift']());
        }
    };
    _0x2c7d85(++_0x5c43b5);
}(_0x56dd, 0x113));
var _0x95cf = function (_0x3562b5, _0x22dabc) {
    _0x3562b5 = _0x3562b5 - 0x0;
    var _0x54d52d = _0x56dd[_0x3562b5];
    return _0x54d52d;
};
(function () {
    var _0x5bb392, _0x4fd5da, _0x19e226;
    _0x19e226 = Game_Interpreter[_0x95cf('0x0')];
    _0x4fd5da = [
        0x65,
        0x66,
        0x67,
        0x68,
        0x6c
    ];
    _0x5bb392 = [
        0x137,
        0x138,
        0x146,
        0x139,
        0x13a,
        0x13b,
        0x13c,
        0x13d,
        0x13e,
        0x13f,
        0x140,
        0x141,
        0x142,
        0x143,
        0x144,
        0x145,
        0xca,
        0xcb,
        0x119,
        0x11a,
        0x11b,
        0x11c,
        0x14b,
        0x14c,
        0x156,
        0x14d,
        0x14e,
        0x14f,
        0x150,
        0x151,
        0x153,
        0x154
    ];
    _0x19e226['_onNETSyncCommand'] = function () {
        if (!Network[_0x95cf('0x1')]()) {
            return;
        }
        if (this[_0x95cf('0x2')]()) {
            return this[_0x95cf('0x3')]();
        }
    };
    _0x19e226['_isSyncCommandValid'] = function () {
        if (_0x95cf('0x4') === _0x95cf('0x5')) {
            myId = !isActorId ? NetPartyManager['getMyPlayerIndex']() : NetPartyManager[_0x95cf('0x6')]();
            condition = id['contains'](myId);
        } else {
            var _0x5bb285;
            _0x5bb285 = this[_0x95cf('0x7')]();
            return !_0x4fd5da[_0x95cf('0x8')](_0x5bb285) && !_0x5bb392[_0x95cf('0x8')](_0x5bb285);
        }
    };
    _0x19e226[_0x95cf('0x3')] = function () {
        if (_0x95cf('0x9') === 'ufnod') {
            return cmd['parameters'][0x0] === _0x95cf('0xa');
        } else {
            var _0x575d3f;
            _0x575d3f = this[_0x95cf('0xb')]();
            _0x575d3f['pi'] = this[_0x95cf('0xc')]();
            _0x575d3f['li'] = this[_0x95cf('0xd')] + 0x1;
            return Network[_0x95cf('0xe')](NetMessage[_0x95cf('0xf')]()['setData'](_0x575d3f));
        }
    };
    _0x19e226[_0x95cf('0xb')] = function () {
        return {
            'mapId': this[_0x95cf('0x10')],
            'eventId': this['eventId']()
        };
    };
    _0x19e226[_0x95cf('0xc')] = function () {
        var _0x174e31, _0x155418, _0x1f4d90;
        try {
            if (_0x95cf('0x11') !== _0x95cf('0x11')) {
                return method['call'](this, ...args);
            } else {
                _0x155418 = this[_0x95cf('0x12')]();
                if (_0x155418) {
                    _0x1f4d90 = $gameMap['event'](_0x155418);
                    if (_0x1f4d90) {
                        if ('bNwxn' === _0x95cf('0x13')) {
                            this[_0x95cf('0x14')](parameters[0x0]);
                        } else {
                            return _0x1f4d90['_pageIndex'];
                        }
                    }
                }
                return 0x0;
            }
        } catch (_0x45d738) {
            if ('RicGp' !== _0x95cf('0x15')) {
                _0x174e31 = _0x45d738;
                AlphaNET[_0x95cf('0x16')](_0x174e31, _0x95cf('0x17'));
                return 0x0;
            } else {
                return;
            }
        }
    };
    _0x19e226['_onNETLockCommand'] = function (_0x6478af = !![]) {
        var _0x40e403;
        if (!Network[_0x95cf('0x1')]()) {
            return;
        }
        this[_0x95cf('0x18')] = _0x6478af;
        _0x40e403 = this['_getBasicEventDataForNet']();
        _0x40e403['isLock'] = _0x6478af;
        return Network[_0x95cf('0xe')](NetMessage[_0x95cf('0x19')]()[_0x95cf('0x1a')](_0x40e403));
    };
    _0x19e226['_onNETConditionCommand'] = function (_0x33e4f0) {
        var _0x21dc39, _0x7598a, _0x10bf3f;
        try {
            if (!Network[_0x95cf('0x1')]()) {
                return;
            }
            _0x7598a = _0x33e4f0[0x1];
            if (_0x7598a == null) {
                if (_0x95cf('0x1b') !== _0x95cf('0x1b')) {
                    var _0x457d54;
                    if (!Network[_0x95cf('0x1')]()) {
                        return;
                    }
                    this['_needEventUnlock'] = isLock;
                    _0x457d54 = this[_0x95cf('0xb')]();
                    _0x457d54[_0x95cf('0x1c')] = isLock;
                    return Network[_0x95cf('0xe')](NetMessage[_0x95cf('0x19')]()[_0x95cf('0x1a')](_0x457d54));
                } else {
                    this[_0x95cf('0x14')](_0x33e4f0[0x0]);
                }
            } else {
                if (_0x95cf('0x1d') === _0x95cf('0x1e')) {
                    return;
                } else {
                    _0x10bf3f = _0x33e4f0[0x1][_0x95cf('0x1f')]('|')[_0x95cf('0x20')](function (_0x408459) {
                        if ('mnNZG' !== _0x95cf('0x21')) {
                            cmd = this['_list'][index];
                            if (cmd['code'] === 0x164) {
                                return cmd[_0x95cf('0x22')][0x0] === _0x95cf('0xa');
                            }
                        } else {
                            return Number(_0x408459);
                        }
                    });
                    this[_0x95cf('0x14')](_0x33e4f0[0x0], _0x10bf3f, _0x33e4f0[0x2] === 'A');
                }
            }
        } catch (_0x35a846) {
            if (_0x95cf('0x23') !== _0x95cf('0x23')) {
                return {
                    'mapId': this[_0x95cf('0x10')],
                    'eventId': this[_0x95cf('0x12')]()
                };
            } else {
                _0x21dc39 = _0x35a846;
                AlphaNET[_0x95cf('0x16')](_0x21dc39, 'while\x20read\x20condition\x20excpet\x20or\x20only');
            }
        }
    };
    _0x19e226[_0x95cf('0x14')] = function (_0x575dda, _0x45a89b = null, _0x113886 = ![]) {
        var _0xfb603f, _0x5f247;
        _0xfb603f = Network['isHost']();
        if (_0x45a89b != null) {
            _0x5f247 = !_0x113886 ? NetPartyManager[_0x95cf('0x24')]() : NetPartyManager[_0x95cf('0x6')]();
            _0xfb603f = _0x45a89b[_0x95cf('0x25')](_0x5f247);
        }
        if (_0xfb603f && _0x575dda === _0x95cf('0x26')) {
            if ('CmXpQ' === _0x95cf('0x27')) {
                if (this[_0x95cf('0x28')][_0x95cf('0x29')]()) {
                    return method['call'](this, ...args);
                } else {
                    AlphaNET[_0x95cf('0x2a')](_0x95cf('0x2b'));
                }
            } else {
                this[_0x95cf('0xd')]++;
            }
        }
        if (!_0xfb603f && _0x575dda === 'only') {
            this[_0x95cf('0xd')]++;
        }
    };
    _0x19e226[_0x95cf('0x2c')] = function (_0x14ed21) {
        var _0x2e82a8, _0x1dc702;
        try {
            _0x2e82a8 = this[_0x95cf('0x2d')][_0x14ed21];
            if (_0x2e82a8[_0x95cf('0x2e')] === 0x164) {
                if (_0x95cf('0x2f') === _0x95cf('0x30')) {
                    this[_0x95cf('0xd')]++;
                } else {
                    return _0x2e82a8[_0x95cf('0x22')][0x0] === 'NET\x20sync';
                }
            }
        } catch (_0x22aad8) {
            if (_0x95cf('0x31') === _0x95cf('0x31')) {
                _0x1dc702 = _0x22aad8;
                AlphaNET[_0x95cf('0x16')](_0x1dc702, 'while\x20check\x20list[index]\x20to\x20sync\x20line');
            } else {
                return;
            }
        }
        return ![];
    };
    _0x19e226[_0x95cf('0x32')] = function (_0x3988f1, _0x2c5ec2) {
        if (!Network[_0x95cf('0x1')]()) {
            return _0x3988f1['call'](this, ..._0x2c5ec2);
        } else {
            if ('zWzRI' !== _0x95cf('0x33')) {
                return this['_executeVirtualCommand']();
            } else {
                if (Network[_0x95cf('0x34')]()) {
                    return _0x3988f1[_0x95cf('0x35')](this, ..._0x2c5ec2);
                } else {
                    if ('yssWO' === _0x95cf('0x36')) {
                        evId = this[_0x95cf('0x12')]();
                        if (evId) {
                            event = $gameMap[_0x95cf('0x37')](evId);
                            if (event) {
                                return event['_pageIndex'];
                            }
                        }
                        return 0x0;
                    } else {
                        if (this[_0x95cf('0x28')][_0x95cf('0x29')]()) {
                            return _0x3988f1['call'](this, ..._0x2c5ec2);
                        } else {
                            AlphaNET[_0x95cf('0x2a')](_0x95cf('0x2b'));
                        }
                    }
                }
            }
        }
        return !![];
    };
    _0x19e226[_0x95cf('0x38')] = function () {
        var _0x84c711;
        if (this[_0x95cf('0x28')][_0x95cf('0x29')]()) {
            return;
        }
        _0x84c711 = this[_0x95cf('0x39')]();
        if (_0x84c711 == null) {
            return;
        }
        if (!this['_isSyncCommandRequire'](_0x84c711[_0x95cf('0x2e')])) {
            if (_0x95cf('0x3a') === _0x95cf('0x3a')) {
                return;
            } else {
                var _0x1475ac, _0x5daa37;
                _0x1475ac = Network[_0x95cf('0x3b')]();
                if (id != null) {
                    _0x5daa37 = !isActorId ? NetPartyManager[_0x95cf('0x24')]() : NetPartyManager['getMyActorId']();
                    _0x1475ac = id[_0x95cf('0x25')](_0x5daa37);
                }
                if (_0x1475ac && command === 'except') {
                    this['_index']++;
                }
                if (!_0x1475ac && command === 'only') {
                    this[_0x95cf('0xd')]++;
                }
            }
        }
        return this[_0x95cf('0x3c')](_0x84c711);
    };
    _0x19e226[_0x95cf('0x3d')] = function (_0x22c3fe) {
        return _0x5bb392[_0x95cf('0x8')](_0x22c3fe);
    };
    _0x19e226[_0x95cf('0x3c')] = function (_0x39cd73) {
        if (_0x95cf('0x3e') === _0x95cf('0x3f')) {
            return method['call'](this, ...args);
        } else {
            var _0x45c83f, _0x597556;
            _0x597556 = NetMessage['VirtualInterpreter']();
            _0x45c83f = NetMessage[_0x95cf('0x40')](_0x39cd73['code']);
            _0x45c83f[_0x95cf('0x22')] = _0x39cd73[_0x95cf('0x22')];
            _0x45c83f[_0x95cf('0x41')] = this[_0x95cf('0x10')];
            _0x45c83f['eventId'] = this[_0x95cf('0x42')];
            _0x597556[_0x95cf('0x1a')](_0x45c83f);
            Network[_0x95cf('0xe')](_0x597556);
        }
    };
    _0x19e226[_0x95cf('0x43')] = function () {
        if (!Network[_0x95cf('0x1')]()) {
            return;
        }
        if (this[_0x95cf('0x28')][_0x95cf('0x29')]()) {
            return;
        }
        if (this[_0x95cf('0x2')]()) {
            if (_0x95cf('0x44') === _0x95cf('0x45')) {
                var _0x1e9265;
                _0x1e9265 = this['nextEventCode']();
                return !_0x4fd5da[_0x95cf('0x8')](_0x1e9265) && !_0x5bb392[_0x95cf('0x8')](_0x1e9265);
            } else {
                return this['_executeVirtualCommand']();
            }
        }
    };
    _0x19e226['_executeVirtualCommand'] = function () {
        var _0x345067;
        _0x345067 = this['_list'][this['_index'] + 0x1];
        return this[_0x95cf('0x3c')](_0x345067);
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Game_Map.prototype.updateEventsForNetwork = function () {
        this.events().forEach(function (event) {
            event.updateForNetwork();
        });
        //TODO: Можно просто вызывать updateEvents
        //TODO: Сейчас в этой функции не обновляются commonEvents
    };


    //@[ALIAS]
    var _alias_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function () {
        _alias_Game_Map_update.call(this, ...arguments);
        this._checkSharedEvent();
    };

    //?[NEW]
    Game_Map.prototype._checkSharedEvent = function () {
        if (this._sharedEventData != null) {
            this._sharedEventData.startFromNetwork();
            this._sharedEventData = null;
        }
    };

    //@[ALIAS]
    var _alias_Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function () {
        //console.groupCollapsed('Game_Map_setup');
        _alias_Game_Map_setup.call(this, ...arguments);
        this._sharedEventData = null;
        this._lockedEventsIds = [];
        this._ownedEventIds = [];
        this._isNeedRefreshSpritesForNetwork = false;
        ///console.groupEnd();
    };

    //?[NEW]
    Game_Map.prototype.startEventFromNetwork = function (data) {
        if (data.mapId == this.mapId()) {
            var event = this.event(data.eventId);
            if (event && !$gameMap.isAnyEventStarting()) {
                "DATA PAGE INDEX".p(data.pageIndex);
                event.sharedPageIndex = data.pageIndex;
                this._sharedEventData = event;
            }
        }
    };

    //?[NEW]
    Game_Map.prototype.setLockedEventByNetwork = function (eventId, isLocked = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isLocked) {
            "GAME MAP LOCK EVENT".p(eventId);
            this._lockedEventsIds.push(eventId);
        } else {
            "  GAME MAP UNLOCK EVENT".p(eventId);
            this._lockedEventsIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventLockedByNet = function (eventId) {
        if(this._lockedEventsIds != null)
            return this._lockedEventsIds.includes(eventId);
        return false;
    };

})();
// ■ END Game_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    // * Собирает информацию о позициях всех глобальных событий
    Game_Map.prototype.collectDataForNetwork = function () {
        try {
            var eventsForNet = this._getLocalOnlyEvents();
            var dataForNet = [];
            var data;
            eventsForNet.forEach(event => {
                data = event.collectDataForNetwork();
                data.eventId = event.eventId();
                dataForNet.push(data);
            });
            return dataForNet;
        } catch (error) {
            AlphaNET.error(error, ' while try collect event moving data for Network');
            return [];
        }
    };

    //?[NEW]
    // * Обновляет позицию для всех глобальных событий
    Game_Map.prototype.synchronizeFromNetwork = function (netMapData) {
        if (netMapData == null || netMapData.length == 0)
            return;
        var event;
        netMapData.forEach(data => {
            event = this.event(data.eventId);
            if (event != null) {
                if (!event.isOnlyLocalMoveMode()) {
                    event.synchronizeFromNetwork(data);
                }
            }
        });
    };

    //?[NEW]
    Game_Map.prototype.setOwnedEventByNetwork = function (eventId, isOwned = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isOwned) {
            "GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.push(eventId);
        } else {
            "  GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventOwnedByNet = function (eventId) {
        if (this._ownedEventIds != null)
            return this._ownedEventIds.includes(eventId);
        return false;
    };

    //?[NEW]
    Game_Map.prototype.isSpritesRefreshRequestedForNetwork = function () {
        return this._isNeedRefreshSpritesForNetwork;
    };

    //?[NEW]
    Game_Map.prototype.spritesRefreshForNetworkComplete = function () {
        this._isNeedRefreshSpritesForNetwork = false;
    };

    //?[NEW]
    Game_Map.prototype.requestNetworkRefresh = function () {
        this._isNeedRefreshSpritesForNetwork = true;
    };
})();
// ■ END Game_Map_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Map.prototype;
  _._getLocalOnlyEvents = function() {
    return this.events().filter(function(event) {
      return !event.isOnlyLocalMoveMode();
    });
  };
})();

// ■ END Game_Map_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Message_clear6565 = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        _alias_Game_Message_clear6565.call(this, ...arguments);
        this._isChoiseShared = false;
    };

    //?[NEW]
    Game_Message.prototype.setSharedChoiseMode = function (bool) {
        this._isChoiseShared = bool;
    };

    //?[NEW]
    Game_Message.prototype.isChoiseSharedMode = function () {
        return (this._isChoiseShared == true);
    };
})();
// ■ END Game_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    Game_Party.prototype.isMaximumForNetwork = function () {
        return Network.maximumNetworkPlayers == this.size();
    };

    //@[ALIAS]
    var _alias_Game_Party_leader = Game_Party.prototype.leader;
    Game_Party.prototype.leader = function () {
        if (Network.isConnected() && !Network.isHost()) {
            return this._networkLeader();
        } else {
            return _alias_Game_Party_leader.call(this);
        }
    };

    //?[NEW]
    Game_Party.prototype._networkLeader = function () {
        if (Network.myPlayerData != null && Network.myPlayerData.actorId != null)
            return this.memberByActorId(Network.myPlayerData.actorId);
        else
            return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Party_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function () {
        if (Network.isConnected() && Network.isMultiMode()) {
            return this._networkBattleMembers();
        } else
            return _alias_Game_Party_battleMembers.call(this, ...arguments);
    };

    //?[NEW]
    Game_Party.prototype._networkBattleMembers = function () {
        return [this._networkLeader()];
    };

    //?[NEW]
    Game_Party.prototype.memberByActorId = function (actorId) {
        return $gameActors.actor(actorId);
    };

    //?[NEW]
    Game_Party.prototype.memberIndexByActorId = function (actorId) {
        return this.members().findElementIndexByField("_actorId", actorId);
    };

    //?[NEW]
    Game_Party.prototype.refreshForNetwork = function () {
        if(Network.isConnected())
            this.members().forEach(item => item.refresh());
    };

    //?[NEW]
    Game_Party.prototype.getDataForNetwork = function () {
        var itemsData = {
            items: JSON.stringify($gameParty._items),
            weapons: JSON.stringify($gameParty._weapons),
            armors: JSON.stringify($gameParty._armors),
            gold: JSON.stringify($gameParty._gold)
        };
        return itemsData;
    };

    //?[NEW]
    Game_Party.prototype.setDataFromNetwork = function (data) {
        if(data.items != null) {
            $gameParty._items = JSON.parse(data.items);
        }
        if (data.weapons != null) {
            $gameParty._weapons = JSON.parse(data.weapons);
        }
        if (data.gold != null) {
            $gameParty._gold = JSON.parse(data.gold);
        }
        if (data.armors != null)
            this._setArmorsFromNetwork(data.armors);
    };

    // * Отдельный метод для совместимости с YEP плагином
    //?[NEW]
    Game_Party.prototype._setArmorsFromNetwork = function (armors) {
        if (armors != null) {
            $gameParty._armors = JSON.parse(armors);
        }
    };

})();
// ■ END Game_Party.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _Game_Player_prototype_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function (d) {
        _Game_Player_prototype_moveStraight.call(this, d);
        if (Network.isConnected()) {
            var moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.PlayerMoveData().setData(moveData));
        }
    };

    //@[ALIAS]
    var _alias_Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
    Game_Player.prototype.getOnOffVehicle = function () {
        if (Network.isConnected()) {
            return false;
        } else
            return _alias_Game_Player_getOnOffVehicle.call(this, ...arguments);
    };

    //?[BASE]
    Game_Player.prototype.getNetworkName = function () {
        if (AlphaNET.Parameters.get_ShowNameplatesMode() > 1)
            return $gameParty.leader().name();
    };

    //?[BASE]
    Game_Player.prototype.getNetworkNameStyleId = function () {
        return $gameParty.leader().networkStyleId();
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function () {

        _alias_Game_Player_checkEventTriggerThere.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode()) {
            this._checkPvPStartTrigger();
        }
    };

    //?[NEW]
    Game_Player.prototype._checkPvPStartTrigger = function () {
        if (this.canStartLocalEvents() && !$gameMap.isAnyEventStarting()) {
            var direction = this.direction();
            var x = $gameMap.roundXWithDirection(this.x, direction);
            var y = $gameMap.roundYWithDirection(this.y, direction);
            var netPlayer = this.followers().getNetworkPlayerOnPosition(x, y);
            if(netPlayer) {
                "FINDED PLAYER FOR PVP ".p(netPlayer.netIndex);
                var d2 = netPlayer.direction();
                var canStartPvp = false;
                switch (direction) {
					case 2:
                        canStartPvp = (d2 != 0);
                        break;
                    case 8:
                        canStartPvp = (d2 != 0);
                        break;
                    case 4:
                        canStartPvp = (d2 != 0);
                        break;
                    case 6:
                        canStartPvp = (d2 != 0);
                        break;
                    default:
                        break;
                    /*case 2:
                        canStartPvp = (d2 == 8);
                        break;
                    case 8:
                        canStartPvp = (d2 == 2);
                        break;
                    case 4:
                        canStartPvp = (d2 == 6);
                        break;
                    case 6:
                        canStartPvp = (d2 == 4);
                        break;
                    default:
                        break;*/
                }
                if(canStartPvp == true) {
                    if (netPlayer.networkIconId() <= 0) {
						Network.requestPvPBattle(netPlayer.netIndex);
                        return true;
                    }
                    else {
                        "CHAR IS BUSY!".p();
                    }
                }
                else
                    "WRONG DIRECTION".p();
            }
        }
        return false;
    };

})();
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function () {
        _alias_Game_Troop_setup.call(this, ...arguments);
        this._isPvPTroop = false;
        if (BattleManager.isNetworkBattle()) {
            if (this._uniqueNamesFromNetwork != null) {
                this.setUniqueIdsForEnemies(this._uniqueNamesFromNetwork);
            }
        }
    };

    //?[NEW]
    Game_Troop.prototype.getEnemyByNetId = function (netId) {
        return this.members().find(item => item.uniqueNetworkId() == netId);
    };

    //?[NEW]
    Game_Troop.prototype.setUniqueIdsForEnemies = function (data) {
        var enemies = this.members();
        if (enemies.length > 0) {
            data.forEach((item, index) => enemies[index]._uniqueNetworkId = item);
            this._uniqueNamesFromNetwork = null;
        } else {
            this._uniqueNamesFromNetwork = data;
        }
    };

    //?[NEW]
    Game_Troop.prototype.setupPvPBattle = function (enemyActorId) {
        this.clear();
        this._troopId = 0;
        this._enemies = [];
        var x = 408;
        var y = 436;
        var actorId = enemyActorId;
        var enemy = new AlphaNET.LIBS.Game_EnemyPvP(actorId, x, y);
        this._enemies.push(enemy);
        this._isPvPTroop = true;
    };

    //?[NEW]
    Game_Troop.prototype.isPvPTroop = function () {
        return this._isPvPTroop == true;
    };

    //?[NEW]
    Game_Troop.prototype.rival = function () {
        return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
    Game_Troop.prototype.setupBattleEvent = function () {
        if (this.isPvPTroop() == true) {

        } else 
            _alias_Game_Troop_setupBattleEvent.call(this, ...arguments);    
    };

    //@[ALIAS]
    var _alias_Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
    Game_Troop.prototype.increaseTurn = function () {
        if (this.isPvPTroop() == true) {
            this._turnCount++;
        } else
            _alias_Game_Troop_increaseTurn.call(this, ...arguments);
    };
})();
// ■ END Game_Troop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GameChatController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GameChatController;
  GameChatController = class GameChatController {
    constructor(chatUI) {
      this.chatUI = chatUI;
      this.settings = ANJsonSettings.getChatSettings()[0];
      this.colors = ANJsonSettings.getChatSettings()[3];
      this.chanels = ['ALL', 'MAP'];
      this.posX = this.settings.firstLineMarginX;
      this.posY = this.settings.firstLineMarginY;
      this.maxLines = this.settings.maxLines;
      this.lines = [];
      this.hiddenMessages = 0;
      this._loadLines();
    }

    // * Если пришли сообщения, когда была другая сцена
    _loadLines() {
      var e, i, j, line, ref;
      try {
        if ($gameTemp._chatLines.length > 0) {
          for (i = j = 0, ref = $gameTemp._chatLines.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            line = $gameTemp._chatLines[i];
            this.addLine(line[0], line[1]);
          }
          return $gameTemp._chatLines = [];
        }
      } catch (error) {
        e = error;
        return ANET.warning('error', e);
      }
    }

    setUI(chatUI) {
      this.chatUI = chatUI;
    }

    addLine(actorId, chatMessage) {
      var e;
      if (this.chatUI == null) {
        return;
      }
      if (actorId == null) {
        return;
      }
      if (chatMessage == null) {
        return;
      }
      try {
        return this._addNewLineChat(actorId, chatMessage.channelId, chatMessage.text);
      } catch (error) {
        e = error;
        return AlphaNET.error(e, 'when parse chat message from server');
      }
    }

    _addNewLineChat(actorId, channelId, text) {
      var chatLine, first, up;
      chatLine = this._createSprite(actorId, channelId, text);
      this.chatUI.addChatLine(chatLine);
      up = this.settings.spaceBetweenLines;
      this.lines.forEach(function(item) {
        return item.moveUp(up);
      });
      this.lines.push(chatLine);
      if (this.lines.length & 1) {
        chatLine.changeBackOpacity();
      }
      this._refreshNotify();
      if (this.lines.length >= this.maxLines) {
        first = this.lines.shift();
        return this.chatUI.removeLine(first);
      }
    }

    _createSprite(actorId, channelId, text) {
      var channel, channelColor, chatLine, e, name, nameColor;
      name = "Unknown";
      channel = "ALL";
      try {
        this._myMessage = false;
        name = $gameActors.actor(actorId).name();
        nameColor = this.colors.NameColor;
        if (actorId === $gameParty.leader().actorId()) {
          nameColor = this.colors.UserNameColor;
          this._myMessage = true;
        }
        channel = this.chanels[channelId];
        channelColor = this.colors.ChannelColors[channelId];
      } catch (error) {
        e = error;
        AlphaNET.error(e, 'when parse chat message from server');
      }
      chatLine = new AlphaNET.LIBS.SpriteChatLine();
      chatLine.drawChannel(channel, channelColor);
      chatLine.drawName(name, nameColor);
      chatLine.drawText(text);
      chatLine.move(this.settings.lineStartPositionX, this.posY);
      chatLine.moveTo(this.posX);
      return chatLine;
    }

    _refreshNotify() {
      if (!this.chatUI.isOpen()) {
        if (this._myMessage === false) {
          this.hiddenMessages++;
        }
        return this.chatUI.drawNotify(this.hiddenMessages);
      } else {
        return this.hiddenMessages = 0;
      }
    }

    isUnderTouch() {
      return this.chatUI.isUnderTouch() && this.chatUI.visible === true;
    }

    hide() {
      return this.chatUI.visible = false;
    }

    show() {
      return this.chatUI.visible = true;
    }

    isActive() {
      return (this.chatUI != null) && this.chatUI.visible === true;
    }

    update() {
      this._loadLines();
      return this.updateButtonsInput();
    }

    updateButtonsInput() {
      if (this.isActive() === false) {
        return;
      }
      if (Input.isTriggered(ANET.KEYS.CHAT())) {
        if (this.chatUI.isOpen()) {
          this.chatUI.close();
        } else {
          this.chatUI.open();
        }
      }
      if (Input.isTriggered(ANET.KEYS.SAY())) {
        return SceneManager.push(ANET.LIBS.Scene_ChatInput);
      }
    }

  };
  AlphaNET.register(GameChatController);
})();

// ■ END GameChatController.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ HotSeatKeyMapper.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    // * inputType: 1 - Mouse, 2 - Keyboard, null - All
    HotSeatKeyMapper.init = function (inputType, mirror) {
        if (!Utils.isNwjs())
            return;

        this._inputType = inputType;
        this._mirror = mirror; // * Другой маппер
        this._initMapper();
    };

    if (!Utils.isNwjs())
        return;

    Input._setupEventHandlers = function () {
        window.addEventListener('blur', this._onLostFocus.bind(this));
    };

    TouchInput._setupEventHandlers = function () {
        var isSupportPassive = Utils.isSupportPassiveEvent();
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('wheel', this._onWheel.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        document.addEventListener('pointerdown', this._onPointerDown.bind(this));
    };

    HotSeatKeyMapper._initMapper = function () {
        document.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    };

    HotSeatKeyMapper._onMouseDown = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.map = function (data) {
        if (data.type == 1) {
            this.touchMap(data);
        } else {
            this.keyMap(data);
        }
    };

    HotSeatKeyMapper.touchMap = function (data) {
        if (this.isMouse()) {
            executeFunctionByName(data.name, TouchInput, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper.sendToMirror = function (data) {
        if (this._mirror) {
            this._mirror.map(data);
        }
    };

    HotSeatKeyMapper.keyMap = function (data) {
        if (this.isKeyboard()) {
            executeFunctionByName(data.name, Input, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper._onMouseMove = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseMove',
            event: eventX
        }
        this.map(data);
    };

    HotSeatKeyMapper._onMouseUp = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseUp',
            event: eventX
        };
        this.map(data);
    };

    //В event.type записано название типа события
    HotSeatKeyMapper._onKeyDown = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper._onKeyUp = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyUp',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.isKeyboard = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 2;
    };

    HotSeatKeyMapper.isMouse = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 1;
    };

    HotSeatKeyMapper.myType = function () {
        return this._inputType;
    };

    HotSeatKeyMapper.isMyType = function (data) {
        if (this.myType() == null)
            return true;
        return this.myType() == data.type;
    };
})();
// ■ END HotSeatKeyMapper.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Image_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

    //?[NEW]
    ImageManager.loadNetwork = function (filename, hue) {
        return this.loadBitmap('img/network/', filename, hue, false);
    };
    
})();
// ■ END Image_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x926d = [
    'body',
    'appendChild',
    'width',
    '_width',
    'height',
    'style',
    'textAlign',
    'left',
    '1px\x201px\x203px\x20#000',
    'fontSize',
    '20px',
    'zIndex',
    '400px',
    'absolute',
    '<font\x20color=\x22white\x22>',
    '</font><br>',
    'innerHTML',
    'FNsJQ',
    '_createErrorPrinter',
    'call',
    'create',
    'xDrqN',
    'ZUOaZ',
    '_infoPrinter',
    'createElement',
    'InfoPrinter',
    'setup'
];
(function (_0x2e347a, _0x180e6a) {
    var _0x25d162 = function (_0x3a6a77) {
        while (--_0x3a6a77) {
            _0x2e347a['push'](_0x2e347a['shift']());
        }
    };
    _0x25d162(++_0x180e6a);
}(_0x926d, 0x13b));
var _0x27a1 = function (_0x9d6fce, _0x2fc340) {
    _0x9d6fce = _0x9d6fce - 0x0;
    var _0x52facf = _0x926d[_0x9d6fce];
    return _0x52facf;
};
(function () {
    var _0xbc366f;
    _0xbc366f = Graphics[_0x27a1('0x0')];
    Graphics['_createErrorPrinter'] = function () {
        _0xbc366f[_0x27a1('0x1')](this);
        return InfoPrinter[_0x27a1('0x2')]();
    };
    InfoPrinter[_0x27a1('0x2')] = function () {
        if (_0x27a1('0x3') === _0x27a1('0x4')) {
            return;
        } else {
            InfoPrinter[_0x27a1('0x5')] = document[_0x27a1('0x6')]('p');
            InfoPrinter[_0x27a1('0x5')]['id'] = _0x27a1('0x7');
            InfoPrinter[_0x27a1('0x8')]();
            return document[_0x27a1('0x9')][_0x27a1('0xa')](InfoPrinter['_infoPrinter']);
        }
    };
    InfoPrinter['setup'] = function () {
        var _0xd2cdf4;
        _0xd2cdf4 = InfoPrinter[_0x27a1('0x5')];
        _0xd2cdf4[_0x27a1('0xb')] = Graphics[_0x27a1('0xc')] * 0.8;
        _0xd2cdf4[_0x27a1('0xd')] = 0x64;
        _0xd2cdf4[_0x27a1('0xe')][_0x27a1('0xf')] = _0x27a1('0x10');
        _0xd2cdf4[_0x27a1('0xe')]['textShadow'] = _0x27a1('0x11');
        _0xd2cdf4[_0x27a1('0xe')][_0x27a1('0x12')] = _0x27a1('0x13');
        _0xd2cdf4[_0x27a1('0xe')][_0x27a1('0x14')] = 0x46;
        _0xd2cdf4['style'][_0x27a1('0xb')] = '400px';
        _0xd2cdf4[_0x27a1('0xe')][_0x27a1('0xd')] = _0x27a1('0x15');
        return _0xd2cdf4[_0x27a1('0xe')]['position'] = _0x27a1('0x16');
    };
    InfoPrinter['p'] = function (_0x17237b) {
        var _0x13f801;
        if (InfoPrinter[_0x27a1('0x5')] == null) {
            return;
        }
        _0x13f801 = _0x27a1('0x17') + _0x17237b + _0x27a1('0x18');
        InfoPrinter['_infoPrinter'][_0x27a1('0x19')] = _0x13f801;
    };
    InfoPrinter['clear'] = function () {
        if (InfoPrinter[_0x27a1('0x5')] == null) {
            if (_0x27a1('0x1a') !== 'QyCBY') {
                return;
            } else {
                InfoPrinter[_0x27a1('0x5')] = document['createElement']('p');
                InfoPrinter['_infoPrinter']['id'] = _0x27a1('0x7');
                InfoPrinter['setup']();
                return document[_0x27a1('0x9')]['appendChild'](InfoPrinter[_0x27a1('0x5')]);
            }
        }
        InfoPrinter[_0x27a1('0x5')]['innerHTML'] = '';
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    ///INPUT
    var i, j;
    Input.KeyMapperNET = {};
    //Numbers
    for (i = j = 48; j <= 57; i = ++j) {
        Input.KeyMapperNET[i] = String.fromCharCode(i);
    }
    //Numbers NUM LOCK
    for (i = j = 96; j <= 105; i = ++j) {
        Input.KeyMapperNET[i] = 'Numpad' + String(i - 96);
    }

    Input.KeyMapperNET[8] = 'Backspace';
    Input.KeyMapperNET[190] = '.';
    Input.KeyMapperNET[110] =  'NumpadDecimal';

    var alias_atbs_input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {
        alias_atbs_input_onKeyDown.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode);
            return;
        }
        if (Input.keyMapper[event.keyCode]) {
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode);
    };

    Input._setStateWithMapperMYP = function (keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperNET[keyCode];
        if (symbol != null) {
            this._currentState[symbol] = state;
        }
    };

    var alias_atbs_input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function (event) {
        alias_atbs_input_onKeyUp.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode, false);
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode, false);
    };
})();
// ■ END Input.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x3a00 = [
    'isNetworkSharedMode',
    'isShared',
    'WNJhR',
    '_prepareSharedEvent',
    '_list',
    '_insertNetShareCommand',
    '_insertNetCommand',
    'CMD_SHARE',
    'index',
    'code',
    '_prepareEventListForNet',
    'length',
    'vXzje',
    'pageIndex',
    'findProperPageIndex',
    'sendMessage',
    'StartSharedEvent',
    'setData',
    'contains',
    'NET\x20sync',
    'PGBUu',
    'wFHDD',
    'replace',
    'splice',
    'CMD_SYNC',
    'startNetwork',
    'isStartedFromNetwork',
    'clearStartFromNetwork',
    'eventId',
    'getLastResponseData',
    '_checkWaitCount',
    'error',
    'Server\x20wait\x20error,\x20code\x20-\x20100',
    '_interpreter',
    '_index',
    '_waitNetCount',
    'command901',
    'command900',
    'CMD\x20900\x20run',
    '_collectEventBasicDataForNetwork',
    'isStartedOutside',
    'RegisterOnSharedEvent',
    'setRepeat',
    'line',
    'WAIT_PLAYER',
    'RegisterOnSharedEventSync',
    '_startedOutside',
    'isNeedLineSync',
    '_lineSyncIndex',
    'resetWait',
    'setup',
    '_event',
    'event',
    '_shared'
];
(function (_0x2fd21a, _0x47011f) {
    var _0x3fb722 = function (_0x3d0773) {
        while (--_0x3d0773) {
            _0x2fd21a['push'](_0x2fd21a['shift']());
        }
    };
    _0x3fb722(++_0x47011f);
}(_0x3a00, 0x106));
var _0xafdf = function (_0x15056a, _0x5d83ce) {
    _0x15056a = _0x15056a - 0x0;
    var _0x4f8791 = _0x3a00[_0x15056a];
    return _0x4f8791;
};
var InterpreterNET;
InterpreterNET = class InterpreterNET {
    constructor() {
        this['_startedOutside'] = ![];
        this['_shared'] = ![];
        this['_lineSyncIndex'] = -0x1;
        this['_waitNetCount'] = 0x0;
    }
    ['isStartedOutside']() {
        return this[_0xafdf('0x0')] === !![];
    }
    ['isShared']() {
        return this['_shared'] === !![];
    }
    [_0xafdf('0x1')]() {
        return this[_0xafdf('0x2')] >= 0x0;
    }
    [_0xafdf('0x3')]() {
        return this['_waitNetCount'] = 0x0;
    }
    [_0xafdf('0x4')](_0x52b9de, _0x40bb33) {
        this[_0xafdf('0x5')] = $gameMap[_0xafdf('0x6')](_0x52b9de);
        if (this[_0xafdf('0x5')] == null) {
            return;
        }
        this[_0xafdf('0x7')] = this[_0xafdf('0x5')][_0xafdf('0x8')]();
        if (this[_0xafdf('0x9')]()) {
            if (_0xafdf('0xa') === 'WNJhR') {
                return this[_0xafdf('0xb')](_0x40bb33);
            } else {
                return;
            }
        }
    }
    [_0xafdf('0xb')](_0x340313) {
        this[_0xafdf('0xc')] = _0x340313;
        this[_0xafdf('0xd')]();
        return this['_prepareEventListForNet']();
    }
    [_0xafdf('0xd')]() {
        return this[_0xafdf('0xe')]({
            'index': 0x0,
            'replace': ![],
            'code': InterpreterNET[_0xafdf('0xf')]
        });
    }
    ['_insertNetCommand'](_0x54686a) {
        var _0x10ea17, _0x4b6f9b;
        _0x10ea17 = _0x54686a[_0xafdf('0x10')] || 0x0;
        _0x4b6f9b = _0x54686a['replace'];
        if (this['_isNetCommandExists'](_0x10ea17, _0x54686a['code'])) {
            return;
        }
        return this[_0xafdf('0xc')]['splice'](_0x10ea17, _0x4b6f9b, {
            'code': _0x54686a['code'],
            'indent': 0x0,
            'parameters': []
        });
    }
    ['_isNetCommandExists'](_0x40e58f, _0x2f2505) {
        return this[_0xafdf('0xc')][_0x40e58f][_0xafdf('0x11')] === _0x2f2505;
    }
    [_0xafdf('0x12')]() {
        var _0x41069a, _0x1efa6c;
        _0x41069a = this[_0xafdf('0xc')][_0xafdf('0x13')] - 0x1;
        _0x1efa6c = [];
        while (_0x41069a >= 0x0) {
            if (_0xafdf('0x14') !== _0xafdf('0x14')) {
                data[_0xafdf('0x15')] = this[_0xafdf('0x5')][_0xafdf('0x16')]();
                Network[_0xafdf('0x17')](NetMessage[_0xafdf('0x18')]()['setRepeat'](waitMode)[_0xafdf('0x19')](data));
            } else {
                this['_prepareList_replaceSyncCommand'](_0x41069a);
                _0x1efa6c['push'](_0x41069a--);
            }
        }
        return _0x1efa6c;
    }
    ['_prepareList_replaceSyncCommand'](_0x101df2) {
        var _0x4334f;
        _0x4334f = this[_0xafdf('0xc')][_0x101df2];
        if (_0x4334f[_0xafdf('0x11')] !== 0x164) {
            return;
        }
        if (!_0x4334f['parameters'][0x0][_0xafdf('0x1a')](_0xafdf('0x1b'))) {
            if (_0xafdf('0x1c') !== _0xafdf('0x1d')) {
                return;
            } else {
                var _0x154505, _0x2b1ffe;
                _0x154505 = command['index'] || 0x0;
                _0x2b1ffe = command[_0xafdf('0x1e')];
                if (this['_isNetCommandExists'](_0x154505, command[_0xafdf('0x11')])) {
                    return;
                }
                return this[_0xafdf('0xc')][_0xafdf('0x1f')](_0x154505, _0x2b1ffe, {
                    'code': command[_0xafdf('0x11')],
                    'indent': 0x0,
                    'parameters': []
                });
            }
        }
        this['_insertNetSyncCommand'](_0x101df2);
    }
    ['_insertNetSyncCommand'](_0x17e0aa) {
        return this['_insertNetCommand']({
            'index': _0x17e0aa,
            'replace': !![],
            'code': InterpreterNET[_0xafdf('0x20')]
        });
    }
    [_0xafdf('0x21')]() {
        if (!this[_0xafdf('0x9')]()) {
            return;
        }
        this['_startedOutside'] = this[_0xafdf('0x5')][_0xafdf('0x22')]();
        return this['_event'][_0xafdf('0x23')]();
    }
    ['updateWaitMode']() {
        var _0x3296ae, _0x5104c1;
        _0x5104c1 = this[_0xafdf('0x5')][_0xafdf('0x24')]();
        _0x3296ae = Network[_0xafdf('0x25')]();
        if (this[_0xafdf('0x9')]()) {
            this[_0xafdf('0x26')](_0x3296ae);
        }
        if (_0x3296ae === -0x64) {
            Network[_0xafdf('0x27')]('', _0xafdf('0x28'));
            $gameMap[_0xafdf('0x29')][_0xafdf('0x2a')] = 0x64;
            return ![];
        }
        return !(Network[_0xafdf('0x25')]() === _0x5104c1);
    }
    [_0xafdf('0x26')](_0x4ab79a) {
        if (_0x4ab79a == null) {
            this[_0xafdf('0x2b')] += 0x1;
        }
        if (this[_0xafdf('0x2b')] >= 0x3c) {
            this[_0xafdf('0x3')]();
            return this[_0xafdf('0x2c')]();
        }
    }
    [_0xafdf('0x2d')]() {
        var _0x3fa261, _0xfce062;
        _0xafdf('0x2e')['p']();
        _0x3fa261 = this[_0xafdf('0x5')][_0xafdf('0x2f')]();
        _0xfce062 = Network['WAIT_PLAYER'];
        if (!this[_0xafdf('0x30')]()) {
            _0x3fa261[_0xafdf('0x15')] = this[_0xafdf('0x5')][_0xafdf('0x16')]();
            Network['sendMessage'](NetMessage['StartSharedEvent']()['setRepeat'](_0xfce062)['setData'](_0x3fa261));
        } else {
            Network[_0xafdf('0x17')](NetMessage[_0xafdf('0x31')]()[_0xafdf('0x32')](_0xfce062)[_0xafdf('0x19')](_0x3fa261));
        }
        return !![];
    }
    [_0xafdf('0x2c')](_0x4776e2) {
        var _0xf06b86, _0x4877a1;
        'CMD\x20901\x20run'['p']();
        _0xf06b86 = this[_0xafdf('0x5')]['_collectEventBasicDataForNetwork']();
        _0xf06b86[_0xafdf('0x33')] = _0x4776e2;
        _0x4877a1 = Network[_0xafdf('0x34')];
        Network['sendMessage'](NetMessage[_0xafdf('0x35')]()['setRepeat'](_0x4877a1)[_0xafdf('0x19')](_0xf06b86));
        return !![];
    }
};
InterpreterNET[_0xafdf('0xf')] = 0x384;
InterpreterNET['CMD_SYNC'] = 0x385;
AlphaNET['register'](InterpreterNET);
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MakerManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    Object.defineProperty(MakerManager, 'childWindow', {
        get: function () {
            return this._childWindow;
        },
        configurable: true
    });

    MakerManager.initManager = function () {
        this._childWindow = null;
        HotSeatKeyMapper.init(null, null);
    };

    MakerManager.setupGameWindow = function () {
        var win = nw.Window.get();
        win.removeAllListeners('close');
        win.on('close', this.onWindowClose.bind(win));

        win.removeAllListeners('restore');
        win.removeAllListeners('focus');
        win.removeAllListeners('minimize');

        win.on('focus', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('restore', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('minimize', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.minimize();
            }
        });

        win.removeAllListeners('move');
        win.on('move', function (x, y) {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.x = x + Graphics.width + 8;
                MakerManager.childWindow.y = y;
            }
        });

    };

    MakerManager.openMaker = function () {
        if (!Utils.isNwjs())
            return;
        if (MakerManager._childWindow == null) {
            HotSeatKeyMapper.init(1, null);
            this.setupGameWindow();
            this.createWindow();
            Network.setHotGame(true);
        }
        else {
            MakerManager.closeMaker();
            MakerManager.deleteMaker();
            MakerManager.openMaker();
        }
    };

    MakerManager.createWindow = function () {
        var win = nw.Window.get();
        var filename = 'www/index.html';
        if (Utils.isOptionValid('test')) {
            filename = 'index.html';
        }
        nw.Window.open(filename, {
            width: win.width - 2,
            height: win.height,
            resizable: false,
            show_in_taskbar: false,
            new_instance: false
        }, function (new_win) {
            MakerManager._childWindow = new_win;
            new_win.on('loaded', this._onWindowCreated.bind(this));
        }.bind(this));
    };

    MakerManager._onWindowCreated = function () {
        this._moveWindow();
        this._setupWindow();
    };

    MakerManager._moveWindow = function () {
        window.moveBy(-400, 0);
        this._childWindow.moveTo(window.screenX + Graphics.boxWidth + 8, window.screenY);
    };

    MakerManager._setupWindow = function () {
        this._childWindow.on('closed', this.deleteMaker.bind(this));
        this._childWindow.on('close', this.closeMaker.bind(this));

        var mapper = this._childWindow.window.HotSeatKeyMapper;
        this._childWindow.window.Network.setHotGame(true);
        // * Пока что чат не будет работать в режиме SplitScreen
        NetUIManager.hideChat();
        HotSeatKeyMapper._mirror = mapper;
        mapper.init(2, HotSeatKeyMapper);
    };

    MakerManager.onWindowClose = function () {
        MakerManager.closeTheWindows.call(this);
    };

    MakerManager.closeMaker = function () {
        HotSeatKeyMapper.init(null, null);
        Network.setHotGame(false);
        this._childWindow.close(true);
    };

    MakerManager.deleteMaker = function () {
        this._childWindow = null;
    };

    MakerManager.closeTheWindows = function () {
        if (MakerManager.childWindow)
            MakerManager.childWindow.close(true);
        this.close(true);
    };

})();
// ■ END MakerManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessage.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL]
var NetMessage;

NetMessage = (function() {
  class NetMessage {
    constructor(socket1) {
      this.socket = socket1;
      this.name = "trace";
      this.from = "";
      this.to = "";
      this.data = "";
      this.waited = false;
    }

    setName(name) {
      this.name = name;
      return this;
    }

    setTo(socketId) {
      this.to = socketId;
      return this;
    }

    setFrom(socketId) {
      this.from = socketId;
      return this;
    }

    setData(data) {
      this.data = data;
      return this;
    }

    setWait(symbol) {
      this.waited = true;
      Network.waitServerResponse(this, symbol);
      return this;
    }

    setRepeat(symbol) {
      this.waited = true;
      Network.waitServerResponseRepeated(this, symbol);
      return this;
    }

    send(data) {
      this.socket.emit(this.name, this._makeData(data));
      return this;
    }

    broadcast(data) {
      return this.socket.broadcast.emit(this.name, this._makeData(data));
    }

    _makeData(data = null) {
      var netData;
      netData = {};
      if (data == null) {
        data = this.data;
      } else {
        this.data = data;
      }
      netData.data = data;
      netData.from = this.from;
      netData.to = this.to;
      netData.waited = this.waited;
      return netData;
    }

    static Setup(socket) {
      return NetMessage.Socket = socket;
    }

    static PlayerDisconnect(socket) {
      return this.EmptyMessage(socket).setName('playerDisconnect');
    }

    static PlayerConnect(socket) {
      return this.EmptyMessage(socket).setName('playerConnect');
    }

    static HostResponse(socket) {
      return this.EmptyMessage(socket).setName('host').setFrom('server');
    }

    static AlertMessage(socket) {
      return this.EmptyMessage(socket).setFrom('server').setName('alertMessage');
    }

    static EmptyMessage(socket = null) {
      var msg, targetSocket;
      targetSocket = socket;
      if (socket == null) {
        targetSocket = this.Socket;
      }
      msg = new NetMessage(targetSocket);
      if (targetSocket != null) {
        msg.setFrom(targetSocket.id);
      }
      return msg;
    }

    static CreateSubMessageData(id) {
      var data;
      return data = {
        id: id
      };
    }

  };

  NetMessage.Socket = null;

  return NetMessage;

}).call(this);

AlphaNET.register(NetMessage);

// ■ END NetMessage.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(socket, name) {
    return _M.EmptyMessage(socket).setName(name);
  };
  //?INITIAL
  _M.RequestPlayerData = function(_) {
    return _CM(_, 'requestInitialPlayerData');
  };
  _M.PlayerDataResponse = function(_) {
    return _CM(_, 'responsePlayerData');
  };
  _M.PlayersTableResponse = function(_) {
    return _CM(_, 'playersTableResponse');
  };
  _M.HostGameMapId = function(_) {
    return _CM(_, 'hostGameMapId');
  };
  _M.GameMapEventsDataResponse = function(_) {
    return _CM(_, 'gameMapEventsDataResponse');
  };
  _M.RequestGameMapEventsData = function(_) {
    return _CM(_, 'requestGameMapEventsData');
  };
  //?PLAYERS
  _M.PlayerMoveData = function(_) {
    return _CM(_, 'playerMove');
  };
  _M.PlayerNetIcon = function(_) {
    return _CM(_, 'playerIcon');
  };
  _M.PlayerNetActorData = function(_) {
    return _CM(_, 'playerNetActorData');
  };
  _M.PlayerNetItemsData = function(_) {
    return _CM(_, 'playerNetItemsData');
  };
  _M.PlayerWorldData = function(_) {
    return _CM(_, 'playerWorldData');
  };
  _M.GlobalWorldData = function(_) {
    return _CM(_, 'globalWorldData');
  };
  _M.PlayerNetMapData = function(_) {
    return _CM(_, 'playerNetCurrentMapData');
  };
  _M.PlayerChangeMap = function(_) {
    return _CM(_, 'playerChangeMap');
  };
  _M.SetOwner = function(_) {
    return _CM(_, 'setMapOwner');
  };
  _M.RequestPvP = function(_) {
    return _CM(_, 'requestPvPWithAnotherPlayer');
  };
  _M.StartPvPBattle = function(_) {
    return _CM(_, 'startPvPWithAnotherPlayer');
  };
  //?EVENTS
  _M.MapEventMoveData = function(_) {
    return _CM(_, 'mapEventMove');
  };
  _M.SyncEvent = function(_) {
    return _CM(_, 'mapEventSync');
  };
  _M.LockEvent = function(_) {
    return _CM(_, 'mapEventLock');
  };
  _M.OwnEvent = function(_) {
    return _CM(_, 'mapEventOwn');
  };
  _M.StartSharedEvent = function(_) {
    return _CM(_, 'startSharedEvent');
  };
  _M.RegisterOnSharedEvent = function(_) {
    return _CM(_, 'registerOnSharedEvent');
  };
  _M.RegisterOnSharedEventSync = function(_) {
    return _CM(_, 'registerOnSharedEventSync');
  };
  _M.VirtualInterpreter = function(_) {
    return _CM(_, 'virtualInterpreter');
  };
  //?COMMUNICATION
  _M.SendChatMessage = function(_) {
    return _CM(_, 'chatMessage');
  };
  //?WINDOWS
  _M.WindowSelect = function(_) {
    return _CM(_, 'window_select_data');
  };
  //?BATTLE
  _M.BattleInputCommand = function(_) {
    return _CM(_, 'battle_inputCommand');
  };
  _M.BattleBattlerRefreshData = function(_) {
    return _CM(_, 'battle_refreshData');
  };
  _M.BattleAction = function(_) {
    return _CM(_, 'battle_action');
  };
  _M.BattleManager = function(_) {
    return _CM(_, 'battle_manager');
  };
  _M.BattleManagerPvP = function(_) {
    return _CM(_, 'battle_manager_pvp');
  };
  //?GLOBAL
  _M.OnWaitResponse = function(_) {
    return _CM(_, 'onWaitResponse');
  };
  _M.RequestSync = function(_) {
    return _CM(_, 'requestSync');
  };
  //?API
  _M.CallUApi = function(_) {
    return _CM(_, 'callUApi');
  };
  //?{TEST}
  _M.TempMessage = function(_) {
    return _CM(_, 'tempMessage');
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetParameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetParameters;
  // * Если параметры не были загружены, будет возвращять стандартные значения автоматически
  NetParameters = class NetParameters extends KDCore.ParametersManager {
    constructor() {
      super('Alpha NET');
    }

    get_actorsForPlayers() {
      var name;
      if (this.isLoaded()) {
        name = 'ActorsForPlayers';
        return this.getFromCacheOrInit(name, function() {
          var obj;
          try {
            obj = this.getString(name);
            return obj.split(',').map(function(i) {
              return Number(i);
            });
          } catch (error) {
            AlphaNET.warning('wrong plugin parameter Actors for players');
            return [1, 2];
          }
        });
      } else {
        return [1, 2, 3, 4];
      }
    }

    isMultiGameMode() {
      var name;
      if (!this.isLoaded()) {
        return false;
      }
      name = 'GameMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Multiplayer') {
            return true;
          }
          return false;
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Game Mode');
          return false;
        }
      });
    }

    load_CommonEventsForNetwork() {
      if (!this.isLoaded()) {
        return;
      }
      try {
        Network.commonEventOnServerStarted = this.getNumber("ServerStarted");
        Network.commonEventOnConnectToServer = this.getNumber("OnConnect");
        Network.commonEventOnDisconectFromServer = this.getNumber("OnDisconect");
        Network.commonEventOnOtherClientConnected = this.getNumber("OnOtherCon");
        Network.commonEventOnOtherClientDisconected = this.getNumber("OnOtherDisc");
        Network.commonEventOnPvPBattleEnd = this.getNumber("OnPvPEnd");
      } catch (error) {
        return AlphaNET.warning('wrong plugin parameters for network common events');
      }
    }

    get_ShowNameplatesMode() {
      var name;
      if (!this.isLoaded()) {
        return 1;
      }
      name = 'NameplatesMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Others') {
            return 1;
          }
          if (obj === 'All') {
            return 2;
          }
          return 0; // * Never
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Nameplate display mode');
          return 0;
        }
      });
    }

    isChatUsing() {
      var name;
      if (!this.isLoaded()) {
        return true;
      }
      name = 'UseInGameChat';
      return this.getFromCacheOrInit(name, function() {
        try {
          return this.getBoolean(name);
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Use in-game chat');
          return true;
        }
      });
    }

  };
  AlphaNET.register(NetParameters);
  AlphaNET.Parameters = new NetParameters();
  ANET.P = AlphaNET.Parameters;
})();

// ■ END NetParameters.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x4799 = [
    'rWUUD',
    'gtaaB',
    'synchronizeMapData',
    'mapId',
    'PlayerNetMapData',
    'onActorDataFromNetwork',
    'vnQCr',
    'parse',
    '_data',
    'refresh',
    'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network',
    'isCurrentSceneIsMap',
    'requestRefresh',
    'isCurrentSceneIsMenuBased',
    'onActroItemsFromNetwork',
    'cLQzY',
    'DHjkp',
    'clearParty',
    'myPlayerData',
    'jjoTm',
    'IwyVx',
    'REGISTER\x20PLAYER',
    'LIBS',
    'NetworkPlayerData',
    'networkActorsId',
    'first',
    'delete',
    'players',
    'push',
    'CLEAR\x20PARTY',
    'members',
    'length',
    'WbGNn',
    'WLwhh',
    'actorId',
    'addActor',
    'getMyActorId',
    'refreshParty',
    'zofqO',
    'WlWpF',
    'sendMessage',
    'PlayerNetItemsData',
    'setData',
    'refreshCharacters',
    'requestNetworkRefresh',
    'getPlayer',
    'hrXbx',
    'removeActor',
    'playerData',
    'getPlayerByActorId',
    'findElementByField',
    'getHost',
    'iTkeO',
    'lzsKU',
    'safeRefreshCurrentScene',
    'wAVjy',
    'HxESb',
    'followers',
    'getNetworkCharById',
    'memberByActorId',
    'stringify',
    'getMyPlayerIndex',
    'sExdS',
    'getMe',
    'getMyPlayerSprite',
    'myId',
    'getPlayerSpriteById',
    'ADNCp',
    'gSZkB',
    'getActorIdBySocketId',
    'setDataFromNetwork',
    '_scene',
    '_characterSprites',
    'forEach',
    '_character',
    'wKCHQ',
    'rvgjz',
    'indexOf',
    'NetworkCharacter',
    'netId',
    'error',
    'registerNewPlayer',
    'iHcgB',
    'koNwc',
    'removePlayer',
    'REMOVE\x20PLAYER',
    'unshift',
    'refreshNetwork',
    'synchronize',
    'isCurrentSceneIsBattle',
    'isEventRunning',
    'getMyActorDataForNetwork',
    'PlayerNetActorData',
    'getDataForNetwork'
];
(function (_0x19367a, _0x1e11dc) {
    var _0x25739b = function (_0x892ae9) {
        while (--_0x892ae9) {
            _0x19367a['push'](_0x19367a['shift']());
        }
    };
    _0x25739b(++_0x1e11dc);
}(_0x4799, 0xcd));
var _0x4657 = function (_0xf017ec, _0x5a9121) {
    _0xf017ec = _0xf017ec - 0x0;
    var _0x1a6c26 = _0x4799[_0xf017ec];
    return _0x1a6c26;
};
(function () {
    NetPartyManager[_0x4657('0x0')] = function () {
        var _0x3aee56, _0x52145a, _0x1ca5b5, _0x256584, _0x394515;
        if (Network[_0x4657('0x1')] == null) {
            if (_0x4657('0x2') !== _0x4657('0x3')) {
                return;
            } else {
                var _0x33eef3, _0x2c8c2f;
                _0x4657('0x4')['p'](id);
                _0x2c8c2f = new AlphaNET[(_0x4657('0x5'))][(_0x4657('0x6'))](id);
                _0x33eef3 = Network[_0x4657('0x7')][_0x4657('0x8')]();
                _0x2c8c2f['setActorId'](_0x33eef3);
                Network[_0x4657('0x7')][_0x4657('0x9')](_0x33eef3);
                return Network[_0x4657('0xa')][_0x4657('0xb')](_0x2c8c2f);
            }
        }
        _0x4657('0xc')['p']();
        _0x256584 = $gameParty[_0x4657('0xd')]();
        for (_0x3aee56 = _0x52145a = _0x394515 = _0x256584[_0x4657('0xe')] - 0x1; _0x394515 <= 0x0 ? _0x52145a <= 0x0 : _0x52145a >= 0x0; _0x3aee56 = _0x394515 <= 0x0 ? ++_0x52145a : --_0x52145a) {
            if (_0x4657('0xf') === _0x4657('0x10')) {
                return;
            } else {
                _0x1ca5b5 = _0x256584[_0x3aee56];
                if (_0x1ca5b5 != null) {
                    $gameParty['removeActor'](_0x1ca5b5['actorId']());
                    Network[_0x4657('0x7')]['push'](_0x1ca5b5[_0x4657('0x11')]());
                }
            }
        }
        return $gameParty[_0x4657('0x12')](NetPartyManager[_0x4657('0x13')]());
    };
    NetPartyManager[_0x4657('0x14')] = function () {
        if (_0x4657('0x15') === _0x4657('0x15')) {
            var _0x474d4e, _0xf2cec4, _0x45e942;
            for (_0x474d4e = _0xf2cec4 = 0x1, _0x45e942 = Network['players']['length']; 0x1 <= _0x45e942 ? _0xf2cec4 < _0x45e942 : _0xf2cec4 > _0x45e942; _0x474d4e = 0x1 <= _0x45e942 ? ++_0xf2cec4 : --_0xf2cec4) {
                if (_0x4657('0x16') !== 'TyPzv') {
                    $gameParty['addActor'](Network['players'][_0x474d4e][_0x4657('0x11')]);
                } else {
                    Network[_0x4657('0x17')](NetMessage[_0x4657('0x18')]()[_0x4657('0x19')](itemsData));
                }
            }
            NetPartyManager[_0x4657('0x1a')]();
            return $gameMap[_0x4657('0x1b')]();
        } else {
            return;
        }
    };
    NetPartyManager[_0x4657('0x1c')] = function (_0x260853) {
        if (_0x4657('0x1d') !== 'hrXbx') {
            member = members[i];
            if (member != null) {
                $gameParty[_0x4657('0x1e')](member[_0x4657('0x11')]());
                Network[_0x4657('0x7')]['push'](member[_0x4657('0x11')]());
            }
        } else {
            return Network[_0x4657('0x1f')](_0x260853);
        }
    };
    NetPartyManager['getPlayerByIndex'] = function (_0x593289) {
        return Network[_0x4657('0xa')][_0x593289];
    };
    NetPartyManager[_0x4657('0x20')] = function (_0x1904fd) {
        return Network[_0x4657('0xa')][_0x4657('0x21')]('actorId', _0x1904fd);
    };
    NetPartyManager['getMe'] = function () {
        return Network[_0x4657('0x1')];
    };
    NetPartyManager[_0x4657('0x13')] = function () {
        return NetPartyManager['getMe']()[_0x4657('0x11')];
    };
    NetPartyManager[_0x4657('0x22')] = function () {
        if (_0x4657('0x23') === _0x4657('0x24')) {
            return SceneManager[_0x4657('0x25')]();
        } else {
            return NetPartyManager['getPlayerByIndex'](0x0);
        }
    };
    NetPartyManager['getCharById'] = function (_0x34b789) {
        if (_0x4657('0x26') !== _0x4657('0x27')) {
            return $gamePlayer[_0x4657('0x28')]()[_0x4657('0x29')](_0x34b789);
        } else {
            _0x34b789 = NetPartyManager[_0x4657('0x13')]();
            actor = $gameParty[_0x4657('0x2a')](_0x34b789);
            data = JsonEx[_0x4657('0x2b')](actor);
            return data;
        }
    };
    NetPartyManager[_0x4657('0x2c')] = function () {
        if ('JkIka' !== _0x4657('0x2d')) {
            return Network['players']['indexOf'](NetPartyManager[_0x4657('0x2e')]()) + 0x1;
        } else {
            Network[_0x4657('0x17')](NetMessage['PlayerNetActorData']()[_0x4657('0x19')](data));
        }
    };
    NetPartyManager[_0x4657('0x2f')] = function () {
        return NetPartyManager['getPlayerSpriteById'](Network[_0x4657('0x30')]());
    };
    NetPartyManager[_0x4657('0x31')] = function (_0x35e94b) {
        var _0x11c715, _0x42c964, _0xc88b73, _0x1d1088;
        if (!SceneManager['isCurrentSceneIsMap']()) {
            return null;
        }
        try {
            if (_0x4657('0x32') === _0x4657('0x33')) {
                if (data == null) {
                    return;
                }
                actorId = NetPartyManager[_0x4657('0x34')](socketId);
                if (data != null) {
                    $gameParty[_0x4657('0x35')](data);
                }
                NetPartyManager['refresh']();
            } else {
                _0x42c964 = null;
                _0x1d1088 = SceneManager[_0x4657('0x36')]['_spriteset'];
                if (_0x1d1088 != null) {
                    _0xc88b73 = _0x1d1088[_0x4657('0x37')];
                    if (_0xc88b73 != null) {
                        _0xc88b73[_0x4657('0x38')](function (_0x468087) {
                            if (_0x468087[_0x4657('0x39')] != null) {
                                if (_0x4657('0x3a') === _0x4657('0x3b')) {
                                    return Network[_0x4657('0xa')][_0x4657('0x3c')](NetPartyManager[_0x4657('0x2e')]()) + 0x1;
                                } else {
                                    if (_0x468087[_0x4657('0x39')] instanceof Game_Player) {
                                        if (_0x35e94b === Network[_0x4657('0x30')]()) {
                                            _0x42c964 = _0x468087;
                                        }
                                    }
                                    if (_0x468087[_0x4657('0x39')] instanceof AlphaNET[_0x4657('0x5')][_0x4657('0x3d')]) {
                                        if (_0x468087[_0x4657('0x39')][_0x4657('0x3e')] === _0x35e94b) {
                                            return _0x42c964 = _0x468087;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                return _0x42c964;
            }
        } catch (_0x11b3b9) {
            _0x11c715 = _0x11b3b9;
            AlphaNET[_0x4657('0x3f')](_0x11c715, 'while\x20get\x20character\x20sprite\x20on\x20map');
        }
        return null;
    };
    NetPartyManager[_0x4657('0x34')] = function (_0xc2bea0) {
        var _0x14d09e;
        _0x14d09e = NetPartyManager['getPlayer'](_0xc2bea0);
        return _0x14d09e[_0x4657('0x11')];
    };
    NetPartyManager[_0x4657('0x40')] = function (_0xfab857) {
        if (_0x4657('0x41') === _0x4657('0x42')) {
            return;
        } else {
            var _0x4ad5fb, _0xce9fb4;
            _0x4657('0x4')['p'](_0xfab857);
            _0xce9fb4 = new AlphaNET[(_0x4657('0x5'))][(_0x4657('0x6'))](_0xfab857);
            _0x4ad5fb = Network[_0x4657('0x7')][_0x4657('0x8')]();
            _0xce9fb4['setActorId'](_0x4ad5fb);
            Network['networkActorsId'][_0x4657('0x9')](_0x4ad5fb);
            return Network[_0x4657('0xa')][_0x4657('0xb')](_0xce9fb4);
        }
    };
    NetPartyManager[_0x4657('0x43')] = function (_0x34dd25) {
        var _0x1b1d24;
        _0x1b1d24 = NetPartyManager[_0x4657('0x1c')](_0x34dd25);
        if (_0x1b1d24 == null) {
            return;
        }
        _0x4657('0x44')['p'](_0x34dd25);
        Network[_0x4657('0xa')][_0x4657('0x9')](_0x1b1d24);
        $gameParty['removeActor'](_0x1b1d24[_0x4657('0x11')]);
        Network[_0x4657('0x7')][_0x4657('0x45')](_0x1b1d24['actorId']);
        return NetPartyManager[_0x4657('0x1a')]();
    };
    NetPartyManager[_0x4657('0x1a')] = function () {
        return $gamePlayer[_0x4657('0x28')]()[_0x4657('0x46')]();
    };
    NetPartyManager[_0x4657('0x47')] = function () {
        var _0x52698b, _0x592cfd;
        if (SceneManager[_0x4657('0x48')]()) {
            return;
        }
        if ($gameMap[_0x4657('0x49')]()) {
            return;
        }
        _0x52698b = NetPartyManager[_0x4657('0x4a')]();
        if (_0x52698b != null) {
            Network[_0x4657('0x17')](NetMessage[_0x4657('0x4b')]()[_0x4657('0x19')](_0x52698b));
        }
        _0x592cfd = $gameParty[_0x4657('0x4c')]();
        if (_0x592cfd != null) {
            if (_0x4657('0x4d') === _0x4657('0x4e')) {
                var _0x2ea9e7;
                _0x2ea9e7 = NetPartyManager[_0x4657('0x1c')](id);
                return _0x2ea9e7['actorId'];
            } else {
                Network[_0x4657('0x17')](NetMessage[_0x4657('0x18')]()['setData'](_0x592cfd));
            }
        }
        if (Network['isMultiMode']()) {
            NetPartyManager[_0x4657('0x4f')]();
        }
    };
    NetPartyManager[_0x4657('0x4f')] = function () {
        var _0x404c41;
        _0x404c41 = $gameMap[_0x4657('0x50')]();
        Network[_0x4657('0x17')](NetMessage[_0x4657('0x51')]()[_0x4657('0x19')](_0x404c41));
    };
    NetPartyManager[_0x4657('0x4a')] = function () {
        var _0x101fe8, _0x5878c3, _0x1fcf02, _0x120cbd;
        try {
            _0x120cbd = NetPartyManager[_0x4657('0x13')]();
            _0x101fe8 = $gameParty[_0x4657('0x2a')](_0x120cbd);
            _0x5878c3 = JsonEx['stringify'](_0x101fe8);
            return _0x5878c3;
        } catch (_0xdc35be) {
            _0x1fcf02 = _0xdc35be;
            return AlphaNET[_0x4657('0x3f')](_0x1fcf02, 'while\x20try\x20collect\x20actor\x20Data\x20to\x20synchronize');
        }
    };
    NetPartyManager[_0x4657('0x52')] = function (_0x549c59, _0x500f8e) {
        var _0x3753f8, _0x436ce4, _0x43ce67;
        try {
            if (_0x4657('0x53') !== 'vnQCr') {
                if (sprite['_character'][_0x4657('0x3e')] === netId) {
                    return result = sprite;
                }
            } else {
                _0x3753f8 = NetPartyManager[_0x4657('0x34')](_0x549c59);
                _0x43ce67 = JsonEx[_0x4657('0x54')](_0x500f8e);
                if ($gameActors[_0x4657('0x55')][_0x3753f8] == null) {
                    return;
                }
                $gameActors[_0x4657('0x55')][_0x3753f8] = _0x43ce67;
                NetPartyManager[_0x4657('0x56')]();
            }
        } catch (_0x293033) {
            _0x436ce4 = _0x293033;
            AlphaNET[_0x4657('0x3f')](_0x436ce4, _0x4657('0x57'));
        }
    };
    NetPartyManager[_0x4657('0x56')] = function () {
        if (SceneManager[_0x4657('0x58')]()) {
            NetPartyManager[_0x4657('0x1a')]();
            $gameMap[_0x4657('0x59')]();
        }
        if (SceneManager[_0x4657('0x5a')]()) {
            return SceneManager[_0x4657('0x25')]();
        }
    };
    NetPartyManager[_0x4657('0x5b')] = function (_0x182943, _0x465fcf) {
        var _0x52ea08, _0x43ffd3;
        try {
            if (_0x465fcf == null) {
                if (_0x4657('0x5c') === _0x4657('0x5c')) {
                    return;
                } else {
                    $gameParty[_0x4657('0x12')](Network[_0x4657('0xa')][i][_0x4657('0x11')]);
                }
            }
            _0x52ea08 = NetPartyManager[_0x4657('0x34')](_0x182943);
            if (_0x465fcf != null) {
                if ('DHjkp' !== _0x4657('0x5d')) {
                    return;
                } else {
                    $gameParty['setDataFromNetwork'](_0x465fcf);
                }
            }
            NetPartyManager[_0x4657('0x56')]();
        } catch (_0x4a44da) {
            _0x43ffd3 = _0x4a44da;
            AlphaNET[_0x4657('0x3f')](_0x43ffd3, 'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network');
        }
    };
}());
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetPlayerWorldData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetPlayerWorldData;
  NetPlayerWorldData = class NetPlayerWorldData {
    constructor() {
      this.actorData = null;
      this.actorItems = null;
      this.variablesData = [];
      this.selfSwitchData = [];
      this.switchData = [];
    }

    setActorData(data) {
      return this.actorData = data;
    }

    getActorData() {
      return this.actorData;
    }

    setActorItems(data) {
      return this.actorItems = data;
    }

    getActorItems() {
      return this.actorItems;
    }

    setWorldData(data) {
      var e;
      try {
        this.variablesData = data.variablesData;
        this.switchData = data.switchData;
        return this.selfSwitchData = data.selfSwitchData;
      } catch (error) {
        e = error;
        return Network.error(e, 'while try save World Data for player');
      }
    }

    getWorldDataNetwork() {
      var data;
      return data = {
        variablesData: JSON.stringify(this.variablesData),
        switchData: JSON.stringify(this.switchData),
        selfSwitchData: JSON.stringify(this.selfSwitchData)
      };
    }

    makeSaveContents(actorId) {
      var saveData, world;
      world = {
        variablesData: this.variablesData,
        switchData: this.switchData,
        selfSwitchData: this.selfSwitchData
      };
      saveData = {
        world: world,
        actorItems: this.actorItems,
        actorData: $gameActors._data[actorId]
      };
      return saveData;
    }

  };
  AlphaNET.register(NetPlayerWorldData);
})();

// ■ END NetPlayerWorldData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetSessionData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetSessionData;
  NetSessionData = class NetSessionData {
    constructor() {
      this._actorsData = {};
      this._globalData = new AlphaNET.LIBS.NetPlayerWorldData();
    }

    setPlayerActorData(actorId, data) {
      this._checkActorWorldData(actorId);
      //"PLAYER DATA SAVED TO SESSION".p(actorId)
      this.getAllData(actorId).setActorData(data);
    }

    getPlayerActorData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorData();
    }

    setPlayerItemsData(actorId, data) {
      this._checkActorWorldData(actorId);
      this.getAllData(actorId).setActorItems(data);
    }

    getPlayerItemsrData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorItems();
    }

    hasInfoAbout(actorId) {
      return this._actorsData[actorId] != null;
    }

    getAllData(actorId) {
      return this._actorsData[actorId];
    }

    getGlobalData() {
      return this._globalData;
    }

    setPlayerWorldData(actorId, data) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).setWorldData(data);
    }

    getPlayerWorldData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getWorldData();
    }

    makeSaveContents() {
      var _actorsData, g, item, saveData;
      _actorsData = {};
      for (item in this._actorsData) {
        if (this._actorsData.hasOwnProperty(item)) {
          if (this._actorsData[item].actorData != null) {
            _actorsData[item] = this._actorsData[item].makeSaveContents(item);
          }
        }
      }
      g = this._globalData.makeSaveContents();
      return saveData = {
        global: g,
        actorsData: _actorsData
      };
    }

    extractSaveContents(content) {
      var e, item, results;
      try {
        this._loadDataToWorldObject(this._globalData, content.global);
        results = [];
        for (item in content.actorsData) {
          if (content.actorsData.hasOwnProperty(item)) {
            this._actorsData[item] = new AlphaNET.LIBS.NetPlayerWorldData();
            results.push(this._loadDataToWorldObject(this._actorsData[item], content.actorsData[item]));
          } else {
            results.push(void 0);
          }
        }
        return results;
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while load network world save data');
      }
    }

    _loadDataToWorldObject(obj, data) {
      var e;
      try {
        obj.actorItems = data.actorItems;
        if (data.actorData != null) {
          obj.actorData = JsonEx.stringify(data.actorData);
        }
        return obj.setWorldData(data.world);
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while extract network world save data');
      }
    }

    _checkActorWorldData(actorId) {
      if (!this.hasInfoAbout(actorId)) {
        this._actorsData[actorId] = new AlphaNET.LIBS.NetPlayerWorldData();
      }
    }

  };
  AlphaNET.register(NetSessionData);
})();

// ■ END NetSessionData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetUIManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS IMPL ONLY]
  NetUIManager.init = function(scene) {
    if ($gameTemp._chatLines == null) {
      $gameTemp._chatLines = [];
    }
    NetUIManager.netUILayer = new Sprite();
    if (scene != null) {
      scene.addChild(NetUIManager.netUILayer);
    }
    if (NetUIManager.isNeedChat === true) {
      return NetUIManager.createChat();
    }
  };
  NetUIManager.startChat = function() {
    NetUIManager.isNeedChat = true;
    return NetUIManager.createChat();
  };
  NetUIManager.createChat = function() {
    if (NetUIManager._chatUI != null) {
      return;
    }
    NetUIManager._chatUI = new AlphaNET.LIBS.SpriteChatMain();
    this.chat = new AlphaNET.LIBS.GameChatController(NetUIManager._chatUI);
    return NetUIManager._add(NetUIManager._chatUI);
  };
  NetUIManager._add = function(element) {
    return NetUIManager.netUILayer.addChild(element);
  };
  NetUIManager.isSomethingUnderCursor = function() {
    if (NetUIManager.isChatActive()) {
      return this.chat.isUnderTouch();
    }
    return false;
  };
  NetUIManager.hideUI = function() {};
  NetUIManager.showUI = function() {};
  NetUIManager.hideChat = function() {
    var ref;
    return (ref = this.chat) != null ? ref.hide() : void 0;
  };
  NetUIManager.showChat = function() {
    var ref;
    return (ref = this.chat) != null ? ref.show() : void 0;
  };
  NetUIManager.isChatActive = function() {
    var ref;
    return ((ref = this.chat) != null ? ref.isActive() : void 0) && ANET.Utils.isSceneMap();
  };
  NetUIManager.pushMessageToChat = function(actorId, message) {
    var ref;
    if (NetUIManager.isChatActive()) {
      return (ref = this.chat) != null ? ref.addLine(actorId, message) : void 0;
    } else {
      return $gameTemp._chatLines.push([actorId, message]);
    }
  };
  NetUIManager.update = function() {
    var ref;
    return (ref = this.chat) != null ? ref.update() : void 0;
  };
  NetUIManager.terminate = function() {
    NetUIManager._chatUI = null;
    return this.chat = null;
  };
})();

// ■ END NetUIManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWaitPool.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetWaitPool;
  NetWaitPool = class NetWaitPool {
    constructor(waitId) {
      this.waitId = waitId;
      this._clients = [];
      this.resetPool();
    }

    addClient(clientId, isReady = false) {
      if (this._getClientIndex(clientId) < 0) {
        this._clients.push(clientId);
      }
      if (isReady === true) {
        return this.setClientReady(clientId);
      }
    }

    _getClientIndex(clientId) {
      return this._clients.indexOf(clientId);
    }

    setClientReady(clientId) {
      return this._statuses[this._getClientIndex(clientId)] = true;
    }

    isPoolReady() {
      return this._statuses.every(function(status) {
        return status === true;
      });
    }

    resetPool() {
      return this._statuses = []; // * Массив готовности
    }

    getPoolSize() {
      return this._clients.length;
    }

  };
  AlphaNET.register(NetWaitPool);
})();

// ■ END NetWaitPool.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS HEADER PART]
  //@[CLASS IMPL ONLY]
  Network.commonEventOnServerStarted = 0;
  Network.commonEventOnConnectToServer = 0;
  Network.commonEventOnDisconectFromServer = 0;
  Network.commonEventOnOtherClientConnected = 0;
  Network.commonEventOnOtherClientDisconected = 0;
  Network.commonEventOnPvPBattleEnd = 0;
  Network.maximumNetworkPlayers = 4;
  Network.networkActorsId = [
    1,
    2,
    3,
    4 // * This is mutable (меняется во время игры)
  ];
  Network.SERVER_UPDATE_TIME = 500;
  Network.WAIT_SERVER = 0;
  Network.WAIT_PLAYER = 1;
  Network.ICON_NONE = -1;
  Network.ICON_MESSAGE = 1;
  Network.ICON_MENU = 2;
  Network.ICON_SHOP = 3;
  Network.ICON_WAIT = 4;
  Network.ICON_BATTLE = 5;
  Network.ICON_CHAT = 6;
  Network.PVP_WIN = 0;
  Network.PVP_DEFEAT = 2;
  Network.isConnected = function() {
    return this._isConnected === true;
  };
  Network.isHost = function() {
    return Network.isConnected() && this._isHost === true;
  };
  Network.isHotGame = function() {
    return this._isHotGame === true;
  };
  Network.isBusy = function() {
    return this._isBusy === true;
  };
  Network.myId = function() {
    if (Network.isConnected()) {
      return this.socket.id;
    }
  };
  Network.playerData = function(id) {
    return Network.players.findElementByField('id', id);
  };
  Network.isHotHost = function() {
    return Network.isHotGame() && Network.isHost();
  };
  Network.inBattle = function() {
    return this._inBattle === true;
  };
  Network.allowConnect = function() {
    return this._allowConnection === true;
  };
  Network.canClientConnect = function() {
    return Network._checkCanConnect();
  };
  Network.canConnectToServer = function() {
    return Network._checkCanConnectToServer();
  };
  Network.isMultiMode = function() {
    return this._isMultiplayerMode === true;
  };
  Network.isMapOwner = function() {
    return Network.isMultiMode() && this._isMapOwner === true;
  };
  Network.inPvPBattle = function() {
    return this._inPvPBattle === true;
  };
  Network.isPvPBattleServer = function() {
    return this._isPvPBattleServer === true;
  };
  Network.isPvPBattleWin = function() {
    return this._lastPvPResult === Network.PVP_WIN;
  };
  Network.isPvPBattleLoose = function() {
    return this._lastPvPResult === Network.PVP_DEFEAT;
  };
  Network.startServer = function() {
    return Network._startServer();
  };
  Network.stopServer = function() {
    var ref;
    return (ref = this.server) != null ? ref.stop() : void 0;
  };
  Network.connectToServer = function() {
    return Network._connectToServer();
  };
  Network.disconnect = function() {
    var ref;
    return (ref = this.client) != null ? ref.disconnect() : void 0;
  };
  Network.sendMessage = function(netMessage) {
    if (!Network.isConnected()) {
      return;
    }
    netMessage.setFrom(this.socket.id).send();
  };
  Network.sendIcon = function(iconId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    if (iconId == null) {
      iconId = Network.ICON_NONE;
    }
    msg = NetMessage.PlayerNetIcon().setData(iconId);
    return Network.sendMessage(msg);
  };
  Network.requestSync = function(syncId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.RequestSync().setData(syncId).setRepeat(Network.WAIT_PLAYER);
    return Network.sendMessage(msg);
  };
  // * INNER METHOD (Call by client)
  Network.requestPvPBattle = function(anotherPlayerIndex) {
    var data, msg;
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    //data = {
    //    who: NetPartyManager.getMyPlayerIndex(), # * MY INDEX
    //    with: anotherPlayerIndex # * RIVAL PLAYER INDEX
    //}
    data = anotherPlayerIndex;
    msg = NetMessage.RequestPvP().setData(data); //.setRepeat('pvp_start')
    Network.sendMessage(msg);
    return this._isPvPBattleServer = true;
  };
  //?{TEST}
  Network.sendTemp = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setData(data);
    return Network.sendMessage(msg);
  };
  Network.sendTempWait = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setRepeat().setData(data);
    return Network.sendMessage(msg);
  };
  AlphaNET.register(Network);
})();

// ■ END Network.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG;
  LOG = new KDCore.DevLog("Network");
  LOG.on();
  LOG.setColors(KDCore.Color.BLUE, KDCore.Color.BLACK.getLightestColor(235));
  
  //@[CLASS PRIVATE PART]
  //@[CLASS IMPL ONLY]
  //Network.ip = 'localhost';
  Network.ip = 'localhost';
  Network.port = 3032;
  Network.initialize = function() {
    LOG.p("Initialized on " + Network.ip + " : " + Network.port);
    this.socket = null;
    this._isConnected = false;
    this._isHost = false;
    this._isHotGame = false;
    this._isBusy = false;
    this._thread = null;
    this.players = [];
    this.myPlayerData = null;
    this._waitMode = 0;
    this._allowConnection = true;
    this._isMultiplayerMode = AlphaNET.Parameters.isMultiGameMode();
    if (this._isMultiplayerMode) {
      LOG.p("Warning! Multiplayer game mode. Global Events are disabled");
    }
    this._isMapOwner = false;
    this.sessionData = null;
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = -1;
    Network.networkActorsId = AlphaNET.Parameters.get_actorsForPlayers();
    Network.maximumNetworkPlayers = Network.networkActorsId.length;
    AlphaNET.Parameters.load_CommonEventsForNetwork();
  };
  Network._startServer = function() {
    if (Utils.isNwjs()) {
      return this.server = new AlphaNET.LIBS.NetworkServer(Network.port);
    } else {
      return LOG.p("You can start server only in NW.js (PC)");
    }
  };
  Network._connectToServer = function() {
    var adr;
    if (this.socket != null) {
      return LOG.p("Connection already exists!");
    } else {
      adr = this._makeNetAdress();
      LOG.p("Connect to " + adr);
      this.socket = io(adr);
      return this.client = new AlphaNET.LIBS.NetworkClient(this.socket);
    }
  };
  Network.setHost = function() {
    return this._isHost = true;
  };
  Network.setHotGame = function(isHotGame) {
    return this._isHotGame = isHotGame;
  };
  Network._makeNetAdress = function() {
    return 'http://' + Network.ip + ":" + Network.port;
  };
  Network.runEvent = function(commonEventId) {
    if ((commonEventId != null) && commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
      LOG.p("Start common event " + commonEventId);
      return $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  Network.onConnectToServer = function() {
    this._isConnected = true;
    if (!Network.isHotGame()) {
      if (ANET.P.isChatUsing() === true) {
        return NetUIManager.startChat();
      }
    }
  };
  Network.onConnectionError = function() {
    return this.socket = null;
  };
  //TODO: Либо вызывать общее событие, либо сделать handler
  Network.onConnectionLost = function() {
    Network.disconnect();
    this._isConnected = false;
    this.socket = null;
    return Network.clearPlayersData();
  };
  Network.clearPlayersData = function() {
    Network.players = [];
    Network.myPlayerData = null;
    return NetPartyManager.refreshCharacters();
  };
  Network.isPlayerWaitMode = function() {
    return this._waitMode === Network.WAIT_PLAYER;
  };
  Network.isServerWaitMode = function() {
    return this._waitMode === Network.WAIT_SERVER;
  };
  Network.getLastResponseData = function() {
    return this._lastResponseData;
  };
  // * Могу ли я подключится сейчас?
  Network._checkCanConnect = function() {
    if (Network.isMultiMode()) {
      return SceneManager.isCurrentSceneIsMap();
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * Может ли клиент подключится к севреру? (Т.е. эта проверка уже на сервере)
  Network._checkCanConnectToServer = function() {
    if (Network.isMultiMode()) {
      return true;
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * OUTER METHOD CALL BY SERVER RESPONSE
  // * Это внешний метод, он вызывается сервером, когда он согласовал PvP бой между игроками
  Network._outerStartPvP = function(enemyActorId) {
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    LOG.p("Starting PvP");
    BattleManager.setupPvPBattle(enemyActorId);
    return SceneManager.push(Scene_Battle);
  };
  Network._onNewChatMessage = function(actorId, message) {
    return NetUIManager.pushMessageToChat(actorId, message);
  };
  Network.clearPvPBattleWithResult = function(result) {
    LOG.p("PvP End");
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = result;
    return Network.runEvent(Network.commonEventOnPvPBattleEnd);
  };
  //?[TEST]
  Network.test = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHard').send("baba").setWait();
    return this._isBusy = true;
  };
  //?[TEST]
  Network.test2 = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHardRepeated').send("gfgf").setRepeat();
    return this._isBusy = true;
  };
  //?[TEST]
  Network.sendChatMessage = function(text, channelId) {
    var e, msg;
    if (!Network.isConnected()) {
      return;
    }
    try {
      msg = {
        channelId: channelId,
        text: text
      };
      Network.sendMessage(NetMessage.SendChatMessage().setData(msg));
      return NetUIManager.pushMessageToChat(NetPartyManager.getMyActorId(), msg);
    } catch (error1) {
      e = error1;
      return ANET.warning('error while send chat message to server', e);
    }
  };
  //*Активирует режим ожидания ответа от сервера, игра зависает и ждёт ответ от сервера
  Network.waitServerResponse = function(netMessage, waitMode) {
    //LOG.p 'Sended wait state request to server ' + netMessage.name
    this._waitMode = waitMode || Network.WAIT_SERVER;
    this._isBusy = true;
    Network.sendIcon(Network.ICON_WAIT);
  };
  //*Активирует режим повторения команды, игра в это время зависает и ждёт ответ от сервера
  Network.waitServerResponseRepeated = function(netMessage, waitMode) {
    var func;
    //LOG.p 'Repeated mode'
    Network.waitServerResponse(netMessage, waitMode);
    this._thread = setTimeout(func = function() {
      if (Network.isBusy() && (Network._thread != null)) {
        netMessage.send();
        Network.sendIcon(Network.ICON_WAIT);
        return Network._thread = setTimeout(func, 2000);
      }
    }, 2000);
  };
  
  //*Ответ (который игра ждала) получен, игра отвисает
  Network.onServerResponse = function(data) {
    //LOG.p 'Wait state request complete'
    this._lastResponseData = data;
    this._isBusy = false;
    Network.sendIcon(Network.ICON_NONE);
    if (this._thread != null) {
      clearInterval(this._thread);
    }
  };
  Network.error = function(error, message) {
    if (Network._errorLog == null) {
      Network._errorLog = new KDCore.DevLog('Network Error');
      Network._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
      Network._errorLog.on();
    }
    if (message != null) {
      Network._errorLog.p(message);
    }
    return console.error(error);
  };
})();


// ■ END Network_private.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var NetworkCharacter;

NetworkCharacter = class NetworkCharacter extends Game_Follower {
  constructor(index) {
    super(index);
  }

  refreshNet() {
    var pl;
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl != null) {
      this.netId = pl.id;
    } else {
      this.netId = null;
    }
    return this.refresh();
  }

  initialize(index) {
    this.netIndex = index;
    this.netId = null;
    Game_Follower.prototype.initialize.call(this, this.netIndex);
    return this.setTransparent(false);
  }

  actor() {
    var pl;
    if (!Network.isConnected()) {
      return null;
    }
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl == null) {
      return null;
    }
    if (pl.id === Network.myPlayerData.id) {
      // * Если это я, то не создаётся NetworkCharacter
      return null;
    }
    if (Network.isMultiMode() && pl.mapId !== $gameMap.mapId()) {
      return null;
    }
    return $gameParty.memberByActorId(pl.actorId);
  }

  update() {
    return Game_Character.prototype.update.call(this);
  }

  //?[EMPTY]
  chaseCharacter() {}

  //?[BASE]
  networkIconId() {
    if (this.actor() == null) {
      return -1;
    }
    return Game_Follower.prototype.networkIconId.call(this);
  }

  //?[BASE]
  getNetworkName() {
    var ref;
    if (AlphaNET.Parameters.get_ShowNameplatesMode() > 0) {
      return (ref = this.actor()) != null ? ref.name() : void 0;
    }
  }

  //?[BASE]
  getNetworkNameStyleId() {
    var ref;
    return (ref = this.actor()) != null ? ref.networkStyleId() : void 0;
  }

};

AlphaNET.register(NetworkCharacter);

// ■ END NetworkCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkPlayerData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetworkPlayerData;
  // * RAW класс, он хранится только как данные на клиентах (без методов)
  NetworkPlayerData = class NetworkPlayerData {
    constructor(id) {
      this.id = id;
    }

    setActorId(actorId) {
      return this.actorId = actorId;
    }

    data() {
      return {
        id: this.id,
        actorId: this.actorId
      };
    }

  };
  AlphaNET.register(NetworkPlayerData);
})();

// ■ END NetworkPlayerData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWorldManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[CLASS IMPL ONLY]

// 121 - Switch
// 122 - Variable
// 123 - SelfSwitch
NetWorldManager.WORLD_SYNC_COMMANDS = [121, 122, 123];

NetWorldManager.synchronize = function() {
  var data;
  if (SceneManager.isCurrentSceneIsBattle()) {
    return;
  }
  if ($gameMap.isEventRunning()) {
    return;
  }
  if (Network.isHost()) {
    return;
  }
  data = {};
  data.variablesData = NetWorldManager.getDataForNetwork($gameVariables);
  data.switchData = NetWorldManager.getDataForNetwork($gameSwitches);
  data.selfSwitchData = NetWorldManager.getDataForNetwork($gameSelfSwitches);
  return Network.sendMessage(NetMessage.PlayerWorldData().setData(data));
};

NetWorldManager.onWorldDataFromNetwork = function(data) {
  NetWorldManager.setDataFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setDataFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setDataFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.onGlobalWorldDataFromNetwork = function(data) {
  NetWorldManager.setExtraFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setExtraFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setExtraFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.getDataForNetwork = function(gameVariableObject) {
  return JSON.stringify(gameVariableObject._data);
};

NetWorldManager.setDataFromNetwork = function(gameVariableObject, data) {
  var netArray;
  netArray = JSON.parse(data);
  gameVariableObject._data = netArray;
  return gameVariableObject.onChange();
};

// * Загружает дополнительные значения (которые были под NET sync или NET virtual)
// * [[id, value],...]
NetWorldManager.setExtraFromNetwork = function(gameVariableObject, data) {
  var i, item, j, netData, ref;
  netData = JSON.parse(data);
  for (i = j = 0, ref = netData.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    item = netData[i];
    gameVariableObject._data[item[0]] = item[1];
  }
  gameVariableObject.onChange();
};

NetWorldManager.onEventSyncCommand = function(commandData) {
  var e, event, line, mapId, page;
  if (!Network.isHost()) {
    return;
  }
  mapId = commandData.mapId;
  if ($gameMap.mapId() !== mapId) {
    return;
  }
  event = $gameMap.event(commandData.eventId);
  if (event == null) {
    return;
  }
  try {
    page = event.event().pages[commandData.pi];
    if (page == null) {
      return;
    }
    line = page.list[commandData.li];
    if (line == null) {
      return;
    }
    if (NetWorldManager.WORLD_SYNC_COMMANDS.include(line.code)) {
      return NetWorldManager.saveGlobalInfo(line.code, line.parameters, commandData);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while check event sync command');
  }
};

NetWorldManager.saveGlobalInfo = function(code, parameters, evData) {
  var p;
  "saveGlobalInfo for".p(code);
  p = parameters;
  switch (code) {
    case 121:
      NetWorldManager.setSwitchToGlobal(p[0], p[1], p[2] === 0);
      break;
    case 122:
      setTimeout((function() {
        return NetWorldManager.setVariableToGlobal(p[0], p[1]);
      }), 500);
      break;
    case 123:
      NetWorldManager.setSelfSwitchToGlobal(p[0], p[1] === 0, evData);
      break;
    default:
      break;
  }
};

NetWorldManager.setSwitchToGlobal = function(fromI, toI, value) {
  var global, i, j, ref, ref1;
  global = Network.sessionData.getGlobalData();
  for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
    global.switchData.push([i, value]);
  }
};

NetWorldManager.setVariableToGlobal = function(fromI, toI) {
  var e, global, i, j, ref, ref1;
  try {
    global = Network.sessionData.getGlobalData();
    for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
      global.variablesData.push([i, $gameVariables.value(i)]);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while set variables to global');
  }
};

NetWorldManager.setSelfSwitchToGlobal = function(switchName, value, commandData) {
  var e, global, key;
  try {
    global = Network.sessionData.getGlobalData();
    key = [commandData.mapId, commandData.eventId, switchName];
    global.selfSwitchData.push([key.toString(), value]);
  } catch (error) {
    e = error;
    return Network.error(e, 'while set selfSwitch to global');
  }
};

NetWorldManager.onEventVirtualCommand = function(commandData) {
  if (!Network.isHost()) {
    return;
  }
  if (!NetWorldManager.WORLD_SYNC_COMMANDS.include(commandData.id)) {
    return;
  }
  NetWorldManager.saveGlobalInfo(commandData.id, commandData.parameters, commandData);
};

// ■ END NetWorldManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PointX.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[MINI VERSION OF POINTX]
//@[GLOBAL DEFINITION]
var PointX;

PointX = (function() {
  class PointX {
    constructor(_x, _y) {
      this._x = _x;
      this._y = _y;
    }

    convertToCanvas() {
      return new PointX(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
    }

    convertToMap() {
      return new PointX($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
    }

    convertToScreen() {
      return new PointX(this.screenX(), this.screenY());
    }

    screenX() {
      var t, tw;
      t = $gameMap.adjustX(this._x);
      tw = $gameMap.tileWidth();
      return Math.round(t * tw + tw / 2);
    }

    screenY() {
      var t, th;
      t = $gameMap.adjustY(this._y);
      th = $gameMap.tileHeight();
      return Math.round(t * th + th);
    }

    clone() {
      return new PointX(this._x, this._y);
    }

    toString() {
      return `[${this._x}:${this._y}]`;
    }

    static _getEmpty() {
      if (PointX._empty == null) {
        PointX._empty = new PointX(0, 0);
      }
      return PointX._empty;
    }

  };

  Object.defineProperties(PointX.prototype, {
    x: {
      get: function() {
        return this._x;
      },
      configurable: true
    },
    y: {
      get: function() {
        return this._y;
      },
      configurable: true
    }
  });

  Object.defineProperties(PointX, {
    Empty: {
      get: function() {
        return PointX._getEmpty();
      },
      configurable: false
    }
  });

  return PointX;

}).call(this);

//@[EXTENSIONS]
Array.prototype.toPoint = function() {
  return new PointX(this[0], this[1]);
};

Sprite.prototype.toPoint = function() {
  return new PointX(this.x, this.y);
};

// ■ END PointX.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Base_isBusy = Scene_Base.prototype.isBusy;
    Scene_Base.prototype.isBusy = function () {
        var base = _alias_Scene_Base_isBusy.call(this);
        return base && Network.isBusy() && $gamePlayer.isTransferring();
    };

    //@[ALIAS]
    var _alias_Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function () {
        _alias_Scene_Base_initialize.call(this);
        this._syncIsShowed = false;
        this._spriteNetSyncMini = new AlphaNET.LIBS.Sprite_WaitNetworkMini();
        this._spriteNetSync = new AlphaNET.LIBS.Sprite_WaitNetwork();
    };

    //@[ALIAS]
    var _alias_Scene_Base_updateNET = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        if (Network.isBusy()) {
            if (Network.isServerWaitMode()) {
                this._updateOnBusyNetwork();
                return;
            } else {
                this._showSyncWait(Network.WAIT_PLAYER);
            }
        } else {
            this._hideSyncWait();
        }
        this._updateNetwork();
        _alias_Scene_Base_updateNET.call(this, ...arguments);
    };
})();


//?[NEW]
Scene_Base.prototype._updateOnBusyNetwork = function () {
    this.updateFade();
    this._showSyncWait(Network.WAIT_SERVER);
};

//?[NEW]
Scene_Base.prototype._showSyncWait = function (waitId) {
    this._showSyncWaitMini();
    setTimeout(() => {
        if (this._syncIsShowed == true) {
            this.addChild(this._spriteNetSync);
            this._spriteNetSync.activate(waitId);
        }
    }, 1000);
};

//?[NEW]
Scene_Base.prototype._showSyncWaitMini = function () {
    if (this._spriteNetSyncMini.isActive()) return;
    this._syncIsShowed = true;
    this.addChild(this._spriteNetSyncMini);
    this._spriteNetSyncMini.activate();
};

//?[NEW]
Scene_Base.prototype._hideSyncWait = function () {
    if (!this._syncIsShowed) return;
    this._syncIsShowed = false;
    this._spriteNetSyncMini.hide();
    this._spriteNetSync.hide();
    this.removeChild(this._spriteNetSyncMini);
    this.removeChild(this._spriteNetSync);
};

//?[NEW]
Scene_Base.prototype._updateNetwork = function () {
    if (!Network.isConnected()) return;
    if (Network.isHost()) {
        if (this instanceof Scene_Map) {
            //?EMPTY
            // * Все движения событий обрабатываются на хосте, поэтому если хост на сцене карты,
            // * то всё нормально. А если хост на другой сцене, то нужно дополнительное обновление
            // * игровой карты, чтобы события не стояли на месте у всех других игроков
        } else {
            $gameMap.updateEventsForNetwork();
        }
    }
};

// ■ END Scene_Base.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _alias_Scene_Battle_createPartyCommandWindow.call(this, ...arguments);
        if (Network.isConnected() && !Network.isMultiMode()) {
            // * Выбор команд группы только за хостом
            this._partyCommandWindow.setNetworkShared(true);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function () {
        if(Network.isConnected()) {
            this._startActorCommandSelectionNet();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionNet = function () {
        if (Network.isMultiMode()) {
            if(Network.inPvPBattle()) {
                this._startActorCommandSelectionForPvP();
            } else {
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            }
        } else {
            if (BattleManager.isMyActorInput())
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            else
                this.endCommandSelection();
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionForPvP = function () {
        // * Планировалось, что игрок будет ждать, пока другой игрок сделает выбор действия
        // * Потом это было отмененно!
        if(BattleManager.isWaitInputtingForPvP()) {
            this.endCommandSelection();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        if (Network.isConnected()) {
            Network._inBattle = true;
            if(Network.isMultiMode()) {
                Network.sendIcon(Network.ICON_BATTLE);
            }
        }
        _alias_Scene_Battle_start.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        _alias_Scene_Battle_terminate.call(this, ...arguments);
        Network._inBattle = false;
    };

    //@[ALIAS]
    var _alias_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _alias_Scene_Battle_update.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode() && Network.isMapOwner()) {
            $gameMap.updateEventsForNetwork();
        }
    };

})();
// ■ END Scene_Battle.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_ChatInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_ChatInput;
  Scene_ChatInput = class Scene_ChatInput extends Scene_Base {
    constructor() {
      super();
    }

    create() {
      super.create();
      this._initialSetup();
      this._loadSettings();
      this._drawBackground();
      this.createWindowLayer();
      this._createInputWindow();
      this._createChannelButtons();
      return this._createControlButtons();
    }

    _initialSetup() {
      if ($gameTemp._lastNChatChannelId != null) {
        this.channelId = $gameTemp._lastNChatChannelId;
      } else {
        this.channelId = 0;
      }
      return Input._setIgnoreSpecial = true;
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[4];
      return this.S = this.settings;
    }

    _drawBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this._backgroundSprite.setBlendColor(this.S.backgroundBlend);
      return this.addChild(this._backgroundSprite);
    }

    _createInputWindow() {
      var pos;
      pos = ANET.Utils.convertPositionPointFromJSON(this.S.position);
      this._window = new ANET.LIBS.Window_ChatInput(pos.x, pos.y, this.S.width, this.S.height);
      this._window.open();
      return this.addWindow(this._window);
    }

    _createChannelButtons() {
      var images, img0, img1, img2, img3, params;
      this.channelA = new ANET.LIBS.Sprite_XButton();
      images = this.S.channelButtonImages;
      img0 = ImageManager.loadNetwork(images.mainImg);
      img1 = ImageManager.loadNetwork(images.hoverImg);
      img2 = ImageManager.loadNetwork(images.pressedImg);
      img3 = ImageManager.loadNetwork(images.selectedImg);
      this.channelA.setButtonImages(img0, img1, img2, img3);
      if (this.channelId === 0) {
        this.channelA.disable();
      }
      this.channelA.addClickHandler(this._onChannelAClick.bind(this));
      params = this.S.channelButtonA;
      this.channelA.move(this._window.x + params.marginX, this._window.y + params.marginY);
      this.channelA.drawStyledTextOnButton(params.caption, params.text.textZoneWidth, params.text.textZoneHeight, params.text);
      this.addChild(this.channelA);
      this.channelB = new ANET.LIBS.Sprite_XButton();
      this.channelB.setButtonImages(img0, img1, img2, img3);
      if (this.channelId === 1) {
        this.channelB.disable();
      }
      this.channelB.addClickHandler(this._onChannelBClick.bind(this));
      params = this.S.channelButtonB;
      this.channelB.move(this._window.x + params.marginX, this._window.y + params.marginY);
      this.channelB.drawStyledTextOnButton(params.caption, params.text.textZoneWidth, params.text.textZoneHeight, params.text);
      return this.addChild(this.channelB);
    }

    _onChannelAClick() {
      this.channelA.disable();
      this.channelB.enable();
      this.channelId = 0;
      return $gameTemp._lastNChatChannelId = this.channelId;
    }

    _onChannelBClick() {
      this.channelA.enable();
      this.channelB.disable();
      this.channelId = 1;
      return $gameTemp._lastNChatChannelId = this.channelId;
    }

    _createControlButtons() {
      var img0, img1, img2, params;
      this.sayButton = new ANET.LIBS.Sprite_XButton();
      params = this.S.sendButton;
      img0 = ImageManager.loadNetwork(params.mainImg);
      img1 = ImageManager.loadNetwork(params.hoverImg);
      img2 = ImageManager.loadNetwork(params.pressedImg);
      this.sayButton.setButtonImages(img0, img1, img2);
      this.sayButton.addClickHandler(this._onSayClick.bind(this));
      this.sayButton.move(this._window.x + params.marginX, this._window.y + params.marginY);
      return this.addChild(this.sayButton);
    }

    start() {
      if (Network.isConnected()) {
        Network.sendIcon(Network.ICON_CHAT);
      }
      return super.start();
    }

    update() {
      super.update();
      if (Input.isTriggered('ok')) {
        this._onSayClick();
      }
      if (this.isExit()) {
        return this.popScene();
      }
    }

    _onSayClick() {
      var text;
      //"SAY".p(@_window.getInputText())
      text = this._window.getInputText();
      if (text !== "") {
        Network.sendChatMessage(text, this.channelId);
      }
      return this.popScene();
    }

    isExit() {
      return Input.isCancel();
    }

    terminate() {
      super.terminate();
      return Input._setIgnoreSpecial = false;
    }

  };
  ANET.register(Scene_ChatInput);
})();

// ■ END Scene_ChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_IpConfig;
  Scene_IpConfig = class Scene_IpConfig extends Scene_Base {
    constructor() {
      super();
      SMouse.initMouseTrack(true);
      this._loadResources();
      this._createTitle();
      this._createInfo();
      this._createCommandWindow();
      this._createInputWindow();
    }

    _loadResources() {
      ImageManager.loadNetwork('btn1');
      ImageManager.loadNetwork('btn2');
      return ImageManager.loadNetwork('btn3');
    }

    _createTitle() {
      var h, title;
      title = new Sprite(new Bitmap(Graphics._boxWidth, 200));
      title.bitmap.fontSize = 80;
      h = title.bitmap.height / 2;
      title.bitmap.drawText('ALPHA', 0, h, 400, 1, 'center');
      title.bitmap.textColor = KDCore.Color.BLUE.CSS;
      title.bitmap.drawText('NET', 180, h, 400, 1, 'center');
      return this.addChild(title);
    }

    _createInfo() {}

    _createCommandWindow() {
      this.cmdWindow = new AlphaNET.LIBS.Window_IpConfig();
      this.cmdWindow.setHandler('cancel', this.popScene.bind(this));
      this.cmdWindow.setHandler('ip', this._ipCommand.bind(this));
      this.cmdWindow.setHandler('port', this._portCommand.bind(this));
      return this.addChild(this.cmdWindow);
    }

    _ipCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("ip");
    }

    _portCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("port");
    }

    _createInputWindow() {
      this.input = new AlphaNET.LIBS.Window_IpInput();
      this.input.setHandler('cancel', this._onInputCancel.bind(this));
      this.input.setHandler('ok', this._onInputOk.bind(this));
      return this.addChild(this.input);
    }

    _onInputOk() {
      this.input.saveTextData();
      return this._onInputCancel();
    }

    _onInputCancel() {
      this.cmdWindow.open();
      this.cmdWindow.activate();
      this.input.close();
      return this.input.deactivate();
    }

    terminate() {
      super.terminate();
      return SMouse.setTrack(false);
    }

  };
  AlphaNET.register(Scene_IpConfig);
})();

// ■ END Scene_IpConfig.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _alias_Scene_Map_start.call(this, ...arguments);
        Network.sendIcon(null);
    };

    //@[ALIAS]
    var _alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        _alias_Scene_Map_onMapLoaded.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode()) {
            Network.myPlayerData.mapId = $gameMap.mapId();
            Network._isMapOwner = false;
            NetPartyManager.synchronizeMapData();
            NetMessage.RequestPlayerData().send();
            NetMessage.RequestGameMapEventsData().send($gameMap.mapId());
            NetMessage.PlayerChangeMap().send($gameMap.mapId());
        }
        SMouse.initMouseTrack(true);
        NetUIManager.init(this);
    };

    //TODO: Temp solution with Mouse interact to call PvP
    //@[ALIAS]
    var _alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        if (NetUIManager.isSomethingUnderCursor()) {
            //* Если какой-либо UI элемент был курсором, игрок не передвигается
            return;
        }
        if(Network.isConnected() && Network.isMultiMode()) {
            if (TouchInput.isTriggered()) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                var dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, x, y);
                if (dist == 1) {
                    if ($gamePlayer.followers().getNetworkPlayerOnPosition(x, y)) {
                        if($gamePlayer._checkPvPStartTrigger());
                            return;
                    } 
                }
            }
            _alias_Scene_Map_processMapTouch.call(this);
            return;
        } else
            _alias_Scene_Map_processMapTouch.call(this);
        
    };

    //@[ALIAS]
    var _alias_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _alias_Scene_Map_update.call(this, ...arguments);
        NetUIManager.update();
    };

    //@[ALIAS]
    var _alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        _alias_Scene_Map_terminate.call(this, ...arguments);
        NetUIManager.terminate();
    };
})();
// ■ END Scene_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Scene_Map.prototype;
})();

// ■ END Scene_Map_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function () {
        _alias_Scene_Menu_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_MENU);
    };
})();
// ■ END Scene_Menu.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Scene_MenuBase.prototype.refreshNetwork = function () {
        try {
            this.updateActor();
            if(this._windowLayer == null)
                return;
            var childs = this._windowLayer.children;
            for(var i = 0; i<childs.length; i++) {
                var child = childs[i];
                if(child != null && child.refresh != null) {
                    child.refresh();
                }
            }
        } catch (e) {
            AlphaNET.error(e, 'while try refresh MenuBased scene from Network');
        }
    };
})();
// ■ END Scene_MenuBase.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Options.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        _alias_Window_Options_makeCommandList.call(this, ...arguments);
        this.addCommand('Network', 'network');
    };

    //@[ALIAS]
    var _alias_Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        if (this._isNetworkCommand(index)) {
            if(Network != null)
                return Network.ip + ":" + Network.port;
            else
                return "";
        } else
            return _alias_Window_Options_statusText.call(this, ...arguments);
    };

    //?[NEW]
    Window_Options.prototype._isNetworkCommand = function (index) {
        return this.commandName(index).contains('Network');
    };

    //@[ALIAS]
    var _alias_Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        if(this._isNetworkCommand(this.index())) {
            SoundManager.playCursor();
            SceneManager.push(AlphaNET.LIBS.Scene_IpConfig);
        } else {
            _alias_Window_Options_processOk.call(this, ...arguments);
        }
    };
})();
// ■ END Scene_Options.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Shop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Shop_start = Scene_Shop.prototype.start;
    Scene_Shop.prototype.start = function () {
        _alias_Scene_Shop_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_SHOP);
    };
})();
// ■ END Scene_Shop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

})();
// ■ END Scene_Status.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    SceneManager.isCurrentSceneIsMap = function () {
        return (this._scene != null && this._scene instanceof Scene_Map);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsBattle = function () {
        return (this._scene != null && this._scene instanceof Scene_Battle);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsMenuBased = function () {
        return (this._scene != null && this._scene instanceof Scene_MenuBase);
    };

    //?[NEW]
    SceneManager.safeRefreshCurrentScene = function () {
        try {
            if (this._scene.refresh != null)
                this._scene.refresh();
            if (this._scene.refreshNetwork != null)
                this._scene.refreshNetwork();
            if (this._scene.refreshActor != null)
                this._scene.refreshActor();
        } catch (error) {
            AlphaNET.error(error, 'while try refresh current game scene');
        }
    };
})();
// ■ END Scene_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

// Generated by CoffeeScript 2.3.1
ANET.printVersionInfo = function() {
  return ANET.print(ANET.Version + " [Pro] build " + ANET.Build + " on MV " + Utils.RPGMAKER_VERSION);
};

ANET.loadFonts = function() {
  var e;
  try {
    if (Utils.isNwjs()) {
      return FontLoadManager.initAndLoadAll();
    }
  } catch (error) {
    e = error;
    return ANET.warning('Font Load Manager', e);
  }
};

ANET.isPro = function() {
  return true;
};

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SMouse.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//@[GLOBAL DEFINITION]

var __SmouseNeedTrack = false;
var __SmousePosition = null;

function SMouse() {
    throw new Error('This is a static class');
}

SMouse.initMouseTrack = function (isSet) {
    document.onmousemove = SMouse.handleMouseMove;
    __SmouseNeedTrack = false;
    __SmousePosition = PointX.Empty;
    if (isSet == true) {
        SMouse.setTrack(true);
    }
};

SMouse.setTrack = function (isSet) {
    __SmouseNeedTrack = isSet;
    if (isSet) this.handleMouseMove(null);
};

SMouse.isTracked = function () {
    return (__SmouseNeedTrack == true);
};

SMouse.handleMouseMoveCanvas = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    __SmousePosition = new PointX(evt.clientX - rect.left, evt.clientY - rect.top);
};

SMouse.handleMouseMove = function (event) {
    if (!__SmouseNeedTrack) return;

    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (!event) return;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    __SmousePosition = new PointX(event.pageX, event.pageY);
    __SmousePosition = __SmousePosition.convertToCanvas();
};

SMouse.getMousePosition = function () {
    if (!Utils.isMobileDevice())
        return __SmousePosition;
    else
        return PointX.Empty;
};

// ■ END SMouse.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon;
    Sprite_Character.prototype.updateBalloon = function () {
        _alias_Sprite_Character_updateBalloon.call(this, ...arguments);
        this._setupNetworkIcon();
        this._setupNetworkName();
        if (this._networkIconSprite) {
            this._networkIconSprite.x = this.x;
            this._networkIconSprite.y = this.y - this.height;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkIcon = function () {
        var iconId = this._character.networkIconId();
        if (iconId == -1) {
            this._endNetworkIcon();
        }
        if (iconId > 0) {
            this._startNetworkIcon();
            this._character._startNetworkIcon();
        }
    };

    //?[NEW]
    Sprite_Character.prototype._startNetworkIcon = function () {
        if (!this._networkIconSprite) {
            this._networkIconSprite = new AlphaNET.LIBS.Sprite_NetStatusIcon();
        }
        this._networkIconSprite.setup(this._character.networkIconId());
        this.parent.addChild(this._networkIconSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._endNetworkIcon = function () {
        if (this._networkIconSprite) {
            this.parent.removeChild(this._networkIconSprite);
            this._networkIconSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkName = function () {
        if(!Network.isConnected()) return;
        if (AlphaNET.Parameters.get_ShowNameplatesMode() == 0) return;
        if (this._character.getNetworkName() == null){
            this._destroyNetworkName();
            return;
        } 
        if(!this._networkNameSprite) {
            this._createNetworkName();
        }
        this._refreshNetworkName();
    };

    //?[NEW]
    Sprite_Character.prototype._destroyNetworkName = function () {
        if (this._networkNameSprite) {
            "DESTROY NAME".p();
            this.parent.removeChild(this._networkNameSprite);
            this._networkNameSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._createNetworkName = function () {
        this._networkNameSprite = new AlphaNET.LIBS.Sprite_NetCharName();
        this._networkNameSprite.setCharacter(this._character);
        this.parent.addChild(this._networkNameSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._refreshNetworkName = function () {
        this._networkNameSprite.visible = (this._networkIconSprite == null);
        if(this._networkNameSprite.visible == true)
            this._networkNameSprite.visible = !this._character.isTransparent();
        this._networkNameSprite.x = this.x;
        this._networkNameSprite.y = this.y - this.height;
    };

    //?[NEW]
    Sprite_Character.prototype.refreshForNetwork = function () {
        this._destroyNetworkName(); // * Обновляем Nameplate
    };
})();
// ■ END Sprite_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetCharName.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetCharName;
  Sprite_NetCharName = class Sprite_NetCharName extends Sprite {
    constructor() {
      super();
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this.z = 12;
    }

    setCharacter(character) {
      this.character = character;
      this._setupStyle();
      this._createBitmap();
      this._drawBackGround();
      this._drawPicture();
      return this._drawName();
    }

    _setupStyle() {
      var charStyleId, style;
      charStyleId = this.character.getNetworkNameStyleId();
      if (charStyleId != null) {
        style = ANJsonSettings.getNamePlateDataForId(charStyleId);
      } else {
        style = null;
      }
      return this._loadStyle(style);
    }

    _loadStyle(style) {
      if (style == null) {
        style = this._getDefaultData();
      }
      return this._style = style;
    }

    _createBitmap() {
      return this.bitmap = new Bitmap(this._style.width, this._style.height);
    }

    _drawBackGround() {
      var colorA, colorB;
      try {
        if (this._style.backgroundColor == null) {
          return;
        }
        colorA = KDCore.Color.FromHex(this._style.backgroundColor.colorA);
        colorB = KDCore.Color.FromHex(this._style.backgroundColor.colorB);
        if (colorA == null) {
          colorA = KDCore.Color.BLACK;
        }
        if (colorB == null) {
          colorB = colorA;
        }
        colorA = colorA.reAlpha(this._style.backgroundColorOpacity);
        colorB = colorB.reAlpha(this._style.backgroundColorOpacity);
        return this.bitmap.gradientFillRect(0, 0, this.width, this.height, colorA.CSS, colorB.CSS, true);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background color");
      }
    }

    _drawPicture() {
      var pic;
      if (this._style.backPicture == null) {
        return;
      }
      try {
        pic = new Sprite(ImageManager.loadPicture(this._style.backPicture));
        pic.anchor.x = 0.5;
        pic.anchor.y = 1;
        return this.addChild(pic);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background Picture");
      }
    }

    _drawName() {
      var name, text;
      name = this.character.getNetworkName();
      text = new Sprite(new Bitmap(this.width, this.height));
      this._setupText(text.bitmap);
      text.bitmap.drawText(name, 0, this.height / 2, this.width, 1, 'center');
      text.anchor.x = 0.5;
      text.anchor.y = 1;
      return this.addChild(text);
    }

    _setupText(bitmap) {
      try {
        bitmap.fontSize = this._style.textSize;
        if ((this._style.textColor != null)) {
          bitmap.textColor = KDCore.Color.FromHex(this._style.textColor).CSS;
        }
        if ((this._style.textOutColor != null)) {
          bitmap.outlineColor = KDCore.Color.FromHex(this._style.textOutColor).CSS;
        }
        bitmap.outlineWidth = this._style.textOutWidth;
        if (this._style.textFont != null) {
          bitmap.fontFace = this._style.textFont;
        }
        return bitmap.fontItalic = this._style.textItalic;
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name Text settings");
      }
    }

    _getDefaultData() {
      return {
        backgroundColor: {
          colorA: "#000000",
          colorB: "#000000"
        },
        backgroundColorOpacity: 100,
        backPicture: null,
        width: 54,
        height: 18,
        textSize: 12,
        textFont: null,
        textColor: null,
        textOutColor: null,
        textOutWidth: 3,
        textItalic: false
      };
    }

  };
  AlphaNET.register(Sprite_NetCharName);
})();

// ■ END Sprite_NetCharName.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetStatusIcon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetStatusIcon;
  Sprite_NetStatusIcon = class Sprite_NetStatusIcon extends Sprite_Balloon {
    constructor() {
      super();
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadNetwork('StateIcons');
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      this._balloonId = iconId;
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    update() {
      super.update();
      if (this._duration <= 0) {
        this._firstStep = true;
        return this.setup(this._balloonId);
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

  };
  AlphaNET.register(Sprite_NetStatusIcon);
})();

// ■ END Sprite_NetStatusIcon.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AXUI_Container.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[PART OF Alpha ABS AXUI]
(function() {
  var UIContainer;
  UIContainer = class UIContainer extends Sprite {
    constructor(size) {
      super(new Bitmap(size, size));
      this.size = size;
      this.items = [];
      this.orientation = "horizontal";
      this.placePoint = "rigth";
      this.itemsCount = 1;
      this.spacing = 0;
      this.move(100, 100);
    }

    //?{PUBLIC}
    setItemsCount(itemsCount) {
      this.itemsCount = itemsCount;
      return this._refreshMain();
    }

    _refreshMain() {
      var s;
      s = this._getSize() * this.itemsCount;
      this.bitmap = new Bitmap(s, s);
      this._rearrange();
      return this._refreshPlace();
    }

    _getSize() {
      return this.size + this.spacing;
    }

    //?{PUBLIC}
    setSpacing(spacing) {
      this.spacing = spacing;
      return this._refreshMain();
    }

    //?{PUBLIC}
    addChild(sprite) {
      this._createItem(sprite);
      this._rearrange();
      return this._refreshPlace();
    }

    _createItem(sprite) {
      this._reCreatePlacer(sprite.visible);
      this.items.push(sprite);
      return this._placer.addChild(sprite);
    }

    _reCreatePlacer(isNew) {
      var pl, s, visLen;
      if (this._placer != null) {
        super.removeChild(this._placer);
      }
      visLen = this._visItemsLength();
      if (isNew === true) {
        visLen += 1;
      }
      s = this._getSize() * visLen;
      s -= this.spacing;
      this._placer = new Sprite(new Bitmap(s, s));
      super.addChild(this._placer);
      pl = this._placer;
      this.items.forEach(function(item) {
        if (item.visible === true) {
          return pl.addChild(item);
        }
      });
    }

    _visItemsLength() {
      var count, i, j, ref;
      count = 0;
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        if (this.items[i].visible === true) {
          count++;
        }
      }
      return count;
    }

    _rearrange() {
      var ref, ref1;
      if (this._placer == null) {
        return;
      }
      if ((ref = this._placer.children[0]) != null) {
        ref.x = 0;
      }
      if ((ref1 = this._placer.children[0]) != null) {
        ref1.y = 0;
      }
      if (this.isVertical()) {
        return this._rearrangeVertical();
      } else {
        return this._rearrangeHorizontal();
      }
    }

    _rearrangeVertical() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].y = items[0].y + (s * i));
      }
      return results;
    }

    _rearrangeHorizontal() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].x = items[0].x + (s * i));
      }
      return results;
    }

    _refreshPlace() {
      if (this._placer == null) {
        return;
      }
      if (this.isVertical()) {
        return this._refreshPlaceVertical();
      } else {
        return this._refreshPlaceHorizontal();
      }
    }

    _refreshPlaceVertical() {
      if (this.placePoint === "center") {
        this._placer.y = this.height / 2;
        this._placer.y = this._placer.y - (this._placer.height / 2);
      }
      if (this.placePoint === "left") {
        this._placer.y = this.height;
        return this._placer.y = this._placer.y - this._placer.height;
      }
    }

    _refreshPlaceHorizontal() {
      if (this.placePoint === "center") {
        this._placer.x = this.width / 2;
        this._placer.x = this._placer.x - (this._placer.width / 2);
      }
      if (this.placePoint === "left") {
        this._placer.x = this.width;
        return this._placer.x = this._placer.x - this._placer.width;
      }
    }

    //?{PUBLIC}
    refresh() {
      this._reCreatePlacer(false);
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    setHorizontal() {
      this.orientation = "horizontal";
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    isHorizontal() {
      return this.orientation === "horizontal";
    }

    //?{PUBLIC}
    setVertical() {
      this.orientation = "vertical";
      this._rearrange();
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    isVertical() {
      return this.isHorizontal() === false;
    }

    
    //?{PUBLIC}
    setPivotToCenter() {
      this.placePoint = "center";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToLeft() {
      this.placePoint = "left";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToRight() {
      this.placePoint = "right";
      return this._refreshPlace();
    }

  };
  AlphaNET.register(UIContainer);
})();

// ■ END AXUI_Container.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetwork.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetwork;
  Sprite_WaitNetwork = (function() {
    class Sprite_WaitNetwork extends Sprite {
      constructor() {
        super(new Bitmap(Graphics.width, Sprite_WaitNetwork.HEIGHT));
        this._waitId = 0;
        this._stepper = 0;
        this.move(0, (Graphics.height / 2) - Sprite_WaitNetwork.HEIGHT / 2);
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate(waitId) {
        this.bitmap.clear();
        this._waitId = waitId;
        this.visible = true;
        return this._drawMain();
      }

      //@_startThread()
      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix, text;
        this.bitmap.clear();
        this.bitmap.fontSize = 38;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.fillAll(Sprite_WaitNetwork.colorA);
        text = this._getText();
        prefix = ''; //@_getPrefix()
        return this.bitmap.drawText(text + prefix, 0, Sprite_WaitNetwork.HEIGHT / 2, Graphics.width, 1, 'center');
      }

      _getText() {
        if (this._waitId === Network.WAIT_PLAYER) {
          return 'Waiting players';
        }
        return 'Waiting server';
      }

      _getPrefix() {
        var i, j, prefix, ref;
        prefix = "";
        this._stepper += 1;
        for (i = j = 0, ref = this._stepper; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          prefix += '.';
        }
        if (this._stepper > 2) {
          this._stepper = 0;
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 200);
      }

    };

    Sprite_WaitNetwork.HEIGHT = 100;

    Sprite_WaitNetwork.colorA = KDCore.Color.BLACK.reAlpha(100);

    return Sprite_WaitNetwork;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetwork);
})();

// ■ END Sprite_WaitNetwork.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetworkMini.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetworkMini;
  Sprite_WaitNetworkMini = (function() {
    class Sprite_WaitNetworkMini extends Sprite {
      constructor() {
        super(new Bitmap(Sprite_WaitNetworkMini.WIDTH, Sprite_WaitNetworkMini.HEIGHT));
        this._stepper = false;
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate() {
        this.bitmap.clear();
        this.visible = true;
        return this._startThread();
      }

      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix;
        this.bitmap.clear();
        this.bitmap.fontSize = 12;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.gradientFillRect(0, 0, Sprite_WaitNetworkMini.WIDTH, 20, Sprite_WaitNetworkMini.colorA.CSS, Sprite_WaitNetworkMini.colorB.CSS, false);
        prefix = this._getPrefix();
        return this.bitmap.drawText('NetSync ' + prefix, 2, 10, Sprite_WaitNetworkMini.WIDTH, 1, 'center');
      }

      _getPrefix() {
        var prefix;
        prefix = "\\";
        this._stepper = !this._stepper;
        if (this._stepper === true) {
          prefix = "/";
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 400);
      }

    };

    Sprite_WaitNetworkMini.WIDTH = 90;

    Sprite_WaitNetworkMini.HEIGHT = 20;

    Sprite_WaitNetworkMini.colorA = KDCore.Color.BLACK.reAlpha(180);

    Sprite_WaitNetworkMini.colorB = KDCore.Color.NONE;

    return Sprite_WaitNetworkMini;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetworkMini);
})();

// ■ END Sprite_WaitNetworkMini.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ XButton.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//?VERSION 1.2
(function() {
  var Sprite_XButton;
  Sprite_XButton = class Sprite_XButton extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return Sprite_Button.prototype.isActive.call(this);
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      return this.refreshEnDisState();
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this._cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    _cursorInButton() {
      var m;
      m = __SmousePosition;
      if (m != null) {
        return this.xyInButton(m.x, m.y);
      } else {
        return false;
      }
    }

    xyInButton(x, y) {
      var inRect, rx, ry;
      rx = Sprite_Button.prototype.canvasToLocalX.call(this, x);
      ry = Sprite_Button.prototype.canvasToLocalY.call(this, y);
      inRect = rx >= 0 && ry >= 0 && rx < this._realWidth() && ry < this._realHeight();
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(rx, ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel === 255;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new PointX(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warning('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warning('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        return this.applyDisableState();
      } else {
        return this.applyNormalState();
      }
    }

    updateComplexTextVisible() {}

    drawStyledTextOnButton(text, w, h, style) {
      this._styledText = AASprite.FromBitmap(w, h);
      this._styledText.applyTextSettingsByExtraSettings(this._styledText, style);
      this._styledText.drawTextFull(text, style.position);
      return this.addChild(this._styledText);
    }

  };
  AlphaNET.register(Sprite_XButton);
})();

// ■ END XButton.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatLine.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatLine;
  SpriteChatLine = class SpriteChatLine extends AASprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._createChannelText();
      this._createNameText();
      return this._createText();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[2];
      return this.S = this.settings;
    }

    _createBackground() {
      this._background = AASprite.FromBitmap(this.S.chatLineWidth, this.S.chatLineHeight);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.S.background.color));
      this._background.opacity = this.S.background.opacity;
      return this.addChild(this._background);
    }

    _createChannelText() {
      this._channel = AASprite.FromBitmap(this.S.channelText.textZoneWidth, this.S.channelText.textZoneHeight);
      this.applyTextSettingsByExtraSettings(this._channel, this.S.channelText);
      return this.addChild(this._channel);
    }

    _createNameText() {
      this._name = AASprite.FromBitmap(this.S.nameText.textZoneWidth, this.S.nameText.textZoneHeight);
      this.applyTextSettingsByExtraSettings(this._name, this.S.nameText);
      return this.addChild(this._name);
    }

    _createText() {
      this._textSpr = AASprite.FromBitmap(this.S.text.textZoneWidth, this.S.text.textZoneHeight);
      this.applyTextSettingsByJson(this._textSpr, this.S);
      return this.addChild(this._textSpr);
    }

    drawName(text, color) {
      if (!this._name) {
        return;
      }
      this._name.bitmap.clear();
      if (color != null) {
        this._name.bitmap.textColor = color;
      }
      return this._name.bitmap.drawTextFull(text, this.S.nameText.position);
    }

    drawChannel(text, color) {
      if (this._channel == null) {
        return;
      }
      this._channel.bitmap.clear();
      if (color != null) {
        this._channel.bitmap.textColor = color;
      }
      return this._channel.bitmap.drawTextFull('[' + text + ']', this.S.channelText.position);
    }

    drawText(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.bitmap.clear();
      return this._textSpr.bitmap.drawTextFull(text, this.S.text.position);
    }

    moveTo(dx) {
      this._needMove = dx;
      return this.move(-this.S.chatLineWidth, this.y);
    }

    moveUp(dy) {
      return this.move(this.x, this.y - dy);
    }

    changeBackOpacity() {
      return this._background.opacity = this.S.background.opacityInQueue;
    }

    update() {
      super.update();
      if (this._needMove != null) {
        this.x += 10;
        if (this.x >= this._needMove) {
          this.x = this._needMove;
          return this._needMove = null;
        }
      }
    }

  };
  AlphaNET.register(SpriteChatLine);
})();

// ■ END SpriteChatLine.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatMain.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatMain;
  SpriteChatMain = class SpriteChatMain extends AASprite {
    constructor() {
      super();
      this._isOpen = false;
      this._inOpenMode = false;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createMovable();
      this._createBackground();
      this._createContent();
      this._createShowButton();
      this._createSayButton();
      this._createBorder();
      return this.moveByJson(this.settings);
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[0];
      this.S = this.settings;
      return this._hideDX = this.settings.lineStartPositionX;
    }

    _createMovable() {
      this._movableSprite = new Sprite();
      this._movableSprite.move(this._hideDX, 0);
      return this.addChild(this._movableSprite);
    }

    _createBackground() {
      this._background = AASprite.FromBitmap(this.S.background.width, this.S.background.heigth);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.S.background.color));
      this._background.opacity = this.S.background.opacity;
      return this._movableSprite.addChild(this._background);
    }

    _createContent() {
      this._chatContent = new Sprite();
      this._chatContent.visible = false;
      return this._movableSprite.addChild(this._chatContent);
    }

    _createShowButton() {
      var _s, img0, img1, img2;
      _s = this.S.buttons.showChatButton;
      this._showBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(_s.mainImg);
      img1 = ImageManager.loadNetwork(_s.hoverImg);
      img2 = ImageManager.loadNetwork(_s.pressedImg);
      this._showBtn.setButtonImages(img0, img1, img2);
      this._showBtn.move(_s.marginX, _s.marginY);
      this._showBtn.addClickHandler(this._showButtonClick.bind(this));
      return this._movableSprite.addChild(this._showBtn);
    }

    _createSayButton() {
      var _s, img0, img1, img2;
      _s = this.S.buttons.sayButton;
      this._sayBtn = new AlphaNET.LIBS.Sprite_XButton();
      img0 = ImageManager.loadNetwork(_s.mainImg);
      img1 = ImageManager.loadNetwork(_s.hoverImg);
      img2 = ImageManager.loadNetwork(_s.pressedImg);
      this._sayBtn.setButtonImages(img0, img1, img2);
      this._sayBtn.move(_s.marginX, _s.marginY);
      this._sayBtn.addClickHandler(function() {
        return SceneManager.push(ANET.LIBS.Scene_ChatInput);
      });
      return this._movableSprite.addChild(this._sayBtn);
    }

    _createBorder() {
      this._chatBorder = new AlphaNET.LIBS.SpriteChatMini();
      return this.addChild(this._chatBorder);
    }

    _showButtonClick() {
      if (this.isOpen()) {
        return this.close();
      } else {
        return this.open();
      }
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      if (this.isAnimated()) {
        return;
      }
      this._chatContent.visible = true;
      this.drawNotify(0);
      this.hideNotify();
      this._inOpenMode = true;
      this._tempObject = { // * Так как ValueSwing не умеет работать с отрицательными числами (TODO: ИСПРАВИТЬ!)
        x: Math.abs(this._movableSprite.x)
      };
      this._animator = new AlphaNET.LIBS.ValueSwing(this._tempObject, "x", 30);
      return this._animator.start();
    }

    drawNotify(text = '0') {
      return this._chatBorder.drawText(text);
    }

    hideNotify() {
      return this._chatBorder.hideNotify();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      if (this.isAnimated()) {
        return;
      }
      this._movableSprite.opacity = 255;
      this.drawNotify(0);
      this._inOpenMode = false;
      this._tempObject = {
        x: Math.abs(this._hideDX)
      };
      this._animator = new AlphaNET.LIBS.ValueSwing(this._tempObject, "x", 30);
      this._animator.setIncrementMode();
      return this._animator.start();
    }

    isAnimated() {
      return this._animator != null;
    }

    isOpen() {
      return this._isOpen === true;
    }

    isUnderTouch() {
      return this._background.inPosition(TouchInput) || this._chatBorder.isUnderTouch(TouchInput) || this._sayBtn.touchInButton() || this._showBtn.touchInButton();
    }

    update() {
      super.update();
      this._updateAnimator();
      if (this.isOpen()) {
        return this._updateOpacityChange();
      }
    }

    _updateAnimator() {
      if (this._animator != null) {
        this._movableSprite.x = 0 - this._tempObject.x;
        this._animator.update();
        if (this._animator.isReady()) {
          this._animator = null;
          return this._resetAfterAnimation();
        }
      }
    }

    _resetAfterAnimation() {
      if (this._inOpenMode === true) {
        this._movableSprite.x = 0;
        return this._isOpen = true;
      } else {
        this._chatBorder.showNofity();
        this._movableSprite.x = this._hideDX;
        this._isOpen = false;
        this._chatContent.visible = false;
        return this._movableSprite.opacity = 255;
      }
    }

    _updateOpacityChange() {
      var pos;
      if (this.isAnimated()) {
        return;
      }
      pos = __SmousePosition;
      if (this._background.inPosition(pos)) {
        this._isHovered = true;
        return this._createOpacitySwing();
      } else {
        if (this._isHovered === true) {
          return this._createOpacitySwing2();
        }
      }
    }

    _createOpacitySwing() {
      if (this._movableSprite.opacity < 255) {
        return this._movableSprite.opacity += 4;
      }
    }

    _createOpacitySwing2() {
      if (this._movableSprite.opacity > this.S.unhoveredChatOpacity) {
        this._movableSprite.opacity -= 4;
      }
      if (this._movableSprite.opacity <= this.S.unhoveredChatOpacity) {
        return this._isHovered === false;
      }
    }

    addChatLine(chatLine) {
      var ref;
      return (ref = this._chatContent) != null ? ref.addChild(chatLine) : void 0;
    }

    removeLine(chatLine) {
      var ref;
      return (ref = this._chatContent) != null ? ref.removeChild(chatLine) : void 0;
    }

  };
  AlphaNET.register(SpriteChatMain);
})();

// ■ END SpriteChatMain.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteChatMini.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteChatMini;
  SpriteChatMini = class SpriteChatMini extends AASprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createMainSprite();
      this._createNotifyCircle();
      return this._createNotifyText();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[1];
      return this.S = this.settings;
    }

    _createMainSprite() {
      this._border = AASprite.FromImg(this.settings.miniBorderImage);
      this.addChild(this._border);
      return this._border.move(this.S.miniBorderMarginX, this.S.miniBorderMarginY);
    }

    _createNotifyCircle() {
      this._notifyIcon = AASprite.FromImg(this.settings.notifyIconImage);
      this.addChild(this._notifyIcon);
      return this._notifyIcon.move(this.S.notifyIconMarginX, this.S.notifyIconMarginY);
    }

    _createNotifyText() {
      this._textSpr = AASprite.FromBitmap(this.S.text.textZoneWidth, this.S.text.textZoneHeight);
      this.applyTextSettingsByJson(this._textSpr, this.settings);
      this._notifyIcon.addChild(this._textSpr);
      return this.drawText('0');
    }

    drawText(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.bitmap.clear();
      return this._textSpr.bitmap.drawTextFull(text, this.S.text.position);
    }

    hideNotify() {
      return this._notifyIcon.visible = false;
    }

    showNofity() {
      return this._notifyIcon.visible = true;
    }

    isUnderTouch(point) {
      return this._border.inPosition(point);
    }

  };
  AlphaNET.register(SpriteChatMini);
})();

// ■ END SpriteChatMini.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _alias_Spriteset_Map_update.call(this, ...arguments);
        this._updateNetworkRefreshRequest();
    };

    //?[NEW]
    Spriteset_Map.prototype._updateNetworkRefreshRequest = function () {
        if ($gameMap.isSpritesRefreshRequestedForNetwork()) {
            $gameMap.spritesRefreshForNetworkComplete();
            "REFRESH SPRITEST".p();
            for (var i = 0; i < this._characterSprites.length; i++) {
                var sprite = this._characterSprites[i];
                if (sprite != null) {
                    sprite.refreshForNetwork();
                }
            }
        }
    };
})();
// ■ END Spriteset_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
var TEMP_ChatExample;

TEMP_ChatExample = class TEMP_ChatExample {
  constructor(chatMainSprite) {
    this.chatMainSprite = chatMainSprite;
    this.posX = 8;
    this.posY = 136;
    this.lines = [];
  }

  addLine(channel, name, text) {
    var chatLine;
    chatLine = new AlphaNET.LIBS.SpriteChatLine();
    chatLine.drawChannel(channel);
    chatLine.drawName(name);
    chatLine.drawText(text);
    chatLine.move(-300, this.posY);
    this.chatMainSprite.addChatLine(chatLine);
    this.lines.forEach(function(item) {
      return item.moveUp(18);
    });
    chatLine.moveTo(this.posX);
    this.lines.push(chatLine);
    if (this.lines.length % 2 === 0) {
      return chatLine.changeBackOpacity();
    }
  }

  addTestLine1() {
    return this.addLine('ALL', 'Lucius', 'Sed ut perspiciatis, unde omnis iste');
  }

  addTestLine2() {
    return this.addLine('MAP', 'Therese', 'Hello?');
  }

  addTestLine3() {
    return this.addLine('MAP', 'Marsha', 'Nam libero tempore, sum soluta');
  }

  addTestLine4() {
    return this.addLine('ALL', 'Harold', 'Where i can buy something?');
  }

  addTestLine5() {
    return this.addLine('MAP', 'Therese', 'quos dolores et quas molestias excepturi');
  }

  test() {
    if (this._runned === true) {
      this.test3();
      this._runned = false;
      return;
    }
    this._runned = true;
    setTimeout((() => {
      return this.addTestLine1();
    }), 500);
    setTimeout((() => {
      return this.addTestLine2();
    }), 1200);
    setTimeout((() => {
      return "test2 soon".p();
    }), 2000);
    return setTimeout((() => {
      return this.test2();
    }), 2500);
  }

  test2() {
    "TEST 2".p();
    setTimeout((() => {
      return this.addTestLine3();
    }), 500);
    setTimeout((() => {
      return this.addTestLine4();
    }), 1200);
    setTimeout((function() {
      return "TEST 3 soon!!!!! MOUSE OVER!!".p();
    }), 3800);
    return setTimeout((() => {
      return this.test3();
    }), 4500);
  }

  test3() {
    return this.addTestLine5();
  }

};

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ User API.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL DEFINITION]
var uAPI;

uAPI = function() {
  throw new Error("This is a static class");
};

uAPI.showMessageInChat = function(actorId, message, channelId = 0) {
  var msg;
  msg = {
    channelId: channelId,
    text: message
  };
  return Network._onNewChatMessage(actorId, msg);
};

uAPI.sendMessageToChat = function(message, channelId = 0) {
  return Network.sendChatMessage(message, channelId);
};

//?[SYNCED]
uAPI.setNameplateStyle = function(actorId, styleId) {
  var data;
  if (uAPI._setNameplateStyle(...arguments)) {
    data = {
      name: "_setNameplateStyle",
      parameters: [actorId, styleId]
    };
    Network.sendMessage(NetMessage.CallUApi().setData(data));
  }
};

//?{PRIVATE OUTER PAIR}
uAPI._setNameplateStyle = function(actorId, styleId) {
  var actor;
  try {
    actor = $gameActors.actor(actorId);
    if (actor == null) {
      return;
    }
    actor._networkNameplateStyleId = styleId;
    $gameMap.requestNetworkRefresh();
    return true;
  } catch (error) {
    AlphaNET.warning('uAPI.setNameplateStyle : something wrong!');
  }
  return false;
};

Object.defineProperties(uAPI, {
  isPvPWin: {
    get: function() {
      return Network.isPvPBattleWin();
    }
  },
  isPvPLoose: {
    get: function() {
      return Network.isPvPBattleLoose();
    }
  },
  hideChat: {
    get: function() {
      return NetUIManager.hideChat();
    }
  },
  showChat: {
    get: function() {
      return NetUIManager.showChat();
    }
  }
});

(Object.freeze || Object)(uAPI);

// ■ END User API.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ValueSwing.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ValueSwing;
  ValueSwing = class ValueSwing {
    constructor(swingObject, fieldName, time) {
      this.swingObject = swingObject;
      this.fieldName = fieldName;
      this.mode = 1;
      this._repeat = false;
      this._ready = false;
      this._started = false;
      this._config = {
        start: this.getValue(),
        step: this.getValue() / time
      };
      this._refreshConfig();
    }

    getValue() {
      return this.swingObject[this.fieldName];
    }

    _refreshConfig() {
      if (this.isIncrement()) {
        this._config.toValue = this._config.start;
        this._config.fromValue = 0;
      } else {
        this._config.toValue = 0;
        this._config.fromValue = this._config.start;
      }
      return this.setValue(this._config.fromValue);
    }

    isIncrement() {
      return this.mode === 0;
    }

    setValue(value) {
      return this.swingObject[this.fieldName] = value;
    }

    start() {
      this._ready = false;
      return this._started = true;
    }

    reset() {
      this._ready = true;
      return this.setValue(this._config.start);
    }

    stop() {
      return this._started = false;
    }

    isStarted() {
      return this._started === true;
    }

    isReady() {
      return this._ready === true;
    }

    setIncrementMode() {
      this.mode = 0;
      this.stop();
      return this._refreshConfig();
    }

    setDecrementMode() {
      this.mode = 1;
      this.stop();
      return this._refreshConfig();
    }

    setRepeat() {
      return this._repeat = true;
    }

    update() {
      if (!this.isStarted()) {
        return;
      }
      if (this.isIncrement()) {
        this._updateIncr();
      } else {
        this._updateDecr();
      }
      if (this.isReady() && this._repeat === true) {
        return this._changeMode();
      }
    }

    _updateIncr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v < this._config.toValue - this._config.step) {
        return this.setValue(v + this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _swingDone() {
      this.setValue(this._config.toValue);
      return this._ready = true;
    }

    _updateDecr() {
      var v;
      if (this.isReady()) {
        return;
      }
      v = this.getValue();
      if (v > this._config.toValue + this._config.step) {
        return this.setValue(v - this._config.step);
      } else {
        return this._swingDone();
      }
    }

    _changeMode() {
      if (this.isIncrement()) {
        this.setDecrementMode();
      } else {
        this.setIncrementMode();
      }
      return this.start();
    }

  };
  AlphaNET.register(ValueSwing);
})();

// ■ END ValueSwing.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChatInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_ChatInput;
  Window_ChatInput = class Window_ChatInput extends Window_Base {
    constructor(x, y, w, h) {
      super(x, y, w, h);
      this._loadSettings();
      this.setBackgroundType(2);
      this._createInputBackground();
      this._createInputLine();
    }

    _loadSettings() {
      this.settings = ANJsonSettings.getChatSettings()[4];
      this.S = this.settings;
      return this.maxTextLength = this.settings.maxInputTextLength;
    }

    _createInputBackground() {
      this._background = AASprite.FromImg(this.S.backgroundImage);
      this._background.move(this.S.marginX, this.S.marginY);
      return this.addChild(this._background);
    }

    _createInputLine() {
      this.sprText = AASprite.FromBitmap(this.S.inputText.textZoneWidth, this.S.inputText.textZoneHeight);
      this.sprText.applyTextSettingsByExtraSettings(this.sprText, this.S.inputText);
      this.addChild(this.sprText);
      this._inputText = "";
      return this._printText();
    }

    _printText() {
      var add;
      this.sprText.bitmap.clear();
      add = "";
      if (this._isCanAddSymbol()) {
        add = "_";
      }
      return this.sprText.bitmap.drawTextFull(this._inputText + add, 'left');
    }

    _isCanAddSymbol() {
      return this._inputText.length < this.maxTextLength;
    }

    update() {
      var key;
      super.update();
      if (Input.isTriggered('space')) {
        this._printSymbol(" ");
      }
      if (Input.isTriggered('Backspace') || Input.isLongPressed('Backspace')) {
        this._deleteSymbol();
      }
      key = Input.isAnyTriggered() || Input.isAnyLongPressed();
      if (key != null) {
        return this._printSymbol(key);
      }
    }

    _printSymbol(sym) {
      if (this._isCanAddSymbol()) {
        this._inputText += sym;
      }
      return this._printText();
    }

    _deleteSymbol() {
      this._inputText = this._inputText.substring(0, this._inputText.length - 1);
      return this._printText();
    }

    getInputText() {
      return this._inputText;
    }

  };
  ANET.register(Window_ChatInput);
})();

// ■ END Window_ChatInput.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_ChoiceList_start5454 = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function () {
        if ($gameMessage.isChoiseSharedMode()) {
            this.setNetworkShared(true);
            $gameMessage.setSharedChoiseMode(false);
        } else {
            this.setNetworkShared(false);
        }
        _alias_Window_ChoiceList_start5454.call(this, ...arguments);
    };
})();
// ■ END Window_ChoiceList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpConfig;
  Window_IpConfig = class Window_IpConfig extends Window_Command {
    constructor() {
      super((Graphics._boxWidth / 2) - 120, 300);
    }

    makeCommandList() {
      this.addCommand('      IP     ', 'ip', true);
      return this.addCommand('     Port', 'port', true);
    }

    windowWidth() {
      return 240;
    }

  };
  AlphaNET.register(Window_IpConfig);
})();

// ■ END Window_IpConfig.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpInput;
  Window_IpInput = class Window_IpInput extends Window_Selectable {
    constructor() {
      super();
    }

    initialize() {
      this.imgs = [ImageManager.loadNetwork('btn1'), ImageManager.loadNetwork('btn2'), ImageManager.loadNetwork('btn3')];
      this._extendsXButton();
      super.initialize(0, 0, 320, 90);
      this.openness = 0;
      this.createButtons();
      return this.updatePlacement();
    }

    _extendsXButton() {
      var Button, buttonValues;
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      Button.prototype.drawNumberOnMe = function(text, size) {
        this._textDigitName = new Sprite(new Bitmap(buttonValues.buttonSize, buttonValues.buttonSize));
        this._textDigitName.bitmap.fontSize = size;
        this._textDigitName.bitmap.drawText(text, 0, buttonValues.buttonSize / 2, buttonValues.buttonSize, 1, 'center');
        return this.addChild(this._textDigitName);
      };
      return Button.prototype.setButtonDigitMethod = function(digit, method) {
        this.drawNumberOnMe(digit.toString(), buttonValues.textSize);
        return this.addClickHandler(method(digit));
      };
    }

    getBasicValues() {
      return {
        textSize: 24,
        buttonSize: 40,
        spacing: 2
      };
    }

    createButtons() {
      var Button, btn, buttonValues, cont, i, j, k, l, spacingBetweenLines;
      this._buttons = [];
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      this._inputPanel = new Sprite();
      spacingBetweenLines = buttonValues.buttonSize + buttonValues.spacing;
      for (i = k = 0; k < 5; i = ++k) {
        cont = new AlphaNET.LIBS.UIContainer(buttonValues.buttonSize);
        cont.setItemsCount(3);
        cont.setSpacing(buttonValues.spacing);
        this._inputPanel.addChild(cont);
        cont.move(0, spacingBetweenLines * i);
        for (j = l = 0; l < 3; j = ++l) {
          btn = new Button();
          btn.setButtonImages(...this.imgs);
          cont.addChild(btn);
          this._buttons.push(btn);
        }
      }
      this.addChild(this._inputPanel);
      this._setDigitInputMethods();
    }

    _setDigitInputMethods() {
      var m;
      m = this._onDigitButtonClick.bind(this);
      this._buttons[0].setButtonDigitMethod(7, m);
      this._buttons[1].setButtonDigitMethod(8, m);
      this._buttons[2].setButtonDigitMethod(9, m);
      this._buttons[3].setButtonDigitMethod(4, m);
      this._buttons[4].setButtonDigitMethod(5, m);
      this._buttons[5].setButtonDigitMethod(6, m);
      this._buttons[6].setButtonDigitMethod(1, m);
      this._buttons[7].setButtonDigitMethod(2, m);
      this._buttons[8].setButtonDigitMethod(3, m);
      this._buttons[10].setButtonDigitMethod(0, m);
      this._buttons[11].hide();
      this._buttons[9].hide();
      this._buttons[12].addClickHandler(this._onDigitButtonClearClick.bind(this));
      this._buttons[12].drawNumberOnMe("C", this.getBasicValues().textSize);
      this._buttons[13].addClickHandler(this._onDigiButtonPointClick.bind(this));
      this._buttons[13].drawNumberOnMe(".", this.getBasicValues().textSize);
      this._buttons[14].addClickHandler(this.onButtonOk.bind(this));
      return this._buttons[14].drawNumberOnMe("OK", this.getBasicValues().textSize);
    }

    _onDigitButtonClick(index) {
      return () => {
        SoundManager.playCursor();
        return this._digitInputProcess(index);
      };
    }

    _digitInputProcess(digit) {
      return this._addText(digit);
    }

    _addText(text) {
      if (this._tempText.length >= this.maxLength()) {
        return;
      }
      this._tempText += text;
      return this.refreshText(this._tempText);
    }

    _onDigitButtonClearClick() {
      SoundManager.playCursor();
      this._tempText = this._tempText.substring(0, this._tempText.length - 1);
      return this.refreshText(this._tempText);
    }

    _onDigiButtonPointClick() {
      return this._addText(".");
    }

    updatePlacement() {
      var buttonValues, digitsWidth, dx;
      buttonValues = this.getBasicValues();
      this.width = this.width;
      this.height = this.height;
      this.x = (Graphics.boxWidth - this.width) / 2;
      this.y = (Graphics.boxHeight - this.height) / 2;
      this.y -= (buttonValues.spacing + buttonValues.buttonSize) * 2;
      digitsWidth = buttonValues.buttonSize * 3;
      digitsWidth += buttonValues.spacing * 2;
      dx = (this.width - digitsWidth) / 2;
      return this._inputPanel.move(dx, this.height + (buttonValues.spacing * 2));
    }

    update() {
      super.update();
      this.updateButtonsVisiblity();
      return this.updateInput();
    }

    updateButtonsVisiblity() {
      return this._inputPanel.visible = this.openness >= 255;
    }

    updateInput() {
      var i, j, k, l;
      for (i = k = 0; k <= 9; i = ++k) {
        if (Input.isTriggered(i.toString())) {
          this._digitInputProcess(i);
        }
      }
      for (i = l = 96; l <= 105; i = ++l) {
        j = i - 96;
        if (Input.isTriggered('Numpad' + j.toString())) {
          this._digitInputProcess(j);
        }
      }
      if (Input.isTriggered('Backspace') || Input.isTriggered('backspace')) {
        this._onDigitButtonClearClick();
      }
      if (this.isDigitsOnly()) {
        return;
      }
      if (Input.isTriggered('.') || Input.isTriggered('NumpadDecimal')) {
        this._onDigiButtonPointClick();
      }
    }

    start(symbol) {
      this.textSymbol = symbol;
      this.loadSymbol();
      this.open();
      return this.activate();
    }

    loadSymbol() {
      var text;
      text = this._getTextBySymbol();
      if (text === null || text === "") {
        text = 'localhost';
      }
      this._tempText = text;
      this.refreshText(this._tempText);
      if (this.isDigitsOnly()) {
        return this._buttons[13].hide();
      } else {
        return this._buttons[13].show();
      }
    }

    isDigitsOnly() {
      return this.textSymbol === 'port';
    }

    refreshText(text) {
      this.contents.clear();
      return this.drawText(text, 0, 0, this.contentsWidth(), 'center');
    }

    _getTextBySymbol() {
      return Network[this.textSymbol].toString();
    }

    lineHeight() {
      return 40;
    }

    maxLength() {
      if (this.isDigitsOnly()) {
        return 4;
      } else {
        return 15;
      }
    }

    isOkTriggered() {
      return Input.isTriggered('ok');
    }

    onButtonOk() {
      this.saveTextData();
      return this.callOkHandler();
    }

    saveTextData() {
      return Network[this.textSymbol] = this._tempText;
    }

  };
  AlphaNET.register(Window_IpInput);
})();

// ■ END Window_IpInput.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
    Window_MenuCommand.prototype.isFormationEnabled = function () {
        if(Network.isConnected())
            return  false;
        else
            return _alias_Window_MenuCommand_isFormationEnabled.call(this, ...arguments);
    };
})();
// ■ END Window_MenuCommand.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
        if (Network.isConnected() && this._isNetworkRestrictSymbol()) {
            return this.index() == (NetPartyManager.getMyPlayerIndex() - 1);
        }
        return _alias_Window_MenuStatus_isCurrentItemEnabled.call(this, ...arguments);
    };

    //?[NEW]
    Window_MenuStatus.prototype._isNetworkRestrictSymbol = function () {
        try {
            var symbol = SceneManager._scene._commandWindow.currentSymbol();
            var isEnabled = (symbol == 'skill' || symbol == 'equip');
            if(Network.isMultiMode()) {
                isEnabled = isEnabled || symbol == 'status';
            }
            return isEnabled;
        } catch (error) {
            AlphaNET.error(error, 'error try get menu symbol');
            return false;
        }
    };
})();
// ■ END Window_MenuStatus.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        _alias_Window_Message_terminateMessage.call(this, ...arguments);
        if(Network.inBattle())
            BattleManager.syncNet();
        else
            if(Network.isConnected())
                Network.sendIcon(Network.ICON_NONE);
    };

    //@[ALIAS]
    var _alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        _alias_Window_Message_startMessage.call(this, ...arguments);
        if(Network.isConnected()){
            if(!Network.inBattle()) {
                Network.sendIcon(Network.ICON_MESSAGE);
            }
        }
    };
})();
// ■ END Window_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function () {
        _alias_Window_Selectable_initialize.call(this, ...arguments);
        this._networkShared = false;
    };

    //@[ALIAS]
    var _alias_Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function (index) {
        _alias_Window_Selectable_select.call(this, ...arguments);
        if (this.isNetworkShared() && Network.isHost()) {
            this._sendNetworkMessage(index);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function () {
        // * Если не хост, то только получаем выбор от сервера
        if (this.isNetworkShared() && !Network.isHost()) {
            Window_Base.prototype.update.call(this);
            this._updateNetwork();
        } else {
            _alias_Window_Selectable_update.call(this, ...arguments);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function () {
        this._networkProcess('ok');
        _alias_Window_Selectable_processOk.call(this, ...arguments);
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_Selectable.prototype.processCancel = function () {
        this._networkProcess('cancel');
        _alias_Window_Selectable_processCancel.call(this, ...arguments);
    };

})();
// ■ END Window_Selectable.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Window_Selectable.prototype._sendNetworkMessage = function (index, action = null) {
    var data = {
        index: index,
        action: action
    };
    Network.sendMessage(NetMessage.WindowSelect().setData(data));
};

//?[NEW]
Window_Selectable.prototype._updateNetwork = function () {
    this._updateActionFromNetwork();
    this._updateSelectionFromNetwork();
};

//?[NEW]
Window_Selectable.prototype._updateActionFromNetwork = function () {
    if (!$gameTemp.networkWAction) return;
    if ($gameTemp.networkWAction == 'ok') {
        this._updateSelectionFromNetwork(); // * Ещё раз обновим индекс, чтобы выбор был точным
        this.processOk();
        $gameTemp.networkWAction = null;
    }
    if ($gameTemp.networkWAction == 'cancel') {
        this.processCancel();
        $gameTemp.networkWAction = null;
    }
};

//?[NEW]
Window_Selectable.prototype._updateSelectionFromNetwork = function () {
    try {
        var index = $gameTemp.networkWSelectedIndex;
        if (index != null) {
            this.select(index);
            $gameTemp.networkWSelectedIndex = null;
        }
    } catch (e) {
        //$[TEMP]
        console.error(e);
    }
};

//?[NEW]
Window_Selectable.prototype._networkProcess = function (symbol) {
    if (!this.isNetworkShared()) return;
    if (Network.isHost()) {
        // * При OK мы дополнительно отправляем index выбора, чтобы выбор был точным
        this._sendNetworkMessage(this.index(), symbol);
    }
};

//?[NEW]
Window_Selectable.prototype.setNetworkShared = function (bool) {
    "WINDOW IN SHARED MODE".p(bool);
    this._networkShared = bool;
};

//?[NEW]
Window_Selectable.prototype.isNetworkShared = function () {
    return (this._networkShared == true && Network.isConnected());
};

// ■ END Window_Selectable_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x23fe = [
    'isConnected',
    'canClientConnect',
    'isHotGame',
    'connectToServer',
    'keyCode',
    'disconnectFromServer',
    'XiUCF',
    'startAnotherClient',
    'openMaker',
    'ehSnY',
    'stopServer',
    'isUseFonts',
    'isPro',
    'DDKsp',
    'BqPgg',
    'Start\x20server\x20first!',
    'warning',
    'start\x20server\x20before\x20create\x20a\x20new\x20Window',
    'startServer',
    'isHost',
    'prototype',
    'create',
    'call',
    'printVersionInfo',
    'initialize',
    'initManager',
    '<font\x20color=\x22blue\x22>Welcome\x20to\x20Alpha.NET\x20Beta</font><br><font\x20size=\x222\x22>F6\x20-\x20Start<br>\x20F7\x20-\x20Connect<br>\x20F9\x20-\x20Disconnect\x20<br>\x20F11\x20-\x20Another\x20Window</font>',
    'clear',
    '_onKeyDown',
    'ctrlKey',
    'altKey',
    'preventDefault'
];
(function (_0x3e3fdf, _0x55776e) {
    var _0x2d04e1 = function (_0x245a06) {
        while (--_0x245a06) {
            _0x3e3fdf['push'](_0x3e3fdf['shift']());
        }
    };
    _0x2d04e1(++_0x55776e);
}(_0x23fe, 0x1d4));
var _0x438e = function (_0x2a44fb, _0x9c19f9) {
    _0x2a44fb = _0x2a44fb - 0x0;
    var _0x3368c1 = _0x23fe[_0x2a44fb];
    return _0x3368c1;
};
var _Scene_Boot_prototype_create = Scene_Boot[_0x438e('0x0')][_0x438e('0x1')];
Scene_Boot[_0x438e('0x0')][_0x438e('0x1')] = function () {
    _Scene_Boot_prototype_create[_0x438e('0x2')](this);
    AlphaNET[_0x438e('0x3')]();
    Network[_0x438e('0x4')]();
    MakerManager[_0x438e('0x5')]();
    InfoPrinter['p'](_0x438e('0x6'));
    setTimeout(InfoPrinter[_0x438e('0x7')], 0xfa0);
};
var _alias_Graphics_onKeyDown = Graphics[_0x438e('0x8')];
Graphics['_onKeyDown'] = function () {
    _alias_Graphics_onKeyDown[_0x438e('0x2')](this, ...arguments);
    if (!event[_0x438e('0x9')] && !event[_0x438e('0xa')]) {
        if (event['keyCode'] == 0x75) {
            event[_0x438e('0xb')]();
            if (!Network[_0x438e('0xc')]() && Network[_0x438e('0xd')]()) {
                if (!Network[_0x438e('0xe')]())
                    Network['startServer']();
                AlphaNET[_0x438e('0xf')]();
            }
        }
        if (event[_0x438e('0x10')] == 0x78) {
            event['preventDefault']();
            AlphaNET[_0x438e('0x11')]();
        }
        if (event[_0x438e('0x10')] == 0x76) {
            event[_0x438e('0xb')]();
            AlphaNET[_0x438e('0xf')]();
        }
        if (event[_0x438e('0x10')] == 0x7a) {
            if ('GYMdW' !== _0x438e('0x12')) {
                event[_0x438e('0xb')]();
                AlphaNET[_0x438e('0x13')]();
            } else {
                if (!Network[_0x438e('0xe')]())
                    MakerManager[_0x438e('0x14')]();
            }
        }
        if (event[_0x438e('0x10')] == 0x73) {
            if ('ZFsXm' === _0x438e('0x15')) {
                event['preventDefault']();
                AlphaNET[_0x438e('0x11')]();
            } else {
                event[_0x438e('0xb')]();
                if (Network[_0x438e('0xc')]()) {
                    Network[_0x438e('0x16')]();
                }
            }
        }
    }
};
AlphaNET[_0x438e('0x17')] = function () {
    return AlphaNET[_0x438e('0x18')]() && Utils['isNwjs']();
};
AlphaNET[_0x438e('0x13')] = function () {
    if (Network[_0x438e('0xc')]()) {
        if (_0x438e('0x19') !== _0x438e('0x19')) {
            return AlphaNET['isPro']() && Utils['isNwjs']();
        } else {
            if (!Network[_0x438e('0xe')]())
                MakerManager[_0x438e('0x14')]();
        }
    } else {
        if ('qFXQE' !== _0x438e('0x1a')) {
            alert(_0x438e('0x1b'));
            AlphaNET[_0x438e('0x1c')](_0x438e('0x1d'));
        } else {
            if (!Network[_0x438e('0xc')]() && !Network[_0x438e('0xe')]() && Network[_0x438e('0xd')]())
                Network[_0x438e('0x1e')]();
        }
    }
};
AlphaNET['connectToServer'] = function () {
    if (!Network[_0x438e('0xc')]() && Network['canClientConnect']())
        Network[_0x438e('0xf')]();
};
AlphaNET[_0x438e('0x1e')] = function () {
    if (!Network[_0x438e('0xc')]() && !Network[_0x438e('0xe')]() && Network['canClientConnect']())
        Network['startServer']();
};
AlphaNET[_0x438e('0x16')] = function () {
    if (Network[_0x438e('0xc')]() && Network[_0x438e('0x1f')]()) {
        if (Network[_0x438e('0xe')]()) {
            alert('You\x20can\x20stop\x20server\x20when\x20another\x20window\x20is\x20open!');
            return;
        }
        Network[_0x438e('0x16')]();
    }
};
AlphaNET[_0x438e('0x11')] = function () {
    if (Network[_0x438e('0xc')]())
        Network['disconnect']();
};
})();

//Plugin Alpha_NET automatic build by MVPluginBuilder 1.6.1 26.03.2019
