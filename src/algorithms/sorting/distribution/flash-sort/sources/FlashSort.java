public class FlashSort {
    public static int[] flashSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sortedArray; // @step:complete
        }

        int minValue = sortedArray[0]; // @step:initialize
        int maxIndex = 0; // @step:initialize
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (sortedArray[scanIndex] < minValue) {
                minValue = sortedArray[scanIndex]; // @step:initialize
            }
            if (sortedArray[scanIndex] > sortedArray[maxIndex]) {
                maxIndex = scanIndex; // @step:initialize
            }
        }

        if (sortedArray[maxIndex] == minValue) {
            return sortedArray; // @step:complete
        }

        int classCount = Math.max(1, (int) Math.floor(0.45 * arrayLength)); // @step:initialize
        int[] classVector = new int[classCount]; // @step:initialize
        double scaleFactor = (double)(classCount - 1) / (sortedArray[maxIndex] - minValue); // @step:initialize

        // Classify — count how many elements fall in each class
        for (int classifyIndex = 0; classifyIndex < arrayLength; classifyIndex++) { // @step:classify
            int classIndex = (int) Math.floor(scaleFactor * (sortedArray[classifyIndex] - minValue)); // @step:classify
            classVector[classIndex]++; // @step:classify
        }

        // Compute prefix sums (class upper boundaries)
        for (int prefixIndex = 1; prefixIndex < classCount; prefixIndex++) { // @step:classify
            classVector[prefixIndex] += classVector[prefixIndex - 1]; // @step:classify
        }

        // Swap maximum element to front temporarily
        int temporaryMax = sortedArray[0]; // @step:swap
        sortedArray[0] = sortedArray[maxIndex]; // @step:swap
        sortedArray[maxIndex] = temporaryMax; // @step:swap

        int cycleIndex = 0; // @step:swap
        int permutationsDone = 0; // @step:swap

        while (permutationsDone < arrayLength - 1) { // @step:swap
            while (cycleIndex >= classVector[(int) Math.floor(scaleFactor * (sortedArray[cycleIndex] - minValue))]) { // @step:compare
                cycleIndex++; // @step:compare
            }
            int holdValue = sortedArray[cycleIndex]; // @step:swap
            int targetClass = (int) Math.floor(scaleFactor * (holdValue - minValue)); // @step:swap

            while (cycleIndex != classVector[targetClass] - 1) { // @step:swap
                targetClass = (int) Math.floor(scaleFactor * (holdValue - minValue)); // @step:swap
                int targetPosition = classVector[targetClass] - 1; // @step:swap
                int flashTemp = sortedArray[targetPosition]; // @step:swap
                sortedArray[targetPosition] = holdValue; // @step:swap
                holdValue = flashTemp; // @step:swap
                classVector[targetClass]--; // @step:swap
                permutationsDone++; // @step:swap
            }
            // Place the final held value at cycleIndex to complete this cycle
            sortedArray[cycleIndex] = holdValue; // @step:swap
            permutationsDone++; // @step:swap
        }

        // Insertion sort pass to clean up small disorder within classes
        for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) { // @step:insertion-pass
            int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
            int insertPosition = outerIndex - 1; // @step:insertion-pass

            while (insertPosition >= 0 && sortedArray[insertPosition] > currentValue) { // @step:compare
                sortedArray[insertPosition + 1] = sortedArray[insertPosition]; // @step:swap
                insertPosition--; // @step:swap
            }
            sortedArray[insertPosition + 1] = currentValue; // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
