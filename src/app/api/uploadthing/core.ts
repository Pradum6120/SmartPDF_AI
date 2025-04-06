import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
    },
  }).middleware(async ({req}) => {
       // This code runs on your server before upload
      const user = await currentUser();
       if(!user) throw new UploadThingError("unauthorized")
    return {userId: user.id};   
  })
  .onUploadComplete(async ({metadata, file}) => {
    console.log("File uploaded", {metadata, file});
    return {userId : metadata.userId,  file};
  }),
} satisfies FileRouter;


export type ourFileRouter = typeof ourFileRouter;
