import java.util.Arrays;

public class TournamentSort {
    private static final int TOURNAMENT_INFINITY = Integer.MAX_VALUE;

    private static int[] buildTournamentTree(int[] leaves) { // @step:build-tournament
        int leafCount = leaves.length; // @step:build-tournament
        int treeSize = 2 * leafCount; // @step:build-tournament
        int[] tree = new int[treeSize]; // @step:build-tournament
        Arrays.fill(tree, TOURNAMENT_INFINITY); // @step:build-tournament

        // Place leaf values in second half of tree
        for (int leafIndex = 0; leafIndex < leafCount; leafIndex++) { // @step:build-tournament
            tree[leafCount + leafIndex] = leaves[leafIndex]; // @step:build-tournament
        }

        // Build internal nodes (winners) bottom-up
        for (int nodeIndex = leafCount - 1; nodeIndex >= 1; nodeIndex--) { // @step:compare
            int leftChild = 2 * nodeIndex; // @step:compare
            int rightChild = 2 * nodeIndex + 1; // @step:compare
            tree[nodeIndex] = tree[leftChild] <= tree[rightChild] ? tree[leftChild] : tree[rightChild]; // @step:compare
        }

        return tree; // @step:build-tournament
    }

    private static int extractWinnerAndRebuild(int[] tree, int leafCount) { // @step:extract-winner
        int winner = tree[1]; // @step:extract-winner

        // Find the leaf that held the winner and replace with infinity
        int nodeIndex = 1; // @step:extract-winner
        while (nodeIndex < leafCount) { // @step:compare
            int leftChild = 2 * nodeIndex; // @step:compare
            int rightChild = 2 * nodeIndex + 1; // @step:compare
            nodeIndex = tree[leftChild] == winner ? leftChild : rightChild; // @step:compare
        }

        tree[nodeIndex] = TOURNAMENT_INFINITY; // @step:extract-winner

        // Rebuild internal nodes upward
        nodeIndex /= 2; // @step:build-tournament
        while (nodeIndex >= 1) { // @step:build-tournament
            int leftChild = 2 * nodeIndex; // @step:build-tournament
            int rightChild = 2 * nodeIndex + 1; // @step:build-tournament
            tree[nodeIndex] = tree[leftChild] <= tree[rightChild] ? tree[leftChild] : tree[rightChild]; // @step:compare
            nodeIndex /= 2; // @step:build-tournament
        }

        return winner; // @step:extract-winner
    }

    public static int[] tournamentSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize

        if (arrayLength == 0) { // @step:initialize
            return new int[0]; // @step:complete
        }

        int[] leaves = inputArray.clone(); // @step:initialize
        int[] tree = buildTournamentTree(leaves); // @step:build-tournament
        int[] sortedArray = new int[arrayLength]; // @step:extract-winner

        for (int extractIndex = 0; extractIndex < arrayLength; extractIndex++) { // @step:extract-winner
            sortedArray[extractIndex] = extractWinnerAndRebuild(tree, leaves.length); // @step:mark-sorted
        }

        // @step:mark-sorted
        return sortedArray; // @step:complete
    }
}
