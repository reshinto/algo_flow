// javac *.java && java -ea HuffmanCodingTree_test
import java.util.Map;

public class HuffmanCodingTree_test {
    public static void main(String[] args) {
        HuffmanCodingTree hct = new HuffmanCodingTree();

        char[] chars = {'a', 'b', 'c', 'd', 'e', 'f'};
        int[] freqs = {5, 9, 12, 13, 16, 45};

        // test: produces encodings for all characters
        Map<Character, String> result = hct.huffmanCodingTree(chars, freqs);
        for (char ch : chars) {
            assert result.containsKey(ch) : "Missing encoding for " + ch;
            assert result.get(ch) != null && !result.get(ch).isEmpty() : "Empty encoding for " + ch;
        }

        // test: produces valid binary strings
        for (Map.Entry<Character, String> entry : result.entrySet()) {
            assert entry.getValue().matches("[01]+") : "Invalid encoding: " + entry.getValue();
        }

        // test: most frequent character gets shortest code
        int fLen = result.get('f').length();
        for (char ch : chars) {
            if (ch != 'f') {
                assert fLen <= result.get(ch).length() : "f should have shortest code";
            }
        }

        // test: all codes are prefix-free
        String[] codes = result.values().toArray(new String[0]);
        for (int idxA = 0; idxA < codes.length; idxA++) {
            for (int idxB = 0; idxB < codes.length; idxB++) {
                if (idxA != idxB) {
                    assert !(codes[idxA].startsWith(codes[idxB]) && !codes[idxA].equals(codes[idxB]))
                        : "Prefix conflict: " + codes[idxA] + " starts with " + codes[idxB];
                }
            }
        }

        // test: single character
        char[] singleChar = {'x'};
        int[] singleFreq = {10};
        Map<Character, String> singleResult = hct.huffmanCodingTree(singleChar, singleFreq);
        assert singleResult.get('x').equals("0") : "Single char encoding should be 0";

        System.out.println("All tests passed!");
    }
}
