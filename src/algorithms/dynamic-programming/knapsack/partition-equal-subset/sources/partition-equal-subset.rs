// Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets

fn partition_equal_subset(numbers: &[i64]) -> bool {
    // @step:initialize
    let total_sum: i64 = numbers.iter().sum(); // @step:initialize
    if total_sum % 2 != 0 {
        return false; // @step:initialize
    }
    let target = (total_sum / 2) as usize; // @step:initialize
    let table_size = target + 1; // @step:initialize
    let mut dp_table = vec![0u8; table_size]; // @step:initialize,fill-table
    dp_table[0] = 1; // @step:fill-table
    // For each number, iterate right-to-left to prevent using it more than once
    for &current_number in numbers {
        let current_number = current_number as usize; // @step:compute-cell
        let mut sum_index = target;
        while sum_index >= current_number {
            if dp_table[sum_index - current_number] == 1 {
                // @step:read-cache
                dp_table[sum_index] = 1; // @step:compute-cell
            }
            if sum_index == 0 {
                break;
            }
            sum_index -= 1;
        }
    }
    dp_table[target] == 1 // @step:complete
}

fn main() {
    let numbers = vec![1, 5, 11, 5];
    let result = partition_equal_subset(&numbers);
    println!("Can partition {:?}: {}", numbers, result);
}
