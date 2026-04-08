// g++ -std=c++17 -o search_2d_matrix_test Search2DMatrix_test.cpp && ./search_2d_matrix_test
#include "sources/Search2DMatrix.cpp"
#include <cassert>
#include <iostream>

int main() {
    std::vector<std::vector<int>> defaultMatrix = {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}};

    assert(search2DMatrix(defaultMatrix, 3) == true);
    assert(search2DMatrix(defaultMatrix, 13) == false);
    assert(search2DMatrix(defaultMatrix, 1) == true);
    assert(search2DMatrix(defaultMatrix, 60) == true);

    // single row
    {
        std::vector<std::vector<int>> matrix = {{1, 3, 5, 7, 9}};
        assert(search2DMatrix(matrix, 5) == true);
        assert(search2DMatrix(matrix, 4) == false);
    }

    // single element
    {
        std::vector<std::vector<int>> matrix = {{42}};
        assert(search2DMatrix(matrix, 42) == true);
        assert(search2DMatrix(matrix, 99) == false);
    }

    // empty matrix
    {
        std::vector<std::vector<int>> matrix = {};
        assert(search2DMatrix(matrix, 5) == false);
    }

    // large matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, {11, 12, 13, 14, 15}, {16, 17, 18, 19, 20}};
        assert(search2DMatrix(matrix, 13) == true);
        assert(search2DMatrix(matrix, 0) == false);
    }

    assert(search2DMatrix(defaultMatrix, 10) == true);
    assert(search2DMatrix(defaultMatrix, 7) == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
