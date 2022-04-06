class format {
  // 获取十位数的时间戳
  getTimeStamp() {
    return Math.floor(new Date().getTime() / 1000);
  }

  // sig
  getSig() {
    return "8D5A815A0D79A3F0C2CCB556FFB08B27";
  }
}

export default new format();
