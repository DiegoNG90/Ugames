const express = require('express');
const router = express.Router();

const path = require('path');
// IMAGE PATH
const imgFolderPath = path.join(__dirname, '../images/');
console.log(imgFolderPath);
//IMAGES
router.get('/:imgName', (req, res) => {
  const image = req.params.imgName;
  console.log(image);
  res.sendFile(`${imgFolderPath}${image}`);
});


module.exports = router;