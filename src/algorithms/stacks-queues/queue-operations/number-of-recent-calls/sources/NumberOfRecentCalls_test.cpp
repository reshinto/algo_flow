// g++ -o NumberOfRecentCalls_test NumberOfRecentCalls_test.cpp && ./NumberOfRecentCalls_test
#include "NumberOfRecentCalls.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((numberOfRecentCalls({1, 100, 3001, 3002}) == std::vector<int>{1, 2, 3, 3}));
    assert((numberOfRecentCalls({500}) == std::vector<int>{1}));
    assert((numberOfRecentCalls({1, 500, 1000, 2000, 3000}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((numberOfRecentCalls({1, 100, 3001, 3002, 6002}) == std::vector<int>{1, 2, 3, 3, 2}));
    assert((numberOfRecentCalls({1, 3001}) == std::vector<int>{1, 2}));
    assert((numberOfRecentCalls({1, 3002}) == std::vector<int>{1, 1}));
    assert((numberOfRecentCalls({1, 3002, 6003, 9004}) == std::vector<int>{1, 1, 1, 1}));
    assert((numberOfRecentCalls({}) == std::vector<int>{}));
    assert((numberOfRecentCalls({100, 200, 300, 400, 500}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((numberOfRecentCalls({1000, 2000, 4001, 5001, 7002}) == std::vector<int>{1, 2, 2, 2, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
