#include "sources/LongestKDistinct.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // result.first=maxLength, result.second=startIndex
    assert(longestKDistinct({1, 2, 1, 2, 3, 3, 4, 1}, 2).first == 4);

    {
        auto [maxLen, start] = longestKDistinct({1, 2, 2, 3, 3, 3}, 1);
        assert(maxLen == 3 && start == 3);
    }

    {
        auto [maxLen, start] = longestKDistinct({1, 2, 3}, 5);
        assert(maxLen == 3 && start == 0);
    }

    {
        auto [maxLen, start] = longestKDistinct({2, 2, 2, 2}, 2);
        assert(maxLen == 4 && start == 0);
    }

    assert(longestKDistinct({1, 2, 3}, 0).first == 0);
    assert(longestKDistinct({}, 2).first == 0);

    {
        auto [maxLen, start] = longestKDistinct({7}, 1);
        assert(maxLen == 1 && start == 0);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
