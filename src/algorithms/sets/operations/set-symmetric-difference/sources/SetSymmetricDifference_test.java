import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SetSymmetricDifference_test {

    public static void main(String[] args) {
        // elements exclusive to each array
        List<Integer> result1 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{1, 2, 3, 4}, new int[]{3, 4, 5, 6});
        List<Integer> sorted1 = new java.util.ArrayList<>(result1);
        Collections.sort(sorted1);
        assert sorted1.equals(Arrays.asList(1, 2, 5, 6)) : "Expected [1,2,5,6], got " + sorted1;

        // disjoint arrays — all elements returned
        List<Integer> result2 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{1, 3, 5}, new int[]{2, 4, 6});
        List<Integer> sorted2 = new java.util.ArrayList<>(result2);
        Collections.sort(sorted2);
        assert sorted2.equals(Arrays.asList(1, 2, 3, 4, 5, 6));

        // identical arrays — empty result
        List<Integer> result3 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{1, 2, 3}, new int[]{1, 2, 3});
        assert result3.isEmpty();

        // empty B returns all of A
        List<Integer> result4 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{1, 2, 3}, new int[]{});
        List<Integer> sorted4 = new java.util.ArrayList<>(result4);
        Collections.sort(sorted4);
        assert sorted4.equals(Arrays.asList(1, 2, 3));

        // single element match
        List<Integer> result5 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{7}, new int[]{7});
        assert result5.isEmpty();

        // A subset of B
        List<Integer> result6 = SetSymmetricDifference.setSymmetricDifference(
            new int[]{2, 4}, new int[]{1, 2, 3, 4, 5});
        List<Integer> sorted6 = new java.util.ArrayList<>(result6);
        Collections.sort(sorted6);
        assert sorted6.equals(Arrays.asList(1, 3, 5));

        System.out.println("All tests passed!");
    }
}
