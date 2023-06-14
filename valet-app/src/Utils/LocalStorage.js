export const setItemInLs = (name,payload) => {
  localStorage.setItem(name,JSON.stringify(payload));
};

export const getItemFromLs = (name) => {
   return JSON.parse(localStorage.getItem(name));
}