public class FloydCycleDetection_test {
    public static void main(String[] args) {
        // Default input [1,3,4,2,2] -> hasCycle=true, cycleStart=2
        // result[0] = hasCycle (1=true/0=false), result[1] = cycleStart
        int[] result1 = FloydCycleDetection.floydCycleDetection(new int[]{1, 3, 4, 2, 2});
        assert result1[0] == 1 : "Expected hasCycle=true";
        assert result1[1] == 2 : "Expected cycleStart=2, got " + result1[1];

        // [3,1,3,4,2] -> hasCycle=true, cycleStart=3
        int[] result2 = FloydCycleDetection.floydCycleDetection(new int[]{3, 1, 3, 4, 2});
        assert result2[0] == 1 : "Expected hasCycle=true";
        assert result2[1] == 3 : "Expected cycleStart=3, got " + result2[1];

        // Minimal cycle [1,1] -> hasCycle=true, cycleStart=1
        int[] result3 = FloydCycleDetection.floydCycleDetection(new int[]{1, 1});
        assert result3[0] == 1 : "Expected hasCycle=true";
        assert result3[1] == 1 : "Expected cycleStart=1, got " + result3[1];

        // Empty array -> hasCycle=false, cycleStart=-1
        int[] result4 = FloydCycleDetection.floydCycleDetection(new int[]{});
        assert result4[0] == 0 : "Expected hasCycle=false";
        assert result4[1] == -1 : "Expected cycleStart=-1, got " + result4[1];

        System.out.println("All tests passed!");
    }
}
