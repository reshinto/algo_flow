/** Correctness tests for the MinimumWindowSubstring algorithm. */
public class MinimumWindowSubstring_test {
    public static void main(String[] args) {
        assert MinimumWindowSubstring.minimumWindowSubstring("ADOBECODEBANC", "ABC").equals("BANC");
        assert MinimumWindowSubstring.minimumWindowSubstring("a", "a").equals("a");
        assert MinimumWindowSubstring.minimumWindowSubstring("a", "aa").equals("");
        assert MinimumWindowSubstring.minimumWindowSubstring("hello", "z").equals("");
        assert MinimumWindowSubstring.minimumWindowSubstring("abc", "abc").equals("abc");
        assert MinimumWindowSubstring.minimumWindowSubstring("ab", "abc").equals("");
        assert MinimumWindowSubstring.minimumWindowSubstring("ADOBECODEBANC", "AABC").equals("ADOBECODEBA");
        assert MinimumWindowSubstring.minimumWindowSubstring("cabwefgewcwaefgcf", "cae").equals("cwae");
        assert MinimumWindowSubstring.minimumWindowSubstring("abcdef", "f").equals("f");
        assert MinimumWindowSubstring.minimumWindowSubstring("abc", "").equals("");
        assert MinimumWindowSubstring.minimumWindowSubstring("aaabbbccc", "b").equals("b");
        assert MinimumWindowSubstring.minimumWindowSubstring("abc", "cba").equals("abc");
        System.out.println("All tests passed!");
    }
}
