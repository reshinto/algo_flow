// javac *.java && java -ea RedBlackInsert_test
import java.util.Arrays;
import java.util.List;

public class RedBlackInsert_test {
    public static void main(String[] args) {
        RedBlackInsert rbi = new RedBlackInsert();

        // test: single value
        assert rbi.redBlackInsert(new int[]{5}).equals(Arrays.asList(5)) : "Single value failed";

        // test: sorted inorder for default input
        int[] values = {7, 3, 18, 10, 22, 8, 11, 26};
        List<Integer> result = rbi.redBlackInsert(values);
        assert result.equals(Arrays.asList(3, 7, 8, 10, 11, 18, 22, 26)) : "Default input failed: " + result;

        // test: ascending insert
        assert rbi.redBlackInsert(new int[]{1, 2, 3, 4, 5}).equals(Arrays.asList(1, 2, 3, 4, 5)) : "Ascending failed";

        // test: descending insert
        assert rbi.redBlackInsert(new int[]{5, 4, 3, 2, 1}).equals(Arrays.asList(1, 2, 3, 4, 5)) : "Descending failed";

        // test: empty input
        assert rbi.redBlackInsert(new int[]{}).isEmpty() : "Empty input failed";

        // test: duplicates
        List<Integer> dupResult = rbi.redBlackInsert(new int[]{5, 3, 5});
        assert dupResult.size() > 0 : "Duplicates failed";

        System.out.println("All tests passed!");
    }
}
