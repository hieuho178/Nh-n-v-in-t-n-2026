"use client";

import { useMemo, useState } from "react";

const API_URL = "/api/order";

const NOTEBOOKS = [
  { type: "Nhãn vở", number: 1, name: "#1 Classmate", image: "/products/nv-01.webp" },
  { type: "Nhãn vở", number: 2, name: "#2 Roblox", image: "/products/nv-02.webp" },
  { type: "Nhãn vở", number: 3, name: "#3 Cute Animal", image: "/products/nv-03.webp" },
  { type: "Nhãn vở", number: 4, name: "#4 Caro", image: "/products/nv-04.webp" },
  { type: "Nhãn vở", number: 5, name: "#5 Astronaut", image: "/products/nv-05.webp" },
  { type: "Nhãn vở", number: 6, name: "#6 Demon Hunter", image: "/products/nv-06.webp" },
  { type: "Nhãn vở", number: 7, name: "#7 Bubu & Dudu", image: "/products/nv-07.webp" },
  { type: "Nhãn vở", number: 8, name: "#8 Mine Craft", image: "/products/nv-08.webp" },
  { type: "Nhãn vở", number: 9, name: "#9 Bare Bears", image: "/products/nv-09.webp" },
  { type: "Nhãn vở", number: 10, name: "#10 Frozen Elsa", image: "/products/nv-10.webp" },
  { type: "Nhãn vở", number: 11, name: "#11 Doraemon", image: "/products/nv-11.webp" },
  { type: "Nhãn vở", number: 12, name: "#12 Paw Patrol", image: "/products/nv-12.webp" },
  { type: "Nhãn vở", number: 13, name: "#13 Demon Slayer", image: "/products/nv-13.webp" },
  { type: "Nhãn vở", number: 14, name: "#14 Toy Story", image: "/products/nv-14.webp" },
  { type: "Nhãn vở", number: 16, name: "#16 Lotso Gấu hồng", image: "/products/nv-16.webp" },
  { type: "Nhãn vở", number: 17, name: "#17 In Ảnh Paw Patrol", image: "/products/nv-17.webp" },
  { type: "Nhãn vở", number: 18, name: "#18 In Ảnh Toy Story", image: "/products/nv-18.webp" },
  { type: "Nhãn vở", number: 19, name: "#19 In Ảnh Lotso", image: "/products/nv-19.webp" },
  { type: "Nhãn vở", number: 20, name: "#20 In Ảnh Doraemon", image: "/products/nv-20.webp" },
  { type: "Nhãn vở", number: 22, name: "#22 In Ảnh Frozen", image: "/products/nv-22.webp" },
  { type: "Nhãn vở", number: 23, name: "#23 In Ảnh Hello Kitty", image: "/products/nv-23.webp" },
  { type: "Nhãn vở", number: 24, name: "#24 Sticker Cute", image: "/products/nv-24.webp" },
  { type: "Nhãn vở", number: 25, name: "#25 Spider man", image: "/products/nv-25.webp" },
  { type: "Nhãn vở", number: 26, name: "#26 Dragon Balls", image: "/products/nv-26.webp" },
  { type: "Nhãn vở", number: 27, name: "#27 Naruto", image: "/products/nv-27.webp" },
  { type: "Nhãn vở", number: 28, name: "#28 One Piece", image: "/products/nv-28.webp" },
  { type: "Nhãn vở", number: 29, name: "#29 Sanrio", image: "/products/nv-29.webp" },
  { type: "Nhãn vở", number: 30, name: "#30 Hello Kitty", image: "/products/nv-30.webp" },
  { type: "Nhãn vở", number: 31, name: "#31 Capybara", image: "/products/nv-31.webp" },
  { type: "Nhãn vở", number: 32, name: "#32 Stitch", image: "/products/nv-32.webp" },
  { type: "Nhãn vở", number: 33, name: "#33 Dinosaur", image: "/products/nv-33.webp" },
  { type: "Nhãn vở", number: 37, name: "#37 Gundam", image: "/products/nv-37.webp" },
  { type: "Nhãn vở", number: 43, name: "#43 Cinnamoroll", image: "/products/nv-43.webp" },
  { type: "Nhãn vở", number: 44, name: "#44 Melody", image: "/products/nv-44.webp" },
  { type: "Nhãn vở", number: 45, name: "#45 Kuromi", image: "/products/nv-45.webp" },
];

