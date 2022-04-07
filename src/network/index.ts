import kbBaseRequest from "./request";

const baseRequest = new kbBaseRequest({
  baseUrl: "https://kbapi.dianlan8.com:7804/kbapi/rest/",
  isTaskBaseData: true,
  isShowLoading: true,
});

export default baseRequest;
