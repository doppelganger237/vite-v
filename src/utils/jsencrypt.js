import JSEncrypt from "jsencrypt/bin/jsencrypt.min";

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9BkLc6Pk42cV6G2vEUbFANUsf
T+5w077Ka2Zjx7Iek3ksAL0hPSHWZfzOjBWMaJP5ITCKtxd8BliLZ6F7OMjZmdzz
q3VN3qPT3LoUnLw4DRNwO13Kt1dveKys8+PQCC1aV9Kqak5R6VxFzGJKZ1d394F2
OTtfk0tNQUQ+niwiXQIDAQAB`;

const privateKey = `MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAL0GQtzo+TjZxXob
a8RRsUA1Sx9P7nDTvsprZmPHsh6TeSwAvSE9IdZl/M6MFYxok/khMIq3F3wGWItn
oXs4yNmZ3POrdU3eo9PcuhScvDgNE3A7Xcq3V294rKzz49AILVpX0qpqTlHpXEXM
YkpnV3f3gXY5O1+TS01BRD6eLCJdAgMBAAECgYASynONKG/WEfgKqn0tF/3p5yJf
q3+FodceokyccLapSXnLQQuMKVqayKq4Eb72pVLIel8r+wWPo8XbneK0sDFvHJZa
Ip1avScQyEv6o/qxIXka5DUJtLzR+nb6KXhy1eNHUL2Wt8OcrUeUavI0tYR1N46e
lxAmOW7raoDoxt+qdQJBAOJyOko/sZbOZ0n3E1CI7zcy1Gi/LkMpmzERvniUEDIQ
AVirgSlwrUL3gePofakVxTnXK9hbHUklgcJ+ywiZ/X8CQQDVsb07WaEN9h6Fc1HF
9YymesilFKdOyjDiYsGDB0eBUFfbPfkQra/ufOdUoKK/tDYPhVk0Z8/NsrV5VgC8
koYjAkA2+7dtmeOcE4f+7LBS6Lz08TGkMW+hPTQCiSVvj7wS+9Hn3tTg5Awd640t
cqE4ciHOdpGd2hnVTfcg67qO3x0vAkAUc24ov+sp6uQA4Yhx6Y4MYLPTGKbqY29K
OylJ4Oh297lwwf2UGws7R7jb4IOy1QxXb+uZmFXK2c+ETTbE1UEBAkAkZak1Ev3o
nN+xnxyhwLs0HLJH+LesQv3Ts9LN7Z9b7gpP+uk70/zar3ZtJqilQucQxK4WKJtn
QfubxPivj9en`;

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}
