const noBtn = document.getElementById("no");
const msg = document.getElementById("message");

const texts = [
    " ehh ga kena ",
    " ehhh lohh kok ga kena ",
    "yakin ga mau liat? ",
    " klik yes aja siii ",
    "lahhh klik yes aja weh"   
];

let index = 0;

if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
        const x = Math.random() * 500 - 250;
        const y = Math.random() * 250 - 125;

        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        if (msg) msg.innerHTML = texts[index];

        index = (index + 1) % texts.length;
    });
}

const yesBtn = document.getElementById("yes");
const opening = document.getElementById("opening");
const loading = document.getElementById("loading");
const birthday = document.getElementById("birthday");

const bar = document.getElementById("bar");
const percent = document.getElementById("percent");
const cat = document.getElementById("cat");

if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        // MAINKAN LAGU
        const music = document.getElementById("bgMusic");
        if (music) {
            music.volume = 0.5; // Atur volume (0.0 sampai 1.0)
            music.play().catch(err => console.log("Autoplay diblokir browser:", err));
        }

        if (opening) opening.style.display = "none";
        if (loading) loading.style.display = "block";
        startLoading();
    });
}


function startLoading() {
    let value = 0;

    const timer = setInterval(() => {
        value++;
        if (bar) bar.style.width = value + "%";
        if (percent) percent.innerHTML = value + "%";

        const progress = document.querySelector(".progress");
        if (progress && cat) {
            const maxMove = progress.offsetWidth - cat.offsetWidth;
            cat.style.left = (value / 100) * maxMove + "px";
        }

        if (value >= 100) {
            clearInterval(timer);
            setTimeout(() => {
                if (loading) loading.style.display = "none";
                showBirthday();
            }, 500);
        }
    }, 40);
}

function showBirthday() {
    if (birthday) {
        birthday.style.display = "flex";
        setTimeout(() => {
            birthday.style.opacity = "1";
        }, 50);
    }

    const typing = document.getElementById("typing");
    const text = "HAPPY BIRTHDAYY ";
    let i = 0;
    if (typing) typing.innerHTML = "";

    const type = setInterval(() => {
        if (typing) typing.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(type);
        }
    }, 120);

    setTimeout(() => {
        if (birthday) {
            birthday.style.opacity = "0";
            setTimeout(() => {
                birthday.style.display = "none";
                showCake();
            }, 800);
        }
    }, 3000);
}

function showCake() {
    const cakeScene = document.getElementById("cakeScene");
    if (cakeScene) cakeScene.style.display = "flex";

    if (typeof animateDrop === "function") {
        animateDrop();
    }

    setTimeout(() => {
        const cakeText = document.getElementById("cakeText");
        if (cakeText) cakeText.style.opacity = "1";
    }, 1200);
}

/* =============================================
   3D CANVAS CAKE RENDERER WITH KADO & BUNGA
============================================= */
const canvas = document.getElementById('cakeCanvas');
let animateDrop;

let cakeStep = 0; // 0 = awal, 1 = make wish, 2 = api mati, 3 = kado, 4 = bunga
let giftHoverFrame = 0;  
let giftScale = 1;       
let isOpeningGift = false; 

