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
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form validation schema
const validationSchema = yup.object({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]*$/,
      "Username can only contain letters, numbers, and special characters."
    )
    .min(4, "Username must be at least 4 characters long")
    .max(8, "Username must be at most 8 characters long")
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // to track form submission state
  const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      setIsSubmitting(true);
      try {
        // Check if username already exists
        const { data: users } = await axios.get("/api/getUser");
        console.log("get users=", users);

        const userExists = users.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (user: any) => user.username === values.username
        );
        if (userExists) {
          toast.error("Username already exists");
          setIsSubmitting(false);
          return;
        }

        // Create new user

        await signUp?.create({
          username: values.username,
          emailAddress: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        // Prepare email verification
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
        setIsSubmitting(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    },
  });

  // Handle email verification
  const onPressVerify = async (e: React.FormEvent) => {
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
        toast.error("Verification failed. Please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification failed. Please try again");
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
            <form onSubmit={formik.handleSubmit} className="grid gap-4">
              <div className="grid gap-2 grid-cols-2">
                <div className="">
                  <Label htmlFor="username">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="">
                  <Label htmlFor="username">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.username}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
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
