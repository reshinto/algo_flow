// 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity
public class Knapsack01 {
    public static int knapsack01(int[] weights, int[] values, int capacity) { // @step:initialize
        int itemCount = weights.length; // @step:initialize
        int[] dpTable = new int[capacity + 1]; // @step:initialize,fill-table
        // For each item, iterate capacity right-to-left to enforce 0/1 constraint
        for (int itemIndex = 0; itemIndex < itemCount; itemIndex++) { // @step:compute-cell
            int itemWeight = weights[itemIndex]; // @step:compute-cell
            int itemValue = values[itemIndex]; // @step:compute-cell
            for (int capacityW = capacity; capacityW >= itemWeight; capacityW--) { // @step:read-cache
                int withoutItem = dpTable[capacityW]; // @step:read-cache
                int withItem = dpTable[capacityW - itemWeight] + itemValue; // @step:read-cache
                if (withItem > withoutItem) {
                    dpTable[capacityW] = withItem; // @step:compute-cell
                }
            }
        }
        return dpTable[capacity]; // @step:complete
    }
}