if (canvas) {
    const ctx = canvas.getContext('2d');

    let dropProgress = {
        plate: -400,
        layer1: -400,
        layer2: -400,
        layer3: -400,
        candle: -400
    };

    let flameFrame = 0;

    function drawCylinder(x, y, radiusX, radiusY, height, topColor, sideColorGrad) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI);
        ctx.lineTo(x - radiusX, y - height);
        ctx.ellipse(x, y - height, radiusX, radiusY, 0, Math.PI, 0, true);
        ctx.lineTo(x + radiusX, y);
        ctx.fillStyle = sideColorGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(x, y - height, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = topColor;
        ctx.fill();
        ctx.restore();
    }

    function drawIcing(x, y, radiusX, radiusY, height) {
        ctx.save();
        const topY = y - height;

        ctx.beginPath();
        ctx.ellipse(x, topY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        const waves = 14;
        ctx.beginPath();
        for (let i = 0; i <= waves; i++) {
            const angle = (i / waves) * Math.PI;
            const wx = x + Math.cos(angle) * radiusX;
            const wy = topY + Math.sin(angle) * radiusY;
            if (i === 0) ctx.moveTo(wx, wy);
            else ctx.quadraticCurveTo(wx, wy + 10, wx, wy);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
    }

    function drawStrawberry(x, y, scale = 1) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.bezierCurveTo(-10, -2, -8, -14, 0, -12);
        ctx.bezierCurveTo(8, -14, 10, -2, 0, 8);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();

        ctx.fillStyle = '#f1c40f';
        const seeds = [
            [-3, -6], [3, -6], 
            [-4, -1], [0, -2], [4, -1],
            [-2, 3], [2, 3]
        ];
        seeds.forEach(([sx, sy]) => {
            ctx.beginPath();
            ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.ellipse(-3, -13, 4, 2, -Math.PI / 4, 0, Math.PI * 2);
        ctx.ellipse(3, -13, 4, 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.ellipse(0, -14, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.ellipse(-3, -7, 2, 4, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function drawCandle(x, y) {
        ctx.save();
        const candleWidth = 12;
        const candleHeight = 45;
        const topY = y - candleHeight;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x - candleWidth / 2, topY, candleWidth, candleHeight);
        ctx.clip();

        const stripeHeight = 6;
        let currentY = topY;
        let isPurple = true;

        while (currentY < y) {
            ctx.fillStyle = isPurple ? '#8e44ad' : '#e74c3c';
            ctx.fillRect(x - candleWidth / 2, currentY, candleWidth, stripeHeight);
            currentY += stripeHeight;
            isPurple = !isPurple;
        }
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, topY - 7);
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.stroke();

        const flameOffset = Math.sin(flameFrame) * 1.5;
        const flameY = topY - 7;

        // Api hanya digambar saat kue aktif
        if (cakeStep < 2) {
            ctx.beginPath();
            ctx.arc(x + flameOffset, flameY - 10, 16, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,159,67,.25)";
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(x + flameOffset, flameY - 10, 7, 13, 0, 0, Math.PI * 2);
            ctx.fillStyle = "#ff9f43";
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(x + flameOffset, flameY - 7, 4, 7, 0, 0, Math.PI * 2);
            ctx.fillStyle = "#f1c40f";
            ctx.fill();
        }
        ctx.restore();
    }

    let isHoveringGift = false; // Status apakah kursor lagi di atas kado

    // Event listener biar kursor berubah jadi 'pointer' pas di atas kado
    canvas.addEventListener("mousemove", function(e) {
        if (cakeStep === 3) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const distGift = Math.hypot(x - 200, y - 230);
            if (distGift < 80) {
                canvas.style.cursor = "pointer";
                isHoveringGift = true;
            } else {
                canvas.style.cursor = "default";
                isHoveringGift = false;
            }
        } else {
            canvas.style.cursor = "default";
            isHoveringGift = false;
        }
    });

    // FUNGSI GAMBAR KADO DENGAN PITA ULTRA-AESTHETIC
    function drawGiftAndFlowers() {
        if (cakeStep !== 3) return;

        ctx.save();
        
        // 1. Animasi Melayang Halus
        giftHoverFrame += 0.05;
        let floatOffset = Math.sin(giftHoverFrame) * 8;

        // 2. Efek Naik + Membesar saat Di-hover Kursor
        if (isHoveringGift) {
            floatOffset -= 12; 
            if (giftScale < 1.15) giftScale += 0.03;
        } else {
            if (giftScale > 1) giftScale -= 0.03;
        }

        // 3. Efek Membesar saat Diklik Buka
        if (isOpeningGift) {
            if (giftScale < 1.4) giftScale += 0.05;
        }

        const gx = 200;
        const gy = 230 + floatOffset;

        ctx.translate(gx, gy);
        ctx.scale(giftScale, giftScale);
        ctx.translate(-gx, -gy);

        // --- GLOW AURA BELAKANG ---
        const glowOpacity = isHoveringGift ? 0.8 : 0.45;
        const glowGrad = ctx.createRadialGradient(gx, gy + 10, 5, gx, gy + 10, 100);
        glowGrad.addColorStop(0, `rgba(168, 85, 247, ${glowOpacity})`);
        glowGrad.addColorStop(0.5, `rgba(59, 130, 246, ${glowOpacity * 0.5})`);
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.beginPath();
        ctx.arc(gx, gy + 10, 100, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // --- BAYANGAN BAWAH KADO ---
        ctx.beginPath();
        const shadowRadius = 65 - Math.abs(floatOffset) * 1.2;
        ctx.ellipse(gx, 305 - floatOffset * 0.5, shadowRadius > 0 ? shadowRadius : 10, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fill();

        // --- BADAN KADO ---
        const boxGrad = ctx.createLinearGradient(gx - 50, gy - 10, gx + 50, gy + 50);
        boxGrad.addColorStop(0, "#2a0845");
        boxGrad.addColorStop(0.5, "#6441a5");
        boxGrad.addColorStop(1, "#1e3c72");

        ctx.fillStyle = boxGrad; 
        ctx.fillRect(gx - 50, gy - 10, 100, 60);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gx - 50, gy - 10, 100, 60);

        // --- GRADIENT PITA EMAS SILK ---
        const goldGrad = ctx.createLinearGradient(gx - 40, gy - 30, gx + 40, gy + 50);
        goldGrad.addColorStop(0, "#fff176");
        goldGrad.addColorStop(0.3, "#ffd54f");
        goldGrad.addColorStop(0.7, "#ffb300");
        goldGrad.addColorStop(1, "#ff8f00");

        ctx.fillStyle = goldGrad;
        ctx.fillRect(gx - 12, gy - 10, 24, 60); 
        ctx.fillRect(gx - 50, gy + 13, 100, 16); 

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillRect(gx - 4, gy - 10, 7, 60);
        ctx.fillRect(gx - 50, gy + 18, 100, 4);

        // --- TUTUP KADO ---
        const lidGrad = ctx.createLinearGradient(gx - 55, gy - 25, gx + 55, gy - 7);
        lidGrad.addColorStop(0, "#3b0054");
        lidGrad.addColorStop(0.5, "#7b1fa2");
        lidGrad.addColorStop(1, "#12002b");

        ctx.fillStyle = lidGrad;
        ctx.fillRect(gx - 55, gy - 25, 110, 18);
        ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
        ctx.strokeRect(gx - 55, gy - 25, 110, 18);

        // --- SIMPUL PITA ---
        const bowY = gy - 24;

        ctx.beginPath();
        ctx.moveTo(gx - 4, bowY + 2);
        ctx.bezierCurveTo(gx - 18, bowY + 16, gx - 32, bowY + 24, gx - 28, bowY + 42);
        ctx.bezierCurveTo(gx - 18, bowY + 32, gx - 10, bowY + 18, gx - 1, bowY + 4);
        ctx.fillStyle = goldGrad;
        ctx.fill();
        ctx.strokeStyle = "#e65100";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(gx + 4, bowY + 2);
        ctx.bezierCurveTo(gx + 18, bowY + 16, gx + 32, bowY + 24, gx + 28, bowY + 42);
        ctx.bezierCurveTo(gx + 18, bowY + 32, gx + 10, bowY + 18, gx + 1, bowY + 4);
        ctx.fillStyle = goldGrad;
        ctx.fill();
        ctx.strokeStyle = "#e65100";
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(gx - 18, bowY - 12, 11, 7, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = "#a73a00";
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(gx + 18, bowY - 12, 11, 7, Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = "#a73a00";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(gx - 3, bowY - 2);
        ctx.bezierCurveTo(gx - 22, bowY + 2, gx - 45, bowY - 18, gx - 22, bowY - 28);
        ctx.bezierCurveTo(gx - 6, bowY - 32, gx - 2, bowY - 12, gx, bowY - 2);
        ctx.fillStyle = goldGrad;
        ctx.fill();
        ctx.strokeStyle = "#e65100";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(gx + 3, bowY - 2);
        ctx.bezierCurveTo(gx + 22, bowY + 2, gx + 45, bowY - 18, gx + 22, bowY - 28);
        ctx.bezierCurveTo(gx + 6, bowY - 32, gx + 2, bowY - 12, gx, bowY - 2);
        ctx.fillStyle = goldGrad;
        ctx.fill();
        ctx.strokeStyle = "#e65100";
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(gx - 12, bowY - 16, 12, 7, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 241, 118, 0.85)";
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(gx + 12, bowY - 16, 12, 7, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 241, 118, 0.85)";
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(gx, bowY - 3, 9, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#fff59d";
        ctx.fill();
        ctx.strokeStyle = "#ff6f00";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(gx - 3, bowY - 5, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();
    }

    function renderCake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flameFrame += 0.08;

        if (cakeStep < 3) {
            ctx.beginPath();
            ctx.ellipse(200, 370 + dropProgress.plate, 140, 20, 0, 0, Math.PI * 2);
            const plateGrad = ctx.createLinearGradient(0, 350, 0, 390);
            plateGrad.addColorStop(0, '#ffffff');
            plateGrad.addColorStop(1, '#b0bec5');
            ctx.fillStyle = plateGrad;
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;

            const cakeGrad = ctx.createLinearGradient(80, 0, 320, 0);
            cakeGrad.addColorStop(0, '#3e1f0e');
            cakeGrad.addColorStop(0.5, '#733e1d');
            cakeGrad.addColorStop(1, '#2b1307');

            const l1Y = 350 + dropProgress.layer1;
            drawCylinder(200, l1Y, 110, 18, 55, '#8d512b', cakeGrad);
            drawIcing(200, l1Y, 110, 18, 55);
            
            const l1TopY = l1Y - 55;
            drawStrawberry(105, l1TopY + 14, 0.85);
            drawStrawberry(145, l1TopY + 17, 0.85);
            drawStrawberry(200, l1TopY + 18, 0.9);
            drawStrawberry(255, l1TopY + 17, 0.85);
            drawStrawberry(295, l1TopY + 14, 0.85);

            const l2Y = 285 + dropProgress.layer2;
            drawCylinder(200, l2Y, 85, 15, 50, '#8d512b', cakeGrad);
            drawIcing(200, l2Y, 85, 15, 50);
            
            const l2TopY = l2Y - 50;
            drawStrawberry(128, l2TopY + 12, 0.8);
            drawStrawberry(170, l2TopY + 15, 0.8);
            drawStrawberry(230, l2TopY + 15, 0.8);
            drawStrawberry(272, l2TopY + 12, 0.8);

            const l3Y = 228 + dropProgress.layer3;
            drawCylinder(200, l3Y, 60, 12, 45, '#8d512b', cakeGrad);
            drawIcing(200, l3Y, 60, 12, 45);
            
            const l3TopY = l3Y - 45;
            drawStrawberry(155, l3TopY + 8, 0.75);
            drawStrawberry(245, l3TopY + 8, 0.75);
            drawStrawberry(200, l3TopY + 11, 0.8);

            drawCandle(200, l3TopY + dropProgress.candle);
        } else if (cakeStep === 3) {
            drawGiftAndFlowers();
        }

        requestAnimationFrame(renderCake);
    }

    // INTERAKSI KLIK KANVAS
    canvas.addEventListener("click", function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (cakeStep === 0) {
            cakeStep = 1;
            const cakeText = document.getElementById("cakeText");
            if (cakeText) cakeText.innerHTML = " would you make a wish first? and then click the candle ";
            return;
        }

        if (cakeStep === 1) {
            const cx = 200;
            const cy = 160;
            const distance = Math.hypot(x - cx, y - cy);

            if (distance < 35) {
                cakeStep = 2; 
                const cakeText = document.getElementById("cakeText");
                if (cakeText) cakeText.innerHTML = " Happy Birthday !!!!! ";

                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 }
                    });
                }

                setTimeout(() => {
                    cakeStep = 3;
                    if (cakeText) cakeText.innerHTML = " ada kado buat kamu, klik kadonya dulu ";
                }, 1500);
            }
        }

        if (cakeStep === 3 && !isOpeningGift) {
            const gx = 200;
            const gy = 230;
            const distGift = Math.hypot(x - gx, y - gy);

            if (distGift < 80) {
                isOpeningGift = true; 

                setTimeout(() => {
                    cakeStep = 4; 
                    const cakeText = document.getElementById("cakeText");
                    if (cakeText) cakeText.innerHTML = " nah there are many flowers here ";

                    explodeFlowers();

                    if (typeof confetti === "function") {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.5 }
                        });
                    }
                }, 350);
            }
        }
    });

    animateDrop = function() {
        const speed = 0.1;
        function step() {
            dropProgress.plate += (0 - dropProgress.plate) * speed;
            dropProgress.layer1 += (0 - dropProgress.layer1) * speed;
            dropProgress.layer2 += (0 - dropProgress.layer2) * speed;
            dropProgress.layer3 += (0 - dropProgress.layer3) * speed;
            dropProgress.candle += (0 - dropProgress.candle) * speed;
        }
        
        let interval = setInterval(step, 20);
        setTimeout(() => clearInterval(interval), 2000);
    };

    renderCake();
}

