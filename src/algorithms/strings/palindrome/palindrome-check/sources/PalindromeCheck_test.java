/** Correctness tests for the PalindromeCheck algorithm. */
public class PalindromeCheck_test {
    public static void main(String[] args) {
        assert PalindromeCheck.palindromeCheck("racecar") == true;
        assert PalindromeCheck.palindromeCheck("hello") == false;
        assert PalindromeCheck.palindromeCheck("a") == true;
        assert PalindromeCheck.palindromeCheck("") == true;
        assert PalindromeCheck.palindromeCheck("ab") == false;
        assert PalindromeCheck.palindromeCheck("aba") == true;
        assert PalindromeCheck.palindromeCheck("abba") == true;
        assert PalindromeCheck.palindromeCheck("abca") == false;
        assert PalindromeCheck.palindromeCheck("aaaa") == true;
        System.out.println("All tests passed!");
    }
}
