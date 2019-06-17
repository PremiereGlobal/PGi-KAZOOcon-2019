# KAZOOcon-2019

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

## Docker Deployment

The backend includes a Dockerfile for easy building and deployment. To build
the docker image, run `docker build -t <desired-image-name> .` while inside the
`./backend` directory. For example, `docker build -t 2600 .`

Now that the Docker image has been built, and all you have to do is run it. The
command to do that is:
```
Options:
    -d
        Detached from the current terminal
    -p
        Publish container's port(s) to host port(s)

docker run -dp <HOST_PORT>:<DOCKER_CONTAINER_PORT> <IMAGE_NAME>
```

For example, if you wanted to run the container (detached from the terminal)
on the host's port 8080 and had called your Docker image `2600`, the command
would be `docker run -dp 8080:80 2600`

Once you're ready to shut down the container, you can run the command `docker ps`
to see all running containers. Copy down the `CONTAINER_ID` of the container
you want to kill, and then run the command `docker kill <CONTAINER_ID>` to kill
the container.

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
