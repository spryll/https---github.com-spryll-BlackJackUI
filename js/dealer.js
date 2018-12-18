var _player = new Player();
var deck = new Deck();
var deck = deck.create();

function Dealer(name){
    this.name = name,
    this.hasNatural = false,
    this.dealerHand =[],

    this.stack = function( card ) {
        deck.push( card );
    },

    this.deal = function( player, hand ){
        if (player) player.hands[hand].push(this.getNextCard());
        else this.dealerHand.push(this.getNextCard());
    },

    this.getNextCard = function() {
        return deck.shift();
        //return deck.pop();
    },

    this.getCardNumericValue = function(card){
        switch(card.value){
            case 'Ace':
                return 1;
            case 'Two':
                return 2;
            case 'Three':
                return 3;
            case 'Four':
                return 4;
            case 'Five':
                return 5;
            case 'Six':
                return 6;
            case 'Seven':
                return 7;
            case 'Eight':
                return 8;
            case 'Nine':
                return 9;
            default:
                return 10;
        }
    },

    this.scoreHand = function( hand ){
        let score = 0;
        let isSoft = false;
        for( let i = 0; i < hand.length; i++ ){
            if ( hand[i].value === 'Ace' ) isSoft = true
            score += this.getCardNumericValue(hand[i]);
        }
        if ( isSoft ) {
            score += 10;
            if ( score > 21 ) score -=10;
            else if ( score === 21 && hand.length === 2 ) score = 'Blackjack'
        }
        return score;
    },
    this.evaluateDealer = function( ) {
        let score = 0;
        let isSoft = false;

        for ( let i = 0; i < this.dealerHand.length; i++ ) {
            if ( this.dealerHand[i].value === 'Ace' ) isSoft = true
            score += this.getCardNumericValue(this.dealerHand[i]);
        }
        if ( isSoft ) {
            score += 10;
            if ( score === 21 ) {}
            else if ( score > 17 ) score -=10;
        }
        return score;
    },

    this.evaluateRound = function(playerScore, dealerScore){
        if(evaluate(_player['playerHand']) > evaluate(dealer['dealerHand'] && evaluate(_player['[playerHand'].score)) <= 21){
            payOut();
        }
        else {
            collectAnte();
        }
    },

    this.getUpCard = function(){
        return this.dealerHand[1];
    },

    this.payOut = function(){
        _player.money += ante * 2;
    },

    this.collectAnte = function(){
        _player.money += 0;
    }
};