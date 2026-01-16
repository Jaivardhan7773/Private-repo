import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Container } from "react-bootstrap";
import axiosInstance from '../utills/axios.js';
import { toast } from 'react-toastify';
import Footer from "../components/footer";
import { Music, Mic2, Star, Disc, PlayCircle, Info } from 'lucide-react';


const SongLyrics = () => {
  const [lyricsList, setLyricsList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const handleCardClick = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    fetchLyrics();
  }, []);

  const fetchLyrics = async () => {
    try {
      const res = await axiosInstance.get("/getlyrics");
      setLyricsList(res.data);
    } catch (error) {
      toast.error("Failed to fetch lyrics.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-vh-100 py-5" style={{ background: 'var(--bg-primary)' }}>

        {/* Header Section */}
        <div className="container py-5 text-center">
          <h1 className="fw-bold mb-3 text-uppercase display-4" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-2px', color: 'var(--text-primary)' }}>
            SONG <span style={{ color: 'var(--accent-primary)' }}>LYRICS</span>
          </h1>
          <p className="text-secondary font-monospace lead mb-4">
                >> DISCOVER, ANALYZE, AND EXPLORE
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn-primary-glow px-4 py-2">EXPLORE DATABASE</button>
          </div>

          <div className="mt-4 d-flex justify-content-center gap-1 text-accent">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <p className="text-muted small font-monospace mt-2">USER RATING: 5.0 / 5.0</p>
        </div>

        {/* Categories / Featured */}
        <Container className="pb-5">
          <div className="mb-5">
            <h4 className="border-start border-4 border-warning ps-3 mb-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>FEATURED COLLECTIONS</h4>
            <div className="row g-4">
              {[
                { title: "Mharani Lyrics", img: "https://i.ytimg.com/vi/W8x6Dwyj0-A/hq720.jpg" },
                { title: "Wushang Clan", img: "https://i.ytimg.com/vi/dzuZ-_xscps/hq720.jpg" },
                { title: "Trending Now", img: "https://images.unsplash.com/photo-1586095087956-bc66fe634955?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw2fHxzb25nJTIwbHlyaWNzfGVufDB8fHx8MTczNTU3ODA2Mnww&ixlib=rb-4.0.3&auto=format&fit=crop&w=590&h=960" },
                { title: "Cozy Vibes", img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=594,h=946,fit=crop/bed-and-breakfast/images/amenities.jpg" }
              ].map((item, idx) => (
                <div className="col-md-6 col-lg-3" key={idx}>
                  <div className="glass-panel p-0 overflow-hidden position-relative card-hover-effect" style={{ height: '300px' }}>
                    <img src={item.img} alt={item.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                      <span className="badge glass-input border text-white">{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h4 className="border-start border-4 border-warning ps-3 mb-4 text-white" style={{ fontFamily: 'var(--font-mono)' }}>ALL ENTRIES</h4>
            <Row>
              {Array.isArray(lyricsList) && lyricsList.map((song, index) => (
                <Col md={4} sm={6} xs={12} key={index} className='mb-4'>
                  <div
                    className='glass-panel h-100 p-0 overflow-hidden card-hover-effect d-flex flex-column'
                    onClick={() => handleCardClick(song)}
                    style={{ cursor: "pointer", border: '1px solid var(--border-color)' }}
                  >
                    <div style={{ height: '250px', position: 'relative' }}>
                      <img
                        src={song.image}
                        alt={song.title}
                        loading='lazy'
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-dark border border-secondary"><Mic2 size={12} className="me-1" /> {song.language}</span>
                      </div>
                    </div>

                    <div className="p-3 flex-grow-1 d-flex flex-column">
                      <h5 className="fw-bold mb-1 text-white">{song.title}</h5>
                      <p className="text-secondary small font-monospace mb-0">{song.artist}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div className="glass-panel p-5 text-center my-5 position-relative overflow-hidden">
            <div className="position-relative z-index-1">
              <h2 className="text-white fw-bold mb-3">CONTRIBUTE TO THE ARCHIVES</h2>
              <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Help us expand the database. Submit lyrics for your favorite tracks and become a part of the community.
              </p>
              <a href="mailto:jaivardhansinghrathore17@gmail.com" className="btn-primary-glow text-decoration-none px-4 py-2 d-inline-block">SUBMIT LYRICS</a>
            </div>
          </div>

        </Container>

        <Modal show={!!selectedSong} onHide={() => setSelectedSong(null)} centered size="lg" contentClassName="glass-panel text-light border-0">
          <Modal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <Modal.Title style={{ fontFamily: 'var(--font-main)' }}>{selectedSong?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center p-4' style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-center gap-3 mb-4 text-accent font-monospace">
              <span><Mic2 size={16} /> {selectedSong?.artist}</span>
              <span>|</span>
              <span>{selectedSong?.language}</span>
            </div>

            {selectedSong?.image ? (
              <img
                src={selectedSong.image}
                alt={selectedSong.title}
                style={{ maxHeight: "300px", width: "auto", borderRadius: "10px", maxWidth: '100%' }}
                className='mb-4 border border-secondary'
              />
            ) : (
              <div className='mb-3 text-muted'>No image available</div>
            )}

            <div className="text-start p-4 glass-input rounded-0 mb-4">
              <div dangerouslySetInnerHTML={{ __html: selectedSong?.lyrics }} />
            </div>

            <p className="text-secondary small font-monospace text-start">TAGS: {selectedSong?.hashtags?.join(", ")}</p>
          </Modal.Body>
        </Modal>

      </div>

      <Footer />
    </>
  );
};

export default SongLyrics;
