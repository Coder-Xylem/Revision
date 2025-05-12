# X-Tweet API Documentation

This document provides details about the X-Tweet API endpoints, request/response formats, and example usage.

## Base URL
```
http://localhost:5000
```

## API Endpoints

### 1. Get All Tweets
Retrieves all tweets sorted by creation date (newest first).

- **URL**: `/api/tweets`
- **Method**: `GET`
- **Auth Required**: No
- **Permissions**: None

#### Success Response:
- **Code**: 200 OK
- **Content Example**:
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "tweet": "Hello world! This is my first tweet!",
    "author": "John Doe",
    "like": 5,
    "dislike": 1,
    "isEdited": false,
    "createdAt": "2025-05-13T14:32:11.987Z",
    "updatedAt": "2025-05-13T14:35:22.123Z",
    "id": "60d21b4667d0d8992e610c85",
    "score": 4
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "tweet": "I love using X-Tweet!",
    "author": "Jane Smith",
    "like": 10,
    "dislike": 0,
    "isEdited": false,
    "createdAt": "2025-05-13T14:30:45.123Z",
    "updatedAt": "2025-05-13T14:30:45.123Z",
    "id": "60d21b4667d0d8992e610c86",
    "score": 10
  }
]
```

#### Error Response:
- **Code**: 500 Internal Server Error
- **Content**:
```json
{
  "message": "Server error while fetching tweets"
}
```

### 2. Get Single Tweet by ID
Retrieves a specific tweet by its ID.

- **URL**: `/api/tweets/:id`
- **Method**: `GET`
- **URL Params**: 
  - Required: `id=[MongoDB ObjectId]`
- **Auth Required**: No
- **Permissions**: None

#### Success Response:
- **Code**: 200 OK
- **Content Example**:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "tweet": "Hello world! This is my first tweet!",
  "author": "John Doe",
  "like": 5,
  "dislike": 1,
  "isEdited": false,
  "createdAt": "2025-05-13T14:32:11.987Z",
  "updatedAt": "2025-05-13T14:35:22.123Z",
  "id": "60d21b4667d0d8992e610c85",
  "score": 4
}
```

#### Error Responses:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "message": "Tweet not found"
}
```

- **Code**: 400 Bad Request
- **Content**:
```json
{
  "message": "Invalid tweet ID format"
}
```

- **Code**: 500 Internal Server Error
- **Content**:
```json
{
  "message": "Server error while fetching tweet"
}
```

### 3. Create New Tweet
Creates a new tweet.

- **URL**: `/api/tweets`
- **Method**: `POST`
- **Auth Required**: No
- **Permissions**: None
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "tweet": "This is my new tweet!",
  "author": "John Doe"
}
```

#### Success Response:
- **Code**: 201 Created
- **Content Example**:
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "tweet": "This is my new tweet!",
  "author": "John Doe",
  "like": 0,
  "dislike": 0,
  "isEdited": false,
  "createdAt": "2025-05-13T15:10:30.123Z",
  "updatedAt": "2025-05-13T15:10:30.123Z",
  "id": "60d21b4667d0d8992e610c87",
  "score": 0
}
```

#### Error Responses:
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "message": "Tweet content and author are required"
}
```

- **Code**: 400 Bad Request
- **Content**:
```json
{
  "message": "Tweet cannot exceed 280 characters"
}
```

- **Code**: 500 Internal Server Error
- **Content**:
```json
{
  "message": "Server error while creating tweet"
}
```

### 4. Like a Tweet
Increments the like count for a specific tweet.

- **URL**: `/api/tweets/like/:id`
- **Method**: `POST`
- **URL Params**: 
  - Required: `id=[MongoDB ObjectId]`
- **Auth Required**: No
- **Permissions**: None

#### Success Response:
- **Code**: 200 OK
- **Content Example**:
```json
{
  "message": "Tweet liked successfully",
  "like": 6,
  "dislike": 1
}
```

#### Error Responses:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "message": "Tweet not found"
}
```

- **Code**: 400 Bad Request
- **Content**:
```json
{
  "message": "Invalid tweet ID format"
}
```

- **Code**: 500 Internal Server Error
- **Content**:
```json
{
  "message": "Server error while liking tweet"
}
```

### 5. Dislike a Tweet
Increments the dislike count for a specific tweet.

- **URL**: `/api/tweets/dislike/:id`
- **Method**: `POST`
- **URL Params**: 
  - Required: `id=[MongoDB ObjectId]`
- **Auth Required**: No
- **Permissions**: None

#### Success Response:
- **Code**: 200 OK
- **Content Example**:
```json
{
  "message": "Tweet disliked successfully",
  "like": 5,
  "dislike": 2
}
```

#### Error Responses:
- **Code**: 404 Not Found
- **Content**:
```json
{
  "message": "Tweet not found"
}
```

- **Code**: 400 Bad Request
- **Content**:
```json
{
  "message": "Invalid tweet ID format"
}
```

- **Code**: 500 Internal Server Error
- **Content**:
```json
{
  "message": "Server error while disliking tweet"
}
```

## Notes

1. The API currently does not implement authentication or user management. All endpoints are publicly accessible.

2. The schema includes fields for tracking which IPs have liked/disliked tweets, but this functionality is commented out in the controllers. Uncomment the relevant sections in the like/dislike endpoints to enable this feature.

3. The `score` field is a virtual field that represents likes minus dislikes.

4. To help with future updates, adding indexes for efficient retrieval and sorting has been implemented in the schema.