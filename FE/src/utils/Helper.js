

export const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Lấy phần payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Chuyển Base64URL -> Base64
      return JSON.parse(atob(base64)); // Giải mã base64 và parse JSON
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
}