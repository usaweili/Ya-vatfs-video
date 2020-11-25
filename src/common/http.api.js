import http from "./http";

const api = {
  getSearch: params => {
    return http.get("/search", { params });
  },
  getDetail: id => {
    return http.get("/getVDetail", { params: { vid: id } });
  }
};
export default api;
