// g++ -o OnlineStockSpan_test OnlineStockSpan_test.cpp && ./OnlineStockSpan_test
#define TESTING
#include "sources/OnlineStockSpan.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(onlineStockSpan({100, 80, 60, 70, 60, 75, 85}) == std::vector<int>({1, 1, 1, 2, 1, 4, 6}));
    assert(onlineStockSpan({50}) == std::vector<int>({1}));
    assert(onlineStockSpan({100, 90, 80, 70}) == std::vector<int>({1, 1, 1, 1}));
    assert(onlineStockSpan({10, 20, 30, 40}) == std::vector<int>({1, 2, 3, 4}));
    assert(onlineStockSpan({50, 50, 50, 50}) == std::vector<int>({1, 2, 3, 4}));
    assert(onlineStockSpan({3, 1, 2}) == std::vector<int>({1, 1, 2}));
    assert(onlineStockSpan({5, 10}) == std::vector<int>({1, 2}));
    assert(onlineStockSpan({10, 5}) == std::vector<int>({1, 1}));
    assert(onlineStockSpan({7, 7}) == std::vector<int>({1, 2}));
    assert(onlineStockSpan({1, 3, 1, 3, 1}) == std::vector<int>({1, 2, 1, 4, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
