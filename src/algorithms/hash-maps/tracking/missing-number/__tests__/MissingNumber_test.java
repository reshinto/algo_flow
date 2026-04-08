public class MissingNumber_test {
    public static void main(String[] args) {
        assert MissingNumber.missingNumber(new int[]{3, 0, 1}) == 2;
        assert MissingNumber.missingNumber(new int[]{0, 1}) == 2;
        assert MissingNumber.missingNumber(new int[]{9, 6, 4, 2, 3, 5, 7, 0, 1}) == 8;
        assert MissingNumber.missingNumber(new int[]{1}) == 0;
        assert MissingNumber.missingNumber(new int[]{0}) == 1;
        assert MissingNumber.missingNumber(new int[]{}) == 0;
        assert MissingNumber.missingNumber(new int[]{0, 1, 2}) == 3;
        assert MissingNumber.missingNumber(new int[]{0, 1, 2, 3, 4, 6}) == 5;

        System.out.println("All tests passed!");
    }
}
