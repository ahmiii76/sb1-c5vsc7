import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game/GameEngine';
import { Monitor, RotateCcw, Pause, Play, Cpu } from 'lucide-react';

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('cyberpunk-bubbles-highscore');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new GameEngine(canvasRef.current, {
        onScoreUpdate: (newScore) => {
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('cyberpunk-bubbles-highscore', newScore.toString());
          }
        },
        onGameOver: () => setGameOver(true),
      });
      setGameEngine(engine);
      return () => engine.cleanup();
    }
  }, []);

  const togglePause = () => {
    if (gameEngine) {
      if (isPaused) {
        gameEngine.resume();
      } else {
        gameEngine.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const restartGame = () => {
    if (gameEngine) {
      gameEngine.restart();
      setGameOver(false);
      setScore(0);
      setIsPaused(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8">
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4 rounded-lg bg-gray-800 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Monitor className="h-5 w-5" />
              <span className="text-lg font-bold">Score: {score}</span>
            </div>
            <div className="text-purple-400">
              <span className="text-sm">High Score: {highScore}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={togglePause}
              className="rounded-lg bg-gray-700 p-2 text-cyan-400 hover:bg-gray-600"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </button>
            <button
              onClick={restartGame}
              className="rounded-lg bg-gray-700 p-2 text-cyan-400 hover:bg-gray-600"
              title="Restart"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="rounded-lg border-2 border-cyan-500/30 bg-gray-800 shadow-lg shadow-cyan-500/20"
        />

        {gameOver && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-black/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Cpu className="h-12 w-12 text-cyan-500" />
                <h2 className="text-3xl font-bold text-cyan-400">Game Over</h2>
              </div>
              <p className="mb-2 text-xl text-gray-300">Final Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-lg text-purple-400">New High Score! 🏆</p>
              )}
              <button
                onClick={restartGame}
                className="rounded-lg bg-cyan-600 px-6 py-3 font-bold text-white transition-colors hover:bg-cyan-700"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}