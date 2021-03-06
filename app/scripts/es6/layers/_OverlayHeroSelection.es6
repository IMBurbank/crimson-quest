/**
  *		@desc GameStage overlay for hero selection.
	*		@param {object} props - Component props.
	*		@param {number} props.tileSize - Pixel dimension of rendered game tiles.
	*		@param {object} props.playerPalettes - Hero sprite sheets on canvas.
	*		@param {function} props.toggleMute - Toggle Game component gameMuted state.
	*		@param {function} props.updateGameClassState - Update Game component state.
  *   @returns HTML GameStage overlay for hero selection.
  */

class OverlayHeroSelection extends React.Component {
  constructor(props) {
    super(props);
    this.initOverlay = this.initOverlay.bind(this);
    this.optKeyDown = this.optKeyDown.bind(this);
    this.focus = this.focus.bind(this);

    this.state = ({
      heroTypes: [],
      heroSelectionMessage: '',
      currentSelection: '',
    });
  }

  initOverlay() {
    const heroSelectionMessage = (
      'It was a stroke of luck to have intercepted their plot. ' +
      'The evil horde is gathering strength to sweep across your homeland. ' +
      'Your only hope is a preemptive strike at their very heart. ' +
      'Choose your hero wisely'
    );

    let heroTypes = [],
      heroType = '',
      currentSelection = '';

    for (heroType in heroTypeStats) heroTypes.push(heroType);

    currentSelection = heroTypes[0];

    this.setState({ heroTypes, heroSelectionMessage, currentSelection });
  }

  optKeyDown(e) {
    const {heroTypes} = this.state,
      el = e.nativeEvent.code;

    let {currentSelection} = this.state,
      index = heroTypes.indexOf(currentSelection);

    if ((el === 'ArrowUp' && index > 0) || (el === 'ArrowDown' && index < heroTypes.length - 1)) {
      index = el === 'ArrowUp' ? index - 1 : index + 1;
      currentSelection = heroTypes[index];

      this.setState({ currentSelection });

    } else if (el === 'Space' || el === 'Enter' || el === 'NumpadEnter') {
      this.props.updateGameClassState({ hero: currentSelection });
    } else if (el === 'KeyQ' || el === 'KeyP') {
      this.props.toggleMute();
    }
  }

  focus() {
    ReactDOM.findDOMNode(this).focus();
  }

  componentWillMount() {
    this.initOverlay();
  }

  componentDidMount() {
    this.focus();
    this.focusID = setInterval( () => this.focus(), 250 );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentSelection !== nextState.currentSelection ||
      (!Object.keys(this.props.playerPalettes).length &&
        Object.keys(nextProps.playerPalettes).length)) {
      return true;
    }

    return false
  }

  componentWillUnmount() {
    clearInterval(this.focusID);
  }


  render() {
    const {heroTypes, heroSelectionMessage, currentSelection} = this.state,
      playerPalettes = this.props.playerPalettes[currentSelection.toLowerCase()+'Img'] ?
        this.props.playerPalettes : null;

    let heroSelectionRows = heroTypes.map(
      (type, i) => {
        return (
          <OverlayHeroSelectionRow
            tileSize = {this.props.tileSize}
            heroType = {type}
            playerPalettes = {playerPalettes}
            key = {type + i}
            position = {i}
            currentSelection = {currentSelection}  />
        );
      }
    );


    return (
      <div
        id='hero-selection-overlay'
        className='stage-overlay'
        tabIndex='1'
        onKeyDown={this.optKeyDown}
      >
        <h4 className='hero-selection-header'>CHOOSE YOUR FATE</h4>
        <div className='hero-selection-message'>{heroSelectionMessage}</div>

        {heroSelectionRows}
      </div>
    );
  }
}
