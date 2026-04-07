import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SetIntersection_test {

    public static void main(String[] args) {
        // common elements for default input
        List<Integer> result1 = SetIntersection.setIntersection(
            new int[]{1, 2, 3, 4, 5, 8}, new int[]{2, 4, 6, 8, 10});
        assert result1.equals(Arrays.asList(2, 4, 8)) : "Expected [2,4,8], got " + result1;

        // disjoint arrays return empty
        List<Integer> result2 = SetIntersection.setIntersection(new int[]{1, 3, 5}, new int[]{2, 4, 6});
        assert result2.isEmpty();

        // A subset of B
        List<Integer> result3 = SetIntersection.setIntersection(new int[]{2, 4}, new int[]{1, 2, 3, 4, 5});
        List<Integer> sorted3 = new java.util.ArrayList<>(result3);
        Collections.sort(sorted3);
        assert sorted3.equals(Arrays.asList(2, 4));

        // no duplicates when B has repeated values
        List<Integer> result4 = SetIntersection.setIntersection(new int[]{1, 2, 3}, new int[]{2, 2, 2});
        assert result4.equals(Arrays.asList(2));

        // empty A
        List<Integer> result5 = SetIntersection.setIntersection(new int[]{}, new int[]{1, 2, 3});
        assert result5.isEmpty();

        // empty B
        List<Integer> result6 = SetIntersection.setIntersection(new int[]{1, 2, 3}, new int[]{});
        assert result6.isEmpty();

        // single element match
        List<Integer> result7 = SetIntersection.setIntersection(new int[]{7}, new int[]{7});
        assert result7.equals(Arrays.asList(7));

        // single element no match
        List<Integer> result8 = SetIntersection.setIntersection(new int[]{7}, new int[]{8});
        assert result8.isEmpty();

        System.out.println("All tests passed!");
    }
}
