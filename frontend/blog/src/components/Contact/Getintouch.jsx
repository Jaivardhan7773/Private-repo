import { useState } from "react";
import { useHomeStore } from "../../store/homeapis/useHomeStore";
import { MessageSquare, Send } from "lucide-react";

const Getintouch = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const { isLoading, handleGetQuery } = useHomeStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleGetQuery(formData)
        setFormData({ name: "", email: "", description: "" });
    }

    return (
        <div className="py-5" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="glass-panel p-5">
                            <div className="text-center mb-5">
                                <div className="d-inline-flex align-items-center justify-content-center p-3 mb-3" style={{ border: '1px solid var(--accent-primary)', borderRadius: '50%' }}>
                                    <MessageSquare size={32} color="var(--accent-primary)" />
                                </div>
                                <h1 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-1px' }}>
                                    TRANSMIT <span style={{ color: 'var(--accent-primary)' }}>DATA</span>
                                </h1>
                                <p className="text-secondary mx-auto col-md-10" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                                    >> Share your thoughts about the Hip Hop Scene.
                                    <br />
                                    >> RSVP for upcoming events.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="mb-2 font-monospace small text-uppercase" style={{ color: 'var(--accent-primary)' }}>Identification</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="glass-input w-100 p-3"
                                                placeholder="ENTER DESIGNATION"
                                                value={formData.name}
                                                onChange={handleChange}
                                                style={{ borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="mb-2 font-monospace small text-uppercase" style={{ color: 'var(--accent-primary)' }}>Communication Channel</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="glass-input w-100 p-3"
                                                placeholder="ENTER EMAIL ADDRESS"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: 0 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="mb-2 font-monospace small text-uppercase" style={{ color: 'var(--accent-primary)' }}>Transmission Content</label>
                                            <textarea
                                                className="glass-input w-100 p-3"
                                                placeholder="TYPE MESSAGE..."
                                                rows="5"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                                style={{ borderRadius: 0, resize: 'none' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn-primary-glow px-5 py-3 d-inline-flex align-items-center gap-2"
                                            disabled={isLoading}
                                            style={{ minWidth: '200px', justifyContent: 'center' }}
                                        >
                                            {isLoading ? (
                                                <>SENDING PACKET...</>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    INITIATE TRANSMISSION
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Getintouch