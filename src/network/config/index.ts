import format from "@/utils/format";
export const baseData = () => {
  return {
    timestamp: format.getTimeStamp(),
    sig: format.getSig(),
    qxid: 1,
    appid: "wxbe6756ab2557a17b",
  };
};
