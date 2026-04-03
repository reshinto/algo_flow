import java.util.ArrayList;
import java.util.List;

public class PatienceSort {
    private static int findPileIndex(List<Integer> pileTops, int cardValue) { // @step:compare
        // Binary search for the leftmost pile whose top is >= cardValue
        int leftBound = 0; // @step:compare
        int rightBound = pileTops.size(); // @step:compare

        while (leftBound < rightBound) { // @step:compare
            int midIndex = (leftBound + rightBound) / 2; // @step:compare
            if (pileTops.get(midIndex) < cardValue) { // @step:compare
                leftBound = midIndex + 1; // @step:compare
            } else {
                rightBound = midIndex; // @step:compare
            }
        }

        return leftBound; // @step:compare
    }

    public static int[] patienceSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize

        if (arrayLength == 0) { // @step:initialize
            return new int[0]; // @step:complete
        }

        List<List<Integer>> piles = new ArrayList<>(); // @step:initialize
        List<Integer> pileTops = new ArrayList<>(); // @step:initialize

        // Place each card into the leftmost valid pile
        for (int cardIndex = 0; cardIndex < arrayLength; cardIndex++) { // @step:place-card
            int cardValue = inputArray[cardIndex]; // @step:place-card
            int targetPileIndex = findPileIndex(pileTops, cardValue); // @step:compare

            if (targetPileIndex == piles.size()) { // @step:place-card
                List<Integer> newPile = new ArrayList<>(); // @step:place-card
                newPile.add(cardValue); // @step:place-card
                piles.add(newPile); // @step:place-card
                pileTops.add(cardValue); // @step:place-card
            } else {
                piles.get(targetPileIndex).add(cardValue); // @step:place-card
                pileTops.set(targetPileIndex, cardValue); // @step:place-card
            }
        }

        // Merge all piles into sorted output using k-way merge
        int[] sortedArray = new int[arrayLength]; // @step:merge-piles
        int outputIndex = 0; // @step:merge-piles

        while (outputIndex < arrayLength) { // @step:merge-piles
            int minimumValue = Integer.MAX_VALUE; // @step:compare
            int minimumPileIndex = 0; // @step:compare

            for (int pileIndex = 0; pileIndex < piles.size(); pileIndex++) { // @step:compare
                List<Integer> pile = piles.get(pileIndex); // @step:compare
                if (!pile.isEmpty()) { // @step:compare
                    int pileTop = pile.get(pile.size() - 1); // @step:compare
                    if (pileTop < minimumValue) { // @step:compare
                        minimumValue = pileTop; // @step:compare
                        minimumPileIndex = pileIndex; // @step:compare
                    }
                }
            }

            List<Integer> winningPile = piles.get(minimumPileIndex); // @step:swap
            sortedArray[outputIndex] = winningPile.remove(winningPile.size() - 1); // @step:swap
            outputIndex++; // @step:swap
        }

        // @step:mark-sorted
        return sortedArray; // @step:complete
    }
}
