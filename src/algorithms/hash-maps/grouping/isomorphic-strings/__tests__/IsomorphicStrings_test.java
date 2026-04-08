public class IsomorphicStrings_test {
    public static void main(String[] args) {
        assert IsomorphicStrings.isomorphicStrings("egg", "add") == true;
        assert IsomorphicStrings.isomorphicStrings("foo", "bar") == false;
        assert IsomorphicStrings.isomorphicStrings("paper", "title") == true;
        assert IsomorphicStrings.isomorphicStrings("ab", "abc") == false;
        assert IsomorphicStrings.isomorphicStrings("", "") == true;
        assert IsomorphicStrings.isomorphicStrings("a", "b") == true;
        assert IsomorphicStrings.isomorphicStrings("badc", "baba") == false;
        assert IsomorphicStrings.isomorphicStrings("abc", "abc") == true;

        System.out.println("All tests passed!");
    }
}
