'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, boardSize, tileSize, gameLevel, bgArr, updateBgArr, playerArr
var BackgroundLayer = function (_React$Component) {
  _inherits(BackgroundLayer, _React$Component);

  function BackgroundLayer(props) {
    _classCallCheck(this, BackgroundLayer);

    var _this = _possibleConstructorReturn(this, (BackgroundLayer.__proto__ || Object.getPrototypeOf(BackgroundLayer)).call(this, props));

    _this.initTempCanvas = _this.initTempCanvas.bind(_this);
    _this.getBgImages = _this.getBgImages.bind(_this);
    _this.initPaletteMaps = _this.initPaletteMaps.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.drawBackground = _this.drawBackground.bind(_this);

    _this.state = {
      srcTileSize: 16,
      floorImg: null,
      wallImg: null,
      floorPalette: {},
      wallPalette: {},
      floorPaletteMap: {},
      wallPaletteMap: {},
      tempCanv: {},
      playerLoc: []
    };
    return _this;
  }

  _createClass(BackgroundLayer, [{
    key: 'getBgImages',
    value: function getBgImages() {
      var floorImg = new Image(),
          wallImg = new Image(),
          that = this;

      var i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 2) {
          that.setState({ floorImg: floorImg, wallImg: wallImg });

          //Delete after start screen created
          that.setPalettes(floorImg, wallImg, that.props.gameLevel);
        }
      };

      floorImg.src = 'img/terrain/Floor.png';
      wallImg.src = 'img/terrain/Wall.png';
      floorImg.addEventListener('load', handleLoad);
      wallImg.addEventListener('load', handleLoad);
    }
  }, {
    key: 'initTempCanvas',
    value: function initTempCanvas() {
      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          size = this.props.stageSize;

      canvas.width = size;
      canvas.height = size;
      ctx.imageSmoothingEnabled = false;

      this.setState({ tempCanv: { canvas: canvas, ctx: ctx } });
    }
  }, {
    key: 'initPaletteMaps',
    value: function initPaletteMaps() {
      var ts = this.props.tileSize;

      var floorPaletteMap = {
        '41': [0, 0],
        '42': [ts, 0],
        '43': [2 * ts, 0],
        '44': [0, ts],
        '45': [ts, ts],
        '46': [2 * ts, ts],
        '47': [0, 2 * ts],
        '48': [ts, 2 * ts],
        '49': [2 * ts, 2 * ts],
        '51': [3 * ts, 0],
        '52': [3 * ts, ts],
        '53': [3 * ts, 2 * ts],
        '54': [4 * ts, ts],
        '55': [5 * ts, ts],
        '56': [6 * ts, ts],
        '57': [5 * ts, 0]
      };

      var wallPaletteMap = {
        '21': [0, 0],
        '22': [ts, 0],
        '23': [2 * ts, 0],
        '24': [0, ts],
        '25': [0, 2 * ts],
        '26': [ts, ts],
        '27': [2 * ts, 2 * ts],
        '31': [4 * ts, 0],
        '32': [3 * ts, ts],
        '33': [4 * ts, ts],
        '34': [5 * ts, ts],
        '35': [4 * ts, 2 * ts],
        '36': [3 * ts, 0]
      };

      this.setState({ floorPaletteMap: floorPaletteMap, wallPaletteMap: wallPaletteMap });
    }
  }, {
    key: 'setPalettes',
    value: function setPalettes(floorImg, wallImg, gameLevel) {
      var lvl = gameLevel,
          gmTileSize = this.props.tileSize,
          srcTileSize = this.state.srcTileSize,
          scale = gmTileSize / srcTileSize,
          h = 3 * gmTileSize,
          fw = 7 * gmTileSize,
          ww = 6 * gmTileSize;

      var fCanvas = document.createElement('canvas'),
          fCtx = fCanvas.getContext('2d'),
          wCanvas = document.createElement('canvas'),
          wCtx = wCanvas.getContext('2d'),
          srcY = 3 * srcTileSize;

      srcY *= lvl === 1 ? 5 : lvl === 2 ? 6 : lvl === 3 ? 7 : lvl === 4 ? 8 : lvl === 5 ? 1 : lvl < 8 ? 2 : lvl < 10 ? 3 : lvl === 10 ? 4 : 1;

      fCanvas.width = fw;
      fCanvas.height = h;
      fCtx.imageSmoothingEnabled = false;
      fCtx.drawImage(floorImg, 0, srcY, fw / scale, h / scale, 0, 0, fw, h);

      wCanvas.width = ww;
      wCanvas.height = h;
      wCtx.imageSmoothingEnabled = false;
      wCtx.drawImage(wallImg, 0, srcY, ww / scale, h / scale, 0, 0, ww, h);

      this.setState({
        floorPalette: { canvas: fCanvas, ctx: fCtx },
        wallPalette: { canvas: wCanvas, ctx: wCtx }
      });

      //Delete after start screen created
      this.props.playerArr !== [0, 0] && this.drawBackground(this.props, this.state);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground(nextProps, nextState) {
      var flrImg = nextState.floorPalette.canvas,
          wallImg = nextState.wallPalette.canvas,
          flrImgMap = nextState.floorPaletteMap,
          wallImgMap = nextState.wallPaletteMap,
          bgArr = nextProps.bgArr,
          playerArr = nextProps.playerArr,
          ts = nextProps.tileSize,
          px = nextProps.stageSize,
          bgLen = bgArr.length,
          rLen = px / ts,
          air = 10,
          flr = 40;

      var dCtx = document.getElementById('bg-layer').getContext('2d'),
          tempCanv = nextState.tempCanv.canvas,
          tempCtx = nextState.tempCanv.ctx,
          renderArr = [],
          sr = 0,
          sc = 0,
          pr = 0,
          pc = 0,
          sx = 0,
          sy = 0,
          img = null,
          map = {},
          el = 0,
          srcX = 0,
          srcY = 0,
          i = 0,
          j = 0;

      if (playerArr[0] - ~~(rLen / 2) < 0) {
        sr = 0;
        pr = -1 * (playerArr[0] - ~~(rLen / 2));
      } else if (playerArr[0] + ~~(rLen / 2) + 1 > bgLen) {
        pr = playerArr[0] + ~~(rLen / 2) + 1 - bgLen;
        sr = bgLen - rLen + pr;
      } else {
        sr = playerArr[0] - ~~(rLen / 2);
        pr = 0;
      }
      if (playerArr[1] - ~~(rLen / 2) < 0) {
        sc = 0;
        pc = -1 * (playerArr[1] - ~~(rLen / 2));
      } else if (playerArr[1] + ~~(rLen / 2) + 1 > bgLen) {
        pc = playerArr[1] + ~~(rLen / 2) + 1 - bgLen;
        sc = bgLen - rLen + pc;
      } else {
        sc = playerArr[1] - ~~(rLen / 2);
        pc = 0;
      }

      renderArr.length = rLen - pr;
      while (i < rLen - pr) {
        renderArr[i] = [];
        renderArr[i].length = rLen - pc;
        while (j < rLen - pc) {
          renderArr[i][j] = bgArr[sr + i][sc + j], j++;
        }j = 0, i++;
      }

      sx = !sc && pc ? pc * ts : 0;
      sy = !sr && pr ? pr * ts : 0;

      tempCtx.fillRect(0, 0, px, px);
      for (i = 0; i < renderArr.length; i++) {
        for (j = 0; j < renderArr[i].length; j++) {
          el = renderArr[i][j];
          if (el > air) {
            img = el < flr ? wallImg : flrImg;
            map = el < flr ? wallImgMap : flrImgMap;
            srcX = map['' + el][0];
            srcY = map['' + el][1];
            tempCtx.drawImage(img, srcX, srcY, ts, ts, sx + j * ts, sy + i * ts, ts, ts);
          }
        }
      }

      dCtx.drawImage(tempCanv, 0, 0);
      this.setState({ playerLoc: [].concat(_toConsumableArray(playerArr)) });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getBgImages();
      this.initTempCanvas();
      this.initPaletteMaps();

      var _backgroundArray = backgroundArray(this.props.boardSize),
          bgArr = _backgroundArray.bgArr,
          floorCoords = _backgroundArray.floorCoords,
          hWallCoords = _backgroundArray.hWallCoords,
          vWallCoords = _backgroundArray.vWallCoords;

      this.props.updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.gameLevel !== nextProps.gameLevel && nextProps.gameLevel !== 0) {
        var _backgroundArray2 = backgroundArray(this.props.boardSize),
            bgArr = _backgroundArray2.bgArr,
            floorCoords = _backgroundArray2.floorCoords,
            hWallCoords = _backgroundArray2.hWallCoords,
            vWallCoords = _backgroundArray2.vWallCoords;

        this.props.updateBgArr(bgArr, floorCoords, hWallCoords, vWallCoords);

        if (this.state.floorImg) {
          this.setPalettes(this.state.floorImg, this.state.wallImg, nextProps.gameLevel);
        }
      }

      if (nextProps.playerArr !== this.state.playerLoc && nextProps.playerArr !== [0, 0] && this.state.floorPalette.canvas) {
        this.drawBackground(nextProps, this.state);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'bg-layer',
        className: 'bg-layer',
        width: size,
        height: size });
    }
  }]);

  return BackgroundLayer;
}(React.Component);