const STICKERS = [
  { type: "Sticker", number: 54, name: "#54 Bé trai 1", image: "/products/st-54.webp" },
  { type: "Sticker", number: 55, name: "#55 Bé trai 2", image: "/products/st-55.webp" },
  { type: "Sticker", number: 56, name: "#56 Bé gái", image: "/products/st-56.webp" },
  { type: "Sticker", number: 57, name: "#57 Siêu Nhân", image: "/products/st-57.webp" },
  { type: "Sticker", number: 58, name: "#58 Doraemon", image: "/products/st-58.webp" },
  { type: "Sticker", number: 59, name: "#59 Sắc màu", image: "/products/st-59.webp" },
  { type: "Sticker", number: 60, name: "#60 Cute Animals", image: "/products/st-60.webp" },
  { type: "Sticker", number: 61, name: "#61 Paw Patrol", image: "/products/st-61.webp" },
  { type: "Sticker", number: 62, name: "#62 Cute Rabbit", image: "/products/st-62.webp" },
  { type: "Sticker", number: 63, name: "#63 Shin Cậu bé bút chì", image: "/products/st-63.webp" },
  { type: "Sticker", number: 64, name: "#64 Chú Ếch xanh", image: "/products/st-64.webp" },
  { type: "Sticker", number: 65, name: "#65 Toy Story", image: "/products/st-65.webp" },
  { type: "Sticker", number: 67, name: "#67 Capybara", image: "/products/st-67.webp" },
  { type: "Sticker", number: 68, name: "#68 Kuromi", image: "/products/st-68.webp" },
  { type: "Sticker", number: 69, name: "#69 Cinamoroll", image: "/products/st-69.webp" },
  { type: "Sticker", number: 70, name: "#70 Melody", image: "/products/st-70.webp" },
  { type: "Sticker", number: 71, name: "#71 Bé Dâu Cute", image: "/products/st-71.webp" },
  { type: "Sticker", number: 72, name: "#72 Cute Kawaii", image: "/products/st-72.webp" },
  { type: "Sticker", number: 73, name: "#73 Cỏ may mắn", image: "/products/st-73.webp" },
  { type: "Sticker", number: 74, name: "#74 Cute cats", image: "/products/st-74.webp" },
  { type: "Sticker", number: 75, name: "#75 Bé Bơ", image: "/products/st-75.webp" },
  { type: "Sticker", number: 76, name: "#76 Bé Sóc", image: "/products/st-76.webp" },
  { type: "Sticker", number: 77, name: "#77 Bánh ngọt", image: "/products/st-77.webp" },
  { type: "Sticker", number: 78, name: "#78 Bé Sâu", image: "/products/st-78.webp" },
];

const PRODUCTS = [...NOTEBOOKS, ...STICKERS];

function PImg({ p }) {
  const [bad, setBad] = useState(false);

  if (bad) {
    return <div className="product-img">{p.name}</div>;
  }

  return (
    <img
      src={p.image}
      alt={p.name}
      onError={() => setBad(true)}
      style={{
        width: "100%",
        aspectRatio: "1/1",
        objectFit: "contain",
        display: "block",
        background: "#ffffff",
      }}
    />
  );
}

