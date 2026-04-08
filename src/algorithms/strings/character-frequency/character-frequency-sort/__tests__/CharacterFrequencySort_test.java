/** Correctness tests for the CharacterFrequencySort algorithm. */
public class CharacterFrequencySort_test {
    public static void main(String[] args) {
        // empty string
        assert CharacterFrequencySort.characterFrequencySort("").equals("");

        // "tree" starts with "ee"
        String treeResult = CharacterFrequencySort.characterFrequencySort("tree");
        assert treeResult.startsWith("ee") : "Expected result to start with 'ee', got: " + treeResult;
        assert treeResult.length() == 4;

        // "cccaaa" — both blocks of 3 appear grouped
        String cccaaaResult = CharacterFrequencySort.characterFrequencySort("cccaaa");
        assert cccaaaResult.length() == 6;
        String firstBlock = cccaaaResult.substring(0, 3);
        String secondBlock = cccaaaResult.substring(3, 6);
        assert firstBlock.equals("ccc") || firstBlock.equals("aaa");
        assert secondBlock.equals("ccc") || secondBlock.equals("aaa");
        assert !firstBlock.equals(secondBlock);

        // "aab" starts with "aa"
        String aabResult = CharacterFrequencySort.characterFrequencySort("aab");
        assert aabResult.startsWith("aa") : "Expected 'aa' prefix, got: " + aabResult;
        assert aabResult.length() == 3;

        // single character
        assert CharacterFrequencySort.characterFrequencySort("z").equals("z");

        // all same
        assert CharacterFrequencySort.characterFrequencySort("aaaa").equals("aaaa");

        // preserves all characters
        String input = "programming";
        String programResult = CharacterFrequencySort.characterFrequencySort(input);
        assert programResult.length() == input.length();
        for (char ch : new java.util.HashSet<>(java.util.Arrays.asList(
                input.chars().mapToObj(c -> (char) c).toArray(Character[]::new)))) {
            long inputCount = input.chars().filter(c -> c == ch).count();
            long outputCount = programResult.chars().filter(c -> c == ch).count();
            assert inputCount == outputCount : "Character count mismatch for: " + ch;
        }

        // "eeebba" starts with "eee"
        String eeeResult = CharacterFrequencySort.characterFrequencySort("eeebba");
        assert eeeResult.startsWith("eee") : "Expected 'eee' prefix, got: " + eeeResult;

        // "aabbcc" contiguous blocks of 2
        String aabbccResult = CharacterFrequencySort.characterFrequencySort("aabbcc");
        assert aabbccResult.length() == 6;
        for (int blockStart = 0; blockStart < 6; blockStart += 2) {
            assert aabbccResult.charAt(blockStart) == aabbccResult.charAt(blockStart + 1);
        }

        // uppercase and lowercase distinct
        String mixedResult = CharacterFrequencySort.characterFrequencySort("Aabb");
        assert mixedResult.startsWith("bb") : "Expected 'bb' prefix, got: " + mixedResult;
        assert mixedResult.length() == 4;

        System.out.println("All tests passed!");
    }
}
