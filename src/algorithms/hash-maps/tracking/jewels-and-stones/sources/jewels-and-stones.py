# Jewels and Stones — count how many stones are also jewels using a hash set
def jewels_and_stones(jewels, stones):
    jewel_set = set()  # @step:initialize
    for jewel_idx in range(len(jewels)):
        jewel_set.add(jewels[jewel_idx])  # @step:insert-key
    count = 0
    for stone_idx in range(len(stones)):
        stone = stones[stone_idx]
        if stone in jewel_set:  # @step:lookup-key
            count += 1  # @step:key-found
        else:
            pass  # @step:key-not-found
    return count  # @step:complete
