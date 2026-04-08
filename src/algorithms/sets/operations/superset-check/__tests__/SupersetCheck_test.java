public class SupersetCheck_test {

    public static void main(String[] args) {
        // A is proper superset of B
        assert SupersetCheck.supersetCheck(new int[]{1, 2, 3, 4, 5}, new int[]{2, 4}) == true;

        // element of B missing from A
        assert SupersetCheck.supersetCheck(new int[]{1, 2, 3, 4, 5}, new int[]{2, 9}) == false;

        // identical arrays
        assert SupersetCheck.supersetCheck(new int[]{1, 2, 3}, new int[]{1, 2, 3}) == true;

        // empty B — A is superset of empty
        assert SupersetCheck.supersetCheck(new int[]{1, 2, 3}, new int[]{}) == true;

        // empty A with non-empty B
        assert SupersetCheck.supersetCheck(new int[]{}, new int[]{1}) == false;

        // both empty
        assert SupersetCheck.supersetCheck(new int[]{}, new int[]{}) == true;

        // B has elements not in A
        assert SupersetCheck.supersetCheck(new int[]{2, 4}, new int[]{1, 2, 3, 4, 5}) == false;

        // B equals A with different ordering
        assert SupersetCheck.supersetCheck(new int[]{1, 2, 3}, new int[]{3, 1, 2}) == true;

        // single element B present in A
        assert SupersetCheck.supersetCheck(new int[]{5, 6, 7, 8}, new int[]{7}) == true;

        // single element B absent from A
        assert SupersetCheck.supersetCheck(new int[]{5, 6, 7, 8}, new int[]{9}) == false;

        System.out.println("All tests passed!");
    }
}
