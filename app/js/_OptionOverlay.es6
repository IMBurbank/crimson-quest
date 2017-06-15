
//props: playerArr, enemyArr, inventory, interactItem, overlayMode, updateGameClassState, playerPalettes, tileSize
class OptionOverlay extends React.Component {

  render() {
    const mode = this.props.overlayMode;

    let content = null;

    if (mode === 'inv-overlay') {
      content = (
        <InventoryOverlay
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'help-overlay') {
      content = (
        <OverlayHelp
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'merchant-overlay') {
      content = (
        <OverlayMerchant
          playerArr = {this.props.playerArr}
          enemyArr = {this.props.enemyArr}
          inventory = {this.props.inventory}
          interactItem = {this.props.interactItem}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'game-over-overlay') {
      content = (
        <OverlayGameOver
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'game-win-overlay') {
      content = (
        <OverlayGameWin
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    } else if (mode === 'hero-selection-overlay') {
      content = (
        <OverlayHeroSelection
          tileSize = {this.props.tileSize}
          playerPalettes = {this.props.playerPalettes}
          updateGameClassState = {this.props.updateGameClassState}  />
      );
    }

    return (
      <div>{content}</div>
    );
  }
}
