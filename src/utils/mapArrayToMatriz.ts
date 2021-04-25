type MapArrayToMatriz = (array: Array<any>, width: number) => Array<Array<any>>;

const mapArrayToMatriz: MapArrayToMatriz = (array, width) => {
  return array.reduce((acc, crr, index) => {
    if (index % width === 0) acc.push([crr]);
    else acc[acc.length - 1].push(crr)
    return acc;
  }, [])
}

export default mapArrayToMatriz;