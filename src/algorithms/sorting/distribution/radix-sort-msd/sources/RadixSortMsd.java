import java.util.ArrayList;
import java.util.List;

public class RadixSortMsd {
    private static final int BASE = 10;

    public static int[] radixSortMsd(int[] inputArray) { // @step:initialize
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

        // Determine the highest digit position
        int maxDivisor = 1; // @step:initialize
        while (maxDivisor * BASE <= maxValue) { // @step:initialize
            maxDivisor *= BASE; // @step:initialize
        }

        List<Integer> inputList = new ArrayList<>(); // @step:initialize
        for (int value : workingArray) inputList.add(value); // @step:initialize
        List<Integer> sortedList = sortByDigit(inputList, maxDivisor); // @step:extract-digit

        // Restore offset
        for (int restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) { // @step:mark-sorted
            workingArray[restoreIndex] = sortedList.get(restoreIndex) - offset; // @step:mark-sorted
        }

        return workingArray; // @step:complete
    }

    private static List<Integer> sortByDigit(List<Integer> subList, int digitDivisor) { // @step:extract-digit
        if (subList.size() <= 1 || digitDivisor < 1) return subList; // @step:extract-digit

        List<List<Integer>> buckets = new ArrayList<>(); // @step:extract-digit
        for (int bucketInit = 0; bucketInit < BASE; bucketInit++) { // @step:extract-digit
            buckets.add(new ArrayList<>()); // @step:extract-digit
        }

        for (int value : subList) { // @step:extract-digit
            int digit = (value / digitDivisor) % BASE; // @step:extract-digit
            buckets.get(digit).add(value); // @step:extract-digit
        }

        List<Integer> result = new ArrayList<>(); // @step:place
        for (int bucketIndex = 0; bucketIndex < BASE; bucketIndex++) { // @step:place
            List<Integer> sortedBucket = sortByDigit(buckets.get(bucketIndex), digitDivisor / BASE); // @step:place
            result.addAll(sortedBucket); // @step:place
        }

        return result; // @step:place
    }
}
