const { performance } = require('perf_hooks');

const numSteps = 35;
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
function nStepsFast(n, steps) {
  let cache = [];
  let count = 0;

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
  return cache[cache.length - 1];
}

start = performance.now();
console.log('nStepsFast O(steps * n)', nStepsFast(numSteps, steps));
console.log('Time taken:', (performance.now() - start) / 1000);