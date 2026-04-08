public class NRepeatedElement_test {
    public static void main(String[] args) {
        assert NRepeatedElement.nRepeatedElement(new int[]{1, 2, 3, 3}) == 3;
        assert NRepeatedElement.nRepeatedElement(new int[]{2, 1, 2, 5, 3, 2}) == 2;
        assert NRepeatedElement.nRepeatedElement(new int[]{5, 1, 5, 2, 5, 3, 5, 4}) == 5;
        assert NRepeatedElement.nRepeatedElement(new int[]{1, 1}) == 1;
        assert NRepeatedElement.nRepeatedElement(new int[]{9, 9, 1, 2}) == 9;
        assert NRepeatedElement.nRepeatedElement(new int[]{1, 2, 3, 4, 5, 3, 3, 3}) == 3;
        assert NRepeatedElement.nRepeatedElement(new int[]{7, 7, 7, 7}) == 7;
        assert NRepeatedElement.nRepeatedElement(new int[]{-1, -1, 2, 3}) == -1;

        System.out.println("All tests passed!");
    }
}
