import java.util.*;

public class FindAllDuplicates_test {
    public static void main(String[] args) {
        assert FindAllDuplicates.findAllDuplicates(new int[]{4, 3, 2, 7, 8, 2, 3, 1}).equals(Arrays.asList(2, 3));
        assert FindAllDuplicates.findAllDuplicates(new int[]{1, 1, 2}).equals(Arrays.asList(1));
        assert FindAllDuplicates.findAllDuplicates(new int[]{1, 2, 3}).equals(Collections.emptyList());
        assert FindAllDuplicates.findAllDuplicates(new int[]{}).equals(Collections.emptyList());
        assert FindAllDuplicates.findAllDuplicates(new int[]{5, 5}).equals(Arrays.asList(5));
        assert FindAllDuplicates.findAllDuplicates(new int[]{1, 2, 1, 2}).equals(Arrays.asList(1, 2));
        assert FindAllDuplicates.findAllDuplicates(new int[]{7}).equals(Collections.emptyList());
        assert FindAllDuplicates.findAllDuplicates(new int[]{3, 3, 3}).equals(Arrays.asList(3, 3));

        System.out.println("All tests passed!");
    }
}
