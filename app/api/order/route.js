const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlTUv0_Saz_OLxiuSdKvcNwioQqFD8k9HxzdiiNUl8XYn_AuO67ZAM83Gf9JqclOeK/exec";

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

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "Google Apps Script trả về dữ liệu không hợp lệ"
      );
    }

    if (!response.ok || !data.ok) {
      throw new Error(
        data.error || `Google Apps Script HTTP ${response.status}`
      );
    }

    return Response.json(data, {
      status: 200,
    });

  } catch (error) {

    console.error("ORDER_API_ERROR", error);

    return Response.json(
      {
        ok: false,
        error: error?.message || "Không thể ghi đơn hàng",
      },
      {
        status: 500,
      }
    );
  }
}
