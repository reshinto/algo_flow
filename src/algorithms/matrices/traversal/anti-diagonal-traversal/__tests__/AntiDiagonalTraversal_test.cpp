// g++ -std=c++17 -o anti_diagonal_traversal_test AntiDiagonalTraversal_test.cpp && ./anti_diagonal_traversal_test
#include "../sources/AntiDiagonalTraversal.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // test: traverses 3x3 in anti-diagonal order
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = antiDiagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 4, 3, 5, 7, 6, 8, 9}));
    }

    // test: traverses 3x4 in anti-diagonal order
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        auto result = antiDiagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12}));
    }

    // test: handles 1x1 matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        auto result = antiDiagonalTraversal(matrix);
        assert((result == std::vector<int>{42}));
    }

    // test: handles single row matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}};
        auto result = antiDiagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: handles single column matrix
    {
        std::vector<std::vector<int>> matrix = {{1}, {2}, {3}, {4}};
        auto result = antiDiagonalTraversal(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: returns empty for empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        auto result = antiDiagonalTraversal(matrix);
        assert(result.empty());
    }

    // test: collects all elements exactly once
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = antiDiagonalTraversal(matrix);
        assert(result.size() == 9);
        assert(std::set<int>(result.begin(), result.end()).size() == 9);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
