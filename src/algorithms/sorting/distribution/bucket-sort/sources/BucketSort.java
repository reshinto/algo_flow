import java.util.ArrayList;
import java.util.List;

public class BucketSort {
    public static int[] bucketSort(int[] inputArray) { // @step:initialize
        if (inputArray.length == 0) return new int[0]; // @step:initialize
        int[] workingArray = inputArray.clone(); // @step:initialize
        int arrayLength = workingArray.length; // @step:initialize

        int minValue = workingArray[0]; // @step:initialize
        int maxValue = workingArray[0]; // @step:initialize
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (workingArray[scanIndex] < minValue) minValue = workingArray[scanIndex]; // @step:initialize
            if (workingArray[scanIndex] > maxValue) maxValue = workingArray[scanIndex]; // @step:initialize
        }
        int bucketCount = Math.max(1, arrayLength); // @step:initialize
        int valueRange = maxValue - minValue + 1; // @step:initialize

        // Create empty buckets
        List<List<Integer>> buckets = new ArrayList<>(); // @step:initialize
        for (int bucketInit = 0; bucketInit < bucketCount; bucketInit++) { // @step:initialize
            buckets.add(new ArrayList<>()); // @step:initialize
        }

        // Distribute elements into buckets based on their normalized position
        for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) { // @step:distribute
            int normalizedPosition = workingArray[distributeIndex] - minValue; // @step:distribute
            int bucketIndex = Math.min(
                (int) ((double) normalizedPosition / valueRange * bucketCount),
                bucketCount - 1
            ); // @step:distribute
            buckets.get(bucketIndex).add(workingArray[distributeIndex]); // @step:distribute
        }

        // Sort each bucket using insertion sort
        for (int bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) { // @step:compare
            List<Integer> bucket = buckets.get(bucketIndex); // @step:compare
            for (int outerIndex = 1; outerIndex < bucket.size(); outerIndex++) { // @step:compare
                int currentValue = bucket.get(outerIndex); // @step:compare
                int insertPosition = outerIndex - 1; // @step:compare
                while (insertPosition >= 0 && bucket.get(insertPosition) > currentValue) { // @step:swap
                    bucket.set(insertPosition + 1, bucket.get(insertPosition)); // @step:swap
                    insertPosition--; // @step:swap
                }
                bucket.set(insertPosition + 1, currentValue); // @step:swap
            }
        }

        // Collect all elements from sorted buckets
        int writeIndex = 0; // @step:collect
        for (int bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) { // @step:collect
            for (int bucketValue : buckets.get(bucketIndex)) { // @step:collect
                workingArray[writeIndex] = bucketValue; // @step:collect
                writeIndex++; // @step:collect
            }
        }

        // @step:mark-sorted
        return workingArray; // @step:complete
    }
}
