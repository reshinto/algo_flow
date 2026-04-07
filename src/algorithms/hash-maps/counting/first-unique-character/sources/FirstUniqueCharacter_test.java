public class FirstUniqueCharacter_test {
    public static void main(String[] args) {
        assert FirstUniqueCharacter.firstUniqueCharacter("leetcode") == 0;
        assert FirstUniqueCharacter.firstUniqueCharacter("loveleetcode") == 2;
        assert FirstUniqueCharacter.firstUniqueCharacter("aabb") == -1;
        assert FirstUniqueCharacter.firstUniqueCharacter("z") == 0;
        assert FirstUniqueCharacter.firstUniqueCharacter("aabbcc") == -1;
        assert FirstUniqueCharacter.firstUniqueCharacter("aabc") == 2;
        assert FirstUniqueCharacter.firstUniqueCharacter("abcde") == 0;
        assert FirstUniqueCharacter.firstUniqueCharacter("abab") == -1;
        assert FirstUniqueCharacter.firstUniqueCharacter("aadadaad") == -1;
        assert FirstUniqueCharacter.firstUniqueCharacter("aba") == 1;

        System.out.println("All tests passed!");
    }
}
