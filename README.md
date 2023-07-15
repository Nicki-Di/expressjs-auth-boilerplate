# auth-template
- environment variables to be set:
  auth_privateKey=hello;DEBUG=auth:*;auth_db_password=auth_user
- for production, also set NODE_ENV=production
## Authentication boilerplate code 🔑
*Using Express.js (Node.js) with Cookie and JWT*

You can clone this template and make and add your project code to it.
- Written in [Express.js](https://expressjs.com/) 🤘🏻
- Using [JWT](https://jwt.io/) with [Bcrypt package](https://www.npmjs.com/package/bcrypt) for encryption 🔐
- Extendable with roles
  
### Environment variables:
```Shell
auth_privateKey="key"
DEBUG="auth:*"
auth_db_password="password"
#for production, also set this:
#NODE_ENV="production"
```
