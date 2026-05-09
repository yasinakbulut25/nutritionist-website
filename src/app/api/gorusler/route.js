import { withErrorHandler } from "@/lib/api/handler";
import { CommentsService } from "@/services/comments.service";
import { sendNewCommentNotification } from "@/lib/mail";

export const GET = withErrorHandler(async () => {
  const data = await CommentsService.getAll();
  return Response.json({ success: true, data });
});

export const POST = withErrorHandler(async (req) => {
  const { ekleyen, sehir, icerik } = await req.json();

  if (!ekleyen?.trim() || !sehir?.trim() || !icerik?.trim()) {
    return Response.json(
      { success: false, message: "Tüm alanlar zorunludur." },
      { status: 400 },
    );
  }

  if (icerik.trim().length < 10) {
    return Response.json(
      { success: false, message: "Görüş en az 10 karakter olmalıdır." },
      { status: 400 },
    );
  }

  const id = await CommentsService.create({
    ekleyen: ekleyen.trim(),
    sehir: sehir.trim(),
    icerik: icerik.trim(),
  });

  try {
    await sendNewCommentNotification({
      ekleyen: ekleyen.trim(),
      sehir: sehir.trim(),
      icerik: icerik.trim(),
    });
  } catch (err) {
    console.error("Mail gönderilemedi:", err.message);
  }

  return Response.json({ success: true, id }, { status: 201 });
});
