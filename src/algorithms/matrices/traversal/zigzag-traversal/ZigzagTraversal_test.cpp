// g++ -std=c++17 -o zigzag_traversal_test ZigzagTraversal_test.cpp && ./zigzag_traversal_test
#include "sources/ZigzagTraversal.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // 3x3
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{1, 2, 4, 7, 5, 3, 6, 8, 9}));
    }

    // 3x4
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12}));
    }

    // 4x4
    {
        std::vector<std::vector<int>> matrix = {
            {1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}
        };
        assert(zigzagTraversal(matrix) ==
               (std::vector<int>{1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16}));
    }

    // single element
    {
        std::vector<std::vector<int>> matrix = {{42}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{42}));
    }

    // single row
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{1, 2, 3, 4}));
    }

    // single column
    {
        std::vector<std::vector<int>> matrix = {{1}, {2}, {3}, {4}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{1, 2, 3, 4}));
    }

    // empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        assert(zigzagTraversal(matrix).empty());
    }

    // 2x2
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        assert(zigzagTraversal(matrix) == (std::vector<int>{1, 2, 3, 4}));
    }

    // all elements exactly once — 3x3
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        std::vector<int> result = zigzagTraversal(matrix);
        assert(result.size() == 9);
        std::set<int> unique(result.begin(), result.end());
        assert(unique.size() == 9);
    }

    // all elements exactly once — 3x4
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        std::vector<int> result = zigzagTraversal(matrix);
        assert(result.size() == 12);
        std::set<int> unique(result.begin(), result.end());
        assert(unique.size() == 12);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
