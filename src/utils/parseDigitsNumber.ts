/**
 * @description module to Add colons "," at any number
 */

const isEachThird = (index: number): boolean => (index + 1) % 3 === 0;

const parseDigitsNumber = (num: number) => {
  const copyArray: Array<string> = num.toString()
    .split('')
    .reverse();

  const lastIndex: number = copyArray.length -1;

  return copyArray
    .reduce((acc: Array<string>, crr: string, index: number) => {
      if (index === lastIndex) return acc.concat(crr);
      if (isEachThird(index)) return acc.concat(crr, ',');
      return acc.concat(crr)
    }, [])
    .reverse()
    .join('');
}

export default parseDigitsNumber;