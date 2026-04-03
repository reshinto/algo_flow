public class ProxmapSort {
    public static int[] proxmapSort(int[] inputArray) { // @step:initialize
        int[] sourceArray = inputArray.clone(); // @step:initialize
        int arrayLength = sourceArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sourceArray; // @step:complete
        }

        int minValue = sourceArray[0]; // @step:initialize
        int maxValue = sourceArray[0]; // @step:initialize
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (sourceArray[scanIndex] < minValue) minValue = sourceArray[scanIndex]; // @step:initialize
            if (sourceArray[scanIndex] > maxValue) maxValue = sourceArray[scanIndex]; // @step:initialize
        }

        if (minValue == maxValue) {
            return sourceArray; // @step:complete
        }

        double valueRange = maxValue - minValue; // @step:initialize
        double scaleFactor = (arrayLength - 1) / valueRange; // @step:initialize

        // Build proxmap — count how many elements map to each position
        int[] hitCount = new int[arrayLength]; // @step:map-position
        for (int mapIndex = 0; mapIndex < arrayLength; mapIndex++) { // @step:map-position
            int mappedPosition = (int) (scaleFactor * (sourceArray[mapIndex] - minValue)); // @step:map-position
            hitCount[mappedPosition]++; // @step:map-position
        }

        // Compute starting positions for each cluster (prefix sums)
        int[] startPosition = new int[arrayLength]; // @step:map-position
        int runningTotal = 0; // @step:map-position
        for (int posIndex = 0; posIndex < arrayLength; posIndex++) { // @step:map-position
            startPosition[posIndex] = runningTotal; // @step:map-position
            runningTotal += hitCount[posIndex]; // @step:map-position
        }

        // Insert each element into the output array near its mapped position
        int[] outputArray = new int[arrayLength]; // @step:compare
        int[] nextSlot = startPosition.clone(); // @step:compare

        for (int insertIndex = 0; insertIndex < arrayLength; insertIndex++) { // @step:compare
            int currentValue = sourceArray[insertIndex]; // @step:compare
            int mappedPosition = (int) (scaleFactor * (currentValue - minValue)); // @step:compare
            int slotIndex = nextSlot[mappedPosition]; // @step:compare

            // Insertion sort within the cluster to maintain order
            while (slotIndex > startPosition[mappedPosition] && outputArray[slotIndex - 1] > currentValue) { // @step:compare
                outputArray[slotIndex] = outputArray[slotIndex - 1]; // @step:swap
                slotIndex--; // @step:swap
            }
            outputArray[slotIndex] = currentValue; // @step:swap
            nextSlot[mappedPosition]++; // @step:swap
        }

        // Copy sorted output back to source array
        for (int copyIndex = 0; copyIndex < arrayLength; copyIndex++) { // @step:mark-sorted
            sourceArray[copyIndex] = outputArray[copyIndex]; // @step:mark-sorted
        }

        return sourceArray; // @step:complete
    }
}
