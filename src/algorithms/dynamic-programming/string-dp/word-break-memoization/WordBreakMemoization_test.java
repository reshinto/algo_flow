// javac WordBreakMemoization.java WordBreakMemoization_test.java && java -ea WordBreakMemoization_test
public class WordBreakMemoization_test {
    public static void main(String[] args) {
        assert WordBreakMemoization.wordBreakMemoization("leetcode", new String[]{"leet", "code"}) == true : "leetcode should return true";
        assert WordBreakMemoization.wordBreakMemoization("catsandog", new String[]{"cats", "dog", "sand", "and", "cat"}) == false : "catsandog should return false";
        assert WordBreakMemoization.wordBreakMemoization("", new String[]{"leet", "code"}) == true : "empty string should return true";
        assert WordBreakMemoization.wordBreakMemoization("leet", new String[]{"leet", "code"}) == true : "exact match should return true";
        assert WordBreakMemoization.wordBreakMemoization("abcd", new String[]{"leet", "code"}) == false : "no match should return false";
        assert WordBreakMemoization.wordBreakMemoization("applepenapple", new String[]{"apple", "pen"}) == true : "applepenapple should return true";
        assert WordBreakMemoization.wordBreakMemoization("catsanddog", new String[]{"cat", "cats", "and", "sand", "dog"}) == true : "catsanddog should return true";
        assert WordBreakMemoization.wordBreakMemoization("aaaaab", new String[]{"a", "aa", "aaa", "aaaa"}) == false : "aaaaab should return false";

        System.out.println("All tests passed!");
    }
}
