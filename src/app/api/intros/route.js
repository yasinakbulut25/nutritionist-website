import { withErrorHandler } from "@/lib/api/handler";
import { IntrosService } from "@/services/intros.service";

export const GET = withErrorHandler(async () => {
  const data = await IntrosService.getCommentsIntro();
  return Response.json({ success: true, data });
});
