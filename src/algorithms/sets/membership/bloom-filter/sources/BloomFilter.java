// Bloom Filter — Probabilistic Membership Data Structure
// Uses k hash functions to map elements into a bit array of size m.
// Insert: set k bit positions to 1. Query: check if all k positions are 1.
// False positives possible; false negatives impossible.
// Time: O(k) per operation — Space: O(m) for the bit array

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BloomFilter {

    private static int[] computeHashPositions(int value, int hashCount, int size) {
        int[] positions = new int[hashCount];
        for (int hashIdx = 0; hashIdx < hashCount; hashIdx++) {
            positions[hashIdx] = Math.abs((value * (hashIdx + 1) * 31 + hashIdx * 17) % size);
        }
        return positions;
    }

    public static Map<String, Object> bloomFilter(
            int[] elements, int[] queries, int size, int hashCount) {
        int[] bitArray = new int[size]; // @step:initialize

        // Insert phase: hash each element and set its bit positions
        for (int element : elements) {
            int[] positions = computeHashPositions(element, hashCount, size); // @step:hash-element
            for (int position : positions) {
                bitArray[position] = 1; // @step:set-bit
            }
        }

        List<Map<String, Object>> results = new ArrayList<>();

        // Query phase: check if all bit positions for a query value are set
        for (int query : queries) {
            int[] positions = computeHashPositions(query, hashCount, size); // @step:check-bit
            boolean allBitsSet = true;
            for (int position : positions) {
                if (bitArray[position] != 1) {
                    allBitsSet = false;
                    break;
                }
            }

            Map<String, Object> entry = new HashMap<>();
            entry.put("value", query);
            if (allBitsSet) {
                entry.put("found", true); // @step:member-found
            } else {
                entry.put("found", false); // @step:member-not-found
            }
            results.add(entry);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("results", results);
        return result; // @step:complete
    }
}
