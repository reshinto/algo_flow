// Min Cost Climbing Stairs tabulation — minimum cost to reach the top
public class MinCostClimbingStairsTabulation {
    public static int minCostClimbingStairsTabulation(int[] costs) { // @step:initialize
        int stairCount = costs.length; // @step:initialize
        if (stairCount == 0) return 0; // @step:initialize
        int[] dpTable = new int[stairCount + 1]; // @step:initialize,fill-table
        dpTable[0] = 0; // @step:fill-table
        dpTable[1] = 0; // @step:fill-table
        // Each entry is the minimum cost to reach that step from either one or two steps below
        for (int currentStep = 2; currentStep <= stairCount; currentStep++) { // @step:compute-cell
            dpTable[currentStep] = Math.min(
                dpTable[currentStep - 1] + costs[currentStep - 1], // @step:compute-cell,read-cache
                dpTable[currentStep - 2] + costs[currentStep - 2]  // @step:compute-cell,read-cache
            );
        }
        return dpTable[stairCount]; // @step:complete
    }
}
