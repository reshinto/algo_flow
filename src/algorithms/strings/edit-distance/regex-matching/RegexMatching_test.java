/** Correctness tests for the RegexMatching algorithm. */
public class RegexMatching_test {
    public static void main(String[] args) {
        assert RegexMatching.regexMatching("aab", "c*a*b") == true;
        assert RegexMatching.regexMatching("aa", "a") == false;
        assert RegexMatching.regexMatching("ab", ".*") == true;
        assert RegexMatching.regexMatching("", "") == true;
        assert RegexMatching.regexMatching("aa", "a*") == true;
        assert RegexMatching.regexMatching("aa", ".*") == true;
        assert RegexMatching.regexMatching("aab", "c*a*") == false;
        assert RegexMatching.regexMatching("mississippi", "mis*is*p*.") == false;
        assert RegexMatching.regexMatching("ab", ".*c") == false;
        assert RegexMatching.regexMatching("a", ".") == true;
        assert RegexMatching.regexMatching("b", "a") == false;
        assert RegexMatching.regexMatching("", "a*") == true;
        assert RegexMatching.regexMatching("aaa", "a*a") == true;
        assert RegexMatching.regexMatching("abc", "a.c") == true;
        System.out.println("All tests passed!");
    }
}
