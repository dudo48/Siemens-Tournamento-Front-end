export const getRequest = (url: string) => fetch(url).then((res) => res.json());
export const postRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then((res) => {
    let result;
    try {
      result = res.json();
    } catch (e) {
      result = null;
    }
    return result;
  })
);
export const putRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then((res) => {
    let result;
    try {
      result = res.json();
    } catch (e) {
      result = null;
    }
    return result;
  })
);
export const deleteRequest = (url: string) => fetch(url, {method: 'DELETE'}).then((res) => res.json());