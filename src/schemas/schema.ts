import * as z from "zod";

const thumbnailSchema = z.any().refine((file) => {
  if (!file || !file.length) {
    return "File is required";
  }

  const selectedFile = file[0]; // Access the first selected file

  // Validate file type
  if (!selectedFile.type.startsWith("image/")) {
    return "Only image files are allowed";
  }

  // Validate file size
  if (selectedFile.size > 10485760) {
    // 10 MB limit
    return "File size cannot exceed 10 MB";
  }

  return true; // Validation passed
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The passwords did not match",
      });
    }
  });

export const emailSchema = z.object({
  email: z.string().email().min(1, { message: "Your email is required" }),
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required." }),
    lastName: z.string(),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
    profileImg: thumbnailSchema,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The passwords did not match",
      });
    }
  }); //.parse({ name:"janith",lastName:"chshaiofh",password: "asdfff", confirmPassword: "qwerff" });

export const signInSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, { message: "Please enter an valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must have at least 6 characters." }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The passwords did not match",
      });
    }
  }); //.parse({ email:"janirg@gmail.com" ,password: "111111", confirmPassword: "111111" });

export const OTPSchema = z.object({
  verification: z
    .string()
    .max(9, { message: "Invalid OTP" })
    .min(0, { message: "Invalid OTP" }),
});

// const videoSchema = z
//   .any() // Ensure it's a File object
//   .superRefine((file, ctx) => {
//     // Check file type
//     const selectedFile = file[0];
//     const allowedTypes = ["video/mp4", "video/webm", "video/ogg"]; // Adjust as needed
//     if (!allowedTypes.includes(selectedFile.type)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Invalid video file type",
//       });
//     }

//     // Check file size (optional)
//     const maxSize = 10 * 1024 * 1024; // 10 MB
//     if (file.size > maxSize) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Video file exceeds maximum size 100mb",
//       });
//     }
//   });

const sectionSchema = z.object({
  section: z.string().min(1, { message: "Video Section is required." }),
  videoTitle: z.string().min(1, { message: "Video title is required." }),
  videoDescription: z
    .string()
    .min(10, { message: "Video description is required." })
    .max(300, { message: "Please procide an abstractive description" }),
  videoThumbnail: thumbnailSchema,
  links: z
    .array(z.object({ link: z.string() }))
    .min(1, { message: "Minimum 1 link is required." }),
});

export const courseSchema = z.object({
  courseName: z.string().min(1, { message: "Course Name is required." }),
  courseDescription: z
    .string()
    .min(40, { message: "Description is way too small." })
    .max(3000, { message: "Desription is way too large" }),
  coursePrice: z.string().min(1, { message: "Course price is required." }),
  courseEstimatedPrice: z.string(),
  thumbnail: thumbnailSchema,
  tags: z
    .array(
      z.object({ tag: z.string().min(1, { message: "Tag must be a word." }) })
    )
    .min(1, { message: "At least 1 tag is required." }),
  level: z.string().min(1, { message: "Level is required." }),
  courseBenifits: z
    .array(
      z.object({
        benifit: z
          .string()
          .min(1, { message: "Benifit must be a word or words." }),
      })
    )
    .min(3, { message: "Provide at least 3 benifits of your course." }),
  preRequirement: z
    .array(
      z.object({
        requirement: z.string().min(1, {
          message: "Benifit must be a word or words.",
        }),
      })
    )
    .min(2, { message: "Provide at least 2 requirements for your course." }),
  courseSections: z
    .array(sectionSchema)
    .min(1, { message: "At least 1 course section is required." }),
});

export const updateCourseSchema = z.object({
  name: z.string().min(1, { message: "New course Name is required." }),
  level: z.string().min(1, { message: "New Course level is required." }),
  price: z.string().min(1, { message: "Course price is required." }),
  estimatedPrice: z
    .string()
    .min(1, { message: "Course Estimated price is required." }),
  thumbnail: thumbnailSchema,
});
export const updateUserRoleSchema = z.object({
  role: z.string().min(1, { message: "Role must be either Admin or User" }),
});

export const reviewFormSchema = z.object({
  review: z
    .string()
    .min(1, { message: "Review must contain at least 20 characters" }),
  rating: z
    .string()
    .min(0, { message: "Minimum rating is zero." })
    .max(5, { message: "Maximum rating is 5" }),
});
