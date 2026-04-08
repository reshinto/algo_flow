public class NumberOfGoodPairs_test {
    public static void main(String[] args) {
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{1, 2, 3, 1, 1, 3}) == 4;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{1, 1, 1, 1}) == 6;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{1, 2, 3}) == 0;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{1, 1}) == 1;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{5}) == 0;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{}) == 0;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{2, 2, 2}) == 3;
        assert NumberOfGoodPairs.numberOfGoodPairs(new int[]{-1, -1, 2}) == 1;

        System.out.println("All tests passed!");
    }
}
