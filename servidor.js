const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ URL directa al archivo RAW de GitHub
const CODIGOS_URL = 'https://raw.githubusercontent.com/MalwareTechPython/logeo/main/codigos';

app.post('/validar', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await fetch(CODIGOS_URL);
    const texto = await response.text();
    const codigos = texto.split('\n').map(x => x.trim());

    if (codigos.includes(code)) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: 'Error al validar código' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
