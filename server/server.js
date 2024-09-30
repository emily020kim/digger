const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 5147;

// Initialize Firebase Admin SDK
const serviceAccount = require('./credentials/digger-37607-firebase-adminsdk-q8mea-1c4a537633.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digger-37607.firebaseio.com'
});

// Initialize firestore
const db = admin.firestore();

// Middleware for JSON parsing
app.use(express.json());

// Sign up route
app.post('/signup', async (req, res) => {
  const { token, username } = req.body;
  
  try {
    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Store user details in Firestore
    await db.collection('users').doc(decodedToken.uid).set({
      username: username,
      email: decodedToken.email
    });

    res.status(201).send({ uid: decodedToken.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Client-side should use Firebase to authenticate and send the token to the server
    // Example Firebase client-side login:
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const idToken = userCredential.user.getIdToken(); // Send this token to server
    //   })

    // Step 2: On server, verify the token received from client
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);

    res.status(200).send({
      message: 'Login successful',
      uid: decodedToken.uid,
    });

  } catch (error) {
    res.status(401).send({ error: 'Invalid email or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});