// src/controllers/uploadController.js
import sharp from 'sharp';
import timestamp from '../../services/timestamp.services.js';
import path from 'path';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Função auxiliar para garantir que o diretório existe
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

// Função auxiliar para encontrar próximo nome disponível
async function getAvailableFilename(basePath, originalName) {
  let counter = 1;
  let filePath = basePath;
  const ext = path.extname(originalName);
  const baseNameWithoutExt = path.basename(originalName, ext);

  while (existsSync(filePath)) {
    filePath = path.join(
      path.dirname(basePath),
      `${baseNameWithoutExt}[${counter}]${ext}`
    );
    counter++;
  }

  return filePath;
}

class uploadController{
 async uploadClientImage(req, res) {
  try {
    const outputPath = path.join(process.cwd(), 'media', 'clients', `${req.params.id}.webp`);
    await ensureDir(path.dirname(outputPath));

    await sharp(req.file.buffer)
      .webp()
      .toFile(outputPath);

    res.status(200).json({ 
      success: true,
      message: 'Imagem do cliente salva com sucesso',
      data: {
        image: `${req.params.id}.webp`
      },
      metadata: {
        apiVersion: "1.0",
        timestamp: timestamp(),
     }});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async uploadEmployeeImage(req, res){
  try {
    const outputPath = path.join(process.cwd(), 'media', 'employee', `${req.params.id}.webp`);
    await ensureDir(path.dirname(outputPath));

    await sharp(req.file.buffer)
      .webp()
      .toFile(outputPath);

    res.status(200).json({ message: 'Imagem do funcionário salva com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async uploadDocument(req, res){
  try {
    const fileExt = path.extname(req.file.originalname);
    const baseOutputPath = path.join(
      process.cwd(),
      'media',
      'files',
      req.params.type,
      `${req.params.id}${fileExt}`
    );
    
    await ensureDir(path.dirname(baseOutputPath));
    
    const finalOutputPath = await getAvailableFilename(baseOutputPath);
    
    await fs.writeFile(finalOutputPath, req.file.buffer);
    
    res.status(200).json({ 
      message: 'Documento salvo com sucesso',
      path: finalOutputPath 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

}

export default new uploadController();  