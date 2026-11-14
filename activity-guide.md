# Activity Guide — Your First API (Integrations, FI UNAM)

Saturday, November 14, 2026 · Speaker: Bryan Rodríguez Abarca, Technical Product Manager

## Before you start

Bring a laptop: you do challenges 2 to 5 in Hoppscotch, a web page. Do not install anything and do not create accounts. With a phone you can do Challenge 1 and use GET to check what your team does.

Tip: every URL is in a box with a copy button.

This guide follows the slides of the class. It only has the slides with an exercise: slides 7 to 12, and the exit ticket on slide 14.

## Slide 7 · Challenge 1 — URL and parameters

Time: 7 min · Browser only (laptop or phone)

When you paste a URL in the browser, you make a request with the **GET** method. GET only reads. It does not change anything.

**Part A: a URL you already know.**

1. Open this link:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=43s
```

2. Read it in parts:

| Part | In this link | What it says |
| --- | --- | --- |
| Server | `www.youtube.com` | Who you ask |
| Path (endpoint) | `/watch` | What you ask for: watch a video |
| Parameter `v` | `dQw4w9WgXcQ` | Which video |
| Parameter `t` | `43s` | The second where it starts |

3. Change `t=43s` to `t=0s` and open it again. Then delete `&t=0s`.

**You should see:** the same video. With `t=43s` it starts at 0:43. With `t=0s`, or with no `t`, it starts at the beginning. The `?` sign opens the parameters and `&` separates them.

**Part B: an ad link.** Do not open it. Read it and complete the table.

```
https://shop.example/sneakers?utm_source=facebook&utm_campaign=black_friday&fbclid=IwAR0x9
```

| Part | In this link | What it says |
| --- | --- | --- |
| Server |  |  |
| Path (endpoint) |  |  |
| Parameter `utm_source` | `facebook` |  |
| Parameter `utm_campaign` | `black_friday` |  |
| Parameter `fbclid` | `IwAR0x9` |  |

**Part C: the same thing, in an API.**

4. Open this URL. It is not a page now: it is data.

```
https://rickandmortyapi.com/api/character/1
```

On a laptop, Chrome shows the data in one long line. Tick the **Pretty-print** box at the top to read it more easily.

5. Select the URL in the `image` field (the text between the quotes), copy it and paste it in a new tab.
6. Path parameter: change the `1` to `2`, or to any number you want.
7. Query parameters: filter.

```
https://rickandmortyapi.com/api/character/?name=rick&status=alive
```

8. Change `rick` to `morty`, or `alive` to `dead`.

**You should see:** a different character for each number. With the filters, you see a `results` list with only the characters that match.

**Part D: predict.**

9. Before you open it, predict: what will the server answer?

```
https://rickandmortyapi.com/api/character/99999
```

On a laptop: press F12 → Network tab → reload, to see the status code.

**Idea:** a URL is not a fixed address. It is a request with data inside.

(The answer is at the end, in "Answers".)

## Slide 8 · Challenge 2 — Methods

Time: 10 min · Laptop, with Hoppscotch · If you have a phone, work with a classmate who has a laptop: you check the changes with GET in your browser.

| Method | What it does | In the restaurant | Has a body? |
| --- | --- | --- | --- |
| **GET** | Read | See the menu | No |
| **POST** | Create | Order | Yes |
| **PUT** | Replace everything | Change your whole order | Yes |
| **PATCH** | Change one part | Change only the side dish | Yes |
| **DELETE** | Delete | Cancel the order | Usually no |

The browser only does GET. For the other methods you use an API client or code. Open:

```
https://hoppscotch.io
```

Three things to know before the first request:

- **Turn on the proxy (only once).** Click the shield icon at the bottom left of the screen (it says "Interceptor" when you point at it) and choose **Proxy**. Why: when a server answers with an error, the browser can hide the answer from a web page, and you only see "Network Error". With the proxy, Hoppscotch sends the request for you and you always see the answer.
- **The method.** You choose it in the menu on the left of the URL.
- **The body.** Open the **Body** tab, open the Content Type menu (it says "None") and choose `application/json`.

If your browser is in Spanish, Hoppscotch is in Spanish too: Interceptor = Interceptador, Body = Cuerpo, Headers = Encabezados, Send = Enviar, None = Ninguno, Network Error = Error de red.

You will create your own character in an API that really saves the data.

**1. Get your own API.** Open this page in a new tab. At the top, in a big box, there is a URL that is only yours: `https://crudcrud.com/api/` and a long key. Select it and copy it (there is no copy button). Do not copy the example lower on the page, the one that ends in `/unicorns`.

```
https://crudcrud.com
```

**2. POST: create it.** Use the `POST` method with your URL and `/characters` at the end:

