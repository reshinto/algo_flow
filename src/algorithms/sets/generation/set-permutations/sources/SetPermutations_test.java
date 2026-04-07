import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class SetPermutations_test {

    public static void main(String[] args) {
        // generates 6 permutations for [1, 2, 3]
        List<List<Integer>> result1 = SetPermutations.setPermutations(new int[]{1, 2, 3});
        assert result1.size() == 6 : "Expected 6 permutations, got " + result1.size();

        // contains all expected permutations
        Set<String> permSet = result1.stream()
            .map(perm -> perm.stream().map(String::valueOf).collect(Collectors.joining(",")))
            .collect(Collectors.toSet());
        assert permSet.contains("1,2,3");
        assert permSet.contains("1,3,2");
        assert permSet.contains("2,1,3");
        assert permSet.contains("2,3,1");
        assert permSet.contains("3,1,2");
        assert permSet.contains("3,2,1");

        // two elements generates two permutations
        List<List<Integer>> result2 = SetPermutations.setPermutations(new int[]{1, 2});
        assert result2.size() == 2 : "Expected 2 permutations for 2 elements";

        // single element generates one permutation
        List<List<Integer>> result3 = SetPermutations.setPermutations(new int[]{42});
        assert result3.size() == 1 : "Expected 1 permutation for single element";
        assert result3.get(0).get(0) == 42;

        // empty array generates one permutation (the empty permutation)
        List<List<Integer>> result4 = SetPermutations.setPermutations(new int[]{});
        assert result4.size() == 1 : "Expected 1 permutation for empty input";
        assert result4.get(0).isEmpty();

        // each permutation has same length as input
        for (List<Integer> perm : result1) {
            assert perm.size() == 3 : "Each permutation should have 3 elements";
        }

        // 24 permutations for 4 elements
        List<List<Integer>> result5 = SetPermutations.setPermutations(new int[]{1, 2, 3, 4});
        assert result5.size() == 24 : "Expected 24 permutations for 4 elements, got " + result5.size();

        // all permutations are distinct
        Set<String> uniquePerms = result1.stream()
            .map(perm -> perm.stream().map(String::valueOf).collect(Collectors.joining(",")))
            .collect(Collectors.toSet());
        assert uniquePerms.size() == result1.size() : "Found duplicate permutations";

        System.out.println("All tests passed!");
    }
}
