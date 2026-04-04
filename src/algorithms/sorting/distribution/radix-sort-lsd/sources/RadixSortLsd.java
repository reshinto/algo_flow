import java.util.ArrayList;
import java.util.List;

public class RadixSortLsd {
    public static int[] radixSortLsd(int[] inputArray) { // @step:initialize
        if (inputArray.length == 0) return new int[0]; // @step:initialize
        int[] workingArray = inputArray.clone(); // @step:initialize
        int arrayLength = workingArray.length; // @step:initialize

        // Offset negatives so all values are non-negative
        int minValue = workingArray[0]; // @step:initialize
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (workingArray[scanIndex] < minValue) minValue = workingArray[scanIndex]; // @step:initialize
        }
        int offset = minValue < 0 ? -minValue : 0; // @step:initialize
        for (int offsetIndex = 0; offsetIndex < arrayLength; offsetIndex++) { // @step:initialize
            workingArray[offsetIndex] += offset; // @step:initialize
        }
        int maxValue = workingArray[0]; // @step:initialize
        for (int maxIndex = 1; maxIndex < arrayLength; maxIndex++) { // @step:initialize
            if (workingArray[maxIndex] > maxValue) maxValue = workingArray[maxIndex]; // @step:initialize
        }

        // Process each digit position from least significant to most significant
        int digitDivisor = 1; // @step:initialize
        while (maxValue / digitDivisor > 0) { // @step:extract-digit
            int base = 10; // @step:extract-digit
            List<List<Integer>> buckets = new ArrayList<>(); // @step:extract-digit
            for (int bucketInit = 0; bucketInit < base; bucketInit++) { // @step:extract-digit
                buckets.add(new ArrayList<>()); // @step:extract-digit
            }

            // Distribute elements into buckets based on current digit
            for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) { // @step:extract-digit
                int digit = (workingArray[distributeIndex] / digitDivisor) % base; // @step:extract-digit
                buckets.get(digit).add(workingArray[distributeIndex]); // @step:extract-digit
            }

            // Collect elements back from buckets in order
            int writeIndex = 0; // @step:place
            for (int bucketIndex = 0; bucketIndex < base; bucketIndex++) { // @step:place
                for (int bucketValue : buckets.get(bucketIndex)) { // @step:place
                    workingArray[writeIndex] = bucketValue; // @step:place
                    writeIndex++; // @step:place
                }
            }

            digitDivisor *= base; // @step:place
        }

        // Reverse the offset to restore original value range
        for (int restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) { // @step:mark-sorted
            workingArray[restoreIndex] -= offset; // @step:mark-sorted
        }

        return workingArray; // @step:complete
    }
}
