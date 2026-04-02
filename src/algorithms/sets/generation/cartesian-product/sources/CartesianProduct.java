// Cartesian Product
// Generates all ordered pairs (a, b) where a ∈ setA and b ∈ setB.
// Time: O(n × m) — one pair per combination of elements
// Space: O(n × m) for the result list

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CartesianProduct {

    public static List<List<Integer>> cartesianProduct(int[] setA, int[] setB) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize

        for (int elemA : setA) {
            for (int elemB : setB) {
                result.add(Arrays.asList(elemA, elemB)); // @step:generate-pair
            }
        }

        return result; // @step:complete
    }
}
