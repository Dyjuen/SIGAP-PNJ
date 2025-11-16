import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 50,          // 50 virtual users
  duration: "10m",  // running for 10 minutes
};

export default function () {
  const url = "http://localhost:8000/api/auth/login";

  const payload = JSON.stringify({
    username: "verifikator",
    password: "verif123",
    captcha: "_MY_TEST_CAPTCHA_",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);

  // optional: pengecekan respon
  check(res, {
    "status is 200": (r) => r.status === 200,
    "got token": (r) => r.json("token") !== undefined,
  });

  // optional: kasih delay biar ga terlalu spam
  sleep(0.2);
}
