public class KClosestPoints_test {
    private static long distSq(int[] point) {
        return (long) point[0] * point[0] + (long) point[1] * point[1];
    }

    public static void main(String[] args) {
        // Test: returns k=3 closest points
        {
            int[][] points = {{3, 3}, {5, -1}, {-2, 4}, {1, 1}, {0, 2}, {-1, -1}, {4, 0}};
            int[][] result = KClosestPoints.kClosestPoints(points, 3);
            assert result.length == 3 : "Test 1 failed: expected length 3, got " + result.length;
            long thirdSmallest = 0;
            long[] dists = new long[points.length];
            for (int idx = 0; idx < points.length; idx++) dists[idx] = distSq(points[idx]);
            java.util.Arrays.sort(dists);
            thirdSmallest = dists[2];
            for (int[] point : result) {
                assert distSq(point) <= thirdSmallest : "Test 1 failed: point not among k closest";
            }
        }

        // Test: returns exactly k=1 — the closest point [1,0] with dist²=1
        {
            int[][] points = {{10, 10}, {1, 0}, {5, 5}};
            int[][] result = KClosestPoints.kClosestPoints(points, 1);
            assert result.length == 1 : "Test 2 failed: expected length 1";
            assert distSq(result[0]) == 1 : "Test 2 failed: expected dist²=1, got " + distSq(result[0]);
        }

        // Test: k equals total number of points
        {
            int[][] points = {{1, 2}, {3, 4}, {0, 1}};
            int[][] result = KClosestPoints.kClosestPoints(points, 3);
            assert result.length == 3 : "Test 3 failed: expected length 3";
        }

        // Test: negative coordinates — [-1,-1] has dist²=2
        {
            int[][] points = {{-3, -4}, {-1, -1}, {0, -2}};
            int[][] result = KClosestPoints.kClosestPoints(points, 1);
            assert result.length == 1 : "Test 4 failed";
            assert distSq(result[0]) == 2 : "Test 4 failed: expected dist²=2, got " + distSq(result[0]);
        }

        // Test: origin point [0,0] has dist²=0
        {
            int[][] points = {{0, 0}, {1, 1}, {2, 2}};
            int[][] result = KClosestPoints.kClosestPoints(points, 1);
            assert distSq(result[0]) == 0 : "Test 5 failed: expected dist²=0";
        }

        System.out.println("All tests passed!");
    }
}
