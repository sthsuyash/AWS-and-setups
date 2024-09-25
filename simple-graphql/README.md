# GraphQL using Apollo Server and MongoDB

Simple graphQL server using Apollo Server and MongoDB. Then deploy it to AWS Lambda using Serverless Framework.

There are user schema, user typeDef and user resolver. The user schema is used to define the user model in MongoDB. The user typeDef is used to define the user schema in graphQL. The user resolver is used to define the user query and mutation.

## Query

The data can be queried using the following query using graphQL.

```graphql
query {
  users {
    _id
    username
    name
  }
}
```

The output would be as follows:

```json
{
  "data": {
    "users": [
      {
        "_id": "66f3dc4163af57c076f9d49a",
        "username": "newUser",
        "name": "New User"
      }
    ]
  }
}
```

Or, for the deployed version, the data can be queried using the following query using graphQL.

```bash
serveless invoke local -f graphql -p ./queries/query.json
```

```json
{
  "version": "2.0",
  "headers": {
    "content-type": "application/json"
  },
  "rawPath": "/",
  "rawQueryString": "",
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/",
      "protocol": "HTTP/1.1"
    }
  },
  "body": "{\"operationName\": null, \"variables\": null, \"query\": \"{ users { _id username name gender profilePicture } }\"}",
  "isBase64Encoded": false
}
```

The output from the terminal is as follows:

```bash
MongoDB Connected: demo-shard-00-01.bdq8l.mongodb.net
Serializing user

{
    "statusCode": 200,
    "body": "{\"data\":{\"register\":{\"_id\":\"66f3dc4163af57c076f9d49a\",\"username\":\"newUser\",\"name\":\"New User\",\"gender\":\"male\",\"profilePicture\":\"https://avatar.iran.liara.run/public/boy?username=newUser\"}}}\n",
    "isBase64Encoded": false,
    "cookies": [
        "connect.sid=s%3AJ67Xoy0jp3hV--0HfcDbM6r67UHe2zXt.QMRFevV03sjycpwKlAowqQtLCkqTiW918d77ZAxjey8; Path=/; Expires=Wed, 02 Oct 2024 09:47:45 GMT; HttpOnly"
    ],
    "headers": {
        "x-powered-by": "Express",
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
        "cache-control": "no-store",
        "content-type": "application/json; charset=utf-8",
        "content-length": "189",
        "etag": "W/\"bd-jqFDzFJ3xooztyhAyzDEnKNJVR4\""
    }
}
```

## Mutation

The data can be mutated using the following mutation using graphQL.

```graphql
{
  "query": "
    mutation RegisterUser($input: RegisterInput!) {
      register(input: $input) {
        _id
        username
        name
        profilePicture
        gender
      }
    }
  ",
  "variables": {
    "input": {
      "name": "John Doe",
      "username": "johndoe",
      "password": "securepassword",
      "gender": "male"
    }
  }
}
```

The output would be as follows:

```json
{
  "data": {
    "register": {
      "_id": "66f3dc4163af57c076f9d49a",
      "username": "johndoe",
      "name": "John Doe",
      "profilePicture": "https://avatar.iran.liara.run/public/male?username=jonhdoe"
    }
  }
}
```

Or, for the deployed version, the data can be mutated using the following mutation using graphQL.

```bash
serveless invoke local -f graphql -p ./queries/mutation.json
```

```json
{
  "version": "2.0",
  "headers": {
    "content-type": "application/json"
  },
  "rawPath": "/",
  "rawQueryString": "",
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/",
      "protocol": "HTTP/1.1"
    }
  },
  "body": "{\"operationName\": null, \"variables\": {\"input\": {\"name\": \"John Doe\", \"username\": \"johndoe\", \"password\": \"securepassword\", \"gender\": \"male\"}}, \"query\": \"mutation RegisterUser($input: RegisterInput!) { register(input: $input) { _id username name gender profilePicture } }\"}",
  "isBase64Encoded": false
}
```

The output from the terminal is as follows:

```bash
MongoDB Connected: demo-shard-00-01.bdq8l.mongodb.net
Serializing user

{
    "statusCode": 200,
    "body": "{\"data\":{\"register\":{\"_id\":\"66f3dc4163af57c076f9d49a\",\"username\":\"johndoe\",\"name\":\"John Doe\",\"gender\":\"male\",\"profilePicture\":\"https://avatar.iran.liara.run/public/male?username=johndoe\"}}}\n",
    "isBase64Encoded": false,
    "cookies": [
        "connect.sid=s%3AJ67Xoy0jp3hV--0HfcDbM6r67UHe2zXt.QMRFevV03sjycpwKlAowqQtLCkqTiW918d77ZAxjey8; Path=/; Expires=Wed, 02 Oct 2024 09:47:45 GMT; HttpOnly"
    ],
    "headers": {
        "x-powered-by": "Express",
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
        "cache-control": "no-store",
        "content-type": "application/json; charset=utf-8",
        "content-length": "189",
        "etag": "W/\"bd-jqFDzFJ3xooztyhAyzDEnKNJVR4\""
    }
}
```

## Deployment

The server can be deployed to AWS Lambda using Serverless Framework. The [serverless.yml](./serverless.yml) file is used to define the serverless configuration.

And then the server can be deployed using the following command.

```bash
serverless deploy
```
