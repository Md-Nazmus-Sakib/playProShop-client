export const areIdsSame = (
  productIds: string[],
  quantities: { [id: string]: number }
): boolean => {
  if (!productIds || !quantities) {
    return false;
  }

  const quantityIds = Object.keys(quantities);

  if (productIds.length !== quantityIds.length) {
    return false;
  }

  const sortedProductIds = [...productIds].sort();
  const sortedQuantityIds = quantityIds.sort();

  return sortedProductIds.every((id, index) => id === sortedQuantityIds[index]);
};
