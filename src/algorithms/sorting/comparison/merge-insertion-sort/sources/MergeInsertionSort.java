public class MergeInsertionSort {
    public static int[] mergeInsertionSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) return sortedArray; // @step:initialize

        int pairCount = arrayLength / 2; // @step:initialize
        boolean hasUnpaired = (arrayLength % 2) == 1; // @step:initialize

        // Step 1: Compare pairs; ensure larger element comes first in each pair
        for (int pairIndex = 0; pairIndex < pairCount; pairIndex++) { // @step:pair
            int leftPos = pairIndex * 2; // @step:compare
            int rightPos = leftPos + 1; // @step:compare

            if (sortedArray[leftPos] < sortedArray[rightPos]) { // @step:compare
                int temporaryValue = sortedArray[leftPos]; // @step:swap
                sortedArray[leftPos] = sortedArray[rightPos]; // @step:swap
                sortedArray[rightPos] = temporaryValue; // @step:swap
            }
        }

        // Step 2: Extract larger and smaller elements
        int[] largerElements = new int[pairCount]; // @step:pair
        int smallerCount = pairCount + (hasUnpaired ? 1 : 0);
        int[] smallerElements = new int[smallerCount]; // @step:pair

        for (int pairIndex = 0; pairIndex < pairCount; pairIndex++) { // @step:pair
            largerElements[pairIndex] = sortedArray[pairIndex * 2];
            smallerElements[pairIndex] = sortedArray[pairIndex * 2 + 1];
        }
        if (hasUnpaired) { // @step:pair
            smallerElements[pairCount] = sortedArray[arrayLength - 1];
        }

        // Step 3: Insertion sort the larger elements
        for (int insertIndex = 1; insertIndex < pairCount; insertIndex++) { // @step:compare
            int currentValue = largerElements[insertIndex]; // @step:compare
            int innerIndex = insertIndex - 1;

            while (innerIndex >= 0 && largerElements[innerIndex] > currentValue) { // @step:compare
                largerElements[innerIndex + 1] = largerElements[innerIndex]; // @step:swap
                innerIndex--;
            }
            largerElements[innerIndex + 1] = currentValue; // @step:binary-insert
        }

        // Step 4: Place sorted larger elements into result array
        for (int resultIndex = 0; resultIndex < pairCount; resultIndex++) {
            sortedArray[resultIndex] = largerElements[resultIndex]; // @step:binary-insert
        }

        int insertedCount = pairCount;

        // Step 5: Binary-insert each smaller element into the sorted result
        for (int smallerIndex = 0; smallerIndex < smallerCount; smallerIndex++) { // @step:binary-insert
            int valueToInsert = smallerElements[smallerIndex]; // @step:binary-insert

            // Binary search for insertion position
            int low = 0;
            int high = insertedCount;
            while (low < high) { // @step:binary-insert
                int midPoint = (low + high) / 2; // @step:binary-insert
                if (sortedArray[midPoint] < valueToInsert) { // @step:compare
                    low = midPoint + 1;
                } else {
                    high = midPoint;
                }
            }

            // Shift elements right to make room
            for (int shiftIndex = insertedCount; shiftIndex > low; shiftIndex--) { // @step:swap
                sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]; // @step:swap
            }
            sortedArray[low] = valueToInsert; // @step:binary-insert
            insertedCount++;
        }

        // @step:mark-sorted

        return sortedArray; // @step:complete
    }
}
