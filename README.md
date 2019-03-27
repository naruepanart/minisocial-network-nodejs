# backend-social

```bash
# Install
npm install

# Run
npm run server
```

```bash
# API

# Server
https://backend-minisocial-network.herokuapp.com

# POST register
http://localhost:5000/api/users/register

# POST login
http://localhost:5000/api/users/login

# GET decode data from login by token 
http://localhost:5000/api/users/current

# POST save profile by token
http://localhost:5000/api/profile

# GET data profile by token
http://localhost:5000/api/profile

# Delete user and profile by token
http://localhost:5000/api/profile

# Get data profile by handle(PK)
http://localhost:5000/api/profile/handle/:handle

# Get data profile by ID of user
http://localhost:5000/api/profile/user/:id

# Get data profile All user
http://localhost:5000/api/profile/all

# POST posts
http://localhost:5000/api/posts

# Get posts
http://localhost:5000/api/posts

# Likes posts
http://localhost:5000/api/posts/like/:id

# Unlikes posts
http://localhost:5000/api/posts/unlike/:id

# Comment posts
http://localhost:5000/api/posts/comment/5c98db05fc90051558a30e50

# Delete comment
http://localhost:5000/api/posts/comment/:id/:comment_id

```


