import { withErrorHandler } from "@/lib/api/handler";
import { CommentsService } from "@/services/comments.service";

export const GET = withErrorHandler(async () => {
  const data = await CommentsService.getAll();

  return Response.json({
    success: true,
    data,
  });
});
