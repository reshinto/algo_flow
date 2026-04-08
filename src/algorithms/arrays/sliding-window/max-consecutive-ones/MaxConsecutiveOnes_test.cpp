#include "sources/MaxConsecutiveOnes.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    {
        auto [maxLen, start] = maxConsecutiveOnes({1, 1, 0, 0, 1, 1, 1, 0, 1, 1}, 2);
        assert(maxLen == 7 && start == 0);
    }
    assert(maxConsecutiveOnes({1, 0, 1, 0, 1}, 2).first == 5);
    {
        auto [maxLen, start] = maxConsecutiveOnes({1, 1, 1, 1}, 0);
        assert(maxLen == 4 && start == 0);
    }
    assert(maxConsecutiveOnes({1, 1, 0, 1, 1}, 0).first == 2);
    assert(maxConsecutiveOnes({}, 2).first == 0);
    {
        auto [maxLen, start] = maxConsecutiveOnes({1}, 0);
        assert(maxLen == 1 && start == 0);
    }
    assert(maxConsecutiveOnes({0}, 1).first == 1);
    assert(maxConsecutiveOnes({0, 0, 0}, 2).first == 2);
    assert(maxConsecutiveOnes({1, 0, 1}, 1).first == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
