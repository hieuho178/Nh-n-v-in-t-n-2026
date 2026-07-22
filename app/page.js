"use client";
import { useMemo, useState } from "react";

const API_URL = "/api/order";

const NOTEBOOKS = [
  {type:"Nhãn vở",number:1,name:"#1 Classmate",image:"/products/nv-01.webp"},
  {type:"Nhãn vở",number:2,name:"#2 Roblox",image:"/products/nv-02.webp"},
  {type:"Nhãn vở",number:3,name:"#3 Cute Animal",image:"/products/nv-03.webp"},
  {type:"Nhãn vở",number:4,name:"#4 Caro",image:"/products/nv-04.webp"},
  {type:"Nhãn vở",number:5,name:"#5 Astronaut",image:"/products/nv-05.webp"},
  {type:"Nhãn vở",number:6,name:"#6 Demon Hunter",image:"/products/nv-06.webp"},
  {type:"Nhãn vở",number:7,name:"#7 Bubu & Dudu",image:"/products/nv-07.webp"},
  {type:"Nhãn vở",number:8,name:"#8 Mine Craft",image:"/products/nv-08.webp"},
  {type:"Nhãn vở",number:9,name:"#9 Bare Bears",image:"/products/nv-09.webp"},
  {type:"Nhãn vở",number:10,name:"#10 Frozen Elsa",image:"/products/nv-10.webp"},
  {type:"Nhãn vở",number:11,name:"#11 Doraemon",image:"/products/nv-11.webp"},
  {type:"Nhãn vở",number:12,name:"#12 Paw Patrol",image:"/products/nv-12.webp"},
  {type:"Nhãn vở",number:13,name:"#13 Demon Slayer",image:"/products/nv-13.webp"},
  {type:"Nhãn vở",number:14,name:"#14 Toy Story",image:"/products/nv-14.webp"},
  {type:"Nhãn vở",number:16,name:"#16 Lotso Gấu hồng",image:"/products/nv-16.webp"},
  {type:"Nhãn vở",number:17,name:"#17 In Ảnh Paw Patrol",image:"/products/nv-17.webp"},
  {type:"Nhãn vở",number:18,name:"#18 In Ảnh Toy Story",image:"/products/nv-18.webp"},
  {type:"Nhãn vở",number:19,name:"#19 In Ảnh Lotso",image:"/products/nv-19.webp"},
  {type:"Nhãn vở",number:20,name:"#20 In Ảnh Doraemon",image:"/products/nv-20.webp"},
  {type:"Nhãn vở",number:22,name:"#22 In Ảnh Frozen",image:"/products/nv-22.webp"},
  {type:"Nhãn vở",number:23,name:"#23 In Ảnh Hello Kitty",image:"/products/nv-23.webp"},
  {type:"Nhãn vở",number:24,name:"#24 Sticker Cute",image:"/products/nv-24.webp"},
  {type:"Nhãn vở",number:25,name:"#25 Spider man",image:"/products/nv-25.webp"},
  {type:"Nhãn vở",number:26,name:"#26 Dragon Balls",image:"/products/nv-26.webp"},
  {type:"Nhãn vở",number:27,name:"#27 Naruto",image:"/products/nv-27.webp"},
  {type:"Nhãn vở",number:28,name:"#28 One Piece",image:"/products/nv-28.webp"},
  {type:"Nhãn vở",number:29,name:"#29 Sanrio",image:"/products/nv-29.webp"},
  {type:"Nhãn vở",number:30,name:"#30 Hello Kitty",image:"/products/nv-30.webp"},
  {type:"Nhãn vở",number:31,name:"#31 Capybara",image:"/products/nv-31.webp"},
  {type:"Nhãn vở",number:32,name:"#32 Stitch",image:"/products/nv-32.webp"},
  {type:"Nhãn vở",number:33,name:"#33 Dinosaur",image:"/products/nv-33.webp"},
  {type:"Nhãn vở",number:37,name:"#37 Gundam",image:"/products/nv-37.webp"},
  {type:"Nhãn vở",number:43,name:"#43 Cinnamoroll",image:"/products/nv-43.webp"},
  {type:"Nhãn vở",number:44,name:"#44 Melody",image:"/products/nv-44.webp"},
  {type:"Nhãn vở",number:45,name:"#45 Kuromi",image:"/products/nv-45.webp"}
];

const STICKERS = Array.from({length:30},(_,i)=>({
  type:"Sticker",
  code:`ST-${String(i+1).padStart(2,"0")}`,
  name:`ST-${String(i+1).padStart(2,"0")}`,
  image:`/products/st-${String(i+1).padStart(2,"0")}.webp`
}));

const PRODUCTS = [...NOTEBOOKS, ...STICKERS];

function PImg({p}){
  const [bad,setBad]=useState(false);
  return bad
    ? <div className="product-img">{p.name}</div>
    : <img src={p.image} alt={p.name} onError={()=>setBad(true)} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",display:"block"}} />;
}

