# JS Testing Frameworks Benchmark

## Idea

Borrowed from <https://vitalets.github.io/js-testrunners-bench/index.html>.

## Frameworks to Benchmark

- Mocha: <https://github.com/mochajs/mocha>
- Jest: <https://github.com/jestjs/jest>
- Jasmine: <https://github.com/jasmine/jasmine>

## Run on your own Machine

```sh
npm install
npm run main
```

You can specify the number of sample times
per case as the script's first argument
(default is 3):

```sh
npm run main 10
```

More sample times, more accurate benchmark,
but the script would take longer to run.

Results are sorted in the order of
increasing *mean time*, not total time.
