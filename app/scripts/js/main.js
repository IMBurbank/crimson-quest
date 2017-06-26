'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  * React Components
  */

/**
	*		@desc Parent Game class. Controls all game components.
	*		@returns Full game.
	*/

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.resetGame = _this.resetGame.bind(_this);
    _this.toggleMute = _this.toggleMute.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.updateGameClassState = _this.updateGameClassState.bind(_this);
    _this.pickupItem = _this.pickupItem.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.maintainFocus = _this.maintainFocus.bind(_this);
    _this.endFocus = _this.endFocus.bind(_this);

    _this.directionKeys = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowRight: 'right',
      KeyD: 'right',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left'
    };
    _this.statIncreaseKeys = {
      KeyV: 'bVitality',
      KeyB: 'bDurability',
      KeyN: 'bStrength',
      KeyM: 'bAgility'
    };
    _this.consumeDigits = ['1', '2', '3', '4', '5', '6', '7', '8'];

    _this.state = {
      boardSize: 120,
      tileSize: 32,
      wall: 20,
      floor: 40,
      gameLevel: 1,
      levels: 10,
      bgLevelProcessed: 0,
      itemLevelProcessed: 0,
      moveCount: 0,
      levelUpCount: 1,
      hero: '',
      heroIcon: null,
      heroFacing: '',
      overlayMode: 'hero-selection-overlay', //off, inv-overlay, help-overlay, merchant-overlay, game-over-overlay, game-win-overlay, hero-selection-overlay
      gameOver: false,
      gameMuted: false,
      playerArr: [],
      bgArr: [],
      itemArr: [],
      enemyArr: [],
      floorCoords: [],
      inventory: {/*
                  Potion: {
                  name: 'Potion',
                  type: 'consumable',
                  count: 10,
                  equipped: false,
                  itemArrVal: 200,
                  palette: 'potionPalette',
                  iconLoc: [0, 0, 32, 32],
                  buy: 20,
                  sell: 10,
                  stats: {curHealth: 50},
                  spawnQuant: {'1': 2, '2': 3, '3': 3, '4': 2, '5': 1}
                  },
                  'Hi Potion': {
                  name: 'Hi Potion',
                  type: 'consumable',
                  count: 15,
                  equipped: false,
                  itemArrVal: 201,
                  palette: 'potionPalette',
                  iconLoc: [64, 0, 32, 32],
                  buy: 50,
                  sell: 25,
                  stats: {curHealth: 150},
                  spawnQuant: {'4': 1, '5': 1, '6': 2, '7': 3, '8': 2, '9': 2, '10': 2}
                  },
                  'Rough Club': {
                  name: 'Rough Club',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [32, 64, 32, 32],
                  buy: 10,
                  sell: 5,
                  stats: {iAttack: 4, iStrength: 1},
                  spawnQuant: {'1': 1}
                  },
                  'Practice Sword': {
                  name: 'Practice Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [128, 0, 32, 32],
                  buy: 20,
                  sell: 10,
                  stats: {iAttack: 12, iStrength: 2},
                  spawnQuant: {'2': 1}
                  },
                  'Short Sword': {
                  name: 'Short Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [160, 0, 32, 32],
                  buy: 40,
                  sell: 20,
                  stats: {iAttack: 20, iStrength: 4},
                  spawnQuant: {'4': 1}
                  },
                  'Bronze Sword': {
                  name: 'Bronze Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [64, 0, 32, 32],
                  buy: 60,
                  sell: 30,
                  stats: {iAttack: 32, iStrength: 5, iAgility: 1},
                  spawnQuant: {'5': 1}
                  },
                  'Rune Sword': {
                  name: 'Rune Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [96, 0, 32, 32],
                  buy: 80,
                  sell: 40,
                  stats: {iAttack: 44, iStrength: 7, iAgility: 2},
                  spawnQuant: {'7': 1}
                  },
                  'Coral Sword': {
                  name: 'Coral Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [0, 0, 32, 32],
                  buy: 110,
                  sell: 55,
                  stats: {iAttack: 60, iStrength: 9, iAgility: 2},
                  spawnQuant: {'9': 1}
                  },
                  'Dark Sword': {
                  name: 'Dark Sword',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'medWepPalette',
                  iconLoc: [32, 0, 32, 32],
                  buy: 140,
                  sell: 70,
                  stats: {iAttack: 80, iStrength: 11, iAgility: 3},
                  spawnQuant: {'10': 1}
                  },
                  // Polearms
                  'Long Pole': {
                  name: 'Long Pole',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [64, 128, 32, 32],
                  buy: 10,
                  sell: 5,
                  stats: {iAttack: 4, iDurability: 1},
                  spawnQuant: {'1': 1}
                  },
                  'Big Spade': {
                  name: 'Big Spade',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [128, 128, 32, 32],
                  buy: 20,
                  sell: 10,
                  stats: {iAttack: 8, iVitality: 1, iDurability: 1},
                  spawnQuant: {'2': 1}
                  },
                  'Trident': {
                  name: 'Trident',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [192, 0, 32, 32],
                  buy: 40,
                  sell: 20,
                  stats: {iAttack: 16, iVitality: 2, iDurability: 1, iStrength: 1},
                  spawnQuant: {'4': 1}
                  },
                  'Narrow Spear': {
                  name: 'Narrow Spear',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [160, 0, 32, 32],
                  buy: 60,
                  sell: 30,
                  stats: {iAttack: 24, iVitality: 3, iDurability: 2, iStrength: 2},
                  spawnQuant: {'5': 1}
                  },
                  'Rune Voulge': {
                  name: 'Rune Voulge',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [128, 64, 32, 32],
                  buy: 80,
                  sell: 40,
                  stats: {iAttack: 36, iVitality: 4, iDurability: 2, iStrength: 4},
                  spawnQuant: {'7': 1}
                  },
                  'Coral Bardiche': {
                  name: 'Coral Bardiche',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [32, 128, 32, 32],
                  buy: 110,
                  sell: 55,
                  stats: {iAttack: 48, iVitality: 4, iDurability: 4, iStrength: 5},
                  spawnQuant: {'9': 1}
                  },
                  'Royal Poleaxe': {
                  name: 'Royal Poleaxe',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'longWepPalette',
                  iconLoc: [128, 0, 32, 32],
                  buy: 140,
                  sell: 70,
                  stats: {iAttack: 72, iVitality: 5, iDurability: 5, iStrength: 5},
                  spawnQuant: {'10': 1}
                  },
                  'Bent Stick': {
                  name: 'Bent Stick',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [96, 160, 32, 32],
                  buy: 10,
                  sell: 5,
                  stats: {iAttack: 8},
                  spawnQuant: {'1': 1}
                  },
                  'Summoning Fork': {
                  name: 'Summoning Fork',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [0, 96, 32, 32],
                  buy: 20,
                  sell: 10,
                  stats: {iAttack: 20},
                  spawnQuant: {'2': 1}
                  },
                  'Scavenged Wand': {
                  name: 'Scavenged Wand',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [32, 0, 32, 32],
                  buy: 40,
                  sell: 20,
                  stats: {iAttack: 28, iVitality: 1, iStrength: 1},
                  spawnQuant: {'4': 1}
                  },
                  'Oak Rod': {
                  name: 'Oak Rod',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [96, 128, 32, 32],
                  buy: 60,
                  sell: 30,
                  stats: {iAttack: 52, iVitality: 1, iStrength: 2},
                  spawnQuant: {'5': 1}
                  },
                  'Rune Wand': {
                  name: 'Rune Wand',
                  type: 'weapon',
                  palette: 'wandPalette',
                  iconLoc: [224, 0, 32, 32],
                  buy: 80,
                  sell: 40,
                  stats: {iAttack: 72, iVitality: 2, iStrength: 2},
                  spawnQuant: {'6': 1}
                  },
                  'Blazing Wand': {
                  name: 'Blazing Wand',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [32, 128, 32, 32],
                  buy: 110,
                  sell: 55,
                  stats: {iAttack: 88, iVitality: 2, iStrength: 2, iAgility: 2},
                  spawnQuant: {'9': 1}
                  },
                  'Divining Rod': {
                  name: 'Divining Rod',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'wandPalette',
                  iconLoc: [0, 192, 32, 32],
                  buy: 140,
                  sell: 70,
                  stats: {iAttack: 112, iVitality: 4, iStrength: 2, iAgility: 2},
                  spawnQuant: {'10': 1}
                  },
                  //Short Weapons
                  'Arrow Head': {
                  name: 'Arrow Head',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [96, 32, 32, 32],
                  buy: 10,
                  sell: 5,
                  stats: {iAttack: 4, iAgility: 1},
                  spawnQuant: {'1': 1}
                  },
                  'Bone Knife': {
                  name: 'Bone Knife',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [64, 32, 32, 32],
                  buy: 20,
                  sell: 10,
                  stats: {iAttack: 12, iAgility: 2},
                  spawnQuant: {'2': 1}
                  },
                  'Fishing Knife': {
                  name: 'Fishing Knife',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [160, 0, 32, 32],
                  buy: 40,
                  sell: 20,
                  stats: {iAttack: 20, iAgility: 4},
                  spawnQuant: {'4': 1}
                  },
                  'Jagged Dagger': {
                  name: 'Jagged Dagger',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [224, 0, 32, 32],
                  buy: 60,
                  sell: 30,
                  stats: {iAttack: 32, iStrength: 1, iAgility: 5},
                  spawnQuant: {'5': 1}
                  },
                  'Rune Dagger': {
                  name: 'Rune Dagger',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [0, 32, 32, 32],
                  buy: 80,
                  sell: 40,
                  stats: {iAttack: 48, iStrength: 2, iAgility: 6},
                  spawnQuant: {'7': 1}
                  },
                  'Coral Dagger': {
                  name: 'Coral Dagger',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [0, 0, 32, 32],
                  buy: 110,
                  sell: 55,
                  stats: {iAttack: 68, iStrength: 2, iAgility: 7},
                  spawnQuant: {'9': 1}
                  },
                  'Divining Dagger': {
                  name: 'Divining Dagger',
                  type: 'weapon',
                  count: 1,
                  equipped: false,
                  itemArrVal: 186,
                  palette: 'shortWepPalette',
                  iconLoc: [96, 0, 32, 32],
                  buy: 140,
                  sell: 70,
                  stats: {iAttack: 92, iStrength: 3, iAgility: 9},
                  spawnQuant: {'10': 1}
                  },*/
      },
      interactItem: { count: 0, type: '', item: {}, source: {} }, //type: pickup, use, equip, unequip, buy, buySuccess, buyFail, sell
      portalObjective: { coord: [], discovered: false },
      useStatPoint: { count: 0, type: '', item: {}, source: {} },
      increasedStat: { count: 0, type: '', stat: '', quant: 0 },
      quickConsume: { count: 0, num: 0 },
      enemyAttack: { count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {} },
      exchangeAttacks: { count: 0, spawnIndex: 0, attacks: [] },
      enemyDead: {
        count: 0,
        spawnIndex: 0,
        coord: [],
        source: {},
        level: 0,
        experience: 0,
        gold: 0
      },
      itemPaletteArrMap: {},
      itemPalettes: {},
      enemyPalettes: {},
      playerPalettes: {}
    };
    return _this;
  }

  _createClass(Game, [{
    key: 'resetGame',
    value: function resetGame() {
      this.setState({
        gameLevel: 1,
        bgLevelProcessed: 0,
        hero: '',
        heroIcon: null,
        heroFacing: '',
        playerPalettes: {},
        moveCount: 0,
        levelUpCount: 1,
        gameOver: false,
        inventory: {},
        playerArr: [],
        bgArr: [],
        itemArr: [],
        floorCoords: [],
        itemPalettes: {},
        itemPaletteArrMap: {},
        interactItem: { count: 0, type: '', item: {}, source: {} },
        useStatPoint: { count: 0, type: '', item: {}, source: {} },
        increasedStat: { count: 0, type: '', stat: '', quant: 0 },
        quickConsume: { count: 0, num: 0 },
        enemyArr: [],
        enemyPalettes: {},
        enemyAttack: { count: 0, roundCount: 0, spawnIndex: 0, stats: {}, source: {} },
        exchangeAttacks: { count: 0, spawnIndex: 0, attacks: [] },
        enemyDead: {
          count: 0,
          spawnIndex: 0,
          coord: [],
          source: {},
          level: 0,
          experience: 0,
          gold: 0
        }
      });
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute() {
      this.setState({ gameMuted: !this.state.gameMuted });
    }
  }, {
    key: 'updateGameClassState',
    value: function updateGameClassState() {
      var updatedEls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.setState(updatedEls);
    }
  }, {
    key: 'pickupItem',
    value: function pickupItem(coord, val, moveCount) {
      var item = Object.assign({}, this.state.itemPaletteArrMap['' + val]),
          inventory = Object.assign({}, this.state.inventory),
          itemArr = [].concat(_toConsumableArray(this.state.itemArr)),
          pArr = this.state.playerArr;

      var nState = {},
          interactItem = Object.assign({}, this.state.interactItem),
          dir = '';

      if (item.type !== 'openChest') {
        if (inventory[item.name]) inventory[item.name].count += 1;else item.count = 1, item.equipped = false, inventory[item.name] = item;

        if (['consumable', 'gold'].includes(item.type)) itemArr[coord[0]][coord[1]] = 0;else itemArr[coord[0]][coord[1]] = chestConsumables.openChest.itemArrVal;

        interactItem.count += 1;
        interactItem.type = 'pickup';
        interactItem.item = item;
        nState = { itemArr: itemArr, inventory: inventory, interactItem: interactItem, moveCount: moveCount };
      }

      dir = coord[0] < pArr[0] ? 'up' : coord[0] > pArr[0] ? 'down' : coord[1] < pArr[1] ? 'left' : 'right';

      if (this.state.heroFacing !== dir) nState.heroFacing = dir;

      nState.playerArr = coord;
      this.setState(nState);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if (this.state.overlayMode === 'off') {
        var el = e.nativeEvent.code,
            key = e.nativeEvent.key,
            _state = this.state,
            boardSize = _state.boardSize,
            floor = _state.floor,
            levels = _state.levels,
            playerArr = _state.playerArr,
            bgArr = _state.bgArr,
            itemArr = _state.itemArr,
            itemPaletteArrMap = _state.itemPaletteArrMap,
            enemyArr = _state.enemyArr,
            heroFacing = _state.heroFacing;
        var _state2 = this.state,
            gameLevel = _state2.gameLevel,
            moveCount = _state2.moveCount,
            nState = {},
            direction = '',
            row = 0,
            col = 0;


        if (el === 'KeyK') console.log(playerArr, this.state.portalObjective);

        if (this.directionKeys[el]) {
          moveCount++;
          direction = this.directionKeys[el];

          row = direction === 'up' ? playerArr[0] - 1 : direction === 'down' ? playerArr[0] + 1 : playerArr[0];

          col = direction === 'right' ? playerArr[1] + 1 : direction === 'left' ? playerArr[1] - 1 : playerArr[1];

          if (row >= 0 && row < boardSize && col >= 0 && col < boardSize && bgArr[row][col] > floor && !enemyArr[row][col]) {

            if (itemArr[row][col]) {
              this.pickupItem([row, col], itemArr[row][col], moveCount);
            } else {
              nState.playerArr = [row, col];
              nState.moveCount = moveCount;
              if (heroFacing !== direction) nState.heroFacing = direction;
              this.setState(nState);
            }
          } else if (itemArr[row][col] && itemPaletteArrMap['' + itemArr[row][col]].name === 'Active Portal') {

            if (gameLevel < levels) {
              this.setState({ gameLevel: gameLevel + 1 });
            } else {
              console.log('VICTORY!!!');
              this.setState({ gameOver: true, overlayMode: 'game-win-overlay' });
            }
          } else if (enemyArr[row][col] && enemyArr[row][col].type === 'merchant') {

            this.setState({ overlayMode: 'merchant-overlay' });
          } else {
            nState.moveCount = moveCount;
            if (heroFacing !== direction) nState.heroFacing = direction;
            this.setState(nState);
          }
        } else if (el === 'KeyI' || el === 'KeyE') {
          this.setState({ overlayMode: 'inv-overlay' });
        } else if (el === 'KeyH') {
          this.setState({ overlayMode: 'help-overlay' });
        } else if (this.consumeDigits.includes(key)) {
          this.setState({ quickConsume: { count: this.state.quickConsume.count + 1, num: el.slice(-1) } });
        } else if (this.statIncreaseKeys[el]) {
          this.setState({ useStatPoint: { count: this.state.useStatPoint.count + 1, stat: this.statIncreaseKeys[el] } });
        } else if (el === 'KeyQ' || el === 'KeyP') {
          this.toggleMute();
        }
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      ReactDOM.findDOMNode(this).focus();
    }
  }, {
    key: 'maintainFocus',
    value: function maintainFocus() {
      var _this2 = this;

      this.focus();
      this.focusID = setInterval(function () {
        return _this2.focus();
      }, 250);
    }
  }, {
    key: 'endFocus',
    value: function endFocus() {
      clearInterval(this.focusID);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.overlayMode === 'off') this.maintainFocus();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.overlayMode !== nextState.overlayMode) {
        if (nextState.overlayMode === 'off') this.maintainFocus();else this.endFocus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (this.state.gameOver) {
        this.resetGame();
      }
      if (this.state.hero && this.state.heroIcon && this.state.overlayMode === 'hero-selection-overlay') {

        setTimeout(function () {
          _this3.setState({ overlayMode: 'off' });
        }, 1000);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var gameOver = this.state.gameOver;


      return React.createElement(
        'div',
        { className: 'game', tabIndex: '0', onKeyDown: this.handleKeyDown },
        gameOver ? null : React.createElement(GameSounds, {
          gameLevel: this.state.gameLevel,
          levels: this.state.levels,
          levelUpCount: this.state.levelUpCount,
          overlayMode: this.state.overlayMode,
          gameOver: this.state.gameOver,
          gameMuted: this.state.gameMuted,
          interactItem: this.state.interactItem,
          increasedStat: this.state.increasedStat,
          exchangeAttacks: this.state.exchangeAttacks,
          enemyDead: this.state.enemyDead }),
        React.createElement(
          'div',
          { className: 'game-display' },
          React.createElement(
            'div',
            { className: 'col-lft' },
            gameOver ? null : React.createElement(GameLevel, {
              gameLevel: this.state.gameLevel }),
            gameOver ? null : React.createElement(Hero, {
              tileSize: this.state.tileSize,
              hero: this.state.hero,
              heroIcon: this.state.heroIcon,
              gameOver: this.state.gameOver,
              inventory: this.state.inventory,
              interactItem: this.state.interactItem,
              useStatPoint: this.state.useStatPoint,
              increasedStat: this.state.increasedStat,
              enemyAttack: this.state.enemyAttack,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead,
              itemPalettes: this.state.itemPalettes,
              updateGameClassState: this.updateGameClassState })
          ),
          React.createElement(
            'div',
            { className: 'col-mid' },
            React.createElement(
              'div',
              { className: 'title' },
              React.createElement('img', { src: 'img/gui/CrimsonQuestTitle.png' })
            ),
            gameOver ? null : React.createElement(GameStage, {
              boardSize: this.state.boardSize,
              tileSize: this.state.tileSize,
              floor: this.state.floor,
              gameLevel: this.state.gameLevel,
              levels: this.state.levels,
              bgLevelProcessed: this.state.bgLevelProcessed,
              hero: this.state.hero,
              heroFacing: this.state.heroFacing,
              overlayMode: this.state.overlayMode,
              playerArr: this.state.playerArr,
              bgArr: this.state.bgArr,
              itemArr: this.state.itemArr,
              enemyArr: this.state.enemyArr,
              floorCoords: this.state.floorCoords,
              inventory: this.state.inventory,
              interactItem: this.state.interactItem,
              portalObjective: this.state.portalObjective,
              enemyDead: this.state.enemyDead,
              itemPaletteArrMap: this.state.itemPaletteArrMap,
              itemPalettes: this.state.itemPalettes,
              enemyPalettes: this.state.enemyPalettes,
              playerPalettes: this.state.playerPalettes,
              toggleMute: this.toggleMute,
              updateGameClassState: this.updateGameClassState }),
            gameOver ? null : React.createElement(ConsumableItems, {
              tileSize: this.state.tileSize,
              inventory: this.state.inventory,
              interactItem: this.state.interactItem,
              quickConsume: this.state.quickConsume,
              itemPalettes: this.state.itemPalettes,
              updateGameClassState: this.updateGameClassState })
          ),
          React.createElement(
            'div',
            { className: 'col-rgt' },
            gameOver ? null : React.createElement(CurrentObjective, {
              gameLevel: this.state.gameLevel,
              enemyDead: this.state.enemyDead }),
            gameOver ? null : React.createElement(EnemyManager, {
              tileSize: this.state.tileSize,
              floor: this.state.floor,
              gameLevel: this.state.gameLevel,
              itemLevelProcessed: this.state.itemLevelProcessed,
              moveCount: this.state.moveCount,
              playerArr: this.state.playerArr,
              bgArr: this.state.bgArr,
              enemyArr: this.state.enemyArr,
              floorCoords: this.state.floorCoords,
              portalObjective: this.state.portalObjective,
              enemyAttack: this.state.enemyAttack,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead,
              enemyPalettes: this.state.enemyPalettes,
              updateGameClassState: this.updateGameClassState }),
            gameOver ? null : React.createElement(ActivityLog, {
              gameLevel: this.state.gameLevel,
              levelUpCount: this.state.levelUpCount,
              interactItem: this.state.interactItem,
              increasedStat: this.state.increasedStat,
              exchangeAttacks: this.state.exchangeAttacks,
              enemyDead: this.state.enemyDead }),
            gameOver ? null : React.createElement(GameTips, null)
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

/**
	*		Static Page Components
	*/

/**
	*		@desc React Class renders page header
	*		@returns {HTML} page header
	*/


var PageHeader = function (_React$Component2) {
  _inherits(PageHeader, _React$Component2);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg-header' },
        React.createElement(
          'h1',
          null,
          'CrimsonQuest'
        )
      );
    }
  }]);

  return PageHeader;
}(React.Component);

/**
	*		@desc React Class renders page footer
	*		@returns {HTML} page header
	*/


var PageFooter = function (_React$Component3) {
  _inherits(PageFooter, _React$Component3);

  function PageFooter() {
    _classCallCheck(this, PageFooter);

    return _possibleConstructorReturn(this, (PageFooter.__proto__ || Object.getPrototypeOf(PageFooter)).apply(this, arguments));
  }

  _createClass(PageFooter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg-footer' },
        React.createElement(
          'span',
          null,
          '\xA9 2017 Isaac Burbank.'
        ),
        React.createElement(
          'span',
          null,
          '\xA0',
          React.createElement(
            'a',
            { href: 'https://github.com/IMBurbank/crimson-quest/tree/master', target: '_blank' },
            'Click here'
          ),
          '\xA0for details and credits.'
        )
      );
    }
  }]);

  return PageFooter;
}(React.Component);

/**
	*		Full App Class
	*/

/**
	*		@desc React Class renders full page
	*		@returns {HTML} full app
	*/


var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'pg' },
        React.createElement(
          'div',
          { className: 'pg-content' },
          React.createElement(Game, null)
        ),
        React.createElement(PageFooter, null)
      );
    }
  }]);

  return App;
}(React.Component);

/**
	*		Render App to DOM
	*/

/**
	*		@desc ReactDOM renders app to HTML root node
	*		@returns {DOM} full page
	*/


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));