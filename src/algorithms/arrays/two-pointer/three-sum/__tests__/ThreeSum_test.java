import java.util.Arrays;
import java.util.List;

public class ThreeSum_test {
    public static void main(String[] args) {
        // Default input [-1,0,1,2,-1,-4] -> [[-1,-1,2], [-1,0,1]]
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{-1, 0, 1, 2, -1, -4});
            assert result.size() == 2 : "Expected 2 triplets, got " + result.size();
            assert result.contains(Arrays.asList(-1, -1, 2)) : "Missing [-1,-1,2]";
            assert result.contains(Arrays.asList(-1, 0, 1)) : "Missing [-1,0,1]";
        }

        // No triplets
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{1, 2, 3});
            assert result.isEmpty() : "Expected empty, got " + result.size();
        }

        // Single zero triplet
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{0, 0, 0});
            assert result.size() == 1 : "Expected 1 triplet, got " + result.size();
            assert result.contains(Arrays.asList(0, 0, 0)) : "Missing [0,0,0]";
        }

        // Single element
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{1});
            assert result.isEmpty() : "Expected empty for single element";
        }

        // Empty input
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{});
            assert result.isEmpty() : "Expected empty for empty input";
        }

        // No duplicates with many zeros
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{0, 0, 0, 0});
            assert result.size() == 1 : "Expected 1 unique triplet, got " + result.size();
        }

        // All triplets sum to zero
        {
            List<List<Integer>> result = ThreeSum.threeSum(new int[]{-1, 0, 1, 2, -1, -4});
            for (List<Integer> triplet : result) {
                int tripletSum = triplet.stream().mapToInt(Integer::intValue).sum();
                assert tripletSum == 0 : "Triplet sum should be 0, got " + tripletSum;
            }
        }

        System.out.println("All tests passed!");
    }
}
