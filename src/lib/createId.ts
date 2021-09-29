const createId = () => {
  const maxId = JSON.parse(localStorage.getItem('maxId') || '-1')
  localStorage.setItem('maxId',maxId + 1 + '')
  return maxId + 1;
};
export {createId};