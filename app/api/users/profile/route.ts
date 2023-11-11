import { getJWTPayLoad } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // get currently logged in user
    const jwtPayLoad = await getJWTPayLoad();

    // fetch user data
    const res = await sql(
        "select id, username, avatar from users where id = $1",
        [jwtPayLoad.sub]
    );

    const user = res.rows[0];

    // return
    return NextResponse.json({
        data: user
    });
}