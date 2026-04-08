public class BoyerMooreVoting_test {
    public static void main(String[] args) {
        // Basic majority [2,2,1,1,1,2,2] -> majority=2
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{2, 2, 1, 1, 1, 2, 2});
            assert result[0] == 2 : "Expected majority_element=2, got " + result[0];
        }

        // All same [5,5,5] -> majority=5
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{5, 5, 5});
            assert result[0] == 5 : "Expected majority_element=5, got " + result[0];
        }

        // Single element [42] -> majority=42
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{42});
            assert result[0] == 42 : "Expected majority_element=42, got " + result[0];
        }

        // Empty array -> majority=-1, count=0
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{});
            assert result[0] == -1 : "Expected majority_element=-1, got " + result[0];
            assert result[1] == 0 : "Expected count=0, got " + result[1];
        }

        // Majority at start [3,3,3,1,2] -> majority=3
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{3, 3, 3, 1, 2});
            assert result[0] == 3 : "Expected majority_element=3, got " + result[0];
        }

        // Majority at end [1,2,7,7,7] -> majority=7
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{1, 2, 7, 7, 7});
            assert result[0] == 7 : "Expected majority_element=7, got " + result[0];
        }

        // Alternating with majority [1,9,1,9,1,9,1] -> majority=1
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{1, 9, 1, 9, 1, 9, 1});
            assert result[0] == 1 : "Expected majority_element=1, got " + result[0];
        }

        // Two equal elements [4,4] -> majority=4
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{4, 4});
            assert result[0] == 4 : "Expected majority_element=4, got " + result[0];
        }

        // Large majority [6,6,6,1,6,2,6,3,6] -> majority=6
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{6, 6, 6, 1, 6, 2, 6, 3, 6});
            assert result[0] == 6 : "Expected majority_element=6, got " + result[0];
        }

        // Negative numbers [-3,-3,1,-3,2] -> majority=-3
        {
            int[] result = BoyerMooreVoting.boyerMooreVoting(new int[]{-3, -3, 1, -3, 2});
            assert result[0] == -3 : "Expected majority_element=-3, got " + result[0];
        }

        System.out.println("All tests passed!");
    }
}
