/** Correctness tests for the LongestPalindromicSubstring algorithm. */
public class LongestPalindromicSubstring_test {
    public static void main(String[] args) {
        String bababResult = LongestPalindromicSubstring.longestPalindromicSubstring("babad");
        assert bababResult.equals("bab") || bababResult.equals("aba") : "Got: " + bababResult;

        assert LongestPalindromicSubstring.longestPalindromicSubstring("cbbd").equals("bb");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("a").equals("a");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("").equals("");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("racecar").equals("racecar");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("abba").equals("abba");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("aaaa").equals("aaaa");

        String uniqueResult = LongestPalindromicSubstring.longestPalindromicSubstring("abcde");
        assert uniqueResult.length() == 1 : "Expected length 1, got: " + uniqueResult.length();

        assert LongestPalindromicSubstring.longestPalindromicSubstring("xyzracecarabc").equals("racecar");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("xyzabbadef").equals("abba");
        assert LongestPalindromicSubstring.longestPalindromicSubstring("aa").equals("aa");

        String twoCharResult = LongestPalindromicSubstring.longestPalindromicSubstring("ab");
        assert twoCharResult.length() == 1 : "Expected length 1, got: " + twoCharResult.length();

        System.out.println("All tests passed!");
    }
}
