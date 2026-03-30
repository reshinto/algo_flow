// Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
import java.util.HashSet;
import java.util.Set;

public class HappyNumber {
    private static int digitSquareSum(int num) {
        int total = 0; // @step:initialize
        while (num > 0) {
            int digit = num % 10;
            total += digit * digit;
            num /= 10;
        }
        return total;
    }

    public static boolean happyNumber(int startNumber) {
        Set<Integer> seen = new HashSet<>(); // @step:initialize
        int current = startNumber;
        while (current != 1) {
            seen.add(current); // @step:insert-key
            current = digitSquareSum(current); // @step:process-element
            if (seen.contains(current)) { // @step:check-duplicate
                return false; // @step:key-found
            }
        }
        return true; // @step:complete
    }
}
