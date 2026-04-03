public class CircleSort {
    public static int[] circleSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        // Repeat full passes until no swaps occur
        boolean swapped = true;
        while (swapped) {
            swapped = circleSortPass(sortedArray, 0, arrayLength - 1);
        }

        return sortedArray; // @step:complete
    }

    private static boolean circleSortPass(int[] sortedArray, int leftIndex, int rightIndex) {
        if (leftIndex >= rightIndex) {
            return false;
        }

        boolean swapped = false;
        int low = leftIndex;
        int high = rightIndex;

        while (low < high) {
            // @step:compare
            if (sortedArray[low] > sortedArray[high]) { // @step:compare
                // @step:swap
                int temporaryValue = sortedArray[low]; // @step:swap
                sortedArray[low] = sortedArray[high]; // @step:swap
                sortedArray[high] = temporaryValue; // @step:swap
                swapped = true;
            }
            low++;
            high--;
        }

        // If the midpoint element is reached (odd-length segment), compare with one above
        if (low == high) {
            if (sortedArray[low] > sortedArray[high + 1]) { // @step:compare
                // @step:swap
                int temporaryValue = sortedArray[low]; // @step:swap
                sortedArray[low] = sortedArray[high + 1]; // @step:swap
                sortedArray[high + 1] = temporaryValue; // @step:swap
                swapped = true;
            }
        }

        int midpoint = (leftIndex + rightIndex) / 2;
        boolean leftSwapped = circleSortPass(sortedArray, leftIndex, midpoint);
        boolean rightSwapped = circleSortPass(sortedArray, midpoint + 1, rightIndex);

        return swapped || leftSwapped || rightSwapped;
    }
}
