// Can Jump tabulation — determine if you can reach the last index from index 0

#include <iostream>
#include <vector>

bool canJump(const std::vector<int>& nums) {
    // @step:initialize
    int tableSize = nums.size(); // @step:initialize
    std::vector<int> dpTable(tableSize, 0); // @step:initialize,fill-table
    dpTable[0] = 1; // @step:fill-table
    // For each index, check if any prior reachable index can reach it
    for (int targetIndex = 1; targetIndex < tableSize; targetIndex++) {
        // @step:compute-cell
        for (int sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
            // @step:read-cache
            if (dpTable[sourceIndex] == 1 && sourceIndex + nums[sourceIndex] >= targetIndex) {
                // @step:read-cache,compute-cell
                dpTable[targetIndex] = 1; // @step:compute-cell
                break;
            }
        }
    }
    return dpTable[tableSize - 1] == 1; // @step:complete
}

int main() {
    std::vector<int> nums = {2, 3, 1, 1, 4};
    bool result = canJump(nums);
    std::cout << "Can jump: " << (result ? "true" : "false") << std::endl;
    return 0;
}
