// g++ -std=c++17 -o search_2d_matrix_ii_test Search2DMatrixII_test.cpp && ./search_2d_matrix_ii_test
#include "sources/Search2DMatrixII.cpp"
#include <cassert>
#include <iostream>

int main() {
    std::vector<std::vector<int>> defaultMatrix = {
        {1, 4, 7, 11, 15},
        {2, 5, 8, 12, 19},
        {3, 6, 9, 16, 22},
        {10, 13, 14, 17, 24},
        {18, 21, 23, 26, 30},
    };

    assert(search2DMatrixII(defaultMatrix, 5) == true);
    assert(search2DMatrixII(defaultMatrix, 20) == false);
    assert(search2DMatrixII(defaultMatrix, 15) == true);
    assert(search2DMatrixII(defaultMatrix, 18) == true);

    // single element
    {
        std::vector<std::vector<int>> matrix = {{7}};
        assert(search2DMatrixII(matrix, 7) == true);
        assert(search2DMatrixII(matrix, 3) == false);
    }

    // empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        assert(search2DMatrixII(matrix, 5) == false);
    }

    // larger sorted matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 4, 7, 11}, {2, 5, 8, 12}, {3, 6, 9, 16}, {10, 13, 14, 17}};
        assert(search2DMatrixII(matrix, 9) == true);
        assert(search2DMatrixII(matrix, 15) == false);
    }

    assert(search2DMatrixII(defaultMatrix, 1) == true);
    assert(search2DMatrixII(defaultMatrix, 30) == true);

    // single row
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4, 5}};
        assert(search2DMatrixII(matrix, 3) == true);
        assert(search2DMatrixII(matrix, 6) == false);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
