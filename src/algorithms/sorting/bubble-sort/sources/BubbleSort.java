public class BubbleSort {
    public static int[] bubbleSort(int[] inputArray) {
        int[] sortedArray = inputArray.clone();
        int arrayLength = sortedArray.length;

        for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
            boolean swappedThisPass = false;

            for (int innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
                if (sortedArray[innerIndex] > sortedArray[innerIndex + 1]) {
                    int temporaryValue = sortedArray[innerIndex];
                    sortedArray[innerIndex] = sortedArray[innerIndex + 1];
                    sortedArray[innerIndex + 1] = temporaryValue;
                    swappedThisPass = true;
                }
            }

            if (!swappedThisPass) break;
        }

        return sortedArray;
    }
}
