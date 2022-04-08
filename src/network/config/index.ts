import Base64 from "@/utils/base64";
import format from "@/utils/format";
export const baseData = () => {
  return {
    timestamp: format.getTimeStamp(),
    sig: format.getSig(),
    qxid: 1,
    appid: "wxbe6756ab2557a17b",
  };
};

export const tokenData = () => {
  const tokenData: any = {};
  const token: any = Base64.decodeToObj(uni.getStorageSync("token"));
  if (token) {
    tokenData.openid = token.openid;
    tokenData.sns = token.softname;
    tokenData.uid = token.uid;
    tokenData.cnstr = token.csname;
    tokenData.csname = token.csname;
    tokenData.uname = token.uname;
    tokenData.upwd = token.upwd;
  }
  return tokenData;
};
