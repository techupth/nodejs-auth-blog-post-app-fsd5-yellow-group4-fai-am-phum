import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    axios.interceptors.request.use((req) => {
      const hasToken = Boolean(window.localStorage.getItem("token"));

      if (hasToken) {
        req.headers = {
          ...req.headers,
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };
      }
    });

    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/");
      }
    }
  );

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      // 🐨 Todo: Exercise #6
      //  ให้เขียน Logic ในการรองรับเมื่อ Server ได้ Response กลับมาเป็น Error
      // โดยการ Redirect ผู้ใช้งานไปที่หน้า Login และลบ Token ออกจาก Local Storage
      // ภายใน Error Callback Function ของ axios.interceptors.response.use

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
