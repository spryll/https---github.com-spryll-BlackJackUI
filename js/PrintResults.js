printResults = function( _dealer, _players) {  // this function prints the tabular report to the console
    let width = 10;

    let names = _dealer.name;
    names += ' '.repeat(width - _dealer.name.length);
    let uline = '-'.repeat( _dealer.name.length);
    uline += ' '.repeat(width - _dealer.name.length);
    let printCards = [];
  
    for ( var p = 0;  p < _dealer.dealerHand.length; p++ ) {
        if ( p === 1 ) {
            printCards[p] = '*' + _dealer.dealerHand[p].value;
        }
        else {
            printCards[p] = _dealer.dealerHand[p].value;
        }
        printCards[p] += ' '.repeat( width - _dealer.dealerHand[p].value.length - p );
    }
    var scores = '' + _dealer.scoreHand( _dealer.dealerHand );
    scores += ' '.repeat( width - scores.length );
    let handsCount = 0;

    for (let i = 0; i < _players.length; i++) {
        names += _players[i].name;
        uline += '-'.repeat(_players[i].name.length);
        let numHands = _players[i].hands.length;

        for ( k = 0; k < numHands; k++ ) {
            handsCount++;

            for ( var m = 0;  m < _players[i].hands[k].length; m++ ) {
                if ( typeof printCards[m] === 'undefined' ) {
                    printCards[m] = '';
                }
                if ( printCards[m].length < handsCount * 10) {
                    printCards[m] += ' '.repeat( handsCount * 10 - printCards[m].length);
                } 
                printCards[m] += _players[i].hands[k][m].value;
                printCards[m] += ' '.repeat( width - _players[i].hands[k][m].value.length );
            }
            let score = '' + _dealer.scoreHand( _players[i].hands[k] );
            scores += score;
            scores += ' '.repeat( width - score.length );
        }
        for (let j = width * numHands; j > _players[i].name.length; j--) { 
            names += ' '; 
            uline += ' ';
        }
    }
    console.log(names);
    console.log(uline); 
    for ( let n = 0; n < printCards.length; n++ ) console.log( printCards[n] );
    console.log(scores);
}