// Conway's Game of Life — One Step Simulation
// Updates all cells simultaneously based on neighbor counts using in-place encoding.
// Encoding: current bit = value & 1, next bit = (value >> 1) & 1
// Time: O(m x n) — every cell visited twice
// Space: O(1) — in-place using bit encoding

public class GameOfLife {

    private static final int[][] DIRECTIONS = {
        {-1, -1}, {-1, 0}, {-1, 1},
        {0, -1},            {0, 1},
        {1, -1},  {1, 0},  {1, 1},
    };

    public static int[][] gameOfLife(int[][] board) {
        int rowCount = board.length; // @step:initialize
        int colCount = board[0].length; // @step:initialize

        // Phase 1: Encode next state in higher bits
        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) { // @step:mark-cell
            for (int colIdx = 0; colIdx < colCount; colIdx++) { // @step:mark-cell
                int neighborCount = countLiveNeighbors(board, rowIdx, colIdx, rowCount, colCount); // @step:mark-cell
                int currentState = board[rowIdx][colIdx] & 1; // @step:mark-cell

                int nextState = 0; // @step:mark-cell
                if (currentState == 1 && (neighborCount == 2 || neighborCount == 3)) { // @step:mark-cell
                    nextState = 1; // @step:mark-cell
                } else if (currentState == 0 && neighborCount == 3) { // @step:mark-cell
                    nextState = 1; // @step:mark-cell
                }

                board[rowIdx][colIdx] |= nextState << 1; // @step:mark-cell
            }
        }

        // Phase 2: Decode final state by right-shifting
        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) { // @step:flip-cell
            for (int colIdx = 0; colIdx < colCount; colIdx++) { // @step:flip-cell
                board[rowIdx][colIdx] >>= 1; // @step:flip-cell
            }
        }

        return board; // @step:complete
    }

    private static int countLiveNeighbors(
        int[][] board, int rowIdx, int colIdx, int rowCount, int colCount
    ) {
        int liveCount = 0;
        for (int[] direction : DIRECTIONS) {
            int neighborRow = rowIdx + direction[0];
            int neighborCol = colIdx + direction[1];
            if (neighborRow >= 0 && neighborRow < rowCount
                    && neighborCol >= 0 && neighborCol < colCount) {
                liveCount += board[neighborRow][neighborCol] & 1;
            }
        }
        return liveCount;
    }
}
