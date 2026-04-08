import java.util.Arrays;

public class FirstNegativeInWindow_test {
    public static void main(String[] args) {
        assert Arrays.equals(
            FirstNegativeInWindow.firstNegativeInWindow(new int[]{12, -1, -7, 8, -15, 30, 16, 28}, 3),
            new int[]{-1, -1, -7, -15, -15, 0});

        assert Arrays.equals(
            FirstNegativeInWindow.firstNegativeInWindow(new int[]{1, 2, 3, 4, 5}, 3),
            new int[]{0, 0, 0});

        assert Arrays.equals(
            FirstNegativeInWindow.firstNegativeInWindow(new int[]{-3, -5, -2, -8}, 2),
            new int[]{-3, -5, -2});

        assert Arrays.equals(
            FirstNegativeInWindow.firstNegativeInWindow(new int[]{4, -2, 3, -1}, 1),
            new int[]{0, -2, 0, -1});

        assert Arrays.equals(
            FirstNegativeInWindow.firstNegativeInWindow(new int[]{1, 2, -3, 4}, 4),
            new int[]{-3});

        assert FirstNegativeInWindow.firstNegativeInWindow(new int[]{}, 3).length == 0;
        assert FirstNegativeInWindow.firstNegativeInWindow(new int[]{1, 2}, 5).length == 0;
        assert FirstNegativeInWindow.firstNegativeInWindow(new int[]{1, -2, 3}, 0).length == 0;

        System.out.println("All tests passed!");
    }
}
