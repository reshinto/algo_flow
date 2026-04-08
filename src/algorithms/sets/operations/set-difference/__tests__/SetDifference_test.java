import java.util.Arrays;
import java.util.List;

public class SetDifference_test {

    public static void main(String[] args) {
        // elements only in A for default input
        List<Integer> result1 = SetDifference.setDifference(
            new int[]{1, 2, 3, 4, 5}, new int[]{3, 4, 5, 6, 7});
        assert result1.equals(Arrays.asList(1, 2)) : "Expected [1,2], got " + result1;

        // disjoint arrays return all of A
        List<Integer> result2 = SetDifference.setDifference(new int[]{1, 3, 5}, new int[]{2, 4, 6});
        assert result2.equals(Arrays.asList(1, 3, 5));

        // A subset of B returns empty
        List<Integer> result3 = SetDifference.setDifference(new int[]{2, 4}, new int[]{1, 2, 3, 4, 5});
        assert result3.isEmpty();

        // empty B returns all of A
        List<Integer> result4 = SetDifference.setDifference(new int[]{1, 2, 3}, new int[]{});
        assert result4.equals(Arrays.asList(1, 2, 3));

        // empty A returns empty
        List<Integer> result5 = SetDifference.setDifference(new int[]{}, new int[]{1, 2, 3});
        assert result5.isEmpty();

        // identical arrays return empty
        List<Integer> result6 = SetDifference.setDifference(new int[]{1, 2, 3}, new int[]{1, 2, 3});
        assert result6.isEmpty();

        // single element match
        List<Integer> result7 = SetDifference.setDifference(new int[]{7}, new int[]{7});
        assert result7.isEmpty();

        // single element no match
        List<Integer> result8 = SetDifference.setDifference(new int[]{7}, new int[]{8});
        assert result8.equals(Arrays.asList(7));

        // B subset of A
        List<Integer> result9 = SetDifference.setDifference(new int[]{1, 2, 3, 4, 5}, new int[]{2, 4});
        assert result9.equals(Arrays.asList(1, 3, 5));

        System.out.println("All tests passed!");
    }
}
