import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "O usuário é obrigatório"),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
});

export const transactionSchema = z.object({
  description: z.string().min(3, "A descrição deve ter no mínimo 3 caracteres"),
  amount: z.coerce.number().positive("O valor deve ser um número positivo"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "A categoria é obrigatória"),
  date: z.string().min(1, "A data é obrigatória"),
});

export const noticeSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter no mínimo 10 caracteres"),
  category: z.enum(["GENERAL", "EVENT", "MEETING"]),
  date: z.string().min(1, "A data é obrigatória"),
  active: z.boolean().default(true),
  showPopup: z.boolean().default(false),
});

export const galleryPostSchema = z.object({
  image: z.string().min(1, "A imagem é obrigatória"),
  text: z.string().min(3, "O texto é obrigatório"),
  link: z.string().optional().nullable(),
  platform: z.enum(["facebook", "instagram"]),
  likes: z.coerce.number().nonnegative().default(0),
  comments: z.coerce.number().nonnegative().default(0),
  date: z.string().min(1, "A data é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type GalleryPostInput = z.infer<typeof galleryPostSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(5, "O título do post deve ter no mínimo 5 caracteres"),
  excerpt: z.string().min(10, "O resumo do post deve ter no mínimo 10 caracteres"),
  content: z.string().min(20, "O conteúdo do post deve ter no mínimo 20 caracteres"),
  image: z.string().min(1, "A imagem de capa é obrigatória"),
  category: z.string().min(1, "A categoria é obrigatória"),
  published: z.boolean().default(true),
  date: z.string().min(1, "A data é obrigatória"),
});

export const faqItemSchema = z.object({
  question: z.string().min(5, "A pergunta deve ter no mínimo 5 caracteres"),
  answer: z.string().min(10, "A resposta deve ter no mínimo 10 caracteres"),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export const financialGoalSchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2020),
  target: z.coerce.number().nonnegative("A meta deve ser maior ou igual a zero"),
  current: z.coerce.number().nonnegative("O valor arrecadado deve ser maior ou igual a zero"),
});

export const volunteerCandidateSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Insira um endereço de e-mail válido"),
  phone: z.string().min(8, "Insira um número de telefone válido"),
  area: z.string().min(1, "A área de interesse é obrigatória"),
  message: z.string().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type FaqItemInput = z.infer<typeof faqItemSchema>;
export type FinancialGoalInput = z.infer<typeof financialGoalSchema>;
export type VolunteerCandidateInput = z.infer<typeof volunteerCandidateSchema>;