// FUNGSI MELETUPKAN BUNGA
function explodeFlowers() {
    const container = document.getElementById("flowerContainer") || document.body;
    
    const flowerImages = [
        "bunga1.png",
        "bunga2.png",
        "bunga3.png",
        "bunga4.png",
        "bunga5.png",
        "bunga6.png",
        "bunga7.png",
        "bunga8.png",
        "bunga9.png",
        "bunga10.png"
    ];

    const totalFlowers = 140; 

    for (let i = 0; i < totalFlowers; i++) {
        setTimeout(() => {
            const img = document.createElement("img");
            img.className = "bloom-flower";
            img.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];

            img.style.left = "50vw";
            img.style.top = "50vh";

            const angle = (i / totalFlowers) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
            const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.75;
            const distance = Math.random() * maxRadius + 100;

            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 800;
            const scale = (Math.random() * 0.8 + 0.8).toFixed(2);

            img.style.setProperty("--tx", `${tx}px`);
            img.style.setProperty("--ty", `${ty}px`);
            img.style.setProperty("--rot", `${rot}deg`);
            img.style.setProperty("--scale", scale);

            const baseSize = Math.floor(Math.random() * 60) + 110;
            img.style.width = baseSize + "px";
            img.style.height = baseSize + "px";

            container.appendChild(img);

            setTimeout(() => {
                img.remove();
            }, 3800);
        }, i * 15);
    }

    setTimeout(() => {
        const overlay = document.getElementById("letterOverlay");
        if (overlay) {
            overlay.classList.add("show");
        }
    }, 4000);
}

