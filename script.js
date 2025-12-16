

  window.addEventListener("load", () => {
  typeRealistic(document.getElementById("helloText"), "Привет 👋", [10,35]);
  
  // с задержкой, чтобы тексты появлялись последовательно
  setTimeout(() => {
    typeRealistic(
      document.getElementById("aboutText"),
      "Я Anomtoss — Фуллстак программист и немного datascientist. В свободное время пишу программы и разрабатываю ботов для Telegram или Discord, иногда верстаю сайты. В реальности меня зовут Иван мне 17 лет.",
      [10,35]
    );
  }, 300);
});
/* ---------------- НАВЫКИ + ИКОНКИ + TOOLTIP ---------------- */
const skillData = {
  "Python": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    desc: "Python — all backend"
  },
  "JS": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    desc: "JavaScript — веб-сайты."
  },
  "HTML": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    desc: "HTML — каркас сайта."
  },
  "CSS": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    desc: "CSS — стиль сайта."
  },
  "React": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    desc: "React — UI пользователя."
  },
  "Go": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    desc: "Golang — backend гугла."
  },
  "SQL": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    desc: "SQL — база данных."
  },
  "C": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    desc: "C — мощь и сигма."
  },
  "C++": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    desc: "C++ — системы и игры."
  },
  "Java": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    desc: "Java — мощный ООП язык."
},
  "PHP": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    desc: "PHP — веб-разработка."
},
  "TypeScript": {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    desc: "TypeScript — крутой JS."
}
};

const skillRoot = document.getElementById("skills");

Object.keys(skillData).forEach(s => {
  const { img, desc } = skillData[s];

  skillRoot.innerHTML += `
    <div class="skill-item flex flex-col items-center gap-2">

      <img src="${img}" class="skill-icon" alt="${s}">

      <div class="text-sm text-white/70">${s}</div>

      <div class="skill-tooltip">
        <div class="term-text">${desc}</div>
      </div>

    </div>
  `;
});

/* ---------------- ПОГОДА ---------------- */
function weatherText(code) {
  if (code === 0) return "Ясно ☀️";
  if ([1,2,3].includes(code)) return "Облачно ⛅";
  if ([45,48].includes(code)) return "Туман 🌫️";
  if ([51,53,55,56,57].includes(code)) return "Дождь 🌧️";
  if ([61,63,65].includes(code)) return "Ливень 🌧️";
  if ([71,73,75].includes(code)) return "Снег ❄️";
  return "Погода меняется";
}

let timezone = null;

function updateTime() {
  if (!timezone) return;
  const now = new Date();
  const f = new Intl.DateTimeFormat("ru-RU", {
    hour:"2-digit", minute:"2-digit", second: "2-digit", timeZone: timezone
  }).format(now);

  document.getElementById("localTime").textContent = "Локальное время: " + f;
}

setInterval(updateTime,1000);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      const r = await fetch(url);
      const data = await r.json();

      if (data.current_weather) {
        const t = Math.round(data.current_weather.temperature);
        const w = weatherText(data.current_weather.weathercode);
        timezone = data.timezone;
        document.getElementById("weather").textContent = `${t}°C • ${w}`;
        updateTime();
      }
    },
    () => {
      document.getElementById("weather").textContent = "Погода недоступна";
    }
  );
}



function typeRealistic(element, text, speed = [10, 35]) {
  element.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;

      const delay = Math.random() * (speed[1] - speed[0]) + speed[0];
      setTimeout(type, delay);
    }
  }

  type();
}



window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});