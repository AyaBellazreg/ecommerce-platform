import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDcxZDVkN2Y5NzkyMTc1YjRmNDcwMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2Njc5MDgzOCwiZXhwIjoxNjY3MDUwMDM4fQ.uW5-6cCXBnNuVuN3E5h4NUBlA4r5uvPmD94g6AmrFBg"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});