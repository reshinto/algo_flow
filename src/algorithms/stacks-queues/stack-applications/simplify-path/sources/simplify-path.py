# Simplify Path — use a stack to resolve Unix path components into a canonical path
def simplify_path(input_string):
    dir_stack = []  # @step:initialize
    components = input_string.split("/")  # @step:initialize
    for component in components:  # @step:visit
        if component == "" or component == ".":
            # Skip empty segments and current-directory markers
            continue  # @step:visit
        elif component == "..":
            # Parent-directory marker — pop top of stack if non-empty
            if dir_stack:
                dir_stack.pop()  # @step:pop
        else:
            # Valid directory name — push onto stack
            dir_stack.append(component)  # @step:push
    # Join accumulated directories with leading slash
    return "/" + "/".join(dir_stack)  # @step:complete
