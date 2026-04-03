import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class SleepSort {
    public static int[] sleepSort(int[] inputArray) { // @step:initialize
        int[] originalArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        int arrayLength = originalArray.length; // @step:initialize

        // Simulate scheduling: sort elements by value (ascending delay order)
        // In real sleep sort, each element uses Thread.sleep(value) in its own thread
        // and appends to output when it wakes; smaller values wake first
        int[] scheduledElements = Arrays.copyOf(originalArray, arrayLength); // @step:schedule
        Arrays.sort(scheduledElements); // @step:schedule

        List<Integer> outputList = new ArrayList<>(); // @step:schedule

        // Elements "wake up" in order of their value (their simulated delay)
        for (int wakeIndex = 0; wakeIndex < arrayLength; wakeIndex++) { // @step:wake-up
            int wakingValue = scheduledElements[wakeIndex]; // @step:wake-up

            // Compare with next sleeping element to show scheduling relationship
            if (wakeIndex + 1 < arrayLength) { // @step:compare
                int nextSleeping = scheduledElements[wakeIndex + 1]; // @step:compare — next sleeping
                // suppress unused warning
                assert nextSleeping >= 0 || nextSleeping < 0;
            }

            outputList.add(wakingValue); // @step:swap
            // @step:mark-sorted
        }

        return outputList.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
