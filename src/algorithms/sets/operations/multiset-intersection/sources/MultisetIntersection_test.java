import java.util.Arrays;
import java.util.List;

public class MultisetIntersection_test {

    public static void main(String[] args) {
        // sorted bag intersection for default input
        List<Integer> result1 = MultisetIntersection.multisetIntersection(
            new int[]{1, 1, 2, 3, 3, 3}, new int[]{1, 1, 1, 2, 2, 3});
        assert result1.equals(Arrays.asList(1, 1, 2, 3)) : "Expected [1,1,2,3], got " + result1;

        // both empty
        List<Integer> result2 = MultisetIntersection.multisetIntersection(new int[]{}, new int[]{});
        assert result2.isEmpty() : "Expected empty for both empty";

        // disjoint arrays
        List<Integer> result3 = MultisetIntersection.multisetIntersection(
            new int[]{1, 3, 5}, new int[]{2, 4, 6});
        assert result3.isEmpty() : "Expected empty for disjoint arrays";

        // min count from smaller side
        List<Integer> result4 = MultisetIntersection.multisetIntersection(
            new int[]{5, 5, 5}, new int[]{5});
        assert result4.equals(Arrays.asList(5)) : "Expected [5]";

        // identical arrays
        List<Integer> result5 = MultisetIntersection.multisetIntersection(
            new int[]{1, 2, 2, 3}, new int[]{1, 2, 2, 3});
        assert result5.equals(Arrays.asList(1, 2, 2, 3)) : "Expected [1,2,2,3]";

        // single element match
        List<Integer> result6 = MultisetIntersection.multisetIntersection(
            new int[]{7}, new int[]{7});
        assert result6.equals(Arrays.asList(7)) : "Expected [7]";

        // single element no match
        List<Integer> result7 = MultisetIntersection.multisetIntersection(
            new int[]{7}, new int[]{8});
        assert result7.isEmpty() : "Expected empty for non-matching single elements";

        System.out.println("All tests passed!");
    }
}
