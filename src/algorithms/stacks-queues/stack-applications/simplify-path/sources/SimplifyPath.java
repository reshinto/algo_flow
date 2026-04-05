// Simplify Path — use a stack to resolve Unix path components into a canonical path
import java.util.ArrayDeque;
import java.util.Deque;

public class SimplifyPath {
    public static String simplifyPath(String inputString) {
        Deque<String> dirStack = new ArrayDeque<>(); // @step:initialize
        String[] components = inputString.split("/"); // @step:initialize
        for (int partIdx = 0; partIdx < components.length; partIdx++) {
            String component = components[partIdx]; // @step:visit
            if (component.equals("") || component.equals(".")) {
                // Skip empty segments and current-directory markers
                continue; // @step:visit
            } else if (component.equals("..")) {
                // Parent-directory marker — pop top of stack if non-empty
                if (!dirStack.isEmpty()) {
                    dirStack.pop(); // @step:pop
                }
            } else {
                // Valid directory name — push onto stack
                dirStack.push(component); // @step:push
            }
        }
        // Join accumulated directories with leading slash
        StringBuilder result = new StringBuilder(); // @step:complete
        for (String dir : dirStack) {
            result.insert(0, "/" + dir); // @step:complete
        }
        return result.length() == 0 ? "/" : result.toString(); // @step:complete
    }
}
