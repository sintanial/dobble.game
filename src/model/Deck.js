var figures = require('./Figures');
var Card = require('./Card');
var Figure = require('./Figure');

function Deck(config) {

    this.order = config.order;
    this.deckLength = this.order * this.order + this.order + 1;
    this.figures = figures; //.shuffle();
    this.cards = [];
    this.orderStack = require('./orders/order_' + this.order + '.js');

}

Deck.prototype.addCards = function () {

    for ( var i = 0; i < this.deckLength; i++) {
        var tmpFigures = [];
        for (var j = 0; j < this.orderStack[i].length; j++) {
            var tmpFigure = new Figure(this.figures[this.orderStack[i][j]])
            tmpFigures.push(tmpFigure)
        }
        this.cards.push(new Card({figures: tmpFigures}));
    }

}

Deck.prototype.shuffle = function () {
    this.cards.shuffle();
}

module.exports = Deck;
