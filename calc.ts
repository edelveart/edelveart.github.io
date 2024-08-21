function sum() {
  const array: number[] = []
  for (let index = 0; index < 10; index++) {
    const element = 6 + 10 * index ** 2
    array.push(element)
  }
  return array
}

console.log(sum())
