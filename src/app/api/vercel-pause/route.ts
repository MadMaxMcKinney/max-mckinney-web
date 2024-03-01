import crypto from "crypto";

export async function GET(request: Request) {
    const { INTEGRATION_SECRET } = process.env;

    if (typeof INTEGRATION_SECRET != "string") {
        throw new Error("No integration secret found");
    }

    const rawBody = await request.text();
    const rawBodyBuffer = Buffer.from(rawBody, "utf-8");
    const bodySignature = sha1(rawBodyBuffer, INTEGRATION_SECRET);

    if (bodySignature !== request.headers.get("x-vercel-signature")) {
        return Response.json({
            code: "invalid_signature",
            error: "signature didn't match",
        });
    }

    const json = JSON.parse(rawBodyBuffer.toString("utf-8"));

    // If the current spend is greater than or equal to the budget amount, then fetching the projects and individually pausing them
    if (json.currentSpend && json.budgetAmount && json.currentSpend >= json.budgetAmount) {
        const projectsData = await fetch(`https://api.vercel.com/v9/projects?teamId=${process.env.TEAM_ID}`, {
            headers: {
                Authorization: "Bearer <TOKEN>",
            },
            method: "get",
        });
        const projects = await projectsData.json();

        projects.forEach((project: any) => {
            fetch(`https://api.vercel.com/v1/projects/${project.id}/pause?teamId=${process.env.TEAM_ID}`, {
                headers: {
                    Authorization: `Bearer ${process.env.VERCEL_API}`,
                    "Content-Type": "application/json",
                },
                method: "post",
            });
        });

        return new Response("Budget reached. All projects paused.", {
            status: 200,
        });
    }

    return new Response("Webhook request validated. Nothing to do yet.", {
        status: 200,
    });
}

function sha1(data: Buffer, secret: string): string {
    return crypto.createHmac("sha1", secret).update(data).digest("hex");
}