export default function Home(){
  const [filter,setFilter]=useState("Nhãn vở");
  const [nv,setNv]=useState(null);
  const [st,setSt]=useState(null);
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);

  const visible=useMemo(()=>PRODUCTS.filter(p=>p.type===filter),[filter]);

  async function submit(e){
    e.preventDefault();
    const form=e.currentTarget;

    if(!nv && !st){
      setStatus("error:Vui lòng chọn ít nhất một mẫu.");
      return;
    }

    const f=new FormData(form);
    const d=Object.fromEntries(f.entries());

    const payload={
      order_id:`HG-${Date.now().toString(36).toUpperCase()}`,
      created_at:new Date().toISOString(),
      school:d.school||"",
      class_name:d.class_name||"",
      student_name:d.student_name||"",
      school_year:d.school_year||"",

      // Quan trọng: Google Sheet nhận đúng TÊN CHÍNH THỨC, ví dụ "#1 Classmate"
      notebook_design:nv?.name||"",
      notebook_qty:nv ? (d.notebook_qty||"1") : "",

      sticker_design:st?.name||"",
      sticker_qty:st ? (d.sticker_qty||"1") : "",

      recipient_name:d.recipient_name||"",
      phone:d.phone||"",
      province:d.province||"",
      district:d.district||"",
      ward:d.ward||"",
      address:d.address||"",
      note:d.note||"",
      payment_method:d.payment_method||"COD",
      total_amount:""
    };

    setBusy(true);
    setStatus("");

    try{
      const r=await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      const result=await r.json();
      if(!r.ok || !result.ok) throw new Error(result.error||"Không lưu được đơn hàng");

      setStatus(`success:Đặt hàng thành công. Mã đơn: ${payload.order_id}`);
      form.reset();
      setNv(null);
      setSt(null);
    }catch(err){
      setStatus(`error:${err.message||"Có lỗi khi gửi đơn."}`);
    }finally{
      setBusy(false);
    }
  }

  return <>
    <header className="hero"><div className="container">
      <span className="badge">PRINT ON DEMAND • CÁ NHÂN HÓA</span>
      <h1>Nhãn vở & Sticker in theo tên của bé</h1>
      <p className="lead">Chọn mẫu yêu thích, nhập thông tin và gửi đơn trực tiếp tới xưởng in.</p>
      <div className="actions"><a className="btn" href="#products">Chọn mẫu ngay</a><a className="btn secondary" href="#order">Đặt hàng</a></div>
    </div></header>

    <section id="products"><div className="container">
      <h2 className="section-title">Chọn mẫu</h2>
      <p className="section-sub">Chọn mẫu nhãn vở hoặc sticker. Có thể đặt cả hai sản phẩm trong cùng một đơn.</p>
      <div className="tabs">
        {["Nhãn vở","Sticker"].map(t=>
          <button type="button" key={t} onClick={()=>setFilter(t)} className={`tab ${filter===t?"active":""}`}>{t}</button>
        )}
      </div>

      <div className="grid">
        {visible.map(p=>{
          const selected = p.type==="Nhãn vở"
            ? nv?.name===p.name
            : st?.name===p.name;

          return <div key={p.name} className={`card ${selected?"selected":""}`}>
            <PImg p={p}/>
            <div className="card-body">
              <h3>{p.name}</h3>
              <p>{p.type}</p>
              <button type="button" className="btn" style={{width:"100%"}}
                onClick={()=>p.type==="Nhãn vở"?setNv(p):setSt(p)}>
                {selected?"Đã chọn":"Chọn mẫu"}
              </button>
            </div>
          </div>
        })}
      </div>
    </div></section>

    <section id="order"><div className="container">
      <h2 className="section-title">Thông tin đặt hàng</h2>
      <form onSubmit={submit}>
        <div className="form-wrap">
          <div className="panel">
            <h3>1. Nội dung cần in</h3>
            <div className="summary">
              <strong>Nhãn vở: {nv?.name||"Chưa chọn"}</strong>
              <strong>Sticker: {st?.name||"Chưa chọn"}</strong>
            </div>

            <label>Trường</label><input name="school"/>
            <label>Lớp</label><input name="class_name"/>
            <label>Tên học sinh *</label><input name="student_name" required/>
            <label>Năm học</label><input name="school_year" placeholder="2026-2027"/>
            <label>Số lượng nhãn vở</label><input name="notebook_qty" type="number" min="1" defaultValue="1"/>
            <label>Số lượng sticker</label><input name="sticker_qty" type="number" min="1" defaultValue="1"/>
          </div>

          <div className="panel">
            <h3>2. Giao hàng & thanh toán</h3>
            <label>Người nhận *</label><input name="recipient_name" required/>
            <label>Số điện thoại *</label><input name="phone" type="tel" required/>
            <label>Tỉnh/TP *</label><input name="province" required/>
            <label>Quận/Huyện *</label><input name="district" required/>
            <label>Phường/Xã *</label><input name="ward" required/>
            <label>Địa chỉ chi tiết *</label><input name="address" required/>
            <label>Ghi chú</label><textarea name="note"/>
            <label>Thanh toán</label>
            <select name="payment_method">
              <option value="COD">COD</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
            </select>

            <button className="btn" style={{width:"100%",marginTop:16}} disabled={busy}>
              {busy?"Đang gửi đơn...":"Xác nhận đặt hàng"}
            </button>

            {status.startsWith("success:")&&<div className="success">{status.slice(8)}</div>}
            {status.startsWith("error:")&&<div className="error">{status.slice(6)}</div>}
          </div>
        </div>
      </form>
    </div></section>

    <footer><div className="container">© 2026 • Nhãn vở & Sticker cá nhân hóa</div></footer>
    <div className="sticky"><a className="btn" href="#order">Đặt hàng</a></div>
  </>
}
