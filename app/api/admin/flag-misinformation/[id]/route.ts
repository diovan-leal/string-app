import { authorizedAdmin } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: {params: {id: number}}
) {
    return authorizedAdmin(async () =>  {
        const { id } = params;
        console.log(`flagging ${id} as missinformation`);
        
        const statement = `update posts set is_misinformation = true,
                                            is_misinformation_flagged_at = now()
                                where id = $1`;
        await sql(
            statement,
            [
                id
            ]
        );

        return NextResponse.json({msg: "flagged as missinformation"});
    });
}