#include "sources/MinSizeSubarraySum.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    {
        auto [minLength, startIndex] = minSizeSubarraySum({2, 3, 1, 2, 4, 3}, 7);
        assert(minLength == 2 && startIndex == 4);
    }
    assert(minSizeSubarraySum({1, 4, 4}, 4).first == 1);
    assert(minSizeSubarraySum({1, 1, 1, 1}, 10).first == 0);
    {
        auto [minLength, startIndex] = minSizeSubarraySum({1, 2, 3}, 6);
        assert(minLength == 3 && startIndex == 0);
    }
    assert(minSizeSubarraySum({}, 7).first == 0);
    assert(minSizeSubarraySum({1, 2, 3}, 0).first == 0);
    {
        auto [minLength, startIndex] = minSizeSubarraySum({7}, 7);
        assert(minLength == 1 && startIndex == 0);
    }
    assert(minSizeSubarraySum({3, 3, 3, 3}, 6).first == 2);
    {
        auto [minLength, startIndex] = minSizeSubarraySum({100, 1, 1, 1, 1}, 100);
        assert(minLength == 1 && startIndex == 0);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
