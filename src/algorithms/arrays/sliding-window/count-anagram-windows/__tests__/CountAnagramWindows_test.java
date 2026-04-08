import java.util.Arrays;

public class CountAnagramWindows_test {
    public static void main(String[] args) {
        // Pattern equals text length -> one window
        int[] result1 = CountAnagramWindows.countAnagramWindows(new int[]{3, 1, 2}, new int[]{1, 2, 3});
        assert result1.length == 1 && result1[0] == 0 : "Expected [0], got " + Arrays.toString(result1);

        // No anagram [1,1,1,1] with pattern [1,2] -> empty
        int[] result2 = CountAnagramWindows.countAnagramWindows(new int[]{1, 1, 1, 1}, new int[]{1, 2});
        assert result2.length == 0 : "Expected empty, got " + Arrays.toString(result2);

        // Pattern longer than text -> empty
        int[] result3 = CountAnagramWindows.countAnagramWindows(new int[]{1, 2}, new int[]{1, 2, 3});
        assert result3.length == 0 : "Expected empty, got " + Arrays.toString(result3);

        // Empty text -> empty
        int[] result4 = CountAnagramWindows.countAnagramWindows(new int[]{}, new int[]{1, 2});
        assert result4.length == 0;

        // Anagram at last position [4,5,1,2,3] pattern [3,2,1] -> position 2
        int[] result5 = CountAnagramWindows.countAnagramWindows(new int[]{4, 5, 1, 2, 3}, new int[]{3, 2, 1});
        assert result5.length >= 1;
        boolean found2 = false;
        for (int pos : result5) if (pos == 2) found2 = true;
        assert found2 : "Expected position 2 in results";

        System.out.println("All tests passed!");
    }
}
