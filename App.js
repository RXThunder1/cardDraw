import React, { useState, useEffect } from 'react';

const CardApp = () => {
  const [deckId, setDeckId] = useState(null);
  const [card, setCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
      setRemainingCards(data.remaining);
    };

    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (remainingCards === 0) {
      alert('Error: no cards remaining!');
      return;
    }

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
    const data = await response.json();
    setCard(data.cards[0]);
    setRemainingCards(data.remaining);
  };

  const shuffleDeck = async () => {
    if (isShuffling) return;

    setIsShuffling(true);
    setCard(null);

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const data = await response.json();
    setRemainingCards(data.remaining);
    setIsShuffling(false);
  };

  return (
    <div>
      <h1>Draw a Card</h1>
      {card && <img src={card.image} alt={card.value + ' of ' + card.suit} />}
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
      </button>
    </div>
  );
};

export default CardApp;