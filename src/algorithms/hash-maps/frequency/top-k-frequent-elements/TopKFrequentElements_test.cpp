#include "sources/TopKFrequentElements.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>

static bool contains(const std::vector<int>& vec, int val) {
    return std::find(vec.begin(), vec.end(), val) != vec.end();
}

int main() {
    std::vector<int> result1 = topKFrequentElements({1, 1, 1, 2, 2, 3}, 2);
    assert(result1.size() == 2);
    assert(contains(result1, 1));
    assert(contains(result1, 2));

    std::vector<int> result2 = topKFrequentElements({1, 1, 2, 2, 2, 3}, 1);
    assert(result2.size() == 1);
    assert(result2[0] == 2);

    std::vector<int> result3 = topKFrequentElements({1, 2, 3}, 3);
    assert(result3.size() == 3);

    std::vector<int> result4 = topKFrequentElements({7, 7, 7, 7}, 1);
    assert(result4.size() == 1 && result4[0] == 7);

    std::vector<int> result5 = topKFrequentElements({4, 4, 4, 4, 5, 5, 6}, 2);
    assert(result5.size() == 2);
    assert(contains(result5, 4));
    assert(contains(result5, 5));

    std::vector<int> result6 = topKFrequentElements({-1, -1, -2, -2, -2, 3}, 2);
    assert(result6.size() == 2);
    assert(contains(result6, -2));
    assert(contains(result6, -1));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
