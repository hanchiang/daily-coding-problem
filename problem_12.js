const { performance } = require('perf_hooks');

// Set the parameters for the problem;
const numSteps = 40;
const steps = [1, 3, 5];

/**
 *
 * @param {number} n number of steps in staircase
 * @param {number []} steps number of steps you can climb at a time
 */
function nSteps(n, steps) {
  let count = 0;

  if (n == 0) {
    return 1;
  } else if (n < 0) {
    return 0;
  } else {
    for (const step of steps) {
      count += nSteps(n - step, steps);
    }
  }
  return count;
}

let start = performance.now();
console.log('nSteps O(steps^n):', nSteps(numSteps, steps));
console.log('Time taken:', (performance.now() - start) / 1000);

/**
 * Bottom up approach: Cache the number of ways to get to step i
 * @param {number} n number of steps in staircase
 * @param {number []} steps number of steps you can climb at a time
 */
function nStepsBottomUp(n, steps) {
  let cache = [];

  cache[0] = 1;
  for (let i = 1; i <= n; i++) {
    cache[i] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < steps.length; j++) {
      if (i - steps[j] >= 0) {
        cache[i] += cache[i - steps[j]];
      }
    }
  }
  return cache[n];
}

start = performance.now();
console.log('\nnStepsBottomUp O(steps * n)', nStepsBottomUp(numSteps, steps));
console.log('Time taken:', (performance.now() - start) / 1000);

/**
 * Top down approach: Memoization, save the number of ways to get to step i
 * @param {number} n number of steps in staircase
 * @param {*} steps number of steps you can climb at a time
 */
function nStepsTopDown() {
  this.memo = {};

  this.run = function(n, steps) {
    let count = 0;

    if (n === 0) {
      return 1;
    } else if (n < 0) {
      return 0;
    } else if (this.memo[n]) {
      return this.memo[n];
    }
    for (let i = 0; i < steps.length; i++) {
      count += this.run(n - steps[i], steps);
      this.memo[n] = count;
    }
    return count;
  }
}

const topDownFn = new nStepsTopDown();
start = performance.now();
const count = topDownFn.run(numSteps, steps);
console.log('\nnStepsTopDown O(n)', count);
console.log('Time taken:', (performance.now() - start) / 1000);