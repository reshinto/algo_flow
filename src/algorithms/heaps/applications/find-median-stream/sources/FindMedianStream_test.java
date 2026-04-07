import java.util.List;

public class FindMedianStream_test {
    public static void main(String[] args) {
        // Test: default stream produces correct running medians
        List<Double> result1 = FindMedianStream.findMedianStream(new int[]{5, 2, 8, 1, 9, 3, 7});
        assert result1.equals(List.of(5.0, 3.5, 5.0, 3.5, 5.0, 4.0, 5.0)) : "Test 1 failed: " + result1;

        // Test: single element
        List<Double> result2 = FindMedianStream.findMedianStream(new int[]{42});
        assert result2.equals(List.of(42.0)) : "Test 2 failed: " + result2;

        // Test: two elements — average for even count
        List<Double> result3 = FindMedianStream.findMedianStream(new int[]{3, 7});
        assert result3.equals(List.of(3.0, 5.0)) : "Test 3 failed: " + result3;

        // Test: all identical elements
        List<Double> result4 = FindMedianStream.findMedianStream(new int[]{4, 4, 4, 4});
        assert result4.equals(List.of(4.0, 4.0, 4.0, 4.0)) : "Test 4 failed: " + result4;

        // Test: ascending stream
        List<Double> result5 = FindMedianStream.findMedianStream(new int[]{1, 2, 3, 4, 5});
        assert result5.equals(List.of(1.0, 1.5, 2.0, 2.5, 3.0)) : "Test 5 failed: " + result5;

        // Test: descending stream
        List<Double> result6 = FindMedianStream.findMedianStream(new int[]{5, 4, 3, 2, 1});
        assert result6.equals(List.of(5.0, 4.5, 4.0, 3.5, 3.0)) : "Test 6 failed: " + result6;

        // Test: negative numbers
        List<Double> result7 = FindMedianStream.findMedianStream(new int[]{-5, -1, -3});
        assert result7.equals(List.of(-5.0, -3.0, -3.0)) : "Test 7 failed: " + result7;

        // Test: mixed negative and positive
        List<Double> result8 = FindMedianStream.findMedianStream(new int[]{-2, 0, 2});
        assert result8.equals(List.of(-2.0, -1.0, 0.0)) : "Test 8 failed: " + result8;

        // Test: odd-length ascending stream [1,3,5,7,9]
        List<Double> result9 = FindMedianStream.findMedianStream(new int[]{1, 3, 5, 7, 9});
        assert result9.equals(List.of(1.0, 2.0, 3.0, 4.0, 5.0)) : "Test 9 failed: " + result9;

        // Test: two equal values
        List<Double> result10 = FindMedianStream.findMedianStream(new int[]{7, 7});
        assert result10.equals(List.of(7.0, 7.0)) : "Test 10 failed: " + result10;

        System.out.println("All tests passed!");
    }
}
