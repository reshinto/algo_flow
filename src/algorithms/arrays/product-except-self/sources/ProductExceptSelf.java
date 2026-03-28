// Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] inputArray) {
        int arrayLength = inputArray.length; // @step:initialize
        if (arrayLength == 0) { // @step:initialize
            return new int[0]; // @step:initialize
        }

        int[] resultArray = new int[arrayLength]; // @step:initialize
        java.util.Arrays.fill(resultArray, 1); // @step:initialize

        // Left pass: resultArray[index] = product of all elements to the left
        int prefixProduct = 1; // @step:visit
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:visit
            resultArray[scanIndex] = prefixProduct; // @step:visit
            prefixProduct *= inputArray[scanIndex]; // @step:visit
        }

        // Right pass: multiply each position by the product of all elements to the right
        int suffixProduct = 1; // @step:visit
        for (int scanIndex = arrayLength - 1; scanIndex >= 0; scanIndex--) { // @step:visit
            resultArray[scanIndex] *= suffixProduct; // @step:visit
            suffixProduct *= inputArray[scanIndex]; // @step:visit
        }

        return resultArray; // @step:complete
    }
}