// MEMBUAT CANVAS BINTANG LANGSUNG DI DALAM OVERLAY SURAT
let starAnimationId = null;

function startStars() {
    const overlay = document.getElementById("letterOverlay");
    if (!overlay) return;

    let canvas = document.getElementById("starCanvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "starCanvas";
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "1"; // Berada tepat di atas background overlay, di belakang surat
        overlay.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Buat 80 bintang emas bercahaya
    const stars = [];
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1.2,
            speed: Math.random() * 1.2 + 0.4,
            opacity: Math.random(),
            fadeSpeed: Math.random() * 0.02 + 0.008
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
            // Gerakkan bintang melayang ke atas
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }

            // Animasi kedap-kedip
            star.opacity += star.fadeSpeed;
            if (star.opacity > 1 || star.opacity < 0.2) {
                star.fadeSpeed = -star.fadeSpeed;
            }

            // Gambar bintang emas bercahaya
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
            ctx.fillStyle = "#ffeaa7";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffd700";
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        starAnimationId = requestAnimationFrame(animate);
    }

    animate();
}

// FUNGSI UTAMA BUKA SURAT
function openLetter() {
    const envelope = document.getElementById("envelope");
    const letterCard = document.getElementById("letterCard");

    // JALANKAN EFEK BINTANG
    startStars();

    if (envelope) {
        envelope.classList.add("active");
    }

    setTimeout(() => {
        if (envelope) envelope.style.display = "none";
        if (letterCard) letterCard.classList.add("open");
    }, 900);
}

