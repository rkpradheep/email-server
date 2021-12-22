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
    var HTML = `<html>
    <head>
    <style>
    body{
      background-color: #ede2fa;
    }
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
                <h2 style="color:blue;text-align:center">YOUR PURCHASE DETAILS</h2>
                <br/><br/>
                <table style="margin:auto">
                 <tr>
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
