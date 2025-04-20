"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import generatePDFSummery from "@/actions/upload-actions";


const uploadSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "file size must be less than 20MB"
    )
    .refine((file) => file.type === "application/pdf", "file must be a pdf"),
});

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: ({ file }) => {
      alert("upload has begun for", file);
    },
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Handle file upload logic here
    event.preventDefault();
    console.log("submitted");
    if (!selectedFile) {
      console.log("no file is selected");

      // toaster space
    }

    //validate the fields

    const validateFields = uploadSchema.safeParse({ file: selectedFile! }); // success or error

    if (!validateFields.success) {
      console.log(
        validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    //upload the file to uploadthing
    const resp = await startUpload([selectedFile!]);
    try {
      const result = await generatePDFSummery(resp);
    console.log(result)
    } catch (error) {
      console.log("error in upload-form",error)
    }

    
  };

  //const { data = null, message = null } = result || {};
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center">Upload PDF</h2>
      <div className="inline-block rounded-lg bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 p-[2px]">
  <input
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
    placeholder="📄 Upload your PDF..."
    className="bg-white text-gray-700 rounded-lg p-2 w-full focus:outline-none"
  />
</div>

      <button
        type="submit"
        className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 hover:opacity-90 transition-all duration-300"
      >
        Upload
      </button>
    </form>
  );
}
