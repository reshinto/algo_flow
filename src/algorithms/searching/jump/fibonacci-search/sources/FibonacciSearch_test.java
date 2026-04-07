public class FibonacciSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert FibonacciSearch.fibonacciSearch(standardArray, 38) == 6 : "should find value present";
        assert FibonacciSearch.fibonacciSearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert FibonacciSearch.fibonacciSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert FibonacciSearch.fibonacciSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert FibonacciSearch.fibonacciSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert FibonacciSearch.fibonacciSearch(standardArray, 2) == 0 : "should find first element";
        assert FibonacciSearch.fibonacciSearch(standardArray, 91) == 9 : "should find last element";
        assert FibonacciSearch.fibonacciSearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert FibonacciSearch.fibonacciSearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert FibonacciSearch.fibonacciSearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert FibonacciSearch.fibonacciSearch(new int[]{-10, -5, 0, 3, 7}, -5) == 1 : "should handle negative numbers";
        assert FibonacciSearch.fibonacciSearch(new int[]{1, 2}, 2) == 1 : "should find second element in two-element array";
        assert FibonacciSearch.fibonacciSearch(new int[]{1, 2}, 1) == 0 : "should find first element in two-element array";

        System.out.println("All tests passed!");
    }
}
