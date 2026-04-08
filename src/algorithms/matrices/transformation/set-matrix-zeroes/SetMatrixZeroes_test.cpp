// g++ -std=c++17 -o set_matrix_zeroes_test SetMatrixZeroes_test.cpp && ./set_matrix_zeroes_test
#include "sources/SetMatrixZeroes.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: zeros row and column of single zero in 3x3
    {
        std::vector<std::vector<int>> matrix = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{1, 0, 1}));
        assert((matrix[1] == std::vector<int>{0, 0, 0}));
        assert((matrix[2] == std::vector<int>{1, 0, 1}));
    }

    // test: handles default input
    {
        std::vector<std::vector<int>> matrix = {{0, 1, 2, 0}, {3, 4, 5, 2}, {1, 3, 1, 5}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{0, 0, 0, 0}));
        assert((matrix[1] == std::vector<int>{0, 4, 5, 0}));
        assert((matrix[2] == std::vector<int>{0, 3, 1, 0}));
    }

    // test: leaves matrix without zeros unchanged
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{1, 2, 3}));
        assert((matrix[1] == std::vector<int>{4, 5, 6}));
        assert((matrix[2] == std::vector<int>{7, 8, 9}));
    }

    // test: 1x1 with zero
    {
        std::vector<std::vector<int>> matrix = {{0}};
        setMatrixZeroes(matrix);
        assert(matrix[0][0] == 0);
    }

    // test: 1x1 with nonzero
    {
        std::vector<std::vector<int>> matrix = {{5}};
        setMatrixZeroes(matrix);
        assert(matrix[0][0] == 5);
    }

    // test: zero in first row
    {
        std::vector<std::vector<int>> matrix = {{1, 0, 3}, {4, 5, 6}, {7, 8, 9}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{0, 0, 0}));
        assert((matrix[1] == std::vector<int>{4, 0, 6}));
        assert((matrix[2] == std::vector<int>{7, 0, 9}));
    }

    // test: single row with zero
    {
        std::vector<std::vector<int>> matrix = {{1, 0, 3}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{0, 0, 0}));
    }

    // test: multiple zeros in same row
    {
        std::vector<std::vector<int>> matrix = {{0, 1, 0}, {2, 3, 4}, {5, 6, 7}};
        setMatrixZeroes(matrix);
        assert((matrix[0] == std::vector<int>{0, 0, 0}));
        assert((matrix[1] == std::vector<int>{0, 3, 0}));
        assert((matrix[2] == std::vector<int>{0, 6, 0}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
