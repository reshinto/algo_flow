import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class PowerSet_test {

    public static void main(String[] args) {
        // generates 2^4 = 16 subsets
        List<List<Integer>> result1 = PowerSet.powerSet(new int[]{1, 2, 3, 4});
        assert result1.size() == 16 : "Expected 16 subsets, got " + result1.size();

        // includes the empty set
        boolean hasEmpty = result1.stream().anyMatch(List::isEmpty);
        assert hasEmpty : "Expected empty set in result";

        // includes the full set
        boolean hasFull = result1.stream()
            .anyMatch(s -> s.containsAll(Arrays.asList(1, 2, 3, 4)) && s.size() == 4);
        assert hasFull : "Expected full set in result";

        // empty input returns one empty subset
        List<List<Integer>> result2 = PowerSet.powerSet(new int[]{});
        assert result2.size() == 1 : "Expected 1 subset for empty input";
        assert result2.get(0).isEmpty() : "Expected empty subset";

        // single element returns 2 subsets
        List<List<Integer>> result3 = PowerSet.powerSet(new int[]{7});
        assert result3.size() == 2 : "Expected 2 subsets for single element";

        // three elements returns 8 subsets
        List<List<Integer>> result4 = PowerSet.powerSet(new int[]{1, 2, 3});
        assert result4.size() == 8 : "Expected 8 subsets for 3 elements";

        // no duplicate subsets
        Set<String> uniqueSubsets = result1.stream()
            .map(subset -> {
                List<Integer> sorted = subset.stream().sorted().collect(Collectors.toList());
                return sorted.toString();
            })
            .collect(Collectors.toSet());
        assert uniqueSubsets.size() == result1.size() : "Found duplicate subsets";

        System.out.println("All tests passed!");
    }
}
