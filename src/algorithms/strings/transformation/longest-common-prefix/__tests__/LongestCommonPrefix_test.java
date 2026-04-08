/** Correctness tests for the LongestCommonPrefix algorithm. */
public class LongestCommonPrefix_test {
    public static void main(String[] args) {
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"flower", "flow", "flight"}).equals("fl");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"dog", "racecar", "car"}).equals("");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{""}).equals("");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"hello"}).equals("hello");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{}).equals("");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"abc", ""}).equals("");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"abc", "abc", "abc"}).equals("abc");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"ab", "abc", "abcd"}).equals("ab");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"ab", "a"}).equals("a");
        assert LongestCommonPrefix.longestCommonPrefix(new String[]{"interview", "internal"}).equals("inter");
        System.out.println("All tests passed!");
    }
}
