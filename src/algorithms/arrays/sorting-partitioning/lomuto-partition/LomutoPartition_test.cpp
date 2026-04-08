#include "sources/LomutoPartition.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Default input: pivot 7 at correct position
    {
        auto [pivotIndex, result] = lomutoPartition({8, 3, 6, 1, 5, 9, 2, 7});
        assert(result[pivotIndex] == 7);
        for (int leftIdx = 0; leftIdx < pivotIndex; leftIdx++) {
            assert(result[leftIdx] <= 7);
        }
        for (int rightIdx = pivotIndex + 1; rightIdx < (int)result.size(); rightIdx++) {
            assert(result[rightIdx] > 7);
        }
    }

    // Already sorted [1,2,3,4,5]: pivot 5 at last index
    {
        auto [pivotIndex, result] = lomutoPartition({1, 2, 3, 4, 5});
        assert(pivotIndex == 4);
        assert(result[4] == 5);
    }

    // Reverse sorted [5,4,3,2,1]: pivot 1 at index 0
    {
        auto [pivotIndex, result] = lomutoPartition({5, 4, 3, 2, 1});
        assert(pivotIndex == 0);
        assert(result[0] == 1);
    }

    // Single element [42]
    {
        auto [pivotIndex, result] = lomutoPartition({42});
        assert(pivotIndex == 0);
        assert((result == std::vector<int>{42}));
    }

    // Empty array
    {
        auto [pivotIndex, result] = lomutoPartition({});
        assert(pivotIndex == -1);
        assert(result.empty());
    }

    // Two elements [5,2]: pivot 2 goes to index 0
    {
        auto [pivotIndex, result] = lomutoPartition({5, 2});
        assert(pivotIndex == 0);
        assert(result[0] == 2);
        assert(result[1] == 5);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
