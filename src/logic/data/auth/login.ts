import { FormState } from "@/logic/interface/login";
import { loginSchema } from "@/logic/validations/login";
import { API_V1 } from "@/logic/variables";


export async function loginRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Handle special cases for email verification or registration success
  if (formData.get("emailVerification") === "true") {
    return {
      ...prevState,
      success: true,
      isVerified: true,
      message: "Email was verified successfully. You can now log in.",
    };
  } else if (formData.get("registerSuccess") === "true") {
    return {
      ...prevState,
      success: true,
      isVerified: true,
      message: "Registration successful. You can now log in.",
    };
  }

  // Extract form data
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: formData.get("rememberMe") as string,
    isWeb: "allow-cookie",
  };

  // Validate input data
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      isVerified: false,
      error: "Invalid Inputs",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${API_V1}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        isVerified: false,
        error: responseData.message || "Login failed",
        // error: responseData.error,
        errors: responseData.errors || null,
      };
    }

    // Uncomment when cookie setting is implemented
    // setCookie(responseData.data);

    return {
      success: true,
      isVerified: false,
      message: responseData.message || "Login successful",
      data: responseData.data,
    };
  } catch (error) {
    // Enhanced error logging
    console.error("Login request failed:", error);
    return {
      success: false,
      isVerified: false,
      error: "An error occurred during login. Please try again later.",
    };
  }
}