public class JumpSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert JumpSearch.jumpSearch(standardArray, 56) == 7 : "should find value present";
        assert JumpSearch.jumpSearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert JumpSearch.jumpSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert JumpSearch.jumpSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert JumpSearch.jumpSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert JumpSearch.jumpSearch(standardArray, 2) == 0 : "should find first element";
        assert JumpSearch.jumpSearch(standardArray, 91) == 9 : "should find last element";
        assert JumpSearch.jumpSearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert JumpSearch.jumpSearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert JumpSearch.jumpSearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert JumpSearch.jumpSearch(new int[]{-10, -5, 0, 3, 7}, -5) == 1 : "should handle negative numbers";
        assert JumpSearch.jumpSearch(new int[]{1, 2}, 2) == 1 : "should find second element in two-element array";

        System.out.println("All tests passed!");
    }
}
