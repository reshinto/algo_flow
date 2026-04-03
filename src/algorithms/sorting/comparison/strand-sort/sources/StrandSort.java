import java.util.ArrayList;
import java.util.List;

public class StrandSort {
    public static int[] strandSort(int[] inputArray) { // @step:initialize
        List<Integer> remainingList = new ArrayList<>(); // @step:initialize
        for (int value : inputArray) remainingList.add(value); // @step:initialize

        int arrayLength = remainingList.size(); // @step:initialize
        if (arrayLength <= 1) return inputArray.clone(); // @step:initialize

        List<Integer> outputList = new ArrayList<>(); // @step:initialize

        while (!remainingList.isEmpty()) {
            // Extract a strand: pick elements forming an ascending sequence
            List<Integer> strand = new ArrayList<>(); // @step:extract-strand
            List<Integer> leftover = new ArrayList<>(); // @step:extract-strand
            strand.add(remainingList.get(0)); // @step:extract-strand

            for (int scanIndex = 1; scanIndex < remainingList.size(); scanIndex++) { // @step:compare
                int currentValue = remainingList.get(scanIndex);
                if (currentValue >= strand.get(strand.size() - 1)) { // @step:compare
                    strand.add(currentValue); // @step:extract-strand
                } else {
                    leftover.add(currentValue); // @step:extract-strand
                }
            }

            outputList = mergeTwoSortedLists(outputList, strand); // @step:merge-strand
            remainingList = leftover; // @step:extract-strand
        }

        // @step:mark-sorted

        int[] resultArray = new int[outputList.size()]; // @step:complete
        for (int resultIndex = 0; resultIndex < outputList.size(); resultIndex++) {
            resultArray[resultIndex] = outputList.get(resultIndex);
        }
        return resultArray; // @step:complete
    }

    private static List<Integer> mergeTwoSortedLists(List<Integer> leftList, List<Integer> rightList) {
        List<Integer> merged = new ArrayList<>();
        int leftPointer = 0;
        int rightPointer = 0;

        while (leftPointer < leftList.size() && rightPointer < rightList.size()) {
            if (leftList.get(leftPointer) <= rightList.get(rightPointer)) {
                merged.add(leftList.get(leftPointer++));
            } else {
                merged.add(rightList.get(rightPointer++));
            }
        }

        while (leftPointer < leftList.size()) merged.add(leftList.get(leftPointer++));
        while (rightPointer < rightList.size()) merged.add(rightList.get(rightPointer++));

        return merged;
    }
}
