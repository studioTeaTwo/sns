export function compareCreated<T>(a: T, b: T): number {
  if (a['createdAt'] < b['createdAt']) {
    return -1;
  }
  if (a['createdAt'] > b['createdAt']) {
    return 1;
  }
  return 0;
}

export function compareUpdated<T>(a: T, b: T): number {
  if (a['updatedAt'] < b['updatedAt']) {
    return -1;
  }
  if (a['updatedAt'] > b['updatedAt']) {
    return 1;
  }
  return 0;
}

export function unique(array: Array<any>) {
  return array.filter((value, index, self) => {
    return self.findIndex(value2 => value.id === value2.id ) === index;
  });
}
