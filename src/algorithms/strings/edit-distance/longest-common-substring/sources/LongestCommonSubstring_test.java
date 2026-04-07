/** Correctness tests for the LongestCommonSubstring algorithm. */
public class LongestCommonSubstring_test {
    public static void main(String[] args) {
        assert LongestCommonSubstring.longestCommonSubstring("ABABC", "BABCBA") == 4;
        assert LongestCommonSubstring.longestCommonSubstring("", "abc") == 0;
        assert LongestCommonSubstring.longestCommonSubstring("abc", "") == 0;
        assert LongestCommonSubstring.longestCommonSubstring("", "") == 0;
        assert LongestCommonSubstring.longestCommonSubstring("abc", "abc") == 3;
        assert LongestCommonSubstring.longestCommonSubstring("abc", "xyz") == 0;
        assert LongestCommonSubstring.longestCommonSubstring("abc", "xbz") == 1;
        assert LongestCommonSubstring.longestCommonSubstring("a", "a") == 1;
        assert LongestCommonSubstring.longestCommonSubstring("a", "b") == 0;
        assert LongestCommonSubstring.longestCommonSubstring("abcdef", "abcxyz") == 3;
        assert LongestCommonSubstring.longestCommonSubstring("xyzabc", "defabc") == 3;
        assert LongestCommonSubstring.longestCommonSubstring("abXYZcd", "abXYcd") == 4;
        assert LongestCommonSubstring.longestCommonSubstring("aaaa", "aa") == 2;
        System.out.println("All tests passed!");
    }
}
