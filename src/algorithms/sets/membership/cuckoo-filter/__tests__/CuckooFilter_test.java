import java.util.List;
import java.util.Map;

public class CuckooFilter_test {

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // finds all inserted elements
        Map<String, List<Map<String, Object>>> output1 = CuckooFilter.cuckooFilter(
            new int[]{3, 7, 11, 15}, new int[]{3, 7, 11, 15}, 32);
        List<Map<String, Object>> results1 = output1.get("results");
        for (Map<String, Object> entry : results1) {
            assert (boolean) entry.get("found") : "Expected found=true for inserted element";
        }

        // returns result entry for every query
        Map<String, List<Map<String, Object>>> output2 = CuckooFilter.cuckooFilter(
            new int[]{1, 3}, new int[]{1, 2, 3, 4, 5}, 8);
        List<Map<String, Object>> results2 = output2.get("results");
        assert results2.size() == 5 : "Expected 5 results";
        for (int queryIdx = 0; queryIdx < 5; queryIdx++) {
            assert (int) results2.get(queryIdx).get("value") == queryIdx + 1;
        }

        // empty elements — all queries not found
        Map<String, List<Map<String, Object>>> output3 = CuckooFilter.cuckooFilter(
            new int[]{}, new int[]{5, 10, 15}, 8);
        List<Map<String, Object>> results3 = output3.get("results");
        for (Map<String, Object> entry : results3) {
            assert !(boolean) entry.get("found") : "Expected found=false for empty filter";
        }

        // empty queries — empty results
        Map<String, List<Map<String, Object>>> output4 = CuckooFilter.cuckooFilter(
            new int[]{1, 2, 3}, new int[]{}, 8);
        assert output4.get("results").isEmpty() : "Expected empty results";

        // single element and single matching query
        Map<String, List<Map<String, Object>>> output5 = CuckooFilter.cuckooFilter(
            new int[]{42}, new int[]{42}, 16);
        assert (boolean) output5.get("results").get(0).get("found") : "Expected found=true for 42";

        // large bucket count — all inserted elements found
        Map<String, List<Map<String, Object>>> output6 = CuckooFilter.cuckooFilter(
            new int[]{100, 200, 300}, new int[]{100, 200, 300}, 1024);
        for (Map<String, Object> entry : output6.get("results")) {
            assert (boolean) entry.get("found") : "Expected found=true with large bucket count";
        }

        System.out.println("All tests passed!");
    }
}
