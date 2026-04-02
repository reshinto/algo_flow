// Greedy Set Cover approximation
// Finds the minimum number of subsets that cover all elements of the universe.
// Time: O(n × m) where n = |universe|, m = |sets|
// Space: O(n + m) for the uncovered set and selected sets tracking

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetCover {

    public static int[] setCover(int[] universe, int[][] sets) {
        Set<Integer> uncovered = new HashSet<>(); // @step:initialize
        for (int element : universe) {
            uncovered.add(element);
        }

        List<Integer> selectedIndices = new ArrayList<>();

        while (!uncovered.isEmpty()) { // @step:evaluate-set
            int bestSetIdx = -1;
            int bestCoverage = 0;

            for (int setIdx = 0; setIdx < sets.length; setIdx++) {
                int[] candidateSet = sets[setIdx];
                int coverage = 0;
                for (int elem : candidateSet) {
                    if (uncovered.contains(elem)) coverage++; // @step:evaluate-set
                }
                if (coverage > bestCoverage) {
                    bestCoverage = coverage;
                    bestSetIdx = setIdx;
                }
            }

            if (bestSetIdx == -1) break;

            selectedIndices.add(bestSetIdx); // @step:select-set

            for (int element : sets[bestSetIdx]) {
                uncovered.remove(element); // @step:cover-elements
            }
        }

        return selectedIndices.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
