/** Correctness tests for the ReverseWords algorithm. */
public class ReverseWords_test {
    public static void main(String[] args) {
        assert ReverseWords.reverseWords("the sky is blue").equals("blue is sky the");
        assert ReverseWords.reverseWords("  hello world  ").equals("world hello");
        assert ReverseWords.reverseWords("a   good   example").equals("example good a");
        assert ReverseWords.reverseWords("hello").equals("hello");
        assert ReverseWords.reverseWords("   spaces   ").equals("spaces");
        assert ReverseWords.reverseWords("foo bar").equals("bar foo");
        assert ReverseWords.reverseWords("one two three").equals("three two one");
        assert ReverseWords.reverseWords("let us practice").equals("practice us let");
        assert ReverseWords.reverseWords("   word").equals("word");
        assert ReverseWords.reverseWords("word   ").equals("word");
        System.out.println("All tests passed!");
    }
}
