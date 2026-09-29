const $ = id => document.getElementById(id);


/* =========================
   STORAGE
========================= */

const WATCH_KEY = "flexanime_watch";
const COINS_KEY = "flexanime_coins";
const PREMIUM_KEY = "flexanime_premium";

const USERS_KEY = "flexanime_users";
const CURRENT_USER_KEY = "flexanime_current_user";


/* =========================
   COINS
========================= */

let coins = Number(
  localStorage.getItem(COINS_KEY)
);

if(!Number.isFinite(coins)){
  coins = 10;
}


/* =========================
   WATCHLIST
========================= */

let watch = JSON.parse(
  localStorage.getItem(WATCH_KEY) || "[]"
);


/* =========================
   PREMIUM
========================= */

let premium = Number(
  localStorage.getItem(PREMIUM_KEY) || 0
);


/* =========================
   AUTH
========================= */

let authMode = "login";

let users = JSON.parse(
  localStorage.getItem(USERS_KEY) || "[]"
);

let currentUser = JSON.parse(
  localStorage.getItem(CURRENT_USER_KEY) || "null"
);


/* =========================
   POSTERS
========================= */

const posters = {

  "Attack on Titan":
    "aot.jpg",

  "Chainsaw Man":
    "chainsawman.jpg",

  "Death Note":
    "deathnote.jpg",

  "Demon Slayer":
    "demonslayer.jpg",

  "Jujutsu Kaisen":
    "jjk.jpg",

  "One Piece":
    "onepiece.jpg",

  "That Time I Got Reincarnated as a Slime":
    "slime-s4.jpg"

};


/* =========================
   ANIME DATA
========================= */

const anime = [

  [
    "That Time I Got Reincarnated as a Slime",
    "Fantasy",
    9.1,
    2024,
    1,
    1
  ],

  [
    "Solo Leveling",
    "Action",
    9.1,
    2024,
    1,
    1
  ],

  [
    "Jujutsu Kaisen",
    "Action",
    8.8,
    2020,
    1,
    1
  ],

  [
    "Attack on Titan",
    "Dark",
    9,
    2013,
    1,
    0
  ],

  [
    "One Piece",
    "Adventure",
    9,
    1999,
    1,
    0
  ],

  [
    "Demon Slayer",
    "Fantasy",
    8.6,
    2019,
    1,
    0
  ],

  [
    "Chainsaw Man",
    "Action",
    8.5,
    2022,
    1,
    0
  ],

  [
    "Death Note",
    "Mystery",
    8.9,
    2006,
    1,
    0
  ],

  [
    "Naruto",
    "Adventure",
    8.4,
    2002,
    0,
    1
  ],

  [
    "Bleach",
    "Action",
    8.2,
    2004,
    0,
    0
  ],

  [
    "Dragon Ball Super",
    "Action",
    8,
    2015,
    0,
    1
  ],

  [
    "My Hero Academia",
    "Superhero",
    8,
    2016,
    0,
    0
  ],

  [
    "Black Clover",
    "Fantasy",
    8.2,
    2017,
    0,
    1
  ],

  [
    "Spy x Family",
    "Comedy",
    8.5,
    2022,
    0,
    1
  ],

  [
    "Haikyuu!!",
    "Sports",
    8.7,
    2014,
    0,
    0
  ],

  [
    "Blue Lock",
    "Sports",
    8.3,
    2022,
    0,
    0
  ],

  [
    "Tokyo Ghoul",
    "Dark",
    7.7,
    2014,
    0,
    0
  ],

  [
    "Frieren",
    "Fantasy",
    9,
    2023,
    0,
    1
  ],

  [
    "Hunter x Hunter",
    "Adventure",
    9,
    2011,
    0,
    0
  ],

  [
    "Vinland Saga",
    "Historical",
    8.8,
    2019,
    0,
    1
  ]

].map((x,i) => ({

  id:i + 1,

  title:x[0],

  genre:x[1],

  rating:x[2],

  year:x[3],

  trend:x[4],

  latest:x[5]

}));


/* =========================
   ESCAPE HTML
========================= */

