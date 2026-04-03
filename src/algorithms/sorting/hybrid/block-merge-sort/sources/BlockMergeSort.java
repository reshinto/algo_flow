import java.util.ArrayList;
import java.util.List;

public class BlockMergeSort {
    public static int[] blockMergeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        if (arrayLength <= 1) return sortedArray; // @step:initialize

        // Find natural ascending runs in the array
        List<Integer> runBoundaries = new ArrayList<>(); // @step:find-runs
        runBoundaries.add(0); // @step:find-runs
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:compare
            if (sortedArray[scanIndex] < sortedArray[scanIndex - 1]) { // @step:compare
                runBoundaries.add(scanIndex); // @step:find-runs
            }
        }
        runBoundaries.add(arrayLength); // @step:find-runs

        // Merge runs pairwise until one run covers the full array
        while (runBoundaries.size() > 2) { // @step:merge
            List<Integer> nextBoundaries = new ArrayList<>(); // @step:merge
            nextBoundaries.add(0); // @step:merge

            int boundaryIndex = 0;
            while (boundaryIndex + 2 <= runBoundaries.size() - 1) {
                int leftStart = runBoundaries.get(boundaryIndex); // @step:merge
                int rightStart = runBoundaries.get(boundaryIndex + 1); // @step:merge
                int mergeEnd = runBoundaries.get(boundaryIndex + 2); // @step:merge

                // In-place merge using rotation
                int leftPointer = leftStart; // @step:compare
                int rightPointer = rightStart; // @step:compare

                while (leftPointer < rightPointer && rightPointer < mergeEnd) { // @step:compare
                    if (sortedArray[leftPointer] <= sortedArray[rightPointer]) { // @step:compare
                        leftPointer++; // @step:compare
                    } else {
                        // Rotate the element from rightPointer into the correct position
                        int displacedValue = sortedArray[rightPointer]; // @step:rotate
                        for (int shiftIndex = rightPointer; shiftIndex > leftPointer; shiftIndex--) { // @step:swap
                            sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]; // @step:swap
                        }
                        sortedArray[leftPointer] = displacedValue; // @step:swap
                        leftPointer++; // @step:swap
                        rightPointer++; // @step:swap
                    }
                }

                if (boundaryIndex + 3 <= runBoundaries.size() - 1) {
                    nextBoundaries.add(mergeEnd); // @step:merge
                }
                boundaryIndex += 2;
            }

            // If there is an odd run left, carry it over unchanged
            if ((runBoundaries.size() - 1) % 2 == 1) { // @step:merge
                nextBoundaries.add(runBoundaries.get(runBoundaries.size() - 2)); // @step:merge
            }
            nextBoundaries.add(arrayLength); // @step:merge

            runBoundaries = nextBoundaries; // @step:merge

            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
