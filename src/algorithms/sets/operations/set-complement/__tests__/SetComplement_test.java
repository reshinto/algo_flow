import java.util.Arrays;
import java.util.List;

public class SetComplement_test {

    public static void main(String[] args) {
        // elements in universal set not in A
        List<Integer> result1 = SetComplement.setComplement(
            new int[]{2, 4, 6}, new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        assert result1.equals(Arrays.asList(1, 3, 5, 7, 8)) : "Expected [1,3,5,7,8], got " + result1;

        // empty A returns full universal set
        List<Integer> result2 = SetComplement.setComplement(new int[]{}, new int[]{1, 2, 3});
        assert result2.equals(Arrays.asList(1, 2, 3));

        // A equals universal set returns empty
        List<Integer> result3 = SetComplement.setComplement(new int[]{1, 2, 3}, new int[]{1, 2, 3});
        assert result3.isEmpty();

        // empty universal set returns empty
        List<Integer> result4 = SetComplement.setComplement(new int[]{1, 2, 3}, new int[]{});
        assert result4.isEmpty();

        // elements not in A
        List<Integer> result5 = SetComplement.setComplement(
            new int[]{10, 20}, new int[]{5, 10, 15, 20, 25});
        assert result5.equals(Arrays.asList(5, 15, 25));

        // A elements outside universal set
        List<Integer> result6 = SetComplement.setComplement(new int[]{99, 100}, new int[]{1, 2, 3});
        assert result6.equals(Arrays.asList(1, 2, 3));

        // preserves universal set order
        List<Integer> result7 = SetComplement.setComplement(new int[]{2}, new int[]{4, 3, 1, 5});
        assert result7.equals(Arrays.asList(4, 3, 1, 5));

        // single element universal not in A
        List<Integer> result8 = SetComplement.setComplement(new int[]{7}, new int[]{8});
        assert result8.equals(Arrays.asList(8));

        System.out.println("All tests passed!");
    }
}
