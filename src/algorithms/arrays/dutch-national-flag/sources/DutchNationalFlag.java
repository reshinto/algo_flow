// Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
public class DutchNationalFlag {
    public static int[] dutchNationalFlag(int[] inputArray) {
        int[] result = inputArray.clone(); // @step:initialize
        int lowPointer = 0; // @step:initialize
        int midPointer = 0; // @step:initialize
        int highPointer = result.length - 1; // @step:initialize

        while (midPointer <= highPointer) {
            int currentValue = result[midPointer]; // @step:compare

            if (currentValue == 0) { // @step:compare
                int tempValue = result[lowPointer]; // @step:swap
                result[lowPointer] = result[midPointer]; // @step:swap
                result[midPointer] = tempValue; // @step:swap
                lowPointer++; // @step:visit
                midPointer++; // @step:visit
            } else if (currentValue == 1) { // @step:compare
                midPointer++; // @step:visit
            } else {
                int tempValue = result[highPointer]; // @step:swap
                result[highPointer] = result[midPointer]; // @step:swap
                result[midPointer] = tempValue; // @step:swap
                highPointer--; // @step:visit
            }
        }

        return result; // @step:complete
    }
}
