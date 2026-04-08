#include "../sources/BoyerMooreVoting.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Basic majority [2,2,1,1,1,2,2] -> majority=2
    {
        auto [majorityElement, count] = boyerMooreVoting({2, 2, 1, 1, 1, 2, 2});
        assert(majorityElement == 2);
    }

    // All same [5,5,5] -> majority=5
    {
        auto [majorityElement, count] = boyerMooreVoting({5, 5, 5});
        assert(majorityElement == 5);
    }

    // Single element [42] -> majority=42
    {
        auto [majorityElement, count] = boyerMooreVoting({42});
        assert(majorityElement == 42);
    }

    // Empty array -> majority=-1, count=0
    {
        auto [majorityElement, count] = boyerMooreVoting({});
        assert(majorityElement == -1);
        assert(count == 0);
    }

    // Majority at start [3,3,3,1,2] -> majority=3
    {
        auto [majorityElement, count] = boyerMooreVoting({3, 3, 3, 1, 2});
        assert(majorityElement == 3);
    }

    // Majority at end [1,2,7,7,7] -> majority=7
    {
        auto [majorityElement, count] = boyerMooreVoting({1, 2, 7, 7, 7});
        assert(majorityElement == 7);
    }

    // Alternating with majority [1,9,1,9,1,9,1] -> majority=1
    {
        auto [majorityElement, count] = boyerMooreVoting({1, 9, 1, 9, 1, 9, 1});
        assert(majorityElement == 1);
    }

    // Two equal elements [4,4] -> majority=4
    {
        auto [majorityElement, count] = boyerMooreVoting({4, 4});
        assert(majorityElement == 4);
    }

    // Large majority [6,6,6,1,6,2,6,3,6] -> majority=6
    {
        auto [majorityElement, count] = boyerMooreVoting({6, 6, 6, 1, 6, 2, 6, 3, 6});
        assert(majorityElement == 6);
    }

    // Negative numbers [-3,-3,1,-3,2] -> majority=-3
    {
        auto [majorityElement, count] = boyerMooreVoting({-3, -3, 1, -3, 2});
        assert(majorityElement == -3);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
