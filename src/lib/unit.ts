export const setUnit = ({ id, name }: { id: string; name: string }) => {
  sessionStorage.setItem('unitId', id);
  sessionStorage.setItem('unitName', name);
};

export const unsetUnit = () => {
  sessionStorage.removeItem('unitId');
  sessionStorage.removeItem('unitName');
};

export const getUnit = () => {
  const unitId = sessionStorage.getItem('unitId');
  const unitName = sessionStorage.getItem('unitName');
  return {
    unitId,
    unitName,
  };
};

export const generateUnitId = (unitName: string) => {
  return Date.now().toLocaleString().concat(unitName);
};
