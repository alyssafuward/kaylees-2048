import { Tile } from "@/hooks/use2048";
import GameTile from "./GameTile";
import { useMemo } from "react";
import { type GameMode } from "@/lib/gameMode";

const GAP = 10;
const BOARD_PADDING = 10;

interface Props {
  tiles: Tile[];
  mode: GameMode;
}

export default function GameBoard({ tiles, mode }: Props) {
  const boardSize = Math.min(typeof window !== "undefined" ? window.innerWidth * 0.92 : 360, 440);
  const cellSize = useMemo(() => Math.floor((boardSize - BOARD_PADDING * 2 - GAP * 5) / 4), [boardSize]);
  const totalSize = cellSize * 4 + GAP * 5 + BOARD_PADDING * 2;

  return (
    <div
      className="board-glass rounded-2xl relative"
      style={{ width: totalSize, height: totalSize, padding: BOARD_PADDING }}
    >
      <div
        className="relative"
        style={{ width: totalSize - BOARD_PADDING * 2, height: totalSize - BOARD_PADDING * 2 }}
      >
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <div
              key={`cell-${r}-${c}`}
              className="absolute rounded-xl"
              style={{
                width: cellSize,
                height: cellSize,
                left: c * (cellSize + GAP) + GAP,
                top: r * (cellSize + GAP) + GAP,
                background: "hsl(260,30%,14%)",
                opacity: 0.8,
              }}
            />
          ))
        )}

        {tiles.map(tile => (
          <GameTile
            key={tile.id}
            tile={tile}
            cellSize={cellSize}
            gap={GAP}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}
