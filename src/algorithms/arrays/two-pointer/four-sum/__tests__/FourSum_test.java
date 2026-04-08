import java.util.Arrays;
import java.util.List;

public class FourSum_test {
    public static void main(String[] args) {
        // Default input [1,0,-1,0,-2,2], target=0 -> 3 unique quadruplets
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{1, 0, -1, 0, -2, 2}, 0);
            assert result.size() == 3 : "Expected 3 quadruplets, got " + result.size();
            assert result.contains(Arrays.asList(-2, -1, 1, 2)) : "Missing [-2,-1,1,2]";
            assert result.contains(Arrays.asList(-2, 0, 0, 2)) : "Missing [-2,0,0,2]";
            assert result.contains(Arrays.asList(-1, 0, 0, 1)) : "Missing [-1,0,0,1]";
        }

        // No quadruplets
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{1, 2, 3, 4}, 100);
            assert result.isEmpty() : "Expected empty for no matching quadruplets";
        }

        // All zeros
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{0, 0, 0, 0}, 0);
            assert result.size() == 1 : "Expected 1 quadruplet for all zeros";
            assert result.contains(Arrays.asList(0, 0, 0, 0)) : "Missing [0,0,0,0]";
        }

        // Fewer than four elements
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{1, 2, 3}, 6);
            assert result.isEmpty() : "Expected empty for <4 elements";
        }

        // Empty input
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{}, 0);
            assert result.isEmpty() : "Expected empty for empty input";
        }

        // No duplicates with repeated input
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{0, 0, 0, 0, 0}, 0);
            assert result.size() == 1 : "Expected 1 unique quadruplet, got " + result.size();
        }

        // All found quadruplets sum to target
        {
            List<List<Integer>> result = FourSum.fourSum(new int[]{1, 0, -1, 0, -2, 2}, 0);
            for (List<Integer> quad : result) {
                int quadSum = quad.stream().mapToInt(Integer::intValue).sum();
                assert quadSum == 0 : "Quadruplet sum should be 0, got " + quadSum;
            }
        }

        System.out.println("All tests passed!");
    }
}
