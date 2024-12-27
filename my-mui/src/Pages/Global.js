async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Generate the hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }

export default hashPassword;