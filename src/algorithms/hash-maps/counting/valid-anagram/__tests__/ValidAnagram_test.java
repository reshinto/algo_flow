public class ValidAnagram_test {
    public static void main(String[] args) {
        assert ValidAnagram.validAnagram("anagram", "nagaram") == true;
        assert ValidAnagram.validAnagram("rat", "car") == false;
        assert ValidAnagram.validAnagram("ab", "abc") == false;
        assert ValidAnagram.validAnagram("a", "a") == true;
        assert ValidAnagram.validAnagram("a", "b") == false;
        assert ValidAnagram.validAnagram("", "") == true;
        assert ValidAnagram.validAnagram("listen", "listen") == true;
        assert ValidAnagram.validAnagram("listen", "silent") == true;
        assert ValidAnagram.validAnagram("aab", "aaa") == false;
        assert ValidAnagram.validAnagram("Aa", "aa") == false;

        System.out.println("All tests passed!");
    }
}
