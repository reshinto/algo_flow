import java.util.Arrays;
import java.util.List;

public class MultisetUnion_test {

    public static void main(String[] args) {
        // sorted bag union for default input
        List<Integer> result1 = MultisetUnion.multisetUnion(
            new int[]{1, 1, 2, 3, 3, 3}, new int[]{1, 1, 1, 2, 2, 3});
        assert result1.equals(Arrays.asList(1, 1, 1, 2, 2, 3, 3, 3)) : "Got " + result1;

        // both empty
        List<Integer> result2 = MultisetUnion.multisetUnion(new int[]{}, new int[]{});
        assert result2.isEmpty();

        // array A empty returns array B
        List<Integer> result3 = MultisetUnion.multisetUnion(new int[]{}, new int[]{3, 3, 4});
        assert result3.equals(Arrays.asList(3, 3, 4));

        // max count from larger side
        List<Integer> result4 = MultisetUnion.multisetUnion(new int[]{5, 5, 5}, new int[]{5});
        assert result4.equals(Arrays.asList(5, 5, 5));

        // identical arrays
        List<Integer> result5 = MultisetUnion.multisetUnion(new int[]{1, 2, 2}, new int[]{1, 2, 2});
        assert result5.equals(Arrays.asList(1, 2, 2));

        // single element same value
        List<Integer> result6 = MultisetUnion.multisetUnion(new int[]{7}, new int[]{7});
        assert result6.equals(Arrays.asList(7));

        // single element different values
        List<Integer> result7 = MultisetUnion.multisetUnion(new int[]{3}, new int[]{9});
        assert result7.equals(Arrays.asList(3, 9));

        System.out.println("All tests passed!");
    }
}
