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

    console.log("GOOGLE_STATUS:", response.status);
    console.log("GOOGLE_RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return Response.json(
        {
          ok: false,
          error: "Apps Script trả về: " + text.slice(0, 500),
        },
        { status: 500 }
      );
    }

    if (!response.ok || !data.ok) {
      return Response.json(
        {
          ok: false,
          error: data.error || `Google HTTP ${response.status}`,
        },
        { status: 500 }
      );
    }

    return Response.json(data);

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
