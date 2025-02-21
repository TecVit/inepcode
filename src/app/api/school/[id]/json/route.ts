import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const schoolId = parseInt(params.id);
  try {
    const result = await pool.query('SELECT * FROM codes WHERE codigo = $1', [String(schoolId)]);
    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, data: result.rows[0] });
    } else {
      return NextResponse.json({ success: true, message: "Nenhuma escola encontrada!" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}