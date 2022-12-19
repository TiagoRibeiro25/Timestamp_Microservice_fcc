const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  if (!date) {
    const currentDate = Date.now();
    res.json({
      unix: currentDate,
      utc: new Date(currentDate).toUTCString(),
    });
  }

  // check if it is a unix timestamp
  if (/\d{5,}/.test(date)) {
    res.json({
      unix: +date,
      utc: new Date(+date).toUTCString(),
    });
  }

  // check if it is a valid date
  if (new Date(date).toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: new Date(date).valueOf(),
    utc: new Date(date).toUTCString(),
  });
});

// listen for requests :)
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
