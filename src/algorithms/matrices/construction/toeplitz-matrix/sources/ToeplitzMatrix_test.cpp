// g++ -std=c++17 -o toeplitz_matrix_test ToeplitzMatrix_test.cpp && ./toeplitz_matrix_test
#include "ToeplitzMatrix.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: canonical Toeplitz example
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 1, 2, 3}, {9, 5, 1, 2}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: non-Toeplitz 2x2
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {2, 2}};
        assert(toeplitzMatrix(matrix) == false);
    }

    // test: single element matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: single row matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: single column matrix
    {
        std::vector<std::vector<int>> matrix = {{1}, {2}, {3}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: all same elements
    {
        std::vector<std::vector<int>> matrix = {{7, 7, 7}, {7, 7, 7}, {7, 7, 7}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: valid 2x2 Toeplitz
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 1}};
        assert(toeplitzMatrix(matrix) == true);
    }

    // test: invalid 2x2 non-Toeplitz
    {
        std::vector<std::vector<int>> matrix = {{5, 3}, {3, 4}};
        assert(toeplitzMatrix(matrix) == false);
    }

    // test: first row mismatch
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 2, 2}, {7, 4, 2}};
        assert(toeplitzMatrix(matrix) == false);
    }

    // test: last diagonal broken
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 1, 2}, {7, 4, 9}};
        assert(toeplitzMatrix(matrix) == false);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
