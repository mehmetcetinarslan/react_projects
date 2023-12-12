import React, { useState, useEffect } from "react";

const FilmListesi = () => {
  const [filmler, setFilmler] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [kategoriler, setKategoriler] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [yorum, setYorum] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmlerResponse, kategorilerResponse] = await Promise.all([
          fetch("http://localhost:3000/filmler"),
          fetch("http://localhost:3000/kategoriler"),
        ]);

        const [filmlerData, kategorilerData] = await Promise.all([
          filmlerResponse.json(),
          kategorilerResponse.json(),
        ]);

        setFilmler(filmlerData);
        setKategoriler(kategorilerData);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setError("Veri çekme hatası");
      }
    };

    fetchData();
  }, []);

  const handleShow = (film) => {
    setSelectedFilm(film);
    const modal = new window.bootstrap.Modal(
      document.getElementById("filmModal")
    );
    modal.show();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredFilms = selectedCategory
    ? filmler.filter((film) => film.kategoriId.includes(selectedCategory))
    : filmler;

  // Seçili filmin kategorilerini bul
  const selectedFilmKategoriler = selectedFilm?.kategoriId?.map(
    (kategoriId) => {
      const kategori = kategoriler.find(
        (kategori) => kategori.id === kategoriId
      );
      return kategori ? kategori.ad : null;
    }
  );

  if (error) {
    return <div>{error}</div>;
  }

  const handleKullaniciAdiChange = (e) => {
    setKullaniciAdi(e.target.value);
  };

  const handleYorumChange = (e) => {
    setYorum(e.target.value);
  };

  const handleYorumEkle = () => {
    if (kullaniciAdi && yorum) {
      const yeniYorum = `${kullaniciAdi}: ${yorum}`;
      setSelectedFilm({
        ...selectedFilm,
        yorum: [...selectedFilm.yorum, yeniYorum],
      });
      setKullaniciAdi("");
      setYorum("");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Tüm Filmler</h1>
      <div className="row">
        <div className="col-md-12 mb-4">
          <label htmlFor="kategoriSelect" className="form-label">
            Kategori Seçin:
          </label>
          <select
            id="kategoriSelect"
            className="form-select"
            onChange={(e) => handleCategoryChange(parseInt(e.target.value))}
          >
            <option value={null}>Tüm Kategoriler</option>
            {kategoriler.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.ad}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          {filteredFilms.map((film) => (
            <div key={film.id} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={film.resim}
                  className="card-img-top"
                  alt={film.ismi}
                  onClick={() => handleShow(film)}
                  style={{ cursor: "pointer" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{film.ismi}</h5>
                  <div>
                    <span>
                      <i class="fa fa-heart">&nbsp;</i>
                      {film.favoriSayisi}
                    </span>
                  </div>
                  <p className="card-text">
                    {film.aciklama.length > 25
                      ? `${film.aciklama.substring(0, 100)}...`
                      : film.aciklama}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal" id="filmModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedFilm?.ismi}({selectedFilm?.tarih})
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <iframe
                  width="100%"
                  height="250"
                  src={selectedFilm?.src}
                  title="Trailer"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <p>{selectedFilm?.aciklama}</p>
                <p>
                  <strong>Oyuncular:</strong>{" "}
                  {selectedFilm?.oyuncular.join(", ")}
                </p>
                <p>
                  <strong>Kategoriler:</strong>{" "}
                  {selectedFilmKategoriler?.join(", ")}
                </p>
              </div>
              <div className="modal-footer">
                <p>
                  <strong>Yorumlar:</strong>
                  <ul className="list-group">
                    {selectedFilm?.yorum.map((yorum, index) => (
                      <li key={index} className="list-group-item">
                        {yorum}
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={kullaniciAdi}
                    onChange={handleKullaniciAdiChange}
                    className="form-control mt-2"
                  />
                  <input
                    type="text"
                    placeholder="Yorumunuzu girin"
                    value={yorum}
                    onChange={handleYorumChange}
                    className="form-control mt-1"
                  />
                  <button
                    onClick={handleYorumEkle}
                    className="btn btn-primary mt-2"
                  >
                    Yorum Ekle
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmListesi;
