import React, { useState } from "react";
import FilmListesi from "./FilmListesi";
import OyuncuListesi from "./OyuncuListesi";
import FilmEkle from "./FilmEkle";

function Navi({}) {
  const [showFilmList, setShowFilmList] = useState(true);
  const [showActorList, setShowActorList] = useState(false);
  const [showAddList, setAddList] = useState(false);

  const handleFilmButtonClick = () => {
    setShowFilmList(true);
    setShowActorList(false);
    setAddList(false);
  };

  const handleActorButtonClick = () => {
    setShowFilmList(false);
    setShowActorList(true);
    setAddList(false);
  };
  const handleAddButtonClick = () => {
    setShowFilmList(false);
    setShowActorList(false);
    setAddList(true);
  };

  const handleFilmEkle = (newFilm) => {
    fetch("http://localhost:3000/filmler", {
      method: "POST", // Yeni film eklemek için POST isteği kullanılıyor
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilm), // JSON formatında film verisi
    })
      .then((response) => response.json())
      .then((data) => {
        // API yanıtını işleyin, eklenen filmi filmler listesine ekleyin veya başka bir işlem yapın
        console.log("Yeni film eklenen veri:", data);
      })
      .catch((error) => console.error("Hata:", error));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="home">
            <i class="fa-solid fa-clapperboard">&nbsp;</i>
            Çet Film House
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn" onClick={handleFilmButtonClick}>
                  Tüm Filmler
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" onClick={handleActorButtonClick}>
                  Oyuncular
                </button>
              </li>
              <li className="nav-item">
                <button className="btn" onClick={handleAddButtonClick}>
                  Film Ekle
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        {showFilmList && <FilmListesi />}
        {showActorList && <OyuncuListesi />}
        {showAddList && <FilmEkle onFilmEkle={handleFilmEkle} />}
      </div>
    </div>
  );
}

export default Navi;
