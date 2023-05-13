export const getRequest = (url: string) => fetch(url).then(async (res) => res.json());
export const postRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then(async (res) => {
    let json;
    try {
      json = await res.json();
    } catch (e) {
      json = null;
    }

    return {data: json, status: res.ok};
  })
);
export const putRequest = (url: string, payload?: {[key: string]: any}) => (
  fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    ...(payload && { body: JSON.stringify(payload) })
  }).then(async (res) => {
    let json;
    try {
      json = await res.json();
    } catch (e) {
      json = null;
    }

    return {data: json, status: res.ok};
  })
);
export const deleteRequest = (url: string) => fetch(url, {
  method: 'DELETE'
}).then(async (res) => {
  let json;
  try {
    json = await res.json();
  } catch (e) {
    json = null;
  }

  return {data: json, status: res.ok}
});