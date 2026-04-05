// Flatten Nested List Iterator — use a stack to peel nested lists layer by layer
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class FlattenNestedListIterator {
    public static List<Integer> flattenNestedListIterator(List<Object> nestedList) {
        Deque<Object> stack = new ArrayDeque<>(); // @step:initialize
        for (int itemIdx = nestedList.size() - 1; itemIdx >= 0; itemIdx--) {
            stack.push(nestedList.get(itemIdx)); // @step:initialize
        }
        List<Integer> result = new ArrayList<>(); // @step:initialize
        while (!stack.isEmpty()) {
            Object top = stack.pop(); // @step:pop
            if (top instanceof Integer) {
                result.add((Integer) top); // @step:visit
            } else {
                @SuppressWarnings("unchecked")
                List<Object> subList = (List<Object>) top;
                for (int itemIdx = subList.size() - 1; itemIdx >= 0; itemIdx--) {
                    stack.push(subList.get(itemIdx)); // @step:push
                }
            }
        }
        return result; // @step:complete
    }
}
