import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function saveUploadedFile(
  file: File,
  folder = "products"
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  // Save file
  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  // Return public URL path
  return `/uploads/${folder}/${filename}`;
}

export async function saveMultipleFiles(
  files: File[],
  folder = "products"
): Promise<string[]> {
  const uploadPromises = files.map((file) => saveUploadedFile(file, folder));
  return Promise.all(uploadPromises);
}

export function extractFilesFromFormData(
  formData: FormData,
  fieldName: string
): File[] {
  const files: File[] = [];
  const entries = formData.getAll(fieldName);

  for (const entry of entries) {
    if (entry instanceof File && entry.size > 0) {
      files.push(entry);
    }
  }

  return files;
}
