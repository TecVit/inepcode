import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const schoolId = params.id;

  try {
    const result = await pool.query('DELETE FROM codes WHERE codigo = $1 RETURNING *', [schoolId]);
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Escola não encontrada." }, { status: 404 });
    }
    return NextResponse.json({ message: "Escola excluída com sucesso!", deleted: result.rows[0] });
  } catch (error) {
    console.error("Erro ao excluir escola:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}