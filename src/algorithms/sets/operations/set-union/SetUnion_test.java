import java.util.Arrays;
import java.util.List;

public class SetUnion_test {

    public static void main(String[] args) {
        // combines unique elements for default input
        List<Integer> result1 = SetUnion.setUnion(
            new int[]{1, 2, 3, 4, 5}, new int[]{3, 4, 5, 6, 7});
        assert result1.equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7)) : "Got " + result1;

        // disjoint arrays
        List<Integer> result2 = SetUnion.setUnion(new int[]{1, 3, 5}, new int[]{2, 4, 6});
        assert result2.equals(Arrays.asList(1, 3, 5, 2, 4, 6));

        // identical arrays
        List<Integer> result3 = SetUnion.setUnion(new int[]{1, 2, 3}, new int[]{1, 2, 3});
        assert result3.equals(Arrays.asList(1, 2, 3));

        // empty A
        List<Integer> result4 = SetUnion.setUnion(new int[]{}, new int[]{1, 2, 3});
        assert result4.equals(Arrays.asList(1, 2, 3));

        // empty B
        List<Integer> result5 = SetUnion.setUnion(new int[]{1, 2, 3}, new int[]{});
        assert result5.equals(Arrays.asList(1, 2, 3));

        // both empty
        List<Integer> result6 = SetUnion.setUnion(new int[]{}, new int[]{});
        assert result6.isEmpty();

        // single element match
        List<Integer> result7 = SetUnion.setUnion(new int[]{7}, new int[]{7});
        assert result7.equals(Arrays.asList(7));

        // single element no match
        List<Integer> result8 = SetUnion.setUnion(new int[]{7}, new int[]{8});
        assert result8.equals(Arrays.asList(7, 8));

        // no duplicates from repeated B values
        List<Integer> result9 = SetUnion.setUnion(new int[]{1, 2, 3}, new int[]{2, 2, 2});
        assert result9.equals(Arrays.asList(1, 2, 3));

        System.out.println("All tests passed!");
    }
}
