// g++ -o test PascalsTriangleRow_test.cpp && ./test
#define TESTING
#include "sources/PascalsTriangleRow.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    assert((pascalsTriangleRow(0) == std::vector<int>{1}));
    assert((pascalsTriangleRow(1) == std::vector<int>{1, 1}));
    assert((pascalsTriangleRow(2) == std::vector<int>{1, 2, 1}));
    assert((pascalsTriangleRow(3) == std::vector<int>{1, 3, 3, 1}));
    assert((pascalsTriangleRow(4) == std::vector<int>{1, 4, 6, 4, 1}));
    assert((pascalsTriangleRow(8) == std::vector<int>{1, 8, 28, 56, 70, 56, 28, 8, 1}));

    std::vector<int> result6 = pascalsTriangleRow(6);
    assert(result6.size() == 7);
    int rowSum = std::accumulate(result6.begin(), result6.end(), 0);
    assert(rowSum == 64);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
