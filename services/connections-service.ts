const baseUrl = 'http://localhost:5000/connections';

const sendRequest = async (fromId: number, toEmail: string) => {
  const url = `${baseUrl}/postRequest/${fromId}/${toEmail}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result
}

const deleteConnection = async (fromId: number, toId: number) => {
  const url = `${baseUrl}/deleteConnection/${fromId}/${toId}`;

  const options = {
    method: 'DELETE'
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result
}

const acceptRequest = async (fromId: number, toId: number) => {
  const url = `${baseUrl}/acceptRequest/${fromId}/${toId}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result
}

const declineRequest = async (fromId: number, toId: number) => {
  const url = `${baseUrl}/deleteRequest/${fromId}/${toId}`;

  const options = {
    method: 'DELETE'
  };

  const response = await fetch(url, options);
  const result = await response.json();

  return result
}

const getAllSent = async (id: number) => {
  const url = `${baseUrl}/getAllSent/${id}`;

  const response = await fetch(url);
  const result = await response.json();

  return result
}

const getAllIncoming = async (id: number) => {
  const url = `${baseUrl}/getAllIncoming/${id}`;

  const response = await fetch(url);
  const result = await response.json();

  return result
}

const getAll = async (id: number) => {
  const url = `${baseUrl}/getAllConnections/${id}`;

  const response = await fetch(url);
  const result = await response.json();

  return result
}

const connectionsService = {sendRequest, deleteConnection, acceptRequest, declineRequest, getAll, getAllSent, getAllIncoming}
export default connectionsService