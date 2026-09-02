// ==========================================
// RNSA AUTHENTICATION
// ==========================================

const SUPABASE_URL =
    "https://rbabiowcirxgwxuhughx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_2xLI0qxaaVze-w4raM3-Pw_JH9hMlUD";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("login-form");

const loginMessage =
    document.getElementById("login-message");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;


            loginMessage.textContent =
                "LOGGING IN...";


            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                loginMessage.textContent =
                    "Incorrect email or password.";

                console.error(error);

                return;
            }


            // Login successful

            const user =
                data.user;


            // Find user's role

            const { data: roleData, error: roleError } =
                await supabaseClient
                    .from("user_roles")
                    .select("role")
                    .eq("user_id", user.id)
                    .single();


            if (roleError || !roleData) {

                loginMessage.textContent =
                    "Account has no RNSA role.";

                await supabaseClient.auth.signOut();

                return;
            }
if (roleData.role !== "developer") {
    loginMessage.textContent =
        "Developer access only.";

    await supabaseClient.auth.signOut();

    return;
}

            // Save role for dashboard

            localStorage.setItem(
                "rnsa_role",
                roleData.role
            );


            // Go to dashboard

            document.getElementById("developer-login").style.display = "none";
document.getElementById("developer-dashboard").style.display = "block";

        }
    );

}
