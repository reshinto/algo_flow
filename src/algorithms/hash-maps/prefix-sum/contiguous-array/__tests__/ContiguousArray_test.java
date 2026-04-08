public class ContiguousArray_test {
    public static void main(String[] args) {
        assert ContiguousArray.contiguousArray(new int[]{0, 1, 0, 1, 1, 0}) == 6;
        assert ContiguousArray.contiguousArray(new int[]{0, 1}) == 2;
        assert ContiguousArray.contiguousArray(new int[]{0, 1, 0}) == 2;
        assert ContiguousArray.contiguousArray(new int[]{0, 0, 0}) == 0;
        assert ContiguousArray.contiguousArray(new int[]{1, 1, 1}) == 0;
        assert ContiguousArray.contiguousArray(new int[]{}) == 0;
        assert ContiguousArray.contiguousArray(new int[]{0, 0, 1, 1}) == 4;
        assert ContiguousArray.contiguousArray(new int[]{1, 0, 1, 0, 1}) == 4;

        System.out.println("All tests passed!");
    }
}
