public class FindTheDifference_test {
    public static void main(String[] args) {
        // finds 'e' added to "abcd"
        assert FindTheDifference.findTheDifference("abcd", "abcde") == 'e';

        // finds added char at start
        assert FindTheDifference.findTheDifference("abc", "zabc") == 'z';

        // finds added char when it duplicates an existing one
        assert FindTheDifference.findTheDifference("aab", "aabb") == 'b';

        // handles empty original string
        assert FindTheDifference.findTheDifference("", "x") == 'x';

        // finds added char in middle position
        assert FindTheDifference.findTheDifference("ab", "amb") == 'm';

        // handles single character original
        assert FindTheDifference.findTheDifference("a", "ab") == 'b';

        // finds duplicated character in all-same string
        assert FindTheDifference.findTheDifference("aaa", "aaaa") == 'a';

        // works with uppercase letters
        assert FindTheDifference.findTheDifference("ABC", "ABCD") == 'D';

        System.out.println("All tests passed!");
    }
}
