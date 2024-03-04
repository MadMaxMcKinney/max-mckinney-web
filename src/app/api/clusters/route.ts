import { supabase } from "@util/db";

export async function GET() {
    let { data, error } = await supabase.from("clusters").select("*");
    if (error) {
        return new Response("Error getting clusters: " + error.message, {
            status: 500,
        });
    }
    return new Response(JSON.stringify(data), {
        status: 200,
    });
}