// FUNGSI UTAMA TUTUP SURAT
function closeLetter() {
    const envelope = document.getElementById("envelope");
    const letterCard = document.getElementById("letterCard");
    const canvas = document.getElementById("starCanvas");

    if (canvas) {
        canvas.remove(); // Hapus canvas saat surat ditutup
    }
    if (starAnimationId) {
        cancelAnimationFrame(starAnimationId);
    }

    if (letterCard) {
        letterCard.classList.remove("open");
    }
    
    setTimeout(() => {
        if (envelope) {
            envelope.style.display = "flex";
            envelope.classList.remove("active");
        }
    }, 300);
}


// =============================================
// LOGIKA GAME KUCING (1 KUCING DINAMIS)
// =============================================

let realCatBoxIndex = 0; // Index kardus tempat kucing disembunyikan (0, 1, 2)
let boxPositions = [0, 1, 2]; // Posisi visual slot [0=kiri, 1=tengah, 2=kanan]
let isShuffling = false;
let gameCanPick = false;

function goToGame() {
    const overlay = document.getElementById("letterOverlay");
    const gameScene = document.getElementById("gameScene");

    if (overlay) overlay.style.display = "none";
    if (gameScene) gameScene.style.display = "flex";

    resetGame();
}

function updateBoxPositionsUI() {
    const offsets = [-200, 0, 200]; // Jarak antar kardus
    for (let boxIdx = 0; boxIdx < 3; boxIdx++) {
        const wrapper = document.getElementById(`box${boxIdx}`);
        const slot = boxPositions[boxIdx];
        if (wrapper) {
            wrapper.style.transform = `translateX(${offsets[slot]}px)`;
        }
    }
    
    // Ikut pindahkan posisi kucing sesuai kardus aslinya
    positionCatToBox(realCatBoxIndex);
}

