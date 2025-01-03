import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-md">
        {board.map((square, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: !square ? 1.05 : 1 }}
            whileTap={{ scale: !square ? 0.95 : 1 }}
            className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold
              ${!square ? 'bg-gray-100 cursor-pointer hover:bg-gray-200' : 
                square === 'X' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </motion.button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">{status}</p>
        <button
          onClick={resetGame}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe; 