public class RansomNote_test {
    public static void main(String[] args) {
        assert RansomNote.ransomNote("aa", "aab") == true;
        assert RansomNote.ransomNote("a", "b") == false;
        assert RansomNote.ransomNote("aa", "ab") == false;
        assert RansomNote.ransomNote("", "abc") == true;
        assert RansomNote.ransomNote("", "") == true;
        assert RansomNote.ransomNote("a", "") == false;
        assert RansomNote.ransomNote("abc", "aabbcc") == true;
        assert RansomNote.ransomNote("z", "abcde") == false;
        assert RansomNote.ransomNote("x", "x") == true;
        assert RansomNote.ransomNote("aaa", "aaab") == true;
        assert RansomNote.ransomNote("aaaa", "aaab") == false;

        System.out.println("All tests passed!");
    }
}
