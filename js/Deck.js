function Deck( ) {

    let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
    let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
    let deck = [];

    this.create = function() {
        for(let suitIdx = 0; suitIdx<suits.length; suitIdx++){
            for(let valueIdx = 0; valueIdx < values.length; valueIdx++){
                let card = new Card (
                    suits[suitIdx],
                    values[valueIdx]
                )
                deck.push(card);
            }
        }
        for(let i = 0; i < deck.length; i++) {
            let swapIdx = Math.trunc(Math.random() * deck.length);
            let tmp = deck[swapIdx];
            deck[swapIdx] = deck[i];
            deck[i] = tmp;
        }
        return deck;
    }
}