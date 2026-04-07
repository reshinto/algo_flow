public class JewelsAndStones_test {
    public static void main(String[] args) {
        assert JewelsAndStones.jewelsAndStones("aA", "aAAbbbb") == 3;
        assert JewelsAndStones.jewelsAndStones("z", "aAAbbbb") == 0;
        assert JewelsAndStones.jewelsAndStones("abc", "abcabc") == 6;
        assert JewelsAndStones.jewelsAndStones("aA", "") == 0;
        assert JewelsAndStones.jewelsAndStones("a", "a") == 1;
        assert JewelsAndStones.jewelsAndStones("a", "b") == 0;
        assert JewelsAndStones.jewelsAndStones("A", "aA") == 1;
        assert JewelsAndStones.jewelsAndStones("aa", "aaa") == 3;

        System.out.println("All tests passed!");
    }
}
