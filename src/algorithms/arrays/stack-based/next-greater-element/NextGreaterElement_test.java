import java.util.Arrays;

public class NextGreaterElement_test {
    public static void main(String[] args) {
        // Mixed array [4,5,2,10,8] -> [5,10,10,-1,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{4, 5, 2, 10, 8});
            assert Arrays.equals(result, new int[]{5, 10, 10, -1, -1}) : "Mixed array failed";
        }

        // Strictly increasing [1,2,3,4] -> [2,3,4,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{1, 2, 3, 4});
            assert Arrays.equals(result, new int[]{2, 3, 4, -1}) : "Increasing failed";
        }

        // Strictly decreasing [4,3,2,1] -> [-1,-1,-1,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{4, 3, 2, 1});
            assert Arrays.equals(result, new int[]{-1, -1, -1, -1}) : "Decreasing failed";
        }

        // All equal [5,5,5] -> [-1,-1,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{5, 5, 5});
            assert Arrays.equals(result, new int[]{-1, -1, -1}) : "All equal failed";
        }

        // Single element [7] -> [-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{7});
            assert Arrays.equals(result, new int[]{-1}) : "Single element failed";
        }

        // Empty array
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{});
            assert result.length == 0 : "Empty array failed";
        }

        // Default input [4,5,2,10,8,1,3] -> [5,10,10,-1,-1,3,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{4, 5, 2, 10, 8, 1, 3});
            assert Arrays.equals(result, new int[]{5, 10, 10, -1, -1, 3, -1}) : "Default input failed";
        }

        // With duplicates [2,1,2,4,3] -> [4,2,4,-1,-1]
        {
            int[] result = NextGreaterElement.nextGreaterElement(new int[]{2, 1, 2, 4, 3});
            assert Arrays.equals(result, new int[]{4, 2, 4, -1, -1}) : "Duplicates failed";
        }

        System.out.println("All tests passed!");
    }
}
