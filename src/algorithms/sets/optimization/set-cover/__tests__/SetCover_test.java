import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SetCover_test {

    public static void main(String[] args) {
        // covers default universe
        int[][] sets1 = {{1,2,3},{2,4},{3,4,5},{5,6,7},{6,7,8}};
        int[] result1 = SetCover.setCover(new int[]{1,2,3,4,5,6,7,8}, sets1);
        Set<Integer> covered1 = new HashSet<>();
        for (int idx : result1) {
            for (int elem : sets1[idx]) covered1.add(elem);
        }
        assert covered1.contains(1) && covered1.contains(8) : "Should cover 1 and 8";
        assert result1.length > 0 && result1.length <= 5;

        // single set covers universe
        int[][] sets2 = {{1,2,3},{1},{2}};
        int[] result2 = SetCover.setCover(new int[]{1,2,3}, sets2);
        assert result2.length == 1 : "Expected 1 set selected";
        assert result2[0] == 0 : "Expected index 0 selected";

        // disjoint singletons
        int[][] sets3 = {{1},{2},{3}};
        int[] result3 = SetCover.setCover(new int[]{1,2,3}, sets3);
        Set<Integer> covered3 = new HashSet<>();
        for (int idx : result3) {
            for (int elem : sets3[idx]) covered3.add(elem);
        }
        assert covered3.containsAll(Arrays.asList(1,2,3));
        assert result3.length == 3;

        // greediest set selected first
        int[][] sets4 = {{1,2,3},{4}};
        int[] result4 = SetCover.setCover(new int[]{1,2,3,4}, sets4);
        assert result4[0] == 0 : "Expected greediest set (index 0) selected first";

        // empty universe returns empty selection
        int[] result5 = SetCover.setCover(new int[]{}, new int[][]{{1,2},{3,4}});
        assert result5.length == 0;

        System.out.println("All tests passed!");
    }
}
