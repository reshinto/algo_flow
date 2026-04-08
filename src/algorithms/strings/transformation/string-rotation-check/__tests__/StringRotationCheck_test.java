/** Correctness tests for the StringRotationCheck algorithm. */
public class StringRotationCheck_test {
    public static void main(String[] args) {
        assert StringRotationCheck.stringRotationCheck("waterbottle", "erbottlewat") == true;
        assert StringRotationCheck.stringRotationCheck("hello", "hello") == true;
        assert StringRotationCheck.stringRotationCheck("a", "a") == true;
        assert StringRotationCheck.stringRotationCheck("a", "b") == false;
        assert StringRotationCheck.stringRotationCheck("abc", "ab") == false;
        assert StringRotationCheck.stringRotationCheck("waterbottle", "bottlewater") == true;
        assert StringRotationCheck.stringRotationCheck("abcde", "abced") == false;
        assert StringRotationCheck.stringRotationCheck("abcde", "bcdea") == true;
        assert StringRotationCheck.stringRotationCheck("abcde", "eabcd") == true;
        assert StringRotationCheck.stringRotationCheck("", "") == true;
        assert StringRotationCheck.stringRotationCheck("abc", "") == false;
        assert StringRotationCheck.stringRotationCheck("aabaa", "baaab") == false;
        assert StringRotationCheck.stringRotationCheck("aab", "baa") == true;
        System.out.println("All tests passed!");
    }
}
