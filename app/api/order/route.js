const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlTUv0_Saz_OLxiuSdKvcNwioQqFD8k9HxzdiiNUl8XYn_AuO67ZAM83Gf9JqclOeK/exec";

function stripHtml(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await response.text();

    console.log("GOOGLE_STATUS:", response.status);
    console.log("GOOGLE_RESPONSE:", text);

    try {
      const data = JSON.parse(text);

      if (!data.ok) {
        throw new Error(data.error || "Apps Script báo lỗi");
      }

      return Response.json(data);
    } catch {
      const readableError = stripHtml(text);

      return Response.json(
        {
          ok: false,
          error: readableError.slice(0, 1200),
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("ORDER_API_ERROR", error);

    return Response.json(
      {
        ok: false,
        error: error?.message || "Không thể ghi đơn hàng",
      },
      { status: 500 }
    );
  }
}
