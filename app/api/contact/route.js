import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return Response.json(
        { error: "Email aur message zaroori hain!" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([{ email, message }]);

    if (error) {
      console.error("Supabase error:", error);
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return Response.json(
      { error: "Server error!" },
      { status: 500 }
    );
  }
}