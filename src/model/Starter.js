require('./functions');
var Deck = require('./Deck');
var Game = require('./Game');
var Player = require('./Player');

var order = 7;

// create game
var game = new Game({players: [], deck: new Deck({order: order})});

game.deck.shuffle();

game.addPlayer(new Player({name : 'Huk'}));
game.addPlayer(new Player({name : 'Kris'}));
game.addPlayer(new Player({name : 'Fil'}));

game.deal();
//game.start();
console.log(game.deck.cards);
