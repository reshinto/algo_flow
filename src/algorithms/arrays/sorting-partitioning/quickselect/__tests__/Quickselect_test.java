public class Quickselect_test {
    public static void main(String[] args) {
        // 4th smallest in [7,2,1,6,8,5,3,4] sorted=[1,2,3,4,5,6,7,8] -> 4
        {
            int[] result = Quickselect.quickselect(new int[]{7, 2, 1, 6, 8, 5, 3, 4}, 4);
            assert result[0] == 4 : "Expected kthElement=4, got " + result[0];
        }

        // Minimum (k=1)
        {
            int[] result = Quickselect.quickselect(new int[]{7, 2, 1, 6, 8, 5, 3, 4}, 1);
            assert result[0] == 1 : "Expected kthElement=1, got " + result[0];
        }

        // Maximum (k=n)
        {
            int[] result = Quickselect.quickselect(new int[]{7, 2, 1, 6, 8, 5, 3, 4}, 8);
            assert result[0] == 8 : "Expected kthElement=8, got " + result[0];
        }

        // Single element
        {
            int[] result = Quickselect.quickselect(new int[]{42}, 1);
            assert result[0] == 42 : "Expected kthElement=42, got " + result[0];
        }

        // Invalid k=0
        {
            int[] result = Quickselect.quickselect(new int[]{1, 2, 3}, 0);
            assert result[0] == -1 : "Expected kthElement=-1 for k=0, got " + result[0];
        }

        // Invalid k too large
        {
            int[] result = Quickselect.quickselect(new int[]{1, 2, 3}, 5);
            assert result[0] == -1 : "Expected kthElement=-1 for k>n, got " + result[0];
        }

        // Empty array
        {
            int[] result = Quickselect.quickselect(new int[]{}, 1);
            assert result[0] == -1 : "Expected kthElement=-1 for empty, got " + result[0];
        }

        // Duplicates [3,3,1,2], k=2 -> 2
        {
            int[] result = Quickselect.quickselect(new int[]{3, 3, 1, 2}, 2);
            assert result[0] == 2 : "Expected kthElement=2, got " + result[0];
        }

        // Median of odd-length [3,1,4,1,5,9,2,6,5], k=5 -> 4
        {
            int[] result = Quickselect.quickselect(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}, 5);
            assert result[0] == 4 : "Expected kthElement=4, got " + result[0];
        }

        System.out.println("All tests passed!");
    }
}
