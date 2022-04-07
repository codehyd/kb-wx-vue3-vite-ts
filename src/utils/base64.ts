import { Base64 } from "js-base64";

class base64 {
  // base64解码
  decode(value: string) {
    return Base64.decode(value);
  }
  // base64解码并转换为对象
  decodeToObj(value: string) {
    return JSON.parse(Base64.decode(value));
  }

  // 编码base64
  encode(value: string) {
    return Base64.encode(value);
  }

  // 将对象转换为字符串并编码base64
  objToEncode(value: object) {
    return Base64.encode(JSON.stringify(value));
  }
}

export default new base64();
