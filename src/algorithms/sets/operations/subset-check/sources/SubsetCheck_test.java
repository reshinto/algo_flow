public class SubsetCheck_test {

    public static void main(String[] args) {
        // A is proper subset of B
        assert SubsetCheck.subsetCheck(new int[]{2, 4}, new int[]{1, 2, 3, 4, 5}) == true;

        // element of A missing from B
        assert SubsetCheck.subsetCheck(new int[]{2, 9}, new int[]{1, 2, 3, 4, 5}) == false;

        // identical arrays
        assert SubsetCheck.subsetCheck(new int[]{1, 2, 3}, new int[]{1, 2, 3}) == true;

        // empty A is subset of any set
        assert SubsetCheck.subsetCheck(new int[]{}, new int[]{1, 2, 3}) == true;

        // empty B with non-empty A
        assert SubsetCheck.subsetCheck(new int[]{1}, new int[]{}) == false;

        // both empty
        assert SubsetCheck.subsetCheck(new int[]{}, new int[]{}) == true;

        // A has elements not in B
        assert SubsetCheck.subsetCheck(new int[]{1, 2, 3, 4, 5}, new int[]{2, 4}) == false;

        // A equals B with different ordering
        assert SubsetCheck.subsetCheck(new int[]{3, 1, 2}, new int[]{1, 2, 3}) == true;

        // single element present in B
        assert SubsetCheck.subsetCheck(new int[]{7}, new int[]{5, 6, 7, 8}) == true;

        // single element absent from B
        assert SubsetCheck.subsetCheck(new int[]{9}, new int[]{5, 6, 7, 8}) == false;

        System.out.println("All tests passed!");
    }
}
