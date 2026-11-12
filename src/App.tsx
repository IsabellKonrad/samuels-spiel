import { useState, useEffect } from 'react';

// 1. TypeScript Interface fuer unsere Lernobjekte
interface LearningItem {
  word: string;
  letter: string;
  emoji: string; // Fuer den Prototyp nutzen wir Emojis, spaeter echte Bilder
}

const initialItems: LearningItem[] = [
  { word: 'Baum', letter: 'B', emoji: '🌳' },
  { word: 'Apfel', letter: 'A', emoji: '🍎' },
  { word: 'Auto', letter: 'A', emoji: '🚗' },
  { word: 'Hund', letter: 'H', emoji: '🐕' },
  { word: 'Ball', letter: 'B', emoji: '⚽' },
  { word: 'Fisch', letter: 'F', emoji: '🐟' },
  { word: 'Sonne', letter: 'S', emoji: '☀️' },
  { word: 'Katze', letter: 'K', emoji: '🐱' },
  { word: 'Mond', letter: 'M', emoji: '🌙' },
  { word: 'Haus', letter: 'H', emoji: '🏠' },
  { word: 'Ente', letter: 'E', emoji: '🦆' },
  { word: 'Stern', letter: 'S', emoji: '⭐' },
  { word: 'Buch', letter: 'B', emoji: '📖' },
  { word: 'Bus', letter: 'B', emoji: '🚌' },
  { word: 'Elefant', letter: 'E', emoji: '🐘' },
  { word: 'Banane', letter: 'B', emoji: '🍌' },
  { word: 'Blume', letter: 'B', emoji: '🌸' },
  { word: 'Fahrrad', letter: 'F', emoji: '🚲' },
  { word: 'Hase', letter: 'H', emoji: '🐰' },
  { word: 'Kuh', letter: 'K', emoji: '🐮' },
  { word: 'Maus', letter: 'M', emoji: '🐭' },
  { word: 'Schiff', letter: 'S', emoji: '🚢' },
  { word: 'Schuh', letter: 'S', emoji: '👞' },
  { word: 'Zug', letter: 'Z', emoji: '🚂' },
];

// Hilfsfunktion: Zufaellige Buchstaben fuer die 5 Buttons generieren
const generateOptions = (correctLetter: string): string[] => {
 const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 const options = [correctLetter];

 while (options.length < 5) {
  const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
  if (!options.includes(randomChar)) {
    options.push(randomChar);
  }  
 }
 // Buchstaben mischen, damit der richtige nicht immer an derselben Stelle steht
 return options.sort(() => Math.random() - 0.5);
};

const shuffleArray = (array: any[]): any[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function LetterQuizForSamuel() {
  // Items beim Start direkt zufaellig durchmischen
 const [items, setItems] = useState<LearningItem[]>(() => shuffleArray(initialItems));
 const [currentIndex, setCurrentIndex] = useState<number>(0);
 const [feedback, setFeedback] = useState<string>('');

 const currentItem = items[currentIndex];


  // Direkt beim Start mit gültigen Optionen initialisieren
  const [options, setOptions] = useState<string[]>(() => generateOptions(currentItem.letter));

  // Wenn sich das Wort aendert, neue 5 Buchstaben-Buttons generieren
 useEffect(() => {
  setOptions(generateOptions(currentItem.letter));
 }, [currentIndex]);

  const handleSelectLetter = (selectedLetter: string) => {
    if (selectedLetter === currentItem.letter) {
      setFeedback('Richtig! 🎉 Toll gemacht, Samuel!');
      setTimeout(() => {
        // Zum nächsten Item wechseln oder neu mischen, wenn das Ende erreicht ist
        if (currentIndex + 1 < items.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Wenn alle durch sind: Liste neu mischen und von vorn beginnen!
          setItems(shuffleArray(initialItems));
          setCurrentIndex(0);
        }
        setFeedback('');
      }, 2000);
    } else {
      setFeedback('Fast! Probier es noch einmal. 💪');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-50 p-10 pt-16 text-center gap-8">
      <h1 className="text-3xl font-bold text-blue-800">
        Welcher Buchstabe ist das?
      </h1>

      {/* Großes Bild / Emoji für Dreijährige gut erkennbar */}
      <div className="text-9xl bg-white p-8 rounded-2xl shadow-md">
        {currentItem.emoji}
      </div>

      {/* 5 bunte Buchstab-Buttons */}
      <div className="flex flex-wrap justify-center gap-4 max-w-md">
        {options.map((letter, index) => (
          <button
          key={index}
          onClick={() => handleSelectLetter(letter)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold rounded-2xl shadow-lg transition transform hover:scale-105 active:scale-95"
          >
          {letter}
          </button>
        ))}
      </div>


      {feedback && (
        <p className="text-2xl font-semibold text-green-600 animate-bounce">
          {feedback}
        </p>
      )}
    </div>
  );
}