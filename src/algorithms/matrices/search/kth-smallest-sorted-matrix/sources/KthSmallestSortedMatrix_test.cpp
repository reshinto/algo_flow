// g++ -std=c++17 -o kth_smallest_sorted_matrix_test KthSmallestSortedMatrix_test.cpp && ./kth_smallest_sorted_matrix_test
#include "KthSmallestSortedMatrix.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: finds kth smallest in 3x3 matrix (k=8)
    {
        std::vector<std::vector<int>> matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert(kthSmallestSortedMatrix(matrix, 8) == 13);
    }

    // test: returns smallest when k=1
    {
        std::vector<std::vector<int>> matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert(kthSmallestSortedMatrix(matrix, 1) == 1);
    }

    // test: returns largest when k=n^2
    {
        std::vector<std::vector<int>> matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert(kthSmallestSortedMatrix(matrix, 9) == 15);
    }

    // test: handles 1x1 matrix
    {
        std::vector<std::vector<int>> matrix = {{42}};
        assert(kthSmallestSortedMatrix(matrix, 1) == 42);
    }

    // test: handles 2x2 matrix (k=2)
    {
        std::vector<std::vector<int>> matrix = {{1, 2}, {3, 4}};
        assert(kthSmallestSortedMatrix(matrix, 2) == 2);
    }

    // test: handles all same values
    {
        std::vector<std::vector<int>> matrix = {{5, 5, 5}, {5, 5, 5}, {5, 5, 5}};
        assert(kthSmallestSortedMatrix(matrix, 5) == 5);
    }

    // test: 4x4 matrix (k=8)
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert(kthSmallestSortedMatrix(matrix, 8) == 8);
    }

    // test: handles negative values
    {
        std::vector<std::vector<int>> matrix = {{-5, -4, -3}, {-2, -1, 0}, {1, 2, 3}};
        assert(kthSmallestSortedMatrix(matrix, 5) == -1);
    }

    // test: 4x4 matrix (k=16)
    {
        std::vector<std::vector<int>> matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert(kthSmallestSortedMatrix(matrix, 16) == 16);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
