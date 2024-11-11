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
import * as Yup from "yup";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import axios from "axios";

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

type FormData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type FormErrors = Partial<FormData>;

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      console.log("formData=", formData);

      // Create new user with Clerk
      setIsSubmitting(true);
      const getUsers = await axios.get("/api/getUser");
      console.log("existingUser=", getUsers.data.users);
      const usersData = getUsers.data.users;
      if (usersData !== 200) return;

      const existingUser = usersData.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user: any) => user.email === formData.email
      );

      if (existingUser) {
        toast.error("User already exists");
        return;
      }

      const userExists = usersData.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (user: any) => user.username === formData.username
      );
      if (userExists) {
        toast.error("Username already exists");
        return;
      }
      await signUp?.create({
        username: formData.username,
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp?.update({
        unsafeMetadata: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (validationError: any) {
      if (validationError.inner) {
        const newErrors: FormErrors = validationError.inner.reduce(
          (acc: FormErrors, error: Yup.ValidationError) => {
            acc[error.path as keyof FormErrors] = error.message;
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.log("error=", error);

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
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm">{errors.username}</div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
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
