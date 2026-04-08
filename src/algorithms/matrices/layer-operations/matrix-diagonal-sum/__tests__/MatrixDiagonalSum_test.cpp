// g++ -std=c++17 -o matrix_diagonal_sum_test MatrixDiagonalSum_test.cpp && ./matrix_diagonal_sum_test
#include "../sources/MatrixDiagonalSum.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: sums both diagonals of 3x3, subtracts center
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        assert(matrixDiagonalSum(matrix) == 25);
    }

    // test: sums both diagonals of 4x4 (no center subtraction)
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert(matrixDiagonalSum(matrix) == 68);
    }

    // test: single element matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        assert(matrixDiagonalSum(matrix) == 42);
    }

    // test: 2x2 matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        assert(matrixDiagonalSum(matrix) == 10);
    }

    // test: 5x5 matrix, subtracts center
    {
        std::vector<std::vector<int>> matrix = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25},
        };
        assert(matrixDiagonalSum(matrix) == 117);
    }

    // test: all-zeros matrix
    {
        std::vector<std::vector<int>> matrix = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        assert(matrixDiagonalSum(matrix) == 0);
    }

    // test: identity matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
        assert(matrixDiagonalSum(matrix) == 3);
    }

    // test: negative values on diagonals
    {
        std::vector<std::vector<int>> matrix = {{-1, 0, -2}, {0, -3, 0}, {-4, 0, -5}};
        assert(matrixDiagonalSum(matrix) == -15);
    }

    // test: 4x4 all same values
    {
        std::vector<std::vector<int>> matrix = {{2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}};
        assert(matrixDiagonalSum(matrix) == 16);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
