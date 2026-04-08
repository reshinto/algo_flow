public class LongestConsecutiveSequence_test {
    public static void main(String[] args) {
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{100, 4, 200, 1, 3, 2}) == 4;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{10, 20, 30}) == 1;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{1, 2, 3, 4, 5}) == 5;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{42}) == 1;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{1, 2, 2, 3}) == 3;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{-3, -2, -1, 0, 1}) == 5;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{-1, 0, 1}) == 3;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{1, 2, 3, 10, 11, 12, 13}) == 4;
        assert LongestConsecutiveSequence.longestConsecutiveSequence(new int[]{5, 1, 3, 2, 4}) == 5;

        System.out.println("All tests passed!");
    }
}
