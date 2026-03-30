// Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] == 0
import java.util.HashMap;
import java.util.Map;

public class FourSumII {
    public static int fourSumII(int[] numsA, int[] numsB, int[] numsC, int[] numsD) {
        Map<Integer, Integer> pairSumCounts = new HashMap<>(); // @step:initialize

        // Phase 1: build map of all A+B pair sums with their occurrence counts
        for (int outerIndex = 0; outerIndex < numsA.length; outerIndex++) {
            for (int innerIndex = 0; innerIndex < numsB.length; innerIndex++) {
                int pairSum = numsA[outerIndex] + numsB[innerIndex];
                if (pairSumCounts.containsKey(pairSum)) {
                    pairSumCounts.put(pairSum, pairSumCounts.get(pairSum) + 1); // @step:increment-count
                } else {
                    pairSumCounts.put(pairSum, 1); // @step:insert-key
                }
            }
        }

        // Phase 2: for each C+D pair, check if its negation exists in the map
        int tupleCount = 0;
        for (int outerIndex = 0; outerIndex < numsC.length; outerIndex++) {
            for (int innerIndex = 0; innerIndex < numsD.length; innerIndex++) {
                int complement = -(numsC[outerIndex] + numsD[innerIndex]);
                if (pairSumCounts.containsKey(complement)) {
                    tupleCount += pairSumCounts.get(complement); // @step:key-found
                }
                // @step:key-not-found
            }
        }

        return tupleCount; // @step:complete
    }
}
