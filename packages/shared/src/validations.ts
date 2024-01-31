import { z } from "zod";

/* User */
export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  hashedPassword: z.string()
});
export type User = z.infer<typeof userSchema>;

export const registerSchema = userSchema
  .omit({ id: true, hashedPassword: true })
  .extend({ password: z.string() });
export type UserRegister = z.infer<typeof registerSchema>;

export const loginSchema = userSchema
  .pick({ email: true })
  .extend({ password: z.string() });
export type UserLogin = z.infer<typeof loginSchema>;

export const updateUserSchema = userSchema.pick({ username: true });
export type UpdateUser = z.infer<typeof updateUserSchema>;

/* Collection */
export const collectionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1).max(30),
});
export type Collection = z.infer<typeof collectionSchema>;

export const newCollectionSchema = collectionSchema.pick({ name: true });
export type NewCollection = z.infer<typeof newCollectionSchema>;

export const updateCollectionSchema = collectionSchema.pick({ name: true });
export type UpdateCollection = z.infer<typeof updateCollectionSchema>;

/* Link */
export const linkSchema = z.object({
  id: z.string(),
  collectionId: z.string(),
  url: z.string().url()
});
export type Link = z.infer<typeof linkSchema>;

export const newLinkSchema = linkSchema.pick({ url: true });
export type NewLink = z.infer<typeof newLinkSchema>;

export const updateLinkSchema = linkSchema.pick({ url: true });
export type UpdateLink = z.infer<typeof updateLinkSchema>;