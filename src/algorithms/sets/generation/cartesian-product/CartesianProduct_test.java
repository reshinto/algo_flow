import java.util.Arrays;
import java.util.List;

public class CartesianProduct_test {

    public static void main(String[] args) {
        // default input
        List<List<Integer>> result1 = CartesianProduct.cartesianProduct(
            new int[]{1, 2, 3}, new int[]{4, 5});
        assert result1.size() == 6 : "Expected 6 pairs";
        assert result1.get(0).equals(Arrays.asList(1, 4));
        assert result1.get(5).equals(Arrays.asList(3, 5));

        // single element sets
        List<List<Integer>> result2 = CartesianProduct.cartesianProduct(
            new int[]{7}, new int[]{9});
        assert result2.size() == 1;
        assert result2.get(0).equals(Arrays.asList(7, 9));

        // n x m pairs
        List<List<Integer>> result3 = CartesianProduct.cartesianProduct(
            new int[]{1, 2}, new int[]{3, 4});
        assert result3.size() == 4 : "Expected 4 pairs";

        // empty set A
        List<List<Integer>> result4 = CartesianProduct.cartesianProduct(
            new int[]{}, new int[]{4, 5});
        assert result4.isEmpty() : "Expected empty result for empty set A";

        // empty set B
        List<List<Integer>> result5 = CartesianProduct.cartesianProduct(
            new int[]{1, 2, 3}, new int[]{});
        assert result5.isEmpty() : "Expected empty result for empty set B";

        // preserves order
        List<List<Integer>> result6 = CartesianProduct.cartesianProduct(
            new int[]{10, 20}, new int[]{1, 2});
        assert result6.get(0).equals(Arrays.asList(10, 1));
        assert result6.get(1).equals(Arrays.asList(10, 2));
        assert result6.get(2).equals(Arrays.asList(20, 1));
        assert result6.get(3).equals(Arrays.asList(20, 2));

        // ordered tuple pairs
        List<List<Integer>> result7 = CartesianProduct.cartesianProduct(
            new int[]{5}, new int[]{3, 7});
        assert result7.equals(Arrays.asList(Arrays.asList(5, 3), Arrays.asList(5, 7)));

        System.out.println("All tests passed!");
    }
}
