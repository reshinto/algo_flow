import java.util.Arrays;

public class RotateArrayCyclic_test {
    public static void main(String[] args) {
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4, 5, 6}, 2), new int[]{5, 6, 1, 2, 3, 4});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4, 5}, 1), new int[]{5, 1, 2, 3, 4});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4}, 4), new int[]{1, 2, 3, 4});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4, 5, 6}, 8), new int[]{5, 6, 1, 2, 3, 4});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4}, 0), new int[]{1, 2, 3, 4});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{}, 3), new int[]{});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{42}, 5), new int[]{42});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2}, 1), new int[]{2, 1});
        assert Arrays.equals(RotateArrayCyclic.rotateArrayCyclic(new int[]{1, 2, 3, 4, 5, 6}, 1), new int[]{6, 1, 2, 3, 4, 5});

        System.out.println("All tests passed!");
    }
}
