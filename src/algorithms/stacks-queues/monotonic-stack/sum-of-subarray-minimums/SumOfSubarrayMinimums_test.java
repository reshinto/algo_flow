// javac SumOfSubarrayMinimums.java SumOfSubarrayMinimums_test.java && java -ea SumOfSubarrayMinimums_test
public class SumOfSubarrayMinimums_test {
    public static void main(String[] args) {
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{3, 1, 2, 4}) == 17;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{11, 81, 94, 43, 3}) == 444;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{5}) == 5;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{2, 2, 2}) == 12;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{1, 2, 3}) == 10;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{3, 2, 1}) == 10;
        assert SumOfSubarrayMinimums.sumOfSubarrayMinimums(new int[]{1, 1}) == 3;

        int[] largeArray = new int[100];
        java.util.Arrays.fill(largeArray, 30000);
        int largeResult = SumOfSubarrayMinimums.sumOfSubarrayMinimums(largeArray);
        assert largeResult >= 0 && largeResult < 1_000_000_007;

        System.out.println("All tests passed!");
    }
}
