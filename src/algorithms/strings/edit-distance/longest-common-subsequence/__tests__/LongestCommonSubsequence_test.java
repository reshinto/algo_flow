/** Correctness tests for the LongestCommonSubsequence algorithm. */
public class LongestCommonSubsequence_test {
    public static void main(String[] args) {
        assert LongestCommonSubsequence.longestCommonSubsequence("ABCBDAB", "BDCAB") == 4;
        assert LongestCommonSubsequence.longestCommonSubsequence("", "abc") == 0;
        assert LongestCommonSubsequence.longestCommonSubsequence("abc", "") == 0;
        assert LongestCommonSubsequence.longestCommonSubsequence("", "") == 0;
        assert LongestCommonSubsequence.longestCommonSubsequence("abc", "abc") == 3;
        assert LongestCommonSubsequence.longestCommonSubsequence("abc", "xyz") == 0;
        assert LongestCommonSubsequence.longestCommonSubsequence("a", "a") == 1;
        assert LongestCommonSubsequence.longestCommonSubsequence("a", "b") == 0;
        assert LongestCommonSubsequence.longestCommonSubsequence("AGGTAB", "GXTXAYB") == 4;
        assert LongestCommonSubsequence.longestCommonSubsequence("ABC", "AC") == 2;
        assert LongestCommonSubsequence.longestCommonSubsequence("aaa", "aa") == 2;
        assert LongestCommonSubsequence.longestCommonSubsequence("AB", "B") == 1;
        assert LongestCommonSubsequence.longestCommonSubsequence("ABCDE", "ACE") == 3;
        assert LongestCommonSubsequence.longestCommonSubsequence("XMJYAUZ", "MZJAWXU") == 4;
        System.out.println("All tests passed!");
    }
}
