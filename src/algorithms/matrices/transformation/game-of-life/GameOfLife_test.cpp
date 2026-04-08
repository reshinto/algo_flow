// g++ -std=c++17 -o game_of_life_test GameOfLife_test.cpp && ./game_of_life_test
#include "sources/GameOfLife.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: simulates standard 4x3 example
    {
        std::vector<std::vector<int>> board = {{0, 1, 0}, {0, 0, 1}, {1, 1, 1}, {0, 0, 0}};
        gameOfLife(board);
        assert((board[0] == std::vector<int>{0, 0, 0}));
        assert((board[1] == std::vector<int>{1, 0, 1}));
        assert((board[2] == std::vector<int>{0, 1, 1}));
        assert((board[3] == std::vector<int>{0, 1, 0}));
    }

    // test: all dead board stays unchanged
    {
        std::vector<std::vector<int>> board = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        gameOfLife(board);
        for (const auto& row : board) {
            for (int cell : row) {
                assert(cell == 0);
            }
        }
    }

    // test: all alive 3x3 overpopulation
    {
        std::vector<std::vector<int>> board = {{1, 1, 1}, {1, 1, 1}, {1, 1, 1}};
        gameOfLife(board);
        assert((board[0] == std::vector<int>{1, 0, 1}));
        assert((board[1] == std::vector<int>{0, 0, 0}));
        assert((board[2] == std::vector<int>{1, 0, 1}));
    }

    // test: 1x1 dead stays dead
    {
        std::vector<std::vector<int>> board = {{0}};
        gameOfLife(board);
        assert(board[0][0] == 0);
    }

    // test: 1x1 live dies from underpopulation
    {
        std::vector<std::vector<int>> board = {{1}};
        gameOfLife(board);
        assert(board[0][0] == 0);
    }

    // test: 2x2 still life block
    {
        std::vector<std::vector<int>> board = {{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}};
        gameOfLife(board);
        assert((board[1] == std::vector<int>{0, 1, 1, 0}));
        assert((board[2] == std::vector<int>{0, 1, 1, 0}));
    }

    // test: vertical blinker becomes horizontal
    {
        std::vector<std::vector<int>> board = {{0, 1, 0}, {0, 1, 0}, {0, 1, 0}};
        gameOfLife(board);
        assert((board[0] == std::vector<int>{0, 0, 0}));
        assert((board[1] == std::vector<int>{1, 1, 1}));
        assert((board[2] == std::vector<int>{0, 0, 0}));
    }

    // test: reproduction L-shape
    {
        std::vector<std::vector<int>> board = {{1, 1, 0}, {1, 0, 0}, {0, 0, 0}};
        gameOfLife(board);
        assert((board[0] == std::vector<int>{1, 1, 0}));
        assert((board[1] == std::vector<int>{1, 1, 0}));
        assert((board[2] == std::vector<int>{0, 0, 0}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
