// Missing Number — find the missing number in range [0, n] using a hash set
#include <vector>
#include <unordered_set>

int missingNumber(const std::vector<int>& numbers) {
    std::unordered_set<int> numberSet; // @step:initialize
    for (int num : numbers) {
        numberSet.insert(num); // @step:insert-key
    }
    for (int checkValue = 0; checkValue <= (int)numbers.size(); checkValue++) {
        if (!numberSet.count(checkValue)) {
            // @step:lookup-key
            return checkValue; // @step:key-not-found
        }
    }
    return -1; // @step:complete
}
