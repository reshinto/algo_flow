// Missing Number — find the missing number in range [0, n] using a hash set
import java.util.HashSet;

public class MissingNumber {
    public static int missingNumber(int[] numbers) {
        HashSet<Integer> numberSet = new HashSet<>(); // @step:initialize
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            numberSet.add(numbers[elementIndex]); // @step:insert-key
        }
        for (int checkValue = 0; checkValue <= numbers.length; checkValue++) {
            if (!numberSet.contains(checkValue)) { // @step:lookup-key
                return checkValue; // @step:key-not-found
            }
        }
        return -1; // @step:complete
    }
}
