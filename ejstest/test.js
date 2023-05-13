console.log("test");

console.log(test(10, 50).test);

function test(a, b) {
  let out = a + b;
  let test = true;
  return {
    out,
    test,
  };
}
