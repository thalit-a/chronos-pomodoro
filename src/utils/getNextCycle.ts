export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1; //se o cycle for 0 ou 8 ele passa para 1, se não for, ele será o número atual +1
}