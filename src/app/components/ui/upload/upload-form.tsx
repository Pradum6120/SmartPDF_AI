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
      console.log("upload has begun for", file);
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

    const validateFields = uploadSchema.safeParse({ file: selectedFile }); // success or error

    if (!validateFields.success) {
      console.log(
        validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    //upload the file to uploadthing
    const resp = await startUpload([selectedFile]);
    if (!resp) {
      return;
    }

    // parse the pdf using { langchain }
    const result = await generatePDFSummery(resp);

    const { data = null, message = null } = result || {};

    if (data) {
      //toast({ title: "saving pdf", description : "hang tight! we are saving your summary!"})
    }
    //summarize the pdf using Ai
    //save the summary to the database
    //REDIRECT TO THE SUMMARY PAGE
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center">Upload PDF</h2>
      <input
        type="file"
        accept=".pdf"
        className="border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Upload
      </button>
    </form>
  );
}
