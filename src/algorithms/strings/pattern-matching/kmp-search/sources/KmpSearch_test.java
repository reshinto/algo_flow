/** Correctness tests for the KmpSearch algorithm. */
public class KmpSearch_test {
    public static void main(String[] args) {
        assert KmpSearch.kmpSearch("ABCDEF", "ABC") == 0;
        assert KmpSearch.kmpSearch("ABABDABACDABABCABAB", "ABABCABAB") == 10;
        assert KmpSearch.kmpSearch("XYZABC", "ABC") == 3;
        assert KmpSearch.kmpSearch("ABCDEFG", "XYZ") == -1;
        assert KmpSearch.kmpSearch("HELLO", "L") == 2;
        assert KmpSearch.kmpSearch("HELLO", "Z") == -1;
        assert KmpSearch.kmpSearch("HELLO", "") == 0;
        assert KmpSearch.kmpSearch("ABCD", "ABCD") == 0;
        assert KmpSearch.kmpSearch("AB", "ABCD") == -1;
        assert KmpSearch.kmpSearch("AAAAAB", "AAAB") == 2;
        System.out.println("All tests passed!");
    }
}
