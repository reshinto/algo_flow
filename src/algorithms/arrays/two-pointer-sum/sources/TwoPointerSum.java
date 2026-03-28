// Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
public class TwoPointerSum {
    public static int[] twoPointerSum(int[] sortedArray, int target) {
        int leftPointer = 0; // @step:initialize
        int rightPointer = sortedArray.length - 1; // @step:initialize

        while (leftPointer < rightPointer) {
            int currentSum = sortedArray[leftPointer] + sortedArray[rightPointer]; // @step:visit

            if (currentSum == target) { // @step:compare
                return new int[]{1, leftPointer, rightPointer}; // @step:complete
            } else if (currentSum < target) { // @step:compare
                leftPointer++; // @step:visit
            } else {
                rightPointer--; // @step:visit
            }
        }

        return new int[]{0, -1, -1}; // @step:complete
    }
}
