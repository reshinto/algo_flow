// javac *.java && java -ea AVLInsertRotation_test
import java.util.List;
import java.util.Arrays;

public class AVLInsertRotation_test {
    public static void main(String[] args) {
        AVLInsertRotation avl = new AVLInsertRotation();

        // test: inserts single value
        List<Integer> result1 = avl.avlInsertRotation(new int[]{5});
        assert result1.equals(Arrays.asList(5)) : "Single value failed";

        // test: RR rotation (ascending insert)
        List<Integer> result2 = avl.avlInsertRotation(new int[]{1, 2, 3});
        assert result2.equals(Arrays.asList(1, 2, 3)) : "RR rotation failed";

        // test: LL rotation (descending insert)
        List<Integer> result3 = avl.avlInsertRotation(new int[]{3, 2, 1});
        assert result3.equals(Arrays.asList(1, 2, 3)) : "LL rotation failed";

        // test: LR rotation
        List<Integer> result4 = avl.avlInsertRotation(new int[]{3, 1, 2});
        assert result4.equals(Arrays.asList(1, 2, 3)) : "LR rotation failed";

        // test: RL rotation
        List<Integer> result5 = avl.avlInsertRotation(new int[]{1, 3, 2});
        assert result5.equals(Arrays.asList(1, 2, 3)) : "RL rotation failed";

        // test: multiple rotations with 6 values
        List<Integer> result6 = avl.avlInsertRotation(new int[]{10, 20, 30, 25, 28, 27});
        List<Integer> expected6 = Arrays.asList(10, 20, 25, 27, 28, 30);
        assert result6.equals(expected6) : "Multiple rotations failed: " + result6;

        // test: empty input
        List<Integer> result7 = avl.avlInsertRotation(new int[]{});
        assert result7.isEmpty() : "Empty input failed";

        System.out.println("All tests passed!");
    }
}
