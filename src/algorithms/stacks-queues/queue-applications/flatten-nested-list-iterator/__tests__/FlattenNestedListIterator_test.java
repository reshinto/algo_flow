// javac FlattenNestedListIterator.java FlattenNestedListIterator_test.java && java -ea FlattenNestedListIterator_test
import java.util.List;
import java.util.Arrays;

public class FlattenNestedListIterator_test {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        assert FlattenNestedListIterator.flattenNestedListIterator(
            Arrays.asList((Object) Arrays.asList((Object) 1, Arrays.asList((Object) 2)), (Object) 3, Arrays.asList((Object) 4, Arrays.asList((Object) 5, 6)))
        ).equals(Arrays.asList(1, 2, 3, 4, 5, 6));

        assert FlattenNestedListIterator.flattenNestedListIterator(
            Arrays.asList((Object) 1, 2, 3, 4)
        ).equals(Arrays.asList(1, 2, 3, 4));

        assert FlattenNestedListIterator.flattenNestedListIterator(
            Arrays.asList((Object) Arrays.asList((Object) Arrays.asList((Object) 7)))
        ).equals(Arrays.asList(7));

        assert FlattenNestedListIterator.flattenNestedListIterator(List.of()).equals(List.of());

        assert FlattenNestedListIterator.flattenNestedListIterator(
            Arrays.asList((Object) 1, Arrays.asList((Object) 2, Arrays.asList((Object) 3, Arrays.asList((Object) 4))))
        ).equals(Arrays.asList(1, 2, 3, 4));

        assert FlattenNestedListIterator.flattenNestedListIterator(
            Arrays.asList((Object) Arrays.asList((Object) 1, 1), 2, Arrays.asList((Object) 1, 1))
        ).equals(Arrays.asList(1, 1, 2, 1, 1));

        System.out.println("All tests passed!");
    }
}
