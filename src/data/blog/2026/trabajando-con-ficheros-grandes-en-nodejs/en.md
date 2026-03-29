---
title: "Large files processing performance in Node.js"
pubDatetime: 2026-03-30
description: When working with large files in Node.js, the choice of processing strategy can make a dramatic difference in both performance and memory consumption. In this post, we'll explore three different approaches to processing a CSV file and analyze their trade-offs using a real-world performance comparison.
tags: [node.js, csv, javascript]
draft: true
lang: en
slug: large-files-processing-in-nodejs
---

After my sabbatical and returning to the industry as a frontend developer, it had been a while since I dealt with Node.js-related problems. Wanting to brush off the rust, I decided to do a performance exercise with Node.js and CSV files. I came up with a simple problem that would allow me to compare different approaches to processing large files. The result is an analysis of three distinct methods for processing a CSV file and their implications in terms of performance and memory usage.

## Large files processing performance: A tale of three approaches

When working with large files in Node.js, the choice of processing strategy can make a dramatic difference in both performance and memory consumption. In this post, we'll explore three different approaches to processing a CSV file and analyze their trade-offs using a real-world performance comparison.

> The complete source code and performance benchmarks for this comparison are available in the [GitHub repository](https://github.com/your-repo/csv-parser-performance).


### The Problem

Imagine you need to process a CSV file containing millions of user records. Each record has an ID, name, email, and age. Your task is to:

1. Validate email addresses (must contain '@')
2. Validate ages (must be positive numbers)
3. Transform names to uppercase
4. Write valid records to an output file
5. Skip invalid records

This is a common scenario in data processing workflows, and the approach you choose can significantly impact your application's performance, especially when dealing with large datasets.

### The Dataset

For our performance tests, we used two datasets:
- <u>Small dataset</u>: 5 million records (~375 MB)
- <u>Large dataset</u>: 100 million records (~7.32 GB)

Both datasets contained intentionally invalid records (emails without '@' symbols and non-numeric ages) to test our validation logic.

### Approach 1: The Naive Solution - Load Everything Into Memory

The first approach is the most straightforward: read the entire file into memory, split it into lines, and process each line sequentially.

```javascript
async processUsers() {
  const stats = new Stats();

  try {
    const csv = await fs.readFile(this.inputFilePath, 'utf8');
    if (!csv.trim()) {
      return stats;
    }

    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const [headers, ...lines] = csv.split(EOL);
    this.#processHeaders(headers);

    for (const line of lines) {
      await this.#processUsersLine(line, stats);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}
```

#### Pros:
- <u>Simple to implement</u>: Straightforward logic that's easy to understand
- <u>Fast for small files</u>: No stream overhead for smaller datasets

#### Cons:
- <u>Memory intensive</u>: Loads the entire file into memory at once
- <u>Not scalable</u>: Fails with very large files that exceed available RAM
- <u>Blocking</u>: Ties up memory for the entire duration of processing

#### Performance Results (5M records)
- <u>Execution Time</u>: 2m 21.66s
- <u>Peak Memory</u>: 1.09 GB

### Approach 2: Streaming - Processing Line by Line

The second approach uses Node.js streams to read the file line by line, significantly reducing memory usage.

```javascript
async processUsersAsStream() {
  const stats = new Stats();
  const lines = this.#getLines();

  try {
    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const { value } = await lines.next();
    this.#processHeaders(value);

    for await (const line of lines) {
      await this.#processUsersLine(line, stats);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}

#getLines() {
  const rl = readline.createInterface({
    input: createReadStream(this.inputFilePath, { encoding: 'utf-8' }),
    crlfDelay: Infinity,
  });
  return rl[Symbol.asyncIterator]();
}
```

#### Pros:
- <u>Memory efficient</u>: Only keeps one line in memory at a time
- <u>Scalable</u>: Can handle files larger than available RAM
- <u>Consistent memory usage</u>: Memory consumption remains stable regardless of file size

#### Cons:
- <u>Sequential processing</u>: Processes one line at a time, which can be slow
- <u>I/O bound</u>: Limited by sequential file operations

#### Performance Results (5M records)
- <u>Execution Time</u>: 2m 22.51s
- <u>Peak Memory</u>: 31.35 MB

Notice how the memory usage dropped from over 1 GB to just 31 MB, but the execution time remained similar for the small dataset.

### Approach 3: Streaming + Concurrency - The Best of Both Worlds

The third approach combines the memory efficiency of streaming with the speed of concurrent processing using controlled batching.

```javascript
async processUsersAsStreamAndConcurrency() {
  const batchSize = 1000; // Number of lines to process concurrently
  const stats = new Stats();
  const lines = this.#getLines();

  try {
    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const { value } = await lines.next();
    this.#processHeaders(value);
    let promises = [];

    for await (const line of lines) {
      promises.push(this.#processUsersLine(line, stats));

      if (promises.length >= batchSize) {
        await Promise.allSettled(promises);
        promises = [];
      }
    }

    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}
```

#### Pros:
- <u>Memory efficient</u>: Maintains low memory usage like pure streaming
- <u>Fast processing</u>: Uses concurrency to speed up I/O operations
- <u>Scalable</u>: Handles large files efficiently
- <u>Controlled resource usage</u>: Batch size limits concurrent operations

#### Cons:
- <u>More complex</u>: Requires careful handling of concurrent operations
- <u>Requires tuning</u>: Batch size needs to be optimized for the use case

#### Performance Results (5M records)
- <u>Execution Time</u>: 39.65s
- <u>Peak Memory</u>: 41.05 MB

This approach achieved a <u>3.6x speedup</u> compared to the other methods while maintaining low memory usage!

### Performance Analysis

#### Small Dataset (5 Million Records)

| Metric | Normal | Stream | Stream + Concurrency |
|--------|--------|--------|---------------------|
| <u>Execution Time</u> | 2m 21.66s | 2m 22.51s | 39.65s |
| <u>Peak Memory</u> | 1.09 GB | 31.35 MB | 41.05 MB |
| <u>Memory Efficiency</u> | ❌ Poor | ✅ Excellent | ✅ Excellent |
| <u>Speed</u> | ⚠️ Moderate | ⚠️ Moderate | ✅ Fast |

#### Large Dataset (100 Million Records)

| Metric | Stream | Stream + Concurrency |
|--------|--------|---------------------|
| <u>Execution Time</u> | 43m 27.12s | 13m 44.32s |
| <u>Peak Memory</u> | 37.65 MB | 42.23 MB |
| <u>Speed Improvement</u> | Baseline | <u>3.16x faster</u> |

*Note: The normal approach was not tested on the large dataset as it would likely cause out-of-memory errors.*

### Key Takeaways

1. <u>Memory vs Speed Trade-off</u>: The normal approach is fast for small files but consumes enormous amounts of memory. For large files, it's simply not viable.
1. <u>Streaming Solves Memory Issues</u>: Pure streaming dramatically reduces memory usage, making it possible to process files larger than available RAM.
2. <u>Concurrency Provides Speed</u>: Adding controlled concurrency to streaming provides the best of both worlds - low memory usage and high performance.
3. <u>Scalability Matters</u>: The performance gap between approaches becomes more pronounced as file size increases. On the 100M record dataset, stream + concurrency was over 3x faster than pure streaming.
4. <u>Batch Size Tuning</u>: The concurrent approach uses batches of 1000 operations. This number should be tuned based on your system's capabilities and the nature of your processing operations.

### When to Use Each Approach

#### Normal (Load All)
- ✅ Small files (< 100MB)
- ✅ Simple processing logic
- ❌ Large files
- ❌ Memory-constrained environments

#### Streaming
- ✅ Large files
- ✅ Memory-constrained environments
- ✅ Consistent, predictable memory usage
- ⚠️ When processing speed is not critical

#### Streaming + Concurrency
- ✅ Large files
- ✅ Performance-critical applications
- ✅ Production environments
- ✅ When you need both memory efficiency and speed

### Implementation Notes

The complete implementation includes:
- <u>Memory monitoring</u>: Peak memory usage tracking during execution
- <u>Progress reporting</u>: Real-time statistics on processing progress
- <u>Error handling</u>: Proper cleanup of resources on failure
- <u>Validation logic</u>: Email and age validation with detailed statistics
- <u>Performance measurement</u>: Comprehensive timing and memory analysis

### Conclusion

When processing large files, the choice of approach can make the difference between a system that scales and one that crashes. While the naive approach might work for small datasets, streaming with controlled concurrency provides the optimal balance of memory efficiency and performance for production systems.

The 3.6x performance improvement and 96% memory reduction achieved by the streaming + concurrency approach demonstrates the value of thoughtful architecture decisions in data processing applications.
