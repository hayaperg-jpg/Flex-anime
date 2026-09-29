/* =====================================================
   FLEXANIME
===================================================== */


/* ================= STORAGE ================= */

const COINS_KEY =
  "flexanime_coins";

const WATCH_KEY =
  "flexanime_watchlist";

const PREMIUM_KEY =
  "flexanime_premium";

const USERS_KEY =
  "flexanime_users";

const CURRENT_USER_KEY =
  "flexanime_current_user";


/* ================= DATA ================= */

const anime = [

  {
    id:1,
    title:"That Time I Got Reincarnated as a Slime",
    genre:"Fantasy",
    rating:9.1,
    year:2024,
    trending:true,
    latest:true,
    poster:"slime-s4.jpg"
  },

  {
    id:2,
    title:"Solo Leveling",
    genre:"Action",
    rating:9.1,
    year:2024,
    trending:true,
    latest:true,
    poster:""
  },

  {
    id:3,
    title:"Jujutsu Kaisen",
    genre:"Action",
    rating:8.8,
    year:2020,
    trending:true,
    latest:true,
    poster:"jjk.jpg"
  },

  {
    id:4,
    title:"Attack on Titan",
    genre:"Dark",
    rating:9.0,
    year:2013,
    trending:true,
    latest:false,
    poster:"aot.jpg"
  },

  {
    id:5,
    title:"One Piece",
    genre:"Adventure",
    rating:9.0,
    year:1999,
    trending:true,
    latest:false,
    poster:"onepiece.jpg"
  },

  {
    id:6,
    title:"Demon Slayer",
    genre:"Fantasy",
    rating:8.6,
    year:2019,
    trending:true,
    latest:false,
    poster:"demonslayer.jpg"
  },

  {
    id:7,
    title:"Chainsaw Man",
    genre:"Action",
    rating:8.5,
    year:2022,
    trending:true,
    latest:false,
    poster:"chainsawman.jpg"
  },

  {
    id:8,
    title:"Death Note",
    genre:"Mystery",
    rating:8.9,
    year:2006,
    trending:true,
    latest:false,
    poster:"deathnote.jpg"
  },

  {
    id:9,
    title:"Naruto",
    genre:"Adventure",
    rating:8.4,
    year:2002,
    trending:false,
    latest:true,
    poster:""
  },

  {
    id:10,
    title:"Bleach",
    genre:"Action",
    rating:8.2,
    year:2004,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:11,
    title:"Dragon Ball Super",
    genre:"Action",
    rating:8.0,
    year:2015,
    trending:false,
    latest:true,
    poster:""
  },

  {
    id:12,
    title:"My Hero Academia",
    genre:"Superhero",
    rating:8.0,
    year:2016,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:13,
    title:"Black Clover",
    genre:"Fantasy",
    rating:8.2,
    year:2017,
    trending:false,
    latest:true,
    poster:""
  },

  {
    id:14,
    title:"Spy x Family",
    genre:"Comedy",
    rating:8.5,
    year:2022,
    trending:false,
    latest:true,
    poster:""
  },

  {
    id:15,
    title:"Haikyuu!!",
    genre:"Sports",
    rating:8.7,
    year:2014,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:16,
    title:"Blue Lock",
    genre:"Sports",
    rating:8.3,
    year:2022,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:17,
    title:"Tokyo Ghoul",
    genre:"Dark",
    rating:7.7,
    year:2014,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:18,
    title:"Frieren",
    genre:"Fantasy",
    rating:9.0,
    year:2023,
    trending:false,
    latest:true,
    poster:""
  },

  {
    id:19,
    title:"Hunter x Hunter",
    genre:"Adventure",
    rating:9.0,
    year:2011,
    trending:false,
    latest:false,
    poster:""
  },

  {
    id:20,
    title:"Vinland Saga",
    genre:"Historical",
    rating:8.8,
    year:2019,
    trending:false,
    latest:true,
    poster:""
  }

];


/* ================= STATE ================= */

let coins =
  Number(
    localStorage.getItem(COINS_KEY)
  );

if(
  !Number.isFinite(coins)
){

  coins = 10;

}


let watchlist =
  JSON.parse(
    localStorage.getItem(WATCH_KEY)
    || "[]"
  );


