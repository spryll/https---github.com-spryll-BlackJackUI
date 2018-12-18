function Card( suit, value ) {
    this.suit = suit,
    this.value = value,
    this.imageInnerHTML = '<img src="img/' + value.toLowerCase() + '_' + suit.toLowerCase() + '.svg">';
}