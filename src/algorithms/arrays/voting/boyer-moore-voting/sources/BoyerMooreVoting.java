// Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
public class BoyerMooreVoting {
    public static int[] boyerMooreVoting(int[] inputArray) {
        if (inputArray.length == 0) { // @step:initialize
            return new int[]{-1, 0}; // @step:initialize
        }

        int candidate = inputArray[0]; // @step:initialize
        int voteCount = 0; // @step:initialize

        // Phase 1: Find candidate using cancellation
        for (int elementIndex = 0; elementIndex < inputArray.length; elementIndex++) {
            int currentElement = inputArray[elementIndex]; // @step:visit

            if (voteCount == 0) { // @step:compare
                candidate = currentElement; // @step:compare
                voteCount = 1; // @step:compare
            } else if (currentElement == candidate) {
                voteCount++; // @step:visit
            } else {
                voteCount--; // @step:visit
            }
        }

        return new int[]{candidate, voteCount}; // @step:complete
    }
}
