import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export async function getFaceEncoding(imagePath) {
  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));
  const res = await axios.post("http://localhost:5001/encode", formData, {
    headers: formData.getHeaders()
  });
  return res.data.encoding;
}

export async function compareEncodings(known, unknown) {
  const res = await axios.post("http://localhost:5001/compare", { known, unknown });
  return res.data;
} 