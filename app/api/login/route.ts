import { getClient } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const json = await request.json();
    const client = await getClient();
    
    await client.connect();
    
    const res = await client.query(
        "select id, username, password from users where username ilike $1",
        [json.username]
    );

    await client.end();

    return NextResponse.json({
        data: res.rows[0]
    });
}