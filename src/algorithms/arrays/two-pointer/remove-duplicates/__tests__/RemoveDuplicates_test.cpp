#include "../sources/RemoveDuplicates.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Basic sorted array [1,1,2,2,3]: unique=[1,2,3]
    {
        auto [uniqueCount, result] = removeDuplicates({1, 1, 2, 2, 3});
        assert(uniqueCount == 3);
        assert((result == std::vector<int>{1, 2, 3}));
    }

    // No duplicates
    {
        auto [uniqueCount, result] = removeDuplicates({1, 2, 3, 4, 5});
        assert(uniqueCount == 5);
        assert((result == std::vector<int>{1, 2, 3, 4, 5}));
    }

    // All same [7,7,7,7] -> 1 unique
    {
        auto [uniqueCount, result] = removeDuplicates({7, 7, 7, 7});
        assert(uniqueCount == 1);
        assert((result == std::vector<int>{7}));
    }

    // Single element
    {
        auto [uniqueCount, result] = removeDuplicates({42});
        assert(uniqueCount == 1);
        assert((result == std::vector<int>{42}));
    }

    // Empty array
    {
        auto [uniqueCount, result] = removeDuplicates({});
        assert(uniqueCount == 0);
        assert(result.empty());
    }

    // Default input [1,1,2,2,3,4,4,5]
    {
        auto [uniqueCount, result] = removeDuplicates({1, 1, 2, 2, 3, 4, 4, 5});
        assert(uniqueCount == 5);
        assert((result == std::vector<int>{1, 2, 3, 4, 5}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
