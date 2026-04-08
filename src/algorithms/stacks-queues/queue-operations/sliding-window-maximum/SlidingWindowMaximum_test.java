// javac SlidingWindowMaximum.java SlidingWindowMaximum_test.java && java -ea SlidingWindowMaximum_test
import java.util.Arrays;

public class SlidingWindowMaximum_test {
    public static void main(String[] args) {
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3), new int[]{3, 3, 5, 5, 6, 7});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{4, 2, 7}, 3), new int[]{7});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{5, 3, 8, 1}, 1), new int[]{5, 3, 8, 1});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{1, 2, 3, 4, 5}, 3), new int[]{3, 4, 5});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{5, 4, 3, 2, 1}, 3), new int[]{5, 4, 3});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{-4, -2, -7, -1}, 2), new int[]{-2, -2, -1});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{42}, 1), new int[]{42});
        assert Arrays.equals(SlidingWindowMaximum.slidingWindowMaxMonotonic(new int[]{3, 3, 3, 3}, 2), new int[]{3, 3, 3});

        System.out.println("All tests passed!");
    }
}
