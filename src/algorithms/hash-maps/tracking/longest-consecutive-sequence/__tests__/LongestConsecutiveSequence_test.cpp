#include "../sources/LongestConsecutiveSequence.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(longestConsecutiveSequence({100, 4, 200, 1, 3, 2}) == 4);
    assert(longestConsecutiveSequence({10, 20, 30}) == 1);
    assert(longestConsecutiveSequence({1, 2, 3, 4, 5}) == 5);
    assert(longestConsecutiveSequence({42}) == 1);
    assert(longestConsecutiveSequence({1, 2, 2, 3}) == 3);
    assert(longestConsecutiveSequence({-3, -2, -1, 0, 1}) == 5);
    assert(longestConsecutiveSequence({-1, 0, 1}) == 3);
    assert(longestConsecutiveSequence({1, 2, 3, 10, 11, 12, 13}) == 4);
    assert(longestConsecutiveSequence({5, 1, 3, 2, 4}) == 5);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
