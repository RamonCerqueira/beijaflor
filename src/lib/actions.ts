"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { prisma } from "./db";
import fs from "fs";
import path from "path";
import { setAdminSession, clearAdminSession, getAdminSession } from "./auth";
import { loginSchema, transactionSchema, noticeSchema, galleryPostSchema, blogPostSchema, faqItemSchema, financialGoalSchema, volunteerCandidateSchema } from "./validations";
import bcrypt from "bcryptjs";

// Helper to assert admin session
async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || !session.isAdmin) {
    throw new Error("Não autorizado. Faça login como administrador.");
  }
  return session;
}

// 1. Admin Authentication Actions
export async function loginAdminAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validation = loginSchema.safeParse({ username, password });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    // BANCO SUPABASE PAUSADO - Autenticação no banco comentada:
    // const user = await prisma.user.findUnique({ where: { username } });
    // if (!user) {
    //   return { error: "Usuário ou senha incorretos" };
    // }
    // const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    // if (!passwordMatch) {
    //   return { error: "Usuário ou senha incorretos" };
    // }

    // Set JWT Session
    await setAdminSession(username);
  } catch (error) {
    console.error("Erro no login:", error);
    return { error: "Erro interno no servidor" };
  }

  // Redirect on success
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/login");
}

// 2. Financial Transactions Actions
export async function createTransactionAction(data: any) {
  await requireAdmin();

  const validation = transactionSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { description, amount, type, category, date } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.transaction.create({
    //   data: {
    //     description,
    //     amount,
    //     type,
    //     category,
    //     date: new Date(date),
    //   },
    // });
    
    revalidatePath("/transparencia");
    revalidatePath("/admin/financeiro");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return { error: "Falha ao registrar transação no banco de dados" };
  }
}

export async function updateTransactionAction(id: string, data: any) {
  await requireAdmin();

  const validation = transactionSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { description, amount, type, category, date } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.transaction.update({
    //   where: { id },
    //   data: {
    //     description,
    //     amount,
    //     type,
    //     category,
    //     date: new Date(date),
    //   },
    // });

    revalidatePath("/transparencia");
    revalidatePath("/admin/financeiro");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    return { error: "Falha ao atualizar transação no banco de dados" };
  }
}

export async function deleteTransactionAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.transaction.delete({ where: { id } });
    
    revalidatePath("/transparencia");
    revalidatePath("/admin/financeiro");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    return { error: "Falha ao remover transação" };
  }
}

// 3. Notices Actions
export async function createNoticeAction(data: any) {
  await requireAdmin();

  const validation = noticeSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { title, content, category, date, active, showPopup } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operações comentadas:
    // if (showPopup) {
    //   await prisma.notice.updateMany({
    //     data: { showPopup: false },
    //   });
    // }
    // await prisma.notice.create({
    //   data: {
    //     title,
    //     content,
    //     category,
    //     date: new Date(date),
    //     active,
    //     showPopup,
    //   },
    // });

    revalidatePath("/");
    revalidatePath("/avisos");
    revalidatePath("/admin/avisos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    return { error: "Falha ao criar aviso" };
  }
}

export async function toggleNoticeAction(id: string, currentActive: boolean) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.notice.update({
    //   where: { id },
    //   data: { active: !currentActive },
    // });

    revalidatePath("/");
    revalidatePath("/avisos");
    revalidatePath("/admin/avisos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alternar status do aviso:", error);
    return { error: "Falha ao atualizar status do aviso" };
  }
}

export async function toggleNoticePopupAction(id: string, currentShowPopup: boolean) {
  await requireAdmin();

  const newShowPopup = !currentShowPopup;

  try {
    // BANCO SUPABASE PAUSADO - Operações comentadas:
    // if (newShowPopup) {
    //   await prisma.notice.updateMany({
    //     data: { showPopup: false },
    //   });
    // }
    // await prisma.notice.update({
    //   where: { id },
    //   data: { showPopup: newShowPopup },
    // });

    revalidatePath("/");
    revalidatePath("/avisos");
    revalidatePath("/admin/avisos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alternar destaque do aviso:", error);
    return { error: "Falha ao atualizar destaque do aviso" };
  }
}

export async function deleteNoticeAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.notice.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/avisos");
    revalidatePath("/admin/avisos");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar aviso:", error);
    return { error: "Falha ao remover aviso" };
  }
}

// 4. Gallery Posts Actions
export async function createGalleryPostAction(data: any) {
  await requireAdmin();

  const validation = galleryPostSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { image, text, link, platform, likes, comments, date } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.galleryPost.create({
    //   data: {
    //     image,
    //     text,
    //     link: link || null,
    //     platform,
    //     likes,
    //     comments,
    //     date: new Date(date),
    //   },
    // });

    revalidatePath("/");
    revalidatePath("/admin/galeria");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar post de galeria:", error);
    return { error: "Falha ao cadastrar post na galeria" };
  }
}

export async function deleteGalleryPostAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.galleryPost.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin/galeria");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar post de galeria:", error);
    return { error: "Falha ao remover post da galeria" };
  }
}

