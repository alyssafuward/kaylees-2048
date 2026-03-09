import { Tile } from "@/hooks/use2048";
import GameTile from "./GameTile";
import { useMemo } from "react";

const GAP = 10;
const BOARD_PADDING = 10;

interface Props {
  tiles: Tile[];
}

export default function GameBoard({ tiles }: Props) {
  // Responsive cell size
  const boardSize = Math.min(typeof window !== "undefined" ? window.innerWidth * 0.92 : 360, 440);
  const cellSize = useMemo(() => Math.floor((boardSize - BOARD_PADDING * 2 - GAP * 5) / 4), [boardSize]);
  const totalSize = cellSize * 4 + GAP * 5 + BOARD_PADDING * 2;

  return (
    <div
      className="board-glass rounded-2xl relative"
      style={{ width: totalSize, height: totalSize, padding: BOARD_PADDING }}
    >
      {/* Empty cell grid */}
      <div
        className="relative"
        style={{ width: totalSize - BOARD_PADDING * 2, height: totalSize - BOARD_PADDING * 2 }}
      >
        {/* Background cells */}
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

        {/* Tiles */}
        {tiles.map(tile => (
          <GameTile
            key={tile.id}
            tile={tile}
            cellSize={cellSize}
            gap={GAP}
          />
        ))}
      </div>
    </div>
  );
}
