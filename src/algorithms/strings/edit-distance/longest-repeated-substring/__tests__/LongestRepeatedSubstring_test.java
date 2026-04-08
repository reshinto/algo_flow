/** Correctness tests for the LongestRepeatedSubstring algorithm. */
public class LongestRepeatedSubstring_test {
    public static void main(String[] args) {
        assert LongestRepeatedSubstring.longestRepeatedSubstring("banana").equals("ana");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("abcd").equals("");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("aab").equals("a");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("a").equals("");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("").equals("");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("ababc").equals("ab");

        String aaaResult = LongestRepeatedSubstring.longestRepeatedSubstring("aaa");
        assert aaaResult.length() > 0 && "aaa".contains(aaaResult);

        assert LongestRepeatedSubstring.longestRepeatedSubstring("aa").equals("a");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("ab").equals("");
        assert LongestRepeatedSubstring.longestRepeatedSubstring("abcabc").equals("abc");

        String msResult = LongestRepeatedSubstring.longestRepeatedSubstring("mississippi");
        assert msResult.length() > 0;
        int firstIdx = "mississippi".indexOf(msResult);
        int secondIdx = "mississippi".indexOf(msResult, firstIdx + 1);
        assert secondIdx > -1 : "Expected repeated substring in 'mississippi', got: " + msResult;

        assert LongestRepeatedSubstring.longestRepeatedSubstring("121212").equals("1212");

        System.out.println("All tests passed!");
    }
}
