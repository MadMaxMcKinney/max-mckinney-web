import { supabase } from "@util/db";

export async function POST(request: Request) {
    if (request.headers.get("Authorization") !== process.env.MAX_ADMIN_KEY) {
        return new Response("Unauthorized.", {
            status: 401,
        });
    }

    const body = await request.json();

    const { data, error } = await supabase
        .from("clusters")
        .insert([{ severity: body.severity, description: body.description ? body.description : null }])
        .select();

    if (error) {
        return new Response("Error adding cluster: " + error.message, {
            status: 500,
        });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
    });
}
