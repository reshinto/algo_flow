public class TernarySearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert TernarySearch.ternarySearch(standardArray, 72) == 8 : "should find value present";
        assert TernarySearch.ternarySearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert TernarySearch.ternarySearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert TernarySearch.ternarySearch(new int[]{42}, 42) == 0 : "should find single element";
        assert TernarySearch.ternarySearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert TernarySearch.ternarySearch(standardArray, 2) == 0 : "should find first element";
        assert TernarySearch.ternarySearch(standardArray, 91) == 9 : "should find last element";
        assert TernarySearch.ternarySearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert TernarySearch.ternarySearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert TernarySearch.ternarySearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert TernarySearch.ternarySearch(new int[]{-10, -5, 0, 3, 7}, -5) == 1 : "should handle negative numbers";
        assert TernarySearch.ternarySearch(new int[]{1, 2}, 2) == 1 : "should find element in two-element array";
        assert TernarySearch.ternarySearch(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9}, 4) == 3 : "should find element at mid1 position";
        assert TernarySearch.ternarySearch(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9}, 7) == 6 : "should find element at mid2 position";

        System.out.println("All tests passed!");
    }
}
