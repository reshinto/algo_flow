// g++ -std=c++17 -o pascals_triangle_test PascalsTriangle_test.cpp && ./pascals_triangle_test
#include "PascalsTriangle.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: returns [[1]] for numRows=1
    {
        auto result = pascalsTriangle(1);
        assert(result.size() == 1);
        assert((result[0] == std::vector<int>{1}));
    }

    // test: returns correct triangle for numRows=2
    {
        auto result = pascalsTriangle(2);
        assert(result.size() == 2);
        assert((result[0] == std::vector<int>{1}));
        assert((result[1] == std::vector<int>{1, 1}));
    }

    // test: returns correct triangle for numRows=3
    {
        auto result = pascalsTriangle(3);
        assert(result.size() == 3);
        assert((result[2] == std::vector<int>{1, 2, 1}));
    }

    // test: returns correct triangle for numRows=5
    {
        auto result = pascalsTriangle(5);
        assert(result.size() == 5);
        assert((result[3] == std::vector<int>{1, 3, 3, 1}));
        assert((result[4] == std::vector<int>{1, 4, 6, 4, 1}));
    }

    // test: returns correct triangle for numRows=6
    {
        auto result = pascalsTriangle(6);
        assert(result.size() == 6);
        assert((result[5] == std::vector<int>{1, 5, 10, 10, 5, 1}));
    }

    // test: each inner cell is the sum of the two cells above
    {
        auto result = pascalsTriangle(5);
        for (size_t rowIdx = 2; rowIdx < result.size(); rowIdx++) {
            const auto& currentRow = result[rowIdx];
            const auto& aboveRow = result[rowIdx - 1];
            for (size_t colIdx = 1; colIdx < currentRow.size() - 1; colIdx++) {
                assert(currentRow[colIdx] == aboveRow[colIdx - 1] + aboveRow[colIdx]);
            }
        }
    }

    // test: all edge cells are 1
    {
        auto result = pascalsTriangle(6);
        for (const auto& row : result) {
            assert(row.front() == 1);
            assert(row.back() == 1);
        }
    }

    // test: row at index rowIdx has rowIdx+1 elements
    {
        auto result = pascalsTriangle(5);
        for (size_t rowIdx = 0; rowIdx < result.size(); rowIdx++) {
            assert(result[rowIdx].size() == rowIdx + 1);
        }
    }

    // test: returns empty for numRows=0
    {
        auto result = pascalsTriangle(0);
        assert(result.empty());
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
