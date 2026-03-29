// Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
import java.util.ArrayDeque;
import java.util.Deque;

public class DailyTemperatures {
    public static int[] dailyTemperatures(int[] temperatures) {
        int arrayLength = temperatures.length;
        int[] waitDays = new int[arrayLength]; // @step:initialize
        Deque<Integer> pendingStack = new ArrayDeque<>(); // @step:initialize

        for (int dayIndex = 0; dayIndex < arrayLength; dayIndex++) { // @step:visit
            int todayTemp = temperatures[dayIndex]; // @step:visit

            while (!pendingStack.isEmpty() && temperatures[pendingStack.peek()] < todayTemp) { // @step:compare
                int poppedIndex = pendingStack.pop(); // @step:compare
                waitDays[poppedIndex] = dayIndex - poppedIndex; // @step:compare
            }

            pendingStack.push(dayIndex); // @step:visit
        }

        return waitDays; // @step:complete
    }
}