```
https://crudcrud.com/api/YOUR_KEY/characters
```

and this body (change the values, use invented data):

```json
{
  "name": "Ana Sanchez",
  "data": {
    "species": "Human",
    "planet": "Earth",
    "power": "Debugging without sleep"
  }
}
```

**You should see:** your character, with an `_id` from the server. **Copy that `_id`.**

**3. GET: check it.** Use the `GET` method with the same URL and your `_id` at the end. You can also paste it in the browser, or give it to a classmate to see it on a phone:

```
https://crudcrud.com/api/YOUR_KEY/characters/YOUR_ID
```

**4. PUT: level it up.** Use the `PUT` method with the URL and your `_id`, and the whole character with a new name:

```json
{
  "name": "Ana Sanchez, level 2",
  "data": {
    "species": "Human",
    "planet": "Earth",
    "power": "Debugging without sleep"
  }
}
```

The response body is empty: look at the status code above it. Repeat the GET from step 3. **You should see:** the new name. Everything else is the same.

**5. DELETE: delete it.** Use the `DELETE` method with the URL and your `_id`. The response body is empty again.

**6. GET again.** Predict first: what status code will it return?

**Idea:** one URL, four methods, four different results. The URL says *which thing*. The method says *what to do with it*.

(Answer at the end.)

## Slide 9 · Challenge 3 — Body

Time: 4 min · Laptop, with Hoppscotch

The body is the data that travels. You send it with POST, PUT and PATCH. The server sends it back in almost every response. It is almost always JSON.

**How to read JSON:** braces `{ }` = one object · each line is `"key": value` · brackets `[ ]` = a list.

1. Repeat the POST from Challenge 2 to create a new character, and copy its `_id`.
2. Predict: if you send a **PUT** with only the name, what happens to `data`?

```json
{ "name": "I only have a name now" }
```

3. Send that PUT to the URL with your `_id`. Then send a GET to the same URL and read the response:

```
https://crudcrud.com/api/YOUR_KEY/characters/YOUR_ID
```

4. Now break the body: send a POST to your URL that ends in `/characters`. Replace the whole body with this JSON. The word Human has no quotes.

```
{ "name": "Ana", "data": { "species": Human } }
```

**Idea:** PUT replaces everything, so you send the whole resource. PATCH changes only what you send (this API does not have PATCH, but many APIs do). And if the body is wrong, the server does not guess: it tells you the request is bad.

(Answers at the end.)

## Slide 10 · Challenge 4 — Headers

Time: 4 min

Headers are data about the request. If the body is the package, the headers are the label.

| Header | What it says | Example |
| --- | --- | --- |
| `Content-Type` | The format of the body I send you | `application/json` |
| `Accept` | The format I want in the response | `application/json` |
| `User-Agent` | Which program makes the request | Your browser and your device |
| `Authorization` | Who I am (Challenge 5) | `Bearer my-token-123` |

1. In the browser (laptop or phone), open:

```
https://httpbin.org/headers
```

**You should see:** the headers YOUR browser sent. You did not ask for them. Compare with a classmate: a laptop and a phone send a different `User-Agent`.

2. In Hoppscotch, send a `GET` to the same URL. First, add your own header in the **Headers** tab: key `X-Student`, value your name. Find it in the response. Look at `User-Agent` too: it is not your browser now. It is `Proxyscotch`, the proxy that sends the request for you.
3. Predict: what happens if you send a JSON body but you say it is a different format? Repeat the POST from Challenge 2, with the correct body (with quotes around Human). In the **Body** tab, open the Content Type menu, go to the bottom of the list and choose `text/plain`. Keep the same JSON text and send.

**Idea:** the server reads the label first. If the label does not match the package, the server rejects it without opening it.

(Answer at the end.)

## Slide 11 · Challenge 5 — Security: who are you?

Time: 5 min

The most important header is the one that says who you are.

1. Predict: what happens if you ask a private API for something and you do not say who you are?
2. Open this URL in the browser:

```
https://httpbin.org/bearer
```

You will see an error page or an empty page: the server did not give you the data. On a laptop: press F12 → Network tab → reload, to see the status code.

3. In Hoppscotch, send a `GET` to the same URL with this header: key `Authorization`, value `Bearer my-token-123`.

**Idea:** same URL, different result. The only change was one header.

| Type | How it travels | Where you will see it |
| --- | --- | --- |
| API key | A fixed key in a header (for example `X-API-Key`) | Public APIs for data, maps, weather |
| Basic | User and password, encoded, in `Authorization: Basic …` | Internal and old systems |
| **Bearer token** | A token, often temporary, in `Authorization: Bearer …` | Most modern APIs |
| OAuth 2.0 | A process to get that token without sharing your password ("Sign in with Google") | Integrations between companies and other apps |

