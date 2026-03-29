// Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
public class SingleNumber {
    public static int[] singleNumber(int[] inputArray) {
        int runningXor = 0; // @step:initialize

        for (int scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
            runningXor ^= inputArray[scanIndex]; // @step:visit
        }

        return new int[]{runningXor}; // @step:complete
    }
}
