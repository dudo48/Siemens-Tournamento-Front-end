export const getRequest = (url: string) => fetch(url).then((res) => res.json());
export const postRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (e) {
      return null;
    }
  })
);
export const putRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (e) {
      return null;
    }
  })
);
export const deleteRequest = (url: string) => fetch(url, {method: 'DELETE'}).then((res) => res.json());