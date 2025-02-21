import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { escola, codigo, municipio, endereco, telefone, categoria_administrativa, dependencia_administrativa, tipos_de_ensino, lat, long } = body;

  try {
    return NextResponse.json({ status: 403, success: false, message: "Rota da API não esta disponível ainda para o público" });
    const query = `
      INSERT INTO codes (escola, codigo, municipio, endereco, telefone, categoria_administrativa, dependencia_administrativa, tipos_de_ensino, lat, long)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [escola, codigo, municipio, endereco, telefone, categoria_administrativa, dependencia_administrativa, tipos_de_ensino, lat, long];
    const result = await pool.query(query, values);

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}