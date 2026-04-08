import java.util.List;
import java.util.Map;

public class BloomFilter_test {

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // returns results for default input
        Map<String, Object> result1 = BloomFilter.bloomFilter(
            new int[]{3, 7, 11, 15}, new int[]{3, 5, 7, 9, 11}, 16, 3);
        List<Map<String, Object>> results1 = (List<Map<String, Object>>) result1.get("results");
        assert results1 != null;
        assert results1.size() == 5 : "Expected 5 results";

        // no false negatives for inserted elements
        Map<String, Object> result2 = BloomFilter.bloomFilter(
            new int[]{3, 7, 11, 15}, new int[]{3, 7, 11, 15}, 16, 3);
        List<Map<String, Object>> results2 = (List<Map<String, Object>>) result2.get("results");
        for (Map<String, Object> entry : results2) {
            assert (boolean) entry.get("found") : "Expected found=true for inserted element";
        }

        // no insertions — all queries not found
        Map<String, Object> result3 = BloomFilter.bloomFilter(
            new int[]{}, new int[]{1, 2, 3, 4, 5}, 16, 3);
        List<Map<String, Object>> results3 = (List<Map<String, Object>>) result3.get("results");
        for (Map<String, Object> entry : results3) {
            assert !(boolean) entry.get("found") : "Expected found=false for empty filter";
        }

        // empty queries returns empty results
        Map<String, Object> result4 = BloomFilter.bloomFilter(
            new int[]{3, 7, 11}, new int[]{}, 16, 3);
        List<Map<String, Object>> results4 = (List<Map<String, Object>>) result4.get("results");
        assert results4.isEmpty() : "Expected empty results for empty queries";

        // larger bit array — no false negatives
        Map<String, Object> result5 = BloomFilter.bloomFilter(
            new int[]{100, 200, 300}, new int[]{100, 200, 300}, 512, 5);
        List<Map<String, Object>> results5 = (List<Map<String, Object>>) result5.get("results");
        for (Map<String, Object> entry : results5) {
            assert (boolean) entry.get("found") : "Expected found=true with large bit array";
        }

        System.out.println("All tests passed!");
    }
}
