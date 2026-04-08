// Can Jump tabulation — determine if you can reach the last index from index 0

fn can_jump(nums: &[usize]) -> bool {
    // @step:initialize
    let table_size = nums.len(); // @step:initialize
    let mut dp_table = vec![0u8; table_size]; // @step:initialize,fill-table
    dp_table[0] = 1; // @step:fill-table
    // For each index, check if any prior reachable index can reach it
    for target_index in 1..table_size {
        // @step:compute-cell
        for source_index in 0..target_index {
            // @step:read-cache
            if dp_table[source_index] == 1 && source_index + nums[source_index] >= target_index {
                // @step:read-cache,compute-cell
                dp_table[target_index] = 1; // @step:compute-cell
                break;
            }
        }
    }
    dp_table[table_size - 1] == 1 // @step:complete
}

fn main() {
    let nums = vec![2, 3, 1, 1, 4];
    let result = can_jump(&nums);
    println!("Can jump {:?}: {}", nums, result);
}
