// g++ -std=c++17 -o diagonal_traversal_test DiagonalTraversal_test.cpp && ./diagonal_traversal_test
#include "DiagonalTraversal.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // test: traverses 3x4 matrix diagonally
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12}));
    }

    // test: traverses 4x4 square matrix diagonally
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16}));
    }

    // test: handles 1x1 matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{42}));
    }

    // test: handles single row
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: handles single column
    {
        std::vector<std::vector<int>> matrix = {{1}, {2}, {3}, {4}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: returns empty for empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        auto result = diagonalTraversal(matrix);
        assert(result.empty());
    }

    // test: handles 3x3 matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = diagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 4, 3, 5, 7, 6, 8, 9}));
    }

    // test: collects all elements exactly once
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = diagonalTraversal(matrix);
        assert(result.size() == 9);
        assert(std::set<int>(result.begin(), result.end()).size() == 9);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
