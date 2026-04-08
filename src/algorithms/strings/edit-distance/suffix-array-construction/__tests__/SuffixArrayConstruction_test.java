/** Correctness tests for the SuffixArrayConstruction algorithm. */
import java.util.Arrays;

public class SuffixArrayConstruction_test {
    public static void main(String[] args) {
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("banana"), new int[]{5, 3, 1, 0, 4, 2});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("a"), new int[]{0});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction(""), new int[]{});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("ab"), new int[]{0, 1});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("ba"), new int[]{1, 0});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("aaa"), new int[]{2, 1, 0});
        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("mississippi"),
                new int[]{10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2});

        int[] helloResult = SuffixArrayConstruction.suffixArrayConstruction("hello");
        assert helloResult.length == 5;

        String permText = "abracadabra";
        int[] permResult = SuffixArrayConstruction.suffixArrayConstruction(permText);
        int[] sorted = permResult.clone();
        Arrays.sort(sorted);
        for (int idx = 0; idx < permText.length(); idx++) {
            assert sorted[idx] == idx : "Not a permutation at index " + idx;
        }

        assert Arrays.equals(SuffixArrayConstruction.suffixArrayConstruction("abab"), new int[]{2, 0, 3, 1});

        String text = "banana";
        int[] suffixArray = SuffixArrayConstruction.suffixArrayConstruction(text);
        for (int rankIdx = 0; rankIdx < suffixArray.length - 1; rankIdx++) {
            String currentSuffix = text.substring(suffixArray[rankIdx]);
            String nextSuffix = text.substring(suffixArray[rankIdx + 1]);
            assert currentSuffix.compareTo(nextSuffix) <= 0;
        }

        System.out.println("All tests passed!");
    }
}
