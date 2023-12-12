import React, { useState } from "react";

const FilmEkle = ({ onFilmEkle }) => {
  const [film, setFilm] = useState({
    kategoriId: "",
    ismi: "",
    aciklama: "",
    resim: "",
    favoriSayisi: 0,
    tarih: "",
    yorum: [],
    src: "",
    oyuncular: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "kategoriId") {
      const kategoriId = value.split(",").map((id) => parseInt(id.trim()));
      setFilm({ ...film, [name]: kategoriId });
    } else {
      setFilm({ ...film, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/filmler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Yeni film eklenen veri:", data);
      })
      .catch((error) => console.error("Hata:", error));
    // Yeni filmi eklemek için bir fonksiyon çağırın
    //onFilmEkle(film);
    // Formu sıfırlayın
    setFilm({
      kategoriId: [],
      ismi: "",
      aciklama: "",
      resim: "",
      favoriSayisi: 0,
      tarih: "",
      yorum: [],
      src: "",
      oyuncular: [],
    });
  };

  return (
    <div className="container mt-4">
      <h2>Film Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="kategoriId" className="form-label">
            Kategori ID: (1=Komedi, 2=Bilim Kurgu, 3=Polisiye, 4=Tarih,
            5=Aksiyon, 6=Animasyon, 7=Müzikal, 8=Dram) (Virgülle Ayırın)
          </label>
          <input
            type="text"
            className="form-control"
            id="kategoriId"
            name="kategoriId"
            value={
              Array.isArray(film.kategoriId)
                ? film.kategoriId.join(",")
                : film.kategoriId
            }
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ismi" className="form-label">
            Film İsmi:
          </label>
          <input
            type="text"
            className="form-control"
            id="ismi"
            name="ismi"
            value={film.ismi}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="aciklama" className="form-label">
            Açıklama:
          </label>
          <textarea
            className="form-control"
            id="aciklama"
            name="aciklama"
            value={film.aciklama}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="resim" className="form-label">
            Resim URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="resim"
            name="resim"
            value={film.resim}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tarih" className="form-label">
            Yayın Tarihi:
          </label>
          <input
            type="text"
            className="form-control"
            id="tarih"
            name="tarih"
            value={film.tarih}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="src" className="form-label">
            Fragman URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="src"
            name="src"
            value={film.src}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="oyuncular" className="form-label">
            Oyuncular (Virgülle Ayırın):
          </label>
          <input
            type="text"
            className="form-control"
            id="oyuncular"
            name="oyuncular"
            value={film.oyuncular.join(", ")}
            onChange={(e) => {
              const oyuncular = e.target.value.split(",");
              setFilm({ ...film, oyuncular });
            }}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Film Ekle
        </button>
      </form>
    </div>
  );
};

export default FilmEkle;
