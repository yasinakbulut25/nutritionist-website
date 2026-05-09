import { withErrorHandler } from "@/lib/api/handler";
import { sendContactNotification } from "@/lib/mail";

export const POST = withErrorHandler(async (req) => {
  const { ad, email, mesaj } = await req.json();

  if (!ad?.trim() || !email?.trim() || !mesaj?.trim()) {
    return Response.json(
      { success: false, message: "Tüm alanlar zorunludur." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return Response.json(
      { success: false, message: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  if (mesaj.trim().length < 10) {
    return Response.json(
      { success: false, message: "Mesaj en az 10 karakter olmalıdır." },
      { status: 400 },
    );
  }

  try {
    await sendContactNotification({
      ad: ad.trim(),
      email: email.trim(),
      mesaj: mesaj.trim(),
    });
  } catch (err) {
    console.error("İletişim maili gönderilemedi:", err.message);
  }

  return Response.json({ success: true }, { status: 201 });
});
