/** Correctness tests for the ValidPalindrome algorithm. */
public class ValidPalindrome_test {
    public static void main(String[] args) {
        assert ValidPalindrome.validPalindrome("A man, a plan, a canal: Panama") == true;
        assert ValidPalindrome.validPalindrome("race a car") == false;
        assert ValidPalindrome.validPalindrome(" ") == true;
        assert ValidPalindrome.validPalindrome("a.") == true;
        assert ValidPalindrome.validPalindrome("") == true;
        assert ValidPalindrome.validPalindrome("racecar") == true;
        assert ValidPalindrome.validPalindrome("hello") == false;
        assert ValidPalindrome.validPalindrome("AbBa") == true;
        assert ValidPalindrome.validPalindrome(".,!?") == true;
        assert ValidPalindrome.validPalindrome("...racecar...") == true;
        assert ValidPalindrome.validPalindrome("ab2a") == false;
        System.out.println("All tests passed!");
    }
}
