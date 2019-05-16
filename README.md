# KAZOOcon-2019m

# Backend

## Configuration

The only configuration file is located in the root of `backend` and is called
`config`. Inside is a JSON specifying the server to be used when validating
the auth token in the `X-Auth-Token` header.

**Example Configuration:**
```
{
  "api_location" : "http://sandbox.2600hz.com:8000"
}
```

## Endpoints

### `/api/` : `GET`

**Required Headers:** `X-Auth-Token`

This endpoint returns data about the state of the checkbox. It is required to
pass a valid authentication token in the header field `X-Auth-Token`, which will
be validated against

**Example Response:**
```
{
  "data" : {
    "checkbox_state" : "checked" | "unchecked"
  }
}
```

### `/api/` : `POST`

**Required Headers:** `X-Auth-Token`

This endpoint toggles the state of the checked box, and then returns a JSON
with the new state of the checked box.

**Example Response:**
```
{
  "data" : {
    "checkbox_state" : "checked" | "unchecked"
  }
}
```

### `/api/pivot/xml/` : `GET`
Alternative endpoint to `/api/pivot/json`. Returns a Pivot-readable XML-type
response which allows Pivot to tell the user whether the button is checked or
unchecked.

**Example Response:**
```
<Response>
  <Say>The button is checked</Say>
</Response>
```

### `/api/pivot/json/` : `GET`
Alternative endpoint to `/api/pivot/xml`. Returns a Pivot-readable json which
allows Pivot to tell the user whether the button is checked or unchecked.

**Example Response:**
```
{
  "module" : "tts",
  "data" : {
            "text" : "the button is checked"
            }
}
 ```
