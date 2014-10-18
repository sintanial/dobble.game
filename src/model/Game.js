function Game(config) {

    this.players = config.players === undefined ? [] : config.players;
    this.deck    = config.deck;
    this.isStarted = false;

    // новая игра начинается только если есть колода карт
    this.deck.addCards();

}
/**
 * Add player to game. Error if game started
 * @param player
 */
Game.prototype.addPlayer = function (player) {
    if (!this.isStarted) {
        this.players.push(player);
    } else {
        // ошибка
        console.log('Trying to add player while game goes');
    }

}

Game.prototype.getPlayers = function () {
    return this.players;
}

Game.prototype.start = function () {

    // пока просто так, удалю если что
    this.isStarted = true;

    var mainCard = this.deck.cards.pop();
    if (mainCard === undefined) {
        // ошибка. пока оставим так
        console.log("Dock has no card to set it as main");
    } else {
        this.setMainCard(mainCard);
    }
}

/**
 * Deal cards to players. At least one card must stay alone
 */
Game.prototype.deal = function () {
    var playersCount = this.players.length,
        cardsCount = this.deck.cards.length,
        countPlayerCards = Math.floor(cardsCount / playersCount);

    //console.log(countPlayerCards);

    if (cardsCount % countPlayerCards == 0) {
        countPlayerCards -= 1;
    }
    //console.log(countPlayerCards);
    for (var i = 0; i < countPlayerCards * playersCount; i++) {

        this.players[i % playersCount].cards.push(this.deck.cards.pop())

    }

}

/**
 * Main card on the table
 * @param Card card
 */
Game.prototype.setMainCard = function (card) {
    this.mainCard = card;
}

module.exports = Game;