**Golden rule:** credentials go in headers, never in the URL or in the repository. In Challenge 1 you saw how much a URL tells.

(Answer at the end.)

## Slide 12 · Challenge 6 — Connect two systems with a webhook

Time: 7 min, in pairs

**Who is who:** you are the store and your partner is the payment system. Your webhook.site URL is your "doorbell": you give it to the other system, so it can tell you when something happens. When your partner opens it, they ring that doorbell.

1. Open this URL and copy your own URL ("Your unique URL"):

```
https://webhook.site
```

2. Share your URL with your partner (by chat, or read it aloud).
3. Your partner opens your URL in the browser with this at the end (use invented data):

```
?name=Ana&message=hello
```

4. Look at your webhook.site screen.

**You should see:** a new request in the list, in real time, with `name`, `message` and its headers. Your partner only sees a short text ("This URL has no default content configured"). That is normal.

**Idea:** "Do not come to ask: we will tell you when your table is ready." This is how a payment system tells a store that the payment is done.

**Now change roles:** your partner receives and you send.

**In real life** nobody opens that URL by hand. The payment system calls it automatically at the moment of the payment, usually with a POST and a JSON body. So a webhook is an API in reverse: you do not go and ask. You leave your address and they find you.

> **Privacy:** webhook.site URLs are public and accept 50 requests. Do NOT send real personal data.

**Bonus on a laptop:** in

```
https://hoppscotch.io
```

send a POST with the JSON body `{"student":"Ana","subject":"Integrations"}` to the webhook URL. Keep the proxy on (Challenge 2): without it, the browser blocks this request.

**API: I ask. Webhook: you tell me.**

## Slide 14 · Exit ticket

Write one sentence: describe an integration you used today without noticing, and say which two systems talked to each other.

# After class

## Bonus challenge / homework

Connect two APIs by hand.

1. Open this URL in the browser. It asks Open-Meteo for the weather in Mexico City:

```
https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true
```

2. Find `current_weather` and, inside it, `temperature`.
3. Open your partner's webhook URL with this at the end, with the number you found:

```
?city=Mexico%20City&temp=THE_NUMBER
```

You just did, by hand, what an automatic integration does.

## Check what you learned

If you can answer these seven questions without the guide, you know today's content. They are the kind of questions you get in technical interviews. The answers are at the end.

1. What is the difference between an API and an integration?
2. What is the difference between a path parameter and a query parameter?
3. What do 401, 403 and 404 mean? Whose error is it in a 4xx and in a 5xx?
4. When do you use PUT and when do you use PATCH?
5. How is calling an API different from receiving a webhook?
6. Why should credentials not go in the URL?
7. What is idempotency and why is it important when you retry a payment?

## The same thing, in code (for after class)

Today you used the browser. In a real job, a program makes these requests. Here are three ways to take that step, from the easiest to the most useful.

**1. Without installing anything (laptop).** With a rickandmortyapi.com tab open, press F12, go to Console and paste this. If Chrome asks, type `allow pasting` first.

```js
fetch("https://rickandmortyapi.com/api/character/1")
  .then(r => r.json())
  .then(console.log)
```

**2. In the terminal, with curl.** The `-i` option shows the status code and the headers of the response, as text.

```bash
curl -i https://rickandmortyapi.com/api/character/1
```

```bash
curl -i https://httpbin.org/bearer -H "Authorization: Bearer my-token-123"
```

**3. In Python: your first automatic integration.** It is the homework, but now a program does it: it reads from one system and tells another one. Install the library with `pip install requests` and change `YOUR_WEBHOOK_URL` to your webhook.site URL.

```python
import requests

weather = requests.get(
    "https://api.open-meteo.com/v1/forecast",
    params={"latitude": 19.43, "longitude": -99.13, "current_weather": "true"},
)
print(weather.status_code)
temp = weather.json()["current_weather"]["temperature"]

notice = requests.post("YOUR_WEBHOOK_URL", json={"city": "Mexico City", "temp": temp})
print(notice.status_code)
```

## How to use this in your profile

- **A small project for one afternoon:** upload the Python script to GitHub with a README. Explain which API it uses, what it sends, and what it does if the API answers 500.
- **Next step:** use an API that needs an API key (choose one from public-apis). Then build your own API (FastAPI or Express) and document it with OpenAPI.
- **In your CV, only after you do it:** "Integrated two REST APIs with Python (JSON, token authentication, webhooks) and handled HTTP errors."
- **Where people use this:** backend, integrations, data engineering, test automation (QA), implementation and technical support, technical product.

## Keep learning

**Resources**

