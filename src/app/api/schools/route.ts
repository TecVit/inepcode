import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 100;
  const minId = (page - 1) * limit + 1;

  try {
    const result = await pool.query(
      'SELECT * FROM codes WHERE id >= $1 ORDER BY id LIMIT $2',
      [minId, limit]
    );

    return NextResponse.json({ success: true, page, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}