// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/NAMAN', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema
const formSchema = new mongoose.Schema({
  formName: String,
  fields: [{
    type: {
      type: String, // 'text', 'dropdown', 'checkbox'
      label: String,
      placeholder: String,
      options: [{ option: String }], // Only for dropdown and checkbox
    }
  }],
});


const Form = mongoose.model('Form', formSchema);
const User = mongoose.model('User', {
  username: String,
  password: String,
});

app.post('/login',async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else if (!user) {
      res.status(401).send('Invalid credentials');
    } else {
      res.status(200).send('Login successful');
    }
  });
});
app.post('/forms', async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData)
    const newForm = new Form(formData);
    await newForm.save();
    res.status(200).json({ message: 'Form saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