function positionCatToBox(boxIndex) {
    const cat = document.getElementById("singleCat");
    const offsets = [-200, 0, 200];
    const slot = boxPositions[boxIndex];
    if (cat) {
        cat.style.transform = `translateX(${offsets[slot]}px) translateY(20px)`;
    }
}

function resetGame() {
    boxPositions = [0, 1, 2];
    realCatBoxIndex = 1; // Default di tengah
    updateBoxPositionsUI();

    const cat = document.getElementById("singleCat");
    if (cat) cat.classList.remove("show");

    for (let i = 0; i < 3; i++) {
        const box = document.getElementById(`box${i}`);
        if (box) box.classList.remove("open");
    }

    const statusText = document.getElementById("gameStatus");
    const startBtn = document.getElementById("startShuffleBtn");

    if (statusText) statusText.innerHTML = "blek nya jangan sampe hilang";
    if (startBtn) {
        startBtn.style.display = "inline-block";
        startBtn.innerHTML = "mulai acak !!! ";
    }
    gameCanPick = false;
    isShuffling = false;
}

function startGame() {
    if (isShuffling) return;

    const statusText = document.getElementById("gameStatus");
    const startBtn = document.getElementById("startShuffleBtn");
    const cat = document.getElementById("singleCat");

    if (startBtn) startBtn.style.display = "none";
    gameCanPick = false;

    // Tutup & sembunyikan dulu semuanya
    if (cat) cat.classList.remove("show");
    for (let i = 0; i < 3; i++) {
        document.getElementById(`box${i}`).classList.remove("open");
    }

    // 1. Pilih 1 kardus secara acak
    realCatBoxIndex = Math.floor(Math.random() * 3);
    positionCatToBox(realCatBoxIndex);

    // 2. Kucing mengintip keluar sebentar
    setTimeout(() => {
        if (cat) cat.classList.add("show");
        if (statusText) statusText.innerHTML = "perhatiin baik baik, kucingnya ada di sini.....";

        setTimeout(() => {
            // Sembunyikan kucing lagi
            if (cat) cat.classList.remove("show");
            if (statusText) statusText.innerHTML = "okeeee kardusnya bakal di acak, temukan kucingnya !!!";

            // 3. Mulai mengacak kardus
            setTimeout(() => {
                shuffleBoxes(10);
            }, 600);
        }, 1500);
    }, 200);
}

