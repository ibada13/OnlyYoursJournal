import api from "./axios";

export async function get(url: string, params = {}) {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function post(url: string, data = {}) {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
