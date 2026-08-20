import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});
export type TSignupInput = z.infer<typeof signupSchema>;

export const companySetupSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyUserName: z.string().optional(),
  description: z.string().optional(),
  websiteUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});
export type TCompanySetupInput = z.infer<typeof companySetupSchema>;

export const companyInfoSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  websiteUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  logoUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});
export type TCompanyInfoInput = z.infer<typeof companyInfoSchema>;

export const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
  country: z.string().optional(),
  remoteOption: z.string().min(1, "Remote option is required"),
  employmentType: z.string().min(1, "Employment type is required"),
});
export type TJobFormInput = z.infer<typeof jobFormSchema>;

export const otpSchema = z.object({
  otp: z.string().min(4, "OTP is not valid"),
  newPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});
export type TOtpInput = z.infer<typeof otpSchema>;
