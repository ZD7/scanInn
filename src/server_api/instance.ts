import axios from "axios";

const baseURL = "https://gateway.scan-interfax.ru/api/v1/";

export const instanceScan = axios.create({
  baseURL: baseURL,
});

instanceScan.interceptors.request.use((config:any) => {
  return {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${localStorage.getItem("accessToken") || "asf"}` },
  }
});


instanceScan.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // eslint-disable-next-line no-restricted-globals
    if (error.response.status === 401 && !location.href.includes("/login")) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      // eslint-disable-next-line no-restricted-globals
      location.href = "/"
    }

    return Promise.reject(error)
  }
)


