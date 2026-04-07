public class TwoPointerSum_test {
    public static void main(String[] args) {
        // Basic sorted array [1,2,4,6,8,11,15], target=10: 2+8=10 at (1,4)
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{1, 2, 4, 6, 8, 11, 15}, 10);
            // result[0]=found(1=true/0=false), result[1]=leftIndex, result[2]=rightIndex
            assert result[0] == 1 : "Expected found=true";
            assert result[1] == 1 : "Expected leftIndex=1, got " + result[1];
            assert result[2] == 4 : "Expected rightIndex=4, got " + result[2];
        }

        // Pair at outermost positions [1,2,3,4,5], target=6: 1+5=6
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{1, 2, 3, 4, 5}, 6);
            assert result[0] == 1 : "Expected found=true";
            assert result[1] == 0 : "Expected leftIndex=0";
            assert result[2] == 4 : "Expected rightIndex=4";
        }

        // Not found [1,3,5,7], target=2
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{1, 3, 5, 7}, 2);
            assert result[0] == 0 : "Expected found=false";
            assert result[1] == -1 : "Expected leftIndex=-1";
            assert result[2] == -1 : "Expected rightIndex=-1";
        }

        // Single element -> not found
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{5}, 10);
            assert result[0] == 0 : "Expected found=false for single element";
        }

        // Empty array -> not found
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{}, 10);
            assert result[0] == 0 : "Expected found=false for empty";
        }

        // All identical elements match [5,5,5,5], target=10
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{5, 5, 5, 5}, 10);
            assert result[0] == 1 : "Expected found=true";
        }

        // Negative numbers [-3,-1,0,2,4], target=1: -3+4=1
        {
            int[] result = TwoPointerSum.twoPointerSum(new int[]{-3, -1, 0, 2, 4}, 1);
            assert result[0] == 1 : "Expected found=true";
            assert result[1] == 0 : "Expected leftIndex=0";
            assert result[2] == 4 : "Expected rightIndex=4";
        }

        System.out.println("All tests passed!");
    }
}
