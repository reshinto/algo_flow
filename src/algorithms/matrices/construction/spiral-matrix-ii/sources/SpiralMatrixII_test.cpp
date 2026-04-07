// g++ -std=c++17 -o spiral_matrix_ii_test SpiralMatrixII_test.cpp && ./spiral_matrix_ii_test
#include "SpiralMatrixII.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // test: generates 1x1 matrix
    {
        auto result = spiralMatrixII(1);
        assert(result[0][0] == 1);
    }

    // test: generates 2x2 matrix
    {
        auto result = spiralMatrixII(2);
        assert((result[0] == std::vector<int>{1, 2}));
        assert((result[1] == std::vector<int>{4, 3}));
    }

    // test: generates 3x3 matrix
    {
        auto result = spiralMatrixII(3);
        assert((result[0] == std::vector<int>{1, 2, 3}));
        assert((result[1] == std::vector<int>{8, 9, 4}));
        assert((result[2] == std::vector<int>{7, 6, 5}));
    }

    // test: generates 4x4 matrix
    {
        auto result = spiralMatrixII(4);
        assert((result[0] == std::vector<int>{1, 2, 3, 4}));
        assert((result[1] == std::vector<int>{12, 13, 14, 5}));
        assert((result[2] == std::vector<int>{11, 16, 15, 6}));
        assert((result[3] == std::vector<int>{10, 9, 8, 7}));
    }

    // test: places 1 in top-left corner
    {
        for (int size : {2, 3, 4, 5}) {
            auto result = spiralMatrixII(size);
            assert(result[0][0] == 1);
        }
    }

    // test: contains all values 1..n^2 for n=4
    {
        auto result = spiralMatrixII(4);
        std::set<int> seen;
        int total = 0;
        for (const auto& row : result) {
            for (int value : row) {
                seen.insert(value);
                total++;
            }
        }
        assert(total == 16);
        assert((int)seen.size() == 16);
    }

    // test: produces square matrix with correct dimensions
    {
        auto result = spiralMatrixII(4);
        assert(result.size() == 4);
        for (const auto& row : result) {
            assert(row.size() == 4);
        }
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
