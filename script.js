const jwt = require('jsonwebtoken');

// Function to generate a JWT with an expiry time
const generateJWT = (payload, secret, expiresIn) => {
  try {
    // Create a JWT token with the payload, secret key, and expiry time
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw error;
  }
};

// Function to verify a JWT and handle expiry
const verifyJWT = (token, secret) => {
  try {
    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired:', error);
    } else {
      console.error('Error verifying JWT:', error);
    }
    throw error;
  }
};

// Example usage and testing
const secretKey = 'your-secret-key'; // Use a secure secret key in a real application

// Example payload
const payload = {
  userId: 123,
  username: 'john_doe'
};

// Generate a JWT with a 1-minute expiry for testing
const token = generateJWT(payload, secretKey, '1m');
console.log('Generated Token:', token);

// Verify the JWT
try {
  const decoded = verifyJWT(token, secretKey);
  console.log('Decoded Payload:', decoded);
} catch (error) {
  console.error('Error during verification:', error);
}

module.exports = {
  generateJWT,
  verifyJWT
};