import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
    thresholds: {
        http_req_duration: ["p(99) < 200"],
    },
    vus: 10,
    duration: '30s',
}

export default function () {
    // how many request to /encrypt the host can handle in 30s ?
    const randomString = Math.random().toString(36).substring(2, 15)
    const res = http.get(`http://localhost:3000/encrypt?content=${randomString}`)
    check(res, { "200 OK": (r) => r.status == 200 })
}