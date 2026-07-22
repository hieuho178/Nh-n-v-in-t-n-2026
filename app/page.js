"use client";
import { useMemo, useState } from "react";

const API_URL = "/api/order";
const PRODUCTS = [
  ...Array.from({length:36},(_,i)=>({type:"Nhãn vở",code:`NV-${String(i+1).padStart(2,"0")}`,image:`/products/nv-${String(i+1).padStart(2,"0")}.webp`})),
  ...Array.from({length:30},(_,i)=>({type:"Sticker",code:`ST-${String(i+1).padStart(2,"0")}`,image:`/products/st-${String(i+1).padStart(2,"0")}.webp`}))
];

function PImg({p}){
  const [bad,setBad]=useState(false);
  return bad
    ? <div className="product-img">{p.code}</div>
    : <img src={p.image} alt={p.code} onError={()=>setBad(true)} style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",display:"block"}} />;
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
    const form = e.currentTarget;
    if(!nv && !st){setStatus("error:Vui lòng chọn ít nhất một mẫu.");return;}
    const f=new FormData(e.currentTarget);
    const d=Object.fromEntries(f.entries());

    const payload={
      order_id:`HG-${Date.now().toString(36).toUpperCase()}`,
      created_at:new Date().toISOString(),
      school:d.school||"",
      class_name:d.class_name||"",
      student_name:d.student_name||"",
      school_year:d.school_year||"",
      notebook_design:nv?.code||"",
      notebook_qty:nv ? (d.notebook_qty||"1") : "",
      sticker_design:st?.code||"",
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

    setBusy(true); setStatus("");
    try{
      const r=await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      });
      const result=await r.json();
      if(!result.ok) throw new Error(result.error||"Không lưu được đơn hàng");
      setStatus(`success:Đặt hàng thành công. Mã đơn: ${payload.order_id}`);
form.reset();
setNv(null);
setSt(null);
    }catch(err){
      setStatus(`error:${err.message||"Có lỗi khi gửi đơn."}`);
    }finally{setBusy(false)}
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
      <p className="section-sub">36 mẫu nhãn vở và 30 mẫu sticker. Có thể đặt cả hai sản phẩm trong cùng một đơn.</p>
      <div className="tabs">{["Nhãn vở","Sticker"].map(t=><button type="button" key={t} onClick={()=>setFilter(t)} className={`tab ${filter===t?"active":""}`}>{t}</button>)}</div>
      <div className="grid">
        {visible.map(p=>{
          const selected=(p.type==="Nhãn vở"?nv?.code:st?.code)===p.code;
          return <div key={p.code} className={`card ${selected?"selected":""}`}>
            <PImg p={p}/>
            <div className="card-body"><h3>{p.code}</h3><p>{p.type}</p>
            <button type="button" className="btn" style={{width:"100%"}} onClick={()=>p.type==="Nhãn vở"?setNv(p):setSt(p)}>{selected?"Đã chọn":"Chọn mẫu"}</button>
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
            <div className="summary"><strong>Nhãn vở: {nv?.code||"Chưa chọn"}</strong><strong>Sticker: {st?.code||"Chưa chọn"}</strong></div>
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
            <select name="payment_method"><option value="COD">COD</option><option value="Chuyển khoản">Chuyển khoản</option></select>
            <button className="btn" style={{width:"100%",marginTop:16}} disabled={busy}>{busy?"Đang gửi đơn...":"Xác nhận đặt hàng"}</button>
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
