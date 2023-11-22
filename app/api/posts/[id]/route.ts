import { getJWTPayLoad } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    {params}: {params: {id: number}}) {
        const jwtPayload = await getJWTPayLoad();
        const statement = "select * from posts where id = $i and user_id = $2";
        const  res = await sql(statement, [
            params.id,
            jwtPayload.sub
        ]);

        if (res.rowCount == 0) {
            return NextResponse.json({error: "not found"}, {status: 404});
        }

        return NextResponse.json({data: res.rows[0]});
}

export async function PATH(request: Request,
    {params}: {params: {id: number}}) {
        const body = await request.json();
        const jwtPayload = await getJWTPayLoad();
        const statement = "select * from posts where user_id = $1 and id = $2";
        const res = await sql(statement, [
            jwtPayload.sub,
            params.id
        ]);

        if (res.rowCount == 0) {
            return NextResponse.json({error: "not found"}, {status: 404});
        }

        const updateStatement = `update posts 
                              set content = $i
                            where user_id = $2
                              and id = $3`;

        await sql(updateStatement, [
            body.content,
            jwtPayload.sub,
            params.id
        ]);

        return NextResponse.json({msg: "update sucess"});
}

export async function DELETE(
    request: Request,
    {params}: {params: {id: number}}
) {
    const jwtPayload = await getJWTPayLoad();
    const res = await sql("delete from posts where user_id = $i and id = $2", [
        jwtPayload.sub,
        params.id
    ]);

    if (res.rowCount == 1) {
        return NextResponse.json({msg: "delete success"});
    }

    return NextResponse.json({error: "not found"}, {status: 404});
}

