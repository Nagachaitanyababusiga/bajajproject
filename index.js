const express = require("express");
const app = express();

app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const input = req.body.data || [];

    const user_id = "nagachaitanyababu_siga_04102004"; 
    const email = "nagachaitanyababusiga@gmail.com";      
    const roll_number = "22BCE9950";  

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concat_letters = [];

    input.forEach((item) => {
      if (/^\d+$/.test(item)) {
        // numeric
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concat_letters.push(...item.split(""));
      } else {
        special_characters.push(item);
      }
    });

    // build alternating caps reverse concat string
    concat_letters = concat_letters.reverse();
    let concat_string = concat_letters
      .map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      )
      .join("");

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
