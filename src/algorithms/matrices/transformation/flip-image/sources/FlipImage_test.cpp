// g++ -std=c++17 -o flip_image_test FlipImage_test.cpp && ./flip_image_test
#include "FlipImage.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: flips and inverts 3x3 example
    {
        std::vector<std::vector<int>> matrix = {{1, 1, 0}, {1, 0, 1}, {0, 0, 0}};
        flipImage(matrix);
        assert((matrix[0] == std::vector<int>{1, 0, 0}));
        assert((matrix[1] == std::vector<int>{0, 1, 0}));
        assert((matrix[2] == std::vector<int>{1, 1, 1}));
    }

    // test: all zeros
    {
        std::vector<std::vector<int>> matrix = {{0, 0}, {0, 0}};
        flipImage(matrix);
        assert((matrix[0] == std::vector<int>{1, 1}));
        assert((matrix[1] == std::vector<int>{1, 1}));
    }

    // test: all ones
    {
        std::vector<std::vector<int>> matrix = {{1, 1}, {1, 1}};
        flipImage(matrix);
        assert((matrix[0] == std::vector<int>{0, 0}));
        assert((matrix[1] == std::vector<int>{0, 0}));
    }

    // test: single row
    {
        std::vector<std::vector<int>> matrix = {{1, 0, 1}};
        flipImage(matrix);
        assert((matrix[0] == std::vector<int>{0, 1, 0}));
    }

    // test: single column
    {
        std::vector<std::vector<int>> matrix = {{1}, {0}, {1}};
        flipImage(matrix);
        assert(matrix[0][0] == 0 && matrix[1][0] == 1 && matrix[2][0] == 0);
    }

    // test: 1x1 with 0
    {
        std::vector<std::vector<int>> matrix = {{0}};
        flipImage(matrix);
        assert(matrix[0][0] == 1);
    }

    // test: 1x1 with 1
    {
        std::vector<std::vector<int>> matrix = {{1}};
        flipImage(matrix);
        assert(matrix[0][0] == 0);
    }

    // test: identity-like matrix
    {
        std::vector<std::vector<int>> matrix = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
        flipImage(matrix);
        assert((matrix[0] == std::vector<int>{1, 1, 0}));
        assert((matrix[1] == std::vector<int>{1, 0, 1}));
        assert((matrix[2] == std::vector<int>{0, 1, 1}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
