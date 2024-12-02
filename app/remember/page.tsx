'use client';
import React, { useState, useEffect } from 'react';
import styles from './r.module.css';

type Card = {
  id: number;
  content: string;
  matched: boolean;
};

const MemoryGame: React.FC = () => {
  const initialCards: Card[] = [
    { id: 1, content: '🍎', matched: false },
    { id: 2, content: '🍌', matched: false },
    { id: 3, content: '🍇', matched: false },
    { id: 4, content: '🍉', matched: false },
    { id: 5, content: '🍓', matched: false },
    { id: 6, content: '🍒', matched: false },
    { id: 7, content: '🍍', matched: false },
    { id: 8, content: '🥝', matched: false },
    { id: 9, content: '🍑', matched: false },
    { id: 10, content: '🍈', matched: false },
    { id: 11, content: '🍋', matched: false },
    { id: 12, content: '🍊', matched: false },
    // Duplicate each card to create pairs
    { id: 13, content: '🍎', matched: false },
    { id: 14, content: '🍌', matched: false },
    { id: 15, content: '🍇', matched: false },
    { id: 16, content: '🍉', matched: false },
    { id: 17, content: '🍓', matched: false },
    { id: 18, content: '🍒', matched: false },
    { id: 19, content: '🍍', matched: false },
    { id: 20, content: '🥝', matched: false },
    { id: 21, content: '🍑', matched: false },
    { id: 22, content: '🍈', matched: false },
    { id: 23, content: '🍋', matched: false },
    { id: 24, content: '🍊', matched: false },
  ].sort(() => 0.5 - Math.random()); // Shuffle the cards

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || cards[index].matched || selectedCards.includes(index)) return;

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      checkForMatch(newSelectedCards);
    }
  };

  const checkForMatch = (newSelectedCards: number[]) => {
    const [firstIndex, secondIndex] = newSelectedCards;
    if (cards[firstIndex].content === cards[secondIndex].content) {
      setMessage('🎉 It’s a match!');
      setCards(prevCards =>
        prevCards.map((card, idx) =>
          idx === firstIndex || idx === secondIndex ? { ...card, matched: true } : card
        )
      );
    } else {
      setMessage('❌ Not a match, try again!');
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
    setTimeout(() => setMessage(''), 1000);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards]);

  return (
    <div className={styles.gameContainer}>
      <h1>Memory Game</h1>
      <p>{message}</p>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.card} ${selectedCards.includes(index) || card.matched ? styles.flipped : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {selectedCards.includes(index) || card.matched ? card.content : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;