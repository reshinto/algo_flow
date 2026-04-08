// javac KthSmallestSortedMatrix.java KthSmallestSortedMatrix_test.java && java -ea KthSmallestSortedMatrix_test

public class KthSmallestSortedMatrix_test {

    public static void main(String[] args) {
        testFindsKthSmallest3x3K8();
        testReturnsSmallestWhenK1();
        testReturnsLargestWhenKEqualsNSquared();
        testHandles1x1Matrix();
        testHandles2x2MatrixK2();
        testHandles2x2MatrixK3();
        testHandlesAllSameValues();
        test4x4MatrixK8();
        testHandlesNegativeValues();
        test4x4MatrixK16();
        System.out.println("All tests passed!");
    }

    static void testFindsKthSmallest3x3K8() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 8) == 13;
    }

    static void testReturnsSmallestWhenK1() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 1) == 1;
    }

    static void testReturnsLargestWhenKEqualsNSquared() {
        int[][] matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 9) == 15;
    }

    static void testHandles1x1Matrix() {
        int[][] matrix = {{42}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 1) == 42;
    }

    static void testHandles2x2MatrixK2() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 2) == 2;
    }

    static void testHandles2x2MatrixK3() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 3) == 3;
    }

    static void testHandlesAllSameValues() {
        int[][] matrix = {{5, 5, 5}, {5, 5, 5}, {5, 5, 5}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 5) == 5;
    }

    static void test4x4MatrixK8() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 8) == 8;
    }

    static void testHandlesNegativeValues() {
        int[][] matrix = {{-5, -4, -3}, {-2, -1, 0}, {1, 2, 3}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 5) == -1;
    }

    static void test4x4MatrixK16() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert KthSmallestSortedMatrix.kthSmallestSortedMatrix(matrix, 16) == 16;
    }
}
