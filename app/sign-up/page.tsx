// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import axios from "axios";
// import { useSignUp } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// // Form validation schema
// const validationSchema = Yup.object({
//   username: Yup.string()
//     .matches(
//       /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/,
//       "Username can only contain letters, numbers, and special characters."
//     )
//     .min(4, "Username must be at least 4 characters long")
//     .max(8, "Username must be at most 8 characters long")
//     .required("Username is required"),

//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),

//   password: Yup.string().required("Password is required"),
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
// });

// const Signup = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // to track form submission stater
//   const router = useRouter();

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       console.log("values", values);

//       setIsSubmitting(true);
//       try {
//         // Check if username already exists
//         const { data: users } = await axios.get("/api/getUser");
//         console.log("get users=", users);

//         const userExists = users.some(
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           (user: any) => user.username === values.username
//         );
//         if (userExists) {
//           toast.error("Username already exists");
//           setIsSubmitting(false);
//           return;
//         }

//         // Create new user

//         const newUser = await signUp?.create({
//           username: values.username,
//           emailAddress: values.email,
//           password: values.password,
//           firstName: values.firstName,
//           lastName: values.lastName,
//         });

//         console.log("newUser=", newUser);

//         // Prepare email verification
//         await signUp?.prepareEmailAddressVerification({
//           strategy: "email_code",
//         });
//         setPendingVerification(true);
//         setIsSubmitting(false);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       } catch (err: any) {
//         console.error(err);
//         toast.error("Something went wrong. Please try again.");
//         setIsSubmitting(false);
//       }
//     },
//   });

//   // Handle email verification
//   const onPressVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isLoaded) return;

//     setIsSubmitting(true);
//     try {
//       const completeSignup = await signUp.attemptEmailAddressVerification({
//         code,
//       });
//       if (completeSignup?.status === "complete") {
//         await setActive({ session: completeSignup.createdSessionId });
//         toast.success("Verification successful");
//         router.push("/");
//       } else {
//         toast.error("Verification failed. Please try again");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Verification failed. Please try again");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full items-center justify-center px-4">
//       <Card className="mx-auto max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Sign Up</CardTitle>
//           <CardDescription>
//             Enter your email below to sign up to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {!pendingVerification ? (
//             <form onSubmit={formik.handleSubmit} className="grid gap-4">
//               <div className="grid gap-2 grid-cols-2">
//                 <div className="">
//                   <Label htmlFor="username">First Name</Label>
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="First Name"
//                     value={formik.values.firstName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                 </div>
//                 <div className="">
//                   <Label htmlFor="username">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     type="text"
//                     placeholder="Last Name"
//                     value={formik.values.lastName}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Username"
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.username && formik.errors.username && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.username}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.email}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.password}
//                   </div>
//                 )}
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Signing Up..." : "Sign Up"}
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={onPressVerify} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="code">Verification Code</Label>
//                 <Input
//                   id="code"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="Enter verification code"
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Verifying..." : "Verify Email"}
//               </Button>
//             </form>
//           )}

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/sign-in" className="underline">
//               Sign In
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signup;

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// // import axios from "axios";
// import { useSignUp } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// // Form validation schema
// const validationSchema = Yup.object({
//   username: Yup.string()
//     .matches(
//       /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/,
//       "Username can only contain letters, numbers, and special characters."
//     )
//     .min(4, "Username must be at least 4 characters long")
//     .max(8, "Username must be at most 8 characters long")
//     .required("Username is required"),

//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),

//   password: Yup.string().required("Password is required"),
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
// });

// const Signup = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       console.log(values);

//       setIsSubmitting(true);
//       try {
//         console.log("tr1");

//         // // Check if username already exists
//         // const { data: users } = await axios.get("/api/getUser");

//         // const userExists = users.some(
//         //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         //   (user) => user.username === values.username
//         // );
//         // if (userExists) {
//         //   toast.error("Username already exists");
//         //   setIsSubmitting(false);
//         //   return;
//         // }

//         // Create new user
//         await signUp?.create({
//           username: values.username,
//           emailAddress: values.email,
//           password: values.password,
//           // firstName: values.firstName,
//           // lastName: values.lastName,
//         });

//         console.log("tr2");

//         // Prepare email verification
//         await signUp?.prepareEmailAddressVerification({
//           strategy: "email_code",
//         });
//         setPendingVerification(true);
//       } catch (err) {
//         console.error(err);
//         toast.error("Something went wrong. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//   });

//   // Handle email verification
//   const onPressVerify = async (e) => {
//     e.preventDefault();
//     if (!isLoaded) return;

