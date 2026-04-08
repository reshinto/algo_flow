/** Correctness tests for the WildcardMatching algorithm. */
public class WildcardMatching_test {
    public static void main(String[] args) {
        assert WildcardMatching.wildcardMatching("adceb", "*a*b") == true;
        assert WildcardMatching.wildcardMatching("aa", "a") == false;
        assert WildcardMatching.wildcardMatching("aa", "*") == true;
        assert WildcardMatching.wildcardMatching("", "") == true;
        assert WildcardMatching.wildcardMatching("abc", "a?c") == true;
        assert WildcardMatching.wildcardMatching("abc", "a?b") == false;
        assert WildcardMatching.wildcardMatching("anylongstring", "*") == true;
        assert WildcardMatching.wildcardMatching("", "***") == true;
        assert WildcardMatching.wildcardMatching("cb", "?a") == false;
        assert WildcardMatching.wildcardMatching("adceb", "*a*") == true;
        assert WildcardMatching.wildcardMatching("", "a") == false;
        assert WildcardMatching.wildcardMatching("abc", "*bc") == true;
        assert WildcardMatching.wildcardMatching("abc", "abc") == true;
        assert WildcardMatching.wildcardMatching("abc", "abcd") == false;
        assert WildcardMatching.wildcardMatching("a", "?") == true;
        System.out.println("All tests passed!");
    }
}
