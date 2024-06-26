# HTTP2

**Related files:**

- [server.ts](src/shared/infra/http/server.ts)
- [controller](https://github.com/natserract/backend-trainee/blob/3e5ac3d9fbee63d1acca2602483dd044aacfb48f/apps/http2/src/shared/infra/http/controller/index.ts#L5)

**Generate certificate locally:**

```sh
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
...
$ openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key
...
$ rm server.pass.key
$ openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
...
A challenge password []:
...
$ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

**Running:**
Use `https` protocol

```sh
npx h2url https://localhost:3001
```

## References:

- https://http2-explained.haxx.se/en/part5
- https://nodejs.org/api/http2.html
