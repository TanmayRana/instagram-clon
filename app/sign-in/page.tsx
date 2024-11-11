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
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormData>;

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (!isLoaded) {
        toast.error("Sign-in service not loaded. Please try again later.");
        return;
      }

      setIsSubmitting(true);

      const { data: getUsersData } = await axios.get("/api/getUser");
      const users = getUsersData.users;
      console.log("userData in login=", users);

      if (
        !users.some((user: { email: string }) => user.email === formData.email)
      ) {
        toast.error("User with this email does not exist. Please sign up.");
        setIsSubmitting(false);
        return;
      }

      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const newErrors: FormErrors = validationError.inner.reduce(
          (acc: FormErrors, error) => {
            acc[error.path as keyof FormErrors] = error.message;
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
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
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
