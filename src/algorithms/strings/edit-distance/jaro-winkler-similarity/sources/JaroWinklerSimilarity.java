// Jaro-Winkler Similarity
// Computes similarity between two strings using the Jaro formula,
// then boosts the score if the strings share a common prefix (up to 4 chars).
// Returns a value between 0.0 (completely dissimilar) and 1.0 (identical).
// Time: O(nm), Space: O(n)

public class JaroWinklerSimilarity {

    public static double jaroWinklerSimilarity(String source, String target) {
        int sourceLength = source.length(); // @step:initialize
        int targetLength = target.length(); // @step:initialize

        // Identical strings have similarity 1.0
        if (source.equals(target)) return 1.0; // @step:initialize

        // Either empty string has similarity 0.0
        if (sourceLength == 0 || targetLength == 0) return 0.0; // @step:initialize

        // Match window: characters within this distance can be considered matching
        int matchWindow = Math.max(sourceLength, targetLength) / 2 - 1; // @step:initialize

        boolean[] sourceMatched = new boolean[sourceLength]; // @step:initialize
        boolean[] targetMatched = new boolean[targetLength]; // @step:initialize
        int matchCount = 0; // @step:initialize

        // Find matching characters within the match window
        for (int sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) { // @step:compare
            int windowStart = Math.max(0, sourceIdx - matchWindow); // @step:compare
            int windowEnd = Math.min(targetLength - 1, sourceIdx + matchWindow); // @step:compare

            for (int targetIdx = windowStart; targetIdx <= windowEnd; targetIdx++) { // @step:compare
                if (!targetMatched[targetIdx] && source.charAt(sourceIdx) == target.charAt(targetIdx)) { // @step:compare
                    sourceMatched[sourceIdx] = true; // @step:compute-distance
                    targetMatched[targetIdx] = true; // @step:compute-distance
                    matchCount++; // @step:compute-distance
                    break;
                }
            }
        }

        // No matches means similarity is 0
        if (matchCount == 0) return 0.0; // @step:compute-distance

        // Count transpositions: matched chars in different order
        int transpositionCount = 0; // @step:compute-distance
        int targetScanIdx = 0; // @step:compute-distance

        for (int sourceIdx = 0; sourceIdx < sourceLength; sourceIdx++) { // @step:compute-distance
            if (!sourceMatched[sourceIdx]) continue; // @step:compute-distance

            while (!targetMatched[targetScanIdx]) { // @step:compute-distance
                targetScanIdx++; // @step:compute-distance
            }

            if (source.charAt(sourceIdx) != target.charAt(targetScanIdx)) { // @step:compute-distance
                transpositionCount++; // @step:compute-distance
            }

            targetScanIdx++; // @step:compute-distance
        }

        // Jaro similarity formula
        double halfTranspositions = transpositionCount / 2.0; // @step:compute-distance
        double jaroScore = (matchCount / (double) sourceLength // @step:compute-distance
            + matchCount / (double) targetLength // @step:compute-distance
            + (matchCount - halfTranspositions) / matchCount) // @step:compute-distance
            / 3.0; // @step:compute-distance

        // Count common prefix length (up to 4 characters)
        int maxPrefixLength = 4; // @step:compute-distance
        int prefixLength = 0; // @step:compute-distance

        for (int prefixIdx = 0;
             prefixIdx < Math.min(maxPrefixLength, Math.min(sourceLength, targetLength));
             prefixIdx++) { // @step:compute-distance
            if (source.charAt(prefixIdx) == target.charAt(prefixIdx)) { // @step:compute-distance
                prefixLength++; // @step:compute-distance
            } else {
                break; // @step:compute-distance
            }
        }

        // Winkler bonus: reward common prefix
        double winklerBonus = prefixLength * 0.1 * (1.0 - jaroScore); // @step:compute-distance
        double jaroWinklerScore = jaroScore + winklerBonus; // @step:compute-distance

        return Math.round(jaroWinklerScore * 10000.0) / 10000.0; // @step:complete
    }
}
