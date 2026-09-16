import React, { useState } from 'react';

// Отдельный компонент для карточки
const Flashcard = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-48 cursor-pointer group perspective">
      <div 
        className={`w-full h-full transition-all duration-500 transform-style-preserve-3d shadow-md rounded-xl p-6 flex items-center justify-center border border-slate-200 ${isFlipped ? 'rotate-y-180 bg-cyan-50' : 'bg-white'}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(card.id); }}
          className="absolute top-2 right-3 text-slate-300 hover:text-red-500 z-10"
        >
          ✖
        </button>
        
        <div className="text-center">
          {isFlipped ? (
            <p className="text-lg font-medium text-slate-800 transform rotate-y-180">{card.definition}</p>
          ) : (
            <h3 className="text-xl font-bold text-slate-900">{card.term}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

// Главный компонент
function App() {
  // Стартовые данные для примера
  const [cards, setCards] = useState([
    { id: 1, term: "Deployment", definition: "Развертывание приложения на боевом сервере." },
    { id: 2, term: "Present Perfect", definition: "Действие завершилось к текущему моменту (have/has + V3)." },
    { id: 3, term: "Props", definition: "Способ передачи данных от родительского компонента к дочернему." }
  ]);

  const [termInput, setTermInput] = useState('');
  const [defInput, setDefInput] = useState('');

  // Добавление новой карточки
  const addCard = (e) => {
    e.preventDefault();
    if (!termInput.trim() || !defInput.trim()) return;

    const newCard = {
      id: Date.now(), // Простой способ получить уникальный ID
      term: termInput,
      definition: defInput
    };

    setCards([...cards, newCard]);
    setTermInput('');
    setDefInput('');
  };

  // Удаление карточки (передаем эту функцию вниз через пропсы)
  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Умные Флеш-карточки</h1>
        
        {/* Форма создания */}
        <form onSubmit={addCard} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-10 flex gap-4">
          <input 
            type="text" 
            placeholder="Термин (например: API)" 
            value={termInput}
            onChange={(e) => setTermInput(e.target.value)}
            className="flex-1 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500"
          />
          <input 
            type="text" 
            placeholder="Определение (перевод или правило)" 
            value={defInput}
            onChange={(e) => setDefInput(e.target.value)}
            className="flex-1 border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Добавить
          </button>
        </form>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map(card => (
            <Flashcard key={card.id} card={card} onDelete={deleteCard} />
          ))}
        </div>

        {cards.length === 0 && (
          <p className="text-center text-slate-500 mt-10">У вас пока нет карточек. Добавьте первую!</p>
        )}
      </div>
    </div>
  );
}

export default App;
