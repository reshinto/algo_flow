import java.util.Arrays;

public class SortNearlySorted_test {
    public static void main(String[] args) {
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{6,5,3,2,8,10,9}, 3), new int[]{2,3,5,6,8,9,10}) : "Test 1 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{1,2,3,4,5}, 0), new int[]{1,2,3,4,5}) : "Test 2 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{2,1,4,3,6,5}, 1), new int[]{1,2,3,4,5,6}) : "Test 3 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{42}, 0), new int[]{42}) : "Test 4 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{2,1}, 1), new int[]{1,2}) : "Test 5 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{5,4,3,2,1}, 4), new int[]{1,2,3,4,5}) : "Test 6 failed";
        assert Arrays.equals(SortNearlySorted.sortNearlySorted(new int[]{3,3,1,1,2}, 2), new int[]{1,1,2,3,3}) : "Test 7 failed";
        System.out.println("All tests passed!");
    }
}
