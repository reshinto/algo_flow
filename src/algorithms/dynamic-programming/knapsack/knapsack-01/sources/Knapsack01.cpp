// 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity

#include <iostream>
#include <vector>

int knapsack01(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    // @step:initialize
    int itemCount = weights.size(); // @step:initialize
    std::vector<int> dpTable(capacity + 1, 0); // @step:initialize,fill-table
    // For each item, iterate capacity right-to-left to enforce 0/1 constraint
    for (int itemIndex = 0; itemIndex < itemCount; itemIndex++) {
        // @step:compute-cell
        int itemWeight = weights[itemIndex]; // @step:compute-cell
        int itemValue = values[itemIndex]; // @step:compute-cell
        for (int capacityW = capacity; capacityW >= itemWeight; capacityW--) {
            // @step:read-cache
            int withoutItem = dpTable[capacityW]; // @step:read-cache
            int withItem = dpTable[capacityW - itemWeight] + itemValue; // @step:read-cache
            if (withItem > withoutItem) {
                dpTable[capacityW] = withItem; // @step:compute-cell
            }
        }
    }
    return dpTable[capacity]; // @step:complete
}

int main() {
    std::vector<int> weights = {2, 3, 4, 5};
    std::vector<int> values = {3, 4, 5, 6};
    int capacity = 8;
    int result = knapsack01(weights, values, capacity);
    std::cout << "Max knapsack value: " << result << std::endl;
    return 0;
}
