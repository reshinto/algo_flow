import java.util.List;
import java.util.Map;

public class CountMinSketch_test {

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // returns results for inserted elements
        Map<String, List<Map<String, Integer>>> output1 = CountMinSketch.countMinSketch(
            new int[]{3, 3, 7, 7, 7, 11}, new int[]{3, 7, 11, 5}, 8, 3);
        List<Map<String, Integer>> results1 = output1.get("results");
        boolean found3 = results1.stream().anyMatch(e -> e.get("value") == 3);
        boolean found7 = results1.stream().anyMatch(e -> e.get("value") == 7);
        boolean found11 = results1.stream().anyMatch(e -> e.get("value") == 11);
        assert found3 : "Expected element 3 in results";
        assert found7 : "Expected element 7 in results";
        assert found11 : "Expected element 11 in results";

        // non-inserted element should not appear
        boolean found5 = results1.stream().anyMatch(e -> e.get("value") == 5);
        assert !found5 : "Element 5 should not appear in results";

        // estimated count for element 7 is at least 3
        Map<String, List<Map<String, Integer>>> output2 = CountMinSketch.countMinSketch(
            new int[]{3, 3, 7, 7, 7, 11}, new int[]{7}, 8, 3);
        List<Map<String, Integer>> results2 = output2.get("results");
        int count7 = results2.stream().filter(e -> e.get("value") == 7)
            .mapToInt(e -> e.get("estimatedCount")).findFirst().orElse(0);
        assert count7 >= 3 : "Expected estimated count for 7 >= 3, got " + count7;

        // empty elements returns empty results
        Map<String, List<Map<String, Integer>>> output3 = CountMinSketch.countMinSketch(
            new int[]{}, new int[]{3, 7}, 8, 3);
        assert output3.get("results").isEmpty() : "Expected empty results for empty sketch";

        // never undercounts
        Map<String, List<Map<String, Integer>>> output4 = CountMinSketch.countMinSketch(
            new int[]{1, 1, 1, 2, 2, 3}, new int[]{1, 2, 3}, 16, 4);
        List<Map<String, Integer>> results4 = output4.get("results");
        int countOf1 = results4.stream().filter(e -> e.get("value") == 1)
            .mapToInt(e -> e.get("estimatedCount")).findFirst().orElse(0);
        int countOf2 = results4.stream().filter(e -> e.get("value") == 2)
            .mapToInt(e -> e.get("estimatedCount")).findFirst().orElse(0);
        int countOf3 = results4.stream().filter(e -> e.get("value") == 3)
            .mapToInt(e -> e.get("estimatedCount")).findFirst().orElse(0);
        assert countOf1 >= 3 : "Expected count of 1 >= 3";
        assert countOf2 >= 2 : "Expected count of 2 >= 2";
        assert countOf3 >= 1 : "Expected count of 3 >= 1";

        System.out.println("All tests passed!");
    }
}
