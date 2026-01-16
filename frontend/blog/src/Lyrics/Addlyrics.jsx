import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Container, Modal, Row, Card, Col } from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { useAdminStore } from '../store/admin/useAdminStore';
import { Music, Mic, User, Globe, Hash, Image as ImageIcon, Save, Trash2, X, PlusCircle } from 'lucide-react';

const Addlyrics = () => {

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        language: "",
        lyrics: "",
        hashtags: "",
        image: ""
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [songToDelete, setSongToDelete] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);

    const { lyricsList, fetchLyrics, handleDeletes, handleSubmits, loading } = useAdminStore()

    const handleCardClick = (song) => {
        setSelectedSong(song);
    };

    useEffect(() => {
        if (lyricsList.length === 0) {
            fetchLyrics();
        }
    }, [fetchLyrics, lyricsList.length]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, lyrics: content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, artist, language, lyrics, hashtags, image } = formData;

        if (!title || !artist || !language || !lyrics || !hashtags || !image) {
            return toast.error("Please fill out all fields.");
        }

        await handleSubmits(formData);

        // reset form only if needed and if submission succeeded
        setFormData({ title: "", artist: "", language: "", lyrics: "", hashtags: "", image: "" });
    };

    const handleDelete = async () => {
        if (!songToDelete?._id) return;
        await handleDeletes(songToDelete._id);
        setShowConfirm(false);
        setSongToDelete(null);
    };

    return (
        <>
            <div className="min-vh-100 py-5" style={{ background: 'var(--bg-primary)' }}>
                <Container>
                    <div className="d-flex flex-column align-items-center mb-5">
                        <h1 className="fw-bold mb-3 text-uppercase" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                            LYRICS <span style={{ color: 'var(--accent-primary)' }}>PROTOCOL</span>
                        </h1>
                        <p className="text-secondary font-monospace small mb-5">
                            >> SUBMIT AND ARCHIVE SONG DATA
                        </p>
                    </div>

                    <div className="glass-panel p-4 p-lg-5 mb-5 border-accent">
                        <h4 className="mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                            <PlusCircle size={20} /> NEW DATA ENTRY
                        </h4>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className="small font-monospace text-muted">SONG TITLE</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text glass-input border-end-0 text-secondary"><Music size={18} /></span>
                                            <Form.Control
                                                className="glass-input border-start-0 ps-0"
                                                type='text'
                                                name='title'
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder='Enter song name'
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className="small font-monospace text-muted">ARTIST</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text glass-input border-end-0 text-secondary"><User size={18} /></span>
                                            <Form.Control
                                                className="glass-input border-start-0 ps-0"
                                                type='text'
                                                name='artist'
                                                value={formData.artist}
                                                onChange={handleChange}
                                                placeholder='Enter artist name'
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className="small font-monospace text-muted">LANGUAGE</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text glass-input border-end-0 text-secondary"><Globe size={18} /></span>
                                            <Form.Control
                                                className="glass-input border-start-0 ps-0"
                                                type='text'
                                                name='language'
                                                value={formData.language}
                                                onChange={handleChange}
                                                placeholder='Enter song language'
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small font-monospace text-muted">VISUAL ASSET URL</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text glass-input border-end-0 text-secondary"><ImageIcon size={18} /></span>
                                            <Form.Control className="glass-input border-start-0 ps-0" type="text" name="image" value={formData.image} onChange={handleChange} required />
                                        </div>
                                        <small className="text-muted d-block mt-1 font-monospace" style={{ fontSize: '0.75rem' }}>External Host: <a href="https://postimages.org/" target="_blank" rel="noreferrer" className="text-accent text-decoration-none">postimages.org</a></small>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className='mb-3'>
                                <Form.Label className="small font-monospace text-muted">LYRICS CONTENT</Form.Label>
                                <div style={{ borderRadius: '0px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                    <Editor
                                        value={formData.lyrics}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
                                                'bullist numlist outdent indent | link image media | removeformat | code',
                                            content_style: 'body { font-family:Montserrat,sans-serif; font-size:14px; background-color: #f0f2f5; color: #333; }',
                                        }}
                                        onEditorChange={handleEditorChange}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className='mb-4'>
                                <Form.Label className="small font-monospace text-muted">HASHTAGS</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text glass-input border-end-0 text-secondary"><Hash size={18} /></span>
                                    <Form.Control
                                        className="glass-input border-start-0 ps-0"
                                        type='text'
                                        name='hashtags'
                                        value={formData.hashtags}
                                        onChange={handleChange}
                                        placeholder='e.g. love,song,2024'
                                    />
                                </div>
                            </Form.Group>

                            <Button type="submit" className='btn-primary-glow w-100 py-3 d-flex align-items-center justify-content-center gap-2'>
                                {loading ? <><Spinner animation="border" size="sm" /> TRANSMITTING...</> : <><Save size={18} /> SUBMIT TO ARCHIVES</>}
                            </Button>
                        </Form>
                    </div>

                    <h4 className="text-center mb-4 text-secondary font-monospace">>> ARCHIVED ENTRIES</h4>

                    <Row>
                        {lyricsList.map((song, index) => (
                            <Col md={4} sm={6} xs={12} key={index} className='mb-4'>
                                <div
                                    className='glass-panel h-100 p-0 overflow-hidden card-hover-effect d-flex flex-column'
                                    style={{ cursor: "pointer", border: '1px solid var(--border-color)' }}
                                    onClick={() => handleCardClick(song)}
                                >
                                    <div style={{ position: 'relative', height: '300px' }}>
                                        <img
                                            src={song.image}
                                            alt={song.title}
                                            style={{ width: '100%', height: '100%', objectFit: "cover" }}
                                        />
                                        <div className="position-absolute botom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', bottom: 0 }}>
                                            <h5 className="text-white mb-0 fw-bold">{song.title}</h5>
                                            <p className="text-white-50 small mb-0">{song.artist}</p>
                                        </div>
                                    </div>

                                    <div className='p-3 flex-grow-1 d-flex flex-column'>
                                        <div className='text-secondary small font-monospace mb-3'>LANG: {song.language}</div>
                                        <div className="mt-auto">
                                            <Button
                                                variant='outline-danger'
                                                className='w-100 d-flex align-items-center justify-content-center gap-2 btn-sm'
                                                style={{ borderRadius: 0 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSongToDelete(song);
                                                    setShowConfirm(true);
                                                }}
                                            >
                                                <Trash2 size={14} /> DELETE ENTRY
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered contentClassName="glass-panel text-light border-0">
                <Modal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <Modal.Title style={{ fontFamily: 'var(--font-mono)', color: '#ef4444' }}>CONFIRM DELETION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to purge <strong>{songToDelete?.title}</strong> from the archives?
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '1px solid var(--border-color)' }}>
                    <Button variant="outline-secondary" onClick={() => setShowConfirm(false)} style={{ borderRadius: 0 }}>CANCEL</Button>
                    <Button variant="danger" onClick={handleDelete} className="d-flex align-items-center gap-2" style={{ borderRadius: 0 }}><Trash2 size={16} /> CONFIRM PURGE</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={!!selectedSong} onHide={() => setSelectedSong(null)} centered size="lg" contentClassName="glass-panel text-light border-0">
                <Modal.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <Modal.Title style={{ fontFamily: 'var(--font-main)', letterSpacing: '1px' }}>{selectedSong?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center p-4' style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <h6 className='text-accent font-monospace mb-4'>ARTIST: {selectedSong?.artist} | LANG: {selectedSong?.language}</h6>

                    {selectedSong?.image ? (
                        <img
                            src={selectedSong.image}
                            alt={selectedSong.title}
                            style={{ height: "300px", objectFit: "cover", width: "100%", borderRadius: "0px", border: '1px solid var(--border-color)' }}
                            className='mb-4'
                        />
                    ) : (
                        <div className='mb-3 text-muted'>No image available</div>
                    )}
                    <div className="text-start p-3" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div dangerouslySetInnerHTML={{ __html: selectedSong?.lyrics }} />
                    </div>
                    <div className="mt-4 text-start">
                        <p className="text-secondary small font-monospace">tags: {selectedSong?.hashtags?.join(", ")}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Addlyrics