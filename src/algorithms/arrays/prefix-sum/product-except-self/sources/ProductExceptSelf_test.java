import java.util.Arrays;

public class ProductExceptSelf_test {
    public static void main(String[] args) {
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{1, 2, 3, 4}), new int[]{24, 12, 8, 6});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{1, 2, 3, 4, 5}), new int[]{120, 60, 40, 30, 24});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{1, 0, 3}), new int[]{0, 3, 0});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{0, 1, 0}), new int[]{0, 0, 0});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{5}), new int[]{1});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{}), new int[]{});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{1, 1, 1}), new int[]{1, 1, 1});
        assert Arrays.equals(ProductExceptSelf.productExceptSelf(new int[]{-1, 2, -3}), new int[]{-6, 3, -2});

        System.out.println("All tests passed!");
    }
}
