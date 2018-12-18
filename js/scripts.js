var _ante;
var playingField = document.getElementById('playingField');
var dealersHand = document.getElementById('dealer');
var player0Hand = document.getElementById('player0');
var player1Hand = document.getElementById('player1');
var player2Hand = document.getElementById('player2');
var player3Hand = document.getElementById('player3');
_startingMoneyAmount = 200;

var _players = [new Player('Huey', _startingMoneyAmount),
                new Player('Dewey', _startingMoneyAmount),
                new Player('Luey', _startingMoneyAmount),
                new Player('Scrooge', _startingMoneyAmount)];

var _dealer = new Dealer('Dealer');

function play( ) {
    addDots( );
}

function hit( ) {
    addCards( );
}

function showDealerHand( ) {
    let flip = document.getElementById("flip");
    dealersHand.removeChild(flip);
    flip = document.getElementById("card");
    dealersHand.removeChild(flip);
    for (let l = 0; l < _dealer.dealerHand.length; l++) {
        var card = document.createElement('div');
        card.innerHTML = _dealer.dealerHand[l].imageInnerHTML;
        card.className="dot";
        dealersHand.append(card);
    }
}

function stay( ) {
    for ( let i = 0; i < _players.length; i++ ) {        
        //The dealer hand will not be completed if all players have either busted or received blackjack
        var dealerComplete = false;
        let handIndex = 0;
        for ( let j = 0; j < _players.length; j++ ) {
            let playerDisposition = _players[j].evaluate( _dealer.getUpCard(), handIndex );
            //let playerDisposition = _players[j].evaluate( _dealer.getUpCard(), 1 );
            if ( playerDisposition != 'Win' && playerDisposition != 'Bust' && playerDisposition != 'W') {
                dealerComplete = true;
            }
        }
   }
   if ( dealerComplete ) while ( _dealer.evaluateDealer() < 17) _dealer.deal()
   showDealerHand( );
   printResults( _dealer, _players );
}

function showDeal( player, playerNumber ) {
    if ( player ) {
        for (let k = 0; k < player.hands[0].length; k ++) {
            var card = document.createElement('div');
            card.innerHTML = player.hands[0][k].imageInnerHTML;
            card.className="dot";
            switch (playerNumber) {
                case 0:
                player0Hand.append(card);
                break;
                case 1:
                player1Hand.append(card);
                break;
                case 2:
                player2Hand.append(card);
                break;
                case 3:
                player3Hand.append(card);
                break;
                default:
                break;
            }
        }
    } else {
        for (let l = 0; l < _dealer.dealerHand.length; l++) {
            var card = document.createElement('div');
            
            if ( l === 0 ) {
                card.innerHTML = '<img src="img/card_back.svg">';
                card.id = "flip";
            } else {
                card.innerHTML = _dealer.dealerHand[1].imageInnerHTML;
                card.id = "card";
            }
            card.className="dot";
            dealersHand.append(card);
        }
    }
}


function showPlayerCard( player, playerNumber ) {
    let k = player.hands[0].length;
    var card = document.createElement('div');
    card.innerHTML = player.hands[0][k - 1].imageInnerHTML;
    card.className="dot";
    switch (playerNumber) {
        case 0:
        player0Hand.append(card);
        break;
        case 1:
        player1Hand.append(card);
        break;
        case 2:
        player2Hand.append(card);
        break;
        case 3:
        player3Hand.append(card);
        break;
        default:
        break;
    }
}

function addCards( ) {
    _dealer.deal( _players[3], 0 );
    showPlayerCard( _players[3], 3);
}

function addDots( ) {

    for (let j = 0; j < 2; j++ ) for (let i = 0; i < _players.length + 1; i++) _dealer.deal( _players[i], 0 );

    showDeal( dealer.dealersHand );
    for (var num = 0; num <= 3; num++) showDeal( _players[num], num);

    play = function( i, handIndex ) {
        // insurance not recommended for long run
        if ( _dealer.getUpCard().value === 'Ace' ) _players[i].insurance( )
        let playerDecision = '';
    
        let handSize = _players[i].hands[handIndex].length;
        if ( handSize > 1 ) playerDecision = _players[i].evaluate( _dealer.getUpCard(), handIndex );
    
        switch ( handSize ) {
            case 1:         // hand was split, needs another card before evaluating
                _dealer.deal( _players[i], handIndex );  
                playerDecision = _players[i].evaluate( _dealer.getUpCard(), handIndex );
                break;
            case 2:         // can only double down on first two cards
                if ( playerDecision.charAt( 0 ) === 'D' ) playerDecision = playerDecision.charAt( 0 );
                break;
            case 3:         // double down not allowed, so get the second character in 'Dh' or 'Ds' for decision
                if ( playerDecision.charAt( 0 ) === 'D' ) playerDecision = playerDecision.charAt( 1 ).toUpperCase( );
                break;
            default:
                break;
        }
        
        switch ( playerDecision ) {
            case 'W':       // surrender not advised for basic strategy in long run
                _players[i].surrender( _ante );
                break;
            case 'D':       // double down--only one more card to be dealt
                _dealer.deal( _players[i], handIndex );
                showPlayerCard( _players[i], i );
                break;  
            case 'L':       // split hand, deal on current hand until played out
                _players[i].split( handIndex );
                _dealer.deal( _players[i], handIndex );
                while ( handIndex < _players[i].hands.length )
                    play( i, handIndex++ );
                break;
            case 'H':       // surrender (W) not allowed on third card, so hit; also 'Dh' is hit with > 2 cards 
                while ( _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'H' || 
                        _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'W' ||
                        _players[i].evaluate( _dealer.getUpCard(), handIndex ) === 'Dh') {
                            _dealer.deal( _players[i], handIndex );
                            showPlayerCard( _players[i], i );
                        }
                break;
            default:
                break;
        }
    }
    
    for ( let i = 0; i < _players.length - 1; i++ ) {
        //start of game play
        let handIndex = 0;
        play( i, handIndex );
    }
}