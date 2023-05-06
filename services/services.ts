export const getService = (url: string) => fetch(url).then((res) => res.json());
export const postService = (url: string, payload?: {[key: string]: any}) => (
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
export const deleteService = (url: string) => fetch(url, {method: 'DELETE'}).then((res) => res.json());