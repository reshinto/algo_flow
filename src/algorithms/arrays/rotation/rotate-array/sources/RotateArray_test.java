import java.util.Arrays;

public class RotateArray_test {
    public static void main(String[] args) {
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3, 4, 5, 6, 7}, 3), new int[]{5, 6, 7, 1, 2, 3, 4});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3, 4, 5}, 0), new int[]{1, 2, 3, 4, 5});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3, 4, 5}, 5), new int[]{1, 2, 3, 4, 5});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{42}, 1), new int[]{42});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{}, 3), new int[]{});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2}, 1), new int[]{2, 1});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3, 4, 5}, 4), new int[]{2, 3, 4, 5, 1});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3}, 6), new int[]{1, 2, 3});
        assert Arrays.equals(RotateArray.rotateArray(new int[]{1, 2, 3, 4, 5}, 1), new int[]{5, 1, 2, 3, 4});

        System.out.println("All tests passed!");
    }
}
