// Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets
public class PartitionEqualSubset {
    public static boolean partitionEqualSubset(int[] numbers) { // @step:initialize
        int totalSum = 0;
        for (int value : numbers) totalSum += value; // @step:initialize
        if (totalSum % 2 != 0) return false; // @step:initialize
        int target = totalSum / 2; // @step:initialize
        int tableSize = target + 1; // @step:initialize
        int[] dpTable = new int[tableSize]; // @step:initialize,fill-table
        dpTable[0] = 1; // @step:fill-table
        // For each number, iterate right-to-left to prevent using it more than once
        for (int currentNumber : numbers) { // @step:compute-cell
            for (int sumIndex = target; sumIndex >= currentNumber; sumIndex--) {
                if (dpTable[sumIndex - currentNumber] == 1) { // @step:read-cache
                    dpTable[sumIndex] = 1; // @step:compute-cell
                }
            }
        }
        return dpTable[target] == 1; // @step:complete
    }
}