export default function Home() {
  const [filter, setFilter] = useState("Nhãn vở");
  const [nv, setNv] = useState(null);
  const [st, setSt] = useState(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const visible = useMemo(
    () => PRODUCTS.filter((p) => p.type === filter),
    [filter]
  );

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!nv && !st) {
      setStatus("error:Vui lòng chọn ít nhất một mẫu.");
      return;
    }

    const f = new FormData(form);
    const d = Object.fromEntries(f.entries());

    const payload = {
      order_id: `HG-${Date.now().toString(36).toUpperCase()}`,
      created_at: new Date().toISOString(),

      school: d.school || "",
      class_name: d.class_name || "",
      student_name: d.student_name || "",
      school_year: d.school_year || "",

      notebook_design: nv?.name || "",
      notebook_qty: nv ? d.notebook_qty || "1" : "",

      sticker_design: st?.name || "",
      sticker_qty: st ? d.sticker_qty || "1" : "",

      recipient_name: d.recipient_name || "",
      phone: d.phone || "",
      province: d.province || "",

      district: "",

      ward: d.ward || "",
      address: d.address || "",
      note: d.note || "",

      discount_code: d.discount_code || "",

      payment_method: d.payment_method || "COD",
      total_amount: "",
    };

    setBusy(true);
    setStatus("");

    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await r.json();

      if (!r.ok || !result.ok) {
        throw new Error(result.error || "Không lưu được đơn hàng");
      }

      setStatus(
        "success:Quý khách đã đặt hàng thành công, Lah Art sẽ sớm liên hệ lại với quý khách để xác nhận giao hàng. Trong trường hợp cần gấp vui lòng liên hệ Zalo: 0789387343"
      );

      form.reset();
      setNv(null);
      setSt(null);
    } catch (err) {
      setStatus(`error:${err.message || "Có lỗi khi gửi đơn."}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="top-banner">
        <img
          src="/products/banner-hero-01.png"
          alt="Nhãn vở in sẵn thông tin bé - LAH ART PRINT"
        />
      </div>

      <div className="hero-benefits">
        <div className="container">
          
        </div>
      </div>

      <header className="hero">
        <div className="container">
          <span className="badge">LAH ART PRINT • CTY IN HỒ GIA</span>

          <h1>
            Nhãn vở & Sticker in tên bé
            <br />
            Mẫu mới 2026-2027
          </h1>

          <p className="lead">
            <h3>
            👉 Sản phẩm bán chạy Top 1 Shopee suốt 5 năm, với >100.000 lượt mua.
            <br />
            👉 Sản xuất trên hệ thống máy in Konica của Nhật Bản, đảm bảo chất lượng, màu sắc
            <br />
             👉 Chất liệu decal OJI nhập khẩu Nhật Bản, không độc hại, không bay mùi, đảm bảo an toàn cho trẻ
            <br />
            👉 Đặt hàng và nhận ngay trong ngày, Có ship Hỏa Tốc nội thành HN, Ship Viettel toàn quốc.
            <br />
            👉 Gần 100 mẫu phù hơp với nhiều lứa tuổi, cho cả bé trai và bé gái
             </h3>
          </p>

          <div className="actions">
            <a
              href="https://zalo.me/0789387343"
              target="_blank"
              rel="noopener noreferrer"
              className="zalo-image-link"
              aria-label="Liên hệ LAH ART PRINT qua Zalo"
            >
              <img
                src="/products/zalo-contact.jpg"
                alt="Liên hệ Zalo LAH ART PRINT - 0789 387 343"
                className="zalo-contact-image"
              />
            </a>
          </div>
        </div>
      </header>

      <section id="products">
        <div className="container">
          <h2 className="section-title">
            Chọn mẫu nhãn vở và sticker yêu thích của bé
          </h2>

          <p className="section-sub">
            Bạn có thể chọn{" "}
            <strong>1 mẫu nhãn vở và 1 mẫu sticker</strong> trong cùng 1 đơn
            hàng. Nếu mua{" "}
            <strong>từ 2 mẫu nhãn vở hoặc sticker trở lên</strong>, vui lòng
            nhập thông tin thành nhiều lần để tránh nhầm lẫn.
          </p>

          <div className="tabs">
            {["Nhãn vở", "Sticker"].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setFilter(t)}
                className={`tab ${filter === t ? "active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid">
            {visible.map((p) => {
              const selected =
                p.type === "Nhãn vở"
                  ? nv?.name === p.name
                  : st?.name === p.name;

              return (
                <div
                  key={p.name}
                  className={`card ${selected ? "selected" : ""}`}
                >
                  <PImg p={p} />

                  <div className="card-body">
                    <h3>{p.name}</h3>

                    <p>{p.type}</p>

                    <button
                      type="button"
                      className="btn"
                      style={{ width: "100%" }}
                      onClick={() =>
                        p.type === "Nhãn vở" ? setNv(p) : setSt(p)
                      }
                    >
                      {selected ? "Đã chọn" : "Chọn mẫu"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="order">
        <div className="container">
          <h2 className="section-title">Thông tin đặt hàng</h2>

          <form onSubmit={submit}>
            <div className="form-wrap">
              <div className="panel">
                <h3>1. Nội dung cần in</h3>

                <div className="summary">
                  <strong>
                    Nhãn vở: {nv?.name || "Chưa chọn"}
                  </strong>

                  <strong>
                    Sticker: {st?.name || "Chưa chọn"}
                  </strong>
                </div>

                <label>Trường</label>
                <input name="school" />

                <label>Lớp</label>
                <input name="class_name" />

                <label>Tên học sinh *</label>
                <input name="student_name" required />

                <label>Năm học</label>
                <input
                  name="school_year"
                  placeholder="2026-2027"
                />

                <label>Số lượng nhãn vở</label>
                <input
                  name="notebook_qty"
                  type="number"
                  min="1"
                  defaultValue="1"
                />

                <label>Số lượng sticker</label>
                <input
                  name="sticker_qty"
                  type="number"
                  min="1"
                  defaultValue="1"
                />
              </div>

              <div className="panel">
                <h3>2. Giao hàng & thanh toán</h3>

                <label>Người nhận *</label>
                <input
                  name="recipient_name"
                  required
                />

                <label>Số điện thoại *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                />

                <label>Tỉnh/TP *</label>
                <input
                  name="province"
                  required
                />

                <label>Phường/Xã *</label>
                <input
                  name="ward"
                  required
                />

                <label>Địa chỉ chi tiết *</label>
                <input
                  name="address"
                  required
                />

                <label>Ghi chú</label>
                <textarea name="note" />

                <label>Mã Giảm Giá</label>
                <input
                  name="discount_code"
                  placeholder="Nhập mã giảm giá nếu có"
                />

                <label>Thanh toán</label>
                <select name="payment_method">
                  <option value="COD">COD</option>
                  <option value="Chuyển khoản">
                    Chuyển khoản
                  </option>
                </select>

                <button
                  className="btn"
                  style={{
                    width: "100%",
                    marginTop: 16,
                  }}
                  disabled={busy}
                >
                  {busy
                    ? "Đang gửi đơn..."
                    : "Xác nhận đặt hàng"}
                </button>

                {status.startsWith("success:") && (
                  <div className="success">
                    {status.slice(8)}
                  </div>
                )}

                {status.startsWith("error:") && (
                  <div className="error">
                    {status.slice(6)}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="container">
          © 2026 • Nhãn vở & Sticker cá nhân hóa
        </div>
      </footer>

      <div className="sticky">
        <a
          className="btn"
          href="#order"
        >
          Đặt hàng
        </a>
      </div>
    </>
  );
}
