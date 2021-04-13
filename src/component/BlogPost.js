import React, { Component } from "react";
import Post from "./Post";
import API from "../services/index";

class BlogPost extends Component {
  state = {
    listArtikel: [], // variabel array digunakan untuk menyimpan data API
    insertArtikel: {
      userId: 1,
      id: 1,
      title: "",
      body: "",
    },
  };

  ambilDataDariServerAPI = () => {
    API.getNewsBlog().then((result) => {
      this.setState({
        listArtikel: result,
      });
    });
  };

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }

  handleHapusArtikel = (data) => {
    API.deleteNewsBlog(data).then((result) => {
      this.ambilDataDariServerAPI()
    });
  };

  handleTambahArtikel = (event) => {
    let formInsertArtikel = {...this.state.insertArtikel}
    let timestamp = new Date().getTime()
    formInsertArtikel['id'] = timestamp
    formInsertArtikel[event.target.name] = event.target.value
    this.setState({
      insertArtikel: formInsertArtikel
    })
  }

  handleTombolSimpan = () => {
    API.postNewsBlog(this.state.insertArtikel)
      .then((Response) => {
        this.ambilDataDariServerAPI()
      })
  }

  render() {

    return (
    
        <section id="work" className="portfolio-mf sect-pt4 route">
          <div className="container">
            <div className="row">
            <div className="col-sm-10" style={{marginLeft:80}} >
              <div className="contact-mf">
                <div id="contact" className="box-shadow-full">
                  <div className="row">
                    <div>
                      <form className="contactForm">
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <h5 className="title-left">Add Article</h5>
                          </div>
                          <div className="col-md-12 mb-3" style={{marginLeft:30}}>
                            <div className="form-group">
                              <input
                                type="text"
                                name="title"
                                className="form-control"
                                id="title"
                                placeholder="Title"
                                onChange={this.handleTambahArtikel}
                              />
                              <div className="validation" />
                            </div>
                          </div>
                          <div className="col-md-12 mb-3" style={{marginLeft:30}}>
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                name="body"
                                rows={5}
                                data-rule="required"
                                placeholder="Body"
                                onChange={this.handleTambahArtikel}
                              />
                              <div className="validation" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <p className="s-description text-right">
                              <button
                                className="button button-a button-big button-rouded"
                                onClick={this.handleTombolSimpan}>
                                Save
                              </button>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="col-sm-12">
                <div className="title-box text-center">
                  <h3 className="title-a">List Article</h3>
                  <p className="subtitle-a">Praktikum Modul9</p>
                  <div className="line-mf" />
                </div>
              </div>
            </div>
            <div className="row">
              {/* post */}
              {this.state.listArtikel.map((artikel) => {
                //looping dan masukkan untuk setiap data yang ada di listartikel ke variabel artikel
                return (
                  <Post
                    idArtikel={artikel.id}
                    key={artikel.id}
                    judul={artikel.title}
                    isi={artikel.title}
                    onDelete={(id) => this.handleHapusArtikel(id)}
                  />
                ); // mapping data json dari API sesuai dg kategori
              })}
              {/* end post */}
            </div>
          </div>
        </section>
    
    );
  }
}

export default BlogPost;
