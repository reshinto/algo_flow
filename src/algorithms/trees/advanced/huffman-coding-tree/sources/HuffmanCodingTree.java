// Huffman Coding Tree — build optimal prefix-free encoding from character frequencies
import java.util.*;

class HuffmanNode implements Comparable<HuffmanNode> {
    int freq;
    Character ch;
    HuffmanNode left, right;
    HuffmanNode(int freq, Character ch) { this.freq = freq; this.ch = ch; }
    public int compareTo(HuffmanNode other) { return this.freq - other.freq; }
}

class HuffmanCodingTree {
    private Map<Character, String> encodings = new HashMap<>();

    private void generateCodes(HuffmanNode node, String code) {
        if (node == null) return;
        if (node.ch != null) {
            encodings.put(node.ch, code.isEmpty() ? "0" : code); // @step:encode-char
            return;
        }
        generateCodes(node.left, code + "0"); // @step:traverse-left
        generateCodes(node.right, code + "1"); // @step:traverse-right
    }

    public Map<Character, String> huffmanCodingTree(char[] chars, int[] freqs) {
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>(); // @step:initialize
        for (int idx = 0; idx < chars.length; idx++) {
            pq.add(new HuffmanNode(freqs[idx], chars[idx])); // @step:select-min-freq
        }
        while (pq.size() > 1) {
            HuffmanNode left = pq.poll(); // @step:select-min-freq
            HuffmanNode right = pq.poll(); // @step:select-min-freq
            HuffmanNode merged = new HuffmanNode(left.freq + right.freq, null); // @step:build-node
            merged.left = left;
            merged.right = right;
            pq.add(merged); // @step:build-node
        }
        encodings.clear();
        generateCodes(pq.poll(), "");
        return encodings; // @step:complete
    }
}
