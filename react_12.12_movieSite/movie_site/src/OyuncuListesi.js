import React, { Component } from "react";
import "./App.css";
class OyuncuListesi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmler: [],
      error: null,
      selectedOyuncu: null,
      kategoriler: [],
      oyuncular: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:3000/filmler"),
      fetch("http://localhost:3000/kategoriler"),
      fetch("http://localhost:3000/oyuncular"),
    ])
      .then(([filmlerResponse, kategorilerResponse, oyuncularResponse]) =>
        Promise.all([
          filmlerResponse.json(),
          kategorilerResponse.json(),
          oyuncularResponse.json(),
        ])
      )
      .then(([filmlerData, kategorilerData, oyuncularData]) => {
        console.log("Gelen filmler:", filmlerData);
        console.log("Gelen kategoriler:", kategorilerData);
        console.log("Gelen oyuncular:", oyuncularData);

        this.setState({
          filmler: filmlerData,
          kategoriler: kategorilerData,
          oyuncular: oyuncularData,
        });
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
        this.setState({ error: "Veri çekme hatası" });
      });
  }

  handleShow = (oyuncu) => {
    this.setState({ selectedOyuncu: oyuncu });
    const modal = new window.bootstrap.Modal(
      document.getElementById("oyuncuModal")
    );
    modal.show();
  };

  render() {
    const { filmler, error, selectedOyuncu, oyuncular } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    const selectedOyuncuFilmler = selectedOyuncu?.filmlerId?.map(
      (filmlerId) => {
        const film = filmler.find((film) => film.id === filmlerId);
        return film ? film.ismi : null;
      }
    );

    return (
      <div className="container mt-4">
        <h1>Oyuncu Listesi</h1>
        <div className="row">
          {oyuncular.map((oyuncu) => (
            <div key={oyuncu.id} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={oyuncu.foto}
                  className="card-img-top fotosize"
                  alt={oyuncu.ismi}
                  onClick={() => this.handleShow(oyuncu)}
                  style={{ cursor: "pointer" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{oyuncu.ismi}</h5>
                  <p className="card-text">
                    {oyuncu.aciklama.length > 150
                      ? `${oyuncu.aciklama.substring(0, 150)}...`
                      : oyuncu.aciklama}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal" id="oyuncuModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedOyuncu?.ismi}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Hakkında:</strong> {selectedOyuncu?.aciklama}
                </p>
                <p>
                  <strong>Doğum Tarihi:</strong> {selectedOyuncu?.dogum}
                </p>

                <p>
                  <strong>Oynadığı Filmler:</strong>{" "}
                  {selectedOyuncuFilmler?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OyuncuListesi;
