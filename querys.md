## Querys com dados renomeados

```
query GET_POST {
  post343: post(id: "343") {
    postId: id
    id
    title
    ...
  }
  post860: post(id: "860") {
    id
    title
    ...
  }
}
```

![alt text](image.png)

## Query Frgaments - Evite repeticoes nas consultas

```
fragment post on Post {
  id
  title
  body
  indexRef
  createdAt
  unixTimestamp
}

query Fragment_Post($postId: ID!, $postId2: ID!, $postId3: ID!) {
  post1: post(id: $postId) {
    ...post
  }

  post2: post(id: $postId2) {
    ...post
  }

  post3: post(id: $postId3) {
    ...post
  }
}
```

![alt text](image-1.png)

![alt text](image-2.png)

## Input Type

![alt text](image-3.png)
![alt text](image-4.png)
