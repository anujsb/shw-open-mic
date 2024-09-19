import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { SipClient } from "livekit-server-sdk";
import { env } from "~/env";
import { TRPCClientError } from "@trpc/client";
const sipClient = new SipClient(
  env.LIVEKIT_API_ENDPOINT,
  env.LIVEKIT_API_KEY,
  env.LIVEKIT_API_SECRET,
);

export const livekitRouter = createTRPCRouter({
  makeCall: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().min(10),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organization = await ctx.db.organization.findUnique({
        where: {
          adminClerkUserId: ctx.auth.userId,
        },
      });
      if (!organization) {
        throw new TRPCClientError("Organization not found");
      }
      try {
        const roomName = `call-${organization.id}`;

        const sipParticipant = await sipClient.createSipParticipant(
          env.LIVEKIT_SIP_TRUNK_ID,
          input.phoneNumber,
          roomName,
          {
            participantIdentity: input.phoneNumber,
            participantName: "Phone Caller",
            playRingtone: true,
          },
        );

        console.log("SIP Participant created:", sipParticipant);
        return {
          roomName,
          participant: sipParticipant,
          message: "SIP Participant created",
        };
      } catch (error) {
        console.error("Error creating SIP participant:", error);
        throw new TRPCClientError("Error creating SIP participant");
      }
    }),
});
