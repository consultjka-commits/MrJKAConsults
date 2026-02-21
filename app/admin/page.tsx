import React from 'react';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    let data = { vip: [], feedback: [] };

    if (fs.existsSync(dbPath)) {
        const fileData = fs.readFileSync(dbPath, 'utf-8');
        data = JSON.parse(fileData);
    }

    return (
        <div style={{ display: 'block', width: '100%', minHeight: '100vh', padding: '3rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Admin Dashboard</h1>
                </div>
                <p className="subtitle" style={{ marginBottom: '3rem' }}>Manage your reputation and VIP customers</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

                    {/* VIP Section */}
                    <div className="glass-card" style={{ maxWidth: '100%', padding: '2rem', textAlign: 'left' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--color-gold)' }}>⭐ VIP Database</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--color-text-muted)' }}>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Contact</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.vip.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                                No VIP members yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        data.vip.reverse().map((vip: any) => (
                                            <tr key={vip.id} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)', transition: 'background 0.2s', ...({ ':hover': { background: 'rgba(212, 175, 55, 0.05)' } } as any) }}>
                                                <td style={{ padding: '1rem' }}>{new Date(vip.date).toLocaleDateString()}</td>
                                                <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--color-text-light)' }}>{vip.name}</td>
                                                <td style={{ padding: '1rem' }}>{vip.contact}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-gold)' }}>{vip.rating} Stars</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="glass-card" style={{ maxWidth: '100%', padding: '2rem', textAlign: 'left' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#ff6b6b' }}>🚩 Intercepted Feedback</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--color-text-muted)' }}>
                                        <th style={{ padding: '1rem', fontWeight: 600, width: '15%' }}>Date</th>
                                        <th style={{ padding: '1rem', fontWeight: 600, width: '20%' }}>Guest</th>
                                        <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Rating</th>
                                        <th style={{ padding: '1rem', fontWeight: 600, width: '55%' }}>Feedback Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.feedback.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                                No negative feedback captured.
                                            </td>
                                        </tr>
                                    ) : (
                                        data.feedback.reverse().map((fb: any) => (
                                            <tr key={fb.id} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                                                <td style={{ padding: '1rem', verticalAlign: 'top' }}>{new Date(fb.date).toLocaleDateString()}</td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    <div style={{ fontWeight: 500, color: 'var(--color-text-light)', marginBottom: '4px' }}>{fb.name}</div>
                                                    <div style={{ fontSize: '0.85em', color: 'var(--color-text-muted)' }}>{fb.contact}</div>
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#ff6b6b', fontWeight: 600 }}>{fb.rating} Stars</td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: 'var(--color-text-light)' }}>
                                                    <div style={{ background: 'rgba(11, 25, 44, 0.5)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 107, 107, 0.2)' }}>
                                                        {fb.feedback}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
