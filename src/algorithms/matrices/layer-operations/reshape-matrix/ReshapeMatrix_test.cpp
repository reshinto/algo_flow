// g++ -std=c++17 -o reshape_matrix_test ReshapeMatrix_test.cpp && ./reshape_matrix_test
#include "sources/ReshapeMatrix.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: reshapes 2x4 to 4x2
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}};
        auto result = reshapeMatrix(matrix, 4, 2);
        assert((result[0] == std::vector<int>{1, 2}));
        assert((result[1] == std::vector<int>{3, 4}));
        assert((result[2] == std::vector<int>{5, 6}));
        assert((result[3] == std::vector<int>{7, 8}));
    }

    // test: reshapes 2x2 to 1x4
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        auto result = reshapeMatrix(matrix, 1, 4);
        assert((result[0] == std::vector<int>{1, 2, 3, 4}));
    }

    // test: reshapes 2x2 to 4x1
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        auto result = reshapeMatrix(matrix, 4, 1);
        assert(result.size() == 4);
        assert(result[0][0] == 1 && result[1][0] == 2 && result[2][0] == 3 && result[3][0] == 4);
    }

    // test: returns original for impossible reshape
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        auto result = reshapeMatrix(matrix, 3, 2);
        assert(result == matrix);
    }

    // test: handles 1x1 identity reshape
    {
        std::vector<std::vector<int>> matrix = {{42}};
        auto result = reshapeMatrix(matrix, 1, 1);
        assert(result[0][0] == 42);
    }

    // test: reshapes 3x3 to 1x9
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto result = reshapeMatrix(matrix, 1, 9);
        assert((result[0] == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8, 9}));
    }

    // test: reshapes 1x6 to 2x3
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4, 5, 6}};
        auto result = reshapeMatrix(matrix, 2, 3);
        assert((result[0] == std::vector<int>{1, 2, 3}));
        assert((result[1] == std::vector<int>{4, 5, 6}));
    }

    // test: returns original for impossible reshape with larger target
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}};
        auto result = reshapeMatrix(matrix, 2, 5);
        assert(result == matrix);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
