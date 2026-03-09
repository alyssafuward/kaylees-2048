import { useState, useCallback, useEffect, useRef } from "react";

export type Direction = "up" | "down" | "left" | "right";

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew: boolean;
  isMerged: boolean;
}

export type GameStatus = "playing" | "won" | "lost";

interface GameState {
  tiles: Tile[];
  score: number;
  bestScore: number;
  status: GameStatus;
  hasWon: boolean;
}

let nextId = 1;

function createTile(row: number, col: number, value: number): Tile {
  return { id: nextId++, value, row, col, isNew: true, isMerged: false };
}

function emptyGrid(): (Tile | null)[][] {
  return Array.from({ length: 4 }, () => Array(4).fill(null));
}

function tilesToGrid(tiles: Tile[]): (Tile | null)[][] {
  const grid = emptyGrid();
  for (const t of tiles) grid[t.row][t.col] = t;
  return grid;
}

function getEmptyCells(grid: (Tile | null)[][]): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!grid[r][c]) cells.push({ row: r, col: c });
  return cells;
}

function addRandomTile(tiles: Tile[]): Tile[] {
  const grid = tilesToGrid(tiles);
  const empty = getEmptyCells(grid);
  if (empty.length === 0) return tiles;
  const { row, col } = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  return [...tiles, createTile(row, col, value)];
}

// Slide a single row left, return { row, merged, score }
function slideRow(row: (Tile | null)[]): { row: (Tile | null)[]; score: number } {
  const nonNull = row.filter(Boolean) as Tile[];
  const result: (Tile | null)[] = [];
  let score = 0;
  let i = 0;
  while (i < nonNull.length) {
    if (i + 1 < nonNull.length && nonNull[i].value === nonNull[i + 1].value) {
      const merged: Tile = {
        ...nonNull[i],
        value: nonNull[i].value * 2,
        isMerged: true,
        isNew: false,
      };
      score += merged.value;
      result.push(merged);
      i += 2;
    } else {
      result.push({ ...nonNull[i], isNew: false, isMerged: false });
      i++;
    }
  }
  while (result.length < 4) result.push(null);
  return { row: result, score };
}

function rotateGrid(grid: (Tile | null)[][], times: number): (Tile | null)[][] {
  let g = grid;
  for (let t = 0; t < times; t++) {
    const rotated = emptyGrid();
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 4; c++)
        rotated[c][3 - r] = g[r][c];
    g = rotated;
  }
  return g;
}

function moveLeft(tiles: Tile[]): { tiles: Tile[]; score: number; moved: boolean } {
  const grid = tilesToGrid(tiles);
  let totalScore = 0;
  let moved = false;
  const newGrid = emptyGrid();

  for (let r = 0; r < 4; r++) {
    const { row: slid, score } = slideRow(grid[r]);
    totalScore += score;
    for (let c = 0; c < 4; c++) {
      if (slid[c]) {
        const orig = grid[r][c];
        if (!orig || orig.id !== slid[c]!.id || orig.row !== r || orig.col !== c) moved = true;
        newGrid[r][c] = { ...slid[c]!, row: r, col: c };
      }
    }
  }

  // Check if anything actually moved
  const oldGrid = tilesToGrid(tiles);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const o = oldGrid[r][c], n = newGrid[r][c];
      if ((!o && n) || (o && !n) || (o && n && (o.id !== n.id || o.value !== n.value))) moved = true;
    }

  const newTiles: Tile[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (newGrid[r][c]) newTiles.push(newGrid[r][c]!);

  return { tiles: newTiles, score: totalScore, moved };
}

function applyDirection(tiles: Tile[], dir: Direction): { tiles: Tile[]; score: number; moved: boolean } {
  const rotMap: Record<Direction, number> = { left: 0, down: 1, right: 2, up: 3 };
  const grid = tilesToGrid(tiles);
  const rotated = rotateGrid(grid, rotMap[dir]);
  const flatTiles: Tile[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (rotated[r][c]) flatTiles.push({ ...rotated[r][c]!, row: r, col: c });

  const { tiles: movedTiles, score, moved } = moveLeft(flatTiles);
  if (!moved) return { tiles, score: 0, moved: false };

  const movedGrid: (Tile | null)[][] = emptyGrid();
  for (const t of movedTiles) movedGrid[t.row][t.col] = t;

  // Rotate back
  const backRot = (4 - rotMap[dir]) % 4;
  const finalGrid = rotateGrid(movedGrid, backRot);
  const finalTiles: Tile[] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (finalGrid[r][c]) finalTiles.push({ ...finalGrid[r][c]!, row: r, col: c });

  return { tiles: finalTiles, score, moved: true };
}

function checkLost(tiles: Tile[]): boolean {
  const grid = tilesToGrid(tiles);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (!grid[r][c]) return false;
      if (c < 3 && grid[r][c]!.value === grid[r][c + 1]?.value) return false;
      if (r < 3 && grid[r][c]!.value === grid[r + 1]?.[c]?.value) return false;
    }
  return true;
}

const BEST_KEY = "galaxy2048_best";

export function use2048() {
  const [state, setState] = useState<GameState>(() => {
    const best = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
    let tiles: Tile[] = [];
    tiles = addRandomTile(tiles);
    tiles = addRandomTile(tiles);
    return { tiles, score: 0, bestScore: best, status: "playing", hasWon: false };
  });

  const isMovingRef = useRef(false);

  const move = useCallback((dir: Direction) => {
    if (isMovingRef.current) return;
    setState(prev => {
      if (prev.status === "lost") return prev;

      const { tiles: moved, score: gained, moved: didMove } = applyDirection(prev.tiles, dir);
      if (!didMove) return prev;

      const withNew = addRandomTile(moved);
      const newScore = prev.score + gained;
      const newBest = Math.max(prev.bestScore, newScore);
      if (newBest > prev.bestScore) localStorage.setItem(BEST_KEY, String(newBest));

      const hitWin = withNew.some(t => t.value >= 2048);
      const lost = checkLost(withNew);

      let status: GameStatus = "playing";
      if (hitWin && !prev.hasWon) status = "won";
      else if (lost) status = "lost";

      return {
        tiles: withNew,
        score: newScore,
        bestScore: newBest,
        status,
        hasWon: prev.hasWon || hitWin,
      };
    });
  }, []);

  const restart = useCallback(() => {
    nextId = 1;
    let tiles: Tile[] = [];
    tiles = addRandomTile(tiles);
    tiles = addRandomTile(tiles);
    setState(prev => ({ tiles, score: 0, bestScore: prev.bestScore, status: "playing", hasWon: false }));
  }, []);

  const keepPlaying = useCallback(() => {
    setState(prev => ({ ...prev, status: "playing" }));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      w: "up", s: "down", a: "left", d: "right",
    };
    const onKey = (e: KeyboardEvent) => {
      const dir = keyMap[e.key];
      if (dir) { e.preventDefault(); move(dir); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  // Touch / swipe controls
  useEffect(() => {
    let startX = 0, startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
      else move(dy > 0 ? "down" : "up");
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [move]);

  return { ...state, move, restart, keepPlaying };
}
