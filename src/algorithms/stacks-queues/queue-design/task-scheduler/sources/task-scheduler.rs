// Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
use std::collections::HashMap;

fn task_scheduler_queue(tasks: &[&str], cooldown: i32) -> i32 {
    let mut freq_map: HashMap<&str, i32> = HashMap::new(); // @step:initialize
    for task in tasks { // @step:initialize
        *freq_map.entry(task).or_insert(0) += 1; // @step:initialize
    }

    let mut max_freq: i32 = 0; // @step:initialize
    let mut max_freq_count: i32 = 0; // @step:initialize

    for &freq in freq_map.values() { // @step:visit
        if freq > max_freq { // @step:compare
            max_freq = freq; // @step:compare
            max_freq_count = 1; // @step:compare
        } else if freq == max_freq { // @step:compare
            max_freq_count += 1; // @step:compare
        }
    }

    // Queue holds (task_name, remaining_freq, available_at_time) for cooling-down tasks
    let mut cooldown_queue: Vec<(&str, i32, i32)> = Vec::new(); // @step:enqueue

    // Sorted descending by frequency — acts as a max-heap
    let mut task_heap: Vec<(&str, i32)> = freq_map.into_iter().map(|(task, freq)| (task, freq)).collect();
    task_heap.sort_by(|entry_a, entry_b| entry_b.1.cmp(&entry_a.1)); // @step:enqueue

    let mut current_time: i32 = 0; // @step:enqueue

    while !task_heap.is_empty() || !cooldown_queue.is_empty() { // @step:visit
        current_time += 1; // @step:visit

        // Release tasks from the cooldown queue when their wait is over
        if let Some(&(task_name, remaining, available_at)) = cooldown_queue.first() {
            if available_at <= current_time { // @step:dequeue
                cooldown_queue.remove(0); // @step:dequeue
                task_heap.push((task_name, remaining)); // @step:dequeue
                task_heap.sort_by(|entry_a, entry_b| entry_b.1.cmp(&entry_a.1)); // @step:dequeue
            }
        }

        // Execute the highest-frequency available task and enqueue it to cool down
        if !task_heap.is_empty() { // @step:enqueue
            let (top_task, top_freq) = task_heap.remove(0); // @step:enqueue
            let remaining_freq = top_freq - 1; // @step:enqueue
            if remaining_freq > 0 { // @step:enqueue
                cooldown_queue.push((top_task, remaining_freq, current_time + cooldown + 1)); // @step:enqueue
            }
        }
    }

    // Greedy formula — closed-form solution is equivalent to the simulation result
    let formula_result = (max_freq - 1) * (cooldown + 1) + max_freq_count; // @step:complete
    tasks.len().max(formula_result as usize) as i32 // @step:complete
}

fn main() {
    let tasks = vec!["A", "A", "A", "B", "B", "B"];
    println!("{}", task_scheduler_queue(&tasks, 2));
}
