# Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
def isomorphic_strings(text_a, text_b):
    a_to_b = {}  # @step:initialize
    b_to_a = {}  # @step:initialize
    if len(text_a) != len(text_b):  # @step:initialize
        return False
    for char_index in range(len(text_a)):
        char_a = text_a[char_index]
        char_b = text_b[char_index]
        mapped_b = a_to_b.get(char_a)  # @step:lookup-key
        mapped_a = b_to_a.get(char_b)  # @step:lookup-key
        if mapped_b is None and mapped_a is None:
            a_to_b[char_a] = char_b  # @step:insert-key
            b_to_a[char_b] = char_a  # @step:insert-key
        elif mapped_b == char_b and mapped_a == char_a:
            continue  # @step:key-found
        else:
            return False  # @step:key-not-found
    return True  # @step:complete
