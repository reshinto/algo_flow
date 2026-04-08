// g++ -std=c++17 -o spiral_order_test SpiralOrder_test.cpp && ./spiral_order_test
#include "sources/SpiralOrder.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // test: 4x4 spiral order
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10}));
    }

    // test: 3x3 spiral order
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 3, 6, 9, 8, 7, 4, 5}));
    }

    // test: single row
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: single column
    {
        std::vector<std::vector<int>> matrix = {{1}, {2}, {3}, {4}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4}));
    }

    // test: 1x1 matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{42}));
    }

    // test: 2x2 matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 4, 3}));
    }

    // test: 2x4 non-square
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 3, 4, 8, 7, 6, 5}));
    }

    // test: 3x2 non-square
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}, {5, 6}};
        auto result = spiralOrder(matrix);
        assert((result == std::vector<int>{1, 2, 4, 6, 5, 3}));
    }

    // test: empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        auto result = spiralOrder(matrix);
        assert(result.empty());
    }

    // test: all elements exactly once
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = spiralOrder(matrix);
        assert(result.size() == 9);
        assert(std::set<int>(result.begin(), result.end()).size() == 9);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
