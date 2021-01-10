---
title: 'the Fetch API in JavaScript'
date: '2021-01-09'
---

# About
The browser provides the **[FETCH API][1]** for fetching resources(including CORS support) asynchronously. It is accessible globally through the `fetch()` method.

# Usage
The `FETCH API` provides 2 very important interfaces `Request` and `Response` to send HTTP requests and receive HTTP responses through `fetch()`.

<br>

## Sending a HTTP request
To make a HTTP request, we pass a `url` as the first parameter and the `Request` object as the second parameter to `fetch()`:
```javascript
// A Request object can be constructed literally or through the `Request()` constructor
var init = {
    cahche: 'no-cache',
    method: 'POST', // defautl is GET
    headers: {
        content-type: text/plain,
    }
}

// init is the request object that contains information about the HTTP request
fetch('/api/getAnExample', init)
```
The full list of the properties of the `Request` object can be found [here][2].

<br>

## Receiving a HTTP response
The `fetch()` method returns a **Promise** as a response:
  - fulfilled promise: resolves to a `Response` object provided by the `FETCH API`
  - rejected promise: rejected with an error message

Among the [list][3] of properties of the `Response` object, the most useful ones are probably:
  - `headers`: a [`Headers`][4] object provided by the `FETCH API`.
  - `status`: a number indicating the status code of the HTTP request
  - `body`: a [`ReadableStream`][5] provided by the `FETCH API` that contains the HTTP response body

<br>

### Accessing the Response Body
There are 2 ways to access the HTTP response body:
  - Through available methods provided by the [`Body`][6] object(comes with the FETCH API)
  - By ourselves by maniputing the `ReadableStream` instance directly
  

#### Methods that come with `Body`
`Body` has been implemented by both `Request` and `Response`, so we can call the methods listed below directly on the latter two objects.

Suitable MIME Type of the Response Body | Method         | What it does?
--                             | --             | -- 
Any binary data                | arrayBuffer()  | Reads the HTTP **response data** stream. When the stream ends, returns a Promise that resolves to an **`ArrayBuffer`** containing all the data chunks
Any binary data                | blob()         | returns a Promise that resolves to a [**Blob**][7] object. Blobs mean "Binary Large Objects" and you can simply consider it as a byets container, which can be read as an `ArrayBuffer`, through the `FileReader API`, etc.
application/json               | json()         | returns a Promise that resolves to **the result of calling `JSON()` on the response body**. Note that `JSON()` implementation is asynchronous, which suits the reality that response body also comes in chunks through a read-only stream object.
text                           | text()         | returns a Promise that resolves to a **`USVString`(Unicode Scalar Values)**
键值对对象 & multipart/form-data| formData()     | returns a Promise that resolves to a **[`FormData`][8]** object, which can be **iterated** through `for ... of`

Below is an illustration of requesting and retriving a Csrf token (Cross-site request forgery):
```javascript
fetch('../api/test/getCsrf/')
// rember that BODY methods are asynchronous and returns a Promise! Because response body comes in chunks through a stream 
.then(response => response.text())
.then(responseBody => {
    var csrf = responseBody;
})
```

#### Reading the body with a `ReadableStream` reader
To read data from a `ReadableStream` instance, we first need to get a reader by calling `ReadableStream.reader()`:
```javascript
fetch('../api/test/getCsrf/')
.fetch(res => {
    // The readableStream instance is locked until the current reader is closed.
    var reader = res.body.reader();
}) 
```

We then read the data by calling the `read()` method on the `reader`, which returns a promise that resolves to an object `{ done, value }`. We can push the datachunks into an array for storage:
```javascript
fetch('../api/test/getCsrf/')
.fetch(res => {
    var reader = res.body.reader();
    var data = [];
    // start reading data
    pump();

    function pump() {
        reader.read().then(({done, value}) => {
            data.push(value);

            if (done){
                reader.close();
                return data;
            }
            
            // keep reading data if not done
            return pump();
        })
    }
})
```

As we can see, the above is an implementation of the `ArrayBuffer()` method. Typically, the methods exposed on `Body` will suffice for accessing the content of the HTTP response body.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[3]: https://developer.mozilla.org/zh-CN/docs/Web/API/Response
[4]: https://developer.mozilla.org/zh-CN/docs/Web/API/Headers
[5]: https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream
[6]: https://developer.mozilla.org/zh-CN/docs/Web/API/Body
[7]: https://medium.com/javascript-in-plain-english/javascript-blob-why-is-it-useful-20c372dfca00#:~:text=Blob%20means%20%E2%80%9CBinary%20Large%20Object,or%20read%20from%20a%20disk.
[8]: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
