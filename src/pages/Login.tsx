import React from "react";
import { supabase } from "../integrations/supabaseClient";

export default function Login() {

  async function login(email: string, password: string) {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    }

  }

  return <div>Login</div>;
}
