function Card(config) {
    this.figures = config.figures;
}

Card.prototype.addFigure = function (figure) {
    this.figures.push(figure);
}

module.exports = Card;