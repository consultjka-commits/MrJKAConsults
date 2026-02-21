'use client';

import React, { useState } from 'react';
import StarRating from '../components/StarRating';

export default function Home() {
    const [rating, setRating] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    // Form states
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [feedbackBody, setFeedbackBody] = useState('');

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, contact, feedback: feedbackBody, rating }),
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setSubmitted(true);
        }
    };

    const handleVipSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/vip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, contact, rating }),
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setSubmitted(true);
        }
    };

    return (
        <main>
            <div className="glass-card">
                {!rating && !submitted && (
                    <div className="fade-in">
                        <h1>We Value Your Experience</h1>
                        <p className="subtitle">Please rate your visit with us today.</p>
                        <StarRating onRating={handleRating} />
                    </div>
                )}

                {rating > 0 && rating <= 3 && !submitted && (
                    <div className="fade-in">
                        <h1>We're Sorry We Fell Short</h1>
                        <p className="subtitle">Please tell us what went wrong so we can make it right.</p>
                        <form onSubmit={handleFeedbackSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-input" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contact Info (Phone or Email)</label>
                                <input type="text" className="form-input" required placeholder="john@example.com" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">What happened?</label>
                                <textarea className="form-input" required placeholder="Tell us about your experience..." value={feedbackBody} onChange={(e) => setFeedbackBody(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                            </button>
                        </form>
                    </div>
                )}

                {rating >= 4 && !submitted && (
                    <div className="fade-in">
                        <h1>Thank You!</h1>
                        <p className="subtitle">We're thrilled you had a great time.</p>

                        <a href="#" className="btn btn-secondary" style={{ textDecoration: 'none', marginBottom: '1rem' }} onClick={(e) => { e.preventDefault(); alert('Redirects to Google Review Page'); }}>
                            <span style={{ fontSize: '1.2rem' }}>⭐</span> Leave a Google Review
                        </a>

                        <hr className="divider" />

                        <h2>Join Our VIP Club</h2>
                        <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Get exclusive offers, free appetizers, and priority reservations.</p>
                        <form onSubmit={handleVipSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-input" required placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email / Phone</label>
                                <input type="text" className="form-input" required placeholder="jane@example.com" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <button type="submit" className="btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Instantly Join VIP List'}
                            </button>
                        </form>
                    </div>
                )}

                {submitted && (
                    <div className="fade-in" style={{ padding: '2rem 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                        <h1>Received!</h1>
                        <p className="subtitle">Thank you for your time and helping us improve.</p>
                        <button className="btn btn-secondary" onClick={() => { setRating(0); setSubmitted(false); setName(''); setContact(''); setFeedbackBody(''); }} style={{ marginTop: '2rem' }}>
                            Back to Start
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
