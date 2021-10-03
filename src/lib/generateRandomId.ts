export default function generateRandomId(length: number){ //length是你的id的长度，可自定义
  return Math.random().toString(36).substr(3,length);
}