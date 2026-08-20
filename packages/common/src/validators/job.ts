import { z } from "zod";
import {
  jobRemoteOptions,
  jobEmploymentTypes,
} from "../api/userApi/types";

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
  title: z.string().min(1, "Job title is required").trim(),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
  remoteOption: z.enum(jobRemoteOptions as [string, ...string[]]),
  employmentType: z.enum(jobEmploymentTypes as [string, ...string[]]),
});
export type TJobFormInput = z.infer<typeof jobFormSchema>;

export const otpSchema = z.object({
  otp: z.string().min(4, "OTP is not valid"),
  newPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});
export type TOtpInput = z.infer<typeof otpSchema>;
