import java.util.ArrayList;
import java.util.List;

public class UniformBinarySearch {
    public static int uniformBinarySearch(int[] sortedArray, int targetValue) { // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        if (arrayLength == 0) return -1; // @step:initialize

        // Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
        List<Integer> deltaTable = new ArrayList<>(); // @step:initialize
        int deltaValue = (int) Math.ceil(arrayLength / 2.0); // @step:initialize
        deltaTable.add(deltaValue); // @step:initialize
        while (deltaValue > 1) { // @step:initialize
            deltaValue = (int) Math.ceil(deltaValue / 2.0); // @step:initialize
            deltaTable.add(deltaValue); // @step:initialize
        }
        // Ensure enough steps to reach any element
        if (deltaTable.size() < (int) Math.ceil(Math.log(arrayLength) / Math.log(2)) + 1) { // @step:initialize
            deltaTable.add(1); // @step:initialize
        }

        int currentIndex = deltaTable.get(0) - 1; // @step:initialize
        int stepLevel = 0; // @step:initialize

        while (true) { // @step:compare
            int currentValue = sortedArray[currentIndex]; // @step:compare

            if (currentValue == targetValue) { // @step:compare,found
                return currentIndex; // @step:found
            }

            stepLevel++; // @step:eliminate
            if (stepLevel >= deltaTable.size()) break; // @step:eliminate

            int nextDelta = deltaTable.get(stepLevel); // @step:eliminate

            int previousIndex = currentIndex; // @step:eliminate
            if (currentValue < targetValue) { // @step:eliminate
                // Move right
                currentIndex += nextDelta; // @step:eliminate
                if (currentIndex >= arrayLength) currentIndex = arrayLength - 1; // @step:eliminate
            } else { // @step:eliminate
                // Move left
                currentIndex -= nextDelta; // @step:eliminate
                if (currentIndex < 0) currentIndex = 0; // @step:eliminate
            }
            if (currentIndex == previousIndex) break; // @step:eliminate
        }

        return -1; // @step:complete
    }
}
