// javac WordBreakTabulation.java WordBreakTabulation_test.java && java -ea WordBreakTabulation_test
public class WordBreakTabulation_test {
    public static void main(String[] args) {
        assert WordBreakTabulation.wordBreakTabulation("leetcode", new String[]{"leet", "code"}) == true : "leetcode should return true";
        assert WordBreakTabulation.wordBreakTabulation("applepenapple", new String[]{"apple", "pen"}) == true : "applepenapple should return true";
        assert WordBreakTabulation.wordBreakTabulation("catsandog", new String[]{"cats", "dog", "sand", "and", "cat"}) == false : "catsandog should return false";
        assert WordBreakTabulation.wordBreakTabulation("", new String[]{"a"}) == true : "empty string should return true";
        assert WordBreakTabulation.wordBreakTabulation("catsanddog", new String[]{"cats", "dog", "sand", "and", "cat"}) == true : "catsanddog should return true";
        assert WordBreakTabulation.wordBreakTabulation("hello", new String[]{"world", "foo"}) == false : "no match should return false";
        assert WordBreakTabulation.wordBreakTabulation("apple", new String[]{"apple", "pen"}) == true : "exact match should return true";
        assert WordBreakTabulation.wordBreakTabulation("leetcoderr", new String[]{"leet", "code"}) == false : "leftover should return false";

        System.out.println("All tests passed!");
    }
}
