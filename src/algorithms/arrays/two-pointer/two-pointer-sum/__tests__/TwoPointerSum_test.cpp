#include "../sources/TwoPointerSum.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Basic sorted array [1,2,4,6,8,11,15], target=10: 2+8=10 at (1,4)
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({1, 2, 4, 6, 8, 11, 15}, 10);
        assert(found == true);
        assert(leftIndex == 1);
        assert(rightIndex == 4);
    }

    // Pair at outermost positions [1,2,3,4,5], target=6: 1+5=6
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({1, 2, 3, 4, 5}, 6);
        assert(found == true);
        assert(leftIndex == 0);
        assert(rightIndex == 4);
    }

    // Not found [1,3,5,7], target=2
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({1, 3, 5, 7}, 2);
        assert(found == false);
        assert(leftIndex == -1);
        assert(rightIndex == -1);
    }

    // Single element -> not found
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({5}, 10);
        assert(found == false);
    }

    // Empty array -> not found
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({}, 10);
        assert(found == false);
    }

    // All identical elements match [5,5,5,5], target=10
    assert(std::get<0>(twoPointerSum({5, 5, 5, 5}, 10)) == true);

    // Negative numbers [-3,-1,0,2,4], target=1
    {
        auto [found, leftIndex, rightIndex] = twoPointerSum({-3, -1, 0, 2, 4}, 1);
        assert(found == true);
        assert(leftIndex == 0);
        assert(rightIndex == 4);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
