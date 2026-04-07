/** Correctness tests for the ZAlgorithm algorithm. */
public class ZAlgorithm_test {
    public static void main(String[] args) {
        assert ZAlgorithm.zAlgorithm("ABCDEF", "ABC") == 0;
        assert ZAlgorithm.zAlgorithm("AABXAABXCAABXAABXAY", "AABXAAB") == 0;
        assert ZAlgorithm.zAlgorithm("XYZAABXAAB", "AABXAAB") == 3;
        assert ZAlgorithm.zAlgorithm("XYZABC", "ABC") == 3;
        assert ZAlgorithm.zAlgorithm("ABCDEFG", "XYZ") == -1;
        assert ZAlgorithm.zAlgorithm("HELLO", "L") == 2;
        assert ZAlgorithm.zAlgorithm("HELLO", "Z") == -1;
        assert ZAlgorithm.zAlgorithm("HELLO", "") == 0;
        assert ZAlgorithm.zAlgorithm("ABCD", "ABCD") == 0;
        assert ZAlgorithm.zAlgorithm("AB", "ABCD") == -1;
        assert ZAlgorithm.zAlgorithm("AAAAAB", "AAAB") == 2;
        assert ZAlgorithm.zAlgorithm("ABABABAB", "ABAB") == 0;
        System.out.println("All tests passed!");
    }
}
