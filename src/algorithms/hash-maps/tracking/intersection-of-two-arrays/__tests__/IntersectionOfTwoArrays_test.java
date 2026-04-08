import java.util.*;

public class IntersectionOfTwoArrays_test {
    public static void main(String[] args) {
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{1, 2, 2, 1}, new int[]{2, 2}).equals(Arrays.asList(2));
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{1, 2}, new int[]{3, 4}).equals(Collections.emptyList());
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{}, new int[]{}).equals(Collections.emptyList());
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{}, new int[]{1, 2}).equals(Collections.emptyList());
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{1, 2}, new int[]{}).equals(Collections.emptyList());
        assert IntersectionOfTwoArrays.intersectionOfTwoArrays(new int[]{5}, new int[]{5}).equals(Arrays.asList(5));

        List<Integer> result = IntersectionOfTwoArrays.intersectionOfTwoArrays(
            new int[]{4, 9, 5}, new int[]{9, 4, 9, 8, 4});
        Collections.sort(result);
        assert result.equals(Arrays.asList(4, 9));

        List<Integer> result2 = IntersectionOfTwoArrays.intersectionOfTwoArrays(
            new int[]{1, 2, 3}, new int[]{1, 2, 3});
        Collections.sort(result2);
        assert result2.equals(Arrays.asList(1, 2, 3));

        System.out.println("All tests passed!");
    }
}
