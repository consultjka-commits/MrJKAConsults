import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const dbPath = path.join(process.cwd(), 'data', 'db.json');

        // Read existing data
        let db = { vip: [], feedback: [] };
        if (fs.existsSync(dbPath)) {
            const fileData = fs.readFileSync(dbPath, 'utf-8');
            db = JSON.parse(fileData);
        }

        // Add new VIP
        db.vip.push({
            ...data,
            id: Date.now().toString(),
            date: new Date().toISOString()
        });

        // Save new state
        if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
            fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
        }
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving VIP:', error);
        return NextResponse.json({ error: 'Failed to save VIP data' }, { status: 500 });
    }
}
