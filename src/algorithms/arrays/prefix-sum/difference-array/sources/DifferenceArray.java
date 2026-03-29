// Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
public class DifferenceArray {
    public static int[] differenceArray(int arrayLength, int[][] updates) {
        int[] diffArray = new int[arrayLength + 1]; // @step:initialize
        int[] result = new int[arrayLength]; // @step:initialize

        // Apply each range update [left, right, delta] to the difference array
        for (int updateIndex = 0; updateIndex < updates.length; updateIndex++) {
            int leftBound = updates[updateIndex][0]; // @step:visit
            int rightBound = updates[updateIndex][1]; // @step:visit
            int delta = updates[updateIndex][2]; // @step:visit
            diffArray[leftBound] += delta; // @step:compare
            if (rightBound + 1 < diffArray.length) { // @step:compare
                diffArray[rightBound + 1] -= delta; // @step:compare
            }
        }

        // Reconstruct result via prefix sum of the difference array
        int runningSum = 0; // @step:visit
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
            runningSum += diffArray[scanIndex]; // @step:visit
            result[scanIndex] = runningSum; // @step:visit
        }

        return result; // @step:complete
    }
}
