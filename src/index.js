const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors({ orgin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome Pradheep!");
});

app.post("/mail", async (req, res) => {
  try {
    const { PDetails, total, email } = req.body;
    // const { token, product } = req.body;
    const EPD = JSON.parse(PDetails.data);
    var emails = email.data;
    var HTML = `<h1 style="color:blue">TOTAL PRICE: <span style="color:green">${total.TOTAL}</span></h1>`;
    HTML += EPD.map(
      (val) => `
            <b style="color:red"> PRODUCT NAME:<span style="color:green"> ${val.name}</span><br/></b>
            <b style="color:red">PRODUCR PRICE: <span style="color:green"> ${val.price}</span><br/></b>
            <b style="color:red">PRODUCT QUANTITY:<span style="color:green"> ${val.qty}</span></br></b>
            <br/><br/>
             `
    ).join("");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkavitha04111974@gmail.com",
        pass: "kavi@12345678"
      }
    });

    var mailOptions = {
      from: "rkavitha04111974@gmail.com",
      to: "pradheep.rk.it@gmail.com",
      emails,
      subject: "Thank You for shopping with us",
      html: HTML
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send("success");
      }
    });
  } catch (error) {
    res.send("failiure");
  }
});
app.listen(8080);
