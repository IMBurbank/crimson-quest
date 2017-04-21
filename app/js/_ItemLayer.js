'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: boardSize, stageSize, tileSize, gameLevel, levels, bgArr, itemArr, updateGameClassState
//playerArr, itemPalettes, floorCoords, itemPaletteArrMap
var ItemLayer = function (_React$Component) {
  _inherits(ItemLayer, _React$Component);

  function ItemLayer(props) {
    _classCallCheck(this, ItemLayer);

    var _this = _possibleConstructorReturn(this, (ItemLayer.__proto__ || Object.getPrototypeOf(ItemLayer)).call(this, props));

    _this.initItemArr = _this.initItemArr.bind(_this);
    _this.initTempCanvas = _this.initTempCanvas.bind(_this);
    _this.getItemImages = _this.getItemImages.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.setPaletteArrMap = _this.setPaletteArrMap.bind(_this);
    _this.setSpawnQuants = _this.setSpawnQuants.bind(_this);
    _this.setItemArr = _this.setItemArr.bind(_this);
    _this.drawItems = _this.drawItems.bind(_this);

    _this.state = {
      srcTileSize: 16,
      itemTypes: [],
      images: {},
      spawnQuants: [],
      tempCanv: null,
      lvlProcessed: 0
    };
    return _this;
  }

  _createClass(ItemLayer, [{
    key: 'initItemArr',
    value: function initItemArr() {
      var len = this.props.boardSize,
          itemArr = initZeroArray(len);

      this.props.updateGameClassState({ itemArr: itemArr });
    }
  }, {
    key: 'getItemImages',
    value: function getItemImages() {
      var path = 'img/items/',
          type = '.png',
          that = this;

      var amuletImg = void 0,
          armorImg = void 0,
          bookImg = void 0,
          bootImg = void 0,
          chest0Img = void 0,
          chest1Img = void 0,
          gloveImg = void 0,
          hatImg = void 0,
          longWepImg = void 0,
          medWepImg = void 0,
          moneyImg = void 0,
          potionImg = void 0,
          ringImg = void 0,
          shieldImg = void 0,
          shortWepImg = void 0,
          wandImg = void 0,
          images = {
        amuletImg: amuletImg,
        armorImg: armorImg,
        bookImg: bookImg,
        bootImg: bootImg,
        chest0Img: chest0Img,
        chest1Img: chest1Img,
        gloveImg: gloveImg,
        hatImg: hatImg,
        longWepImg: longWepImg,
        medWepImg: medWepImg,
        moneyImg: moneyImg,
        potionImg: potionImg,
        ringImg: ringImg,
        shieldImg: shieldImg,
        shortWepImg: shortWepImg,
        wandImg: wandImg
      },
          el = void 0,
          iLen = 0,
          i = 0;

      var handleItemLoad = function handleItemImageLoad() {
        i++;
        if (i === iLen) {
          that.setState({ images: images });
          that.setPalettes(images);
        }
      };

      for (el in images) {
        images[el] = new Image();
        images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
        images[el].addEventListener('load', handleItemLoad);
        iLen++;
      }
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var size = this.props.stageSize,
          smoothRender = false,
          tempCanv = initMemCanvas(size, size, smoothRender);

      this.setState({ tempCanv: tempCanv });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(images) {
      var ts = this.props.tileSize,
          srcTs = this.state.srcTileSize,
          scale = ts / srcTs,
          renderSmoothing = false,
          imgPixDataName = 'imgPixData';

      var itemPalettes = {},
          p = null,
          el = null,
          ctx = null,
          img = null,
          name = '',
          w = 0,
          h = 0;

      for (el in images) {
        img = images[el];
        name = el.slice(0, -3) + 'Palette';
        w = img.width;
        h = img.height;
        p = itemPalettes;
        p[name] = document.createElement('canvas');
        p[name].width = scale * w;
        p[name].height = scale * h;
        ctx = p[name].getContext('2d');
        ctx.imageSmoothingEnabled = renderSmoothing;
        ctx.drawImage(img, 0, 0, w, h, 0, 0, p[name].width, p[name].height);
        p[name][imgPixDataName] = ctx.getImageData(0, 0, p[name].width, p[name].height).data;
      }

      this.props.updateGameClassState({ itemPalettes: itemPalettes });
    }
  }, {
    key: 'setPaletteArrMap',
    value: function setPaletteArrMap() {
      var itemTypes = [itemAmulets, itemArmors, itemFeet, itemGloves, itemHelmets, itemRings, itemShields, itemWeapons, itemConsumables, chestConsumables];

      var itemPaletteArrMap = {},
          i = 101,
          props = null;

      itemTypes.forEach(function (el) {
        for (props in el) {
          el[props]['itemArrVal'] = i;
          itemPaletteArrMap['' + i] = el[props];
          i++;
        }
      });

      this.setSpawnQuants(itemTypes);
      this.setState({ itemTypes: itemTypes });
      this.props.updateGameClassState({ itemPaletteArrMap: itemPaletteArrMap });
    }
  }, {
    key: 'setSpawnQuants',
    value: function setSpawnQuants(itemTypes) {
      var levels = this.props.levels,
          valKey = 'itemArrVal';

      var spawnQuants = [],
          item = [],
          spawnObj = {},
          props = null,
          lvl = 0,
          val = 0,
          i = 0;

      spawnQuants.length = levels;
      while (i < levels) {
        spawnQuants[i] = [], i++;
      }itemTypes.forEach(function (el) {
        for (props in el) {
          spawnObj = el[props];
          val = spawnObj[valKey];
          for (lvl in spawnObj.spawnQuant) {
            item = [val, spawnObj.spawnQuant[lvl]];
            spawnQuants[lvl * 1 - 1].push(item);
          }
        }
      });

      this.setState({ spawnQuants: spawnQuants });
    }
  }, {
    key: 'setItemArr',
    value: function setItemArr(nextProps, nextState) {
      var quants = nextState.spawnQuants,
          lvl = nextProps.gameLevel;

      var itemArr = [].concat(_toConsumableArray(nextProps.itemArr)),
          floorCoords = [].concat(_toConsumableArray(nextProps.floorCoords)),
          len = itemArr.length,
          fLen = floorCoords.length,
          coord = [],
          index = 0,
          i = 0,
          j = 0;

      while (i < len) {
        while (j < len) {
          itemArr[i][j] = 0, j++;
        }j = 0, i++;
      }

      quants[lvl - 1].forEach(function (el) {
        for (i = 0; i < el[1]; i++) {
          index = randInt(0, fLen);
          coord = floorCoords[index];
          itemArr[coord[0]][coord[1]] = el[0];
          floorCoords.splice(index, 1);
          fLen--;
        }
      });

      this.setState({ lvlProcessed: lvl });
      this.props.updateGameClassState({ floorCoords: floorCoords, itemArr: itemArr });
    }
  }, {
    key: 'drawItems',
    value: function drawItems(nextProps) {
      var iArr = nextProps.itemArr,
          pArr = nextProps.playerArr,
          map = nextProps.itemPaletteArrMap,
          pals = nextProps.itemPalettes,
          ts = nextProps.tileSize,
          px = nextProps.stageSize,
          iLen = iArr.length,
          rLen = px / ts;

      var dCtx = document.getElementById('item-layer').getContext('2d'),
          tempCanv = this.state.tempCanv,
          tempCtx = tempCanv.getContext('2d'),
          tImgData = tempCtx.createImageData(px, px),
          tImgPixData = tImgData.data,
          renderArr = [],
          iData = 0,
          pData = 0,
          sr = 0,
          sc = 0,
          pr = 0,
          pc = 0,
          sx = 0,
          sy = 0,
          img = null,
          imgW = 0,
          m = [],
          el = 0,
          srcX = 0,
          srcY = 0,
          dX = 0,
          dY = 0,
          h = 0,
          w = 0,
          i = 0,
          j = 0;

      //Use helper functions if performance is acceptable
      //const padding = calcRenderPadding(playerArr, iLen, rLen);
      //const renderArr = setRenderArr(itemArr, rLen, padding);

      if (pArr[0] - ~~(rLen / 2) < 0) {
        sr = 0;
        pr = -1 * (pArr[0] - ~~(rLen / 2));
      } else if (pArr[0] + ~~(rLen / 2) + 1 > iLen) {
        pr = pArr[0] + ~~(rLen / 2) + 1 - iLen;
        sr = iLen - rLen + pr;
      } else {
        sr = pArr[0] - ~~(rLen / 2);
        pr = 0;
      }
      if (pArr[1] - ~~(rLen / 2) < 0) {
        sc = 0;
        pc = -1 * (pArr[1] - ~~(rLen / 2));
      } else if (pArr[1] + ~~(rLen / 2) + 1 > iLen) {
        pc = pArr[1] + ~~(rLen / 2) + 1 - iLen;
        sc = iLen - rLen + pc;
      } else {
        sc = pArr[1] - ~~(rLen / 2);
        pc = 0;
      }

      renderArr.length = rLen - pr;
      while (i < rLen - pr) {
        renderArr[i] = [];
        renderArr[i].length = rLen - pc;
        while (j < rLen - pc) {
          renderArr[i][j] = iArr[sr + i][sc + j], j++;
        }j = 0, i++;
      }

      sx = !sc && pc ? pc * ts : 0;
      sy = !sr && pr ? pr * ts : 0;

      for (i = 0; i < renderArr.length; i++) {
        for (j = 0; j < renderArr[i].length; j++) {
          el = renderArr[i][j];
          if (el) {
            m = ['consumable', 'gold', 'openChest'].includes(map['' + el].type) ? map['' + el] : chestConsumables.closedChest;;
            img = pals[m.palette].imgPixData;
            imgW = pals[m.palette].width;
            srcX = m.iconLoc[0];
            srcY = m.iconLoc[1];
            dX = sx + j * ts;
            dY = sy + i * ts;
            h = 0;

            while (h < ts) {
              w = 0;
              while (w < ts) {
                pData = (dX + w + (dY + h) * px) * 4;
                iData = (srcX + w + (srcY + h) * imgW) * 4;

                tImgPixData[pData] = img[iData];
                tImgPixData[pData + 1] = img[iData + 1];
                tImgPixData[pData + 2] = img[iData + 2];
                tImgPixData[pData + 3] = img[iData + 3];
                w++;
              }
              h++;
            }
          }
        }
      }

      dCtx.putImageData(tImgData, 0, 0);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getItemImages();
      this.initItemArr();
      this.initTempCanvas();
      this.setPaletteArrMap();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if ((this.props.playerArr[0] !== nextProps.playerArr[0] || this.props.playerArr[1] !== nextProps.playerArr[1]) && nextProps.itemPalettes.potionPalette) {

        this.drawItems(nextProps);
      }
      if (nextState.lvlProcessed !== nextProps.gameLevel && (this.props.floorCoords.length !== nextProps.floorCoords.length || !this.props.floorCoords.every(function (arr, i) {
        return arr.every(function (el, j) {
          return el === nextProps.floorCoords[i][j];
        });
      }))) {

        this.setItemArr(nextProps, nextState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'item-layer',
        className: 'item-layer',
        width: size,
        height: size });
    }
  }]);

  return ItemLayer;
}(React.Component);