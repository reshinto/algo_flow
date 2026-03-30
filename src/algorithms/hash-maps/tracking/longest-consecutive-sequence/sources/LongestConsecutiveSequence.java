// Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
import java.util.HashSet;
import java.util.Set;

public class LongestConsecutiveSequence {
    public static int longestConsecutiveSequence(int[] numbers) {
        Set<Integer> numSet = new HashSet<>(); // @step:initialize
        for (int buildIdx = 0; buildIdx < numbers.length; buildIdx++) {
            numSet.add(numbers[buildIdx]); // @step:insert-key
        }
        int maxLength = 0;
        for (int scanIdx = 0; scanIdx < numbers.length; scanIdx++) {
            int currentNumber = numbers[scanIdx];
            if (!numSet.contains(currentNumber - 1)) { // @step:lookup-key
                // This number is a sequence start — count forward
                int sequenceLength = 1;
                int nextNumber = currentNumber + 1;
                while (numSet.contains(nextNumber)) { // @step:key-found
                    sequenceLength++;
                    nextNumber++;
                }
                maxLength = Math.max(maxLength, sequenceLength); // @step:key-not-found
            }
        }
        return maxLength; // @step:complete
    }
}
