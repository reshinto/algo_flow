// Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ThreeSum {
    public static List<List<Integer>> threeSum(int[] inputArray) {
        int[] sortedArray = inputArray.clone(); // @step:initialize
        Arrays.sort(sortedArray); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        List<List<Integer>> triplets = new ArrayList<>(); // @step:initialize

        for (int anchorIndex = 0; anchorIndex < arrayLength - 2; anchorIndex++) { // @step:visit
            // Skip duplicate anchor values to avoid duplicate triplets
            if (anchorIndex > 0 && sortedArray[anchorIndex] == sortedArray[anchorIndex - 1]) { // @step:compare
                continue; // @step:compare
            }

            int leftPointer = anchorIndex + 1; // @step:visit
            int rightPointer = arrayLength - 1; // @step:visit

            while (leftPointer < rightPointer) { // @step:compare
                int currentSum = sortedArray[anchorIndex] + sortedArray[leftPointer] + sortedArray[rightPointer]; // @step:compare

                if (currentSum == 0) { // @step:compare
                    triplets.add(Arrays.asList(sortedArray[anchorIndex], sortedArray[leftPointer], sortedArray[rightPointer])); // @step:visit

                    // Advance both pointers and skip duplicates
                    while (leftPointer < rightPointer && sortedArray[leftPointer] == sortedArray[leftPointer + 1]) {
                        leftPointer++; // @step:compare
                    }
                    while (leftPointer < rightPointer && sortedArray[rightPointer] == sortedArray[rightPointer - 1]) {
                        rightPointer--; // @step:compare
                    }
                    leftPointer++; // @step:visit
                    rightPointer--; // @step:visit
                } else if (currentSum < 0) {
                    leftPointer++; // @step:visit
                } else {
                    rightPointer--; // @step:visit
                }
            }
        }

        return triplets; // @step:complete
    }
}
