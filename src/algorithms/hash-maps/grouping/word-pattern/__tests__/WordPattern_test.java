public class WordPattern_test {
    public static void main(String[] args) {
        assert WordPattern.wordPattern("abba", "dog cat cat dog") == true;
        assert WordPattern.wordPattern("abba", "dog cat cat fish") == false;
        assert WordPattern.wordPattern("aabb", "dog dog cat cat") == true;
        assert WordPattern.wordPattern("aaaa", "dog cat cat dog") == false;
        assert WordPattern.wordPattern("abc", "dog cat") == false;
        assert WordPattern.wordPattern("a", "dog") == true;
        assert WordPattern.wordPattern("aa", "dog dog") == true;
        assert WordPattern.wordPattern("ab", "dog dog") == false;
        assert WordPattern.wordPattern("abcd", "one two three four") == true;

        System.out.println("All tests passed!");
    }
}
