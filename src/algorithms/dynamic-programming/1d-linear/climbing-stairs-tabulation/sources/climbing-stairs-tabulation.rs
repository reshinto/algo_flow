// Climbing stairs tabulation — count ways to reach the top

fn climbing_stairs_tabulation(number_of_stairs: usize) -> usize {
    // @step:initialize
    if number_of_stairs <= 1 {
        return 1; // @step:initialize
    }
    let mut dp_table = vec![0usize; number_of_stairs + 1]; // @step:initialize,fill-table
    dp_table[0] = 1; // @step:fill-table
    dp_table[1] = 1; // @step:fill-table
    // Each entry is the sum of the ways to arrive from one step below and two steps below
    for current_step in 2..=number_of_stairs {
        // @step:compute-cell
        dp_table[current_step] = dp_table[current_step - 1] + dp_table[current_step - 2]; // @step:compute-cell,read-cache
    }
    dp_table[number_of_stairs] // @step:complete
}

fn main() {
    let number_of_stairs = 7;
    let result = climbing_stairs_tabulation(number_of_stairs);
    println!("Ways to climb {} stairs: {}", number_of_stairs, result);
}
