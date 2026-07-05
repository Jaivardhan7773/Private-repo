import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date("2025-06-01T00:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="bg-black">
           <Container className="text-center text-light" style={{ height: "88.5vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#000" }}>
            <h1 className="mb-3">Coming Soon</h1>
            <p className="card-text"></p>
            <h3 className="mb-4">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </h3>
            <Button variant="primary" onClick={() => navigate("/")}>Go Back</Button>
        </Container>
        </div>
        </>
    );
};

export default ComingSoon;