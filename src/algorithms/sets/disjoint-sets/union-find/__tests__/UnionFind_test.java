import java.util.List;
import java.util.Map;

public class UnionFind_test {

    public static void main(String[] args) {
        // merges all 8 elements into one component
        int[][] ops1 = {{0,1},{2,3},{4,5},{6,7},{0,2},{4,6},{0,4}};
        Map<String, Object> result1 = UnionFind.unionFind(8, ops1);
        @SuppressWarnings("unchecked")
        List<?> components1 = (List<?>) result1.get("components");
        assert components1.size() == 1 : "Expected 1 component, got " + components1.size();

        // no operations — each element in its own component
        int[][] ops2 = {};
        Map<String, Object> result2 = UnionFind.unionFind(4, ops2);
        @SuppressWarnings("unchecked")
        List<List<Integer>> components2 = (List<List<Integer>>) result2.get("components");
        assert components2.size() == 4 : "Expected 4 components";
        for (List<Integer> component : components2) {
            assert component.size() == 1 : "Each component should have 1 element";
        }

        // single union merges exactly two elements
        int[][] ops3 = {{0, 1}};
        Map<String, Object> result3 = UnionFind.unionFind(4, ops3);
        @SuppressWarnings("unchecked")
        List<List<Integer>> components3 = (List<List<Integer>>) result3.get("components");
        assert components3.size() == 3 : "Expected 3 components after union(0,1)";
        boolean foundMerged = false;
        for (List<Integer> component : components3) {
            if (component.size() == 2) {
                foundMerged = true;
            }
        }
        assert foundMerged : "Expected a component of size 2";

        // duplicate union leaves count unchanged
        int[][] ops4 = {{0, 1}, {0, 1}};
        Map<String, Object> result4 = UnionFind.unionFind(4, ops4);
        @SuppressWarnings("unchecked")
        List<?> components4 = (List<?>) result4.get("components");
        assert components4.size() == 3 : "Duplicate union should not change component count";

        // single element
        int[][] ops5 = {};
        Map<String, Object> result5 = UnionFind.unionFind(1, ops5);
        @SuppressWarnings("unchecked")
        List<List<Integer>> components5 = (List<List<Integer>>) result5.get("components");
        assert components5.size() == 1 : "Expected 1 component for single element";

        // chain of unions
        int[][] ops6 = {{0, 1}, {1, 2}, {2, 3}};
        Map<String, Object> result6 = UnionFind.unionFind(4, ops6);
        @SuppressWarnings("unchecked")
        List<?> components6 = (List<?>) result6.get("components");
        assert components6.size() == 1 : "Chain of unions should produce 1 component";

        System.out.println("All tests passed!");
    }
}
