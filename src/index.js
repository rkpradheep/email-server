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
    console.log(emails);
    var HTML = `<html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      font-size: larger;
      text-align: center;
      }
  
  td, th {
      border: 2px solid #8f6797;
      text-align: center;
      vertical-align:center;
      padding: 8px;
  }
  
</style>  
</head>

                <body>
                <h2 style="color:green;text-align:center">SHOPWITHINFOTIX</h2><br/><br/>
                <p>We hope you enjoyed shopping with us</p><br/>
                <h2 style="color:blue;text-align:center">YOUR PURCHASE DETAILS</h2>
                <br/><br/>
                <table style="margin:auto">
                 <tr style="background-color: #ede2fa;">
                 <th>PRODUCT NAME</th>
                 <th>PRODUCT PRICE</th>
                 <th>PRODUCT QUANTITY</th>
                 </tr>
    
    `;
    let i = 0;
    HTML += EPD.map((val) => {
      i++;
      if (i % 2 !== 0) {
        return `<tr style="background-color: #ede2fa;">
                <td> ${val.name}</td>
                <td> ${val.price}</td>
                <td> ${val.qty}</td>
                </tr>
             `;
      } else {
        return `<tr style="background-color: #d0b8df">
                  <td> ${val.name}</td>
                  <td> ${val.price}</td>
                  <td> ${val.qty}</td>
                  </tr>
               `;
      }
    }).join("");
    HTML += `
       <tr>
       <td colspan="3" style='text-align:center; vertical-align:middle;font-weight:bold;color:green'>GRAND TOTAL : <span style="color:red">Rs.${total.TOTAL}</span></td>
       </tr>
       </table>
       </body>
       </html>`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkavitha04111974@gmail.com",
        pass: "kavi@12345678"
      }
    });

    var mailOptions = {
      from: "rkavitha04111974@gmail.com",
      to: [{ address: "pradheep.rk.it@gmail.com" }, { address: emails }],
      subject: "Thank You for shopping with shopwithinfotix",
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

app.post("/auth", async (req, res) => {
  try {
    const { OTP, email } = req.body;

    var emails = email.data;
    // console.log(emails);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkavitha04111974@gmail.com",
        pass: "kavi@12345678"
      }
    });

    var mailOptions = {
      from: "rkavitha04111974@gmail.com",
      to: [{ address: "pradheep.rk.it@gmail.com" }, { address: emails }],
      subject: "Account Authentication",
      html: `
      <p>Your OTP for account creation in shopwithinfotix
      is <span style="font-weight:bold">${OTP.data}.</span> Thank you for choosing us. We hope you will enjoy shopping with us. Have a nice day.</p>
      `
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
app.post("/forgotPassword", async (req, res) => {
  try {
    const { password, email } = req.body;

    var emails = email.data;

    // console.log(emails);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rkavitha04111974@gmail.com",
        pass: "kavi@12345678"
      }
    });

    var mailOptions = {
      from: "rkavitha04111974@gmail.com",
      to: [{ address: emails }],
      subject: "Password Request",
      html: `
      <p>Your password for shopwithinfotix account
      is <span style="font-weight:bold">${password.data}.</span> If you wish, you can later reset your password in Account Settings menu.</p>
      `
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
