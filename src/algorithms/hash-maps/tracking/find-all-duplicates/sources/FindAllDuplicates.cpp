// Find All Duplicates — find all elements that appear twice using a hash set
#include <vector>
#include <unordered_set>

std::vector<int> findAllDuplicates(const std::vector<int>& numbers) {
    std::unordered_set<int> seenSet; // @step:initialize
    std::vector<int> duplicates;
    for (int currentNum : numbers) {
        if (seenSet.count(currentNum)) {
            // @step:check-duplicate
            duplicates.push_back(currentNum); // @step:key-found
        } else {
            seenSet.insert(currentNum); // @step:insert-key
        }
    }
    return duplicates; // @step:complete
}
