import java.util.ArrayList;
import java.util.List;

public class BlockSort {
    public static int[] blockSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) return sortedArray; // @step:initialize

        // Find natural sorted runs
        List<int[]> runs = new ArrayList<>(); // each entry: [startIndex, endIndex]
        int runStart = 0;

        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:find-runs
            if (sortedArray[scanIndex] < sortedArray[scanIndex - 1]) { // @step:compare
                runs.add(new int[]{runStart, scanIndex - 1}); // @step:find-runs
                runStart = scanIndex;
            }
        }
        runs.add(new int[]{runStart, arrayLength - 1}); // @step:find-runs

        // Merge adjacent runs until one run remains
        while (runs.size() > 1) { // @step:merge
            List<int[]> mergedRuns = new ArrayList<>();

            for (int runIndex = 0; runIndex < runs.size(); runIndex += 2) {
                if (runIndex + 1 < runs.size()) {
                    int[] leftRun = runs.get(runIndex);
                    int[] rightRun = runs.get(runIndex + 1);
                    mergeInPlace(sortedArray, leftRun[0], rightRun[0], rightRun[1]); // @step:merge
                    mergedRuns.add(new int[]{leftRun[0], rightRun[1]});
                } else {
                    mergedRuns.add(runs.get(runIndex));
                }
            }

            runs = mergedRuns;
        }

        // @step:mark-sorted

        return sortedArray; // @step:complete
    }

    private static void reverseSegment(int[] sortedArray, int startIndex, int endIndex) { // @step:rotate
        int low = startIndex;
        int high = endIndex;
        while (low < high) { // @step:swap
            int temporaryValue = sortedArray[low]; // @step:swap
            sortedArray[low] = sortedArray[high]; // @step:swap
            sortedArray[high] = temporaryValue; // @step:swap
            low++;
            high--;
        }
    }

    private static void rotateLeft(int[] sortedArray, int leftStart, int midPoint, int rightEnd) { // @step:rotate
        reverseSegment(sortedArray, leftStart, midPoint - 1);
        reverseSegment(sortedArray, midPoint, rightEnd);
        reverseSegment(sortedArray, leftStart, rightEnd);
    }

    private static void mergeInPlace(int[] sortedArray, int runStart, int runMid, int runEnd) { // @step:merge
        if (runStart >= runMid || runMid > runEnd) return; // @step:merge

        int leftPointer = runStart;
        int rightPointer = runMid;

        while (leftPointer < rightPointer && rightPointer <= runEnd) {
            if (sortedArray[leftPointer] <= sortedArray[rightPointer]) { // @step:compare
                leftPointer++;
            } else {
                int insertionPoint = rightPointer;
                while (insertionPoint <= runEnd && sortedArray[insertionPoint] < sortedArray[leftPointer]) { // @step:compare
                    insertionPoint++;
                }

                int rightSegmentLength = insertionPoint - rightPointer;
                rotateLeft(sortedArray, leftPointer, rightPointer, insertionPoint - 1); // @step:rotate

                leftPointer += rightSegmentLength;
                rightPointer = insertionPoint;
            }
        }
    }
}
