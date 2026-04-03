public class AmericanFlagSort {
    public static int[] americanFlagSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sortedArray; // @step:complete
        }

        int minValue = sortedArray[0]; // @step:initialize
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (sortedArray[scanIndex] < minValue) minValue = sortedArray[scanIndex]; // @step:initialize
        }
        int offset = minValue < 0 ? -minValue : 0; // @step:initialize
        for (int shiftIndex = 0; shiftIndex < arrayLength; shiftIndex++) { // @step:initialize
            sortedArray[shiftIndex] += offset; // @step:initialize
        }

        int maxValue = sortedArray[0]; // @step:initialize
        for (int maxScan = 0; maxScan < arrayLength; maxScan++) { // @step:initialize
            if (sortedArray[maxScan] > maxValue) maxValue = sortedArray[maxScan]; // @step:initialize
        }
        int digitBase = 10; // @step:initialize
        int digitDivisor = 1; // @step:initialize
        while (maxValue / digitDivisor >= digitBase) { // @step:initialize
            digitDivisor *= digitBase; // @step:initialize
        }

        americanFlagPass(sortedArray, 0, arrayLength, digitDivisor, digitBase);

        for (int unshiftIndex = 0; unshiftIndex < arrayLength; unshiftIndex++) { // @step:mark-sorted
            sortedArray[unshiftIndex] -= offset; // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }

    private static void americanFlagPass(int[] arr, int start, int end, int divisor, int base) {
        if (end - start <= 1 || divisor < 1) return;

        int[] counts = new int[base]; // @step:count
        for (int countIndex = start; countIndex < end; countIndex++) { // @step:extract-digit
            int digit = (arr[countIndex] / divisor) % base; // @step:extract-digit
            counts[digit]++; // @step:count
        }

        int[] offsets = new int[base]; // @step:count
        offsets[0] = start; // @step:count
        for (int offsetIndex = 1; offsetIndex < base; offsetIndex++) { // @step:count
            offsets[offsetIndex] = offsets[offsetIndex - 1] + counts[offsetIndex - 1]; // @step:count
        }

        int[] boundaries = offsets.clone(); // @step:count

        for (int bucketDigit = 0; bucketDigit < base; bucketDigit++) { // @step:swap
            int bucketEnd = boundaries[bucketDigit] + counts[bucketDigit]; // @step:swap
            while (offsets[bucketDigit] < bucketEnd) { // @step:swap
                int currentPos = offsets[bucketDigit]; // @step:swap
                int digit = (arr[currentPos] / divisor) % base; // @step:extract-digit
                if (digit == bucketDigit) {
                    offsets[bucketDigit]++; // @step:swap
                } else {
                    int swapTarget = offsets[digit]; // @step:swap
                    int temporary = arr[currentPos]; // @step:swap
                    arr[currentPos] = arr[swapTarget]; // @step:swap
                    arr[swapTarget] = temporary; // @step:swap
                    offsets[digit]++; // @step:swap
                }
            }
        }

        if (divisor > 1) {
            int nextDivisor = divisor / base; // @step:mark-sorted
            for (int recursiveDigit = 0; recursiveDigit < base; recursiveDigit++) { // @step:mark-sorted
                if (counts[recursiveDigit] > 1) {
                    americanFlagPass(
                        arr,
                        boundaries[recursiveDigit],
                        boundaries[recursiveDigit] + counts[recursiveDigit],
                        nextDivisor,
                        base
                    ); // @step:mark-sorted
                }
            }
        }
    }
}
