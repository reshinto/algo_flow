public class FirstMissingPositive_test {
    public static void main(String[] args) {
        assert FirstMissingPositive.firstMissingPositive(new int[]{3, 4, -1, 1, 7, 5, 2}) == 6;
        assert FirstMissingPositive.firstMissingPositive(new int[]{1, 2, 0}) == 3;
        assert FirstMissingPositive.firstMissingPositive(new int[]{3, 4, -1, 1}) == 2;
        assert FirstMissingPositive.firstMissingPositive(new int[]{7, 8, 9, 11, 12}) == 1;
        assert FirstMissingPositive.firstMissingPositive(new int[]{}) == 1;
        assert FirstMissingPositive.firstMissingPositive(new int[]{1, 2, 3, 4, 5}) == 6;
        assert FirstMissingPositive.firstMissingPositive(new int[]{-1, -2, -3}) == 1;
        assert FirstMissingPositive.firstMissingPositive(new int[]{1}) == 2;
        assert FirstMissingPositive.firstMissingPositive(new int[]{2}) == 1;
        assert FirstMissingPositive.firstMissingPositive(new int[]{1, 1, 2, 2}) == 3;

        System.out.println("All tests passed!");
    }
}
