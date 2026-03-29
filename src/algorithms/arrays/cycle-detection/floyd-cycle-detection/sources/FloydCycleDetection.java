// Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
public class FloydCycleDetection {
    public static int[] floydCycleDetection(int[] inputArray) {
        // Returns [hasCycle (1=true/0=false), cycleStart]
        if (inputArray.length == 0) { // @step:initialize
            return new int[]{0, -1}; // @step:initialize
        }

        int tortoise = 0; // @step:initialize
        int hare = 0; // @step:initialize

        // Phase 1: detect meeting point inside the cycle
        do { // @step:visit
            tortoise = inputArray[tortoise]; // @step:visit
            hare = inputArray[inputArray[hare]]; // @step:visit
        } while (tortoise != hare); // @step:compare

        // Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
        tortoise = 0; // @step:visit
        while (tortoise != hare) { // @step:compare
            tortoise = inputArray[tortoise]; // @step:visit
            hare = inputArray[hare]; // @step:visit
        }

        return new int[]{1, tortoise}; // @step:complete
    }
}
