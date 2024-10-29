import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game/GameEngine';
import { Monitor, RotateCcw, Pause, Play } from 'lucide-react';

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new GameEngine(canvasRef.current, {
        onScoreUpdate: setScore,
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
        <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800 p-4 text-cyan-400">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            <span className="text-lg font-bold">Score: {score}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={togglePause}
              className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </button>
            <button
              onClick={restartGame}
              className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="rounded-lg border-2 border-cyan-500/30 bg-gray-800"
        />

        {gameOver && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-black/80 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-cyan-400">Game Over</h2>
              <p className="mb-6 text-xl text-gray-300">Final Score: {score}</p>
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