// 5. Blog / Notícias Actions
export async function createBlogPostAction(data: any) {
  await requireAdmin();

  const validation = blogPostSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { title, excerpt, content, image, category, published, date } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.blogPost.create({
    //   data: {
    //     title,
    //     excerpt,
    //     content,
    //     image,
    //     category,
    //     published,
    //     date: new Date(date),
    //   },
    // });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar post de blog:", error);
    return { error: "Falha ao cadastrar post de blog" };
  }
}

export async function deleteBlogPostAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir post de blog:", error);
    return { error: "Falha ao remover post de blog" };
  }
}

export async function toggleBlogPostPublishAction(id: string, currentPublished: boolean) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.blogPost.update({
    //   where: { id },
    //   data: { published: !currentPublished },
    // });

    revalidatePath("/blog");
    revalidatePath(`/blog/${id}`);
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao alternar status do post de blog:", error);
    return { error: "Falha ao alternar visibilidade do post" };
  }
}

// 6. FAQ Actions
export async function createFaqItemAction(data: any) {
  await requireAdmin();

  const validation = faqItemSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { question, answer, order, active } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.faqItem.create({
    //   data: {
    //     question,
    //     answer,
    //     order,
    //     active,
    //   },
    // });

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar item de FAQ:", error);
    return { error: "Falha ao cadastrar item de FAQ" };
  }
}

export async function updateFaqItemAction(id: string, data: any) {
  await requireAdmin();

  const validation = faqItemSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { question, answer, order, active } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.faqItem.update({
    //   where: { id },
    //   data: {
    //     question,
    //     answer,
    //     order,
    //     active,
    //   },
    // });

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar item de FAQ:", error);
    return { error: "Falha ao atualizar item de FAQ" };
  }
}

export async function deleteFaqItemAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.faqItem.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir item de FAQ:", error);
    return { error: "Falha ao remover item de FAQ" };
  }
}

// 7. Volunteer Candidates Actions
export async function createVolunteerCandidateAction(data: any) {
  const validation = volunteerCandidateSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { name, email, phone, area, message } = validation.data;

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.volunteerCandidate.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     area,
    //     message,
    //     status: "PENDING",
    //   },
    // });

    revalidatePath("/admin/voluntarios");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar candidato a voluntário:", error);
    return { error: "Erro interno ao enviar formulário. Tente novamente mais tarde." };
  }
}

export async function updateVolunteerCandidateStatusAction(id: string, status: string) {
  await requireAdmin();

  if (!["PENDING", "CONTACTED", "ARCHIVED"].includes(status)) {
    return { error: "Status inválido" };
  }

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.volunteerCandidate.update({
    //   where: { id },
    //   data: { status },
    // });

    revalidatePath("/admin/voluntarios");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status do candidato:", error);
    return { error: "Falha ao atualizar status do candidato" };
  }
}

export async function deleteVolunteerCandidateAction(id: string) {
  await requireAdmin();

  try {
    // BANCO SUPABASE PAUSADO - Operação comentada:
    // await prisma.volunteerCandidate.delete({ where: { id } });

    revalidatePath("/admin/voluntarios");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir candidato:", error);
    return { error: "Falha ao remover candidato do banco" };
  }
}

// 8. Financial Goals Actions
export async function updateFinancialGoalAction(month: number, year: number, target: number, current: number) {
  await requireAdmin();

  const validation = financialGoalSchema.safeParse({ month, year, target, current });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    // BANCO SUPABASE PAUSADO - Operações comentadas:
    // const existing = await prisma.financialGoal.findFirst({
    //   where: { month, year },
    // });
    // if (existing) {
    //   await prisma.financialGoal.update({
    //     where: { id: existing.id },
    //     data: { target, current },
    //   });
    // } else {
    //   await prisma.financialGoal.create({
    //     data: { month, year, target, current },
    //   });
    // }

    revalidatePath("/");
    revalidatePath("/admin/financeiro");
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar meta financeira:", error);
    return { error: "Falha ao atualizar meta financeira no banco" };
  }
}

export async function uploadFileAction(formData: FormData) {
  try {
    await requireAdmin();
  } catch (err: any) {
    return { error: err.message };
  }

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "Nenhum arquivo enviado" };
  }

  // Validate if file is an image
  if (!file.type.startsWith("image/")) {
    return { error: "O arquivo enviado não é uma imagem" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    // Sanitize filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${sanitizedName}`;
    const filepath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filepath, buffer);
    const fileUrl = `/uploads/${filename}`;

    return { url: fileUrl };
  } catch (error) {
    console.error("Erro no upload de imagem:", error);
    return { error: "Falha ao salvar a imagem no servidor" };
  }
}
