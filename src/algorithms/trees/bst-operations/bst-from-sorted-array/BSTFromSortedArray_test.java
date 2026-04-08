// javac *.java && java -ea BSTFromSortedArray_test
public class BSTFromSortedArray_test {
    public static void main(String[] args) {
        BSTFromSortedArray bfsa = new BSTFromSortedArray();

        // test: root at mid value
        BSTNode result1 = bfsa.bstFromSortedArray(new int[]{1, 2, 3, 4, 5, 6, 7});
        assert result1.value == 4 : "Root should be 4, got " + result1.value;

        // test: single element
        BSTNode result2 = bfsa.bstFromSortedArray(new int[]{42});
        assert result2.value == 42 : "Single element failed";
        assert result2.left == null : "Single element left should be null";
        assert result2.right == null : "Single element right should be null";

        // test: empty array
        assert bfsa.bstFromSortedArray(new int[]{}) == null : "Empty array should return null";

        // test: two elements
        BSTNode result3 = bfsa.bstFromSortedArray(new int[]{1, 2});
        assert result3.value == 1 : "Two element root failed";
        assert result3.right.value == 2 : "Two element right failed";

        // test: five elements
        BSTNode result4 = bfsa.bstFromSortedArray(new int[]{1, 2, 3, 4, 5});
        assert result4.value == 3 : "Five element root should be 3, got " + result4.value;
        assert result4.left.value == 1 : "Five element left failed";
        assert result4.right.value == 4 : "Five element right failed";

        System.out.println("All tests passed!");
    }
}
