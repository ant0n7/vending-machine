interface IChange {
  id: number;
  amount: number;
  inStore: number;
}

export function getChange(x: number, changeArr: IChange[]) {
  const temp = [...changeArr].sort((a, b) => b.amount - a.amount);

  for (const change of temp) {
    const count = Math.min(change.inStore, Math.floor(x / change.amount));
    if (count > 0) {
      change.inStore -= count;
      x -= change.amount * count;
    }
  }

  if (x !== 0) {
    console.log("Unable to give exact change.");
  }

  return temp;
}
