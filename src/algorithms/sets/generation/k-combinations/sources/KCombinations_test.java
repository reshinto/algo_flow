import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class KCombinations_test {

    public static void main(String[] args) {
        // C(5,3) = 10
        List<List<Integer>> result1 = KCombinations.kCombinations(new int[]{1, 2, 3, 4, 5}, 3);
        assert result1.size() == 10 : "Expected 10 combinations, got " + result1.size();

        // every subset has exactly k elements
        for (List<Integer> subset : result1) {
            assert subset.size() == 3 : "Expected subset of size 3, got " + subset.size();
        }

        // C(4,2) = 6
        List<List<Integer>> result2 = KCombinations.kCombinations(new int[]{1, 2, 3, 4}, 2);
        assert result2.size() == 6 : "Expected 6 combinations, got " + result2.size();

        // k equals n — full set, exactly 1 result
        List<List<Integer>> result3 = KCombinations.kCombinations(new int[]{1, 2, 3}, 3);
        assert result3.size() == 1 : "Expected 1 combination for k == n";

        // k = 0 returns one empty subset
        List<List<Integer>> result4 = KCombinations.kCombinations(new int[]{1, 2, 3}, 0);
        assert result4.size() == 1 : "Expected 1 result for k=0";
        assert result4.get(0).isEmpty() : "Expected empty subset for k=0";

        // k exceeds n — no combinations
        List<List<Integer>> result5 = KCombinations.kCombinations(new int[]{1, 2}, 5);
        assert result5.isEmpty() : "Expected empty result when k > n";

        // empty input with positive k
        List<List<Integer>> result6 = KCombinations.kCombinations(new int[]{}, 2);
        assert result6.isEmpty() : "Expected empty result for empty input";

        // no duplicate combinations
        Set<String> uniqueSubsets = result1.stream()
            .map(subset -> {
                List<Integer> sorted = subset.stream().sorted().collect(Collectors.toList());
                return sorted.toString();
            })
            .collect(Collectors.toSet());
        assert uniqueSubsets.size() == result1.size() : "Found duplicate combinations";

        System.out.println("All tests passed!");
    }
}
