import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), adminEmail: z.string().email() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organization.create({
        data: {
          name: input.name,
          adminEmail: input.adminEmail,
          adminClerkUserId: ctx.auth.userId,
        },
      });
    }),
  addContext: protectedProcedure
    .input(z.object({ context: z.string().min(10) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.organization.update({
        where: { adminClerkUserId: ctx.auth.userId },
        data: { context: input.context },
      });
    }),
  getContext: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.organization.findUnique({
      where: { adminClerkUserId: ctx.auth.userId },
      select: { context: true },
    });
  }),
});
