import express from "express"
import { AddressInfo } from "net";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

export const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});