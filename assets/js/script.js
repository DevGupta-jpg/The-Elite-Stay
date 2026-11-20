// ================= EASY SETTINGS =================
const CONFIG = {
  whatsappNumber: "919999999999", // CHANGE THIS
  instagramUrl: "https://www.instagram.com/", // CHANGE THIS
  heroSlideSeconds: 6,
  roomPhotoSeconds: 3
};

// Hero slider: automatically changes every 6 seconds
let heroIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll("#sliderDots button");
function showHero(i){
  heroSlides.forEach((s,n)=>s.classList.toggle("active",n===i));
  dots.forEach((d,n)=>d.classList.toggle("active",n===i));
}
if(heroSlides.length){
  setInterval(()=>{ heroIndex=(heroIndex+1)%heroSlides.length; showHero(heroIndex); }, CONFIG.heroSlideSeconds*1000);
}

// Room card photo slider: every 3 seconds
document.querySelectorAll(".room-slider").forEach(img=>{
  let list=[];
  try { list=JSON.parse(img.dataset.images); } catch(e) {}
  let index=0;
  if(list.length>1){
    setInterval(()=>{ index=(index+1)%list.length; img.src=list[index]; }, CONFIG.roomPhotoSeconds*1000);
  }
});

// Filter show/hide
const filterToggle=document.getElementById("filterToggle");
const filters=document.getElementById("filters");
if(filterToggle && filters) filterToggle.addEventListener("click",()=>filters.classList.toggle("show"));

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const value=btn.dataset.filter;
    document.querySelectorAll(".room-card").forEach(card=>{
      card.style.display=(value==="all" || card.dataset.type===value) ? "" : "none";
    });
    if(window.innerWidth<760) filters.classList.remove("show");
  });
});

// Save buttons
document.querySelectorAll(".heart").forEach(btn=>{
  btn.addEventListener("click",()=>{ btn.textContent=btn.textContent==="♡"?"♥":"♡"; });
});

// Enquiry -> WhatsApp
const form=document.getElementById("enquiryForm");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("name").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const email=document.getElementById("email").value.trim();
    const room=document.getElementById("roomType").value;
    const date=document.getElementById("moveDate").value;
    const occupants=document.getElementById("occupants").value;
    const message=document.getElementById("message").value.trim();
    const text=`Hello The Elite Stay PG & Hostel,%0A%0AI want to enquire about a room.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0ARoom: ${encodeURIComponent(room)}%0AMove-in Date: ${encodeURIComponent(date)}%0AOccupants: ${encodeURIComponent(occupants)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`,"_blank");
  });
}

// Keep social links synced with CONFIG
document.querySelectorAll(".whatsapp").forEach(a=>a.href=`https://wa.me/${CONFIG.whatsappNumber}`);
document.querySelectorAll(".instagram").forEach(a=>a.href=CONFIG.instagramUrl);
