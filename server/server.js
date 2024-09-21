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
  const { username, email } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      displayName: username
    });

    await db.collection('users').doc(userRecord.uid).set({
      username: username,
      email: email
    });

    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).send({ error: 'A user with this email has already been created!' });
    }

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

// Verify token
app.post('/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).send({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});