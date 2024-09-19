import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const knowledgeBaseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findUnique({
        where: { adminClerkUserId: ctx.auth.userId },
      });
      if (!organization) {
        throw new TRPCClientError("Organization not found");
      }
      return ctx.db.knowledgeBase.create({
        data: {
          name: input.name,
          Organization: { connect: { id: organization.id } },
        },
      });
    }),
  getAllKnowledgeBases: protectedProcedure.query(async ({ ctx }) => {
    const organization = await ctx.db.organization.findUnique({
      where: { adminClerkUserId: ctx.auth.userId },
    });
    if (!organization) {
      throw new TRPCClientError("Organization not found");
    }
    return ctx.db.knowledgeBase.findMany({
      where: { organizationId: organization.id },
    });
  }),
  getSingleKnowledgeBase: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.findUnique({
        where: { adminClerkUserId: ctx.auth.userId },
      });
      if (!organization) {
        throw new TRPCClientError("Organization not found");
      }
      return ctx.db.knowledgeBase.findUnique({
        where: { id: input.id, organizationId: organization.id },
        include: { Faqs: true },
      });
    }),
  addFaqsToKnowledgeBase: protectedProcedure
    .input(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        knowledgeBaseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.faq.create({
        data: {
          question: input.question,
          answer: input.answer,
          KnowledgeBase: { connect: { id: input.knowledgeBaseId } },
        },
      });
    }),
  getAllKnowledgeBaseFaqs: protectedProcedure
    .input(z.object({ knowledgeBaseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.faq.findMany({
        where: { knowledgeBaseId: input.knowledgeBaseId },
      });
    }),
});
