import { OnlineDiyetService } from "@/services/onlineDiyet.service";

export async function GET() {
  const data = await OnlineDiyetService.getAll();

  return Response.json({
    success: true,
    data,
  });
}
