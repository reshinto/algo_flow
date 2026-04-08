// javac MaxFrequencyStack.java MaxFrequencyStack_test.java && java -ea MaxFrequencyStack_test
import java.util.List;
import java.util.Arrays;

public class MaxFrequencyStack_test {
    public static void main(String[] args) {
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{5, 7, 5, 7, 4, 5}).equals(Arrays.asList(5, 7, 5, 4, 7, 5));
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{1, 2, 3}).equals(Arrays.asList(3, 2, 1));
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{9, 9, 9}).equals(Arrays.asList(9, 9, 9));
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{1, 2, 1, 2}).equals(Arrays.asList(2, 1, 2, 1));
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{42}).equals(Arrays.asList(42));
        assert MaxFrequencyStack.maxFrequencyStack(new int[]{}).equals(List.of());

        List<Integer> result = MaxFrequencyStack.maxFrequencyStack(new int[]{7, 1, 7, 2, 7});
        assert result.get(0) == 7;
        assert result.get(1) == 7;
        assert result.get(2) == 2;

        assert MaxFrequencyStack.maxFrequencyStack(new int[]{3, 1, 3, 2, 3, 1}).size() == 6;

        System.out.println("All tests passed!");
    }
}
