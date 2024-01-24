import { sql } from "@/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function getJWTPayLoad() {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt-token");
    const secret = new TextEncoder()
        .encode(process.env.JWT_SECRET!);

    console.log(1);
    const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
    console.log(2, payload);
    return payload;
}

export async function authorizedAdmin(func: Function) {
    const jwtPayload = await getJWTPayLoad();
    const res = await sql("select is_admin from users where id = $1", [jwtPayload.sub]);
    const data = res.rows[0];

    if (!data.is_admin) {
        return NextResponse.json(
            {
                error: "unauthorized"
            },
            {
                status: 403
            }
        );
    }

    return func();
}