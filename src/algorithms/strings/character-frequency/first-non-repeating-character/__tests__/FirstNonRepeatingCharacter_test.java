/** Correctness tests for the FirstNonRepeatingCharacter algorithm. */
public class FirstNonRepeatingCharacter_test {
    public static void main(String[] args) {
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("leetcode") == 0;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("loveleetcode") == 2;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("aabb") == -1;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("z") == 0;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("aabbcc") == -1;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("aabbc") == 4;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("xaabb") == 0;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("aabbz") == 4;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("aaaa") == -1;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("ab") == 0;
        assert FirstNonRepeatingCharacter.firstNonRepeatingCharacter("dddccdbba") == 8;
        System.out.println("All tests passed!");
    }
}
