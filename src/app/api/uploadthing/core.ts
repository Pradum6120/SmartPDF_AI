import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
    },
    // run before uplaod start
  }).middleware(async () => {
       // This code runs on your server before upload
      const user = await currentUser();
       if(!user) throw new UploadThingError("unauthorized")
    return {userId: user.id};   
  })
  .onUploadComplete( async ({metadata, file}) => {
    console.log("File uploaded", {metadata, file});
    return {userId : metadata.userId,  file:{
      name: file.name,
      ufsUrl: file.ufsUrl
    }};
  }),
} satisfies FileRouter;


export type ourFileRouter = typeof ourFileRouter;
