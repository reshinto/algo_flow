// javac MaxSubarrayKadane.java MaxSubarrayKadane_test.java && java -ea MaxSubarrayKadane_test
public class MaxSubarrayKadane_test {
    public static void main(String[] args) {
        assert MaxSubarrayKadane.maxSubarrayKadane(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}) == 6 : "classic kadane input should return 6";
        assert MaxSubarrayKadane.maxSubarrayKadane(new int[]{1}) == 1 : "single positive element should return 1";
        assert MaxSubarrayKadane.maxSubarrayKadane(new int[]{-1}) == -1 : "single negative element should return -1";
        assert MaxSubarrayKadane.maxSubarrayKadane(new int[]{5, 4, -1, 7, 8}) == 23 : "all mostly positive should return 23";
        assert MaxSubarrayKadane.maxSubarrayKadane(new int[]{-3, -2, -1}) == -1 : "all negative should return least negative";

        System.out.println("All tests passed!");
    }
}