function shuffleBoxes(timesLeft) {
    isShuffling = true;

    if (timesLeft <= 0) {
        isShuffling = false;
        gameCanPick = true;
        const statusText = document.getElementById("gameStatus");
        if (statusText) statusText.innerHTML = "selesaii !!! tebak blek ada dimana hayooo";
        return;
    }

    // Acak 2 slot kardus
    let idx1 = Math.floor(Math.random() * 3);
    let idx2 = Math.floor(Math.random() * 3);
    while (idx1 === idx2) idx2 = Math.floor(Math.random() * 3);

    // Tukar slot
    let temp = boxPositions[idx1];
    boxPositions[idx1] = boxPositions[idx2];
    boxPositions[idx2] = temp;

    updateBoxPositionsUI();

    setTimeout(() => {
        shuffleBoxes(timesLeft - 1);
    }, 380);
}

function chooseBox(clickedBoxIndex) {
    if (!gameCanPick || isShuffling) return;

    const statusText = document.getElementById("gameStatus");
    const startBtn = document.getElementById("startShuffleBtn");
    const clickedBox = document.getElementById(`box${clickedBoxIndex}`);
    const cat = document.getElementById("singleCat");

    // Angkat kardus yang diklik
    clickedBox.classList.add("open");

    if (clickedBoxIndex === realCatBoxIndex) {
        // JIKA BENAR: Kucing muncul!
        if (cat) cat.classList.add("show");
        if (statusText) statusText.innerHTML = "YEAYYY BENAR! blek ada disinii ";
        gameCanPick = false;

        if (typeof confetti === "function") {
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        }

        setTimeout(() => {
            if (startBtn) {
                startBtn.innerHTML = "main lagi ";
                startBtn.style.display = "inline-block";
            }
        }, 1200);
    } else {
        // JIKA SALAH: Kardus hanya terangkat dan KOSONG!
        if (statusText) statusText.innerHTML = "yahhh salahh, blek ga disini dong";
        
        // Setelah 0.8 detik, baru tunjukkan kardus mana yang ada kucingnya
        setTimeout(() => {
            const realBox = document.getElementById(`box${realCatBoxIndex}`);
            if (realBox) realBox.classList.add("open");
            if (cat) cat.classList.add("show");

            if (statusText) statusText.innerHTML = "coba cari lagi !!!";
            gameCanPick = false;

            setTimeout(() => {
                if (startBtn) {
                    startBtn.innerHTML = "coba Lagi ";
                    startBtn.style.display = "inline-block";
                }
            }, 1200);
        }, 800);
    }
}
