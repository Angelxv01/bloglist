export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, serializedState) => {
  const stringifyState = JSON.stringify(serializedState);
  localStorage.setItem(state, stringifyState);
};

export const removeState = (state) => {
  localStorage.removeItem(state);
};