let premium =
  Number(
    localStorage.getItem(PREMIUM_KEY)
    || 0
  );


let users =
  JSON.parse(
    localStorage.getItem(USERS_KEY)
    || "[]"
  );


let currentUser =
  JSON.parse(
    localStorage.getItem(
      CURRENT_USER_KEY
    )
    || "null"
  );


let authMode = "login";


/* ================= HELPERS ================= */

function $(id){

  return document.getElementById(id);

}


function escapeHTML(text){

  return String(text)
    .replace(
      /[&<>"']/g,
      function(char){

        const map = {

          "&":"&amp;",
          "<":"&lt;",
          ">":"&gt;",
          '"':"&quot;",
          "'":"&#039;"

        };

        return map[char];

      }
    );

}


/* ================= CARD ================= */

function createCard(item){

  let posterHTML = "";


  if(
    item.poster &&
    item.poster.trim() !== ""
  ){

    posterHTML = `

      <img
        src="./${item.poster}"
        alt="${escapeHTML(item.title)}"
        onerror="this.style.display='none'"
      >

    `;

  }


  if(!posterHTML){

    posterHTML = `

      <div class="poster-placeholder">

        ${escapeHTML(item.title)}

      </div>

    `;

  }


  return `

    <article
      class="anime-card"
      onclick="openAnime(${item.id})"
    >

      <div class="poster">

        ${posterHTML}

        <span class="rating">
          ★ ${item.rating}
        </span>

      </div>


      <h3>
        ${escapeHTML(item.title)}
      </h3>


      <p>
        ${item.year}
        •
        ${escapeHTML(item.genre)}
      </p>

    </article>

  `;

}


/* ================= RENDER ================= */

function render(){

  $("coins").textContent =
    coins;


  const trending =
    anime.filter(
      item => item.trending
    );


  const latest =
    anime.filter(
      item => item.latest
    );


  $("trendingAnime").innerHTML =
    trending
      .map(createCard)
      .join("");


  $("latestAnime").innerHTML =
    latest
      .map(createCard)
      .join("");


  renderAllAnime();

  renderGenres();

  updatePremium();

  updateLoginButton();

}


/* ================= ALL ANIME ================= */

function renderAllAnime(
  list = anime
){

  $("animeSectionTitle")
    .textContent =
      "All Anime";


  $("allAnime").innerHTML =
    list
      .map(createCard)
      .join("");


}


/* ================= GENRES ================= */

function renderGenres(){

  const genres =
    [
      ...new Set(
        anime.map(
          item => item.genre
        )
      )
    ];


  $("genreList").innerHTML =
    genres
      .map(
        genre => `

          <button
            class="genre-button"
            onclick="filterGenre('${genre}')"
          >

            ${escapeHTML(genre)}

          </button>

        `
      )
      .join("");

}


/* ================= FILTER ================= */

function filterGenre(genre){

  const filtered =
    anime.filter(
      item =>
        item.genre === genre
    );


  $("animeSectionTitle")
    .textContent =
      genre + " Anime";


  $("allAnime").innerHTML =
    filtered
      .map(createCard)
      .join("");


  $("animeSection")
    .scrollIntoView({
      behavior:"smooth"
    });

}


/* ================= SHOW ALL ================= */

function showAll(){

  $("animeSectionTitle")
    .textContent =
      "All Anime";


  $("allAnime").innerHTML =
    anime
      .map(createCard)
      .join("");


  $("animeSection")
    .scrollIntoView({
      behavior:"smooth"
    });

}


/* ================= HOME ================= */

function goHome(){

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* ================= ANIME DETAILS ================= */

function openAnime(id){

  const item =
    anime.find(
      animeItem =>
        animeItem.id === id
    );


  if(!item){
    return;
  }


  let posterHTML = "";


  if(
    item.poster &&
    item.poster.trim() !== ""
  ){

    posterHTML = `

      <img
        class="details-poster"
        src="./${item.poster}"
        alt="${escapeHTML(item.title)}"
        onerror="this.style.display='none'"
      >

    `;

  }


  $("animeDetails").innerHTML = `

    <div class="details">

      <div>

        ${
          posterHTML ||
          `
          <div
            class="poster-placeholder details-poster"
          >
            ${escapeHTML(item.title)}
          </div>
          `
        }

      </div>


      <div>

        <div class="small-label">
          ${escapeHTML(item.genre)}
        </div>


        <h2>
          ${escapeHTML(item.title)}
        </h2>


        <p>

          ★ ${item.rating}/10

          &nbsp; • &nbsp;

          ${item.year}

          &nbsp; • &nbsp;

          ${escapeHTML(item.genre)}

        </p>


        <p>

          FlexAnime anime page.

          Yahan tum apne
          authorized/licensed video sources
          connect kar sakte ho.

        </p>


        <div class="episode-box">

          <strong>
            Season 1
          </strong>


          <br>


          <button
            class="episode-button"
            onclick="playEpisode('${escapeHTML(item.title)}',1)"
          >
            Episode 1
          </button>


          <button
            class="episode-button"
            onclick="playEpisode('${escapeHTML(item.title)}',2)"
          >
            Episode 2
          </button>


          <button
            class="episode-button"
            onclick="playEpisode('${escapeHTML(item.title)}',3)"
          >
            Episode 3
          </button>

        </div>


        <br>


        <button
          class="watch-button"
          onclick="toggleWatch(${item.id})"
        >
          ${
            watchlist.includes(item.id)
            ?
            "✓ In Watchlist"
            :
            "＋ Watchlist"
          }
        </button>

      </div>

    </div>

  `;


  $("animeModal")
    .classList
    .remove("hidden");

}


/* ================= PLAYER ================= */

function playEpisode(
  title,
  episode
){

  alert(
    title +
    " - Episode " +
    episode +
    "\n\n" +
    "Video source abhi configured nahi hai.\n" +
    "Apna authorized video URL connect karo."
  );

}


/* ================= CLOSE ANIME ================= */

function closeAnime(){

  $("animeModal")
    .classList
    .add("hidden");

}


/* ================= WATCHLIST ================= */

function toggleWatch(id){

  if(
    watchlist.includes(id)
  ){

    watchlist =
      watchlist.filter(
        item => item !== id
      );

  }else{

    watchlist.push(id);

  }


  localStorage.setItem(
    WATCH_KEY,
    JSON.stringify(watchlist)
  );


  render();


  if(
    $("animeModal") &&
    !$("animeModal")
      .classList
      .contains("hidden")
  ){

    openAnime(id);

  }

}


/* ================= SHOW WATCHLIST ================= */

function showWatchlist(){

  const list =
    anime.filter(
      item =>
        watchlist.includes(item.id)
    );


  $("animeSectionTitle")
    .textContent =
      "My Watchlist";


  if(!list.length){

    $("allAnime").innerHTML = `

      <div
        style="
          color:#8191aa;
          padding:20px 0;
        "
      >

        Your watchlist is empty.

      </div>

    `;

  }else{

    $("allAnime").innerHTML =
      list
        .map(createCard)
        .join("");

  }


  $("animeSection")
    .scrollIntoView({
      behavior:"smooth"
    });

}


/* ================= SEARCH ================= */

function openSearch(){

  $("searchModal")
    .classList
    .remove("hidden");


  $("searchInput").value = "";


  $("searchResults").innerHTML =
    anime
      .map(createCard)
      .join("");


  setTimeout(
    function(){

      $("searchInput").focus();

    },
    100
  );

}


function closeSearch(){

  $("searchModal")
    .classList
    .add("hidden");

}


function searchAnime(){

  const query =
    $("searchInput")
      .value
      .trim()
      .toLowerCase();


  const results =
    anime.filter(
      item =>

        item.title
          .toLowerCase()
          .includes(query)

        ||

        item.genre
          .toLowerCase()
          .includes(query)
    );


  $("searchResults").innerHTML =
    results.length

    ?

    results
      .map(createCard)
      .join("")

    :

    `

      <p style="color:#8191aa">
        No anime found.
      </p>

    `;

}


/* ================= PREMIUM ================= */

function openPremium(){

  $("premiumSection")
    .scrollIntoView({
      behavior:"smooth"
    });

}


function buyPremium(
  price,
  days
){

  if(coins < price){

    alert(
      "Tumhare paas enough coins nahi hain."
    );

    return;

  }


  coins -= price;


  const now =
    Date.now();


  const currentPremium =
    premium > now
      ? premium
      : now;


  premium =
    currentPremium +
    (
      days *
      24 *
      60 *
      60 *
      1000
    );


  localStorage.setItem(
    COINS_KEY,
    String(coins)
  );


  localStorage.setItem(
    PREMIUM_KEY,
    String(premium)
  );


  render();


  alert(
    days +
    " days Premium activate ho gaya!"
  );

}


function updatePremium(){

  if(
    premium &&
    premium > Date.now()
  ){

    const date =
      new Date(premium);


    $("premiumStatus")
      .textContent =
        "✓ Premium active until " +
        date.toLocaleDateString();

  }else{

    $("premiumStatus")
      .textContent =
        "Premium is not active.";

  }

}


/* ================= AUTH ================= */

function openAuth(){

  authMode = "login";

  updateAuthUI();


  $("authModal")
    .classList
    .remove("hidden");

}


function closeAuth(){

  $("authModal")
    .classList
    .add("hidden");

}


function switchAuthMode(){

  if(
    authMode === "login"
  ){

    authMode = "signup";

  }else{

    authMode = "login";

  }


  updateAuthUI();

}


function updateAuthUI(){

  const signup =
    authMode === "signup";


  $("authTitle")
    .textContent =
      signup
      ?
      "Create Account"
      :
      "Login";


  $("authDescription")
    .textContent =
      signup
      ?
      "Apna free FlexAnime account banao."
      :
      "Apne FlexAnime account mein login karo.";


  $("nameInput")
    .classList
    .toggle(
      "hidden",
      !signup
    );


  $("authSubmit")
    .textContent =
      signup
      ?
      "Sign Up"
      :
      "Login";


  $("authSwitch")
    .textContent =
      signup
      ?
      "Already have an account? Login"
      :
      "Create an account";

}


/* ================= SUBMIT AUTH ================= */

function submitAuth(){

  const name =
    $("nameInput")
      .value
      .trim();


  const email =
    $("emailInput")
      .value
      .trim()
      .toLowerCase();


  const password =
    $("passwordInput")
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


  if(
    password.length < 6
  ){

    alert(
      "Password kam az kam 6 characters ka hona chahiye."
    );

    return;

  }


  /* SIGNUP */

  if(
    authMode === "signup"
  ){

    const alreadyExists =
      users.some(
        user =>
          user.email === email
      );


    if(alreadyExists){

      alert(
        "Ye email already registered hai."
      );

      return;

    }


    const newUser = {

      name:name,

      email:email,

      password:password

    };


    users.push(
      newUser
    );


    currentUser =
      newUser;


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


    $("nameInput").value = "";
    $("emailInput").value = "";
    $("passwordInput").value = "";


    alert(
      "Account successfully create ho gaya!"
    );


    return;

  }


  /* LOGIN */

  const user =
    users.find(
      item =>
        item.email === email &&
        item.password === password
    );


  if(!user){

    alert(
      "Email ya password ghalat hai."
    );

    return;

  }


  currentUser =
    user;


  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );


  closeAuth();

  updateLoginButton();


  $("passwordInput").value = "";


  alert(
    "Login successful!"
  );

}


/* ================= LOGIN BUTTON ================= */

function updateLoginButton(){

  const button =
    $("loginBtn");


  if(!button){
    return;
  }


  if(currentUser){

    button.textContent =
      currentUser.name +
      " • Logout";


    button.onclick =
      logout;

  }else{

    button.textContent =
      "Login";


    button.onclick =
      openAuth;

  }

}


/* ================= LOGOUT ================= */

function logout(){

  currentUser =
    null;


  localStorage.removeItem(
    CURRENT_USER_KEY
  );


  updateLoginButton();


  alert(
    "Logout successful."
  );

}


/* ================= CLOSE MODAL ON BACKGROUND ================= */

document.addEventListener(
  "click",
  function(event){

    if(
      event.target ===
      $("searchModal")
    ){

      closeSearch();

    }


    if(
      event.target ===
      $("animeModal")
    ){

      closeAnime();

    }


    if(
      event.target ===
      $("authModal")
    ){

      closeAuth();

    }

  }
);


/* ================= START ================= */

render();
