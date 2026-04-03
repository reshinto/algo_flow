import java.util.ArrayList;
import java.util.List;

public class SmoothSort {
    public static int[] smoothSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) return sortedArray; // @step:initialize

        // Precompute Leonardo numbers
        List<Integer> leonardoNumbers = new ArrayList<>(); // @step:initialize
        leonardoNumbers.add(1);
        leonardoNumbers.add(1);
        while (leonardoNumbers.get(leonardoNumbers.size() - 1) < arrayLength) {
            int len = leonardoNumbers.size();
            leonardoNumbers.add(leonardoNumbers.get(len - 1) + leonardoNumbers.get(len - 2) + 1);
        }

        // Build Leonardo heap forest
        List<int[]> heapRoots = new ArrayList<>(); // each entry: [rootIndex, order]

        for (int buildIndex = 0; buildIndex < arrayLength; buildIndex++) { // @step:build-heap
            int rootCount = heapRoots.size();
            if (rootCount >= 2 && heapRoots.get(rootCount - 2)[1] == heapRoots.get(rootCount - 1)[1] + 1) {
                int prevOrder = heapRoots.get(rootCount - 2)[1];
                heapRoots.remove(rootCount - 1);
                heapRoots.remove(rootCount - 2);
                heapRoots.add(new int[]{buildIndex, prevOrder + 1});
            } else if (rootCount >= 1 && heapRoots.get(rootCount - 1)[1] == 1) {
                heapRoots.add(new int[]{buildIndex, 0});
            } else {
                heapRoots.add(new int[]{buildIndex, 1});
            }

            int currentOrder = heapRoots.get(heapRoots.size() - 1)[1];
            trinkle(sortedArray, buildIndex, currentOrder, heapRoots.subList(0, heapRoots.size() - 1), leonardoNumbers);
        }

        // Extract phase
        for (int extractIndex = arrayLength - 1; extractIndex >= 0; extractIndex--) { // @step:extract
            int currentOrder = heapRoots.get(heapRoots.size() - 1)[1];
            heapRoots.remove(heapRoots.size() - 1);

            if (currentOrder >= 2) {
                int rightRoot = extractIndex - 1;
                int leftRoot = extractIndex - 1 - leonardoNumbers.get(currentOrder - 2);
                heapRoots.add(new int[]{leftRoot, currentOrder - 2});
                heapRoots.add(new int[]{rightRoot, currentOrder - 1});

                trinkle(sortedArray, leftRoot, currentOrder - 2, heapRoots.subList(0, heapRoots.size() - 2), leonardoNumbers);
                trinkle(sortedArray, rightRoot, currentOrder - 1, heapRoots.subList(0, heapRoots.size() - 1), leonardoNumbers);
            }
            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }

    private static void sift(int[] sortedArray, int rootIndex, int order, List<Integer> leonardoNumbers) { // @step:build-heap
        int currentRoot = rootIndex;
        int currentOrder = order;

        while (currentOrder >= 2) {
            int rightChild = currentRoot - 1; // @step:compare
            int leftChild = currentRoot - 1 - leonardoNumbers.get(currentOrder - 2); // @step:compare

            int largestIndex = currentRoot;
            if (rightChild >= 0 && sortedArray[rightChild] > sortedArray[largestIndex]) {
                largestIndex = rightChild; // @step:compare
            }
            if (leftChild >= 0 && sortedArray[leftChild] > sortedArray[largestIndex]) {
                largestIndex = leftChild; // @step:compare
            }

            if (largestIndex == currentRoot) break;

            int temporaryValue = sortedArray[currentRoot]; // @step:swap
            sortedArray[currentRoot] = sortedArray[largestIndex]; // @step:swap
            sortedArray[largestIndex] = temporaryValue; // @step:swap

            currentOrder = (largestIndex == rightChild) ? currentOrder - 1 : currentOrder - 2;
            currentRoot = largestIndex;
        }
    }

    private static void trinkle(int[] sortedArray, int rootIndex, int order, List<int[]> heapRoots, List<Integer> leonardoNumbers) { // @step:build-heap
        int currentRoot = rootIndex;
        int currentOrder = order;
        List<int[]> mutableRoots = new ArrayList<>(heapRoots);

        while (!mutableRoots.isEmpty()) {
            int[] lastEntry = mutableRoots.get(mutableRoots.size() - 1);
            int prevRoot = lastEntry[0];
            int prevOrder = lastEntry[1];

            if (sortedArray[currentRoot] >= sortedArray[prevRoot]) break; // @step:compare

            if (currentOrder >= 2) {
                int rightChild = currentRoot - 1;
                int leftChild = currentRoot - 1 - leonardoNumbers.get(currentOrder - 2);
                if (sortedArray[prevRoot] <= sortedArray[rightChild] || sortedArray[prevRoot] <= sortedArray[leftChild]) { // @step:compare
                    break;
                }
            }

            int temporaryValue = sortedArray[currentRoot]; // @step:swap
            sortedArray[currentRoot] = sortedArray[prevRoot]; // @step:swap
            sortedArray[prevRoot] = temporaryValue; // @step:swap

            mutableRoots.remove(mutableRoots.size() - 1);
            currentRoot = prevRoot;
            currentOrder = prevOrder;
        }

        sift(sortedArray, currentRoot, currentOrder, leonardoNumbers);
    }
}
