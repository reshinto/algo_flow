// g++ -std=c++17 -o transpose_matrix_test TransposeMatrix_test.cpp && ./transpose_matrix_test
#include "sources/TransposeMatrix.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: transposes 3x3 square matrix
    {
        auto result = transposeMatrix({{1, 2, 3}, {4, 5, 6}, {7, 8, 9}});
        assert((result[0] == std::vector<int>{1, 4, 7}));
        assert((result[1] == std::vector<int>{2, 5, 8}));
        assert((result[2] == std::vector<int>{3, 6, 9}));
    }

    // test: transposes 2x2 matrix
    {
        auto result = transposeMatrix({{1, 2}, {3, 4}});
        assert((result[0] == std::vector<int>{1, 3}));
        assert((result[1] == std::vector<int>{2, 4}));
    }

    // test: transposes 1x1 matrix
    {
        auto result = transposeMatrix({{42}});
        assert(result[0][0] == 42);
    }

    // test: transposes 2x3 to 3x2
    {
        auto result = transposeMatrix({{1, 2, 3}, {4, 5, 6}});
        assert(result.size() == 3 && result[0].size() == 2);
        assert((result[0] == std::vector<int>{1, 4}));
        assert((result[1] == std::vector<int>{2, 5}));
        assert((result[2] == std::vector<int>{3, 6}));
    }

    // test: transposes 3x2 to 2x3
    {
        auto result = transposeMatrix({{1, 2}, {3, 4}, {5, 6}});
        assert(result.size() == 2 && result[0].size() == 3);
        assert((result[0] == std::vector<int>{1, 3, 5}));
        assert((result[1] == std::vector<int>{2, 4, 6}));
    }

    // test: transposes single row to single column
    {
        auto result = transposeMatrix({{1, 2, 3, 4}});
        assert(result.size() == 4);
        for (size_t rowIdx = 0; rowIdx < 4; rowIdx++) {
            assert(result[rowIdx][0] == (int)(rowIdx + 1));
        }
    }

    // test: transposes single column to single row
    {
        auto result = transposeMatrix({{1}, {2}, {3}});
        assert(result.size() == 1);
        assert((result[0] == std::vector<int>{1, 2, 3}));
    }

    // test: double transpose returns original
    {
        std::vector<std::vector<int>> original = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        auto transposed = transposeMatrix(original);
        auto doubleTransposed = transposeMatrix(transposed);
        assert(doubleTransposed == original);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
