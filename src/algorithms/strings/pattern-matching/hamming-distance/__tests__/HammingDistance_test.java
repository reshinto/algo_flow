/** Correctness tests for the HammingDistance algorithm. */
public class HammingDistance_test {
    public static void main(String[] args) {
        assert HammingDistance.hammingDistance("karolin", "kathrin") == 3;
        assert HammingDistance.hammingDistance("abcdef", "abcdef") == 0;
        assert HammingDistance.hammingDistance("aaaa", "bbbb") == 4;
        assert HammingDistance.hammingDistance("hello", "hxllo") == 1;
        assert HammingDistance.hammingDistance("abc", "abcd") == -1;
        assert HammingDistance.hammingDistance("abcde", "abc") == -1;
        assert HammingDistance.hammingDistance("a", "a") == 0;
        assert HammingDistance.hammingDistance("a", "b") == 1;
        assert HammingDistance.hammingDistance("", "") == 0;
        assert HammingDistance.hammingDistance("1011101", "1001001") == 2;
        assert HammingDistance.hammingDistance("TONED", "ROSES") == 3;
        System.out.println("All tests passed!");
    }
}
