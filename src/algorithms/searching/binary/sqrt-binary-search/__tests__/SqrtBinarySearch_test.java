public class SqrtBinarySearch_test {
    public static void main(String[] args) {
        assert SqrtBinarySearch.sqrtBinarySearch(49) == 7 : "should compute exact square root of perfect square";
        assert SqrtBinarySearch.sqrtBinarySearch(8) == 2 : "should compute floor square root of non-perfect square";
        assert SqrtBinarySearch.sqrtBinarySearch(0) == 0 : "should return 0 for input 0";
        assert SqrtBinarySearch.sqrtBinarySearch(1) == 1 : "should return 1 for input 1";
        assert SqrtBinarySearch.sqrtBinarySearch(4) == 2 : "should compute sqrt of 4";
        assert SqrtBinarySearch.sqrtBinarySearch(9) == 3 : "should compute sqrt of 9";
        assert SqrtBinarySearch.sqrtBinarySearch(16) == 4 : "should compute sqrt of 16";
        assert SqrtBinarySearch.sqrtBinarySearch(2) == 1 : "should compute floor sqrt of 2";
        assert SqrtBinarySearch.sqrtBinarySearch(3) == 1 : "should compute floor sqrt of 3";
        assert SqrtBinarySearch.sqrtBinarySearch(100) == 10 : "should compute sqrt of 100";
        assert SqrtBinarySearch.sqrtBinarySearch(99) == 9 : "should compute floor sqrt of 99";
        assert SqrtBinarySearch.sqrtBinarySearch(144) == 12 : "should compute sqrt of 144";
        assert SqrtBinarySearch.sqrtBinarySearch(10) == 3 : "should compute floor sqrt of 10";

        System.out.println("All tests passed!");
    }
}