- [MDN: "An overview of HTTP"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [public-apis on GitHub](https://github.com/public-apis/public-apis) (a list of free APIs)
- [Hoppscotch](https://hoppscotch.io) and [Postman](https://learning.postman.com/)
- [Open-Meteo documentation](https://open-meteo.com/en/docs), an example of good documentation

**Topics to explore**

- SOAP, GraphQL and gRPC: the other API styles
- Polling vs events
- Synchronous vs asynchronous
- Retries and idempotency
- OpenAPI (Swagger)
- iPaaS platforms (Zapier, Make, n8n, MuleSoft)

# Reference

## Status codes

| Code | Meaning |
| --- | --- |
| **200** | OK |
| **201** | Created |
| **400** | Your request is bad |
| **401** | You did not say who you are |
| **403** | I know who you are, but you do not have permission |
| **404** | It does not exist |
| **415** | I do not understand that format |
| **429** | Too many requests: slow down |
| **500** | The server failed |

Quick rule: **2xx** it worked · **4xx** the error is in your request · **5xx** the error is in the server.

## Mini glossary

- **API:** the contract one system uses to ask another system for something.
- **Integration:** two or more systems working together with those contracts.
- **Endpoint:** the exact address (URL) where you ask for something.
- **Request:** what you send.
- **Response:** what the server sends back.
- **JSON:** a text format for data, with `"key": value` pairs.
- **Status code:** a number that says how the request went (200, 404…).
- **Header:** data about the request or the response (who you are, which format).
- **Body:** the data that you send or receive.
- **Method:** the action you ask for: GET, POST, PUT, PATCH, DELETE.
- **Parameter:** data that changes what you ask for. Path: `/character/2`. Query: `?name=rick`.
- **Token:** a credential that shows who you are. It travels in the `Authorization` header.
- **Webhook:** a message a system sends you when something happens. You do not ask for it.
- **Idempotency:** repeating the same request does not repeat the effect (retrying a payment does not charge twice).

## If something fails

1. Check that the URL is complete, with no spaces or extra letters.
2. Reload the page or try again.
3. Check your Wi-Fi connection.
4. Paste the URL in a new tab, or ask a classmate to try it.
5. If you see `429` or `error code: 1015`, too many requests came from the same Wi-Fi. Wait 10 seconds and try again.
6. If Hoppscotch shows "Network Error", look at the Interceptor list under the error. If **Proxy** is not selected, choose it and send again. If it is selected, the other server is busy: wait 20 seconds and send one more time.
7. In Hoppscotch, while a request is running, the Send button says **Cancel**. Do not click it again: wait for the answer.

**Plan B if webhook.site fails:** open this URL. It returns in `args` what you sent:

```
https://httpbin.org/get?name=Ana&message=hello
```

Your crudcrud.com URL accepts 100 requests and works for 24 hours. If you lose it, open crudcrud.com again in the same browser: it shows the same URL.

**Plan B if crudcrud.com does not answer** (Challenges 2 and 3): use `https://jsonplaceholder.typicode.com/posts` with the same methods. Note: that API only pretends. It does not save anything, so a GET of your new `id` returns 404 and the results of PUT and DELETE will not match the answers. Look only at the status codes.

**Plan B if httpbin.org does not load** (Challenges 4 and 5): change `httpbin.org` to `httpbingo.org` in the same URL. The paths `/headers`, `/bearer` and `/get` work the same. The only difference: httpbingo shows each value inside `[ ]` (a list).

## Answers — do not read this before you try

**Challenge 1:** 404, with the body `{"error":"Character not found"}`. The server did answer, but that resource does not exist ("we do not have that dish").

**Challenge 2:** the last GET returns 404: you really deleted it. (When you create, the API answers 201, "created". PUT and DELETE answer 200.)

**Challenge 3:** after the PUT, `data` is not there any more: PUT replaces the whole resource and you only sent the name. The broken body returns 400, "your request is bad".

**Challenge 4:** 415, "I do not understand that format". The body was valid JSON, but the label said something different.

**Challenge 5:** without a token, 401. With the header `Authorization: Bearer my-token-123`, 200 with `"authenticated": true`.

**Check what you learned:**

1. An API is the contract to ask a system for something. An integration is two or more systems working together with those contracts.
2. A path parameter identifies one resource (`/character/2`). A query parameter filters or changes the response (`?name=rick`).
3. 401: you did not say who you are. 403: the server knows who you are, but you do not have permission. 404: it does not exist. In a 4xx the error is in your request. In a 5xx the error is in the server.
4. PUT replaces the whole resource. PATCH changes only the fields you send.
5. With an API, you ask when you want. With a webhook, you leave your URL and the other system tells you when something happens.
6. Because the URL stays in the browser history, in the server logs and in every link you share. A header does not.
7. It means that repeating the same request does not repeat the effect. If a payment is slow and you retry it, without idempotency you can charge the customer twice.
