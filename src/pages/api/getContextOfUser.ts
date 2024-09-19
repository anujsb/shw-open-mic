import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const {
      organizationId,
    }: {
      organizationId: string;
    } = req.query as {
      organizationId: string;
    };
    const organization = await db.organization.findUnique({
      where: {
        id: organizationId,
      },
      select: {
        context: true,
      },
    });
    if (!organization?.context) {
      return res.status(404).json({
        error: "Organization not found for the provided phone number",
      });
    }

    return res.status(200).json({ context: organization.context });
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
