const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  })
})
};

// Booking
// LOAD REQUIRED MODULES
// npm i express nodemailer body-parser multer
const express = require("express"),
      bodyParser = require("body-parser"),
      nodemailer = require("nodemailer"),
      multer = require("multer"),
      path = require("path");
 
// (B) SETTINGS - CHANGE TO YOUR OWN!
// https://nodemailer.com/
const portHTTP = 80,
      mailSet = {
        port : 25,
        host : "localhost",
        /* auth: {
          user: EMAIL/USER,
          pass: PASSWORD
        },*/
        tls: { rejectUnauthorized: false }
      },
      mailFrom = "sys@mail.com",
      mailAdmin = "manager@mail.com",
      mailSubject = "Reservation",
      mailTxt = "Booking request received.";
 
// (C) NODE MAILER & EXPRESS SERVER
// const app = express(),
      forms = multer();
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(forms.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mailtransport = nodemailer.createTransport(mailSet);
 
// (D) EXPRESS HANDLERS
// (D1) HOME PAGE - BOOKING FORM
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
 
// (D2) SEND BOOKING REQUEST VIA EMAIL
app.post("/book", (req, res) => {
  // (D2-1) MAIL MESSAGE
  let msg = mailTxt + "<br>";
  for (const [k, v] of Object.entries(req.body)) { msg += `${k} : ${v}<br>`; }
 
  // (D2-2) SEND
  mailtransport.sendMail({
    from: mailFrom,
    to: mailAdmin,
    subject: mailSubject,
    html: `<p>${msg}</p>`
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(req.body);
      res.sendStatus(200);
    }
  });
});
 
// (D3) THANK YOU
app.get("/thankyou", (req, res) => res.sendFile(path.join(__dirname, "thank-you.html")));
 
// (E) START!
app.listen(portHTTP);

startApolloServer();
