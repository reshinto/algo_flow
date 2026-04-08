// g++ -std=c++17 -o rotate_layer_by_layer_test RotateLayerByLayer_test.cpp && ./rotate_layer_by_layer_test
#include "sources/RotateLayerByLayer.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: rotates 3x3 90° clockwise
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        rotateLayerByLayer(matrix);
        assert((matrix[0] == std::vector<int>{7, 4, 1}));
        assert((matrix[1] == std::vector<int>{8, 5, 2}));
        assert((matrix[2] == std::vector<int>{9, 6, 3}));
    }

    // test: rotates 4x4 90° clockwise
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        rotateLayerByLayer(matrix);
        assert((matrix[0] == std::vector<int>{13, 9, 5, 1}));
        assert((matrix[3] == std::vector<int>{16, 12, 8, 4}));
    }

    // test: handles 1x1 matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        rotateLayerByLayer(matrix);
        assert(matrix[0][0] == 42);
    }

    // test: rotates 2x2 90° clockwise
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        rotateLayerByLayer(matrix);
        assert((matrix[0] == std::vector<int>{3, 1}));
        assert((matrix[1] == std::vector<int>{4, 2}));
    }

    // test: four rotations return original
    {
        std::vector<std::vector<int>> original = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        std::vector<std::vector<int>> matrix = original;
        for (int rotationCount = 0; rotationCount < 4; rotationCount++) {
            rotateLayerByLayer(matrix);
        }
        assert(matrix == original);
    }

    // test: handles negative and zero values
    {
        std::vector<std::vector<int>> matrix = {{-1, 0, 1}, {-2, 0, 2}, {-3, 0, 3}};
        rotateLayerByLayer(matrix);
        assert((matrix[0] == std::vector<int>{-3, -2, -1}));
        assert((matrix[1] == std::vector<int>{0, 0, 0}));
        assert((matrix[2] == std::vector<int>{3, 2, 1}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