//     setIsSubmitting(true);
//     try {
//       const completeSignup = await signUp.attemptEmailAddressVerification({
//         code,
//       });
//       if (completeSignup?.status === "complete") {
//         await setActive({ session: completeSignup.createdSessionId });
//         toast.success("Verification successful");
//         router.push("/");
//       } else {
//         toast.error("Verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Verification failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full items-center justify-center px-4">
//       <Card className="mx-auto max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Sign Up</CardTitle>
//           <CardDescription>
//             Enter your email below to sign up to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {!pendingVerification ? (
//             <form onSubmit={formik.handleSubmit} className="grid gap-4">
//               <div className="grid gap-2 grid-cols-2">
//                 <div>
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="First Name"
//                     {...formik.getFieldProps("firstName")}
//                   />
//                   {formik.touched.firstName && formik.errors.firstName && (
//                     <div className="text-red-500 text-sm">
//                       {formik.errors.firstName}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     type="text"
//                     placeholder="Last Name"
//                     {...formik.getFieldProps("lastName")}
//                   />
//                   {formik.touched.lastName && formik.errors.lastName && (
//                     <div className="text-red-500 text-sm">
//                       {formik.errors.lastName}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Username"
//                   {...formik.getFieldProps("username")}
//                 />
//                 {formik.touched.username && formik.errors.username && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.username}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   {...formik.getFieldProps("email")}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.email}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   {...formik.getFieldProps("password")}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.password}
//                   </div>
//                 )}
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Signing Up..." : "Sign Up"}
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={onPressVerify} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="code">Verification Code</Label>
//                 <Input
//                   id="code"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="Enter verification code"
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Verifying..." : "Verify Email"}
//               </Button>
//             </form>
//           )}

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/sign-in" className="underline">
//               Sign In
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signup;

// import statements...

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import { useFormik } from "formik";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import axios from "axios";
// import { useSignUp } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// // Form validation schema
// const validationSchema = Yup.object({
//   username: Yup.string()
//     .matches(
//       /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/,
//       "Username can only contain letters, numbers, and special characters."
//     )
//     .min(4, "Username must be at least 4 characters long")
//     .max(8, "Username must be at most 8 characters long")
//     .required("Username is required"),

//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),

//   password: Yup.string().required("Password is required"),
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
// });

// const Signup = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       try {
//         // Check if username already exists
//         const { data: users } = await axios.get("/api/getUser");

//         const userExists = users.some(
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           (user: any) => user.username === values.username
//         );
//         if (userExists) {
//           toast.error("Username already exists");
//           setIsSubmitting(false);
//           return;
//         }
//         // Create new user with supported parameters
//         await signUp?.create({
//           username: values.username,
//           emailAddress: values.email,
//           password: values.password,
//         });

//         // Update user with metadata fields for firstName and lastName
//         await signUp?.update({
//           unsafeMetadata: {
//             firstName: values.firstName,
//             lastName: values.lastName,
//           },
//         });

//         // Prepare email verification
//         await signUp?.prepareEmailAddressVerification({
//           strategy: "email_code",
//         });
//         setPendingVerification(true);
//       } catch (err) {
//         console.error(err);
//         toast.error("Something went wrong. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//   });

//   // Handle email verification
//   const onPressVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isLoaded) return;

//     setIsSubmitting(true);
//     try {
//       const completeSignup = await signUp.attemptEmailAddressVerification({
//         code,
//       });
//       if (completeSignup?.status === "complete") {
//         await setActive({ session: completeSignup.createdSessionId });
//         toast.success("Verification successful");
//         router.push("/");
//       } else {
//         toast.error("Verification failed. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Verification failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full items-center justify-center px-4">
//       <Card className="mx-auto max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Sign Up</CardTitle>
//           <CardDescription>
//             Enter your email below to sign up to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {!pendingVerification ? (
//             <form onSubmit={formik.handleSubmit} className="grid gap-4">
//               <div className="grid gap-2 grid-cols-2">
//                 <div>
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="First Name"
//                     {...formik.getFieldProps("firstName")}
//                   />
//                   {formik.touched.firstName && formik.errors.firstName && (
//                     <div className="text-red-500 text-sm">
//                       {formik.errors.firstName}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     type="text"
//                     placeholder="Last Name"
//                     {...formik.getFieldProps("lastName")}
//                   />
//                   {formik.touched.lastName && formik.errors.lastName && (
//                     <div className="text-red-500 text-sm">
//                       {formik.errors.lastName}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Username"
//                   {...formik.getFieldProps("username")}
//                 />
//                 {formik.touched.username && formik.errors.username && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.username}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   {...formik.getFieldProps("email")}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.email}
//                   </div>
//                 )}
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   {...formik.getFieldProps("password")}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="text-red-500 text-sm">
//                     {formik.errors.password}
//                   </div>
//                 )}
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Signing Up..." : "Sign Up"}
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={onPressVerify} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="code">Verification Code</Label>
//                 <Input
//                   id="code"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="Enter verification code"
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? "Verifying..." : "Verify Email"}
//               </Button>
//             </form>
//           )}

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/sign-in" className="underline">
//               Sign In
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signup;

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import axios from "axios";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Form validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/,
      "Username can only contain letters, numbers, and special characters."
    )
    .min(4, "Username must be at least 4 characters long")
    .max(8, "Username must be at most 8 characters long")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Check if username already exists
      // const { data: users } = await axios.get("/api/getUser");

      // const userExists = users.some(
      //   (user) => user.username === values.username
      // );
      // if (userExists) {
      //   toast.error("Username already exists");
      //   setIsSubmitting(false);
      //   return;
      // }
      // Create new user with supported parameters
      await signUp?.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      });

      // Update user with metadata fields for firstName and lastName
      await signUp?.update({
        unsafeMetadata: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });

      // Prepare email verification
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle email verification
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignup?.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId });
        toast.success("Verification successful");
        router.push("/");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!pendingVerification ? (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          ) : (
            <form onSubmit={onPressVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
