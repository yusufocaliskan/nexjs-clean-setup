import { getSession } from "next-auth/react";
import { nextAuthOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function GET({ req, res }) {
  const session = await getSession(req, res, nextAuthOptions);
  //FIX: Still needs some work
  console.log(session);
  return Response.json({ session: session });
}
