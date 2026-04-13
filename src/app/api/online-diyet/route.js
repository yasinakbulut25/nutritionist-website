import { OnlineDiyetService } from "@/services/onlineDiyet.service";
import { withErrorHandler } from "@/lib/api/handler";

export const GET = withErrorHandler(async () => {
  const data = await OnlineDiyetService.getAll();

  return Response.json({
    success: true,
    data,
  });
});
