#include "sources/FindAllDuplicates.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    // Default input [4,3,2,7,8,2,3,1] -> [2,3]
    {
        std::vector<int> result = findAllDuplicates({4, 3, 2, 7, 8, 2, 3, 1});
        std::sort(result.begin(), result.end());
        assert(result == std::vector<int>({2, 3}));
    }

    // No duplicates [1,2,3,4,5] -> []
    assert(findAllDuplicates({1, 2, 3, 4, 5}).empty());

    // Single duplicate [1,2,3,2] -> [2]
    assert(findAllDuplicates({1, 2, 3, 2}) == std::vector<int>({2}));

    // Multiple duplicates [1,1,2,2,3,3] -> [1,2,3]
    {
        std::vector<int> result = findAllDuplicates({1, 1, 2, 2, 3, 3});
        std::sort(result.begin(), result.end());
        assert(result == std::vector<int>({1, 2, 3}));
    }

    // Empty array -> []
    assert(findAllDuplicates({}).empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