function esc(value){

  return String(value).replace(
    /[&<>'"]/g,
    m => ({

      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      "'":"&#39;",
      '"':"&quot;"

    }[m])
  );

}


/* =========================
   CARD
========================= */

function card(a){

  const poster =
    posters[a.title];

  return `

    <article
      class="card"
      onclick="showAnime(${a.id})"
    >

      <div class="poster">

        ${
          poster
          ?
          `<img
            src="${poster}"
            alt="${esc(a.title)}"
          >`
          :
          ""
        }

        <span class="rating">
          ★ ${a.rating}
        </span>

      </div>

      <h3>
        ${esc(a.title)}
      </h3>

      <p>
        ${a.year} • ${esc(a.genre)}
      </p>

    </article>

  `;

}


/* =========================
   RENDER
========================= */

function render(){

  $("coins").textContent =
    coins;


  $("trending").innerHTML =
    anime
      .filter(a => a.trend)
      .map(card)
      .join("");


  $("latest").innerHTML =
    anime
      .filter(a => a.latest)
      .map(card)
      .join("");


  $("allAnime").innerHTML =
    anime
      .map(card)
      .join("");


  const genres = [
    ...new Set(
      anime.map(a => a.genre)
    )
  ];


  $("genres").innerHTML =
    genres
      .map(
        genre => `

          <button
            onclick="filterGenre('${esc(genre)}')"
          >
            ${esc(genre)}
          </button>

        `
      )
      .join("");


  updatePremium();

}


/* =========================
   SHOW ANIME
========================= */

function showAnime(id){

  const a =
    anime.find(x => x.id === id);

  if(!a) return;

  const poster =
    posters[a.title];


  $("modalBody").innerHTML = `

    <div class="detail">

      <div>

        ${
          poster
          ?
          `<img
            src="${poster}"
            alt="${esc(a.title)}"
          >`
          :
          ""
        }

      </div>


      <div>

        <div class="eyebrow">
          ${esc(a.genre)} ANIME
        </div>

        <h2>
          ${esc(a.title)}
        </h2>

        <div class="meta">
          ★ ${a.rating}/10
          • ${a.year}
          • ${esc(a.genre)}
        </div>

        <p>
          Watch this anime on FlexAnime.
          Select a season and episode below.
        </p>

        <p>
          <b>Languages:</b>
          Japanese • English • Hindi • Urdu
        </p>


        <div class="episodes">

          <b>Season 1</b>

          <br>

          <button
            onclick="playEpisode(${a.id},1,1)"
          >
            Episode 1
          </button>

          <button
            onclick="playEpisode(${a.id},1,2)"
          >
            Episode 2
          </button>

          <button
            onclick="playEpisode(${a.id},1,3)"
          >
            Episode 3
          </button>

        </div>

      </div>

    </div>

  `;


  $("modal")
    .classList
    .remove("hidden");

}


/* =========================
   PLAYER
========================= */

function playEpisode(
  id,
  season,
  episode
){

  const a =
    anime.find(x => x.id === id);

  if(!a) return;


  $("modalBody").innerHTML = `

    <div>

      <div class="eyebrow">
        NOW PLAYING
      </div>

      <h2>
        ${esc(a.title)}
      </h2>

      <p>
        Season ${season}
        • Episode ${episode}
      </p>

      <p>
        Video source abhi configure nahi hai.
        Apna licensed/authorized video URL
        script.js mein add karo.
      </p>

      <button
        class="play"
        onclick="closeModal()"
      >
        Close
      </button>

    </div>

  `;

}


/* =========================
   MODAL
========================= */

function closeModal(){

  $("modal")
    .classList
    .add("hidden");

}


/* =========================
   WATCHLIST
========================= */

function toggleWatch(title){

  if(
    watch.includes(title)
  ){

    watch =
      watch.filter(
        x => x !== title
      );

  }else{

    watch.push(title);

  }


  localStorage.setItem(
    WATCH_KEY,
    JSON.stringify(watch)
  );

}


/* =========================
   WATCHLIST PAGE
========================= */

function watchlist(){

  $("browseTitle").textContent =
    "My Watchlist";


  const list =
    anime.filter(
      a => watch.includes(a.title)
    );


  $("allAnime").innerHTML =
    list.length
    ?
    list.map(card).join("")
    :
    "<p>Your watchlist is empty.</p>";


  $("browse").scrollIntoView({
    behavior:"smooth"
  });

}


/* =========================
   FILTER GENRE
========================= */

function filterGenre(genre){

  $("browseTitle").textContent =
    genre + " Anime";


  $("allAnime").innerHTML =
    anime
      .filter(
        a => a.genre === genre
      )
      .map(card)
      .join("");


  $("browse").scrollIntoView({
    behavior:"smooth"
  });

}


/* =========================
   SHOW ALL
========================= */

function showAll(){

  $("browseTitle").textContent =
    "All Anime";


  $("allAnime").innerHTML =
    anime
      .map(card)
      .join("");


  $("browse").scrollIntoView({
    behavior:"smooth"
  });

}


/* =========================
   SEARCH
========================= */

function openSearch(){

  $("searchBox")
    .classList
    .remove("hidden");

  $("search").focus();

  searchAnime();

}


function closeSearch(){

  $("searchBox")
    .classList
    .add("hidden");

}


function searchAnime(){

  const q =
    $("search")
      .value
      .toLowerCase();


  $("results").innerHTML =
    anime

      .filter(
        a =>
          a.title
            .toLowerCase()
            .includes(q)

          ||

          a.genre
            .toLowerCase()
            .includes(q)
      )

      .map(card)

      .join("");

}


/* =========================
   PREMIUM
========================= */

function openPremium(){

  $("premium").scrollIntoView({
    behavior:"smooth"
  });

}


function redeem(
  price,
  days
){

  if(coins < price){

    alert(
      "Coins kam hain."
    );

    return;

  }


  coins -= price;


  premium =
    Math.max(
      Date.now(),
      premium
    )
    +
    days * 86400000;


  localStorage.setItem(
    COINS_KEY,
    coins
  );


  localStorage.setItem(
    PREMIUM_KEY,
    premium
  );


  render();

}


function updatePremium(){

  $("premiumStatus").textContent =
    premium > Date.now()

    ?

    "Premium active until " +
    new Date(
      premium
    ).toLocaleDateString()

    :

    "Premium is not active.";

}


/* =========================
   NAVIGATION
========================= */

function nav(
  id,
  button
){

  document
    .querySelectorAll("nav button")
    .forEach(
      x =>
        x.classList.remove(
          "active"
        )
    );


  button.classList.add(
    "active"
  );


  document
    .getElementById(id)
    .scrollIntoView({
      behavior:"smooth"
    });

}


function topPage(){

  scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* =====================================================
   LOGIN / SIGNUP SYSTEM
===================================================== */


/* OPEN LOGIN */

function openAuth(){

  authMode = "login";

  updateAuthUI();

  $("authOverlay")
    .classList
    .remove("hidden");


  setTimeout(
    () =>
      $("authEmail").focus(),
    50
  );

}


/* CLOSE LOGIN */

function closeAuth(){

  $("authOverlay")
    .classList
    .add("hidden");

}


/* SWITCH LOGIN / SIGNUP */

function toggleAuthMode(){

  authMode =
    authMode === "login"
    ?
    "signup"
    :
    "login";


  updateAuthUI();

}


/* UPDATE LOGIN UI */

function updateAuthUI(){

  const signup =
    authMode === "signup";


  $("authTitle").textContent =
    signup
    ?
    "Create Account"
    :
    "Login";


  $("authText").textContent =
    signup
    ?
    "Apna free FlexAnime account banao."
    :
    "Apne FlexAnime account mein login karo.";


  $("authName")
    .classList
    .toggle(
      "hidden",
      !signup
    );


  document
    .querySelector(".auth-submit")
    .textContent =
      signup
      ?
      "Sign Up"
      :
      "Login";


  document
    .querySelector(".auth-switch")
    .textContent =
      signup
      ?
      "Already have an account? Login"
      :
      "Create an account";

}


/* SUBMIT LOGIN / SIGNUP */

function submitAuth(){

  const name =
    $("authName")
      .value
      .trim();


  const email =
    $("authEmail")
      .value
      .trim()
      .toLowerCase();


  const password =
    $("authPassword")
      .value;


  if(
    !email ||
    !password ||
    (
      authMode === "signup" &&
      !name
    )
  ){

    alert(
      "Please sab required fields fill karo."
    );

    return;

  }


  if(password.length < 6){

    alert(
      "Password kam az kam 6 characters ka hona chahiye."
    );

    return;

  }


  /* SIGN UP */

  if(authMode === "signup"){

    const exists =
      users.some(
        user =>
          user.email === email
      );


    if(exists){

      alert(
        "Ye email already registered hai."
      );

      return;

    }


    currentUser = {

      name:name,

      email:email,

      password:password

    };


    users.push(
      currentUser
    );


    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );


    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(currentUser)
    );


    closeAuth();

    updateLoginButton();


    alert(
      "FlexAnime account create ho gaya!"
    );


    return;

  }


  /* LOGIN */

  const found =
    users.find(
      user =>
        user.email === email &&
        user.password === password
    );


  if(!found){

    alert(
      "Email ya password ghalat hai."
    );

    return;

  }


  currentUser = found;


  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );


  closeAuth();

  updateLoginButton();


  alert(
    "Login successful!"
  );

}


/* =========================
   LOGOUT
========================= */

function logout(){

  currentUser = null;


  localStorage.removeItem(
    CURRENT_USER_KEY
  );


  updateLoginButton();


  alert(
    "Logout ho gaya."
  );

}


/* =========================
   LOGIN BUTTON
========================= */

function updateLoginButton(){

  const button =
    $("loginBtn");


  if(!button) return;


  if(currentUser){

    button.textContent =
      (
        currentUser.name ||
        "Account"
      )
      +
      " · Logout";


    button.onclick =
      logout;


  }else{

    button.textContent =
      "Login";


    button.onclick =
      openAuth;

  }

}


/* =========================
   START WEBSITE
========================= */

render();

updateLoginButton();
