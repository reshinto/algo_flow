#include "../sources/TopKFrequentHeap.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

bool contains(const std::vector<int>& vec, int value) {
    return std::find(vec.begin(), vec.end(), value) != vec.end();
}

int main() {
    // Test: returns k=2 elements including 1 and 3
    {
        std::vector<int> input = {1,1,1,2,2,3,3,3,3,4};
        auto result = topKFrequentHeap(input, 2);
        assert(result.size() == 2);
        assert(contains(result, 1));
        assert(contains(result, 3));
    }

    // Test: top-1 most frequent is 4
    {
        std::vector<int> input = {4,4,4,4,2,2,1};
        auto result = topKFrequentHeap(input, 1);
        assert(result.size() == 1 && result[0] == 4);
    }

    // Test: all same elements
    {
        std::vector<int> input = {9,9,9,9};
        auto result = topKFrequentHeap(input, 1);
        assert(result.size() == 1 && result[0] == 9);
    }

    // Test: single element
    {
        std::vector<int> input = {3};
        auto result = topKFrequentHeap(input, 1);
        assert(result.size() == 1 && result[0] == 3);
    }

    // Test: excludes element with frequency 1
    {
        std::vector<int> input = {1,1,1,2,2,3,3,3,3,4};
        auto result = topKFrequentHeap(input, 2);
        assert(!contains(result, 4));
    }

    // Test: k=3 from default input
    {
        std::vector<int> input = {1,1,1,2,2,3,3,3,3,4};
        auto result = topKFrequentHeap(input, 3);
        assert(result.size() == 3);
        assert(contains(result, 1) && contains(result, 2) && contains(result, 3));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
